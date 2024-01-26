"use client";
import { ToneGenerator } from ".";

interface ChordGeneratorProps {
  midiNotes: number[];
}

export const ChordGenerator = ({ midiNotes }: ChordGeneratorProps) => (
  <div className="flex flex-col">
    {midiNotes.map((midiNote) => (
      <ToneGenerator midiNote={midiNote} />
    ))}
  </div>
);
