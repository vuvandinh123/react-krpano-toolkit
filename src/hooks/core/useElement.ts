import { useContext } from "react";
import { KrpanoContext } from "../../context/KrpanoProvider";
import { ElementOperations } from "../../types/krpano-types";

export const useElement = () => {
    const ctx = useContext(KrpanoContext);
    if (!ctx) throw new Error("KrpanoContext chưa được cung cấp");

    const { api } = ctx;
    // Element operations
    const element: ElementOperations = {
        show: (type, name, options = {}) => {
            const { time, tween = "easeInOutSine" } = options;
            if (time) {
                api.call(`tween(${type}[${name}].alpha, 1.0, ${time}, ${tween}); set(${type}[${name}].visible, true);`);
            } else {
                api.set(`${type}[${name}].visible`, true);
                api.set(`${type}[${name}].alpha`, 1.0);
            }
        },
        hide: (type, name, options = {}) => {
            const { time, tween = "easeInOutSine" } = options;
            if (time) {
                api.call(`tween(${type}[${name}].alpha, 0.0, ${time}, ${tween}, set(${type}[${name}].visible, false));`);
            } else {
                api.set(`${type}[${name}].visible`, false);
            }
        },
        toggle: (type, name) => {
            api.call(`toggle(${type}[${name}].visible);`);
        },
        animate: (type, name, properties, options = {}) => {
            const { time = 1.0, tween = "easeInOutSine", onComplete } = options;
            const propStrings = Object.entries(properties).map(([key, value]) => `${type}[${name}].${key}`).join('|');
            const valueStrings = Object.values(properties).join('|');
            const onCompleteParam = onComplete ? `, ${onComplete}` : '';
            api.call(`tween(${propStrings}, ${valueStrings}, ${time}, ${tween}${onCompleteParam})`);
        },
        addElement: (type, name, properties = {}) => {
            api.call(`add${type}(${name})`);
            Object.entries(properties).forEach(([key, value]) => {
                api.set(`${type}[${name}].${key}`, value);
            });
        },
        removeElement: (type, name) => {
            api.call(`remove${type}(${name})`);
        },
        cloneElement: (type, fromName, toName) => {
            api.call(`clone${type}(${fromName}, ${toName})`);
        }
    };
    return element;
};