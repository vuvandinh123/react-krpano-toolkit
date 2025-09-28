import { useContext, useEffect } from "react";
import { KrpanoEventHandler, KrpanoHotspotEventData } from "../../types/krpano-event";
import { useKrpanoEventBridge } from "./useKrpanoEventBridge";
import { KrpanoContext } from "../../context/KrpanoProvider";

export const useHotspotEvent = (hotspotName: string, handlers: {
    onclick?: KrpanoEventHandler<KrpanoHotspotEventData>,
    onover?: KrpanoEventHandler<KrpanoHotspotEventData>,
    onout?: KrpanoEventHandler<KrpanoHotspotEventData>,
    ondown?: KrpanoEventHandler<KrpanoHotspotEventData>,
    onup?: KrpanoEventHandler<KrpanoHotspotEventData>,
}) => {
    const ctx = useContext(KrpanoContext);
    if (!ctx) throw new Error("KrpanoContext chưa được cung cấp");
    const { api } = ctx;
    const { addEventListener } = useKrpanoEventBridge();

    useEffect(() => {
        if (!api) return () => { };

        const cleanupFunctions: Array<() => void> = [];

        if (handlers.onclick) {
            api.set(`hotspot[${hotspotName}].onclick`, `js(krpanoEventBridge("onhotspotclick", {hotspotname: "${hotspotName}", stagex: get(mouse.stagex), stagey: get(mouse.stagey), ath: get(hotspot[${hotspotName}].ath), atv: get(hotspot[${hotspotName}].atv)}))`);
            const cleanup = addEventListener('onhotspotclick', (data) => {
                if ('hotspotname' in data && data.hotspotname === hotspotName) {
                    handlers.onclick!(data as KrpanoHotspotEventData);
                }
            });
            cleanupFunctions.push(cleanup);
        }

        if (handlers.onover) {
            api.set(`hotspot[${hotspotName}].onover`, `js(krpanoEventBridge("onhotspotover", {hotspotname: "${hotspotName}", ath: get(hotspot[${hotspotName}].ath), atv: get(hotspot[${hotspotName}].atv)}))`);
            const cleanup = addEventListener('onhotspotover', (data) => {
                if ('hotspotname' in data && data.hotspotname === hotspotName) {
                    handlers.onover!(data as KrpanoHotspotEventData);
                }
            });
            cleanupFunctions.push(cleanup);
        }

        if (handlers.onout) {
            api.set(`hotspot[${hotspotName}].onout`, `js(krpanoEventBridge("onhotspotout", {hotspotname: "${hotspotName}"}))`);
            const cleanup = addEventListener('onhotspotout', (data) => {
                if ('hotspotname' in data && data.hotspotname === hotspotName) {
                    handlers.onout!(data as KrpanoHotspotEventData);
                }
            });
            cleanupFunctions.push(cleanup);
        }

        return () => {
            cleanupFunctions.forEach(cleanup => cleanup());
        };
    }, [api, addEventListener]);
}
