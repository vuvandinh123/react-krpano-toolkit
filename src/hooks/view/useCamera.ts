import { krpanoAPI } from "../../core";

export function useCamera() {

    const setView = (options: { fov?: number; hlookat?: number; vlookat?: number }) => {
        if (!krpanoAPI) return;
        if (options.fov !== undefined) krpanoAPI.set("view.fov", options.fov);
        if (options.hlookat !== undefined) krpanoAPI.set("view.hlookat", options.hlookat);
        if (options.vlookat !== undefined) krpanoAPI.set("view.vlookat", options.vlookat);
    };

    const lookTo = (h: number, v: number, fov?: number, time: number = 1) => {
        if (!krpanoAPI) return;
        krpanoAPI.call(`lookto(${h}, ${v}, ${fov ?? krpanoAPI.get("view.fov")}, smooth(${time}))`);
    };

    const zoomIn = (step: number = 5) => {
        if (!krpanoAPI) return;
        const fov = krpanoAPI.get("view.fov");
        krpanoAPI.set("view.fov", Math.max(fov - step, 10));
    };

    const zoomOut = (step: number = 5) => {
        if (!krpanoAPI) return;
        const fov = krpanoAPI.get("view.fov");
        krpanoAPI.set("view.fov", Math.min(fov + step, 150));
    };

    return { setView, lookTo, zoomIn, zoomOut };
}
