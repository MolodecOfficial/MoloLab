<script setup lang="ts">

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

// Анимированный фон с частицами
const initParticles = () => {
  if (typeof window !== 'undefined') {
    const canvas = document.createElement('canvas')
    canvas.style.position = 'fixed'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.zIndex = '-1'
    canvas.style.opacity = '0.15'
    document.body.appendChild(canvas)

    const ctx: any = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Настройки частиц
    const particles: {
      x: number
      y: number
      size: number
      color: string
      speedX: number
      speedY: number
      opacity: number
      update: () => void
      draw: () => void
    }[] = []

    const particleCount = window.innerWidth < 768 ? 40 : 80
    const colors = ['#667eea', '#9f7aea', '#ed64a6', '#f687b3', '#f6ad55', '#68d391']

    class Particle {
      x: number
      y: number
      size: number
      color: string
      speedX: number
      speedY: number
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.speedX = Math.random() * 1.5 - 0.75
        this.speedY = Math.random() * 1.5 - 0.75
        this.opacity = Math.random() * 0.4 + 0.1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.opacity
        ctx.fill()
      }
    }

    function init() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }

      requestAnimationFrame(animate)
    }

    init()
    animate()

    window.addEventListener('resize', () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    })
  }
}

onMounted(() => {
  initParticles()
})

</script>

<template>
  <div class="gradient-bg"></div>
  <button @click="goBack" class="back-button">
    <svg viewBox="0 0 24 24" fill="none" class="back-icon">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    Назад
  </button>
  <slot/>
</template>

<style scoped>
.gradient-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background: linear-gradient(-45deg,
  #1a202c 0%,
  #3d4042 25%,
  #191a21 50%,
  #39393d 75%,
  #1a202c 100%);
  background-size: 400% 400%;
  animation: gradientFlow 20s ease infinite;
  opacity: 1;
}

@keyframes gradientFlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.back-button {
  position: fixed;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  font-size: 0.95rem;
  font-weight: 500;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.back-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.back-button:hover .back-icon {
  transform: translateX(-4px);
}

/* Адаптивность */
@media (max-width: 768px) {
  .back-button {
    top: 15px;
    left: 15px;
    padding: 8px 12px;
    font-size: 0.85rem;
  }

  .back-icon {
    width: 18px;
    height: 18px;
  }
}

</style>