<template>
  <div
    class="quantum-atom"
    role="img"
    :aria-label="t('errors.atom', { statusCode })"
  >
    <span
      class="atom-field"
      aria-hidden="true"
    />

    <span
      class="atom-orbit atom-orbit-a"
      aria-hidden="true"
    >
      <span class="electron-runner electron-runner-a">
        <span class="electron electron-primary" />
      </span>
      <span class="electron-runner electron-runner-d">
        <span class="electron electron-secondary" />
      </span>
    </span>

    <span
      class="atom-orbit atom-orbit-b"
      aria-hidden="true"
    >
      <span class="electron-runner electron-runner-b">
        <span class="electron electron-secondary" />
      </span>
      <span class="electron-runner electron-runner-e">
        <span class="electron electron-primary" />
      </span>
    </span>

    <span
      class="atom-orbit atom-orbit-c"
      aria-hidden="true"
    >
      <span class="electron-runner electron-runner-c">
        <span class="electron electron-primary" />
      </span>
      <span class="electron-runner electron-runner-f">
        <span class="electron electron-secondary" />
      </span>
    </span>

    <span
      class="atom-nucleus"
      aria-hidden="true"
    >
      <span
        class="atom-code"
        :data-code="statusCode"
      >{{ statusCode }}</span>
    </span>

    <span
      class="energy-label energy-label-a"
      aria-hidden="true"
    >ΔE</span>
    <span
      class="energy-label energy-label-b"
      aria-hidden="true"
    >ψ</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  statusCode: number
}>()

const { t } = useI18n()
</script>

<style scoped>
.quantum-atom {
  position: relative;
  display: grid;
  width: min(76vw, 25rem);
  aspect-ratio: 1;
  place-items: center;
}

.atom-field {
  position: absolute;
  width: 58%;
  aspect-ratio: 1;
  border-radius: 9999px;
  background: radial-gradient(circle, color-mix(in srgb, var(--ui-primary) 20%, transparent), color-mix(in srgb, var(--ui-secondary) 9%, transparent) 42%, transparent 70%);
  filter: blur(1.8rem);
  animation: field-pulse 3.6s ease-in-out infinite;
}

.atom-orbit {
  position: absolute;
  width: 100%;
  aspect-ratio: 1;
  border: 1px solid color-mix(in srgb, var(--ui-text-dimmed) 52%, transparent);
  border-radius: 9999px;
  transform: rotate(var(--orbit-angle)) scaleY(0.48);
}

.atom-orbit-a { --orbit-angle: 0deg; }
.atom-orbit-b { --orbit-angle: 60deg; }
.atom-orbit-c { --orbit-angle: -60deg; }

.electron-runner {
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.electron-runner-a {
  animation-name: electron-jump-a;
  animation-duration: 4.2s;
}

.electron-runner-b {
  animation-name: electron-jump-b;
  animation-duration: 4.8s;
  animation-direction: reverse;
}

.electron-runner-c {
  animation-name: electron-jump-c;
  animation-duration: 5.3s;
}

.electron-runner-d {
  animation-name: electron-jump-b;
  animation-duration: 3.6s;
  animation-delay: -1.2s;
  animation-direction: reverse;
}

.electron-runner-e {
  animation-name: electron-jump-c;
  animation-duration: 3.9s;
  animation-delay: -2.4s;
}

.electron-runner-f {
  animation-name: electron-jump-a;
  animation-duration: 4.4s;
  animation-delay: -3.1s;
  animation-direction: reverse;
}

.electron {
  position: absolute;
  top: 50%;
  right: -0.4rem;
  width: 0.8rem;
  aspect-ratio: 1;
  border-radius: 9999px;
  transform: translateY(-50%) scaleY(2.08);
  animation: quantum-glitch 2.4s steps(1, end) infinite;
}

.electron-primary {
  color: var(--ui-primary);
  background: currentColor;
  box-shadow: 0 0 0.45rem currentColor, 0 0 1.3rem currentColor;
}

.electron-secondary {
  color: var(--ui-secondary);
  background: currentColor;
  box-shadow: 0 0 0.45rem currentColor, 0 0 1.3rem currentColor;
  animation-delay: -1.1s;
}

.atom-nucleus {
  position: relative;
  z-index: 2;
  display: grid;
  width: 33%;
  aspect-ratio: 1;
  place-items: center;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--ui-primary) 50%, var(--ui-secondary));
  border-radius: 9999px;
  background:
    radial-gradient(circle at 34% 26%, color-mix(in srgb, var(--ui-secondary) 82%, var(--ui-primary)), transparent 26%),
    radial-gradient(circle at 50% 55%, color-mix(in srgb, var(--ui-secondary) 82%, var(--ui-bg)) 0%, color-mix(in srgb, var(--ui-primary) 88%, var(--ui-bg)) 72%);
  box-shadow:
    0 0 1.2rem color-mix(in srgb, var(--ui-secondary) 58%, transparent),
    0 0 3.5rem color-mix(in srgb, var(--ui-primary) 48%, transparent),
    0 0 5.5rem color-mix(in srgb, var(--ui-secondary) 25%, transparent);
  filter: saturate(1.35) brightness(1.22);
}

