import { useEffect, useRef, useState } from 'react'
import { Icon } from '../common/Icon'

const MODES = [
  { id: 0, name: 'AETHER', note: 'plasma field' },
  { id: 1, name: 'WARP', note: 'polar drift' },
  { id: 2, name: 'GRID', note: 'signal mesh' },
]

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const FRAGMENT_SHADER = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_intensity;
  uniform int u_mode;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.03;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    vec2 mouse = (u_mouse * 2.0 - 1.0);
    mouse.x *= u_resolution.x / u_resolution.y;

    float t = u_time * (0.35 + u_intensity * 0.65);
    vec3 cyan = vec3(0.435, 0.969, 1.0);
    vec3 violet = vec3(0.608, 0.424, 1.0);
    vec3 magenta = vec3(1.0, 0.31, 0.847);
    vec3 color = vec3(0.012, 0.022, 0.045);

    if (u_mode == 0) {
      vec2 p = uv * 1.7;
      p += mouse * 0.45;
      float n1 = fbm(p + vec2(t * 0.3, -t * 0.18));
      float n2 = fbm(p * 1.9 - vec2(t * 0.16, t * 0.24));
      float plasma = sin((p.x + n1 * 2.4) * 4.0 + t) * cos((p.y - n2 * 2.0) * 4.0 - t * 0.8);
      float ring = smoothstep(0.35, 1.15, length(p - mouse * 0.08));
      color += cyan * smoothstep(0.62, 1.0, plasma) * 0.75;
      color += violet * smoothstep(0.12, 0.8, n1) * 0.55;
      color += magenta * pow(1.0 - ring, 3.0) * 0.34;
    } else if (u_mode == 1) {
      vec2 p = uv;
      float radius = length(p);
      float angle = atan(p.y, p.x);
      angle += radius * 3.4 - t * 0.48 + fbm(p * 2.0 + t * 0.08) * 1.3;
      vec2 warped = vec2(cos(angle), sin(angle)) * radius;
      float bands = sin(warped.x * 9.0 + warped.y * 6.0 - t * 1.2 + mouse.x * 2.0) * 0.5 + 0.5;
      float haze = smoothstep(1.05, 0.05, radius) * (0.3 + fbm(warped * 3.0 + t * 0.1) * 0.7);
      color += cyan * smoothstep(0.55, 0.95, bands) * haze * 0.7;
      color += violet * smoothstep(0.3, 0.9, 1.0 - bands) * haze * 0.65;
      color += magenta * smoothstep(0.45, 0.0, abs(radius - 0.64)) * 0.25;
    } else {
      vec2 p = uv * vec2(1.0, 1.0) + mouse * 0.24;
      float horizon = 0.12;
      float v = smoothstep(horizon, -0.8, p.y);
      vec2 gp = vec2(p.x / max(v, 0.08), p.y / max(v, 0.08));
      gp.y += t * 0.45;
      vec2 grid = abs(fract(gp * 4.0) - 0.5);
      float line = smoothstep(0.475, 0.5, max(grid.x, grid.y));
      float pulse = 0.5 + 0.5 * sin(gp.y * 2.0 - t * 1.5);
      color += cyan * line * v * (0.42 + pulse * 0.38);
      color += violet * smoothstep(0.35, 1.0, fbm(gp * 2.0 + t * 0.05)) * v * 0.25;
      color += magenta * smoothstep(0.06, 0.0, abs(p.y - horizon)) * 0.7;
      color += cyan * smoothstep(0.42, 0.0, abs(p.x)) * smoothstep(0.25, 0.0, abs(p.y - horizon)) * 0.35;
    }

    color += vec3(0.08, 0.15, 0.25) * fbm(uv * 2.4 + vec2(0.0, t * 0.04)) * 0.32;
    color *= 1.0 - 0.12 * sin(gl_FragCoord.y * 1.6);
    color *= smoothstep(1.8, 0.25, length(uv * vec2(0.82, 1.0)));
    gl_FragColor = vec4(color, 1.0);
  }
