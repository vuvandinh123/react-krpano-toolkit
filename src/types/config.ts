import type { BlendMode } from ".";

export interface HotspotConfig {
    name: string;
    ath: number;
    atv: number;
    onclick?: string;
}

export interface SceneConfig {
    name: string;
    blend?: BlendMode;
    hotspots?: HotspotConfig[];
}

export interface Config {
    scenes: SceneConfig[];
    defaultScene?: string; // scene mặc định khi init
}