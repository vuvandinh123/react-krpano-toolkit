import { useContext } from "react";
import { KrpanoContext } from "../../context/KrpanoProvider";
import { SoundOperations } from "../../types/krpano-types";

export const useSound = () => {
    const ctx = useContext(KrpanoContext);
    if (!ctx) throw new Error("KrpanoContext chưa được cung cấp");

    const { api } = ctx;
    // Sound operations
    const sound: SoundOperations = {
        playSound: (soundName, url, options = {}) => {
            const { volume = 1.0, loops = 1 } = options;
            if (url) {
                api.call(`loadsound(${soundName}, ${url}); playsound(${soundName}, ${volume}, ${loops})`);
            } else {
                api.call(`playsound(${soundName}, ${volume}, ${loops})`);
            }
        },
        stopSound: (soundName) => {
            api.call(`stopsound(${soundName})`);
        },
        pauseSound: (soundName) => {
            api.call(`pausesound(${soundName})`);
        },
        setSoundVolume: (soundName, volume) => {
            api.set(`sound[${soundName}].volume`, volume);
        },
        stopAllSounds: () => {
            api.call('stopallsounds()');
        }
    };
    return sound;
};