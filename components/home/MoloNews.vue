<script setup lang="ts">

let activeCard = ref(null);

const hoverCard = (idx: any) => {
  activeCard.value = idx;
};

const unhoverCard = (idx: any) => {
  activeCard.value = null;
};

interface MoloNew {
  image: string,
  description: string,
  link: string
}

let MoloNewsArray: Array<MoloNew> = [
  {
    image: '/news/1.png',
    description: 'Первый запуск сайта был произведён 28.09.2024',
    link: '/in-progress'
  },
  {
    image: '/news/2.png',
    description: 'На текущий день было выпущено более 16 обновлений',
    link: '/in-progress'
  },
  {
    image: '/news/3.png',
    description: 'Проект готовился к тотальной переработке около 2 месяцев',
    link: '/in-progress'
  },
  {
    image: '/news/4.png',
    description: 'Текущий разработчик сайта - Moloдец',
    link: '/in-progress'
  },
  {
    image: '/news/5.png',
    description: 'Данный проект настроен под общее пользование преподавателей, студентов и т.д.',
    link: '/in-progress'
  },
  {
    image: '/news/6.png',
    description: 'Проект работоспособен уже 9 месяцев',
    link: '/in-progress'
  },
  {
    image: '/news/7.png',
    description: 'Основные технологии - Nuxt, TS, Pinia',
    link: '/in-progress'
  },
  {
    image: '/news/8.png',
    description: 'Написано более 40 серверных файлов',
    link: '/in-progress'
  }
]

const reversedNews = computed(() => {
  return [...MoloNewsArray].reverse()
})

</script>

<template>
  <div class="news-container">
    <header class="news-header">
      <h2>Главная Информация Университета</h2>
    </header>

    <section class="news-grid">
      <article
          v-for="(news, idx) in reversedNews"
          :key="idx"
          class="news-card"
          @mouseenter="hoverCard(idx)"
          @mouseleave="unhoverCard(idx)"
      >
        <div class="news-image">
          <img :src="news.image" :alt="news.description">
        </div>
        <div class="news-content">
          <p class="news-description">{{ news.description }}</p>
          <NuxtLink to="/in-progress" class="news-link">Подробнее</NuxtLink>
        </div>
        <div class="news-overlay" :class="{ visible: activeCard === idx }"></div>
      </article>
    </section>

    <section class="show-more">
      <NuxtLink class="show-more-btn" to="/in-progress">
        Показать ещё
        <span class="arrow">→</span>
      </NuxtLink>
    </section>
  </div>
</template>

<style scoped>
.news-container {
  background-color: #f5f7fa;
  padding: 4rem 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.news-header {
  text-align: center;
  margin-bottom: 3rem;
}

.news-header h2 {
  font-size: 2.5rem;
  color: #2c3e50;
  position: relative;
  display: inline-block;
}

.news-header h2::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #3498db, #9b59b6);
  border-radius: 2px;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.news-card {
  position: relative;
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.news-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

.news-image {
  height: 200px;
  overflow: hidden;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.news-card:hover .news-image img {
  transform: scale(1.05);
}

.news-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.news-description {
  font-size: 1.05rem;
  color: #34495e;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.news-link {
  display: inline-block;
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.news-link:hover {
  color: #2980b9;
}

.news-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.15), rgba(155, 89, 182, 0.15));
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
  pointer-events: none;
}

.news-overlay.visible {
  opacity: 1;
}

.show-more {
  text-align: center;
  margin-top: 3rem;
}

.show-more-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.9rem 2.2rem;
  background: linear-gradient(90deg, #3498db, #9b59b6);
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.05rem;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.25);
}

.show-more-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(52, 152, 219, 0.35);
}

.arrow {
  margin-left: 10px;
  transition: transform 0.3s ease;
}

.show-more-btn:hover .arrow {
  transform: translateX(6px);
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }

  .news-header h2 {
    font-size: 1.75rem;
  }

  .news-image {
    height: 160px;
  }
}
</style>