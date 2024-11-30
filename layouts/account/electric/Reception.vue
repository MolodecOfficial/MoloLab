<script setup lang="ts">

interface LeftAddress {
  title: string,
  link: string
}

const MyLeftAddresses: Array<LeftAddress> = [
  {
    title: 'ГНФ',
    link: 'Для потоков ГЛ, БГЛ, ГФ, МГЛ, МГФ: Тел.: (347) 2282300 Эл. почта: dekanat.ogg@bk.ru<br>' +
        'Для всех остальных потоков Тел.: (347) 2431474 Эл. почта: gnf48@bk.ru'
  }, {
    title: 'ФТТ',
    link: 'Тел.: 8(347)-2420914 Эл. почта: ftt65@mail.ru.'
  }, {
    title: 'IT-институт (бывший ФАПП)',
    link: 'Тел.: (347) 2420851 Эл. почта: fapp@rusoil.net'
  }, {
    title: 'ИНБ',
    link: 'Тел.:(347)2431958<br>' +
        'Кадесникова Оксана Владимировна kadesok@mail.ru - куратор  потоков БЭА, БЭН, БЭФ, БФП, БФА, БФС, БИФ, БЭР, МЭК01, МЭК02, МЭК03, МЭК05, МЭК08, МЭК18.<br>' +
        'Валитова Ника Эдуардовна nikaga@yandex.ru  - куратор потоков БСО, БСП, МСО, МСП, МЭК07.<br>' +
        'Тасмуханова Альфия Ерсаиновна aetasm@mail.ru – куратор потоков БЭГ, БЭТ, БЭП, БГП, БИП, БИУ, МЭК04, МЭК09, МЭК10, МЭК12, МЭК13, МЭК15, МЭК16.<br>'
  }, {
    title: 'АСИ',
    link: 'Тел.:(347)2282811, 2282900 Эл. почта: Asf_dekan@rusoil.net'
  }, {
    title: 'ВыШкаИнСоТех (бывший ФОНД)',
    link: 'Тел.: (347) 2420752 Эл. почта: fondugntu2015@mail.ru'
  }, {
    title: 'ИНИЦТ (бывший МФ)',
    link: 'Тел.: (347) 2420834 Эл. почта: mfugntu@mail.ru'
  }, {
    title: 'ТФ',
    link: 'Тел.: (347) 2420754 Эл. почта: spravka_tf@mail.ru'
  }
]

interface RightAddress {
  title: string,
  subtitle: string,
  link: string
  subtitle_2: string,
  link_2: string,
  subtitle_3: string,
  link_3: string,
  subtitle_4: string,
  link_4: string
}

const MyRightAddresses: Array<RightAddress> = [
  {
    title: 'ИЭС',
    subtitle: 'ИЭС по вопросам обучения',
    link: 'Заместитель директора по учебной работе (Очная форма обучения)<br>' +
        'Группы: БМФп-20-01, БПР-20-01, БПДп-20-01, БКИМ-20-01, БРА-20-01, БТТУп-20-01, БГОР-20-01, БГОГ-20-01, БИКП-20-01, БИЦ-20-01, БДДС-20-01, БГУ-20-01, БФК-20-01, МДД-20-01, СЭБ-20-01, СЭЭ-20-01<br>' +
        'Шалагина Светлана Витальевна Тел. 252-08-41, кабинет 12-502 (Чернышевского – 145), эл.почта: shalaginasv@rusoil.net<br>' +
        'Заместитель директора по учебной работе (Очная форма обучения)<br>' +
        'Группы: МЗС-20-01, БФПП-20-01, БЗИ01-20-01, МФБ-20-01<br>' +
        'Журкина Ирина Петровна Тел. 228-58-19, кабинет 13-205 (Акназарова - 24), эл.почта: zhurkinaip@rusoil.net<br>' +
        'Заместитель директора по учебной работе (Очно-заочная и заочная формы обучения, всех направлений подготовки)<br>' +
        'Короткова Людмила Николаевна Тел. 252-95-22,252-05-23 и 253-06-52 (методисты), кабинет 12-409 (Чернышевского – 145), эл.почта: ovzo@rusoil.net',
    subtitle_2: 'ИЭС по вопросам расписания учебных занятий, организации дистанционного обучения:',
    link_2: 'Доцент кафедры РЭУ, Габидуллина Элина Винеровна каб.12-304 (Чернышевского – 145), тел.248-13-16, эл.почта: 2481316.ies-ugntu@mail.ru',
    subtitle_3: 'ИЭС по вопросам назначения и выплаты академической и социальной  стипендии, материальной помощи:',
    link_3: 'Заместитель директора по экономике Баемова Лариса Зинуровна каб.12-305 (Чернышевского – 145), тел. 241-78-70;',
    subtitle_4: 'Профбюро студентов ИЭС',
    link_4: 'И.о. Председателя Профбюро ИЭС УГНТУ - Арина Ахметзянова, эл.почта:profkomugues@mail.ru'
  }
]
</script>

