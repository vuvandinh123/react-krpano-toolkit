import { useScene } from "../ui/useScene";
import { useHotspot } from "../ui/useHotspot";
import type { Config } from "../../types/config";
import type { BlendMode } from "../../types";



export function useConfig(config: Config) {
    const { preloadScene, switchScene } = useScene();
    const { addHotspot } = useHotspot();

    /**
     * Preload toàn bộ scenes khi init
     */
    const init = () => {
        config.scenes.forEach((scene) => {
            preloadScene(scene.name);

            // preload hotspots nếu có
            scene.hotspots?.forEach((hs) =>
                addHotspot(hs.name, {
                    ath: hs.ath,
                    atv: hs.atv,
                    onclick: hs.onclick,
                })
            );
        });

        // load default scene nếu có
        if (config.defaultScene) {
            switchScene(config.defaultScene);
        }
    };

    /**
     * Switch tới scene bất kỳ
     */
    const switchTo = (name: string, blend: BlendMode = "BLEND(1)") => {
        switchScene(name, blend);
    };

    return { init, switchTo };
}
