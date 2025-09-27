/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
// === 1. Các loại action ===
export type LookToAction = {
    type: "lookto";
    hlookat: "view.hlookat" | string;
    vlookat: "view.vlookat" | string;
};

export type PanAction = {
    type: "pan";
    dh: number | string; // thay đổi hlookat
    dv: number | string; // thay đổi vlookat
};

export type LayerAction = {
    type: "layer";
    name: string;
    visible: boolean;
};

export type PluginAction = {
    type: "plugin";
    name: string;
    action: string;
    params?: any[];
};

export type CallAction = {
    type: "call";
    command: string;
};

export type KeyboardAction =
    | LookToAction
    | PanAction
    | LayerAction
    | PluginAction
    | CallAction;

export type KeyMap = Record<string, KeyboardAction>;


// Golobal action
export type KrpanoActionParams = Record<string, any>;
export type KrpanoActionCallback<P extends KrpanoActionParams = {}> = (params: P) => string;

export type KrpanoGlobalAction<P extends KrpanoActionParams = {}> = {
    name: string;
    callback: KrpanoActionCallback<P>; // callback trả về body action
};
