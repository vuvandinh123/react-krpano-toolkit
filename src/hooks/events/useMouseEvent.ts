//
// 🖱️ useMouseEvent
// Lắng nghe sự kiện chuột: ondown, onup, onclick
// Listen to mouse events: ondown, onup, onclick

import { useEffect } from "react";
import { krpanoAPI } from "../../core";

//
export function useMouseEvent(
    target: string,
    events: Partial<{
        ondown: () => void;
        onup: () => void;
        onclick: () => void;
    }>
) {
    useEffect(() => {
        if (!krpanoAPI) return;
        if (events.ondown) krpanoAPI.set(`${target}.ondown`, events.ondown);
        if (events.onup) krpanoAPI.set(`${target}.onup`, events.onup);
        if (events.onclick) krpanoAPI.set(`${target}.onclick`, events.onclick);

        return () => {
            if (!krpanoAPI) return;
            krpanoAPI.set(`${target}.ondown`, null);
            krpanoAPI.set(`${target}.onup`, null);
            krpanoAPI.set(`${target}.onclick`, null);
        };
    }, [target, events]);
}