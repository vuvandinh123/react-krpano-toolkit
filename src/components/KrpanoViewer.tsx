/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import { krpanoSetup } from "../configs/krpanoSetup";

interface KrpanoViewerProps {
    path: string;                   // đường dẫn đến file pano
    xmlName?: string;               // đường dẫn XML (mặc định: "tour.xml")
    jsName?: string;                // đường dẫn JS (mặc định: "tour.js")
    swfName?: string;               // đường dẫn SWF (mặc định: "./krpano/tour.swf")
    style?: React.CSSProperties;
}

export const KrpanoViewer: React.FC<KrpanoViewerProps> = ({
    path,
    xmlName = "tour.xml",
    jsName = "tour.js",
    swfName = "tour.swf",
    style = { width: "100%", height: "100vh" },
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    krpanoSetup();
    useEffect(() => {
        if (!containerRef.current) {
            throw new Error("containerRef.current is null");
        }
        path.endsWith("/") || (path += "/");
        // Load JS trước khi embed pano
        const script = document.createElement("script");
        script.src = `${path}${jsName}`;
        script.onload = () => {
            requestAnimationFrame(() => {
                (window as any).embedpano({
                    swf: `${path}${swfName}`,
                    xml: `${path}${xmlName}`,
                    target: "react-krpano-toolkit",
                    html5: "always",
                    onready: (krpano: any) => {
                        (window as any).onKrpanoReady?.(krpano);
                    },
                });
            });
        };
        script.onerror = () => {
            console.error(`Failed to load Krpano JS: ${path}/${jsName}`);
        };
        document.body.appendChild(script);

        return () => {
            (window as any).removepano("react-krpano-toolkit");
        };
    }, [path, xmlName, jsName, swfName]);

    return <div ref={containerRef} id="react-krpano-toolkit" style={style} />;
};
