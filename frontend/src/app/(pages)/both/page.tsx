"use client";

import { ChordGenerator, StartModal } from "./components";
import { SineWaveLine } from "./components/SineWaveLine";
import { C_MAJOR_7, F_MINOR_7 } from "./consts/chords";

const Both = () => (
  <>
    <StartModal />
    <div className="flex flex-row space-x-16">
      <ChordGenerator midiNotes={C_MAJOR_7} />
      <ChordGenerator midiNotes={F_MINOR_7} />
    </div>
    <SineWaveLine />
  </>
);

export default Both;
