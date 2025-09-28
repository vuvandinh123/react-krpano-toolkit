import { useContext } from "react";
import { KrpanoContext } from "../../context/KrpanoProvider";
import { ViewOperations } from "../../types/krpano-types";

export const useView = () => {
    const ctx = useContext(KrpanoContext);
    if (!ctx) throw new Error("KrpanoContext chưa được cung cấp");

    const { api } = ctx;
    // View operations
    const view: ViewOperations = {
        lookAt: (hlookat: number, vlookat: number, fov?: number, options = {}) => {
            const { smooth = true, time = 1.0, tween = "easeInOutSine", blend } = options;
            const fovParam = fov !== undefined ? `, ${fov}` : '';
            const blendParam = blend !== undefined ? `, ${blend}` : '';

            if (smooth) {
                api.call(`tween(view.hlookat|view.vlookat${fov ? '|view.fov' : ''}, ${hlookat}|${vlookat}${fov ? `|${fov}` : ''}, ${time}, ${tween}${blendParam})`);
            } else {
                api.set('view.hlookat', hlookat);
                api.set('view.vlookat', vlookat);
                if (fov !== undefined) api.set('view.fov', fov);
            }
        },
        lookTo: (ath: number, atv: number, options = {}) => {
            const { smooth = true, time = 1.0 } = options;
            if (smooth) {
                api.call(`lookto(${ath}, ${atv}, ${time})`);
            } else {
                api.call(`looktohotspot('', ${ath}, ${atv})`);
            }
        },
        zoomTo: (fov: number, options = {}) => {
            const { smooth = true, time = 1.0 } = options;
            if (smooth) {
                api.call(`tween(view.fov, ${fov}, ${time})`);
            } else {
                api.set('view.fov', fov);
            }
        },
        moveCamera: (direction: 'up' | 'down' | 'left' | 'right', amount = 5) => {
            const directions = {
                up: `add(view.vlookat, ${amount})`,
                down: `add(view.vlookat, -${amount})`,
                left: `add(view.hlookat, -${amount})`,
                right: `add(view.hlookat, ${amount})`
            };
            api.call(directions[direction]);
        },
        stopMovement: () => {
            api.call('stopdelayedcall(); stoptween();');
        }
    };
    return view;
};