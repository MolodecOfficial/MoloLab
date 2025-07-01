<script lang="ts" setup>
import { useRouter } from 'vue-router'

const firstName = ref('')
const lastName = ref('')
const group = ref('')
const faculty = ref('')
const specialty = ref('')
const router = useRouter()

const themeStore = useThemeStore()
const userStore = useUserStore()

// Иконки для навигации
const UserIcon = defineComponent({
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none' }, [
      h('path', {
        d: 'M12 12a4 4 0 100-8 4 4 0 000 8z',
        stroke: 'currentColor',
        'stroke-width': '1.5'
      }),
      h('path', {
        d: 'M5 20v-1a7 7 0 0114 0v1',
        stroke: 'currentColor',
        'stroke-width': '1.5',
        'stroke-linecap': 'round'
      })
    ])
  }
})

const TrophyIcon = defineComponent({
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none' }, [
      h('path', {
        d: 'M6 3v1m12-1v1M3 6v1.5a3 3 0 003 3h12a3 3 0 003-3V6m-9 3v9m0-9H9m3 0h3m-3 9v3m0 0h-3m3 0h3',
        stroke: 'currentColor',
        'stroke-width': '1.5',
        'stroke-linecap': 'round'
      })
    ])
  }
})

const ChartIcon = defineComponent({
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none' }, [
      h('path', {
        d: 'M8 15v3m4-6v6m4-9v9m4-12v12M3 21h18',
        stroke: 'currentColor',
        'stroke-width': '1.5',
        'stroke-linecap': 'round'
      })
    ])
  }
})

const MessageIcon = defineComponent({
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none' }, [
      h('path', {
        d: 'M21 15a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v8z',
        stroke: 'currentColor',
        'stroke-width': '1.5'
      }),
      h('path', {
        d: 'M10 9l4 3-4 3',
        stroke: 'currentColor',
        'stroke-width': '1.5',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      })
    ])
  }
})

const DesignIcon = defineComponent({
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none' }, [
      // Кисть (простая линия с кончиком)
      h('path', {
        d: 'M5 19l3-3m0 0l8-8m-8 8l-2 2m8-8l2-2',
        stroke: 'currentColor',
        'stroke-width': '1.5',
        'stroke-linecap': 'round'
      }),
      // Палитра (полукруг с отверстием)
      h('path', {
        d: 'M18 12a6 6 0 11-6-6v6',
        stroke: 'currentColor',
        'stroke-width': '1.5'
      }),
    ])
  }
})
const CalendarIcon = defineComponent({
  render() {
    return h('svg', { viewBox: '0 0 24 24', fill: 'none' }, [
      h('path', {
        d: 'M8 5H5v15h14V5h-3m-8-3v4m6-4v4M3 9h18',
        stroke: 'currentColor',
        'stroke-width': '1.5',
        'stroke-linecap': 'round'
      })
    ])
  }
})

const links = [
  { to: '/student/personal-data', text: 'Ваши данные', color: '#667eea', icon: UserIcon },
  { to: '/student/achievements', text: 'Достижения', color: '#9f7aea', icon: TrophyIcon },
  { to: '/student/rating', text: 'Рейтинг', color: '#ed64a6', icon: ChartIcon },
  { to: '/student/messages', text: 'Сообщения', color: '#f6e787', icon: MessageIcon },
  { to: '/student/schedule', text: 'Расписание', color: '#f6ad55', icon: CalendarIcon },
  { to: '/student/design', text: 'Дизайн', color: '#68d391', icon: DesignIcon }
]

async function logoutUser() {
  try {
    localStorage.removeItem('user')
    userStore.clearUser()
    await router.push('/login/student')
  } catch (error) {
    console.error('Ошибка при выходе из аккаунта:', error)
  }
}

onMounted(() => {
  const storageUser = localStorage.getItem('user')
  if (storageUser) {
    const user = JSON.parse(storageUser);
    firstName.value = user.firstName
    lastName.value = user.lastName
    group.value = user.group
    faculty.value = user.faculty
    specialty.value = user.specialty
  }
})
</script>

