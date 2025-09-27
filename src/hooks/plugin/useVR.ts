import { useState, useEffect } from "react";
import { krpanoAPI } from "../../core";

export function useVR(pluginName: string = "webvr") {
    const [enabled, setEnabled] = useState(false);
    const [pluginReady, setPluginReady] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!krpanoAPI) return;

            // Kiểm tra plugin WebVR đã load chưa
            const webvrPlugin = krpanoAPI.get(`plugin[${pluginName}]`);
            setPluginReady(!!webvrPlugin);

            // Cập nhật trạng thái VR
            if (webvrPlugin) {
                setEnabled(krpanoAPI.get(`${pluginName}.enabled`) === true);
            }
        }, 200);

        return () => clearInterval(interval);
    }, [pluginName]);

    const enterVR = () => {
        if (!pluginReady) return;
        krpanoAPI.call(`${pluginName}.enter()`);
    };

    const exitVR = () => {
        if (!pluginReady) return;
        krpanoAPI.call(`${pluginName}.exit()`);
    };

    const toggleVR = () => {
        if (!pluginReady) return;
        if (enabled) {
            exitVR();
        } else {
            enterVR();
        }
    };

    return { enterVR, exitVR, toggleVR, isVREnabled: enabled, pluginReady };
}
