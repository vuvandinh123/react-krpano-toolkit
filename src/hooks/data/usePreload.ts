//
// ⏳ usePreload
// Preload ảnh/video trước khi dùng để giảm lag
// Preload images/videos before use to reduce lag

import { krpanoAPI } from "../../core";

//
export function usePreload() {
    const preloadImage = (url: string) => {
        if (!krpanoAPI) throw new Error("Krpano not ready");
        krpanoAPI.call(`preloadurl(${url})`);
    };

    const preloadScene = (sceneName: string) => {
        if (!krpanoAPI) throw new Error("Krpano not ready");
        krpanoAPI.call(`preloadscene(${sceneName})`);
    };

    return { preloadImage, preloadScene };
}