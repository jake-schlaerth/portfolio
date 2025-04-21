float vignette(vec2 uv, float intensity, float time) {
    if (intensity < 0.001) return 1.0;
    
    // Distance from center (adjusted to make it more oval for widescreen)
    vec2 center = vec2(0.5, 0.5);
    float dist = length((uv - center) * vec2(1.8, 1.0));
    
    // Animated vignette with subtle pulsing - stronger effect
    float vignetteAmount = smoothstep(0.2, 1.0, dist * (0.6 + intensity * 0.8));
    vignetteAmount += sin(time * 0.2) * 0.05 * intensity; // Subtle pulsing effect
    
    // Make sure we don't go completely black - scale by intensity
    return 1.0 - (vignetteAmount * clamp(intensity * 0.7, 0.0, 0.9));
}