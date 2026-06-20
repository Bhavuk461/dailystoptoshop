# Animated Logo Reveal — Frame-by-Frame Description

> This document describes the `Animated_logo_reveal_video_202606120311.mp4` in precise detail so it can be replicated as a pure CSS/SVG/JS animation in `loader_prototype.html`.

## Video Specs
- **Resolution:** 1280×720
- **FPS:** 24
- **Duration:** 8.00 seconds (192 frames)
- **Background:** Solid off-white / light gray (#f5f5f0 approximately)

## Goal
Create a **~3–4 second condensed version** suitable as a loading screen, keeping all visual elements and the feel of the original.

---

## Elements in the Animation

### 1. Stick Figure (Walking Person)
- **Color:** Solid black (#1a1a1a)
- **Head:** Perfect circle, ~14% of figure height
- **Body/torso:** A thick vertical line from neck to hip. There is a thin white/off-white curved highlight line running down the torso (like a reflection), slightly left of center — this gives the flat figure some dimension
- **Arms:** Two thick lines extending from the upper torso (shoulder area). They swing in opposition to the legs (left arm forward when right leg forward, and vice versa). The arms are thick rounded-cap lines
- **Legs:** Two thick lines extending from the hip/pelvis area. They have a realistic walking gait — one leg extends forward and the other extends backward. Each leg has a small "foot" at the end — a short angled line/nub. The legs are thick with rounded caps
- **Shopping Bag:** Held in the right hand (the hand closer to the viewer's right). It is a golden/amber rectangle (#e8a308) with slightly rounded corners. It has two curved handles at the top (arcs in a darker amber/gold stroke ~#c78b06). The bag swings with the arm motion
- **Shadow:** A dark semi-transparent ellipse on the ground directly beneath the figure. It stretches and compresses slightly as the figure walks

### Walk Cycle Detail (CRITICAL — must look like real walking)
The figure walks **from left to right** facing right. The walk cycle is a smooth, natural stride:

- **Pose A (Contact — left foot forward):** Left leg extended forward (angled ~30° forward from vertical), right leg extended backward (angled ~30° backward). Left arm is swung backward, right arm (with bag) is swung forward. The body has a very slight forward lean (~5°)
- **Pose B (Passing — legs together):** Both legs are approximately vertical/together, one passing the other. Arms are roughly along the body
- **Pose C (Contact — right foot forward):** Right leg extended forward, left leg extended backward. Right arm (with bag) swung backward, left arm swung forward. Mirror of Pose A
- **Pose D (Passing — legs together):** Same as Pose B but legs crossing the other direction

The cycle A→B→C→D repeats smoothly. Each full cycle takes approximately **0.6–0.7 seconds** (about 16 frames). The pivot point for each leg rotation is at the hip. The pivot point for each arm rotation is at the shoulder. Arms and legs swing in a pendulum motion with ease-in-out timing (not linear).

The figure's body bobs up and down very slightly (maybe 2–3px) during the walk — highest at Pose B/D (passing position), lowest at Pose A/C (contact position). This is subtle but important for realism.

### 2. Golden Sun Circle
- **Color:** Solid golden amber (#e8a308 or very close)
- **Shape:** A perfect circle, acting as the background for the skyline
- **Size:** In the final composed logo, the circle diameter is roughly 1.5× the figure's height from head to foot
- **The bottom of the circle is cropped/clipped** — the skyline silhouette sits in the lower half, and the circle doesn't extend below the skyline's base. This gives it a "sunset behind cityscape" look

### 3. City Skyline Silhouette
- **Color:** Same as background (#f5f5f0 off-white) — it's a cutout/negative space within the golden circle
- **Position:** Sits in the lower ~45% of the golden circle
- **Shape:** A NYC-style skyline with varied building heights. From left to right:
  - Several short/medium buildings on the far left
  - Buildings gradually get taller toward the center
  - A prominent tall spire in the center-right area (resembling the Empire State Building) — this is the tallest point, with a thin needle/antenna at the very top
  - Buildings taper back down to medium/short on the right side
- **Style:** Flat silhouette, no windows or details — just the outlines of buildings as a single connected shape. The bottoms of the buildings form a relatively straight baseline
- **The skyline is rendered as a negative-space mask** — the building shapes are cut out of the golden circle, revealing the background color behind them

### 4. Ground Shadow (under figure)
- **Shape:** Horizontal ellipse
- **Color:** Semi-transparent dark (rgba(0,0,0,0.15) approximately)
- **Position:** Directly beneath the figure's feet, centered under the body
- **Behavior:** It appears with the figure and stays in place as the figure walks. Very subtle

### 5. Brand Text: "dailystoptoshop"
- **Font:** A bold, rounded sans-serif (similar to Nunito Bold, Poppins Bold, or the site's display font)
- **Size:** Large — roughly 40% the width of the composed logo
- **Position:** Centered horizontally, directly below the sun circle + figure composite
- **Color breakdown:**
  - "daily" — black/dark (#1a1a1a)
  - "stop" — golden amber (#e8a308) — same color as the sun and bag
  - "toshop" — black/dark (#1a1a1a)
- **All lowercase**, no spacing between the three words — they form one continuous word

---

## Animation Timeline (Original 8-second version)

### Phase 1: Figure Entry (0.0s – 1.5s)
- **0.0s:** White/off-white screen. The stick figure is partially visible at the far left edge of frame, already in mid-walk
- **0.0–1.5s:** The figure walks from left toward center. Walk cycle is active with legs and arms swinging. The figure moves at a steady pace across the screen. The ground shadow follows beneath
- The figure is large — roughly 40% of the frame height

### Phase 2: Sun Circle Appears (0.3s – 1.0s)
- **0.3s:** A tiny amber dot appears at the horizontal center of the screen, slightly above center vertically
- **0.3–1.0s:** The golden sun circle **scales up from 0 to full size** with a smooth elastic/bounce easing. It expands concentrically from its center point
- By 1.0s the circle is at full size, positioned at center-screen

### Phase 3: Skyline Reveals (0.6s – 1.2s)
- **0.6s:** The skyline silhouette starts to appear within the lower portion of the golden circle
- It **rises upward** from below — like the buildings are growing up from the bottom of the circle
- By ~1.2s the full skyline is visible, settled in its final position within the circle

### Phase 4: Figure Crosses into Logo (1.5s – 4.0s)
- **1.5–4.0s:** The figure continues walking rightward. It passes in front of and through the golden circle area
- The figure walks OVER and in front of the skyline/circle — figure is in the foreground, circle+skyline in the background
- During this crossing, the figure is visually centered within the circle for a moment, which is the "logo composition" moment
- Walk cycle continues throughout

### Phase 5: Text Appears (2.0s – 4.5s)
- **2.0s:** The text "daily" begins to appear below the circle
- The text appears to **slide/type in from left to right** — like it's being revealed character by character as the figure walks past
- **2.0–2.8s:** "daily" appears (black)
- **2.8–3.5s:** "stop" appears (golden amber)
- **3.5–4.5s:** "toshop" appears (black)
- The text slides in as if the figure's walking motion is "revealing" it — the text appears at roughly the same horizontal position as the figure's feet, as if the figure is walking over it
- Text enters from the left side and settles into its final centered position

### Phase 6: Figure Exits and Re-enters (4.0s – 6.5s)
- **4.0–5.0s:** The figure continues walking rightward and begins to exit the frame on the right side. A second instance of the figure appears entering from the right edge (or the same figure wraps around) — this creates a brief moment where figures are visible on both edges
- **5.0–6.5s:** The figure walks back toward center from the right, settling into its final position centered within the golden circle. (Alternative interpretation: the figure simply continues walking rightward, overshoots the center, and the entire logo composition slides/shifts to center the figure within the circle)

### Phase 7: Final Logo Rests (6.5s – 8.0s)
- **6.5s:** The figure reaches its final centered position within the golden circle. The walk cycle continues gently
- The final composed logo is:
  - Golden sun circle in the background (upper portion)
  - City skyline silhouette as negative space in the lower half of the circle
  - Walking stick figure centered in front of the circle, slightly overlapping the bottom edge
  - Shadow ellipse beneath the figure's feet
  - "dailystoptoshop" text centered below everything
- **7.0–8.0s:** The logo holds in its final composition. The figure's walk cycle may slow down or continue at the same pace. No fade out — the video simply ends with the completed logo

---

## Condensed 3–4 Second Version (for `loader_prototype.html`)

Collapse the 8-second timeline into ~3.5 seconds:

| Time | Event |
|------|-------|
| 0.0s | White screen. Figure begins walking in from far left |
| 0.2s | Golden sun circle scales up (bounce easing) at center |
| 0.5s | Skyline silhouette fades/slides up inside the circle |
| 0.8s | Shadow appears beneath figure |
| 0.0–1.8s | Figure walks from left edge into the center of the circle |
| 1.5s | "daily" text starts appearing below |
| 1.8s | "stop" appears (golden) |
| 2.1s | "toshop" appears |
| 1.8–2.5s | Figure reaches final position centered in circle |
| 2.5–3.0s | Everything settles, walk cycle continues gently |
| 3.0–3.5s | Entire loader fades out |

---

## Color Palette
| Element | Color | Hex |
|---------|-------|-----|
| Background | Off-white | `#f5f5f0` |
| Figure body, text "daily", text "toshop" | Near-black | `#1a1a1a` |
| Sun circle, shopping bag, text "stop" | Golden amber | `#e8a308` |
| Bag handles, bag outline | Darker amber | `#c78b06` |
| Torso highlight line | Off-white | `#f5f5f0` |
| Shadow | Semi-transparent | `rgba(0,0,0,0.15)` |
| Skyline (cutout) | Same as background | `#f5f5f0` |

---

## Existing Prototype
The file `loader_prototype.html` in this same directory contains an initial SVG/CSS attempt. The walk cycle needs improvement — the legs and arms don't look like natural walking. Key issues:
- Legs should pivot from the **hip** (top of thigh), not rotate around a mid-body point
- Arms should pivot from the **shoulder**
- The legs need a **two-segment** structure (thigh + shin) for realism, with knees bending
- Arms swing in **opposition** to legs
- The body should bob up/down ~2px per step
- The bag should swing with the right arm
- The walk should feel **confident and purposeful**, like someone striding through a city