.atom-code {
  position: relative;
  z-index: 1;
  font-family: var(--font-mono);
  font-size: clamp(1.75rem, 7vw, 3.3rem);
  font-weight: 800;
  letter-spacing: -0.08em;
  color: var(--ui-text-highlighted);
  animation: nucleus-code-jolt 2.8s steps(1, end) infinite;
}

.atom-code::before,
.atom-code::after {
  position: absolute;
  inset: 0;
  content: attr(data-code);
  opacity: 0;
}

.atom-code::before {
  color: var(--ui-primary);
  animation: nucleus-glitch-primary 2.8s steps(1, end) infinite;
}

.atom-code::after {
  color: var(--ui-secondary);
  animation: nucleus-glitch-secondary 2.8s steps(1, end) -0.05s infinite;
}

.energy-label {
  position: absolute;
  z-index: 3;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--ui-text-dimmed);
}

.energy-label-a { top: 20%; right: 11%; }
.energy-label-b { bottom: 22%; left: 12%; }

@keyframes electron-jump-a {
  0% { transform: rotate(0deg); }
  27% { transform: rotate(92deg); }
  28% { transform: rotate(168deg); }
  61% { transform: rotate(265deg); }
  62% { transform: rotate(332deg); }
  100% { transform: rotate(360deg); }
}

@keyframes electron-jump-b {
  0% { transform: rotate(20deg); }
  34% { transform: rotate(116deg); }
  35% { transform: rotate(204deg); }
  72% { transform: rotate(306deg); }
  73% { transform: rotate(354deg); }
  100% { transform: rotate(380deg); }
}

@keyframes electron-jump-c {
  0% { transform: rotate(-35deg); }
  24% { transform: rotate(48deg); }
  25% { transform: rotate(134deg); }
  68% { transform: rotate(255deg); }
  69% { transform: rotate(318deg); }
  100% { transform: rotate(325deg); }
}

@keyframes quantum-glitch {
  0%, 42%, 46%, 100% { opacity: 1; filter: none; }
  43% { opacity: 0.2; filter: blur(2px); }
  44% { opacity: 1; filter: drop-shadow(-0.8rem 0 var(--ui-secondary)) drop-shadow(0.8rem 0 var(--ui-primary)); }
  45% { opacity: 0.45; filter: brightness(2); }
}

@keyframes nucleus-code-jolt {
  0%, 76%, 87%, 100% { transform: translate(0); }
  78% { transform: translate(-0.06em, 0.02em) skewX(4deg); }
  81% { transform: translate(0.07em, -0.015em) skewX(-3deg); }
  84% { transform: translate(-0.025em, 0); }
}

@keyframes nucleus-glitch-primary {
  0%, 76%, 87%, 100% { opacity: 0; transform: translate(0); clip-path: inset(0); }
  78% { opacity: 0.95; transform: translate(-0.28em, 0.02em); clip-path: inset(8% 0 62%); }
  81% { opacity: 0.78; transform: translate(0.2em, 0); clip-path: inset(42% 0 32%); }
  84% { opacity: 0.9; transform: translate(-0.16em, -0.02em); clip-path: inset(70% 0 5%); }
  86% { opacity: 0; }
}

@keyframes nucleus-glitch-secondary {
  0%, 75%, 88%, 100% { opacity: 0; transform: translate(0); clip-path: inset(0); }
  77% { opacity: 0.9; transform: translate(0.24em, -0.015em); clip-path: inset(64% 0 8%); }
  80% { opacity: 0.82; transform: translate(-0.2em, 0.02em); clip-path: inset(25% 0 49%); }
  83% { opacity: 1; transform: translate(0.3em, 0); clip-path: inset(48% 0 24%); }
  87% { opacity: 0; }
}

@keyframes field-pulse {
  50% { opacity: 0.65; scale: 1.12; }
}

@media (prefers-reduced-motion: reduce) {
  .atom-field,
  .electron-runner,
  .electron,
  .atom-code,
  .atom-code::before,
  .atom-code::after {
    animation: none;
  }

  .electron-runner-a { transform: rotate(35deg); }
  .electron-runner-b { transform: rotate(155deg); }
  .electron-runner-c { transform: rotate(275deg); }
  .electron-runner-d { transform: rotate(105deg); }
  .electron-runner-e { transform: rotate(215deg); }
  .electron-runner-f { transform: rotate(325deg); }
}
</style>
