import { krpanoAPI } from "../../core";
import type { KrpanoLayerProps } from "../../types";

export function useLayer() {

    const addLayer = (name: string, options: KrpanoLayerProps, parent?: string) => {
        if (!krpanoAPI) return;

        if (parent) {
            krpanoAPI.call(`addlayer(${parent}.layer[${name}])`);
        } else {
            krpanoAPI.call(`addlayer(${name})`);
        }

        Object.keys(options).forEach((key) => {
            const path = parent ? `layer[${parent}].layer[${name}].${key}` : `layer[${name}].${key}`;
            krpanoAPI.set(path, options[key]);
        });
    };


    const removeLayer = (name: string) => {
        if (!krpanoAPI) return;
        krpanoAPI.call(`removelayer(${name})`);
    };

    return { addLayer, removeLayer };
}
