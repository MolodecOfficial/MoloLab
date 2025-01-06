<script setup lang="ts">
const receptionProps = defineProps({
  title: String,
  subtitle: String,
  link: String,
  subtitle_2: String,
  link_2: String,
  subtitle_3: String,
  link_3: String,
  subtitle_4: String,
  link_4: String
})
</script>

<template>
  <section class="addresses">
    <section class="big-addresses">
      <span class="address-title"> {{ receptionProps.title }} </span>
      <span class="address-subtitle">{{ receptionProps.subtitle }}</span>
      <span v-html="receptionProps.link"></span>
      <span class="address-subtitle">{{ receptionProps.subtitle_2 }}</span>
      <span v-html="receptionProps.link_2"></span>
      <span class="address-subtitle">{{ receptionProps.subtitle_3 }}</span>
      <span v-html="receptionProps.link_3"></span>
      <span class="address-subtitle">{{ receptionProps.subtitle_4 }}</span>
      <span v-html="receptionProps.link_4"></span>
    </section>
  </section>
  <section class="other-addresses">
    <section class="other-address">
      <span class="address-title">
        ФЗО (факультет заочного обучения)
      </span>
      <span>
      Тел.: (347) 2431914, 2424218 Эл. почта: fzo@rusoil.net
    </span>
    </section>
  </section>
  <section class="other-addresses">
    <section class="other-address">
      <span class="address-title">
        Управление международного сотрудничества
      </span>
      <span>
        Эл. почта: interusptu@rusoil.net<br>
        Тел.: (347) 2431135– отдел по работе с иностранными учащимися<br>
        Тел.: (347) 2605721 – отдел внеучебной и визово-регистрационной работы<br>
      </span>
    </section>
  </section>
  <section class="other-addresses">
    <section class="other-address">
      <span class="address-title">
        Студенческая бухгалтерия
      </span>
      <span>
        По вопросам оплаты обучения, договоров на обучение<br>
        Эл. почта: 2431752@mail.ru Тел.: (347) 2431752<br>
        По вопросам стипендиального обеспечения (получение справок по стипендиальным выплатам)<br>
        Тел.: (347) 2429738 Эл. почта: 1-205@inbox.ru<br>
      </span>
    </section>
  </section>
</template>

<style scoped>
.addresses {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;

  & .address-title {
    font-size: 20px;
    color: #4e45e3;
  }

  & .address-subtitle {
    color: #3b3b7f;

  }
}

.big-addresses {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.other-addresses {
  text-align: center;
  padding: 20px;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;

}

.other-address {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}

.dark-theme .addresses {
  background-color: #1e1e1e;
  border: 1px solid #2c2c2c;

  & .address-title {
    color: #4e45e3;
  }
  & .address-subtitle {
    color: rgba(91, 107, 217, 0.91);
  }
  & span {
    color: white;
  }
}

.dark-theme .other-addresses {
  background-color: #1e1e1e;
  border: 1px solid #2c2c2c;
}

</style>