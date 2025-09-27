import { useContext } from "react";
import { KrpanoContext } from "../../context/KrpanoProvider";


/**
 * Hook to access the Krpano API context.
 * @returns {call, get, set} - The Krpano API context.
 * @throws {Error} - If useKrpano is called outside of KrpanoProvider.
 */
export function useKrpano() {
    const ctx = useContext(KrpanoContext);
    if (!ctx) throw new Error("useKrpano must be used inside KrpanoProvider");
    return ctx; // { call, get, set }
}
