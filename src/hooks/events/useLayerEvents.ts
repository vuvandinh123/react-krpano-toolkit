import { useContext, useEffect } from "react";
import { useKrpanoEventBridge } from "./useKrpanoEventBridge"; // hook core bridge
import { KrpanoLayerEventData, KrpanoEventHandler } from "../../types/krpano-event";
import { KrpanoContext } from "../../context/KrpanoProvider";

interface LayerEventHandlers {
    onclick?: KrpanoEventHandler<KrpanoLayerEventData>;
    onover?: KrpanoEventHandler<KrpanoLayerEventData>;
    onout?: KrpanoEventHandler<KrpanoLayerEventData>;
}

export function useLayerEvents(layerName: string, handlers: {
    onclick?: KrpanoEventHandler<KrpanoLayerEventData>,
    onover?: KrpanoEventHandler<KrpanoLayerEventData>,
    onout?: KrpanoEventHandler<KrpanoLayerEventData>,
    ondown?: KrpanoEventHandler<KrpanoLayerEventData>,
    onup?: KrpanoEventHandler<KrpanoLayerEventData>,
}) {
    const ctx = useContext(KrpanoContext);
    if (!ctx) throw new Error("KrpanoContext chưa được cung cấp");
    const { api } = ctx;
    
    const { addEventListener } = useKrpanoEventBridge();
    useEffect(() => {
        if (!api || !layerName) return;

        const cleanupFns: Array<() => void> = [];

        // onclick
        if (handlers.onclick) {
            api.set(`layer[${layerName}].onclick`, `js(krpanoEventBridge("onlayerclick", {layername:"${layerName}", stagex:get(mouse.stagex), stagey:get(mouse.stagey)}))`);
            const cleanup = addEventListener('onlayerclick', (data) => {
                if ('layername' in data && data.layername === layerName) {
                    handlers.onclick!(data as KrpanoLayerEventData);
                }
            });
            cleanupFns.push(cleanup);
        }

        // onover
        if (handlers.onover) {
            api.set(`layer[${layerName}].onover`, `js(krpanoEventBridge("onlayerover", {layername:"${layerName}"}))`);
            const cleanup = addEventListener('onlayerover', (data) => {
                if ('layername' in data && data.layername === layerName) {
                    handlers.onover!(data as KrpanoLayerEventData);
                }
            });
            cleanupFns.push(cleanup);
        }

        // onout
        if (handlers.onout) {
            api.set(`layer[${layerName}].onout`, `js(krpanoEventBridge("onlayerout", {layername:"${layerName}"}))`);
            const cleanup = addEventListener('onlayerout', (data) => {
                if ('layername' in data && data.layername === layerName) {
                    handlers.onout!(data as KrpanoLayerEventData);
                }
            });
            cleanupFns.push(cleanup);
        }

        return () => {
            cleanupFns.forEach(fn => fn());
        };
    }, [api, layerName, handlers, addEventListener]);
}
