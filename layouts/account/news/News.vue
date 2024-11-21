<script setup lang="ts">

useThemeStore()

interface LeftNews {
  title: string,
  link: string
}

interface RightNews {
  date: string,
  title: string,
  description: string
}

const MyNews: Array<LeftNews> = [
  {
    title: 'Обновление 0.1 (Установлено)',
    link: 'https://t.me/molodec_official_tg/242'
  }, {
    title: 'Обновление 0.08',
    link: 'https://t.me/molodec_official_tg/242'
  }, {
    title: 'Обновление 0.07',
    link: 'https://t.me/molodec_official_tg/238'
  }, {
    title: 'Обновление 0.06',
    link: 'https://t.me/molodec_official_tg/230'
  }, {
    title: 'Обновление 0.05',
    link: 'https://t.me/molodec_official_tg/214'
  }, {
    title: 'Обновление 0.04',
    link: 'https://t.me/molodec_official_tg/199'
  }, {
    title: 'Обновление 0.031',
    link: 'https://t.me/molodec_official_tg/195'
  },{
    title: 'Обновление 0.03',
    link: 'https://t.me/molodec_official_tg/182'
  }, {
    title: 'Обновление 0.02',
    link: 'https://t.me/molodec_official_tg/174'
  }, {
    title: 'Обновление 0.01',
    link: 'https://t.me/molodec_official_tg/131'
  }
]

const UniversityNews: Array<RightNews> = [
  {
    date: '01.10.2024',
    title: 'Вниманию студентов и выпускников!',
    description: 'Студенты старших курсов, магистранты и выпускники УГНТУ!. ' +
        'В МАОУ "Школа №117 с УИИЯ" Советского района г. Уфы есть вакансии на новый учебный год – учителя математики, физики. ' +
        'Вас ждут дружный коллектив педагогов, любознательные и креативные ученики и хорошая нагрузка! ' +
        'По всем вопросам обращаться по телефону: 8-996 101-29-64 Оксана Валентиновна'
  }, {
    date: '17.09.2024',
    title: 'Уважаемые Коллеги и обучающиеся!',
    description: 'Lerna организует обучающий вебинар «Продвинутый пользователь Excel за час». ' +
        'Дата и время: 24 сентября, 11–00 мск. Место: онлайн. Спикер: Зоя Максименко, к.т.н., аналитик, доцент. ' +
        'На вебинаре мы научимся: <br>' +
        'фильтровать и быстро находить нужную информацию; <br>' +
        'создавать сводные таблицы и проводить в них вычисления; <br>' +
        'проводить условные форматирования; <br>' +
        'создавать и форматировать диаграммы для наглядных отчётов. ' +
        'В вебинаре смогут участвовать только зарегистрированные пользователи платформы онлайн-обучения Lerna, поэтому не забудьте зарегистрироваться: https://go.lerna.ru/ysaDzy До встречи!'
  }, {
    date: '04.09.2024',
    title: 'Вниманию студентов!',
    description: 'Начинается осенний блок программы промышленного туризма! ' +
        'В рамках программы Вы сможете посетить ведущие предприятия нефтегазовой и индустриальной отрасли и поближе познакомиться с деятельностью организаций. Для студентов младших курсов это отличная возможность определиться с местом прохождения практики или стажировки, а для выпускников – выбрать будущее место работы. ' +
        'Узнать информацию о планируемых экскурсиях и подать заявку на участие можно найти в телеграм-канале: https://t.me/promturizmugntu. ' +
        'Центр карьеры УГНТУ – это связующее звено между работодателем и студентами. ' +
        'Центр карьеры поможет: <br>' +
        '- пройти оплачиваемую стажировку в крупных нефтяных компаниях; <br>' +
        '- подобрать вакансию по специальности в одну из ведущих компаний; <br>' +
        '- посетить карьерные мероприятия с работодателями и профессионалами из разных отраслей; <br>' +
        '- получить совет по оформлению документов для поиска работы.' +
        '<br>Подписывайся и будь в курсе всех карьерных новостей вуза!<br>' +
        'ВК: https://vk.com/career_usptu <br>' +
        'ТГ: https://t.me/career_usptu '
  }
]

</script>

<template>
  <section class="newsContainer">
    <section class="newsContainer-block">
      <section class="newsHeader">
        <span>Последние новости</span>
      </section>
      <section class="news">
        <section class="leftNews">
          <AccountNewsMoloLeftNews v-for="(leftNews, idx) in MyNews "
                                   :key="idx"
                                   :title="leftNews.title"
                                   :link="leftNews.link"
          />
        </section>
        <section class="rightNews">
          <AccountNewsMoloRightNews v-for="(rightNews, idx) in UniversityNews"
                                    :key="idx"
                                    :date="rightNews.date"
                                    :title="rightNews.title"
                                    :description="rightNews.description"
          />
        </section>
      </section>
    </section>
  </section>
</template>

<style scoped>

.dark-theme .newsContainer {
  background-color: #1a1a1a;
}

.dark-theme .newsHeader {
  background-color: #1e1e1e;
  & span {
    color: white;
  }
}

.newsContainer {
  width: 100%;
  height: 100%;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
  align-items: center;

}

.newsContainer-block {
  width: 90%;
}

.newsHeader {
  background-color: #ffffff;
  width: 100%;
  height: 12vh;
  margin-top: 74px;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  & span {
    font-size: 30px;
    color: #053969;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.news {
  display: flex;
}

.news-leftBlock {
  background-color: #ffffff;
  margin-top: 45px;
  width: 20vw;
  height: 5vh;
  border-radius: 20px;
  display: flex;
  justify-content: center;
}



</style>