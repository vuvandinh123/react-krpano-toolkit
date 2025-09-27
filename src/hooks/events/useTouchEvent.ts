//
// 👆 useTouchEvent
// Lắng nghe sự kiện cảm ứng: ontouchstart, ontouchend, ontouchmove
// Listen to touch events: ontouchstart, ontouchend, ontouchmove

import { useEffect } from "react";
import { krpanoAPI } from "../../core";

//
export function useTouchEvent(
    target: string,
    events: Partial<{
        ontouchstart: () => void;
        ontouchend: () => void;
        ontouchmove: () => void;
    }>
) {
    useEffect(() => {
        if (!krpanoAPI) return;
        if (events.ontouchstart) krpanoAPI.set(`${target}.ontouchstart`, events.ontouchstart);
        if (events.ontouchend) krpanoAPI.set(`${target}.ontouchend`, events.ontouchend);
        if (events.ontouchmove) krpanoAPI.set(`${target}.ontouchmove`, events.ontouchmove);

        return () => {
            if (!krpanoAPI) return;
            krpanoAPI.set(`${target}.ontouchstart`, null);
            krpanoAPI.set(`${target}.ontouchend`, null);
            krpanoAPI.set(`${target}.ontouchmove`, null);
        };
    }, [target, events]);
}