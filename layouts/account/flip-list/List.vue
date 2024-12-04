<script setup lang="ts">
import {onMounted, ref} from "vue";

const firstName = ref('');
const lastName = ref('');
const userStore = useUserStore()

useHead({
  title: 'УГНТУ | Обходной лист'
})

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    firstName.value = user.firstName;
    lastName.value = user.lastName;
  } else {
    firstName.value = userStore.userFirstName;
    lastName.value = userStore.userLastName
  }
});

</script>

<template>
  <section class="flip-container">
    <section class="flip-header">
      <span>Обходной лист</span>
    </section>
    <section class="flip-header_inside-header">
      <span>Информация по закрытию задолженностей ниже</span>
    </section>
    <section class="flip-information">
      <section class="flip-user_information">
        <span class="user_span">Имя:</span>
        <span class="user">{{ firstName }}</span>
        <span class="user_span">Фамилия:</span>
        <span class="user">{{ lastName }}</span>
        <span class="user_span">Группа:</span>
        <span class="user">БПИ, БПИ09з 24-01</span>
        <span class="user_span">Курс:</span>
        <span class="user">1</span>
        <span class="no-info">данные пока не доступны</span>
      </section>
    </section>
    <section class="flip-header_outside-header">
      <span>ВКР и прочие документы по защите загружаются в разделе "Обучение" - закладка "Защита ВКР"</span>
    </section>
    <span>Уважаемые выпускники!</span>
    <section class="flip-information_books">
      <span>
        Сдать книги можно в обычном режиме, в соответствии с графиком работы отделов библиотеки.
      </span>
      <span>
        Информируем вас о необходимости получения в обходном листе отметок об отсутствии каких-либо задолженностей перед структурами университета.
      </span>
      <span>
        ДИПЛОМ о высшем образовании будет печататься только при положительном результате в обходном листе.
      </span>
    </section>
    <section class="flip-information_main">
      <section class="flip-information_main-places">
        <span>
          <b>ОПЛАТА</b> – только для студентов, обучающихся на платной основе. Не должно быть задолженностей по оплате за обучение. Если стоит задолженность, позвоните по телефону (347) 243-17-52.
        </span>
        <span>
          <b>Библиотека ОУЛ, ОНЛ, ОХЛ</b> – отметки всех отделов библиотеки УГНТУ о наличии взятых книг. Библиотекой утвержден график посещения для сдачи книг. bibl@rusoil.net. Телефон (347) 243-11-73 (библиотека Черниковки), (347) 228-26-55 (библиотека АСИ), (347) 248-14-50 (библиотека ИЭС).
        </span>
        <span>
          <b>Профком</b> – профком студентов, аспирантов УГНТУ (тел. (347) 264-87-69).
        </span>
        <span>
          <b>Трудоустройство</b> – выпускникам необходимо предоставить уведомление о трудоустройстве ответственному своей кафедры за трудоустройство (все факультеты, кроме ИЭС)
        </span>
        <span>
          <b>ИЭС</b> - в отдел профориентации и содействия трудоустройствуopst@rusoil.net , тел. 8(347)248-14-02; ФЗО - в Центр карьерыcareer@rusoil.net, тел. 8(347)242-07-34
        </span>
        <span>
          <b>2-Отдел</b> – отдел мобилизационной подготовки (только для юношей, проживающих в России). Необходимо согласовать военный учет и забрать приписное удостоверение (тел. (347) 243-19-54).
        </span>
        <span>
          <b>АКТ за обучение</b> - только для студентов, обучающихся на платной основе. Необходимо подписать акт предоставления платных образовательных услуг в 1-216. Утвержден график посещения выпускников (тел. (347) 243-17-52).
        </span>
        <span>
          <b>Заведующий кафедрой</b> - отметка ставится автоматически после загрузки студентом ВКР, подготовки всех сведений кафедрой и успешного прохождения защиты.
        </span>
        <span>
          <b>Общежитие</b> – только для студентов, которые проживали в общежитиях УГНТУ. Информация о наличии/отсутствии задолженностей будет передана в соответствующие деканаты. Вопросы по этому пункту нужно будет решить через свои деканаты. Телефоны деканатов на сайте УГНТУ.
        </span>
      </section>
      <section class="flip-information_main-phones">
        <section class="flip-information-phones">
          <span class="phone_span">Оплата обучения:</span>
          <span class="phone">1-216</span>

          <span class="phone_span">Библиотека:</span>
          <span class="phone">3 корпус - Черниковка, 5-6 корпуса – АСИ, ОГГ, 12 корпус - ИЭС</span>

          <span class="phone_span">Профком студентов УГНТУ:</span>
          <span class="phone">8-326</span>

          <span class="phone_span">2 - отдел (Отдел мобилизационной подготовки):</span>
          <span class="phone">1-305</span>

          <span class="phone_span">Трудоустройство:</span>
          <span class="phone">1-128</span>

          <span class="phone_span">Трудоустройство ИЭС:</span>
          <span class="phone">12-601</span>

          <span class="phone_span">ДОП (Отдел дополнительных образовательных программ):</span>
          <span class="phone">8-321</span>

          <span class="phone_span">Акт за обучение:</span>
          <span class="phone">1-216</span>
        </section>
      </section>
    </section>
  </section>
