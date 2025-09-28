
/**
 * Các loại đối tượng trong Krpano
 */
export type KrpanoType =
    | "layer"
    | "hotspot"
    | "action"
    | "scene"
    | "view"
    | "plugin"
    | "sound"
    | "events"
    | "display"
    | "control"
    | "cursors"
    | "contextmenu"
    | "textstyle"
    | "data"
    | "include"
    | "preview"
    | "image"
    | "cube"
    | "sphere"
    | "cylindrical"
    | "fisheye"
    | "littleplanet"
    | "webvr";

/**
 * Option map cho từng type
 */
export interface KrpanoOptionMap {
    layer: "visible" | "alpha" | "x" | "y" | "width" | "height" | "scale" | "rotate" | "ox" | "oy" | "rx" | "ry" | "rz" | "edge" | "zorder" | "style" | "url" | "crop" | "onovercrop" | "maskchildren" | "blendmode" | "effect" | "enabled" | "handcursor" | "capture" | "children" | "parent" | "onloaded" | "onclick" | "onover" | "onout" | "ondown" | "onup";

    hotspot: "visible" | "alpha" | "url" | "ath" | "atv" | "edge" | "fov" | "fovtype" | "scale" | "rotate" | "rx" | "ry" | "rz" | "ox" | "oy" | "distorted" | "rx3d" | "ry3d" | "rz3d" | "flying" | "enabled" | "handcursor" | "zorder" | "style" | "zoom" | "renderer" | "onclick" | "onover" | "onout" | "onloaded" | "crop" | "onovercrop" | "blendmode" | "effect";

    action: string;

    scene: "name" | "title" | "thumburl" | "lat" | "lng" | "heading" | "onstart" | "onleave" | "image" | "havexml" | "index";

    view: "hlookat" | "vlookat" | "fov" | "fovtype" | "fovmin" | "fovmax" | "limitview" | "hlookatmin" | "hlookatmax" | "vlookatmin" | "vlookatmax" | "maxpixelzoom" | "fisheye" | "architectural" | "pannini" | "stereographic" | "orthographic";

    plugin: "visible" | "alpha" | "url" | "keep" | "preload" | "alturl" | "align" | "edge" | "x" | "y" | "width" | "height" | "scale" | "rotate" | "ox" | "oy" | "rx" | "ry" | "rz" | "zorder" | "style" | "enabled" | "handcursor" | "capture" | "onloaded";

    sound: "url" | "volume" | "loops" | "onloadcomplete" | "tag";

    events: "onloadcomplete" | "onxmlcomplete" | "onnewscene" | "onremovescene" | "onnewpano" | "onremovepano" | "onresize" | "onfullscreenchange" | "onkeydown" | "onkeyup" | "onclick" | "onmousedown" | "onmouseup" | "onmousemove" | "onidle" | "onviewchange" | "onviewchanged";

    display: "width" | "height" | "align" | "background" | "bgcolor" | "details" | "tessellation" | "stereographic" | "flash10" | "renderinterface" | "desktopscaling" | "mobilescaling" | "safearea" | "padding";

    control: "mousecontrol" | "keyboardcontrol" | "touchcontrol" | "mousetype" | "drag" | "dragrelaxtime" | "movestop" | "keydrag" | "keycode" | "dragspeed" | "mousewheelspeed" | "touchzoom" | "touchfriction" | "bouncinglimits" | "invertcontrol" | "usercontrol";

    cursors: "normal" | "drag" | "dragging" | "moving";

    contextmenu: "normal" | "fullscreen" | "enterfs" | "exitfs" | "aboutkrpano";

    textstyle: "name" | "font" | "fontsize" | "bold" | "italic" | "color" | "background" | "backgroundcolor" | "roundedge" | "border" | "bordercolor" | "shadow" | "shadowcolor" | "shadowrange" | "shadowangle" | "shadowalpha" | "glow" | "glowcolor" | "glowrange" | "glowalpha" | "textcolor" | "selectable";