<template>
  <section class="electric-container">
    <section class="electric-header">
      <span>Электронная приёмная</span>
    </section>
    <section class="electric-actions">
      <section class="actions">
        <NuxtLink class="action" to="/in-progress">Подать обращение</NuxtLink>
        <NuxtLink class="action" to="/in-progress">Проверить статус обращения</NuxtLink>
      </section>
      <section class="other-info">
        <span>
          Для смены фамилии необходимо направлять заявление <NuxtLink class="a"
                                                                      to="https://ams.rusoil.net/oau/docs/смена%20фамилии.docx">(скачать)</NuxtLink> фото свидетельства о браке и фото паспорта 1го разворота и страницы с пропиской на почту postmaster@rusoil.net
        </span>
      </section>
    </section>
    <section class="addresses-container">
      <section class="addresses-header">
        <span>
          Заказ справок об обучении, общие вопросы по организации обучения (расписание, переводы, восстановления,
        отчисления и пр.) – обращаться в свои деканаты:
        </span>
      </section>
      <section class="addresses">
        <section class="small-addresses">
          <AccountReceptionMoloLeftReception class="address"
                                             v-for="(address, idx) in MyLeftAddresses"
                                             :key="idx"
                                             :title="address.title"
                                             :link="address.link"

          />
        </section>
        <section class="big-addresses">
          <AccountReceptionMoloRightReception class="address"
                                              v-for="(addresses) in MyRightAddresses"
                                              :title="addresses.title"
                                              :subtitle="addresses.subtitle"
                                              :link="addresses.link"
                                              :subtitle_2="addresses.subtitle_2"
                                              :link_2="addresses.link_2"
                                              :subtitle_3="addresses.subtitle_3"
                                              :link_3="addresses.link_3"
                                              :subtitle_4="addresses.subtitle_4"
                                              :link_4="addresses.link_4"
          />
        </section>
      </section>
      <section class="help">
        <section class="help-footer">
          <span>
            Вопросы, на которые Вы не смогли получить ответов по  предложенным контактам, Вам разъяснят сотрудники <NuxtLink class="b" to="http://www.rusoil.net/page/studencheskiy-ofis">Студенческого офиса</NuxtLink>
          </span>
        </section>

      </section>
    </section>
  </section>
</template>

<style scoped>
.electric-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 30px;
  background-color: #f5f7fa;
  position: relative;
}

.electric-header {
  background-color: #ffffff;
  width: 90%;
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
    color: #3b3b7f;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.electric-actions {
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 30px;
}

.actions {
  display: flex;
  flex-direction: column;
  width: 25%;
  gap: 20px;
}

.action {
  padding: 25px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 20px;
  text-decoration: none;
  color: #4e45e3;
  &:hover {
    background-color: #e5e5e5;
  }
}

.a {
  text-decoration: none;
  color: #4e45e3;

  &:hover {
    text-decoration: underline 1px;
    text-underline-offset: 3px;
  }
}

.other-info {
  background-color: #ffffff;
  text-align: center;
  display: flex;
  width: 80%;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  & span {
    width: 90%;
  }
}

.addresses-container {
  width: 90%;
}

.addresses-header {
  background-color: #ffffff;
  width: 100%;
  height: 12vh;

  display: flex;
  justify-content: center;
  border-radius: 20px;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  & span {
    font-size: 20px;
    color: #3b3b7f;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

  }
}

.addresses {
  display: flex;
  gap: 20px;
}

.small-addresses {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding-top: 30px;
  width: 60%;
}

.big-addresses {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 30px;
}

.help {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.help-footer {
  background-color: #ffffff;
  width: 100%;
  height: 12vh;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  & span {
    font-size: 20px;
    color: #3b3b7f;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.b {
  display: flex;
  text-decoration: none;
  padding: 4px;
}

.dark-theme .electric-header,
.dark-theme .addresses-header,
.dark-theme .help-footer,
.dark-theme .action,
.dark-theme .other-info {
  background-color: #1e1e1e;
  border: 1px solid #2c2c2c;
  & span {
    color: white;
  }
}

.dark-theme .action {
  background-color: #1e1e1e;
  &:hover {
    background-color: #2c2c2c;
  }
}

.dark-theme .electric-container {
  background-color: #1a1a1a;
}

</style>