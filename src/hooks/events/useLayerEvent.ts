import { useEffect } from "react";
import { krpanoAPI } from "../../core";

export type LayerEventName = "onclick" | "onover" | "onout" | "ondown" | "onup";

export function useLayerEvent(
    layerName: string, // tên layer
    event: LayerEventName,
    handler: () => void
) {
    useEffect(() => {
        if (!krpanoAPI) return;

        const target = `layer[${layerName}]`;

        krpanoAPI.set(`${target}.${event}`, handler);

        return () => {
            if (krpanoAPI.get(target)) {
                krpanoAPI.set(`${target}.${event}`, null);
            }
        };
    }, [layerName, event, handler]);
}
