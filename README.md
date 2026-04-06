# Interactive Avatar

A mouse-tracking avatar face built with SVG, Framer Motion, and animated mesh gradients. Move your cursor and watch it follow.

## What It Does

The avatar is a rounded square with two expressive eyes rendered in SVG. A custom `useMousePosition` hook feeds cursor coordinates into a dampened spring system, so the pupils track your mouse with soft, weighted motion instead of snapping to position. The eyes blink on a randomized 2--6 second interval for a natural idle rhythm, and squint shut on hover.

Behind the face, a mesh gradient simulates depth using layered animated blobs with `mix-blend-screen` compositing. The whole avatar floats on a gentle vertical oscillation with a blurred shadow that breathes in sync.

## Quick Start

```bash
git clone https://github.com/localwolfpackai/interactive-avatar-v1.git
cd interactive-avatar-v1
npm install
npm run dev
```

Open `http://localhost:5173` and move your mouse around.

## Stack

- **React 19** + TypeScript
- **Framer Motion** -- spring physics for eye tracking, blob animation
- **SVG** -- clip paths, ellipses, gloss overlays
- **Vite 8** -- dev server and build

## Structure

```
components/InteractiveAvatar.tsx   The face, eyes, blink logic
components/MeshGradient.tsx        Animated blob gradient background
hooks/useMousePosition.ts          Cursor coordinate hook
types.ts                           Shared types and color palette
```

---

Built by [Lupo Studios](https://github.com/localwolfpackai)
