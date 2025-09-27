
/* eslint-disable @typescript-eslint/no-explicit-any */
export class KrpanoAPI {
    private instance: any | null = null;

    setInstance(krpano: any) {
        this.instance = krpano;
    }

    isReady(): () => boolean {
        return () => !!this.instance;
    }

    call<T = any>(action: string): T {
        if (!this.instance) throw new Error("Krpano chưa sẵn sàng");
        return this.instance?.call?.(action);
    }

    get<T = any>(path: string): T {
        if (!this.instance) throw new Error("Krpano chưa sẵn sàng");
        return this.instance?.get?.(path);
    }

    set(path: string, value: any): void {
        if (!this.instance) throw new Error("Krpano chưa sẵn sàng");
        this.instance?.set?.(path, value);
    }
}

// singleton instance
let _krpanoAPI: KrpanoAPI | null = null;

// export tên giống trước, nhưng là getter
export const krpanoAPI: KrpanoAPI = new Proxy({} as KrpanoAPI, {
    get(_, prop) {
        if (!_krpanoAPI) _krpanoAPI = new KrpanoAPI();
        // @ts-ignore
        return _krpanoAPI[prop];
    },
    set(_, prop, value) {
        if (!_krpanoAPI) _krpanoAPI = new KrpanoAPI();
        // @ts-ignore
        _krpanoAPI[prop] = value;
        return true;
    },
});
