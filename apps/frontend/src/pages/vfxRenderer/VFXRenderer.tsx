import { useState, useEffect, useRef } from "react";
// todo: this works but the ide can't see the contents of the docker volume with the wasm build artifacts
// @ts-ignore
import init, { init_webgl, render_scene } from "../../../pkg";
import { EffectControls } from "./EffectControls";
import { sliderRanges } from "./types";
import { randomInRange } from "./utils";

export const VFXRenderer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<any>(null);
  const animationRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const [isWasmLoaded, setIsWasmLoaded] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const targetFPS = 30;
  const frameInterval = 1000 / targetFPS;

  const [distortion, setDistortion] = useState(0.1);
  const [scanlineIntensity, setScanlineIntensity] = useState(0.02);
  const [glitchIntensity, setGlitchIntensity] = useState(0.03);
  const [colorShift, setColorShift] = useState(0.01);
  const [dotMatrixIntensity, setDotMatrixIntensity] = useState(0.02);
  const [chromaticAberration, setChromaticAberration] = useState(1.5);
  const [vignetteIntensity, setVignetteIntensity] = useState(0.4);
  const [horizontalDistortion, setHorizontalDistortion] = useState(0.5);
  const [tapeNoiseIntensity, setTapeNoiseIntensity] = useState(0.3);
  const [trackingJitterIntensity, setTrackingJitterIntensity] = useState(0.4);
  const [bloomIntensity, setBloomIntensity] = useState(0.5);

  const [distortionEnabled, setDistortionEnabled] = useState(true);
  const [scanlineEnabled, setScanlineEnabled] = useState(true);
  const [glitchEnabled, setGlitchEnabled] = useState(true);
  const [colorShiftEnabled, setColorShiftEnabled] = useState(true);
  const [dotMatrixEnabled, setDotMatrixEnabled] = useState(true);
  const [chromaticAberrationEnabled, setChromaticAberrationEnabled] =
    useState(true);
  const [vignetteEnabled, setVignetteEnabled] = useState(true);
  const [horizontalDistortionEnabled, setHorizontalDistortionEnabled] =
    useState(true);
  const [tapeNoiseEnabled, setTapeNoiseEnabled] = useState(true);
  const [trackingJitterEnabled, setTrackingJitterEnabled] = useState(true);
  const [bloomEnabled, setBloomEnabled] = useState(true);

  useEffect(() => {
    const loadWasm = async () => {
      await init();
      console.log("WASM loaded");
      setIsWasmLoaded(true);
    };
    loadWasm();

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    handleResize();

    // Prevent scrolling on body
    document.body.style.overflow = "hidden";

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      // Restore original body overflow
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (isWasmLoaded && canvasRef.current) {
      try {
        const context = init_webgl("webgl-canvas");
        contextRef.current = context;

        const animate = (currentTime: number) => {
          const elapsed = currentTime - lastFrameTimeRef.current;

          if (elapsed >= frameInterval) {
            lastFrameTimeRef.current = currentTime - (elapsed % frameInterval);

            if (contextRef.current) {
              render_scene(
                contextRef.current,
                currentTime / 1000,
                distortionEnabled ? distortion : 0,
                scanlineEnabled ? scanlineIntensity : 0,
                glitchEnabled ? glitchIntensity : 0,
                colorShiftEnabled ? colorShift : 0,
                dotMatrixEnabled ? dotMatrixIntensity : 0,
                chromaticAberrationEnabled ? chromaticAberration : 0,
                vignetteEnabled ? vignetteIntensity : 0,
                horizontalDistortionEnabled ? horizontalDistortion : 0,
                tapeNoiseEnabled ? tapeNoiseIntensity : 0,
                trackingJitterEnabled ? trackingJitterIntensity : 0,
                bloomEnabled ? bloomIntensity : 0
              );
            }
          }

          animationRef.current = requestAnimationFrame(animate);
        };

        lastFrameTimeRef.current = performance.now();
        animationRef.current = requestAnimationFrame(animate);
      } catch (error) {
        console.error("Error initializing WebGL:", error);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    isWasmLoaded,
    distortion,
    distortionEnabled,
    scanlineIntensity,
    scanlineEnabled,
    glitchIntensity,
    glitchEnabled,
    colorShift,
    colorShiftEnabled,
    dotMatrixIntensity,
    dotMatrixEnabled,
    chromaticAberration,
    chromaticAberrationEnabled,
    vignetteIntensity,
    vignetteEnabled,
    horizontalDistortion,
    horizontalDistortionEnabled,
    tapeNoiseIntensity,
    tapeNoiseEnabled,
    trackingJitterIntensity,
    trackingJitterEnabled,
    bloomIntensity,
    bloomEnabled,
  ]);

  const handleDistortionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistortion(parseFloat(e.target.value));
  };

  const handleScanlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScanlineIntensity(parseFloat(e.target.value));
  };

  const handleGlitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlitchIntensity(parseFloat(e.target.value));
  };

  const handleColorShiftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorShift(parseFloat(e.target.value));
  };

  const handleDotMatrixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDotMatrixIntensity(parseFloat(e.target.value));
  };

  const handleChromaticAberrationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChromaticAberration(parseFloat(e.target.value));
  };

  const toggleControls = () => {
    setControlsVisible(!controlsVisible);
  };

  const handleDistortionToggle = (checked: boolean) => {
    setDistortionEnabled(checked);
    if (checked && distortion < sliderRanges.distortion.min) {
      setDistortion(sliderRanges.distortion.min);
    }
  };

  const handleScanlineToggle = (checked: boolean) => {
    setScanlineEnabled(checked);
    if (checked && scanlineIntensity < sliderRanges.scanline.min) {
      setScanlineIntensity(sliderRanges.scanline.min);
    }
  };

  const handleGlitchToggle = (checked: boolean) => {
    setGlitchEnabled(checked);
    if (checked && glitchIntensity < sliderRanges.glitch.min) {
      setGlitchIntensity(sliderRanges.glitch.min);
    }
  };

  const handleColorShiftToggle = (checked: boolean) => {
    setColorShiftEnabled(checked);
    if (checked && colorShift < sliderRanges.colorShift.min) {
      setColorShift(sliderRanges.colorShift.min);
    }
  };

  const handleDotMatrixToggle = (checked: boolean) => {
    setDotMatrixEnabled(checked);
    if (checked && dotMatrixIntensity < sliderRanges.dotMatrix.min) {
      setDotMatrixIntensity(sliderRanges.dotMatrix.min);
    }
  };

  const handleChromaticAberrationToggle = (checked: boolean) => {
    setChromaticAberrationEnabled(checked);
    if (checked && chromaticAberration < sliderRanges.chromaticAberration.min) {
      setChromaticAberration(sliderRanges.chromaticAberration.min);
    }
  };

  const handleVignetteToggle = (checked: boolean) => {
    setVignetteEnabled(checked);
    if (checked && vignetteIntensity < sliderRanges.vignette.min) {
      setVignetteIntensity(sliderRanges.vignette.min);
    }
  };

  const handleHorizontalDistortionToggle = (checked: boolean) => {
    setHorizontalDistortionEnabled(checked);
    if (
      checked &&
      horizontalDistortion < sliderRanges.horizontalDistortion.min
    ) {
      setHorizontalDistortion(sliderRanges.horizontalDistortion.min);
    }
  };

  const handleTapeNoiseToggle = (checked: boolean) => {
    setTapeNoiseEnabled(checked);
    if (checked && tapeNoiseIntensity < sliderRanges.tapeNoise.min) {
      setTapeNoiseIntensity(sliderRanges.tapeNoise.min);
    }
  };

  const handleTrackingJitterToggle = (checked: boolean) => {
    setTrackingJitterEnabled(checked);
    if (checked && trackingJitterIntensity < sliderRanges.trackingJitter.min) {
      setTrackingJitterIntensity(sliderRanges.trackingJitter.min);
    }
  };

  const handleBloomToggle = (checked: boolean) => {
    setBloomEnabled(checked);
    if (checked && bloomIntensity < sliderRanges.bloom.min) {
      setBloomIntensity(sliderRanges.bloom.min);
    }
  };

  const randomizeEffects = () => {
    handleDistortionToggle(Math.random() > 0.3);
    handleScanlineToggle(Math.random() > 0.3);
    handleGlitchToggle(Math.random() > 0.3);
    handleColorShiftToggle(Math.random() > 0.3);
    handleDotMatrixToggle(Math.random() > 0.3);
    handleChromaticAberrationToggle(Math.random() > 0.3);
    handleVignetteToggle(Math.random() > 0.3);
    handleHorizontalDistortionToggle(Math.random() > 0.3);
    handleTapeNoiseToggle(Math.random() > 0.3);
    handleTrackingJitterToggle(Math.random() > 0.3);
    handleBloomToggle(Math.random() > 0.3);

    setDistortion(
      randomInRange(sliderRanges.distortion.min, sliderRanges.distortion.max)
    );
    setScanlineIntensity(
      randomInRange(sliderRanges.scanline.min, sliderRanges.scanline.max)
    );
    setGlitchIntensity(
      randomInRange(sliderRanges.glitch.min, sliderRanges.glitch.max)
    );
    setColorShift(
      randomInRange(sliderRanges.colorShift.min, sliderRanges.colorShift.max)
    );
    setDotMatrixIntensity(
      randomInRange(sliderRanges.dotMatrix.min, sliderRanges.dotMatrix.max)
    );
    setChromaticAberration(
      randomInRange(
        sliderRanges.chromaticAberration.min,
        sliderRanges.chromaticAberration.max
      )
    );
    setVignetteIntensity(
      randomInRange(sliderRanges.vignette.min, sliderRanges.vignette.max)
    );
    setHorizontalDistortion(
      randomInRange(
        sliderRanges.horizontalDistortion.min,
        sliderRanges.horizontalDistortion.max
      )
    );
    setTapeNoiseIntensity(
      randomInRange(sliderRanges.tapeNoise.min, sliderRanges.tapeNoise.max)
    );
    setTrackingJitterIntensity(
      randomInRange(
        sliderRanges.trackingJitter.min,
        sliderRanges.trackingJitter.max
      )
    );
    setBloomIntensity(
      randomInRange(sliderRanges.bloom.min, sliderRanges.bloom.max)
    );
  };

  return (
    <div className="overflow-hidden h-screen w-screen">
      <canvas
        id="webgl-canvas"
        ref={canvasRef}
        className="w-full h-full bg-black z-0"
      />

      <EffectControls
        effectStates={{
          distortion,
          distortionEnabled,
          scanlineIntensity,
          scanlineEnabled,
          glitchIntensity,
          glitchEnabled,
          colorShift,
          colorShiftEnabled,
          dotMatrixIntensity,
          dotMatrixEnabled,
          chromaticAberration,
          chromaticAberrationEnabled,
          vignetteIntensity,
          vignetteEnabled,
          horizontalDistortion,
          horizontalDistortionEnabled,
          tapeNoiseIntensity,
          tapeNoiseEnabled,
          trackingJitterIntensity,
          trackingJitterEnabled,
          bloomIntensity,
          bloomEnabled,
        }}
        controlHandlers={{
          handleDistortionChange,
          handleScanlineChange,
          handleGlitchChange,
          handleColorShiftChange,
          handleDotMatrixChange,
          handleChromaticAberrationChange,
          setVignetteIntensity,
          setHorizontalDistortion,
          setTapeNoiseIntensity,
          setTrackingJitterIntensity,
          setBloomIntensity,
          handleDistortionToggle,
          handleScanlineToggle,
          handleGlitchToggle,
          handleColorShiftToggle,
          handleDotMatrixToggle,
          handleChromaticAberrationToggle,
          handleVignetteToggle,
          handleHorizontalDistortionToggle,
          handleTapeNoiseToggle,
          handleTrackingJitterToggle,
          handleBloomToggle,
        }}
        controlsVisible={controlsVisible}
        toggleControls={toggleControls}
        randomizeEffects={randomizeEffects}
      />
    </div>
  );
};
