import { useEffect } from "react";
import { krpanoAPI } from "../../core";
import type { KrpanoEventHandlerMap, KrpanoEventName } from "../../types/event";

/**
 * Hook to access the Krpano API context and add an event listener.
 * @param {string} eventName - The name of the event to listen to.
 * @param {function} handler - The function to call when the event is triggered.
 * @returns {function} - A function to remove the event listener.
 * @throws {Error} - If useKrpanoEvent is called outside of KrpanoProvider.
 */
export function useKrpanoEvent<K extends KrpanoEventName>(
    eventName: K,
    handler: KrpanoEventHandlerMap[K]
) {
    useEffect(() => {
        if (!krpanoAPI) return;

        const eventId = `react_event_${eventName}_${Date.now()}`;
        krpanoAPI.set(`events[${eventId}].${eventName}`, handler);

        return () => {
            if (krpanoAPI) krpanoAPI.call(`removeevents(${eventId})`);
        };
    }, [eventName, handler]);
}
