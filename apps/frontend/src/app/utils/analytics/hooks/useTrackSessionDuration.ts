import { useAtomValue } from "jotai";
import { useEffect } from "react";

import { sessionStartAtom } from "@/atoms";
import { emitSessionEndEvent, getUnixTimestamp } from "..";

export const useTrackSessionDuration = () => {
  const sessionStart = useAtomValue(sessionStartAtom);

  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log(
        `Session Duration: ${getUnixTimestamp() - sessionStart} seconds`
      );
      emitSessionEndEvent(getUnixTimestamp() - sessionStart);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [sessionStart]);
};
