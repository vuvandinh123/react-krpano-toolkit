//
// 📄 useXmlLoader
// Load file XML động, merge config
// Load dynamic XML file and merge config

import { krpanoAPI } from "../../core";

//
export function useXmlLoader() {
    const loadXml = (url: string, merge: boolean = true) => {
        if (!krpanoAPI) throw new Error("Krpano not ready");
        krpanoAPI.call(`loadxml(${url}, null, ${merge ? "MERGE" : "KEEP"})`);
    };

    return { loadXml };
}