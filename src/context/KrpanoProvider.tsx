/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useRef, useEffect } from "react";
import { KrpanoAPI } from "../core/KrpanoAPI";
import { EventBus } from "../core/EventBus";

export interface KrpanoContextValue {
    api: KrpanoAPI;
    events: EventBus;
}

export const KrpanoContext = createContext<KrpanoContextValue>({
    api: new KrpanoAPI(),
    events: new EventBus(),
});

export const KrpanoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const apiRef = useRef(new KrpanoAPI());
    const eventBusRef = useRef(new EventBus());

    useEffect(() => {
        (window as any).onKrpanoReady = (instance: any) => {
            apiRef.current.setInstance(instance);
            eventBusRef.current.emit("ready", instance);
        };
    }, []);

    return (
        <KrpanoContext.Provider value={{ api: apiRef.current, events: eventBusRef.current }}>
            {children}
        </KrpanoContext.Provider>
    );
};
