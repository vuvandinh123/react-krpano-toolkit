import { krpanoAPI } from "../../core";
import type { HotspotOptions } from "../../types";

/**
 * Hook to access the Krpano API context.
 * @returns {{ addHotspot: (name: string, ath: number, atv: number, onclick?: string) => void, removeHotspot: (name: string) => void }}
 * @throws {Error} - If useHotspot is called outside of KrpanoProvider.
 */

export function useHotspot() {
    const addHotspot = (name: string, options: HotspotOptions) => {
        if (!krpanoAPI) {
            console.error("useHotspot must be used inside KrpanoProvider");
            return;
        }
        krpanoAPI.call(`addhotspot(${name})`);
        Object.entries(options).forEach(([key, value]) => {
            krpanoAPI.set(`hotspot[${name}].${key}`, value);
        });
    };

    const removeHotspot = (name: string) => {
        if (!krpanoAPI) {
            console.error("useHotspot must be used inside KrpanoProvider");
            return;
        }
        krpanoAPI.call(`removehotspot(${name})`);
    };

    return { addHotspot, removeHotspot };
}

