import { useContext } from "react";
import { KrpanoContext } from "../../context/KrpanoProvider";
import { ElementOperations } from "../../types/krpano-types";
interface BaseProperties {
    parent?: string;
    type?: string;
    keep?: boolean;
    align?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    visible?: boolean;
    enabled?: boolean;
    zorder?: number;
    alpha?: number;
    bgalpha?: number;
    bgcolor?: string;
    url?: string;
    onloaded?: () => void;
    [key: string]: any; // fallback cho các thuộc tính khác của Krpano
}
type TypeElement = "hotspot" | "layer" | "plugin";

type LayerProperties = BaseProperties & {
    type?: "image" | "container" | "html5" | "video" | "text";
};

type HotspotProperties = BaseProperties & {
    ath?: number;
    atv?: number;
    scale?: number;
    url?: string;
};

type PluginProperties = BaseProperties & {
    url?: string;
};

type ElementProperties = LayerProperties | HotspotProperties | PluginProperties;

export const useElement = () => {
    const ctx = useContext(KrpanoContext);
    if (!ctx) {
        throw new Error("KrpanoContext chưa được cung cấp");
    }
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
        toggle: (type: string, name: string) => {
            const visible = api.get(`${type}[${name}].visible`);
            api.call(`set(${type}[${name}].visible, ${visible ? 'false' : 'true'});`);
        },

        animate: (type: TypeElement, name: string, properties: Record<string, any>, options = {}) => {
            const { time = 1.0, tween = "easeInOutSine", onComplete } = options;
            const propStrings = Object.entries(properties).map(([key, value]) => `${type}[${name}].${key}`).join('|');
            const valueStrings = Object.values(properties).join('|');
            const onCompleteParam = onComplete ? `, ${onComplete}` : '';
            api.call(`tween(${propStrings}, ${valueStrings}, ${time}, ${tween}${onCompleteParam})`);
        },
        addElement: (type: TypeElement, name: string, properties: ElementProperties = {}) => {
            const elementType = properties.type || type;
            const parent = properties.parent || "container";

            api.call(`add${type}(${name})`);
            api.call(`set(${type}[${name}].parent, ${parent})`);
            api.call(`set(${type}[${name}].type, ${elementType})`);
            Object.entries(properties).forEach(([key, value]) => {
                if (["type", "parent", "onloaded"].includes(key)) return;
                const v = typeof value === "string" ? `"${value}"` : value;
                api.call(`set(${type}[${name}].${key}, ${v})`);
            });
        },
        updateElement: (
            type: TypeElement,
            name: string,
            properties: Partial<ElementProperties> = {}
        ) => {
            if (!api.get(`${type}[${name}]`)) {
                console.warn(`${type}[${name}] không tồn tại, hãy dùng addElement trước.`);
                return;
            }
            Object.entries(properties).forEach(([key, value]) => {
                if (["type", "parent", "onloaded"].includes(key)) return;
                const v = typeof value === "string" ? `"${value}"` : value;
                api.call(`set(${type}[${name}].${key}, ${v})`);
            });
        }
        ,

        removeElement: (type, name) => {
            api.call(`remove${type}(${name})`);
        },
        cloneElement: (type, fromName, toName) => {
            if (!api.get(`${type}[${fromName}]`)) {
                console.warn(`${type}[${fromName}] không tồn tại, không thể clone.`);
                return false;
            }
            if (api.get(`${type}[${toName}]`)) {
                console.warn(`${type}[${toName}] đã tồn tại, không thể clone.`);
                return false;
            }

            api.call(`add${type}(${toName})`);
            // Lấy tất cả thuộc tính của element gốc
            const props = api.get(`${type}[${fromName}]`)?.DATA;
            if (!props) {
                console.warn(`Không thể lấy thuộc tính của ${type}[${fromName}]`);
                return false;
            }
            // Gán tất cả thuộc tính cho element mới
            Object.entries(props).forEach(([key, value]) => {
                if (key === "name") return; // bỏ qua thuộc tính name
                const v = typeof value === "string" ? `"${value}"` : value;
                api.call(`set(${type}[${toName}].${key}, ${v})`);
            });
            return true;
        }
    };
    return element;
};