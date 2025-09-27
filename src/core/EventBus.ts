type EventMap = {
    ready: (krpano: any) => void;
    error: (message: string) => void;
    sceneChange: (sceneName: string) => void;
    hotspotClick: (name: string) => void;
};

export class EventBus<Events extends Record<string, (...args: any[]) => void> = EventMap> {
    private events: { [K in keyof Events]?: Events[K][] } = {};

    on<K extends keyof Events>(event: K, listener: Events[K]) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event]!.push(listener);
    }

    off<K extends keyof Events>(event: K, listener: Events[K]) {
        this.events[event] = (this.events[event] || []).filter(l => l !== listener);
    }

    emit<K extends keyof Events>(event: K, ...args: Parameters<Events[K]>) {
        (this.events[event] || []).forEach(listener => listener(...args));
    }

    clear() {
        this.events = {};
    }
}
