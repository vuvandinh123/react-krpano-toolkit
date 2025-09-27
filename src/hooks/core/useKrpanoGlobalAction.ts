import { krpanoAPI } from "../../core";
import type { KrpanoActionCallback, KrpanoActionParams } from "../../types/action";

export function useKrpanoGlobalAction() {
    const addAction = <P extends KrpanoActionParams>(name: string, callback: KrpanoActionCallback<P>) => {
        if (!krpanoAPI) return;

        krpanoAPI.set(`action[${name}]`, callback({} as P));
    };

    const callAction = <P extends KrpanoActionParams>(name: string, params?: P) => {
        if (!krpanoAPI) return;

        if (params) {
            const args = Object.values(params).join(", ");
            krpanoAPI.call(`${name}(${args})`);
        } else {
            krpanoAPI.call(`${name}()`);
        }
    };

    return { addAction, callAction };
}
