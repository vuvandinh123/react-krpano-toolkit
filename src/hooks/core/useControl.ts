import { useContext } from "react";
import { KrpanoContext } from "../../context/KrpanoProvider";
import { ControlOperations } from "../../types/krpano-types";

export const useControl = () => {
    const ctx = useContext(KrpanoContext);
    if (!ctx) throw new Error("KrpanoContext chưa được cung cấp");

    const { api } = ctx;
    // Control operations
    const control: ControlOperations = {
        enterFullscreen: () => api.call('enterFS()'),
        exitFullscreen: () => api.call('exitFS()'),
        toggleFullscreen: () => api.call('toggleFS()'),
        enableControl: () => api.set('control.usercontrol', true),
        disableControl: () => api.set('control.usercontrol', false),
        setCursor: (cursorType) => api.set('display.cursor', cursorType),
        showWaitcursor: () => api.call('showwaitcursor()'),
        hideWaitcursor: () => api.call('hidewaitcursor()'),
        toggleAutoRotate: () => {
            if (api.get("autorotate.enabled") === true) {
                api.call("autorotate.stop()");
            } else {
                api.call("autorotate.start()");
            }
        },
        getAutoRotateStatus: () => api.get("autorotate.enabled") === true
    };

    return control;
};