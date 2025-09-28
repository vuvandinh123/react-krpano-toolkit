import { useEffect, useContext } from "react";
import {
    KrpanoEventHandler,
    KrpanoKeyboardEventData,
} from "../../types/krpano-event";
import { KrpanoContext } from "../../context/KrpanoProvider";
import { useKrpanoEventBridge } from "./useKrpanoEventBridge";

interface KeyboardEventHandlers {
    onkeydown?: KrpanoEventHandler<KrpanoKeyboardEventData>;
    onkeyup?: KrpanoEventHandler<KrpanoKeyboardEventData>;
}

export function useKeyboardEvents(handlers: KeyboardEventHandlers) {
    const ctx = useContext(KrpanoContext);
    if (!ctx) throw new Error("KrpanoContext chưa được cung cấp");

    const { addEventListener } = useKrpanoEventBridge();
    const { api } = ctx;

    useEffect(() => {
        if (!api) return;
        const cleanupFns: Array<() => void> = [];

        // onkeydown
        if (handlers.onkeydown) {
            api.set(
                "events.onkeydown",
                `js(krpanoEventBridge("onkeydown", {
          keycode:get(key.keycode),
          key:get(key.key),
          ctrlkey:get(key.ctrlkey),
          shiftkey:get(key.shiftkey),
          altkey:get(key.altkey)
        }))`
            );
            const cleanup = addEventListener("onkeydown", (data) => {
                handlers.onkeydown!(data as KrpanoKeyboardEventData);
            });
            cleanupFns.push(cleanup);
        }

        // onkeyup
        if (handlers.onkeyup) {
            api.set(
                "events.onkeyup",
                `js(krpanoEventBridge("onkeyup", {
          keycode:get(key.keycode),
          key:get(key.key),
          ctrlkey:get(key.ctrlkey),
          shiftkey:get(key.shiftkey),
          altkey:get(key.altkey)
        }))`
            );
            const cleanup = addEventListener("onkeyup", (data) => {
                handlers.onkeyup!(data as KrpanoKeyboardEventData);
            });
            cleanupFns.push(cleanup);
        }

        return () => {
            cleanupFns.forEach((fn) => fn());
        };
    }, [api, handlers, addEventListener]);
}
