import { useEffect, useContext } from "react";
import { KrpanoContext } from "../../context/KrpanoProvider";
import { useKrpanoEventBridge } from "./useKrpanoEventBridge";
import { KrpanoEventType } from "../../types/krpano-event";

export interface SystemEventHandlers {
    onready?: (data: any) => void;
    onxmlcomplete?: (data: any) => void;
    onloadcomplete?: (data: any) => void;
    onnewpano?: (data: any) => void;
    onremovepano?: (data: any) => void;
    onkeydown?: (data: { keycode: number }) => void;
    onkeyup?: (data: { keycode: number }) => void;
    onresize?: (data: any) => void;
    onenterfullscreen?: (data: any) => void;
    onexitfullscreen?: (data: any) => void;
}

export function useSystemEvents(handlers: SystemEventHandlers) {
    const ctx = useContext(KrpanoContext);
    if (!ctx) throw new Error("KrpanoContext chưa được cung cấp");
    const { api } = ctx;
    const { addEventListener } = useKrpanoEventBridge();

    useEffect(() => {
        if (!api) return;
        const cleanupFns: Array<() => void> = [];

        // helper để đăng ký
        const register = (event: KrpanoEventType, expr: string) => {
            if (handlers[event as keyof SystemEventHandlers]) {
                api.set(`events.${event}`, expr);
                const cleanup = addEventListener(event, (data) => {
                    switch (event) {
                        case "onkeydown":
                        case "onkeyup":
                            handlers[event as "onkeydown" | "onkeyup"]?.(data as { keycode: number });
                            break;
                        case "onready":
                        case "onxmlcomplete":
                        case "onloadcomplete":
                        case "onnewpano":
                        case "onremovepano":
                        case "onresize":
                        case "onenterfullscreen":
                        case "onexitfullscreen":
                            handlers[event as Exclude<keyof SystemEventHandlers, "onkeydown" | "onkeyup">]?.(data);
                            break;
                        default:
                            // fallback for unexpected event types
                            break;
                    }
                });
                cleanupFns.push(cleanup);
            }
        };

        // đăng ký các event
        register("onready", `js(krpanoEventBridge("onready", {}))`);
        register("onxmlcomplete", `js(krpanoEventBridge("onxmlcomplete", {}))`);
        register("onnewpano", `js(krpanoEventBridge("onnewpano", {scene:get(xml.scene)}))`);
        register("onremovepano", `js(krpanoEventBridge("onremovepano", {}))`);
        register("onkeydown", `js(krpanoEventBridge("onkeydown", {keycode:get(keycode)}))`);
        register("onkeyup", `js(krpanoEventBridge("onkeyup", {keycode:get(keycode)}))`);
        register("onresize", `js(krpanoEventBridge("onresize", {}))`);
        register("onenterfullscreen", `js(krpanoEventBridge("onenterfullscreen", {}))`);
        register("onexitfullscreen", `js(krpanoEventBridge("onexitfullscreen", {}))`);

        return () => cleanupFns.forEach((fn) => fn());
    }, [api, handlers, addEventListener]);
}