    data: string;
    include: "url";
    preview: "url";
    image: "type" | "multires" | "baseindex" | "tilesize" | "levels" | "if" | "devices";
    cube: "url" | "if" | "devices";
    sphere: "url" | "if" | "devices";
    cylindrical: "url" | "if" | "devices";
    fisheye: "url" | "if" | "devices";
    littleplanet: "url" | "if" | "devices";
    webvr: "enabled" | "keeptexture" | "bgcolor" | "showstereosupport" | "stereosupport_text" | "autoenable_ioswebvr" | "autoenable_webvr" | "autoenable_webxr" | "prefer_webxr" | "autoenable_cardboard" | "touchcontrol_webvr" | "showcontrols" | "hidecontrolstime" | "entervrmode" | "exitvrmode";
}

export type OptionValue = string | number | boolean;

export interface KrpanoCommandOptions<T extends KrpanoType = KrpanoType> {
    type?: T;
    name?: string;
    options?: Partial<Record<KrpanoOptionMap[T], OptionValue>>;
    raw?: string;
}

/**
 * Interface cho các thao tác scene
 */
export interface SceneOperations {
    loadScene: (sceneName: string, options?: { blend?: string; flags?: string }) => void;
    removeScene: (sceneName: string) => void;
    addScene: (sceneName: string, xmlPath?: string) => void;
    copyScene: (fromScene: string, toScene: string) => void;
}

/**
 * Interface cho các thao tác view
 */
export interface ViewOperations {
    lookAt: (hlookat: number, vlookat: number, fov?: number, options?: {
        smooth?: boolean;
        time?: number;
        tween?: string;
        blend?: number;
    }) => void;
    lookTo: (ath: number, atv: number, options?: { smooth?: boolean; time?: number }) => void;
    zoomTo: (fov: number, options?: { smooth?: boolean; time?: number }) => void;
    moveCamera: (direction: 'up' | 'down' | 'left' | 'right', amount?: number) => void;
    stopMovement: () => void;
}

/**
 * Interface cho các thao tác hotspot/layer
 */
export interface ElementOperations {
    show: (type: 'hotspot' | 'layer' | 'plugin', name: string, options?: { time?: number; tween?: string }) => void;
    hide: (type: 'hotspot' | 'layer' | 'plugin', name: string, options?: { time?: number; tween?: string }) => void;
    toggle: (type: 'hotspot' | 'layer' | 'plugin', name: string) => void;
    animate: (type: 'hotspot' | 'layer' | 'plugin', name: string, properties: Record<string, any>, options?: {
        time?: number;
        tween?: string;
        onComplete?: string;
    }) => void;
    addElement: (type: 'hotspot' | 'layer' | 'plugin', name: string, properties?: Record<string, any>) => void;
    removeElement: (type: 'hotspot' | 'layer' | 'plugin', name: string) => void;
    cloneElement: (type: 'hotspot' | 'layer' | 'plugin', fromName: string, toName: string) => void;
    updateElement: (type: 'hotspot' | 'layer' | 'plugin', name: string, properties: Record<string, any>) => void;
}

/**
 * Interface cho các thao tác sound
 */
export interface SoundOperations {
    playSound: (soundName: string, url?: string, options?: { volume?: number; loops?: number }) => void;
    stopSound: (soundName: string) => void;
    pauseSound: (soundName: string) => void;
    setSoundVolume: (soundName: string, volume: number) => void;
    stopAllSounds: () => void;
}

/**
 * Interface cho các thao tác fullscreen & control
 */
export interface ControlOperations {
    enterFullscreen: () => void;
    exitFullscreen: () => void;
    toggleFullscreen: () => void;
    enableControl: () => void;
    disableControl: () => void;
    toggleAutoRotate: () => void;
    getAutoRotateStatus: () => boolean;
}

/**
 * Interface cho các thao tác utility
 */
export interface UtilityOperations {
    loadXML: (url: string, options?: { keepdisplay?: boolean }) => void;
    reload: () => void;
    screenshot: (options?: { scale?: number; alpha?: boolean }) => void;
    trace: (message: any) => void;
    error: (message: string) => void;
    get: (variable: string) => any;
    set: (variable: string, value: any) => void;
    call: (action: string) => void;
    callwith: (action: string, ...args: any[]) => void;
    wait: (time: number, callback?: string) => void;
}