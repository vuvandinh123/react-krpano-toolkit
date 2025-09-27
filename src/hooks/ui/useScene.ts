import { krpanoAPI } from "../../core";
import type { BlendMode, SceneOptions } from "../../types";



export function useScene() {
    /**
     * Load một scene với options
     */
    const loadScene = (name: string, options: SceneOptions = {}) => {
        const instance = krpanoAPI.get("instance");
        if (!instance) throw new Error("useScene must be used inside KrpanoProvider");

        const { keep, merge, blend, flags } = options;

        // Ghép flags
        const flagString = [
            keep ? "KEEP" : null,
            merge ? "MERGE" : null,
            ...(flags || []),
        ]
            .filter(Boolean)
            .join(",");

        const blendStr = blend ?? "";

        krpanoAPI.call(`loadscene(${name}, null, ${flagString}, ${blendStr})`);
    };

    /**
     * Preload scene (không active)
     */
    const preloadScene = (name: string) => {
        loadScene(name, { flags: ["PRELOAD"], keep: true });
    };

    /**
     * Switch scene mượt mà
     */
    const switchScene = (name: string, blend: BlendMode = "BLEND(1)") => {
        loadScene(name, { keep: true, blend });
    };

    /**
     * Lấy scene hiện tại
     */
    const getCurrentScene = (): string | null => {
        const instance = krpanoAPI.get("instance");
        if (!instance) throw new Error("useScene must be used inside KrpanoProvider");
        return krpanoAPI.get("xml.scene") || null;
    };

    return { loadScene, preloadScene, switchScene, getCurrentScene };
}
