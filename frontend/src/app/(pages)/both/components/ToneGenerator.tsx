"use client";

import { Note } from "tonal";
import { Tone } from "@lib/Tone";

interface GenerateToneProps {
  midiNote: number;
}

export const ToneGenerator = ({ midiNote }: GenerateToneProps) => (
  <button
    onMouseOver={() => {
      const osc = new Tone.Oscillator().toDestination();
      osc.frequency.value = Note.fromMidi(midiNote);
      // osc.frequency.rampTo("C3", 3);
      osc.start().stop("+3");
    }}
    className="text-2xl hover:text-xl transition-text duration-1000 ease-in-out"
  >
    ------------
  </button>
);
