// Liệt kê các event phổ biến của krpano
export type KrpanoEventName =
    | "onloadcomplete"
    | "onviewchange"
    | "onxmlcomplete"
    | "onhotspotover"
    | "onhotspotclick";

// Định nghĩa type callback theo event
export type KrpanoEventHandlerMap = {
    onloadcomplete: () => void;
    onviewchange: (view: { hlookat: number; vlookat: number; fov: number }) => void;
    onxmlcomplete: () => void;
    onhotspotover: (hotspotName: string) => void;
    onhotspotclick: (hotspotName: string) => void;
};
