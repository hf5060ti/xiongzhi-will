// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
/**
 * 神之手层（Hand Layer）：把素材里的「黑色太阳（月食）+ 神之手 + 格斯剪影」原样保留，
 * 不加任何改造，只给它一个位置——叠在背景格斯的披风后面、偏右一点点。
 *
 * 素材已裁掉抖音水印并做成 ping-pong（正放 + 倒放）无缝循环，因此手掌上抬后又缓缓
 * 落下，像呼吸一样不出现跳帧。层用径向遮罩羽化四边、压低不透明度，并放在站点
 * 压暗遮罩之下，让它自然「融进」现有的黑白格斯环境里，而不是贴一块红色矩形。
 */
import { BASE } from '@/lib/base';

const HAND_SRC = `${BASE}images/berserk-hand.mp4`;

export default function HandLayer() {
  return (
    <div className="xw-hand-layer" aria-hidden="true">
      <video
        className="xw-hand-layer-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
      >
        <source src={HAND_SRC} type="video/mp4" />
      </video>
    </div>
  );
}
