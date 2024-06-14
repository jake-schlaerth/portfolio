"use client";

import { StartModal, IsorhythmGenerator } from "./components";
import { B_MINOR_7, C_MAJOR_7, F_MINOR_7 } from "./consts/chords";
import { Note } from "tonal";
import { useState } from "react";
import { LEDGrid } from "./components/LEDGrid";

const Music = () => {
  const [start, setStart] = useState(false);
  return (
    <>
      {/* <StartModal />
      <div className="flex flex-row space-x-16">
        <IsorhythmGenerator
          pitches={B_MINOR_7.map((midiNote) => Note.fromMidi(midiNote))}
          rhythms={["8n", "8n", "8n", "8n", "8n.", "8n."]}
          start={start}
        />
        <IsorhythmGenerator
          pitches={[47, 50, 55].map((midiNote) => Note.fromMidi(midiNote))}
          rhythms={["8n."]}
          start={start}
        />
        <IsorhythmGenerator
          pitches={B_MINOR_7.map((midiNote) => Note.fromMidi(midiNote + 12))}
          rhythms={["4n"]}
          start={start}
        />
      </div>
      <button
        onClick={() => {
          setStart(true);
        }}
      >
        clikc
      </button> */}
      <LEDGrid />
    </>
  );
};

export default Music;
