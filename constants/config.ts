import { IConfig } from "@/types/api";
import { atom } from "jotai";

export const currentConfigAtom = atom<IConfig | null>(null);
