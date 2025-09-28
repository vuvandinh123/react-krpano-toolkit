import { useContext } from "react";
import { KrpanoCommandOptions, KrpanoType } from "../../types/krpano-types";
import { KrpanoContext } from "../../context/KrpanoProvider";

export const useExecute = () => {
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

        if (!name && !["action", "scene", "view", "events", "display", "control"].includes(type)) {
            console.warn("name là bắt buộc cho loại này");
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