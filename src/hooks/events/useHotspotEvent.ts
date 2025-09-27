import { useEffect } from "react";
import { krpanoAPI } from "../../core";

export type HotspotEventName = "onclick" | "onover" | "onout" | "ondown" | "onup";

export function useHotspotEvent(
    hotspotName: string, // tên hotspot
    event: HotspotEventName,
    handler: () => void
) {
    useEffect(() => {
        if (!krpanoAPI) return;

        const target = `hotspot[${hotspotName}]`;

        // gắn handler vào hotspot
        krpanoAPI.set(`${target}.${event}`, handler);

        // cleanup
        return () => {
            if (krpanoAPI.get(target)) {
                krpanoAPI.set(`${target}.${event}`, null);
            }
        };
    }, [hotspotName, event, handler]);
}
