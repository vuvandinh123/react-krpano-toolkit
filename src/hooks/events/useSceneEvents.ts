import { useEffect, useContext } from "react";
import { KrpanoEventHandler, KrpanoSceneEventData } from "../../types/krpano-event";
import { KrpanoContext } from "../../context/KrpanoProvider";
import { useKrpanoEventBridge } from "./useKrpanoEventBridge";

interface SceneEventHandlers {
    onstart?: KrpanoEventHandler<KrpanoSceneEventData>;
    onready?: KrpanoEventHandler<KrpanoSceneEventData>;
    onloaded?: KrpanoEventHandler<KrpanoSceneEventData>;
    onxmlcomplete?: KrpanoEventHandler<KrpanoSceneEventData>;
    onnewpano?: KrpanoEventHandler<KrpanoSceneEventData>;
    onremovepano?: KrpanoEventHandler<KrpanoSceneEventData>;
}

export function useSceneEvents(handlers: SceneEventHandlers) {
    const ctx = useContext(KrpanoContext);
    if (!ctx) throw new Error("KrpanoContext chưa được cung cấp");
    const { addEventListener } = useKrpanoEventBridge();
    const { api } = ctx;

    useEffect(() => {
        if (!api) return;
        const cleanupFns: Array<() => void> = [];

        // onstart
        if (handlers.onstart) {
            api.set(
                "events.onstart",
                `js(krpanoEventBridge("onstart", {scene:get(xml.scene)}))`
            );
            const cleanup = addEventListener("onstart", (data) => {
                handlers.onstart!(data as KrpanoSceneEventData);
            });
            cleanupFns.push(cleanup);
        }

        // onloaded
        if (handlers.onloaded) {
            api.set(
                "events.onloaded",
                `js(krpanoEventBridge("onloaded", {scene:get(xml.scene)}))`
            );
            const cleanup = addEventListener("onloaded", (data) => {
                handlers.onloaded!(data as KrpanoSceneEventData);
            });
            cleanupFns.push(cleanup);
        }
        // onready
        if (handlers.onready) {
            api.set(
                "events.onready",
                `js(krpanoEventBridge("onready", {scene:get(xml.scene)}))`
            );
            const cleanup = addEventListener("onready", (data) => {
                handlers.onready!(data as KrpanoSceneEventData);
            });
            cleanupFns.push(cleanup);
        }

        // onxmlcomplete
        if (handlers.onxmlcomplete) {
            api.set(
                "events.onxmlcomplete",
                `js(krpanoEventBridge("onxmlcomplete", {scene:get(xml.scene)}))`
            );
            const cleanup = addEventListener("onxmlcomplete", (data) => {
                handlers.onxmlcomplete!(data as KrpanoSceneEventData);
            });
            cleanupFns.push(cleanup);
        }

        // onnewpano
        if (handlers.onnewpano) {
            api.set(
                "events.onnewpano",
                `js(krpanoEventBridge("onnewpano", {scene:get(xml.scene)}))`
            );
            const cleanup = addEventListener("onnewpano", (data) => {
                handlers.onnewpano!(data as KrpanoSceneEventData);
            });
            cleanupFns.push(cleanup);
        }

        // onremovepano
        if (handlers.onremovepano) {
            api.set(
                "events.onremovepano",
                `js(krpanoEventBridge("onremovepano", {scene:get(xml.scene)}))`
            );
            const cleanup = addEventListener("onremovepano", (data) => {
                handlers.onremovepano!(data as KrpanoSceneEventData);
            });
            cleanupFns.push(cleanup);
        }

        return () => {
            cleanupFns.forEach((fn) => fn());
        };
    }, [api, handlers, addEventListener]);
}
