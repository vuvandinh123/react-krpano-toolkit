import { useContext } from "react";
import { KrpanoContext } from "../../context/KrpanoProvider";
import { UtilityOperations } from "../../types/krpano-types";

export const useUtility = () => {
    const ctx = useContext(KrpanoContext);
    if (!ctx) throw new Error("KrpanoContext chưa được cung cấp");

    const { api } = ctx;
    // Utility operations
    const utility: UtilityOperations = {
        loadXML: (url, options = {}) => {
            const { keepdisplay = false } = options;
            api.call(`loadxml(${url}, ${keepdisplay})`);
        },
        reload: () => api.call('reload()'),
        screenshot: (options = {}) => {
            const { scale = 1.0, alpha = false } = options;
            api.call(`screenshot(${scale}, ${alpha})`);
        },
        trace: (message) => api.call(`trace(${message})`),
        error: (message) => api.call(`error(${message})`),
        get: (variable) => api.get(variable),
        set: (variable, value) => api.set(variable, value),
        call: (action) => api.call(action),
        callwith: (action, ...args) => api.call(`callwith(${action}, ${args.join(', ')})`),
        wait: (time, callback) => {
            const callbackParam = callback ? `, ${callback}` : '';
            api.call(`delayedcall(${time}${callbackParam})`);
        }
    };

    return utility;
};