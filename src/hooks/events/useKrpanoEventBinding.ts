import { useEffect } from "react";
import { krpanoAPI } from "../../core";

export type KrpanoEventHandler = () => void;

export function useKrpanoEventBinding(
    target: string, // vd: hotspot[hs_balcony]
    eventName: "onclick" | "onover" | "onout" | string,
    handler: KrpanoEventHandler
) {
    useEffect(() => {
        if (!krpanoAPI) return;

        // gắn handler trực tiếp vào property event
        krpanoAPI.set(`${target}.${eventName}`, handler);

        // cleanup khi unmount
        return () => {
            if (krpanoAPI.get(target)) {
                krpanoAPI.set(`${target}.${eventName}`, null);
            }
        };
    }, [target, eventName, handler]);
}
