<script setup lang="ts">
import {ref} from 'vue';

import forIncoming from 'public/home/sections/MenuList/Incoming.png';
import forStudents from 'public/home/sections/MenuList/Student.png';
import forScience from 'public/home/sections/MenuList/Science.png';
import forUniversity from 'public/home/sections/MenuList/University.png';
import forBusiness from 'public/home/sections/MenuList/Business.png';
import forPressRoom from 'public/home/sections/MenuList/PressRoom.png';


const icons = ref([ /* Массив с вкладками */
  {
    icon: forIncoming,
    header: {text: 'Поступающим'},
    links: [
      {text: 'Приемная комиссия', nuxtLink: 'in-progress'},
      {text: 'Бакалавриат и специалитет', nuxtLink: 'in-progress'},
      {text: 'Аспирантура', nuxtLink: 'in-progress'},
      {text: 'Магистратура', nuxtLink: 'in-progress'},
      {text: 'СПО (Колледж)', nuxtLink: 'in-progress'},
    ]
  },
  {
    icon: forStudents,
    header: {text: 'Обучающимся'},
    links: [
      {text: 'Расписание', nuxtLink: 'in-progress'},
      {text: 'Личный кабинет', nuxtLink: 'in-progress'},
      {text: 'Факультеты, институты и кафедры', nuxtLink: 'in-progress'},
      {text: 'Документы УГНТУ', nuxtLink: 'in-progress'},
      {text: 'Обходной лист', nuxtLink: 'in-progress'},
      {text: 'Институт дополнительного профессионального образования', nuxtLink: 'in-progress'},
      {text: 'Стипендиальное обеспечение', nuxtLink: 'in-progress'},
      {text: 'Научно-исследовательская работа студентов', nuxtLink: 'in-progress'},
      {text: 'Цифровые кафедры', nuxtLink: 'in-progress'}
    ]
  },
  {
    icon: forScience,
    header: {text: 'Наука и исследования'},
    links: [
      {text: 'Научные исследования', nuxtLink: 'in-progress'},
      {text: 'Орган по валидации и верификации парниковых газов УГНТУ\n', nuxtLink: 'in-progress'},
      {text: 'Основные научные направления', nuxtLink: 'in-progress'},
      {text: 'Научные конкурсы и гранты', nuxtLink: 'in-progress'},
      {text: 'Конференции и симпозиумы', nuxtLink: 'in-progress'},
      {text: 'Государственное задание в сфере научной деятельности', nuxtLink: 'in-progress'},
      {text: 'Научные центры и лаборатории УГНТУ', nuxtLink: 'in-progress'},
      {text: 'Отдел по работе с диссертационными советами', nuxtLink: 'in-progress'}
    ]
  },
  {
    icon: forBusiness,
    header: {text: 'Бизнесу'},
    links: [
      {text: 'Производственная практика', nuxtLink: 'in-progress'},
      {text: 'Трудоустройство выпускников', nuxtLink: 'in-progress'},
      {text: 'Институт дополнительного профессионального образования', nuxtLink: 'in-progress'},
      {text: 'Проекты', nuxtLink: 'in-progress'},
    ]
  },
  {
    icon: forUniversity,
    header: {text: 'Об университете'},
    links: [
      {text: 'Страница ректора', nuxtLink: 'in-progress'},
      {text: 'Фонд целевого капитала УГНТУ (эндаумент-фонд)', nuxtLink: 'in-progress'},
      {text: 'Документы УГНТУ', nuxtLink: 'in-progress'},
      {text: 'Факультеты, институты, школы', nuxtLink: 'in-progress'},
      {text: 'Образование', nuxtLink: 'in-progress'},
      {text: 'Программы обучения', nuxtLink: 'in-progress'},
      {text: 'Руководство университета', nuxtLink: 'in-progress'},
      {text: 'Управление университетом', nuxtLink: 'in-progress'}
    ]
  },
  {
    icon: forPressRoom,
    header: {text: 'Пресс-Рум'},
    links: [
      {text: 'Мероприятия', nuxtLink: 'in-progress'},
      {text: 'Новости', nuxtLink: 'in-progress'},
      {text: 'Объявления', nuxtLink: 'in-progress'},
      {text: 'СМИ о нас', nuxtLink: 'in-progress'},
      {text: 'Газета «За нефтяные кадры»', nuxtLink: 'in-progress'},
    ]
  },
]);

onMounted(() => {
  activeIndex.value = null;
})

const activeIndex = ref<number | null>(null);

const showLinks = (index: number) => { /* Отобразить список */
  activeIndex.value = index;
};

function hideLinks() {
  activeIndex.value = null;
}

</script>

