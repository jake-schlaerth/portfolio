precision mediump float;

// Uniforms
uniform float time;
uniform float distortion;
uniform float scanlineIntensity;
uniform float glitchIntensity;
uniform float colorShift;
uniform float dotMatrixIntensity;
uniform float chromaticAberration;
uniform float vignetteIntensity;
uniform float horizontalDistortion;
uniform float tapeNoiseIntensity;
uniform float trackingJitterIntensity;
uniform float bloomIntensity;

varying vec2 vUv;

#pragma glslify: random = require('./random.glsl')
#pragma glslify: scanline = require('./scanline.glsl')
#pragma glslify: vhsNoise = require('./vhs_noise.glsl')
#pragma glslify: horizontalDistortionEffect = require('./horizontal_distortion.glsl')
#pragma glslify: dotMatrix = require('./dot_matrix.glsl')
#pragma glslify: vignette = require('./vignette.glsl')
#pragma glslify: tapeNoise = require('./tape_noise.glsl')
#pragma glslify: trackingJitter = require('./tracking_jitter.glsl')
#pragma glslify: bloom = require('./bloom.glsl')

void main() {
    vec3 baseColor = vec3(0.8, 0.2, 0.8); 
    
    vec2 uv = trackingJitter(vUv, time, trackingJitterIntensity);
    
    uv = horizontalDistortionEffect(uv, time, horizontalDistortion);
    
    vec2 crtUv = uv * 2.0 - 1.0;
    float crtStrength = dot(crtUv, crtUv) * distortion;
    uv = uv + crtUv * crtStrength;
    
    float r_shift = sin(time * 0.5) * colorShift;
    float g_shift = sin(time * 0.3) * colorShift;
    float b_shift = sin(time * 0.7) * colorShift;
    
    float r = sin(uv.x * 10.0 + time + r_shift) * 0.5 + 0.5;
    float g = sin(uv.y * 8.0 + time * 0.7 + g_shift) * 0.5 + 0.5;
    float b = sin((uv.x + uv.y) * 5.0 + time * 0.3 + b_shift) * 0.5 + 0.5;
    
    vec3 color = baseColor * vec3(r, g, b);
    
    color += vec3(uv.x * 0.2, uv.y * 0.1, (1.0 - uv.y) * 0.3);
    
    float dotEffect = dotMatrix(uv, dotMatrixIntensity);
    color *= dotEffect;
    
    if (scanlineIntensity > 0.001) {
        float scanEffect = scanline(uv, time, scanlineIntensity);
        color *= scanEffect;
    }
    
    if (glitchIntensity > 0.001) {
        float noise = vhsNoise(uv, time, glitchIntensity);
        if (noise > 0.02) {
            color = mix(color, vec3(0.8, 0.4, 0.9), noise * 2.0);
        }
        
        float staticNoise = random(uv + time * 0.01) * 0.07 * glitchIntensity;
        color += vec3(staticNoise);
    }
    
    if (colorShift > 0.001) {
        float pulse = sin(time) * 0.5 + 0.5;
        color += vec3(0.1, 0.05, 0.2) * pulse;
    }
    
    if (bloomIntensity > 0.001) {
        color = bloom(color, bloomIntensity, time);
    }
    
    if (chromaticAberration > 0.001) {
        vec3 finalColor;
        
        float rgbSplitAmount = chromaticAberration * 0.15; 
        
        vec3 originalColor = color;
        
        // Apply tracking jitter to base UV coordinates for chromatic aberration
        vec2 jitteredVUv = trackingJitter(vUv, time, trackingJitterIntensity);
        
        float redOffset = rgbSplitAmount;
        vec2 redUV = jitteredVUv + vec2(redOffset, 0.0);
        
        if (horizontalDistortion > 0.001) {
            redUV = horizontalDistortionEffect(redUV, time, horizontalDistortion);
        }
        
        if (redUV.x < 1.0 && redUV.x > 0.0 && redUV.y < 1.0 && redUV.y > 0.0) {
            vec2 offsetUv = redUV;
            
            if (distortion > 0.001) {
                vec2 offsetCrtUv = offsetUv * 2.0 - 1.0;
                float offsetCrtStrength = dot(offsetCrtUv, offsetCrtUv) * distortion;
                offsetUv = offsetUv + offsetCrtUv * offsetCrtStrength;
            }
            
            finalColor.r = sin(offsetUv.x * 10.0 + time + r_shift) * 0.5 + 0.5;
            finalColor.r = finalColor.r * baseColor.r + offsetUv.x * 0.2;
            
            if (dotMatrixIntensity > 0.001) {
                finalColor.r *= dotMatrix(offsetUv, dotMatrixIntensity);
            }
        } else {
            finalColor.r = originalColor.r;
        }
        
        vec2 greenUV = jitteredVUv;
        
        if (horizontalDistortion > 0.001) {
            greenUV = horizontalDistortionEffect(greenUV, time, horizontalDistortion);
            
            if (greenUV.x < 1.0 && greenUV.x > 0.0 && greenUV.y < 1.0 && greenUV.y > 0.0) {
                vec2 offsetUv = greenUV;
                
                if (distortion > 0.001) {
                    vec2 offsetCrtUv = offsetUv * 2.0 - 1.0;
                    float offsetCrtStrength = dot(offsetCrtUv, offsetCrtUv) * distortion;
                    offsetUv = offsetUv + offsetCrtUv * offsetCrtStrength;
                }
                
                float g = sin(offsetUv.y * 8.0 + time * 0.7 + g_shift) * 0.5 + 0.5;
                float greenComponent = g * baseColor.g + offsetUv.y * 0.1;
                
                if (dotMatrixIntensity > 0.001) {
                    greenComponent *= dotMatrix(offsetUv, dotMatrixIntensity);
                }
                
                finalColor.g = greenComponent;
            } else {
                finalColor.g = originalColor.g;
            }
        } else {
            finalColor.g = originalColor.g;
        }
        
        float blueOffset = rgbSplitAmount;
        vec2 blueUV = jitteredVUv - vec2(blueOffset, 0.0);
        
        if (horizontalDistortion > 0.001) {
            blueUV = horizontalDistortionEffect(blueUV, time, horizontalDistortion);
        }
        
        if (blueUV.x < 1.0 && blueUV.x > 0.0 && blueUV.y < 1.0 && blueUV.y > 0.0) {
            vec2 offsetUv = blueUV;
            
            if (distortion > 0.001) {
                vec2 offsetCrtUv = offsetUv * 2.0 - 1.0;
                float offsetCrtStrength = dot(offsetCrtUv, offsetCrtUv) * distortion;
                offsetUv = offsetUv + offsetCrtUv * offsetCrtStrength;
            }
            
            finalColor.b = sin((offsetUv.x + offsetUv.y) * 5.0 + time * 0.3 + b_shift) * 0.5 + 0.5;
            finalColor.b = finalColor.b * baseColor.b + (1.0 - offsetUv.y) * 0.3;
            
            if (dotMatrixIntensity > 0.001) {
                finalColor.b *= dotMatrix(offsetUv, dotMatrixIntensity);
            }
        } else {
            finalColor.b = originalColor.b;
        }
        
        color = finalColor;
    }
    
    if (vignetteIntensity > 0.001) {
        float vignetteEffect = vignette(vUv, vignetteIntensity, time);
        
        vec3 tintColor = vec3(0.4, 0.0, 0.6); 
        
        color = color * vignetteEffect; 
        
        float tintAmount = (1.0 - vignetteEffect) * 0.7;
        color = mix(color, tintColor * length(color), tintAmount);
    }
    
    if (tapeNoiseIntensity > 0.001) {
        color = tapeNoise(vUv, color, time, tapeNoiseIntensity);
    }
    
    gl_FragColor = vec4(color, 1.0);
} 