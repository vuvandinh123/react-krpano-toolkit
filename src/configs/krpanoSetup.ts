import { useEffect, useContext, useCallback } from "react";
import { KrpanoContext } from "../context/KrpanoProvider";

export function krpanoSetup() {
    const ctx = useContext(KrpanoContext);
    if (!ctx) return;

    const { api, events } = ctx;
    const registerKrpanoGlobal = useCallback((api: any, name: string, func: Function) => {
        (window as any)[name] = func;
        api.call(`def(${name}, js(${name}()));`);
    }, [api]);

    useEffect(() => {
        if (!api) return;
        events.on("ready", () => {
            // Fullscreen helpers
            registerKrpanoGlobal(api, "enterFS", () => {
                api.call("enterfullscreen();");
            });
            registerKrpanoGlobal(api, "exitFS", () => {
                api.call("exitfullscreen();");
            });
            registerKrpanoGlobal(api, "toggleFS", () => {
                api.call("if(fullscreen, exitfullscreen(), enterfullscreen());");
            });

            // View helpers
            registerKrpanoGlobal(api, "resetView", () => {
                api.call("lookat(0,0,100, smooth(500));");
            });
            registerKrpanoGlobal(api, "lookNorth", () => {
                api.call("lookat(0, null, null, smooth(500));");
            });
            registerKrpanoGlobal(api, "lookSouth", () => {
                api.call("lookat(180, null, null, smooth(500));");
            });
            registerKrpanoGlobal(api, "lookUp", () => {
                api.call("lookat(null, -90, null, smooth(500));");
            });
            registerKrpanoGlobal(api, "lookDown", () => {
                api.call("lookat(null, 90, null, smooth(500));");
            });

            // Autorotate helpers
            registerKrpanoGlobal(api, "startAutoRotate", () => {
                api.call("autorotate.start();");
            });
            registerKrpanoGlobal(api, "stopAutoRotate", () => {
                api.call("autorotate.stop();");
            });
            registerKrpanoGlobal(api, "toggleAutoRotate", () => {
                api.call("if(autorotate.enabled, autorotate.stop(), autorotate.start());");
            });

            // Scene helpers
            registerKrpanoGlobal(api, "nextScene", () => {
                api.call("loadscene(get(nextscene), null, MERGE, BLEND(1));");
            });
            registerKrpanoGlobal(api, "prevScene", () => {
                api.call("loadscene(get(prevscene), null, MERGE, BLEND(1));");
            });

            // Layer helpers (ẩn/hiện UI)
            registerKrpanoGlobal(api, "showUI", () => {
                api.call("set(layer[skin].visible,true);");
            });
            registerKrpanoGlobal(api, "hideUI", () => {
                api.call("set(layer[skin].visible,false);");
            });
            registerKrpanoGlobal(api, "toggleUI", () => {
                api.call("set(layer[skin].visible, !layer[skin].visible);");
            });
        });



        return () => {
            // Cleanup các hàm global khi component unmount
            delete (window as any).enterFS;
            delete (window as any).exitFS;
            delete (window as any).toggleFS;
            delete (window as any).resetView;
            delete (window as any).lookNorth;
            delete (window as any).lookSouth;
            delete (window as any).lookUp;
            delete (window as any).lookDown;
            delete (window as any).startAutoRotate;
            delete (window as any).stopAutoRotate;
            delete (window as any).toggleAutoRotate;
            delete (window as any).nextScene;
            delete (window as any).prevScene;
            delete (window as any).showUI;
            delete (window as any).hideUI;
            delete (window as any).toggleUI;
        };

    }, [api]);
}
