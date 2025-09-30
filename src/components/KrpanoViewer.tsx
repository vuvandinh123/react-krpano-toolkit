// KrpanoViewer.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";

interface KrpanoViewerProps {
    path: string;                   // đường dẫn đến thư mục pano
    xmlName?: string;               // tên file XML (mặc định: "tour.xml")
    jsName?: string;                // tên file JS (mặc định: "tour.js")
    swfName?: string;               // tên file SWF (mặc định: "tour.swf")
    style?: React.CSSProperties;
    onReady?: (krpano: any) => void;
}

export const KrpanoViewer: React.FC<KrpanoViewerProps> = ({
    path,
    xmlName = "tour.xml",
    jsName = "tour.js",
    swfName = "tour.swf",
    style = { width: "100vw", height: "100vh" },
    onReady,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) {
            console.error("KrpanoViewer: containerRef.current is null");
            return;
        }

        // đảm bảo path luôn kết thúc bằng /
        if (!path.endsWith("/")) path += "/";

        // tạo script để load krpano js
        const script = document.createElement("script");
        script.src = `${path}${jsName}`;
        script.onload = () => {
            if (!containerRef.current) return;

            // gọi embedpano sau khi js load thành công
            (window as any).embedpano({
                swf: `${path}${swfName}`,
                xml: `${path}${xmlName}`,
                target: "react-krpano-toolkit", // DÙNG DOM REF TRỰC TIẾP
                html5: "always",
                onready: (krpano: any) => {
                    (window as any).onKrpanoReady?.(krpano);
                    
                    if (onReady) onReady(krpano);
                },
            });
        };

        script.onerror = () => {
            console.error(`Failed to load Krpano JS: ${path}${jsName}`);
        };

        document.body.appendChild(script);

        // cleanup khi unmount
        return () => {
            if ((window as any).removepano && containerRef.current) {
                (window as any).removepano(containerRef.current);
            }
            script.remove();
        };
    }, [path, xmlName, jsName, swfName, onReady]);

    return <div ref={containerRef} id="react-krpano-toolkit" style={style} />;
};

