import { krpanoAPI } from "../../core";
import type { PluginOptions } from "../../types";

export function usePlugin() {
    const addPlugin = (name: string, url: string, options: PluginOptions = {}) => {
        if (!krpanoAPI) return;
        krpanoAPI.call(`addplugin(${name})`);
        krpanoAPI.set(`plugin[${name}].url`, url);

        Object.entries(options).forEach(([key, value]) => {
            krpanoAPI.set(`plugin[${name}].${key}`, value);
        });
    };

    const removePlugin = (name: string) => {
        if (!krpanoAPI) return;
        krpanoAPI.call(`removeplugin(${name})`);
    };

    const getPlugin = (name: string) => {
        if (!krpanoAPI) return null;
        return krpanoAPI.get(`plugin[${name}]`);
    };

    return { addPlugin, removePlugin, getPlugin };
}
