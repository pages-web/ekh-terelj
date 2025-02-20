import { IConfig } from "@/types/config";
import { atom } from "jotai";

export const currentConfigAtom = atom<IConfig | null>(null);
