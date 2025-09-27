/* eslint-disable @typescript-eslint/no-explicit-any */
export * from "./action";
export * from "./config";
export * from "./event";
export type KrpanoLayerProps = {
    url?: string;
    visible?: boolean;
    x?: number | string;   // số hoặc "10%" 
    y?: number | string;
    align?: "lefttop" | "top" | "righttop" | "left" | "center" | "right" | "leftbottom" | "bottom" | "rightbottom";
    scale?: number;
    alpha?: number;        // độ mờ 0..1
    width?: number | string;
    height?: number | string;
    html?: string;         // nếu layer là text/html
    bgcolor?: string;      // màu nền #RRGGBB
    bgalpha?: number;
    onclick?: string;      // hành động khi click
    [key: string]: any;    // fallback cho props khác của krpano
};
export type PluginOptions = {
  url?: string;          // đường dẫn tới plugin .js
  keep?: boolean;        // giữ plugin khi đổi scene
  align?: "left" | "center" | "right" | "top" | "bottom";
  edge?: "lefttop" | "top" | "righttop" | "left" | "center" | "right" | "leftbottom" | "bottom" | "rightbottom";
  x?: number;            // tọa độ X
  y?: number;            // tọa độ Y
  scale?: number;        // scale
  visible?: boolean;     // hiển thị hay không
  enabled?: boolean;     // có cho tương tác không
  handcursor?: boolean;  // có đổi cursor khi hover không
  capture?: boolean;     // có capture sự kiện chuột không
  alpha?: number;        // độ mờ (0–1)
  bgcolor?: string;      // màu nền (hex hoặc rgba)
  bgalpha?: number;      // độ mờ nền
  onloaded?: string;     // action gọi khi load xong
  onclick?: string;      // action khi click
  onhover?: string;      // action khi hover
  [key: string]: any;    // fallback cho props chưa định nghĩa
};
export type ViewParams =
  | null
  | string
  | {
      hlookat?: number | string;
      vlookat?: number | string;
      fov?: number | string;
      fovmin?: number | string;
      fovmax?: number | string;
    };

export type LoadSceneOptions = {
  view?: ViewParams;
  keep?: "KEEP" | "MERGE" | "IGNORE";
  blend?: "BLEND" | "NOPREVIEW" | `BLEND(${number})`;
};
export type HotspotOptions = {
  ath: number | string;       // góc ngang
  atv: number | string;       // góc dọc
  url?: string;               // hình ảnh gắn vào hotspot
  scale?: number;             // độ phóng to/thu nhỏ
  alpha?: number;             // độ trong suốt (0..1)
  visible?: boolean;          // hiển thị hay ẩn
  zorder?: number;            // thứ tự chồng
  onclick?: string;           // hành động khi click
  onhover?: string;           // khi hover
  onout?: string;             // khi rời chuột
  [key: string]: any;         // mở rộng thêm props khác của krpano
};

/**
 * Blend animation types khi load scene
 */
export type BlendMode =
    | "BLEND(1)"
    | "BLEND(2)"
    | "BLEND(3)"
    | "ZOOMBLEND(1)"
    | "ZOOMBLEND(2)"
    | "ZOOMBLEND(3)"
    | null;

/**
 * Flags khi load scene
 * KEEP: giữ lại state view cũ
 * MERGE: merge config cũ
 * PRELOAD: load scene vào bộ nhớ nhưng không active
 */
export type SceneFlags = "KEEP" | "MERGE" | "PRELOAD";

/**
 * Options khi load scene
 */
export interface SceneOptions {
    keep?: boolean;          // giữ view
    merge?: boolean;         // merge config
    blend?: BlendMode;       // hiệu ứng chuyển cảnh
    flags?: SceneFlags[];    // flags Krpano
}