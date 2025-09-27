import { useEffect } from "react";
import { krpanoAPI } from "../../core";
import type { KeyMap } from "../../types/action";

export function useKeyboard(keyMap: KeyMap) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const action = keyMap[e.key];
            if (!action || !krpanoAPI) return;

            switch (action.type) {
                case "lookto":
                    krpanoAPI.call(`lookto(${action.hlookat}, ${action.vlookat})`);
                    break;

                case "pan": {
                    // tính toán mới dựa trên dh/dv
                    const h = `view.hlookat+${action.dh}`;
                    const v = `view.vlookat+${action.dv}`;
                    krpanoAPI.call(`lookto(${h}, ${v})`);
                    break;
                }

                case "layer":
                    krpanoAPI.set(`layer[${action.name}].visible`, action.visible);
                    break;

                case "plugin": {
                    const params = action.params ? action.params.join(", ") : "";
                    krpanoAPI.call(`plugin[${action.name}].${action.action}(${params})`);
                    break;
                }

                case "call":
                    krpanoAPI.call(action.command);
                    break;
            }
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [keyMap]);
}