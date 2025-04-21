import { sliderRanges } from "./types";

interface EffectControlsProps {
  effectStates: {
    distortion: number;
    distortionEnabled: boolean;
    scanlineIntensity: number;
    scanlineEnabled: boolean;
    glitchIntensity: number;
    glitchEnabled: boolean;
    colorShift: number;
    colorShiftEnabled: boolean;
    dotMatrixIntensity: number;
    dotMatrixEnabled: boolean;
    chromaticAberration: number;
    chromaticAberrationEnabled: boolean;
    vignetteIntensity: number;
    vignetteEnabled: boolean;
    horizontalDistortion: number;
    horizontalDistortionEnabled: boolean;
    tapeNoiseIntensity: number;
    tapeNoiseEnabled: boolean;
    trackingJitterIntensity: number;
    trackingJitterEnabled: boolean;
    bloomIntensity: number;
    bloomEnabled: boolean;
  };
  controlHandlers: {
    handleDistortionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleScanlineChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleGlitchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleColorShiftChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDotMatrixChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChromaticAberrationChange: (
      e: React.ChangeEvent<HTMLInputElement>
    ) => void;
    setVignetteIntensity: (value: number) => void;
    setHorizontalDistortion: (value: number) => void;
    setTapeNoiseIntensity: (value: number) => void;
    setTrackingJitterIntensity: (value: number) => void;
    setBloomIntensity: (value: number) => void;
    handleDistortionToggle: (checked: boolean) => void;
    handleScanlineToggle: (checked: boolean) => void;
    handleGlitchToggle: (checked: boolean) => void;
    handleColorShiftToggle: (checked: boolean) => void;
    handleDotMatrixToggle: (checked: boolean) => void;
    handleChromaticAberrationToggle: (checked: boolean) => void;
    handleVignetteToggle: (checked: boolean) => void;
    handleHorizontalDistortionToggle: (checked: boolean) => void;
    handleTapeNoiseToggle: (checked: boolean) => void;
    handleTrackingJitterToggle: (checked: boolean) => void;
    handleBloomToggle: (checked: boolean) => void;
  };
  controlsVisible: boolean;
  toggleControls: () => void;
  randomizeEffects: () => void;
}

export const EffectControls = ({
  effectStates,
  controlHandlers,
  controlsVisible,
  toggleControls,
  randomizeEffects,
}: EffectControlsProps) => {
  const {
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
  } = effectStates;

  const {
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
  } = controlHandlers;

  return (
    <>
      <div
        className={`fixed bottom-2.5 right-2.5 w-[280px] p-4 bg-black/70 rounded-lg text-white z-5 shadow-lg ${
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
              <span>crt distortion</span>
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
              <span>scanlines</span>
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
              <span>glitch</span>
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
              <span>color shift</span>
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
              <span>led/dot matrix</span>
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
              <span>chromatic aberration</span>
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
              <span>vignette</span>
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
              <span>horizontal distortion</span>
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
              <span>tape noise</span>
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
              <span>tracking jitter</span>
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
              <span>bloom glow</span>
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
            enable all
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
            disable all
          </button>
          <button
            className="bg-purple-600/80 text-white border-none rounded px-1.5 py-1.5 text-xs flex-1 min-w-[80px]"
            onClick={randomizeEffects}
          >
            randomize effects
          </button>
          <button
            className="bg-purple-600/80 text-white border-none rounded px-1.5 py-1.5 text-xs flex-1 min-w-[80px]"
            onClick={toggleControls}
          >
            {controlsVisible ? "hide controls" : "show controls"}
          </button>
        </div>
      </div>

      {!controlsVisible && (
        <button
          className="fixed bottom-2.5 right-2.5 z-10 px-3 py-1.5 rounded text-white bg-purple-600/80"
          onClick={toggleControls}
        >
          show controls
        </button>
      )}
    </>
  );
};
