//
// 🎥 useVideoHotspot
// Quản lý hotspot video (thêm, play, pause, remove)
// Manage video hotspots (add, play, pause, remove)

import { krpanoAPI } from "../../core";

//
export function useVideoHotspot() {
    const addVideoHotspot = (
        name: string,
        url: string,
        options: {
            ath: number;
            atv: number;
            width?: number;
            height?: number;
            autoplay?: boolean;
            loop?: boolean;
        }
    ) => {
        if (!krpanoAPI) throw new Error("Krpano not ready");

        krpanoAPI.call(`addhotspot(${name})`);
        krpanoAPI.set(`hotspot[${name}].url`, url);
        krpanoAPI.set(`hotspot[${name}].ath`, options.ath);
        krpanoAPI.set(`hotspot[${name}].atv`, options.atv);

        if (options.width) krpanoAPI.set(`hotspot[${name}].width`, options.width);
        if (options.height) krpanoAPI.set(`hotspot[${name}].height`, options.height);
        if (options.autoplay) krpanoAPI.set(`hotspot[${name}].autoplay`, true);
        if (options.loop) krpanoAPI.set(`hotspot[${name}].loop`, true);
    };

    const play = (name: string) => krpanoAPI.call(`hotspot[${name}].playvideo()`);
    const pause = (name: string) => krpanoAPI.call(`hotspot[${name}].pausevideo()`);
    const remove = (name: string) => krpanoAPI.call(`removehotspot(${name})`);

    return { addVideoHotspot, play, pause, remove };
}