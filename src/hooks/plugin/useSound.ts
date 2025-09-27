import { krpanoAPI } from "../../core";

export function useSound() {

    const play = (name: string) => krpanoAPI.call(`playsound(${name})`);
    const stop = (name: string) => krpanoAPI.call(`stopsound(${name})`);
    const setVolume = (name: string, volume: number) => krpanoAPI.set(`sound[${name}].volume`, volume);

    return { play, stop, setVolume };
}
