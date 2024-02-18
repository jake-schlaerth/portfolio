import { atom } from "jotai";

import { LocationEvent } from "analytics-events";

export const locationsAtom = atom<Omit<LocationEvent, "eventName">[]>([]);