</template>

<style scoped>

.flip-container {
  width: 100%;
  background-color: #f5f7fa;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
}

.flip-header {
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

.flip-header_inside-header {
  background-color: #ffffff;
  width: 60%;
  height: 8vh;
  margin-top: 12px;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  & span {
    font-size: 24px;
    color: #3b3b7f;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.flip-information {
  display: flex;
  width: 90%;
  height: auto;
  justify-content: center;
}

.flip-user_information {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Две колонки одинаковой ширины */
  grid-template-rows: repeat(4, auto); /* Четыре строки с автоматической высотой */
  grid-column-gap: 10px; /* Расстояние между колонками */
  grid-row-gap: 10px; /* Расстояние между строками */
  flex-direction: column;
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;

  & .user_span {
    text-align: end;
    font-weight: bold;
  }
}

.no-info {
  grid-area: 5 / 1 / 6 / 3; /* Пятая строка, занимает обе колонки */
  text-align: center; /* Горизонтальное выравнивание по центру */
  align-self: center; /* Вертикальное выравнивание по центру */
  font-style: italic;
  color: #999; /* Для придания дополнительного визуального акцента */
}

.flip-header_outside-header {
  background-color: #ffffff;
  width: 80%;
  height: 8vh;
  margin-top: 12px;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  & span {
    font-size: 24px;
    color: #3b3b7f;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.flip-information_books {
  display: flex;
  gap: 10px;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 20px;
  border: 1px solid #727272;

  & span:last-child {
    color: red;
  }

  & span {
    font-size: 16px;
    color: #3b3b7f;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.flip-information_main {
  display: flex;
  flex-direction: row;
  width: 90%;
  gap: 25px;
}

.flip-information_main-places {
  display: flex;
  flex-direction: column;
  width: 55%;
  gap: 15px;

  & span {
    padding: 25px 10px;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  & span:last-child {
    margin-bottom: 20px;
  }
}

.flip-information-phones {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Две колонки одинаковой ширины */
  grid-template-rows: repeat(8, auto); /* Восемь строк с автоматической высотой */
  grid-column-gap: 10px; /* Расстояние между колонками */
  grid-row-gap: 10px; /* Расстояние между строками */
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;

  & .phone_span {
    text-align: end;
    font-weight: bold;
  }
}

.dark-theme .flip-container {
  background-color: #1a1a1a;
}

.dark-theme .flip-header,
.dark-theme .flip-header_inside-header,
.dark-theme .flip-header_outside-header,
.dark-theme .flip-information_books,
.dark-theme .flip-user_information {
  background-color: #1e1e1e;
  border: 1px solid #2c2c2c;
  & span {
    color: white;
  }
}

.dark-theme span {
  color: #e3e3e3;
}

.dark-theme .flip-information_books span:last-child {
  color: red;
}

.dark-theme .flip-information_main-places span {
  background-color: #1e1e1e;
  color: #e3e3e3;
  border: 1px solid #2c2c2c;
  & b {
    color: #4e45e3;
  }
}

.dark-theme .flip-information-phones {
  background-color: #1e1e1e;
  border: 1px solid #2c2c2c;
  & .phone_span {
    color: #4e45e3;
  }
}

.dark-theme .flip-user_information {
  & .user_span {
    color: #4e45e3;
  }

  & .no-info {
    color: #999;
  }
}


</style>