import { useRef, useCallback, useEffect, useContext } from "react";
import { KrpanoEventType, KrpanoEventHandler, KrpanoEventData } from "../../types/krpano-event";
import { KrpanoContext } from "../../context/KrpanoProvider";

export function useKrpanoEventBridge() {
    const ctx = useContext(KrpanoContext);
    if (!ctx) throw new Error("KrpanoContext chưa được cung cấp");

    const { api } = ctx;
    const handlersRef = useRef<Map<KrpanoEventType, Set<KrpanoEventHandler>>>(new Map());

    // Khởi tạo global event bridge
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Tạo global bridge function để Krpano có thể gọi
            (window as any).krpanoEventBridge = (eventType: KrpanoEventType, eventData: any) => {
                const handlers = handlersRef.current.get(eventType);
                if (handlers) {
                    const processedData: KrpanoEventData = {
                        type: eventType,
                        timestamp: Date.now(),
                        ...eventData
                    };

                    handlers.forEach(handler => {
                        try {
                            handler(processedData);
                        } catch (error) {
                            console.error(`Error in Krpano event handler for ${eventType}:`, error);
                        }
                    });
                }
            };

            // Setup Krpano event listeners
            setupKrpanoEventListeners();
        }

        return () => {
            if (typeof window !== 'undefined') {
                delete (window as any).krpanoEventBridge;
            }
        };
    }, [api]);

    // Setup các event listeners trong Krpano
    const setupKrpanoEventListeners = useCallback(() => {
        if (!api) return;

        // System Events
        api.set('events.onloadcomplete', 'js(krpanoEventBridge("onloadcomplete", {}))');
        api.set('events.onxmlcomplete', 'js(krpanoEventBridge("onxmlcomplete", {}))');
        api.set('events.onready', 'js(krpanoEventBridge("onready", {}))');
        api.set('events.onerror', 'js(krpanoEventBridge("onerror", {error: get(lasterror)}))');
        api.set('events.onresize', 'js(krpanoEventBridge("onresize", {width: get(stagewidth), height: get(stageheight)}))');
        api.set('events.onfullscreenchange', 'js(krpanoEventBridge("onfullscreenchange", {fullscreen: get(fullscreen)}))');

        // Scene Events
        api.set('events.onnewscene', 'js(krpanoEventBridge("onnewscene", {scenename: get(xml.scene), sceneindex: get(xml.sceneindex)}))');
        api.set('events.onremovescene', 'js(krpanoEventBridge("onremovescene", {scenename: get(xml.scene)}))');

        // View Events
        api.set('events.onviewchange', 'js(krpanoEventBridge("onviewchange", {hlookat: get(view.hlookat), vlookat: get(view.vlookat), fov: get(view.fov)}))');
        api.set('events.onviewchanged', 'js(krpanoEventBridge("onviewchanged", {hlookat: get(view.hlookat), vlookat: get(view.vlookat), fov: get(view.fov)}))');
        api.set('events.onidle', 'js(krpanoEventBridge("onidle", {}))');

        // Mouse Events
        api.set('events.onclick', 'js(krpanoEventBridge("onclick", {stagex: get(mouse.stagex), stagey: get(mouse.stagey)}))');
        api.set('events.ondblclick', 'js(krpanoEventBridge("ondblclick", {stagex: get(mouse.stagex), stagey: get(mouse.stagey)}))');
        api.set('events.onmousedown', 'js(krpanoEventBridge("onmousedown", {stagex: get(mouse.stagex), stagey: get(mouse.stagey), button: get(mouse.button)}))');
        api.set('events.onmouseup', 'js(krpanoEventBridge("onmouseup", {stagex: get(mouse.stagex), stagey: get(mouse.stagey), button: get(mouse.button)}))');
        api.set('events.onmousemove', 'js(krpanoEventBridge("onmousemove", {stagex: get(mouse.stagex), stagey: get(mouse.stagey)}))');

        // Keyboard Events
        api.set('events.onkeydown', 'js(krpanoEventBridge("onkeydown", {keycode: get(key.keycode), key: get(key.key), ctrlkey: get(key.ctrlkey), shiftkey: get(key.shiftkey), altkey: get(key.altkey)}))');
        api.set('events.onkeyup', 'js(krpanoEventBridge("onkeyup", {keycode: get(key.keycode), key: get(key.key), ctrlkey: get(key.ctrlkey), shiftkey: get(key.shiftkey), altkey: get(key.altkey)}))');

    }, [api]);

    // Thêm event listener
    const addEventListener = useCallback(<T extends KrpanoEventData = KrpanoEventData>(
        eventType: KrpanoEventType,
        handler: KrpanoEventHandler<T>
    ) => {
        if (!handlersRef.current.has(eventType)) {
            handlersRef.current.set(eventType, new Set());
        }
        handlersRef.current.get(eventType)?.add(handler as KrpanoEventHandler);

        // Return cleanup function
        return () => {
            handlersRef.current.get(eventType)?.delete(handler as KrpanoEventHandler);
        };
    }, []);

    // Xóa event listener
    const removeEventListener = useCallback((
        eventType: KrpanoEventType,
        handler: KrpanoEventHandler
    ) => {
        handlersRef.current.get(eventType)?.delete(handler);
    }, []);

    // Xóa tất cả listeners của một event
    const removeAllEventListeners = useCallback((eventType?: KrpanoEventType) => {
        if (eventType) {
            handlersRef.current.delete(eventType);
        } else {
            handlersRef.current.clear();
        }
    }, []);

    // Trigger custom event
    const triggerCustomEvent = useCallback((eventType: KrpanoEventType, data: any) => {
        if (typeof window !== 'undefined' && (window as any).krpanoEventBridge) {
            (window as any).krpanoEventBridge(eventType, data);
        }
    }, []);

    return { addEventListener, removeAllEventListeners, triggerCustomEvent, removeEventListener };
}
