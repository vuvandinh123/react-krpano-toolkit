
/**
 * Krpano Event Types - Tất cả các sự kiện có thể xảy ra
 */
export type KrpanoEventType =
    // System Events
    | "onloadcomplete"
    | "onxmlcomplete"
    | "onready"
    | "onloaded"
    | "onstart"
    | "onerror"
    | "onresize"
    | "onfullscreenchange"
    | "onenterfullscreen"
    | "onexitfullscreen"

    // Scene Events  
    | "onnewscene"
    | "onremovescene"
    | "onnewpano"
    | "onremovepano"
    | "onsceneload"
    | "onsceneloadcomplete"
    | "onsceneleave"

    // View Events
    | "onviewchange"
    | "onviewchanged"
    | "onidle"
    | "onmovestart"
    | "onmoving"
    | "onmoveend"
    | "onzoomstart"
    | "onzooming"
    | "onzoomend"

    // Mouse Events
    | "onclick"
    | "ondblclick"
    | "onmousedown"
    | "onmouseup"
    | "onmousemove"
    | "onmouseover"
    | "onmouseout"
    | "onmouseenter"
    | "onmouseleave"
    | "onmousewheel"
    | "oncontextmenu"

    // Touch Events
    | "ontouchstart"
    | "ontouchmove"
    | "ontouchend"
    | "ontouchcancel"
    | "onpinchstart"
    | "onpinching"
    | "onpinchend"

    // Keyboard Events
    | "onkeydown"
    | "onkeyup"
    | "onkeypress"

    // Hotspot Events
    | "onhotspotclick"
    | "onhotspotover"
    | "onhotspotout"
    | "onhotspotdown"
    | "onhotspotup"
    | "onhotspotloaded"

    // Layer Events
    | "onlayerclick"
    | "onlayerover"
    | "onlayerout"
    | "onlayerdown"
    | "onlayerup"
    | "onlayerloaded"

    // Plugin Events
    | "onpluginloaded"
    | "onpluginclick"
    | "onpluginover"
    | "onpluginout"

    // Sound Events
    | "onsoundloaded"
    | "onsoundcomplete"
    | "onsoundfailed"

    // Custom Events
    | "oncustom"
    | "onaction"
    | "ontimer";

/**
 * Event Data Interfaces
 */
export interface KrpanoBaseEventData {
    type: KrpanoEventType;
    timestamp: number;
    target?: string;
}

export interface KrpanoSystemEventData extends KrpanoBaseEventData {
    width?: number;
    height?: number;
    error?: string;
    url?: string;
}

export interface KrpanoSceneEventData extends KrpanoBaseEventData {
    scenename: string;
    sceneindex?: number;
    prevscene?: string;
    xml?: string;
}

export interface KrpanoViewEventData extends KrpanoBaseEventData {
    hlookat: number;
    vlookat: number;
    fov: number;
    camroll?: number;
    pixelhlookat?: number;
    pixelvlookat?: number;
}

export interface KrpanoMouseEventData extends KrpanoBaseEventData {
    stagex: number;
    stagey: number;
    x?: number;
    y?: number;
    button?: number;
    delta?: number;
    ctrlkey?: boolean;
    shiftkey?: boolean;
    altkey?: boolean;
}

export interface KrpanoTouchEventData extends KrpanoBaseEventData {
    touches: Array<{
        id: number;
        stagex: number;
        stagey: number;
        x: number;
        y: number;
    }>;
    scale?: number;
    rotation?: number;
}

export interface KrpanoKeyboardEventData extends KrpanoBaseEventData {
    keycode: number;
    charcode?: number;
    key: string;
    ctrlkey: boolean;
    shiftkey: boolean;
    altkey: boolean;
}

export interface KrpanoHotspotEventData extends KrpanoBaseEventData {
    hotspotname: string;
    hotspotindex?: number;
    ath?: number;
    atv?: number;
    stagex?: number;
    stagey?: number;
}

export interface KrpanoLayerEventData extends KrpanoBaseEventData {
    layername: string;
    layerindex?: number;
    x?: number;
    y?: number;
    stagex?: number;
    stagey?: number;
}

export interface KrpanoSoundEventData extends KrpanoBaseEventData {
    soundname: string;
    url?: string;
    duration?: number;
    position?: number;
}

export interface KrpanoCustomEventData extends KrpanoBaseEventData {
    action?: string;
    data?: any;
    params?: any[];
}

export type KrpanoEventData =
    | KrpanoSystemEventData
    | KrpanoSceneEventData
    | KrpanoViewEventData
    | KrpanoMouseEventData
    | KrpanoTouchEventData
    | KrpanoKeyboardEventData
    | KrpanoHotspotEventData
    | KrpanoLayerEventData
    | KrpanoSoundEventData
    | KrpanoCustomEventData;

/**
 * Event Handler Types
 */
export type KrpanoEventHandler<T extends KrpanoEventData = KrpanoEventData> = (data: T) => void | Promise<void>;

export interface KrpanoEventHandlers {
    // System Events
    onloadcomplete?: KrpanoEventHandler<KrpanoSystemEventData>;
    onxmlcomplete?: KrpanoEventHandler<KrpanoSystemEventData>;
    onready?: KrpanoEventHandler<KrpanoSystemEventData>;
    onloaded?: KrpanoEventHandler<KrpanoSystemEventData>;
    onstart?: KrpanoEventHandler<KrpanoSystemEventData>;
    onerror?: KrpanoEventHandler<KrpanoSystemEventData>;
    onresize?: KrpanoEventHandler<KrpanoSystemEventData>;
    onfullscreenchange?: KrpanoEventHandler<KrpanoSystemEventData>;

