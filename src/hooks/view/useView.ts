/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from "react";
import { krpanoAPI } from "../../core";

export function useView() {
    const [view, setViewState] = useState({
        fov: 90,
        hlookat: 0,
        vlookat: 0,
    });

    useEffect(() => {
        if (!krpanoAPI) return;

        const updateView = () => {
            setViewState({
                fov: krpanoAPI.get("view.fov"),
                hlookat: krpanoAPI.get("view.hlookat"),
                vlookat: krpanoAPI.get("view.vlookat"),
            });
        };

        updateView();

        krpanoAPI.set("events.onviewchange", "js(updateView())");

        (window as any).updateView = updateView;

        return () => {
            if (krpanoAPI) krpanoAPI.set("events.onviewchange", null);
            delete (window as any).updateView;
        };
    }, [krpanoAPI]);

    // Hàm thay đổi góc nhìn
    const setView = useCallback(
        (newView: Partial<{ fov: number; hlookat: number; vlookat: number }>) => {
            if (!krpanoAPI) return;

            if (newView.fov !== undefined) {
                krpanoAPI.set("view.fov", newView.fov);
            }
            if (newView.hlookat !== undefined) {
                krpanoAPI.set("view.hlookat", newView.hlookat);
            }
            if (newView.vlookat !== undefined) {
                krpanoAPI.set("view.vlookat", newView.vlookat);
            }
        },
        [krpanoAPI]
    );

    return { view, setView };
}
