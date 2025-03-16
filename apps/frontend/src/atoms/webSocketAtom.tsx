import { atom } from "jotai";

export const webSocketAtom = atom<WebSocket | null>(null);