    // Scene Events
    onnewscene?: KrpanoEventHandler<KrpanoSceneEventData>;
    onremovescene?: KrpanoEventHandler<KrpanoSceneEventData>;
    onnewpano?: KrpanoEventHandler<KrpanoSceneEventData>;
    onremovepano?: KrpanoEventHandler<KrpanoSceneEventData>;
    onsceneload?: KrpanoEventHandler<KrpanoSceneEventData>;
    onsceneloadcomplete?: KrpanoEventHandler<KrpanoSceneEventData>;
    onsceneleave?: KrpanoEventHandler<KrpanoSceneEventData>;

    // View Events
    onviewchange?: KrpanoEventHandler<KrpanoViewEventData>;
    onviewchanged?: KrpanoEventHandler<KrpanoViewEventData>;
    onidle?: KrpanoEventHandler<KrpanoViewEventData>;
    onmovestart?: KrpanoEventHandler<KrpanoViewEventData>;
    onmoving?: KrpanoEventHandler<KrpanoViewEventData>;
    onmoveend?: KrpanoEventHandler<KrpanoViewEventData>;
    onzoomstart?: KrpanoEventHandler<KrpanoViewEventData>;
    onzooming?: KrpanoEventHandler<KrpanoViewEventData>;
    onzoomend?: KrpanoEventHandler<KrpanoViewEventData>;

    // Mouse Events
    onclick?: KrpanoEventHandler<KrpanoMouseEventData>;
    ondblclick?: KrpanoEventHandler<KrpanoMouseEventData>;
    onmousedown?: KrpanoEventHandler<KrpanoMouseEventData>;
    onmouseup?: KrpanoEventHandler<KrpanoMouseEventData>;
    onmousemove?: KrpanoEventHandler<KrpanoMouseEventData>;
    onmouseover?: KrpanoEventHandler<KrpanoMouseEventData>;
    onmouseout?: KrpanoEventHandler<KrpanoMouseEventData>;
    onmouseenter?: KrpanoEventHandler<KrpanoMouseEventData>;
    onmouseleave?: KrpanoEventHandler<KrpanoMouseEventData>;
    onmousewheel?: KrpanoEventHandler<KrpanoMouseEventData>;
    oncontextmenu?: KrpanoEventHandler<KrpanoMouseEventData>;

    // Touch Events
    ontouchstart?: KrpanoEventHandler<KrpanoTouchEventData>;
    ontouchmove?: KrpanoEventHandler<KrpanoTouchEventData>;
    ontouchend?: KrpanoEventHandler<KrpanoTouchEventData>;
    ontouchcancel?: KrpanoEventHandler<KrpanoTouchEventData>;
    onpinchstart?: KrpanoEventHandler<KrpanoTouchEventData>;
    onpinching?: KrpanoEventHandler<KrpanoTouchEventData>;
    onpinchend?: KrpanoEventHandler<KrpanoTouchEventData>;

    // Keyboard Events
    onkeydown?: KrpanoEventHandler<KrpanoKeyboardEventData>;
    onkeyup?: KrpanoEventHandler<KrpanoKeyboardEventData>;
    onkeypress?: KrpanoEventHandler<KrpanoKeyboardEventData>;

    // Hotspot Events
    onhotspotclick?: KrpanoEventHandler<KrpanoHotspotEventData>;
    onhotspotover?: KrpanoEventHandler<KrpanoHotspotEventData>;
    onhotspotout?: KrpanoEventHandler<KrpanoHotspotEventData>;
    onhotspotdown?: KrpanoEventHandler<KrpanoHotspotEventData>;
    onhotspotup?: KrpanoEventHandler<KrpanoHotspotEventData>;
    onhotspotloaded?: KrpanoEventHandler<KrpanoHotspotEventData>;

    // Layer Events
    onlayerclick?: KrpanoEventHandler<KrpanoLayerEventData>;
    onlayerover?: KrpanoEventHandler<KrpanoLayerEventData>;
    onlayerout?: KrpanoEventHandler<KrpanoLayerEventData>;
    onlayerdown?: KrpanoEventHandler<KrpanoLayerEventData>;
    onlayerup?: KrpanoEventHandler<KrpanoLayerEventData>;
    onlayerloaded?: KrpanoEventHandler<KrpanoLayerEventData>;

    // Plugin Events
    onpluginloaded?: KrpanoEventHandler<KrpanoBaseEventData>;
    onpluginclick?: KrpanoEventHandler<KrpanoBaseEventData>;
    onpluginover?: KrpanoEventHandler<KrpanoBaseEventData>;
    onpluginout?: KrpanoEventHandler<KrpanoBaseEventData>;

    // Sound Events
    onsoundloaded?: KrpanoEventHandler<KrpanoSoundEventData>;
    onsoundcomplete?: KrpanoEventHandler<KrpanoSoundEventData>;
    onsoundfailed?: KrpanoEventHandler<KrpanoSoundEventData>;

    // Custom Events
    oncustom?: KrpanoEventHandler<KrpanoCustomEventData>;
    onaction?: KrpanoEventHandler<KrpanoCustomEventData>;
    ontimer?: KrpanoEventHandler<KrpanoCustomEventData>;
}