/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { KrpanoContext } from "../../context/KrpanoProvider";

export function useKrpanoCommand() {
    const ctx = useContext(KrpanoContext);
    if (!ctx) throw new Error("KrpanoContext chưa được cung cấp");
    return ctx

}