import { useState, useEffect, useRef } from "react";
import * as Tone from "tone";

export const GenerativeMusic = () => {
  const [initialized, setInitialized] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);

  const synthRef = useRef<Tone.PolySynth | null>(null);
  const sequencerRef = useRef<Tone.Sequence | null>(null);

  const chords = {
    cMajor: [
      ["C3", "G3", "E4", "B4", "D5"],
      ["F3", "C4", "A5", "E5", "G5"],
      ["G3", "D3", "B4", "F#5", "A5"],
      ["A3", "E4", "C5", "G5", "B5"],
      ["Db3", "Ab3", "F4", "C5"],
    ],
  };

  const randomChoice = (array: any[]) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const initializeAudio = async () => {
    if (audioReady) return true;

    try {
      await Tone.start();

      Tone.getDestination().volume.value = -20;

      const limiter = new Tone.Limiter(-1).toDestination();

      const reverb = new Tone.Reverb({
        decay: 300,
      }).connect(limiter);

      const delay = new Tone.FeedbackDelay({
        delayTime: 0.25,
        feedback: 0.5,
        wet: 0.8,
      }).connect(reverb);

      const filter = new Tone.Filter({
        frequency: 1000,
        type: "lowpass",
        rolloff: -12,
      }).connect(delay);

      const compressor = new Tone.Compressor({
        threshold: -24,
        ratio: 4,
        attack: 0.003,
        release: 0.25,
      }).connect(filter);

      synthRef.current = new Tone.PolySynth(Tone.Synth, {
        volume: -12,
        envelope: {
          attack: 5,
          decay: 0,
          sustain: 1,
          release: 5,
        },
      }).connect(compressor);

      Tone.getTransport().bpm.value = tempo;

      setInitialized(true);
      setAudioReady(true);
      return true;
    } catch (error) {
      console.error("Failed to initialize audio:", error);
      return false;
    }
  };

  const generateAmbientPattern = () => {
    const currentChords = chords.cMajor;

    if (sequencerRef.current) {
      sequencerRef.current.dispose();
    }

    const sequence = new Tone.Sequence(
      (time, step) => {
        if (step % 2 === 0) {
          const chord = randomChoice(currentChords);
          synthRef.current?.triggerAttackRelease(chord, "1n", time);
        }
      },
      [0, 1, 2, 3, 4, 5, 6, 7],
      "1n"
    );

    sequencerRef.current = sequence;
    sequence.start(0);
  };

  const startGenerativeMusic = async () => {
    const isReady = await initializeAudio();
    if (!isReady || !synthRef.current) return;

    stopGenerativeMusic();

    const newTempo = 20 + Math.random() * 20;
    setTempo(Math.round(newTempo));
    Tone.getTransport().bpm.value = newTempo;

    generateAmbientPattern();
    Tone.getTransport().start();

    if (synthRef.current) {
      synthRef.current.triggerAttackRelease(["C4", "E4", "G4"], "4n");
    }

    setIsPlaying(true);
  };

  const stopGenerativeMusic = () => {
    Tone.getTransport().stop();
    if (sequencerRef.current) {
      sequencerRef.current.dispose();
      sequencerRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      stopGenerativeMusic();
    } else {
      await startGenerativeMusic();
    }
  };

  useEffect(() => {
    return () => {
      stopGenerativeMusic();
      if (synthRef.current) {
        synthRef.current.dispose();
      }
    };
  }, []);

  return (
    <button
      onClick={togglePlayback}
      aria-label={isPlaying ? "Stop music" : "Play music"}
    >
      {isPlaying ? "stop" : "play"}
    </button>
  );
};
