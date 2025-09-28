import { useContext } from "react";
import { KrpanoContext } from "../../context/KrpanoProvider";
import { SceneOperations } from "../../types/krpano-types";

export const useScene = () => {
    const ctx = useContext(KrpanoContext);
    if (!ctx) throw new Error("KrpanoContext chưa được cung cấp");

    const { api } = ctx;
    // Scene operations
    const scene: SceneOperations = {
        loadScene: (sceneName: string, options = {}) => {
            const { blend = "BLEND(0.5)", flags = "" } = options;
            api.call(`loadscene(${sceneName}, null, ${blend}, ${flags})`);
        },
        removeScene: (sceneName: string) => {
            api.call(`removescene(${sceneName})`);
        },
        addScene: (sceneName: string, xmlPath?: string) => {
            if (xmlPath) {
                api.call(`addscene(${sceneName}); loadxml(${xmlPath})`);
            } else {
                api.call(`addscene(${sceneName})`);
            }
        },
        copyScene: (fromScene: string, toScene: string) => {
            api.call(`copyscene(${fromScene}, ${toScene})`);
        }
    };

    return scene;
};