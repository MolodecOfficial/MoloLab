<script setup lang="ts">


</script>

<template>
  <!-- Мобильная версия -->
  <section class="mobile-container">
    <section class="mobile-header">
      <img src="/public/home/MoloLab_no_text.png" alt="" class="icon">
      <span>Версия 0.2</span>
    </section>
    <section class="mobile-content">
      <img src="/public/img.png" alt="" class="bg-img">
      <section class="name-header">
        <span>Свежий</span>
        <span>Взгляд на</span>
        <span>Обучение</span>
      </section>
      <section class="bg-cube">
        <HomeMoloCube/>
      </section>
      <NuxtLink to="/login/student" class="info-button">
        Личный Кабинет
      </NuxtLink>
    </section>
    <section class="page-content">
      <HomeMoloNews/>
    </section>
  </section>

  <!-- Десктопная версия -->
  <section class="pc-container">
    <!-- Sticky header -->
    <header class="header-container">
      <div class="header-content">
        <a class="main-logo" href="">
          <img src="/public/home/MoloLab_no_text.png" alt="Логотип" class="logo">
        </a>
        <NuxtLink class="login-link" to="/login/student">
          Личный кабинет
        </NuxtLink>
      </div>
    </header>

    <!-- Hero section with video background -->
    <section class="hero-section">
      <div class="video-background">
<!--        <video autoplay loop muted>-->
<!--          <source src="../public/over.mp4" type="video/mp4">-->
<!--          Ваш браузер не поддерживает видео.-->
<!--        </video>-->
        <div class="video-overlay"></div>
      </div>

      <div class="hero-content">
        <h1 class="hero-title">
          <span class="line-1">Свежий</span>
          <span class="line-2">Взгляд на</span>
          <span class="line-3">Обучение</span>
        </h1>
        <HomeMoloCube/>
      </div>
    </section>

    <!-- Page content -->
    <main class="page-content">
      <HomeMoloNews/>
    </main>
  </section>
</template>

<style scoped>

/* Анимация масштабирования */
@keyframes scaleIn {
  to {
    transform: scale(1);
  }
}

/* Анимации */
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  to {
    transform: scale(1);
  }
}

@keyframes slideIn {
  to {
    transform: translateX(0);
  }
}

/* Анимации */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

/* Общие стили */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.pc-container {
  display: flex;
  width: 100%;
  position: relative;
}

.header-container {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  box-sizing: border-box;

}

.header-content {
  margin: 20px auto;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 40%;
  border-radius: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  & .main-logo {
    box-sizing: border-box;
    max-width: 60px; /* Максимальная ширина логотипа */
    & img {
      width: 100%; /* Изображение занимает всю ширину родителя */
      height: auto; /* Высота автоматическая для сохранения пропорций */
    }
  }
  & .login-link {
    color: #eee;
    text-decoration: none;
    font-size: 16px;
    padding: 8px 16px;
    border-radius: 20px;
    transition: background-color 0.3s;
    text-align: end;
  }
}





.login-link:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.hero-section {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-background video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(3, 34, 103, 0.8);
}

.hero-section {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  gap: 30px;
  max-width: 1400px;
  width: 90%;
  margin: 0 auto;
}

.hero-title {
  display: flex;
  flex-direction: column;

  grid-column: 1;
  grid-row: 1 / span 2;
  align-self: center;
  transform: translateX(-5%);
}

.hero-title span {
  display: block;
  font-size: clamp(40px, 6vw, 120px);
  line-height: 0.85;
  font-weight: 900;
  font-family: "Samsung Sans", sans-serif;
  letter-spacing: -0.03em;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

.hero-title .line-1 {
  color: #dedede;
  animation-delay: 0.3s;
}

.hero-title .line-2 {
  color: rgb(180, 190, 210);
  animation-delay: 0.6s;
}

.hero-title .line-3 {
  color: rgb(133, 144, 169);
  animation-delay: 0.9s;
}

.hero-title span {
  transition: transform 0.3s ease-out;
}

.hero-section:hover .line-1 {
  transform: translateX(-10px);
}

.hero-section:hover .line-2 {
  transform: translateX(0);
}

.hero-section:hover .line-3 {
  transform: translateX(10px);
}

.page-content {
  position: relative;
  z-index: 5;
  background-color: white;
}



/* Мобильная версия */
.mobile-container {
  display: none;
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: auto;
  background: linear-gradient(135deg, #0a1e45, #0c2b6e);
}

.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  height: 60px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
}

.mobile-header .icon {
  width: 80px;
  transition: width 0.3s ease;
}

.mobile-header span {
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
}

.mobile-content {
  position: relative;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  padding: 20px;
  z-index: 1;
  justify-content: center;
}

.bg-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  filter: blur(3px);
  opacity: 0.3;
  transition: opacity 0.5s ease;
}

.bg-cube {
  display: flex;
  width: 100%;
}

.name-header {
  position: relative;
  z-index: 1;
  margin-top: 60px;
  text-align: center;
  animation: fadeInUp 0.8s ease forwards;
}

.name-header span {
  display: block;
  font-size: clamp(28px, 8vw, 52px);
  color: #a4a4a4;
  line-height: 1.1;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.name-header span:first-child {
  color: white;
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from { text-shadow: 0 0 5px rgba(255,255,255,0.5); }
  to { text-shadow: 0 0 15px rgba(255,255,255,0.9); }
}

.right-logo {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  animation: float 3s ease-in-out infinite;
}

.logo-circle {
  width: 100px;
  height: 100px;
  animation: spin 12s linear infinite;
  transition: transform 0.3s ease;
}

.logo-circle:hover {
  transform: rotate(360deg) scale(1.1);
}

.info-button {
  position: relative;
  z-index: 2;
  margin-top: auto;
  margin-bottom: 40px;
  padding: 14px 24px;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-size: 14px;
  align-self: center;
  text-align: center;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  width: 80%;
  max-width: 300px;
}

.info-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #2a5298, #3a7bd5);
}

/* Анимации */
@keyframes float {
  0%, 100% { transform: translateY(-50%) translateX(0); }
  50% { transform: translateY(-50%) translateX(5px); }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Адаптация под маленькие экраны */
@media (max-width: 480px) {
  .mobile-header .icon {
    width: 60px;
  }

  .name-header {
    margin-top: 40px;
  }

  .name-header span {
    font-size: clamp(24px, 7vw, 40px);
  }

  .logo-circle {
    width: 80px;
    height: 80px;
  }

  .info-button {
    font-size: 13px;
    padding: 12px 20px;
  }
}

/* Медиазапросы */
@media (max-width: 768px) {
  .mobile-container {
    display: block;
  }

  .mobile-header .icon {
    width: 60px; /* уменьшаем с 120px до 80px */
  }
  .pc-container {
    display: none;
  }
}

@media (min-width: 769px) {
  .mobile-container {
    display: none;
  }


  .pc-container {
    display: block;
  }
}
</style>