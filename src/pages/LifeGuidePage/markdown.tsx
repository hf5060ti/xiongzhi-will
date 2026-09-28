import React from 'react';

/** 轻量 Markdown 渲染（覆盖《高性价比人生指南》正文用到的结构：标题/列表/引用/代码/表格/链接/加粗/行内代码） */

const INLINE_LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const ANGLE_LINK = /<((?:https?:\/\/|www\.)[^>\s]+)>/g;
const BOLD = /\*\*([^*]+)\*\*/g;

function renderInline(text: string, keyBase: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let rest = text;
  let k = 0;
  while (rest.length > 0) {
    const link = INLINE_LINK.exec(rest);
    if (link) {
      if (link.index > 0) nodes.push(rest.slice(0, link.index));
      nodes.push(
        <a key={`${keyBase}-l${k++}`} href={link[2]} target="_blank" rel="noopener noreferrer" className="text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary">
          {renderInline(link[1], `${keyBase}-t${k}`)}
        </a>,
      );
      rest = rest.slice(link.index + link[0].length);
      continue;
    }
    const ang = ANGLE_LINK.exec(rest);
    if (ang) {
      if (ang.index > 0) nodes.push(rest.slice(0, ang.index));
      const href = ang[1].startsWith('www.') ? `https://${ang[1]}` : ang[1];
      nodes.push(
        <a key={`${keyBase}-a${k++}`} href={href} target="_blank" rel="noopener noreferrer" className="break-all text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary">
          {href}
        </a>,
      );
      rest = rest.slice(ang.index + ang[0].length);
      continue;
    }
    const bold = BOLD.exec(rest);
    if (bold) {
      if (bold.index > 0) nodes.push(rest.slice(0, bold.index));
      nodes.push(<strong key={`${keyBase}-b${k++}`} className="font-semibold text-foreground">{renderInline(bold[1], `${keyBase}-bi${k}`)}</strong>);
      rest = rest.slice(bold.index + bold[0].length);
      continue;
    }
    const codeMatch = /`([^`]+)`/.exec(rest);
    if (codeMatch) {
      if (codeMatch.index > 0) nodes.push(rest.slice(0, codeMatch.index));
      nodes.push(
        <code key={`${keyBase}-c${k++}`} className="rounded bg-white/8 px-1.5 py-0.5 font-mono text-[0.85em] text-primary">
          {codeMatch[1]}
        </code>,
      );
      rest = rest.slice(codeMatch.index + codeMatch[0].length);
      continue;
    }
    nodes.push(rest);
    break;
  }
  return nodes;
}

function isTableSep(line: string): boolean {
  const cells = line.split('|').filter((s) => s.trim() !== '');
  return cells.length > 0 && cells.every((c) => /^:?-{2,}:?$/.test(c.trim()));
}

function parseTable(lines: string[]): { header: string[]; rows: string[][] } | null {
  const rows: string[][] = [];
  let header: string[] | null = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line.startsWith('|') && !line.endsWith('|') && !line.includes('|')) break;
    const cells = line
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((s) => s.trim());
    if (header === null) {
      if (i + 1 < lines.length && isTableSep(lines[i + 1])) {
        header = cells;
        i++;
        continue;
      }
      break;
    }
    rows.push(cells);
  }
  if (!header) return null;
  return { header, rows };
}

export function markdownToReact(text: string, keyBase = 'md'): React.ReactNode[] {
  const lines = text.split('\n');
  const out: React.ReactNode[] = [];
  let i = 0;
  let blockIdx = 0;

  const pushBlock = (node: React.ReactNode) => out.push(<div key={`${keyBase}-${blockIdx++}`}>{node}</div>);

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trimEnd();

    if (/^\s*<!--/.test(line) && /-->\s*$/.test(line)) {
      i++;
      continue;
    }
    if (line.trim() === '') {
      i++;
      continue;
    }
    if (/^```/.test(line.trim())) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i].trim())) {
        buf.push(lines[i]);
        i++;
      }
      i++;
      pushBlock(
        <pre className="overflow-x-auto rounded-xl border border-border/40 bg-black/40 p-3 text-[13px] leading-relaxed text-foreground/90">
          <code>{buf.join('\n')}</code>
        </pre>,
      );
      continue;
    }
    const h = /^(#{1,4})\s+(.*)$/.exec(line.trim());
    if (h) {
      const level = Math.min(h[1].length, 3);
      const t = h[2].trim();
      const cls =
        level === 1
          ? 'mt-6 mb-3 font-display text-2xl font-bold tracking-tight text-foreground'
          : level === 2
            ? 'mt-5 mb-2 font-display text-xl font-bold tracking-tight text-foreground'
            : 'mt-4 mb-2 font-display text-lg font-semibold text-foreground';
      const Tag = (level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3') as 'h1' | 'h2' | 'h3';
      pushBlock(<Tag className={cls}>{renderInline(t, `${keyBase}-h${blockIdx}`)}</Tag>);
      i++;
      continue;
    }
    if (/^>\s?/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      pushBlock(
        <blockquote className="my-2 border-l-2 border-primary/50 bg-primary/5 py-1 pl-3 pr-2 text-[13.5px] leading-relaxed text-foreground/85">
          {markdownToReact(buf.join('\n'), `${keyBase}-q${blockIdx}`)}
        </blockquote>
      );
      continue;
    }
    if (line.includes('|') && line.trim().startsWith('|')) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        buf.push(lines[i]);
        i++;
      }
      const table = parseTable(buf);
      if (table) {
        pushBlock(
          <div className="my-2 overflow-x-auto rounded-xl border border-border/40 bg-white/[0.03]">
            <table className="w-full text-[13px] leading-relaxed">
              <thead>
                <tr className="border-b border-border/50 bg-white/[0.04]">
                  {table.header.map((c, ci) => (
                    <th key={ci} className="px-3 py-2 text-left font-semibold text-foreground">{renderInline(c, `${keyBase}-th${blockIdx}-${ci}`)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((r, ri) => (
                  <tr key={ri} className="border-b border-border/20 last:border-0">
                    {r.map((c, ci) => (
                      <td key={ci} className="px-3 py-1.5 align-top text-foreground/85">{renderInline(c, `${keyBase}-td${blockIdx}-${ri}-${ci}`)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>,
        );
        continue;
      }
    }
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ''));
        i++;
      }
      pushBlock(
        <ul className="my-2 space-y-1.5 pl-5 text-[14px] leading-relaxed text-foreground/90">
          {items.map((it, ii) => (
            <li key={ii} className="list-disc marker:text-primary/60">{renderInline(it, `${keyBase}-li${blockIdx}-${ii}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }
    if (/^\s*\d+[.)]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+[.)]\s+/, ''));
        i++;
      }
      pushBlock(
        <ol className="my-2 space-y-1.5 pl-5 text-[14px] leading-relaxed text-foreground/90">
          {items.map((it, ii) => (
            <li key={ii} className="list-decimal marker:text-primary/60">{renderInline(it, `${keyBase}-ol${blockIdx}-${ii}`)}</li>
          ))}
        </ol>,
      );
      continue;
    }
    const buf: string[] = [line];
    i++;
    while (i < lines.length && lines[i].trim() !== '' && !/^(#{1,4})\s/.test(lines[i].trim()) && !/^```/.test(lines[i].trim()) && !/^>\s?/.test(lines[i]) && !/^\s*[-*]\s+/.test(lines[i]) && !/^\s*\d+[.)]\s+/.test(lines[i]) && !(lines[i].trim().startsWith('|') && lines[i].includes('|'))) {
      buf.push(lines[i]);
      i++;
    }
    pushBlock(
      <p className="my-2 text-[14px] leading-[1.85] text-foreground/90">
        {buf.map((b, bi) => (
          <React.Fragment key={bi}>
            {bi > 0 && <br />}
            {renderInline(b, `${keyBase}-p${blockIdx}-${bi}`)}
          </React.Fragment>
        ))}
      </p>,
    );
  }
  return out;
}