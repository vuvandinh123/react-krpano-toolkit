import { krpanoAPI } from "../../core";
import type { KrpanoLayerProps } from "../../types";


export function useSkin() {

    const showSkin = () => {
        if (!krpanoAPI) return;
        krpanoAPI.call("skin_show()");
    };

    const hideSkin = () => {
        if (!krpanoAPI) return;
        krpanoAPI.call("skin_hide()");
    };

    const toggleSkin = () => {
        if (!krpanoAPI) return;
        krpanoAPI.call("skin_toggle()");
    };
    const show = (name: string) => {
        if (!krpanoAPI) return;
        krpanoAPI.set(`layer[${name}].visible`, true);
    };

    const hide = (name: string) => {
        if (!krpanoAPI) return;
        krpanoAPI.set(`layer[${name}].visible`, false);
    };

    const toggle = (name: string) => {
        if (!krpanoAPI) return;
        const current = krpanoAPI.get(`layer[${name}].visible`);
        krpanoAPI.set(`layer[${name}].visible`, !current);
    };
    const setSkin = <K extends keyof KrpanoLayerProps>(
        name: string,
        prop: K,
        value: KrpanoLayerProps[K]
    ) => {
        if (!krpanoAPI) return;
        krpanoAPI.set(`layer[${name}].${prop}`, value);
    };

    const getSkin = <K extends keyof KrpanoLayerProps>(
        name: string,
        prop: K
    ): KrpanoLayerProps[K] | null => {
        if (!krpanoAPI) return null;
        return krpanoAPI.get(`layer[${name}].${prop}`);
    };

    return { showSkin, hideSkin, toggleSkin, show, hide, toggle, setSkin, getSkin };
}
