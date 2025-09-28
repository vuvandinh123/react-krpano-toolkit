import { useContext } from "react";
import { KrpanoContext } from "../../context/KrpanoProvider";
import { ControlOperations } from "../../types/krpano-types";

export const useControl = () => {
    const ctx = useContext(KrpanoContext);
    if (!ctx) {
        console.error("KrpanoContext chưa được cung cấp");
        return null;
    }

    const { api } = ctx;
    // Control operations
    const control: ControlOperations = {
        enterFullscreen: () => api.set('fullscreen', true),
        exitFullscreen: () => api.set('fullscreen', false),
        toggleFullscreen: () => api.set('fullscreen', !api.get('fullscreen')),
        enableControl: () => api.set('control.usercontrol', true),
        disableControl: () => api.set('control.usercontrol', false),
        toggleAutoRotate: () => {
            if (api.get("autorotate.enabled") === true) {
                api.set("autorotate.enabled", false);
            } else {
                api.set("autorotate.enabled", true);
            }
        },
        getAutoRotateStatus: () => api.get("autorotate.enabled") === true
    };

    return control;
};