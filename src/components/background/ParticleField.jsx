import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * GPU particle atmosphere built with Three.js.
 *
 * • Custom ShaderMaterial animates points entirely on the GPU.
 * • Particle count, pixel ratio and antialiasing adapt to viewport capability.
 * • Mouse and scroll feed a damped parallax group.
 * • rAF, listeners, geometry, material and renderer are all disposed on exit.
 */
export function ParticleField() {
  const mountRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const count = reducedMotion ? 420 : isMobile ? 900 : 3000
    let renderer
    let scene
    let camera
    let group
    let points
    let geometry
    let material
    let ringGroup
    let rafId = 0
    let resizeObserver
    let disposed = false

    const pointer = { x: 0, y: 0 }
    const smooth = { x: 0, y: 0 }
    const scroll = { value: 0, smooth: 0 }

    try {
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(46, 1, 0.1, 40)
      camera.position.z = 8.2

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile && !reducedMotion,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.5))
      renderer.setClearColor(0x000000, 0)
      renderer.domElement.className = 'particle-canvas'
      renderer.domElement.setAttribute('aria-hidden', 'true')
      mount.appendChild(renderer.domElement)

      group = new THREE.Group()
      scene.add(group)

      geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(count * 3)
      const colors = new Float32Array(count * 3)
      const sizes = new Float32Array(count)
      const palette = [new THREE.Color('#6ff7ff'), new THREE.Color('#9b6cff'), new THREE.Color('#ff4fd8'), new THREE.Color('#d7fbff')]

      for (let i = 0; i < count; i += 1) {
        const radius = 2.15 + Math.random() * 3.4
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.72
        positions[i * 3 + 2] = radius * Math.cos(phi) * 0.78

        const color = palette[Math.floor(Math.random() * palette.length)]
        colors[i * 3] = color.r
        colors[i * 3 + 1] = color.g
        colors[i * 3 + 2] = color.b
        sizes[i] = Math.random() * 2.6 + 0.7
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
      geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))

      material = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: renderer.getPixelRatio() },
        },
        vertexShader: `
          attribute vec3 aColor;
          attribute float aSize;
          uniform float uTime;
          uniform float uPixelRatio;
          varying vec3 vColor;

          void main() {
            vec3 p = position;
            p.x += sin(uTime * 0.22 + position.y * 1.7) * 0.075;
            p.y += cos(uTime * 0.18 + position.x * 1.9) * 0.075;
            p.z += sin(uTime * 0.12 + position.x * 1.3) * 0.05;

            vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = aSize * uPixelRatio * (15.0 / -mvPosition.z);
            vColor = aColor;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;

          void main() {
            float distanceToCenter = length(gl_PointCoord - vec2(0.5));
            if (distanceToCenter > 0.5) discard;
            float alpha = smoothstep(0.5, 0.0, distanceToCenter);
            float core = smoothstep(0.22, 0.0, distanceToCenter);
            gl_FragColor = vec4(vColor + core * 0.28, alpha * 0.72);
          }
        `,
      })

      points = new THREE.Points(geometry, material)
      group.add(points)

      // Fine orbital lines add depth without another draw-heavy scene.
      ringGroup = new THREE.Group()
      const ringColors = ['#6ff7ff', '#9b6cff', '#ff4fd8']
      ringColors.forEach((color, index) => {
        const curve = new THREE.EllipseCurve(0, 0, 2.9 + index * 0.42, 2.9 + index * 0.42, 0, Math.PI * 2)
        const ringGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(140))
        const ringMaterial = new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: 0.12 + index * 0.02,
          blending: THREE.AdditiveBlending,
        })
        const ring = new THREE.LineLoop(ringGeometry, ringMaterial)
        ring.rotation.x = Math.PI / 2.7 + index * 0.28
        ring.rotation.y = index * 0.5
        ring.userData.dispose = () => {
          ringGeometry.dispose()
          ringMaterial.dispose()
        }
        ringGroup.add(ring)
      })
      group.add(ringGroup)

      const setSize = () => {
        if (!mount || disposed) return
        const width = mount.clientWidth || window.innerWidth
        const height = mount.clientHeight || window.innerHeight
        renderer.setSize(width, height, false)
        camera.aspect = width / Math.max(height, 1)
        camera.updateProjectionMatrix()
        material.uniforms.uPixelRatio.value = renderer.getPixelRatio()
      }

      resizeObserver = new ResizeObserver(setSize)
      resizeObserver.observe(mount)
      setSize()

      const onPointerMove = (event) => {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1
        pointer.y = -((event.clientY / window.innerHeight) * 2 - 1)
      }

      const onScroll = () => {
        scroll.value = window.scrollY / Math.max(window.innerHeight, 1)
      }

      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('scroll', onScroll, { passive: true })

      const clock = new THREE.Clock()

      const render = () => {
        if (disposed) return
        const elapsed = clock.getElapsedTime()
        material.uniforms.uTime.value = elapsed

        smooth.x += (pointer.x - smooth.x) * 0.035
        smooth.y += (pointer.y - smooth.y) * 0.035
        scroll.smooth += (scroll.value - scroll.smooth) * 0.065

        group.rotation.y = elapsed * 0.025 + smooth.x * 0.23
        group.rotation.x = smooth.y * 0.16
        group.position.y = scroll.smooth * 0.65
        ringGroup.rotation.z = elapsed * 0.045
        ringGroup.rotation.y = -smooth.x * 0.1

        renderer.render(scene, camera)
        rafId = requestAnimationFrame(render)
      }

      if (reducedMotion) {
        group.rotation.y = -0.15
        renderer.render(scene, camera)
      } else {
        rafId = requestAnimationFrame(render)
      }

      return () => {
        disposed = true
        cancelAnimationFrame(rafId)
        window.removeEventListener('pointermove', onPointerMove)
        window.removeEventListener('scroll', onScroll)
        resizeObserver?.disconnect()
        geometry?.dispose()
        material?.dispose()
        ringGroup?.children.forEach((ring) => ring.userData.dispose?.())
        renderer?.dispose()
        if (renderer?.domElement?.parentNode === mount) mount.removeChild(renderer.domElement)
        scene?.clear()
      }
    } catch (error) {
      console.warn('WebGL particle field unavailable:', error)
      setFailed(true)
      renderer?.dispose?.()
      return undefined
    }
  }, [reducedMotion])

  return (
    <div className={`particle-field ${failed ? 'has-failed' : ''}`} ref={mountRef} aria-hidden="true">
      {failed ? <div className="particle-field__fallback" /> : null}
    </div>
  )
}
