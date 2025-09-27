/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { krpanoAPI } from "../../core";

type SceneEventName =
    | "onstart"
    | "onloaded"
    | "onnewpano"
    | "onremovepano"
    | "onxmlcomplete"
    | "onresize";

export function useSceneEvent(
    eventName: SceneEventName,
    handler: () => void
) {

    useEffect(() => {
        if (!krpanoAPI) return;

        const eventId = `scene_event_${eventName}_${Date.now()}`;
        krpanoAPI.set(`events[${eventId}].${eventName}`, handler);

        return () => {
            if (krpanoAPI) {
                krpanoAPI.call(`removeevents(${eventId})`);
            }
        };
    }, [krpanoAPI, eventName, handler]);
}
