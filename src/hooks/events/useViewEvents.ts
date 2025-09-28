import { useEffect, useContext } from "react";
import {
    KrpanoEventHandler,
    KrpanoViewEventData,
} from "../../types/krpano-event";
import { KrpanoContext } from "../../context/KrpanoProvider";
import { useKrpanoEventBridge } from "./useKrpanoEventBridge";

interface ViewEventHandlers {
    onviewchange?: KrpanoEventHandler<KrpanoViewEventData>;
    onviewchanged?: KrpanoEventHandler<KrpanoViewEventData>;
    onidle?: KrpanoEventHandler<KrpanoViewEventData>;
}

export function useViewEvents(handlers: ViewEventHandlers) {
    const ctx = useContext(KrpanoContext);
    if (!ctx) throw new Error("KrpanoContext chưa được cung cấp");
    const { addEventListener } = useKrpanoEventBridge();
    const { api } = ctx;

    useEffect(() => {
        if (!api) return;
        const cleanupFns: Array<() => void> = [];

        // onviewchange
        if (handlers.onviewchange) {
            api.set(
                "events.onviewchange",
                `js(krpanoEventBridge("onviewchange", {hlookat:get(view.hlookat), vlookat:get(view.vlookat), fov:get(view.fov)}))`
            );
            const cleanup = addEventListener("onviewchange", (data) => {
                handlers.onviewchange!(data as KrpanoViewEventData);
            });
            cleanupFns.push(cleanup);
        }

        // onviewchanged
        if (handlers.onviewchanged) {
            api.set(
                "events.onviewchanged",
                `js(krpanoEventBridge("onviewchanged", {hlookat:get(view.hlookat), vlookat:get(view.vlookat), fov:get(view.fov)}))`
            );
            const cleanup = addEventListener("onviewchanged", (data) => {
                handlers.onviewchanged!(data as KrpanoViewEventData);
            });
            cleanupFns.push(cleanup);
        }

        // onidle
        if (handlers.onidle) {
            api.set("events.onidle", `js(krpanoEventBridge("onidle", {}))`);
            const cleanup = addEventListener("onidle", (data) => {
                handlers.onidle!(data as KrpanoViewEventData);
            });
            cleanupFns.push(cleanup);
        }

        return () => {
            cleanupFns.forEach((fn) => fn());
        };
    }, [api, handlers, addEventListener]);
}
