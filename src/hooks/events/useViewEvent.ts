/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { krpanoAPI } from "../../core";

type ViewEventName = "onviewchange" | "onviewchanged";

export function useViewEvent(
    eventName: ViewEventName,
    handler: () => void
) {

    useEffect(() => {
        if (!krpanoAPI) return;

        const eventId = `view_event_${eventName}_${Date.now()}`;
        krpanoAPI.set(`events[${eventId}].${eventName}`, handler);

        return () => {
            if (krpanoAPI) {
                krpanoAPI.call(`removeevents(${eventId})`);
            }
        };
    }, [krpanoAPI, eventName, handler]);
}
