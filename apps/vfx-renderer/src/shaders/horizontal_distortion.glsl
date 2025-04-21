vec2 horizontalDistortionEffect(vec2 uv, float time, float intensity) {
    if (intensity < 0.001) return uv;
    
    float scrollSpeed = 0.1; 
    float linePos = fract(time * scrollSpeed);
    
    float lineThickness = 0.01 + intensity * 0.06; 
    
    float lineShift = 0.01 + intensity * 0.09; 
    
    vec2 distortedUV = uv;
    
    // Random noise function
    float noise = fract(sin(dot(uv + time * 0.1, vec2(12.9898, 78.233))) * 43758.5453);
    
    // Multiple horizontal scanlines
    for (int i = 0; i < 3; i++) {
        float scanLinePos = fract(linePos + float(i) * 0.3);
        float distanceFromLine = abs(uv.y - scanLinePos);
        
        if (distanceFromLine < lineThickness) {
            float smoothFactor = smoothstep(lineThickness, 0.0, distanceFromLine);
            
            // Random direction and amplitude
            float direction = (noise > 0.5) ? 1.0 : -1.0;
            float randomShift = lineShift * (0.5 + noise);
            
            distortedUV.x += direction * randomShift * smoothFactor;
        }
    }
    
    // Add random horizontal jitter
    if (noise > 0.7) {
        distortedUV.x += (noise - 0.7) * intensity * 0.2;
    }
    
    // Add occasional vertical shift
    if (noise > 0.9) {
        distortedUV.y += (noise - 0.9) * intensity * 0.05;
    }
    
    return distortedUV;
} 