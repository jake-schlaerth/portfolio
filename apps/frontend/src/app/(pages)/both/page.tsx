"use client";

import { ChordGenerator, StartModal } from "./components";
import { Canvas } from "../../components/Canvas";
import { C_MAJOR_7, F_MINOR_7 } from "./consts/chords";

const Both = () => (
  <>
    <StartModal />
    <div className="flex flex-row space-x-16">
      <ChordGenerator midiNotes={C_MAJOR_7} />
      <ChordGenerator midiNotes={F_MINOR_7} />
    </div>
    <Canvas
      canvasHeight={600}
      canvasWidth={800}
      displayHeight={600}
      displayWidth={800}
      frequencyX={0.2}
      frequencyY={0.191}
    />
  </>
);

export default Both;
