import { useState, useEffect, useContext } from "react";
import { KrpanoContext } from "../../context/KrpanoProvider";

export function useLoading() {
    const [progress, setProgress] = useState(0);
    const { api, events } = useContext(KrpanoContext);

    useEffect(() => {
        if (!api || !events) return;

        let interval: any;

        const startProgress = () => {
            interval = setInterval(() => {
                setProgress((prev) => {
                    const next = prev + Math.random() * 5;
                    return Math.min(Math.floor(next), 95);
                });
            }, 100);
        };

        const finishProgress = () => {
            clearInterval(interval);
            setProgress(100);
        };

        if (api.isReady()) {
            startProgress();
            finishProgress();
        } else {
            startProgress();
            events.on("ready", finishProgress);
        }

        return () => {
            clearInterval(interval);
            events.off("ready", finishProgress);
        };
    }, [api, events]);

    const isLoaded = progress >= 100;

    return { progress, isLoaded };
}
