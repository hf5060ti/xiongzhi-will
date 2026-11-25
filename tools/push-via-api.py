#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""通过 GitHub Git Data API 把本地未推提交同步到 origin/main。

使用场景：github.com 直连超时，但 api.github.com 可达。
流程：逐提交建 blob → tree → commit → PATCH ref，等价于 git push。
用法：python tools/push-via-api.py [--base <远端sha>]
"""
import argparse
import base64
import json
import os
import subprocess
import sys
import urllib.error
import urllib.request

REPO = 'hf5060ti/xiongzhi-will'
WD = os.environ.get('XW_REPO') or os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
API = 'https://api.github.com'


def git(*args, binary=False):
    out = subprocess.run(['git', '-C', WD, *args], stdout=subprocess.PIPE,
                         stderr=subprocess.PIPE, check=True).stdout
    return out if binary else out.decode('utf-8').strip()


def token():
    p = subprocess.run(['git', 'credential', 'fill'], cwd=WD,
                       input='protocol=https\nhost=github.com\n\n',
                       stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    for line in p.stdout.splitlines():
        if line.startswith('password='):
            return line.split('=', 1)[1]
    raise RuntimeError('git credential fill 未返回 token')


TOKEN = token()


def api(method, path, payload=None):
    data = json.dumps(payload).encode('utf-8') if payload is not None else None
    req = urllib.request.Request(API + path, data=data, method=method, headers={
        'Authorization': 'Bearer ' + TOKEN,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'User-Agent': 'xw-push-script',
    })
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            body = r.read().decode('utf-8')
            return json.loads(body) if body else None
    except urllib.error.HTTPError as e:
        raise RuntimeError('%s %s -> %s: %s' % (method, path, e.code, e.read().decode('utf-8')[:500]))


def parse_commit(sha):
    raw = git('cat-file', 'commit', sha)
    header, _, body = raw.partition('\n\n')
    meta = {}
    for line in header.splitlines():
        if line.startswith('author ') or line.startswith('committer '):
            kind, rest = line.split(' ', 1)
            name_mail, ts, tz = rest.rsplit(' ', 2)
            name, mail = name_mail.rsplit(' <', 1)
            # GitHub API 要求 ISO 8601 时区带冒号（+08:00），git raw 头是 +0800。
            # 且 GitHub 按该字符串反算 unix 时间戳，必须传「本地墙钟时间 + 偏移」，
            # 而不是 UTC 时间 + 偏移，否则 commit sha 对不上。
            import datetime as dt
            sign = 1 if tz[0] == '+' else -1
            offset = sign * (int(tz[1:3]) * 3600 + int(tz[3:5]) * 60)
            wall = dt.datetime.fromtimestamp(int(ts) + offset, dt.timezone.utc)
            iso_tz = tz[:3] + ':' + tz[3:] if len(tz) == 5 else tz
            meta[kind] = {
                'name': name,
                'email': mail.rstrip('>'),
                'date': wall.strftime('%Y-%m-%dT%H:%M:%S') + iso_tz,
            }
    return meta, body


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--base', help='远端 main 当前 sha，省略则自动读取')
    ap.add_argument('--dry-run', action='store_true')
    args = ap.parse_args()

    remote = args.base or api('GET', '/repos/%s/git/ref/heads/main' % REPO)['object']['sha']
    local_head = git('rev-parse', 'HEAD')
    commits = git('rev-list', '--reverse', '%s..%s' % (remote, local_head)).split()
    if not commits:
        print('无待推提交')
        return
    print('远端 %s，本地 %s，待推 %d 个提交' % (remote[:8], local_head[:8], len(commits)))

    # 远端 tree 作为第一个 base_tree。
    # 注意：--base 可能是本地等价提交（sha 与远端不同，如 API 时间归一场景），
    # 此时 base 在远端不存在，改用远端 main 的真实 sha 取 tree。
    remote_head = api('GET', '/repos/%s/git/ref/heads/main' % REPO)['object']['sha']
    base_tree = api('GET', '/repos/%s/git/commits/%s' % (REPO, remote_head))['tree']['sha']
    parent = remote_head

    # 提交链连续性按本地历史校验（base 可能是本地等价提交，与远端 parent sha 不同）
    local_base = git('rev-parse', remote) if git('cat-file', '-e', remote + '^{commit}') else remote
    for i, sha in enumerate(commits, 1):
        parent_check = git('rev-parse', sha + '^')
        expected_parent = commits[i - 2] if i > 1 else local_base
        if parent_check != expected_parent:
            raise RuntimeError('提交链不连续: %s 的父提交是 %s，期望 %s'
                               % (sha[:8], parent_check[:8], expected_parent[:8]))
        lines = git('diff-tree', '--no-commit-id', '--name-status', '-r', sha).splitlines()
        changes = []
        for line in lines:
            parts = line.split('\t')
            status = parts[0]
            path = parts[-1]
            if status.startswith('D'):
                changes.append({'path': path, 'mode': '100644', 'type': 'blob', 'sha': None})
                continue
            blob = git('cat-file', 'blob', '%s:%s' % (sha, path), binary=True)
            if args.dry_run:
                changes.append({'path': path, 'skip': True})
                continue
            payload = {
                'content': base64.b64encode(blob).decode('ascii'),
                'encoding': 'base64',
            }
            created = api('POST', '/repos/%s/git/blobs' % REPO, payload)
            expected = git('rev-parse', '%s:%s' % (sha, path))
            if created['sha'] != expected:
                raise RuntimeError('blob sha 不匹配 %s: %s != %s' % (path, created['sha'][:8], expected[:8]))
            mode = git('ls-tree', sha, '--', path).split()[0]
            changes.append({'path': path, 'mode': mode, 'type': 'blob', 'sha': created['sha']})
        if args.dry_run:
            print('[%d/%d] %s 变更 %d 文件（dry-run）' % (i, len(commits), sha[:8], len(changes)))
            parent = sha
            continue
        tree = api('POST', '/repos/%s/git/trees' % REPO, {
            'base_tree': base_tree,
            'tree': changes,
        })
        expected_tree = git('rev-parse', sha + '^{tree}')
        if tree['sha'] != expected_tree:
            raise RuntimeError('tree sha 不匹配 %s: %s != %s' % (sha[:8], tree['sha'][:8], expected_tree[:8]))
        meta, body = parse_commit(sha)
        created = api('POST', '/repos/%s/git/commits' % REPO, {
            'tree': tree['sha'],
            'parents': [parent],
            'message': body,
            'author': meta['author'],
            'committer': meta['committer'],
        })
        if created['sha'] != sha:
            # GitHub API 会把 author/committer 时间归一为 UTC Z，导致 commit sha
            # 与本地无法逐字节一致；但 tree 已严格校验相同，内容完全等价。
            # 接受该差异，用 API 返回的 sha 作为后续 parent 与 ref 目标。
            print('  提示: commit sha 因 API 时间归一不同（%s -> %s），tree 一致，内容等价'
                  % (sha[:8], created['sha'][:8]))
        print('[%d/%d] %s OK（%d 文件）' % (i, len(commits), sha[:8], len(changes)))
        base_tree = tree['sha']
        parent = created['sha']

    if args.dry_run:
        print('dry-run 完成')
        return
    api('PATCH', '/repos/%s/git/refs/heads/main' % REPO, {'sha': parent, 'force': False})
    git('update-ref', 'refs/remotes/origin/main', parent)
    print('已推送 main -> %s' % parent[:8])


if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print('ABORT:', e, file=sys.stderr)
        sys.exit(1)