<template>
  <section class="easy-list">
    <div class="easy-list_overlay">
      <div class="easy-list_overlay_test"></div>
    </div>
    <section class="easy-list_container">
      <NuxtLink class="link" to="/in-progress">Поступающим</NuxtLink>
      <NuxtLink class="link" to="/in-progress">Обучающимся</NuxtLink>
      <NuxtLink class="link" to="/in-progress">Выпускники УГНТУ</NuxtLink>
      <NuxtLink class="link" to="/in-progress">Наука и инновации</NuxtLink>
      <NuxtLink class="link" to="/in-progress">Бизнесу</NuxtLink>
      <NuxtLink class="link" to="/in-progress">Университет</NuxtLink>
      <NuxtLink class="link" to="/in-progress">Приоритет 2030</NuxtLink>
      <NuxtLink class="link" to="/in-progress">Вакансии УГНТУ</NuxtLink>
    </section>
  </section>
  <section class="nav-links-container">
    <section
        v-for="(icon, index) in icons"
        :key="index"
        class="nav-links"
        @mouseleave="hideLinks"
    >
      <section
          @mouseenter="showLinks(index)"
          class="nav-links_container-icon"
      >
        <a class="nav-links_main" :aria-expanded="activeIndex === index">
          <img v-show="typeof icon.icon === 'string'" :src="icon.icon" alt="Icon"/>
        </a>
        <section
            v-show="activeIndex === index"
            class="nav-links_dropdown"
        >
          <p>{{ icon.header.text }}</p>
          <NuxtLink
              v-for="(link, linkIndex) in icon.links"
              :key="linkIndex"
              :href="link.nuxtLink"
          >
            {{ link.text }}
          </NuxtLink>
        </section>
      </section>
    </section>
  </section>

</template>

<style scoped>

.easy-list {
  position: absolute;
  filter: blur(10);
  height: 120%;
  width: 75vh;
  top: 0;
  left: 0;
  z-index: 0;
}

.easy-list_overlay {
  position: absolute;
  height: clamp(15%, 56vw, 100%);
  width: clamp(10%, 65vw, 31vw);
  background-color: rgba(47, 53, 89, 0.84); /* Левый фильтр */
  opacity: 1;

}

.easy-list_overlay_test {
  position: absolute;
  filter: blur(2px);
  height: clamp(15%, 56vw, 100%);
  width: clamp(20%, 65vw, 31vw);
  background-color: rgba(9, 24, 70, 0.82); /* Левый фильтр */
}

.easy-list_container {
  display: flex;
  align-items: start;
  top: 0;
  left: 0;
  transform: translate(100%, 10%);
  gap: clamp(1px, 10vw, 5px);
  width: clamp(80px, 10vw, 200px);
  flex-direction: column;
}

.easy-list_container a {
  font-size: clamp(2px, 1vw, 20px);
  color: #ffffff;
  transition: 0.2s transform ease-in-out, text-decoration-thickness 0.3s ease;
  text-decoration: none;

  &:hover {
    text-decoration: underline 1px;
    text-underline-offset: 4px;
    cursor: pointer;
  }
}

@media (max-width: 700px) {
  .nav-links-container {
    opacity: 0;
    pointer-events: none;
  }

  .nav-links-container a {
    height: 24px;
  }
}

.nav-links-container {
  width: 10%;
  z-index: 1;
  position: relative;
}

.nav-links_container-icon {
  display: flex;
  justify-content: center;
  align-items: center;

}

.nav-links_container-icon:hover {
  cursor: pointer;
}

.nav-links {
  position: relative;
  display: flex; /* Изменено на flex для правильного отображения */
  flex-direction: column; /* Вертикальное направление */
  align-items: start; /* Центрирование по горизонтали */
  margin: clamp(3px, 1vw, 20px) 60px;
  z-index: 0;
  width: 6vh;

}

.nav-links_main {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #333; /* Цвет текста */
  transition: color 0.3s ease;

}

.nav-links_main:hover {
  color: #007bff; /* Цвет при наведении */
}

.nav-links_dropdown {
  position: absolute;
  bottom: 100%; /* Прикрепляем к нижней части */
  left: 100%; /* Прикрепляем к правой части */
  transform: translateY(100%); /* Сдвигаем вниз, чтобы он не перекрывал иконку */
  background-color: #e3e3e3; /* Цвет фона выпадающего списка */
  border: 1px solid #ddd; /* Граница выпадающего списка */
  border-radius: 4px; /* Закругление углов */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Тень */
  z-index: 1000; /* Чтобы выпадающий список был поверх других элементов */
  padding: 10px;
  width: 50vh;

}

.nav-links_dropdown a {
  display: flex; /* Каждая ссылка занимает всю ширину */
  padding: 8px 12px; /* Отступы для ссылок */
  text-decoration: none; /* Убрать подчеркивание */
  color: #333; /* Цвет текста ссылок */
  transition: background-color 0.3s ease; /* Плавный переход фона */
}

.nav-links_dropdown a:hover {
  background-color: #f1f1f1; /* Цвет фона при наведении на ссылку */
}

img {
  width: clamp(10px, 2vw, 40px);
  height: clamp(10px, 2vw, 40px);
  margin-bottom: 8px; /* Отступ между иконкой и текстом (вертикально) */
  transition: 0.1s all ease-in-out;
  border: 1px solid rgba(225, 225, 225, 0.26);
  border-radius: 10px;
  padding: 5px;

  &:hover {
    scale: 0.83;
    border: 1px solid rgba(255, 255, 255, 0.69);
  }

  &:active {
    border: 1px solid rgb(255, 0, 0);
  }
}

p {
  display: flex;
  justify-content: center;
  text-decoration: underline 1px;
  text-underline-offset: 4px;
  font-weight: bold;
}


@media (max-width: 560px) {

}

@media (min-width: 561px) and (max-width: 765px) {

}

@media (min-width: 766px) and (max-width: 1280px) {

}
</style>