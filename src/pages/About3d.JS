/* about3d.js — lightweight Three.js scenes for the About page.
   Loaded lazily (dynamic import) so other pages never download it.
   Scenes: "stack" (hero), "cube" (what we do), "orb" (closing CTA). */
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

const PALETTES = {
  light: { pale: 0xf3f8ff, mid: 0x8fc3ee, deep: 0x2a76cf, navy: 0x163f7a, glow: 0x6bb6ff, ring: 0x5aa6e6, glass: 0xd9ebff },
  dark: { pale: 0xbcd8f6, mid: 0x4a8fd6, deep: 0x2f74c8, navy: 0x1a4380, glow: 0x8cc9ff, ring: 0x7fbaf5, glass: 0x6ea6e0 },
}

function radialTexture(stops) {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')
  const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  stops.forEach(([o, col]) => gr.addColorStop(o, col))
  g.fillStyle = gr
  g.fillRect(0, 0, 128, 128)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

export function mountScene(host, kind) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let renderer
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
  } catch (e) {
    return () => {}
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%'
  host.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const pmrem = new THREE.PMREMGenerator(renderer)
  const envTex = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture
  scene.environment = envTex

  const key = new THREE.DirectionalLight(0xffffff, 1.6)
  key.position.set(4, 8, 5)
  scene.add(key, new THREE.AmbientLight(0xffffff, 0.35))

  /* ---------- materials (re-coloured on theme change) ---------- */
  const registry = []
  const sprites = []
  const mat = (role, opts = {}) => {
    const { emissive, ...rest } = opts
    const m = new THREE.MeshPhysicalMaterial({
      roughness: 0.3, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.15, ...rest,
    })
    m.userData = { role, emissive: !!emissive }
    registry.push(m)
    return m
  }
  const spriteMat = (role, opacity) => {
    const m = new THREE.SpriteMaterial({
      map: radialTexture([[0, 'rgba(255,255,255,1)'], [0.35, 'rgba(255,255,255,0.35)'], [1, 'rgba(255,255,255,0)']]),
      blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity,
    })
    m.userData = { role }
    sprites.push(m)
    return m
  }
  const shadowMat = new THREE.MeshBasicMaterial({
    map: radialTexture([[0, 'rgba(18,56,110,0.42)'], [1, 'rgba(18,56,110,0)']]),
    transparent: true, depthWrite: false,
  })

  const applyTheme = () => {
    const dark = !!host.closest('.dark') || document.documentElement.classList.contains('dark')
    const p = dark ? PALETTES.dark : PALETTES.light
    registry.forEach(m => {
      m.color.set(p[m.userData.role])
      if (m.userData.emissive) m.emissive.set(p[m.userData.role])
    })
    sprites.forEach(m => m.color.set(p[m.userData.role]))
    shadowMat.opacity = dark ? 0.7 : 1
    envTex && (scene.environmentIntensity = dark ? 0.65 : 1)
    key.intensity = dark ? 1.1 : 1.6
  }

  /* ---------- builders ---------- */
  const floaters = []
  const addFloater = (parent, size, role, x, y, z, speed) => {
    const m = new THREE.Mesh(new RoundedBoxGeometry(size, size, size, 4, size * 0.28), mat(role))
    m.position.set(x, y, z)
    parent.add(m)
    floaters.push({ m, y, ph: Math.random() * 6, sp: speed })
  }

  const rings = []
  const addRing = (parent, radius, tilt, speed, sats) => {
    const pivot = new THREE.Group()
    pivot.rotation.set(tilt[0], 0, tilt[1])
    const spin = new THREE.Group()
    const torus = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.016, 8, 160), mat('ring', { clearcoat: 0, roughness: 0.4, transparent: true, opacity: 0.85 }))
    torus.rotation.x = Math.PI / 2
    spin.add(torus)
    for (let i = 0; i < sats; i++) {
      const a = (i / sats) * Math.PI * 2
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.1, 20, 20), mat('glow', { emissive: true, clearcoat: 0 }))
      s.position.set(Math.cos(a) * radius, 0, Math.sin(a) * radius)
      spin.add(s)
    }
    pivot.add(spin)
    parent.add(pivot)
    rings.push({ spin, speed })
  }

  const layers = []
  let core, haloSprite, coreBall

  const root = new THREE.Group()
  scene.add(root)
  let camDist = 16
  let camDir = new THREE.Vector3(8, 6.2, 8.4).normalize()
  let look = new THREE.Vector3(0, 0.3, 0)
  let shadowY = -1.9
  let shadowSize = 9

  if (kind === 'stack') {
    const defs = [[4.4, 'pale', -0.95], [3.5, 'mid', 0], [2.6, 'deep', 0.95]]
    defs.forEach(([w, role, y], i) => {
      const m = new THREE.Mesh(new RoundedBoxGeometry(w, 0.5, w, 5, 0.14), mat(role))
      m.position.y = y
      root.add(m)
      layers.push({ m, y, ph: i * 1.7 })
    })
    const top = layers[2].m
    const mid = layers[1].m
    const bottom = layers[0].m
    /* "UI lines" on the top slab */
    const lineMat = mat('pale', { clearcoat: 0, roughness: 0.5 })
    ;[[1.3, -0.62], [0.9, -0.28], [1.5, 0.06]].forEach(([w, z]) => {
      const l = new THREE.Mesh(new RoundedBoxGeometry(w, 0.06, 0.16, 3, 0.025), lineMat)
      l.position.set(-1.0 + w / 2, 0.28, z)
      top.add(l)
    })
    const dot = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.06, 32), mat('glow', { emissive: true, clearcoat: 0 }))
    dot.position.set(0.85, 0.28, 0.6)
    top.add(dot)
    /* small chips on the lower slabs */
    ;[[1.4, 1.4, 'deep'], [-1.4, 1.4, 'navy'], [1.4, -1.4, 'glow']].forEach(([x, z, role]) => {
      const c = new THREE.Mesh(new RoundedBoxGeometry(0.34, 0.24, 0.34, 3, 0.07), mat(role, role === 'glow' ? { emissive: true } : {}))
      c.position.set(x, 0.37, z)
      mid.add(c)
    })
    ;[[1.85, 1.85], [-1.85, -1.85]].forEach(([x, z]) => {
      const c = new THREE.Mesh(new RoundedBoxGeometry(0.3, 0.22, 0.3, 3, 0.06), mat('deep'))
      c.position.set(x, 0.36, z)
      bottom.add(c)
    })
    /* glowing core above the stack */
    coreBall = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), mat('glow', { emissive: true, clearcoat: 0 }))
    coreBall.position.y = 2.4
    haloSprite = new THREE.Sprite(spriteMat('glow', 0.7))
    haloSprite.scale.setScalar(2.4)
    coreBall.add(haloSprite)
    root.add(coreBall)
    addRing(root, 3.15, [0.16, -0.1], 0.3, 2)
    addFloater(root, 0.34, 'deep', -2.9, 1.5, 1.3, 0.8)
    addFloater(root, 0.26, 'mid', 3.0, -0.4, -1.9, 1.0)
    addFloater(root, 0.2, 'pale', 2.3, 2.1, 1.7, 0.7)
    addFloater(root, 0.22, 'navy', -2.4, -1.2, -2.2, 0.9)
  } else {
    camDist = 13
    camDir = new THREE.Vector3(0, 0.12, 1).normalize()
    look = new THREE.Vector3(0, 0, 0)
    shadowY = -3.3
    shadowSize = 8
    core = new THREE.Group()
    if (kind === 'cube') {
      const outer = new THREE.Mesh(
        new RoundedBoxGeometry(2.1, 2.1, 2.1, 6, 0.34),
        mat('glass', { transparent: true, opacity: 0.42, roughness: 0.08, depthWrite: false, envMapIntensity: 1.4 }),
      )
      outer.renderOrder = 2
      const inner = new THREE.Mesh(new RoundedBoxGeometry(1.15, 1.15, 1.15, 5, 0.2), mat('deep'))
      const gem = new THREE.Mesh(new THREE.IcosahedronGeometry(0.3, 1), mat('glow', { emissive: true, clearcoat: 0 }))
      core.add(inner, gem, outer)
    } else {
      core.add(new THREE.Mesh(new THREE.SphereGeometry(1.25, 64, 64), mat('deep')))
      const band = new THREE.Mesh(new THREE.TorusGeometry(1.27, 0.035, 16, 100), mat('pale'))
      band.rotation.x = Math.PI / 2.4
      core.add(band)
    }
    root.add(core)
    addRing(root, 2.3, [1.2, 0.1], 0.35, 2)
    addRing(root, 2.8, [0.5, 0.65], -0.25, 2)
    addRing(root, 3.3, [-0.3, -0.5], 0.18, 1)
  }

  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), shadowMat)
  shadow.rotation.x = -Math.PI / 2
  shadow.position.y = shadowY
  shadow.scale.setScalar(shadowSize)
  scene.add(shadow)

  const camera = new THREE.PerspectiveCamera(kind === 'stack' ? 28 : 30, 1, 0.1, 100)

  /* ---------- per-frame update ---------- */
  let px = 0, py = 0, tx = 0, ty = 0
  const update = (t) => {
    layers.forEach(l => {
      l.m.position.y = l.y + Math.sin(t * 0.9 + l.ph) * 0.09
    })
    if (coreBall) {
      coreBall.position.y = 2.4 + Math.sin(t * 1.2) * 0.1
      haloSprite.scale.setScalar(2.4 + Math.sin(t * 1.6) * 0.18)
    }
    if (core) {
      core.rotation.y = t * 0.35
      core.rotation.x = Math.sin(t * 0.5) * 0.25
      core.position.y = Math.sin(t * 0.9) * 0.1
    }
    rings.forEach(r => { r.spin.rotation.y = t * r.speed })
    floaters.forEach(f => {
      f.m.position.y = f.y + Math.sin(t * f.sp + f.ph) * 0.14
      f.m.rotation.x = t * 0.4 * f.sp
      f.m.rotation.y = t * 0.55 * f.sp
    })
    root.rotation.y = Math.sin(t * 0.25) * 0.2 + px * 0.35
    root.rotation.x = py * 0.08
    const s = 1 + Math.sin(t * 0.9) * 0.03
    shadow.scale.setScalar(shadowSize * s)
  }

  const draw = (t) => {
    update(t)
    renderer.render(scene, camera)
  }

  /* ---------- sizing ---------- */
  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    const k = camera.aspect < 1 ? (1 / camera.aspect) * 0.95 : 1
    camera.position.copy(camDir).multiplyScalar(camDist * k).add(look)
    camera.lookAt(look)
    camera.updateProjectionMatrix()
    draw(performance.now() / 1000)
  }

  /* ---------- loop (paused when off-screen or tab hidden) ---------- */
  let raf = 0, visible = true
  const t0 = performance.now()
  const frame = (now) => {
    raf = 0
    if (!visible || document.hidden) return
    px += (tx - px) * 0.06
    py += (ty - py) * 0.06
    draw((now - t0) / 1000 + 2)
    raf = requestAnimationFrame(frame)
  }
  const start = () => { if (!raf && !reduce) raf = requestAnimationFrame(frame) }

  applyTheme()
  resize()
  host.classList.add('is-ready')
  if (reduce) draw(2)
  else start()

  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start() })
    : null
  io && io.observe(host)

  const ro = new ResizeObserver(resize)
  ro.observe(host)

  const onVis = () => start()
  document.addEventListener('visibilitychange', onVis)

  const onMove = (e) => {
    if (e.pointerType === 'touch') return
    const r = host.getBoundingClientRect()
    tx = (e.clientX - r.left) / r.width - 0.5
    ty = (e.clientY - r.top) / r.height - 0.5
  }
  const onLeave = () => { tx = 0; ty = 0 }
  host.addEventListener('pointermove', onMove)
  host.addEventListener('pointerleave', onLeave)

  const mo = new MutationObserver(() => { applyTheme(); if (reduce) draw(2) })
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'], subtree: true })

  /* ---------- cleanup ---------- */
  return () => {
    cancelAnimationFrame(raf)
    raf = 0
    visible = false
    io && io.disconnect()
    ro.disconnect()
    mo.disconnect()
    document.removeEventListener('visibilitychange', onVis)
    host.removeEventListener('pointermove', onMove)
    host.removeEventListener('pointerleave', onLeave)
    scene.traverse(o => {
      if (o.geometry) o.geometry.dispose()
    })
    registry.forEach(m => m.dispose())
    sprites.forEach(m => { m.map && m.map.dispose(); m.dispose() })
    shadowMat.map.dispose()
    shadowMat.dispose()
    envTex.dispose()
    pmrem.dispose()
    renderer.dispose()
    renderer.forceContextLoss()
    renderer.domElement.remove()
  }
}