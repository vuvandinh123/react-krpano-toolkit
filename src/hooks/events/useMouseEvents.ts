import { useRef, useCallback, useEffect, useContext } from "react";
import { KrpanoEventType, KrpanoEventHandler, KrpanoEventData, KrpanoMouseEventData } from "../../types/krpano-event";
import { KrpanoContext } from "../../context/KrpanoProvider";
import { useKrpanoEventBridge } from "./useKrpanoEventBridge";

interface MouseEventHandlers {
    onclick?: KrpanoEventHandler<KrpanoMouseEventData>;
    ondblclick?: KrpanoEventHandler<KrpanoMouseEventData>;
    onmousedown?: KrpanoEventHandler<KrpanoMouseEventData>;
    onmouseup?: KrpanoEventHandler<KrpanoMouseEventData>;
    onmousemove?: KrpanoEventHandler<KrpanoMouseEventData>;
}
export function useMouseEvents(handlers: MouseEventHandlers) {
    const ctx = useContext(KrpanoContext);
    if (!ctx) throw new Error("KrpanoContext chưa được cung cấp");
    const { addEventListener } = useKrpanoEventBridge();

    const { api } = ctx;
    useEffect(() => {
        if (!api) return;

        const cleanupFns: Array<() => void> = [];


        // onclick
        if (handlers.onclick) {
            api.set(
                "events.onclick",
                `js(krpanoEventBridge("onclick", {stagex:get(mouse.stagex), stagey:get(mouse.stagey)}))`
            );
            const cleanup = addEventListener("onclick", (data) => {
                handlers.onclick!(data as unknown as KrpanoMouseEventData);
            });
            cleanupFns.push(cleanup);
        }

        // ondblclick
        if (handlers.ondblclick) {
            api.set(
                "events.ondblclick",
                `js(krpanoEventBridge("ondblclick", {stagex:get(mouse.stagex), stagey:get(mouse.stagey)}))`
            );
            const cleanup = addEventListener("ondblclick", (data) => {
                handlers.ondblclick!(data as KrpanoMouseEventData);
            });
            cleanupFns.push(cleanup);
        }

        // onmousedown
        if (handlers.onmousedown) {
            api.set(
                "events.onmousedown",
                `js(krpanoEventBridge("onmousedown", {stagex:get(mouse.stagex), stagey:get(mouse.stagey), button:get(mouse.button)}))`
            );
            const cleanup = addEventListener("onmousedown", (data) => {
                handlers.onmousedown!(data as KrpanoMouseEventData);
            });
            cleanupFns.push(cleanup);
        }

        // onmouseup
        if (handlers.onmouseup) {
            api.set(
                "events.onmouseup",
                `js(krpanoEventBridge("onmouseup", {stagex:get(mouse.stagex), stagey:get(mouse.stagey), button:get(mouse.button)}))`
            );
            const cleanup = addEventListener("onmouseup", (data) => {
                handlers.onmouseup!(data as KrpanoMouseEventData);
            });
            cleanupFns.push(cleanup);
        }

        // onmousemove
        if (handlers.onmousemove) {
            api.set(
                "events.onmousemove",
                `js(krpanoEventBridge("onmousemove", {stagex:get(mouse.stagex), stagey:get(mouse.stagey)}))`
            );
            const cleanup = addEventListener("onmousemove", (data) => {
                handlers.onmousemove!(data as KrpanoMouseEventData);
            });
            cleanupFns.push(cleanup);
        }

        return () => {
            cleanupFns.forEach((fn) => fn());
        };
    }, [api, handlers, addEventListener]);

}
