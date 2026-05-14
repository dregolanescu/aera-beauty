'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`

// Fragment shader: warm concentric rings on cream-100 (#F5EFE7)
// Rings tinted with cocoa tones — like warm light rippling on a cream surface
const fragmentShader = `
  precision highp float;
  uniform vec2 resolution;
  uniform float time;

  void main(void) {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
    float t = time * 0.05;
    float lineWidth = 0.002;

    vec3 rings = vec3(0.0);
    for (int j = 0; j < 3; j++) {
      for (int i = 0; i < 5; i++) {
        rings[j] += lineWidth * float(i * i) / abs(
          fract(t - 0.01 * float(j) + float(i) * 0.01) * 5.0
          - length(uv) + mod(uv.x + uv.y, 0.2)
        );
      }
    }

    // cream-100 base + warm cocoa-tinted glow
    vec3 cream = vec3(0.961, 0.937, 0.906);
    vec3 warmGlow = rings * vec3(0.35, 0.28, 0.22);
    gl_FragColor = vec4(cream + warmGlow * 1.2, 1.0);
  }
`

export function ShaderBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer
    animationId: number
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Respect reduced motion
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReduced) return

    const container = containerRef.current

    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    container.appendChild(renderer.domElement)

    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h)
      uniforms.resolution.value.set(
        renderer.domElement.width,
        renderer.domElement.height,
      )
    }

    onResize()
    window.addEventListener('resize', onResize)

    let animationId = 0
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      uniforms.time.value += 0.05
      renderer.render(scene, camera)
    }

    sceneRef.current = { renderer, animationId }
    animate()

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animationId)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ background: '#F5EFE7' }}
      aria-hidden="true"
    />
  )
}
