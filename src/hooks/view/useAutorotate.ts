import { useEffect, useState } from "react";
import { krpanoAPI } from "../../core";

/**
 * Hook to start, stop and toggle the autorotate feature in Krpano.
 * @returns {{ start: () => void, stop: () => void, toggle: () => void }}
 * @throws {Error} - If useAutorotate is called outside of KrpanoProvider.
 */
export type AutorotateOptions = {
    enabled?: boolean;
    waittime?: number;   // thời gian chờ trước khi xoay (ms)
    speed?: number;      // tốc độ xoay (deg/second)
    accel?: number;      // gia tốc xoay
    horizon?: number;    // giữ đường chân trời
    tofov?: number;      // tự zoom về fov
};

export function useAutorotate() {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!krpanoAPI) return;
            setEnabled(krpanoAPI.get("autorotate.enabled") === true);
        }, 300);

        return () => clearInterval(interval);
    }, []);

    const start = () => {
        if (!krpanoAPI) throw new Error("useAutorotate must be used inside KrpanoProvider");
        krpanoAPI.call("autorotate.start()");
        setEnabled(true);
    };

    const stop = () => {
        if (!krpanoAPI) throw new Error("useAutorotate must be used inside KrpanoProvider");
        krpanoAPI.call("autorotate.stop()");
        setEnabled(false);
    };

    const toggle = () => {
        if (enabled) stop();
        else start();
    };

    const setOptions = (options: AutorotateOptions) => {
        if (!krpanoAPI) throw new Error("useAutorotate must be used inside KrpanoProvider");
        Object.entries(options).forEach(([key, value]) => {
            krpanoAPI.set(`autorotate.${key}`, value);
        });
    };

    return { start, stop, toggle, setOptions, enabled };
}

