<script setup lang="ts">

import MoloNews from "~/layouts/news/UI/MoloNews.vue";



interface MoloNew {
  image: string,
  description: string,
  link: string
}

let MoloNewsArray: Array<MoloNew> = [
  {
    image: '/news/1.png',
    description: 'Заседание вузов-участников консорциума «Сетевой энергетический университет» состоялось в УГНТУ',
    link: '/in-progress'
  },
  {
    image: '/news/2.png',
    description: 'Итоги Ученого совета УГНТУ 26 сентября',
    link: '/in-progress'
  },
  {
    image: '/news/3.png',
    description: 'Вопросы промышленной робототехники обсудили в Минпромэнерго РБ',
    link: '/in-progress'
  },
  {
    image: '/news/4.png',
    description: 'Студенческий Театр «Ст. Арт» УГНТУ среди победителей!',
    link: '/in-progress'
  },
  {
    image: '/news/5.png',
    description: 'Форум «ИмпульсMedia» стартовал в Уфе',
    link: '/in-progress'
  },
  {
    image: '/news/6.png',
    description: 'Образование поколения Z обсудили в УГНТУ',
    link: '/in-progress'
  },
  {
    image: '/news/7.png',
    description: 'В слете «Наши ценности» участвовала студентка УГНТУ Ариана Акузина',
    link: '/in-progress'
  },
  {
    image: '/news/8.png',
    description: 'Победители международного экотона – команда УГНТУ «Эко будущее»!',
    link: '/in-progress'
  }
]

</script>

<template>
  <div>
    <header>
      <p>Новости Университета</p>
    </header>
    <section>
      <div v-for="(news, idx) in MoloNewsArray" :key="idx">
        <MoloNews
            :image="news.image"
            :description="news.description"
            :link="news.link"
        />
      </div>
    </section>
    <section class="showMore">
      <NuxtLink class="showMore_btn" to="/in-progress">Показать ещё</NuxtLink>
    </section>
  </div>
</template>

<style scoped>
div {
  background-color: #e5e5e5;
  margin: 0;
  padding: 0;
}
section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); /* Автоматическое заполнение */
  grid-template-rows: repeat(2, 1fr); /* Позволяет строкам адаптироваться */
  grid-column-gap: 0;
  grid-row-gap: 14px;
  width: 100%; /* Занимает всю ширину */
  max-width: 100vw; /* Ограничивает максимальную ширину */
  box-sizing: border-box; /* Учитывает отступы и границы */
  justify-items: center;
}
header {
  display: flex;
  justify-content: center;
}
header p {
  font-size: 26px;
}
button {
  background-color: #5a87e7;
  color: #e3e3e3;
  border: none;
  height: 50px;
  width: 150px;
  border-radius: 50px;
  font-size: 17px;
  transition: 0.2s all ease-in-out;
  &:hover {
    background-color: #456ab7;
    cursor: pointer;
  }
}
.showMore {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 15px 10px;
   & .showMore_btn {
     height: 40px;
     display: flex;
     justify-content: center;
     align-items: center;
     width: 140px;
     background-color: #123e98;
     color: #e3e3e3;
     border-radius: 15px;
     text-decoration: none;
     transition: 0.15s all ease-in-out;
     &:hover {
       text-decoration: underline 1px;
       text-underline-offset: 4px;
       background-color: #102f73;
     }
   }
}
</style>