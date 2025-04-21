import { useState, useEffect, useRef } from "react";
// todo: this works but the ide can't see the contents of the docker volume with the wasm build artifacts
// @ts-ignore
import init, { init_webgl, render_scene } from "../../../pkg";
import { Layout } from "../../components";

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

  const sliderRanges = {
    distortion: { min: 0.1, max: 5, step: 0.1 },
    scanline: { min: 0.1, max: 1, step: 0.1 },
    glitch: { min: 0.1, max: 1, step: 0.1 },
    colorShift: { min: 1, max: 100, step: 1 },
    dotMatrix: { min: 0.1, max: 1, step: 0.1 },
    chromaticAberration: { min: 1, max: 10, step: 1 },
    vignette: { min: 1, max: 100, step: 1 },
    horizontalDistortion: { min: 0.1, max: 1, step: 0.1 },
    tapeNoise: { min: 0.05, max: 0.5, step: 0.05 },
    trackingJitter: { min: 0.1, max: 3, step: 0.1 },
    bloom: { min: 1, max: 100, step: 1 },
  };

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

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
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

  const randomInRange = (min: number, max: number) => {
    return min + Math.random() * (max - min);
  };

  return (
    <div>
      <canvas
        id="webgl-canvas"
        ref={canvasRef}
        className="w-full h-full bg-black z-0"
      />

      <button
        className="fixed top-2.5 right-2.5 z-10 px-3 py-1.5 rounded text-white"
        onClick={toggleControls}
      >
        {controlsVisible ? "hide controls" : "show controls"}
      </button>

      <div
        className={`fixed top-2.5 right-2.5 w-[280px] p-4 bg-black/70 rounded-lg text-white z-5 shadow-lg ${
          controlsVisible ? "block" : "hidden"
        }`}
      >
        <div className="mb-2 text-xs">
          <div className="flex items-center justify-between">
            <label className="flex items-center mr-2">
              <input
                type="checkbox"
                checked={distortionEnabled}
                onChange={(e) => handleDistortionToggle(e.target.checked)}
                className="mr-1"
              />
              <span>CRT Distortion</span>
            </label>
            <span className="w-8 text-right">{distortion.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={sliderRanges.distortion.min}
            max={sliderRanges.distortion.max}
            step={sliderRanges.distortion.step}
            value={distortion}
            onChange={handleDistortionChange}
            disabled={!distortionEnabled}
            className="w-full h-3 my-0.5"
          />
        </div>

        <div className="mb-2 text-xs">
          <div className="flex items-center justify-between">
            <label className="flex items-center mr-2">
              <input
                type="checkbox"
                checked={scanlineEnabled}
                onChange={(e) => handleScanlineToggle(e.target.checked)}
                className="mr-1"
              />
              <span>Scanlines</span>
            </label>
            <span className="w-8 text-right">
              {scanlineIntensity.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min={sliderRanges.scanline.min}
            max={sliderRanges.scanline.max}
            step={sliderRanges.scanline.step}
            value={scanlineIntensity}
            onChange={handleScanlineChange}
            disabled={!scanlineEnabled}
            className="w-full h-3 my-0.5"
          />
        </div>

        <div className="mb-2 text-xs">
          <div className="flex items-center justify-between">
            <label className="flex items-center mr-2">
              <input
                type="checkbox"
                checked={glitchEnabled}
                onChange={(e) => handleGlitchToggle(e.target.checked)}
                className="mr-1"
              />
              <span>Glitch</span>
            </label>
            <span className="w-8 text-right">{glitchIntensity.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={sliderRanges.glitch.min}
            max={sliderRanges.glitch.max}
            step={sliderRanges.glitch.step}
            value={glitchIntensity}
            onChange={handleGlitchChange}
            disabled={!glitchEnabled}
            className="w-full h-3 my-0.5"
          />
        </div>

        <div className="mb-2 text-xs">
          <div className="flex items-center justify-between">
            <label className="flex items-center mr-2">
              <input
                type="checkbox"
                checked={colorShiftEnabled}
                onChange={(e) => handleColorShiftToggle(e.target.checked)}
                className="mr-1"
              />
              <span>Color Shift</span>
            </label>
            <span className="w-8 text-right">{colorShift.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={sliderRanges.colorShift.min}
            max={sliderRanges.colorShift.max}
            step={sliderRanges.colorShift.step}
            value={colorShift}
            onChange={handleColorShiftChange}
            disabled={!colorShiftEnabled}
            className="w-full h-3 my-0.5"
          />
        </div>

        <div className="mb-2 text-xs">
          <div className="flex items-center justify-between">
            <label className="flex items-center mr-2">
              <input
                type="checkbox"
                checked={dotMatrixEnabled}
                onChange={(e) => handleDotMatrixToggle(e.target.checked)}
                className="mr-1"
              />
              <span>LED/Dot Matrix</span>
            </label>
            <span className="w-8 text-right">
              {dotMatrixIntensity.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min={sliderRanges.dotMatrix.min}
            max={sliderRanges.dotMatrix.max}
            step={sliderRanges.dotMatrix.step}
            value={dotMatrixIntensity}
            onChange={handleDotMatrixChange}
            disabled={!dotMatrixEnabled}
            className="w-full h-3 my-0.5"
          />
        </div>

        <div className="mb-2 text-xs">
          <div className="flex items-center justify-between">
            <label className="flex items-center mr-2">
              <input
                type="checkbox"
                checked={chromaticAberrationEnabled}
                onChange={(e) =>
                  handleChromaticAberrationToggle(e.target.checked)
                }
                className="mr-1"
              />
              <span>Chromatic Aberration</span>
            </label>
            <span className="w-8 text-right">
              {chromaticAberration.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min={sliderRanges.chromaticAberration.min}
            max={sliderRanges.chromaticAberration.max}
            step={sliderRanges.chromaticAberration.step}
            value={chromaticAberration}
            onChange={handleChromaticAberrationChange}
            disabled={!chromaticAberrationEnabled}
            className="w-full h-3 my-0.5"
          />
        </div>

        <div className="mb-2 text-xs">
          <div className="flex items-center justify-between">
            <label className="flex items-center mr-2">
              <input
                type="checkbox"
                checked={vignetteEnabled}
                onChange={(e) => handleVignetteToggle(e.target.checked)}
                className="mr-1"
              />
              <span>Vignette</span>
            </label>
            <span className="w-8 text-right">
              {vignetteIntensity.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min={sliderRanges.vignette.min}
            max={sliderRanges.vignette.max}
            step={sliderRanges.vignette.step}
            value={vignetteIntensity}
            onChange={(e) => setVignetteIntensity(parseFloat(e.target.value))}
            disabled={!vignetteEnabled}
            className="w-full h-3 my-0.5"
          />
        </div>

        <div className="mb-2 text-xs">
          <div className="flex items-center justify-between">
            <label className="flex items-center mr-2">
              <input
                type="checkbox"
                checked={horizontalDistortionEnabled}
                onChange={(e) =>
                  handleHorizontalDistortionToggle(e.target.checked)
                }
                className="mr-1"
              />
              <span>Horizontal Distortion</span>
            </label>
            <span className="w-8 text-right">
              {horizontalDistortion.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min={sliderRanges.horizontalDistortion.min}
            max={sliderRanges.horizontalDistortion.max}
            step={sliderRanges.horizontalDistortion.step}
            value={horizontalDistortion}
            onChange={(e) =>
              setHorizontalDistortion(parseFloat(e.target.value))
            }
            disabled={!horizontalDistortionEnabled}
            className="w-full h-3 my-0.5"
          />
        </div>

        <div className="mb-2 text-xs">
          <div className="flex items-center justify-between">
            <label className="flex items-center mr-2">
              <input
                type="checkbox"
                checked={tapeNoiseEnabled}
                onChange={(e) => handleTapeNoiseToggle(e.target.checked)}
                className="mr-1"
              />
              <span>Tape Noise</span>
            </label>
            <span className="w-8 text-right">
              {tapeNoiseIntensity.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min={sliderRanges.tapeNoise.min}
            max={sliderRanges.tapeNoise.max}
            step={sliderRanges.tapeNoise.step}
            value={tapeNoiseIntensity}
            onChange={(e) => setTapeNoiseIntensity(parseFloat(e.target.value))}
            disabled={!tapeNoiseEnabled}
            className="w-full h-3 my-0.5"
          />
        </div>

        <div className="mb-2 text-xs">
          <div className="flex items-center justify-between">
            <label className="flex items-center mr-2">
              <input
                type="checkbox"
                checked={trackingJitterEnabled}
                onChange={(e) => handleTrackingJitterToggle(e.target.checked)}
                className="mr-1"
              />
              <span>Tracking Jitter</span>
            </label>
            <span className="w-8 text-right">
              {trackingJitterIntensity.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min={sliderRanges.trackingJitter.min}
            max={sliderRanges.trackingJitter.max}
            step={sliderRanges.trackingJitter.step}
            value={trackingJitterIntensity}
            onChange={(e) =>
              setTrackingJitterIntensity(parseFloat(e.target.value))
            }
            disabled={!trackingJitterEnabled}
            className="w-full h-3 my-0.5"
          />
        </div>

        <div className="mb-2 text-xs">
          <div className="flex items-center justify-between">
            <label className="flex items-center mr-2">
              <input
                type="checkbox"
                checked={bloomEnabled}
                onChange={(e) => handleBloomToggle(e.target.checked)}
                className="mr-1"
              />
              <span>Bloom Glow</span>
            </label>
            <span className="w-8 text-right">{bloomIntensity.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={sliderRanges.bloom.min}
            max={sliderRanges.bloom.max}
            step={sliderRanges.bloom.step}
            value={bloomIntensity}
            onChange={(e) => setBloomIntensity(parseFloat(e.target.value))}
            disabled={!bloomEnabled}
            className="w-full h-3 my-0.5"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 mt-2.5">
          <button
            className="bg-purple-600/80 text-white border-none rounded px-1.5 py-1.5 text-xs flex-1 min-w-[80px]"
            onClick={() => {
              handleDistortionToggle(true);
              handleScanlineToggle(true);
              handleGlitchToggle(true);
              handleColorShiftToggle(true);
              handleDotMatrixToggle(true);
              handleChromaticAberrationToggle(true);
              handleVignetteToggle(true);
              handleHorizontalDistortionToggle(true);
              handleTapeNoiseToggle(true);
              handleTrackingJitterToggle(true);
              handleBloomToggle(true);
            }}
          >
            Enable All
          </button>
          <button
            className="bg-purple-600/80 text-white border-none rounded px-1.5 py-1.5 text-xs flex-1 min-w-[80px]"
            onClick={() => {
              handleDistortionToggle(false);
              handleScanlineToggle(false);
              handleGlitchToggle(false);
              handleColorShiftToggle(false);
              handleDotMatrixToggle(false);
              handleChromaticAberrationToggle(false);
              handleVignetteToggle(false);
              handleHorizontalDistortionToggle(false);
              handleTapeNoiseToggle(false);
              handleTrackingJitterToggle(false);
              handleBloomToggle(false);
            }}
          >
            Disable All
          </button>
          <button
            className="bg-purple-600/80 text-white border-none rounded px-1.5 py-1.5 text-xs flex-1 min-w-[80px]"
            onClick={randomizeEffects}
          >
            Randomize Effects
          </button>
        </div>
      </div>
    </div>
  );
};

export const VFXRendererPage = () => {
  return (
    <Layout>
      <VFXRenderer />
    </Layout>
  );
};
