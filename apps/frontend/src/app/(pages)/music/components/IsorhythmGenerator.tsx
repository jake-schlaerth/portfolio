"use client";

import { Note } from "tonal";
import { Tone } from "@lib/Tone";
import { Synth } from "tone";
import { useEffect, useState } from "react";
import { cyclicGenerator } from "../utils/cyclicGenerator";

interface IsorhythmGeneratorProps {
  rhythms: string[];
  pitches: string[];
  start: boolean;
}

export const IsorhythmGenerator = ({
  rhythms,
  pitches,
  start,
}: IsorhythmGeneratorProps) => {
  const [synth, setSynth] = useState<Synth | null>(null);

  const rhythmIterator = cyclicGenerator(rhythms);
  const pitchIterator = cyclicGenerator(pitches);

  useEffect(() => {
    const synth = new Tone.Synth({
      oscillator: {
        type: "square",
      },
      envelope: {
        attack: 0.1,
        decay: 0,
        sustain: 1,
        release: 0.5,
      },
    }).toDestination();

    setSynth(synth);

    return () => {
      synth.dispose();
    };
  }, []);

  useEffect(() => {
    console.log(start);
    if (start) {
      scheduleNotes();
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
    }
  }, [start]);

  function scheduleNotes() {
    if (!synth) {
      return;
    }

    let duration = 0;

    for (let i = 0; i < 100; i++) {
      const pitch = pitchIterator.next().value as string;
      const rhythm = rhythmIterator.next().value as string;

      Tone.Transport.schedule((time) => {
        synth.triggerAttackRelease(pitch, "16n", time);
      }, `+${duration}`);

      duration += Tone.Time(rhythm).toSeconds();
    }
  }

  return (
    <div>
      {pitches}
      <br />
      {rhythms}
    </div>
  );
};
