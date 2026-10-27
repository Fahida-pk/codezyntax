/* about3d.js — real-time 3D illustrations for the About page (Three.js).
   Styled after the CodeZyntax hero artwork: indigo platform, glossy rounded objects,
   blue / violet / pink / cyan accents, floating cubes and spheres.
   Loaded lazily (dynamic import) so other pages never download it.

   Scenes (kind -> content):
     "stack" -> hero: workspace (laptop, phone, chart card, cloud, gear, pie chart)
     "cube"  -> what we do: analytics board + growth bars (marketing & products)
     "nodes" -> technology: server rack, database, cloud, gear
     "steps" -> working principles: staircase to a completed goal
     "orb"   -> closing CTA: rocket launch                                         */
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

const PALETTES = {
  light: {
    pale: 0xf3f8ff, mid: 0x8fc3ee, deep: 0x2a76cf, navy: 0x1b3f86, glow: 0x6bb6ff, ring: 0x5aa6e6, glass: 0xd9ebff,
    violet: 0x7b61e8, lilac: 0xb79cf5, pink: 0xe58bd0, cyan: 0x2fd0e8, yellow: 0xf5c76b, dark: 0x111a40, plat: 0x4050d0, platTop: 0x4f7be8,
  },
  dark: {
    pale: 0xbcd8f6, mid: 0x4a8fd6, deep: 0x2f74c8, navy: 0x1a4380, glow: 0x8cc9ff, ring: 0x7fbaf5, glass: 0x6ea6e0,
    violet: 0x8b74f0, lilac: 0x9a82e6, pink: 0xd073bd, cyan: 0x3ad6ec, yellow: 0xe8b85a, dark: 0x0b1230, plat: 0x3447b8, platTop: 0x3a63c8,
  },
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

/* rounded rectangle path for 2D canvas textures */
function rr(g, x, y, w, h, r) {
  g.beginPath()
  g.moveTo(x + r, y)
  g.arcTo(x + w, y, x + w, y + h, r)
  g.arcTo(x + w, y + h, x, y + h, r)
  g.arcTo(x, y + h, x, y, r)
  g.arcTo(x, y, x + w, y, r)
  g.closePath()
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
  const textures = []
  const basics = []

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
    map: radialTexture([[0, 'rgba(18,40,110,0.42)'], [1, 'rgba(18,40,110,0)']]),
    transparent: true, depthWrite: false,
  })

  /* ---------- canvas textures (screens & icons, same in light / dark) ---------- */
  const canvasTex = (w, h, draw) => {
    const c = document.createElement('canvas')
    c.width = w
    c.height = h
    draw(c.getContext('2d'), w, h)
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 4
    textures.push(t)
    return t
  }
  const panel = (w, h, tex, transparent = false) => {
    const m = new THREE.MeshBasicMaterial({ map: tex, toneMapped: false, transparent })
    basics.push(m)
    return new THREE.Mesh(new THREE.PlaneGeometry(w, h), m)
  }

  const texScreen = () => canvasTex(512, 340, (g, w, h) => {
    g.fillStyle = '#0d1533'; g.fillRect(0, 0, w, h)
    g.fillStyle = '#16224d'; g.fillRect(0, 0, 52, h)
    ;[34, 74, 114, 154].forEach(y => { g.fillStyle = '#3b4b8f'; rr(g, 16, y, 20, 20, 6); g.fill() })
    const cols = ['#35d6e8', '#f5c76b', '#b79cf5', '#ee8fd6', '#35d6e8', '#8fa6ff']
    ;[[0, 90], [1, 140], [2, 70], [3, 120], [0, 160], [4, 100], [5, 130], [2, 90], [3, 60]].forEach(([c, len], i) => {
      g.fillStyle = cols[c]
      rr(g, 76 + (i % 3 === 1 ? 20 : 0), 34 + i * 30, len, 10, 5)
      g.fill()
    })
    g.fillStyle = '#141f45'; rr(g, 262, 24, 230, 150, 12); g.fill()
    g.strokeStyle = '#5fe0f0'; g.lineWidth = 4; g.lineJoin = 'round'
    g.beginPath()
    ;[[280, 150], [320, 124], [350, 134], [390, 94], [430, 74], [472, 46]].forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)))
    g.stroke()
    g.fillStyle = '#141f45'; rr(g, 262, 186, 230, 130, 12); g.fill()
    ;[40, 64, 50, 84, 70, 100].forEach((bh, i) => {
      g.fillStyle = i % 2 ? '#7b61e8' : '#35d6e8'
      rr(g, 282 + i * 34, 300 - bh, 20, bh, 5)
      g.fill()
    })
  })

  const texKeys = () => canvasTex(512, 230, (g, w, h) => {
    g.fillStyle = '#18235a'; g.fillRect(0, 0, w, h)
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 12; c++) {
        g.fillStyle = '#34459a'
        rr(g, 14 + c * 41, 12 + r * 30, 35, 24, 5)
        g.fill()
      }
    }
    g.fillStyle = '#2a3a86'
    rr(g, 176, 170, 160, 50, 12)
    g.fill()
  })

  const texPhone = () => canvasTex(256, 512, (g, w, h) => {
    g.fillStyle = '#f2f7ff'; g.fillRect(0, 0, w, h)
    g.fillStyle = '#5aa6e6'; g.beginPath(); g.arc(44, 52, 16, 0, 7); g.fill()
    g.fillStyle = '#c9dcf3'; rr(g, 72, 44, 120, 14, 7); g.fill()
    for (let i = 0; i < 3; i++) {
      const y = 100 + i * 96
      g.fillStyle = '#ffffff'; g.strokeStyle = '#d6e4f6'; g.lineWidth = 2
      rr(g, 20, y, 216, 76, 16); g.fill(); g.stroke()
      g.fillStyle = '#4f8fe0'; g.beginPath(); g.arc(52, y + 38, 12, 0, 7); g.fill()
      g.fillStyle = '#4f8fe0'; rr(g, 76, y + 26, 100, 10, 5); g.fill()
      g.fillStyle = '#d3e2f5'; rr(g, 76, y + 46, 70, 8, 4); g.fill()
    }
    const gr = g.createLinearGradient(20, 0, 236, 0)
    gr.addColorStop(0, '#2f7fd6'); gr.addColorStop(1, '#35d6e8')
    g.fillStyle = gr; rr(g, 20, 400, 216, 52, 26); g.fill()
  })

  const texLine = () => canvasTex(512, 320, (g, w, h) => {
    g.fillStyle = '#0e1736'; g.fillRect(0, 0, w, h)
    g.strokeStyle = 'rgba(120,150,255,0.18)'; g.lineWidth = 2
    for (let i = 1; i < 5; i++) { g.beginPath(); g.moveTo(24, i * 60); g.lineTo(w - 24, i * 60); g.stroke() }
    const pts = [[30, 250], [110, 210], [190, 225], [270, 150], [350, 120], [430, 60], [482, 40]]
    const gr = g.createLinearGradient(0, 40, 0, 290)
    gr.addColorStop(0, 'rgba(53,214,232,0.5)'); gr.addColorStop(1, 'rgba(53,214,232,0)')
    g.fillStyle = gr
    g.beginPath(); g.moveTo(30, 290)
    pts.forEach(([x, y]) => g.lineTo(x, y))
    g.lineTo(482, 290); g.closePath(); g.fill()
    g.strokeStyle = '#5fe0f0'; g.lineWidth = 6; g.lineJoin = 'round'; g.lineCap = 'round'
    g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.stroke()
    g.fillStyle = '#ffffff'
    pts.forEach(([x, y]) => { g.beginPath(); g.arc(x, y, 7, 0, 7); g.fill() })
  })

  const texBrowser = () => canvasTex(512, 340, (g, w, h) => {
    g.fillStyle = '#f4f8ff'; g.fillRect(0, 0, w, h)
    g.fillStyle = '#e1eaf8'; g.fillRect(0, 0, w, 44)
    ;['#ee8fd6', '#f5c76b', '#35d6e8'].forEach((c, i) => { g.fillStyle = c; g.beginPath(); g.arc(24 + i * 22, 22, 6, 0, 7); g.fill() })
    g.fillStyle = '#ffffff'; rr(g, 120, 11, 280, 22, 11); g.fill()
    const gr = g.createLinearGradient(28, 0, 484, 0)
    gr.addColorStop(0, '#2f7fd6'); gr.addColorStop(1, '#7b61e8')
    g.fillStyle = gr; rr(g, 28, 62, 456, 116, 16); g.fill()
    g.fillStyle = 'rgba(255,255,255,0.9)'; rr(g, 52, 88, 190, 14, 7); g.fill()
    g.fillStyle = 'rgba(255,255,255,0.6)'; rr(g, 52, 114, 130, 10, 5); g.fill()
    g.fillStyle = '#35d6e8'; rr(g, 52, 140, 78, 24, 12); g.fill()
    for (let i = 0; i < 3; i++) {
      g.fillStyle = '#ffffff'; g.strokeStyle = '#d6e4f6'; g.lineWidth = 2
      rr(g, 28 + i * 156, 198, 144, 112, 14); g.fill(); g.stroke()
      g.fillStyle = ['#7b61e8', '#35d6e8', '#ee8fd6'][i]; g.beginPath(); g.arc(54 + i * 156, 226, 12, 0, 7); g.fill()
      g.fillStyle = '#4f8fe0'; rr(g, 44 + i * 156, 254, 90, 9, 4); g.fill()
      g.fillStyle = '#d3e2f5'; rr(g, 44 + i * 156, 274, 64, 8, 4); g.fill()
    }
  })

  const texIcon = (type) => canvasTex(256, 256, (g) => {
    g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = '#fff'; g.fillStyle = '#fff'
    if (type === 'code') {
      g.lineWidth = 22
      g.beginPath()
      g.moveTo(98, 84); g.lineTo(50, 128); g.lineTo(98, 172)
      g.moveTo(158, 84); g.lineTo(206, 128); g.lineTo(158, 172)
      g.moveTo(140, 70); g.lineTo(116, 186)
      g.stroke()
    } else if (type === 'gear') {
      g.lineWidth = 26
      g.beginPath(); g.arc(128, 128, 38, 0, 7); g.stroke()
      g.lineWidth = 24
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4
        g.beginPath()
        g.moveTo(128 + Math.cos(a) * 62, 128 + Math.sin(a) * 62)
        g.lineTo(128 + Math.cos(a) * 84, 128 + Math.sin(a) * 84)
        g.stroke()
      }
    } else {
      g.lineWidth = 28
      g.beginPath(); g.moveTo(62, 134); g.lineTo(110, 180); g.lineTo(196, 84); g.stroke()
    }
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

  /* ---------- object library ---------- */
  const rbox = (w, h, d, role, r = 0.1, opts = {}) =>
    new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 4, r), mat(role, opts))
  const ball = (r, role) => new THREE.Mesh(new THREE.SphereGeometry(r, 32, 32), mat(role))

  const pulses = []
  const glowBall = (r, role = 'glow') => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 32, 32), mat(role, { emissive: true, clearcoat: 0 }))
    const s = new THREE.Sprite(spriteMat(role, 0.6))
    s.scale.setScalar(r * 8)
    m.add(s)
    pulses.push({ s, base: r * 8, ph: Math.random() * 6 })
    return m
  }

  const platform = (w, d) => {
    const g = new THREE.Group()
    const slab = rbox(w, 0.4, d, 'plat', 0.2)
    slab.position.y = -0.2
    const top = rbox(w - 0.5, 0.06, d - 0.5, 'platTop', 0.03, { clearcoat: 0.25 })
    top.position.y = 0.03
    g.add(slab, top)
    return g
  }

  const badge = (role, icon, size = 1.1) => {
    const g = new THREE.Group()
    g.add(rbox(size, size, size * 0.3, role, size * 0.28))
    const ic = panel(size * 0.72, size * 0.72, texIcon(icon), true)
    ic.position.z = size * 0.15 + 0.006
    g.add(ic)
    return g
  }

  const makeLaptop = () => {
    const g = new THREE.Group()
    const base = rbox(3.3, 0.14, 2.2, 'dark', 0.06)
    base.position.y = 0.07
    const kb = panel(2.9, 1.35, texKeys())
    kb.rotation.x = -Math.PI / 2
    kb.position.set(0, 0.145, 0.18)
    const hinge = new THREE.Group()
    hinge.position.set(0, 0.14, -1.05)
    hinge.rotation.x = -0.32
    const lid = rbox(3.3, 2.2, 0.1, 'dark', 0.05)
    lid.position.y = 1.1
    const scr = panel(3.0, 1.95, texScreen())
    scr.position.set(0, 1.1, 0.056)
    hinge.add(lid, scr)
    g.add(base, kb, hinge)
    return g
  }

  const makePhone = () => {
    const g = new THREE.Group()
    g.add(rbox(1.05, 2.1, 0.16, 'dark', 0.08))
    const s = panel(0.93, 1.95, texPhone())
    s.position.z = 0.085
    g.add(s)
    return g
  }

  const makeBrowser = () => {
    const g = new THREE.Group()
    const frame = rbox(2.6, 1.75, 0.12, 'dark', 0.06)
    frame.position.y = 1.0
    const scr = panel(2.4, 1.55, texBrowser())
    scr.position.set(0, 1.0, 0.066)
    const stand = rbox(0.8, 0.12, 0.5, 'dark', 0.05)
    stand.position.y = 0.06
    const neck = rbox(0.18, 0.4, 0.1, 'dark', 0.04)
    neck.position.y = 0.2
    g.add(frame, scr, stand, neck)
    return g
  }

  const makeChartCard = () => {
    const g = new THREE.Group()
    const card = rbox(1.9, 1.4, 0.1, 'glass', 0.05, { transparent: true, opacity: 0.55, roughness: 0.1, depthWrite: false })
    card.renderOrder = 2
    g.add(card)
    ;[[-0.5, 0.35, 'pink'], [0, 0.58, 'violet'], [0.5, 0.82, 'cyan']].forEach(([x, h, role]) => {
      const b = rbox(0.3, h, 0.12, role, 0.05)
      b.position.set(x, -0.55 + h / 2, 0.1)
      g.add(b)
    })
    ;[[0.7, -0.62], [0.45, -0.5]].forEach(([w, x], i) => {
      const l = rbox(w, 0.06, 0.04, 'pale', 0.02, { clearcoat: 0 })
      l.position.set(x, 0.5 - i * 0.14, 0.09)
      g.add(l)
    })
    return g
  }

  const makeCloud = () => {
    const g = new THREE.Group()
    const m = mat('pale', { clearcoat: 0.6 })
    ;[[-0.5, 0.12, 0.38], [0.02, 0.3, 0.55], [0.52, 0.1, 0.36]].forEach(([x, y, r]) => {
      const s = new THREE.Mesh(new THREE.SphereGeometry(r, 32, 32), m)
      s.position.set(x, y, 0)
      g.add(s)
    })
    const base = rbox(1.7, 0.42, 0.8, 'pale', 0.2, { clearcoat: 0.6 })
    base.position.set(0, -0.08, 0)
    g.add(base)
    return g
  }

  const makePie = (radius = 0.85) => {
    const g = new THREE.Group()
    ;[[0, 2.2, 'violet'], [2.2, 1.9, 'pink'], [4.1, Math.PI * 2 - 4.1, 'cyan']].forEach(([s, l, role]) => {
      g.add(new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, 0.22, 40, 1, false, s, l), mat(role)))
    })
    return g
  }

  const makeRack = () => {
    const g = new THREE.Group()
    for (let i = 0; i < 4; i++) {
      const u = rbox(2.2, 0.5, 1.4, i % 2 ? 'navy' : 'deep', 0.12)
      u.position.y = 0.3 + i * 0.62
      const led = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16), mat(i % 2 ? 'glow' : 'cyan', { emissive: true, clearcoat: 0 }))
      led.rotation.x = Math.PI / 2
      led.position.set(0.85, 0, 0.71)
      const line = rbox(0.9, 0.06, 0.03, 'pale', 0.015, { clearcoat: 0 })
      line.position.set(-0.45, 0, 0.71)
      const line2 = rbox(0.5, 0.06, 0.03, 'lilac', 0.015, { clearcoat: 0 })
      line2.position.set(-0.7, -0.12, 0.71)
      u.add(led, line, line2)
      g.add(u)
    }
    return g
  }

  const makeRocket = () => {
    const g = new THREE.Group()
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.4, 40), mat('pale'))
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.0, 40), mat('violet'))
    nose.position.y = 1.2
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.14, 40), mat('violet'))
    collar.position.y = -0.64
    const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 0.26, 32), mat('navy'))
    nozzle.position.y = -0.84
    const win = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 24), mat('glow', { emissive: true, clearcoat: 0 }))
    win.scale.z = 0.5
    win.position.set(0, 0.25, 0.47)
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.05, 12, 40), mat('navy'))
    rim.position.set(0, 0.25, 0.47)
    g.add(body, nose, collar, nozzle, win, rim)
    for (let i = 0; i < 3; i++) {
      const a = (i * Math.PI * 2) / 3
      const fin = rbox(0.6, 0.75, 0.1, 'violet', 0.04)
      fin.position.set(Math.cos(a) * 0.62, -0.38, Math.sin(a) * 0.62)
      fin.rotation.y = -a
      g.add(fin)
    }
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.28, 1.0, 24), mat('yellow', { emissive: true, clearcoat: 0 }))
    flame.rotation.x = Math.PI
    flame.position.y = -1.45
    const inner = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.6, 24), mat('pale', { emissive: true, clearcoat: 0 }))
    inner.rotation.x = Math.PI
    inner.position.y = -1.25
    const halo = new THREE.Sprite(spriteMat('yellow', 0.7))
    halo.scale.setScalar(2.4)
    halo.position.y = -1.4
    pulses.push({ s: halo, base: 2.4, ph: 0 })
    g.add(flame, inner, halo)
    return g
  }

  /* ---------- animation registries ---------- */
  const floaters = []
  const floatObj = (o, speed = 0.9, mode = 'bob', amp = 0.12) => {
    floaters.push({ o, y: o.position.y, r0: o.rotation.y, ph: Math.random() * 6, sp: speed, mode, amp })
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

  const root = new THREE.Group()
  scene.add(root)
  let camDist = 16
  let camDir = new THREE.Vector3(5.5, 6, 8.5).normalize()
  let look = new THREE.Vector3(0, 1.3, 0)
  let shadowY = -0.6
  let shadowSize = 10

  const put = (o, x, y, z, ry = 0) => { o.position.set(x, y, z); o.rotation.y = ry; root.add(o); return o }
  const F = 0.06 /* platform surface height */

  /* ================= HERO: workspace ================= */
  if (kind === 'stack') {
    camDist = 18
    camDir = new THREE.Vector3(5.5, 6, 8.5).normalize()
    look = new THREE.Vector3(0, 1.6, 0)
    shadowY = -0.62
    shadowSize = 9.6
    root.add(platform(7.4, 5.6))
    put(makeLaptop(), -0.9, F, 0.4, 0.25)
    put(makePhone(), 2.35, F + 1.05, 0.5, -0.35)
    put(makePie(), 2.4, F + 0.11, 2.0, 0.4)
    put(new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.8, 32), mat('violet')), 3.1, F + 0.4, -1.3)
    put(new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.5, 32), mat('cyan')), 3.45, F + 0.25, -0.8)

    const code = put(badge('deep', 'code', 1.15), -2.6, 2.7, 0.2, 0.35)
    const cube = put(rbox(1.0, 1.0, 1.0, 'violet', 0.16), 0.3, 4.1, -1.0, 0.6)
    cube.rotation.x = 0.35
    const sphere = put(ball(0.3, 'deep'), 1.4, 3.1, -0.3)
    const chart = put(makeChartCard(), 3.1, 3.3, -0.4, -0.5)
    const pinkCube = put(rbox(0.55, 0.55, 0.55, 'pink', 0.1), 3.8, 1.7, 0.6, 0.5)
    pinkCube.rotation.x = 0.4
    const cloud = put(makeCloud(), -3.3, 0.9, 1.6, 0.3)
    const gear = put(badge('violet', 'gear', 0.8), -1.7, 0.7, 2.3, 0.2)
    const orb = put(ball(0.2, 'lilac'), -3.0, 0.5, 2.6)
    ;[[code, 0.8, 'sway'], [cube, 0.7, 'spin'], [sphere, 1.1, 'bob'], [chart, 0.8, 'sway'], [pinkCube, 0.9, 'spin'], [cloud, 0.7, 'bob'], [gear, 1.0, 'bob'], [orb, 1.2, 'bob']]
      .forEach(([o, s, m]) => floatObj(o, s, m, m === 'spin' ? 0.14 : 0.1))

  /* ================= WHAT WE DO: analytics & growth ================= */
  } else if (kind === 'cube') {
    camDist = 14.5
    camDir = new THREE.Vector3(4, 5, 9).normalize()
    look = new THREE.Vector3(0, 1.2, 0)
    shadowY = -0.5
    shadowSize = 6.6
    root.add(platform(5.6, 3.8))
    const board = new THREE.Group()
    board.add(rbox(3.4, 2.3, 0.14, 'dark', 0.07))
    const bp = panel(3.1, 1.95, texLine())
    bp.position.z = 0.075
    board.add(bp)
    put(board, 0, F + 1.3, -1.0, -0.12)
    ;[[-1.7, 0.6, 'pale'], [-0.95, 1.0, 'mid'], [-0.2, 1.5, 'deep'], [0.55, 2.0, 'violet']].forEach(([x, h, role]) => {
      put(rbox(0.55, h, 0.55, role, 0.1), x, F + h / 2, 0.8)
    })
    put(makePie(0.6), 2.0, F + 0.11, 0.8, 0.5)
    const g1 = put(glowBall(0.22), 0.55, 2.75, 0.8)
    const c1 = put(rbox(0.5, 0.5, 0.5, 'pink', 0.1), 2.3, 2.6, -0.6, 0.4)
    const c2 = put(rbox(0.36, 0.36, 0.36, 'cyan', 0.08), -2.3, 2.9, 0.3, 0.2)
    const s1 = put(ball(0.2, 'lilac'), -2.4, 0.5, 1.4)
    floatObj(g1, 1.2); floatObj(c1, 0.9, 'spin', 0.14); floatObj(c2, 0.8, 'spin', 0.14); floatObj(s1, 1.1)

  /* ================= TECHNOLOGY: modern tools showcase =================
     browser (Frontend) · server rack (Backend & APIs) · phone (Mobile apps) · cloud + database (Cloud & Data) */
  } else if (kind === 'nodes') {
    camDist = 16.8
    camDir = new THREE.Vector3(5, 6, 9).normalize()
    look = new THREE.Vector3(0, 1.5, 0)
    shadowY = -0.62
    shadowSize = 8.6
    root.add(platform(7.4, 5.2))
    put(makeBrowser(), -1.7, F, -1.15, 0.28)
    const rack = put(makeRack(), 1.2, F, -0.9, -0.2)
    rack.scale.setScalar(0.85)
    const phone = put(makePhone(), -2.5, F + 1.0, 1.2, 0.55)
    phone.scale.setScalar(0.85)
    ;[['deep', 0.17], ['mid', 0.55], ['pale', 0.93]].forEach(([role, y]) => {
      put(new THREE.Mesh(new THREE.CylinderGeometry(0.66, 0.66, 0.34, 40), mat(role)), 2.4, F + y, 1.15)
    })
    put(makePie(0.6), -0.4, F + 0.11, 1.7, 0.4)

    const cloud = put(makeCloud(), 2.5, 3.1, 0.7, 0.2)
    const code = put(badge('deep', 'code', 1.0), -3.2, 3.2, -0.2, 0.35)
    const gear = put(badge('violet', 'gear', 0.85), 0.6, 0.75, 2.3, 0.2)
    const cube = put(rbox(0.8, 0.8, 0.8, 'violet', 0.14), 0.0, 3.9, -1.4, 0.6)
    cube.rotation.x = 0.35
    const c1 = put(rbox(0.5, 0.5, 0.5, 'pink', 0.1), 3.5, 1.8, -0.6, 0.5)
    const c2 = put(rbox(0.36, 0.36, 0.36, 'cyan', 0.08), -3.5, 1.2, 1.9, 0.2)
    const g1 = put(glowBall(0.2), 1.0, 3.2, -0.2)
    const s1 = put(ball(0.26, 'deep'), -1.2, 3.6, 0.6)
    ;[[cloud, 0.8, 'bob'], [code, 0.8, 'sway'], [gear, 1.0, 'bob'], [cube, 0.7, 'spin'], [c1, 0.9, 'spin'], [c2, 1.0, 'spin'], [g1, 1.2, 'bob'], [s1, 1.1, 'bob']]
      .forEach(([o, sp, m]) => floatObj(o, sp, m, m === 'spin' ? 0.14 : 0.1))

  /* ================= WORKING PRINCIPLES: staircase to a goal ================= */
  } else if (kind === 'steps') {
    camDist = 14
    camDir = new THREE.Vector3(8, 5.5, 8.4).normalize()
    look = new THREE.Vector3(0, 0.4, 0)
    shadowY = -2.3
    shadowSize = 8.5
    ;['pale', 'mid', 'deep', 'violet'].forEach((role, i) => {
      const h = 0.6 + i * 0.7
      const m = rbox(1.2, h, 1.6, role, 0.14)
      m.position.set(-2.1 + i * 1.4, -1.6 + h / 2, 0)
      root.add(m)
      layers.push({ m, y: m.position.y, ph: i * 1.1 })
    })
    const goal = put(badge('cyan', 'check', 1.0), 2.1, 2.2, 0, 0.5)
    const g1 = put(glowBall(0.16), -2.6, 1.9, 1.0)
    const c1 = put(rbox(0.36, 0.36, 0.36, 'pink', 0.08), 3.2, -0.6, 1.5, 0.3)
    const c2 = put(rbox(0.28, 0.28, 0.28, 'lilac', 0.06), -2.8, 0.4, -1.2, 0.3)
    addRing(root, 3.4, [0.2, -0.15], 0.28, 2)
    floatObj(goal, 1.0, 'sway'); floatObj(g1, 1.2); floatObj(c1, 0.9, 'spin', 0.14); floatObj(c2, 1.0, 'spin', 0.14)

  /* ================= CLOSING CTA: rocket launch ================= */
  } else {
    camDist = 13
    camDir = new THREE.Vector3(0, 0.12, 1).normalize()
    look = new THREE.Vector3(0, 0, 0)
    shadowY = -3.3
    shadowSize = 8
    const rocket = put(makeRocket(), 0.2, 0.2, 0)
    rocket.rotation.z = -0.55
    rocket.rotation.x = 0.15
    const cloud = put(makeCloud(), -1.9, -1.9, 0.4, 0.3)
    cloud.scale.setScalar(0.65)
    const c1 = put(rbox(0.4, 0.4, 0.4, 'pink', 0.09), 2.0, 1.9, -0.6, 0.4)
    const c2 = put(rbox(0.3, 0.3, 0.3, 'cyan', 0.07), -2.1, 1.6, 0.3, 0.2)
    const g1 = put(glowBall(0.13), 2.3, -1.2, 0.4)
    addRing(root, 2.8, [1.2, 0.1], 0.3, 2)
    addRing(root, 3.3, [0.5, 0.65], -0.22, 1)
    floatObj(rocket, 0.9, 'bob', 0.15); floatObj(cloud, 0.8); floatObj(c1, 0.9, 'spin', 0.14); floatObj(c2, 0.9, 'spin', 0.14); floatObj(g1, 1.2)
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
    layers.forEach(l => { l.m.position.y = l.y + Math.sin(t * 0.9 + l.ph) * 0.09 })
    pulses.forEach(p => p.s.scale.setScalar(p.base + Math.sin(t * 1.6 + p.ph) * p.base * 0.07))
    rings.forEach(r => { r.spin.rotation.y = t * r.speed })
    floaters.forEach(f => {
      f.o.position.y = f.y + Math.sin(t * f.sp + f.ph) * f.amp
      if (f.mode === 'spin') {
        f.o.rotation.x = t * 0.4 * f.sp
        f.o.rotation.y = t * 0.55 * f.sp
      } else if (f.mode === 'sway') {
        f.o.rotation.y = f.r0 + Math.sin(t * 0.6 + f.ph) * 0.2
      }
    })
    root.rotation.y = Math.sin(t * 0.25) * 0.2 + px * 0.35
    root.rotation.x = py * 0.08
    shadow.scale.setScalar(shadowSize * (1 + Math.sin(t * 0.9) * 0.03))
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
    scene.traverse(o => { if (o.geometry) o.geometry.dispose() })
    registry.forEach(m => m.dispose())
    basics.forEach(m => m.dispose())
    textures.forEach(t => t.dispose())
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