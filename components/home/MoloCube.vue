<script setup lang="ts">
function handleMouseMove(e: any) {
  const shape = e.currentTarget;
  const rect = shape.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  shape.style.setProperty('--mouse-x', `${x}%`);
  shape.style.setProperty('--mouse-y', `${y}%`);

  // Параллакс для куба
  const cube = shape.querySelector('.cube');
  const rotateX = (y - 50) / 5;
  const rotateY = (x - 50) / 5;
  cube.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}
</script>

<template>
  <div class="interactive-shape" @mousemove="handleMouseMove">
    <!-- 3D-куб -->
    <div class="cube-container">
      <div class="cube">
        <div class="face front"></div>
        <div class="face back"></div>
        <div class="face top"></div>
        <div class="face bottom"></div>
        <div class="face left"></div>
        <div class="face right"></div>
      </div>
    </div>

    <!-- Парящие частицы -->
    <div class="particle p1"></div>
    <div class="particle p2"></div>
    <div class="particle p3"></div>
    <div class="particle p4"></div>
  </div>
</template>

<style scoped>
.interactive-shape {
  grid-column: 2;
  grid-row: 1 / 2;
  width: 400px;
  height: 400px;
  position: relative;
  perspective: 1000px;
  cursor: pointer;
  align-self: start;
  justify-self: end;
}

.cube-container {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  animation: rotateCube 15s infinite linear;
}

.cube {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotateX(0deg) rotateY(0deg);
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
}

.face {
  position: absolute;
  width: 200px;
  height: 200px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(0, 150, 255, 0.3);
}

.front {
  transform: translateZ(100px);
}
.back {
  transform: rotateY(180deg) translateZ(100px);
}
.top {
  transform: rotateX(90deg) translateZ(100px);
}
.bottom {
  transform: rotateX(-90deg) translateZ(100px);
}
.left {
  transform: rotateY(-90deg) translateZ(100px);
}
.right {
  transform: rotateY(90deg) translateZ(100px);
}

/* Частицы */
.particle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 15px rgba(0, 150, 255, 0.5);
  z-index: -1;
  pointer-events: none;
}

.p1 {
  width: 8px;
  height: 8px;
  top: 20%;
  left: 30%;
  animation: float 6s infinite ease-in-out;
  animation-delay: 0s;
}
.p2 {
  width: 6px;
  height: 6px;
  top: 70%;
  left: 60%;
  animation: float 7s infinite ease-in-out;
  animation-delay: 1s;
}
.p3 {
  width: 10px;
  height: 10px;
  top: 40%;
  left: 80%;
  animation: float 5s infinite ease-in-out;
  animation-delay: 2s;
}
.p4 {
  width: 5px;
  height: 5px;
  top: 85%;
  left: 20%;
  animation: float 8s infinite ease-in-out;
  animation-delay: 3s;
}

/* Анимации */
@keyframes rotateCube {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(10px, -15px); }
  50% { transform: translate(-5px, 10px); }
  75% { transform: translate(15px, 5px); }
}

/* Интерактивность */
.interactive-shape:hover .cube {
  transform: translate(-50%, -50%) rotateX(360deg) rotateY(360deg);
  transition: transform 2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.interactive-shape:hover .particle {
  transform: scale(1.5);
  opacity: 0.8;
}

/* Эффект при наведении мыши */
.interactive-shape {
  --mouse-x: 50%;
  --mouse-y: 50%;
}

.interactive-shape::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
      circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
  );
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.interactive-shape:hover::before {
  opacity: 1;
}

</style>