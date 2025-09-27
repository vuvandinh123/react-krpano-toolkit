/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { KrpanoContext } from "../../context/KrpanoProvider";

/**
 * Các loại đối tượng trong Krpano
 */
type KrpanoType = "layer" | "hotspot" | "action" | "scene" | "view" | "plugin";

/**
 * Option map cho từng type
 */
interface KrpanoOptionMap {
    layer: "visible" | "alpha" | "x" | "y" | "scale" | "blendmode";
    hotspot: "visible" | "url" | "alpha" | "scale" | "handcursor" | "blendmode";
    action: string; // lệnh call trực tiếp
    scene: "title" | "backgroundcolor" | "onstart";
    view: "hlookat" | "vlookat" | "fov";
    plugin: "visible" | "url" | "alpha";
}

type OptionValue = string | number | boolean;

interface KrpanoCommandOptions<T extends KrpanoType = KrpanoType> {
    type?: T;                 // Loại đối tượng
    name?: string;            // Tên layer/hotspot/plugin/scene
    options?: Partial<Record<KrpanoOptionMap[T], OptionValue>>; // Nhiều option
    raw?: string;             // Lệnh raw call
}

/**
 * Hook tạo lệnh cho Krpano
 */
export function useKrpanoCommand() {
    const ctx = useContext(KrpanoContext);
    if (!ctx) throw new Error("KrpanoContext chưa được cung cấp");

    const { api } = ctx;

    const execute = <T extends KrpanoType = KrpanoType>(opts: KrpanoCommandOptions<T>) => {
        const { type, name, options, raw } = opts;

        if (raw) {
            api.call(raw);
            return;
        }

        if (!type) {
            console.warn("type là bắt buộc trừ khi dùng raw");
            return;
        }

        if (!name && type !== "action" && type !== "scene" && type !== "view") {
            console.warn("name là bắt buộc trừ action/scene/view");
            return;
        }

        const basePath = name ? `${type}[${name}]` : type;

        if (!options) {
            console.warn("options chưa được cung cấp");
            return;
        }

        Object.entries(options).forEach(([option, value]) => {
            api.set(`${basePath}.${option}`, value);
        });
    };

    return execute;
}