<template>
  <AccountPatternsMoloLab>

  <section class="profile-container">
    <!-- Аватар с градиентным фоном -->
    <div class="profile-avatar">
      <img
          :src="themeStore.selectedThemePic"
          :alt="firstName + ' ' + lastName"
          class="avatar-image"
      >
    </div>

    <!-- Основная информация -->
    <section class="profile-info">
      <span class="profile-name">{{ firstName }} {{ lastName }}</span>
      <div class="profile-meta">
        <span class="meta-item">{{ group }}</span>
        <span class="meta-divider">•</span>
        <span class="meta-item">{{ faculty }}</span>
      </div>
      <div class="specialty">{{ specialty }}</div>
    </section>

    <!-- Навигационные карточки -->
    <div class="nav-grid">
      <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav-card"
          :style="{ '--accent-color': link.color }"
      >
        <div class="nav-icon">
          <component :is="link.icon" />
        </div>
        <span class="nav-text">{{ link.text }}</span>
        <div class="nav-hover-line"></div>
      </NuxtLink>
    </div>

    <!-- Кнопка выхода -->
    <button @click="logoutUser" class="logout-btn">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M15 16l4-4-4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M19 12H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M15 4h3a2 2 0 012 2v12a2 2 0 01-2 2h-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <span>Выйти</span>
    </button>
  </section>
  </AccountPatternsMoloLab>

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
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.profile-container {
  position: relative;
  z-index: 1;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  min-height: 100vh;
  max-width: 500px;
}

.profile-avatar {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 16px;
  justify-content: center;
  width: 128px;
  height: 128px;
}

.avatar-image {
  width: 120px;
  height: 120px;
  z-index: 2;
}


.profile-info {
  text-align: center;
  width: 100%;
}

.profile-name {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
  display: inline-block;
  background: linear-gradient(90deg, #ffffff, #e0e0e0);
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.profile-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
  flex-wrap: wrap;
}

.meta-divider {
  color: rgba(255, 255, 255, 0.5);
}

.specialty {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  padding: 10px 24px;
  border-radius: 24px;
  color: white;
  font-size: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: inline-block;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.specialty:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
  margin-top: 8px;
}

.nav-card {
  background: rgba(32, 32, 35, 0.73);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-hover-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--accent-color);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.nav-card:hover .nav-hover-line {
  transform: scaleX(1);
}

.nav-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  background: rgba(21, 21, 23, 0.8);
}

.nav-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.nav-card:hover .nav-icon {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.1);
}

.nav-icon svg {
  width: 22px;
  height: 22px;
  stroke-width: 1.8;
}

.nav-text {
  font-weight: 500;
  font-size: 0.95rem;
  text-align: center;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 30px;
  background: rgba(255, 59, 48, 0.2);
  color: white;
  border: 1px solid rgba(255, 59, 48, 0.3);
  margin-top: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  backdrop-filter: blur(5px);
}

.logout-btn:hover {
  background: rgba(255, 59, 48, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(255, 59, 48, 0.15);
}

.logout-btn svg {
  width: 18px;
  height: 18px;
}

/* Анимации */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.profile-avatar {
  animation: fadeIn 0.6s ease-out forwards;
}

.profile-info {
  animation: fadeIn 0.6s ease-out 0.1s forwards;
  opacity: 0;
}

.nav-grid {
  animation: fadeIn 0.6s ease-out 0.2s forwards;
  opacity: 0;
}

.logout-btn {
  animation: fadeIn 0.6s ease-out 0.3s forwards;
  opacity: 0;
}

@media (max-width: 480px) {
  .profile-name {
    font-size: 1.6rem;
  }

  .profile-container {
    padding: 16px;
    gap: 20px;
  }

  .nav-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .nav-card {
    padding: 18px 12px;
  }
}
</style>