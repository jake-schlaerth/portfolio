import { getUnixTimestamp } from "@/utils/analytics/getUnixTimestamp";
import { atom } from "jotai";

export const sessionStartAtom = atom(getUnixTimestamp());
