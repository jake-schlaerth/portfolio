import { atomWithStorage } from "jotai/utils";

export const sessionIdAtom = atomWithStorage<string | null>("sessionId", null);