`

function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(message || 'Shader compilation failed')
  }
  return shader
}

/** Live WebGL fragment-shader exhibit with three selectable atmospheres. */
export function ShaderLab() {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const modeRef = useRef(0)
  const intensityRef = useRef(0.7)
  const pausedRef = useRef(false)
  const [mode, setMode] = useState(0)
  const [intensity, setIntensity] = useState(72)
  const [paused, setPaused] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    modeRef.current = mode
  }, [mode])

  useEffect(() => {
    intensityRef.current = intensity / 100
  }, [intensity])

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return undefined

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' })
    if (!gl) {
      setFailed(true)
      return undefined
    }

    let vertexShader
    let fragmentShader
    let program
    let buffer
    let rafId = 0
    let resizeObserver
    let disposed = false
    let startTime = performance.now()
    let elapsed = 0
    const mouse = { x: 0.5, y: 0.5, smoothX: 0.5, smoothY: 0.5 }

    try {
      vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
      fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
      program = gl.createProgram()
      gl.attachShader(program, vertexShader)
      gl.attachShader(program, fragmentShader)
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || 'Shader program failed to link')
      }
      gl.useProgram(program)

      buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)
      const positionLocation = gl.getAttribLocation(program, 'a_position')
      gl.enableVertexAttribArray(positionLocation)
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

      const uniforms = {
        resolution: gl.getUniformLocation(program, 'u_resolution'),
        mouse: gl.getUniformLocation(program, 'u_mouse'),
        time: gl.getUniformLocation(program, 'u_time'),
        intensity: gl.getUniformLocation(program, 'u_intensity'),
        mode: gl.getUniformLocation(program, 'u_mode'),
      }

      const resize = () => {
        const rect = wrap.getBoundingClientRect()
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
        canvas.width = Math.max(1, Math.round(rect.width * dpr))
        canvas.height = Math.max(1, Math.round(rect.height * dpr))
        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.uniform2f(uniforms.resolution, canvas.width, canvas.height)
      }

      const onPointerMove = (event) => {
        const rect = wrap.getBoundingClientRect()
        mouse.x = (event.clientX - rect.left) / rect.width
        mouse.y = 1 - (event.clientY - rect.top) / rect.height
      }

      const render = (now) => {
        if (disposed) return
        const delta = Math.min((now - startTime) / 1000, 0.05)
        startTime = now
        if (!pausedRef.current) elapsed += delta
        mouse.smoothX += (mouse.x - mouse.smoothX) * 0.055
        mouse.smoothY += (mouse.y - mouse.smoothY) * 0.055

        gl.uniform1f(uniforms.time, elapsed)
        gl.uniform1f(uniforms.intensity, intensityRef.current)
        gl.uniform1i(uniforms.mode, modeRef.current)
        gl.uniform2f(uniforms.mouse, mouse.smoothX, mouse.smoothY)
        gl.drawArrays(gl.TRIANGLES, 0, 6)

        rafId = requestAnimationFrame(render)
      }

      resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(wrap)
      resize()
      wrap.addEventListener('pointermove', onPointerMove, { passive: true })
      rafId = requestAnimationFrame(render)

      return () => {
        disposed = true
        cancelAnimationFrame(rafId)
        resizeObserver?.disconnect()
        wrap.removeEventListener('pointermove', onPointerMove)
        if (buffer) gl.deleteBuffer(buffer)
        if (program) gl.deleteProgram(program)
        if (vertexShader) gl.deleteShader(vertexShader)
        if (fragmentShader) gl.deleteShader(fragmentShader)
      }
    } catch (error) {
      console.warn('Shader laboratory unavailable:', error)
      setFailed(true)
      return undefined
    }
  }, [])

  return (
    <div className="shader-lab glass-panel">
      <div className="shader-lab__stage" ref={wrapRef}>
        <canvas ref={canvasRef} className="shader-lab__canvas" aria-label="Interactive WebGL fragment shader artwork" />
        {failed ? <div className="shader-lab__fallback" /> : null}
        <div className="shader-lab__overlay">
          <div className="shader-lab__hud shader-lab__hud--tl">
            <span>EXP-001 / FRAGMENT CORE</span>
            <span>MODE: {MODES[mode].name}</span>
          </div>
          <div className="shader-lab__hud shader-lab__hud--tr">
            <span>RES: AUTO</span>
            <span>GL: WEBGL1</span>
          </div>
          <div className="shader-lab__reticle" aria-hidden="true">
            <span /><span /><span /><span />
          </div>
          <div className="shader-lab__hud shader-lab__hud--bl">
            <span>MOVE CURSOR TO BEND FIELD</span>
            <span>u_time ▲</span>
          </div>
          <div className="shader-lab__corner shader-lab__corner--a" aria-hidden="true" />
          <div className="shader-lab__corner shader-lab__corner--b" aria-hidden="true" />
        </div>
      </div>

      <div className="shader-lab__controls">
        <div className="shader-lab__modes" role="group" aria-label="Shader mode">
          {MODES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`shader-mode ${mode === item.id ? 'is-active' : ''}`}
              onClick={() => setMode(item.id)}
              data-cursor="link"
            >
              <span className="mono-label">0{item.id + 1}</span>
              <strong>{item.name}</strong>
              <small>{item.note}</small>
            </button>
          ))}
        </div>
        <div className="shader-lab__sliders">
          <label htmlFor="shader-intensity">
            <span className="mono-label">FIELD INTENSITY <b>{intensity}%</b></span>
            <input
              id="shader-intensity"
              type="range"
              min="0"
              max="100"
              value={intensity}
              onChange={(event) => setIntensity(Number(event.target.value))}
            />
          </label>
          <button type="button" className="shader-play" onClick={() => setPaused((value) => !value)} data-cursor="link">
            <Icon name={paused ? 'play' : 'pause'} size={15} />
            {paused ? 'RESUME' : 'PAUSE'}
          </button>
        </div>
      </div>
    </div>
  )
}
