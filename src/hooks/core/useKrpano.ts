import { useContext } from "react";
import { KrpanoContext } from "../../context/KrpanoProvider";
import { useExecute } from "./useExecute";
import { useScene } from "./useScene";
import { useView } from "./useView";
import { useElement } from "./useElement";
import { useSound } from "./useSound";
import { useControl } from "./useControl";
import { useUtility } from "./useUtility";


/**
 * Hook to access the Krpano API context.
 * @returns {call, get, set} - The Krpano API context.
 * @throws {Error} - If useKrpano is called outside of KrpanoProvider.
 */
export function useKrpano() {
    const ctx = useContext(KrpanoContext);
    if (!ctx) throw new Error("KrpanoContext chưa được cung cấp");

    // Import other hooks
    const execute = useExecute();
    const scene = useScene();
    const view = useView();
    const element = useElement();
    const sound = useSound();
    const control = useControl();
    const utility = useUtility();

    return {
        execute,
        scene,
        view,
        element,
        sound,
        control,
        utility,
        // Shortcuts for common operations
        show: (name: string, type: 'hotspot' | 'layer' | 'plugin' = 'hotspot') => element.show(type, name),
        hide: (name: string, type: 'hotspot' | 'layer' | 'plugin' = 'hotspot') => element.hide(type, name),
        toggle: (name: string, type: 'hotspot' | 'layer' | 'plugin' = 'hotspot') => element.toggle(type, name),
        loadScene: scene.loadScene,
        lookAt: view.lookAt,
        zoomTo: view.zoomTo
    };


}
