float scanline(vec2 uv, float time, float scanlineIntensity) {
    return sin(uv.y * 100.0) * scanlineIntensity + (1.0 - scanlineIntensity);
}