<script setup lang="ts">

useHead({
  title: 'УГНТУ | Общежитие'
})

</script>

<template>
  <AccountMoloHeader/>
  <div class="container">
    <AccountMoloRouteList/>
    <section class="dormitory-container">
      <section class="dormitory-header">
        <span>Общежитие</span>
      </section>
      <section class="dormitory-info">
        <section class="dormitory-info-section">
          <h3>ИНФОРМАЦИЯ О ЗАСЕЛЕНИИ В ОБЩЕЖИТИЯ УГНТУ</h3>
          <strong>Если статус заявки "Заявка обработана"</strong> <span>Вам необходимо дождаться, когда в поле "Формирование договора" появится ссылка "Скачать договор", об этом Вам придет СМС уведомление.</span>
          <strong>Если появилась ссылка на договор</strong> <span>Скачайте и распечатайте договор (комплект из 3х договоров и заявления). Подпишите их и принесите на заселение.</span>
          <strong>Если появилась ссылка на счет</strong>
          <span>Скачайте и оплатите счет на сайте или в кассе УГНТУ.</span>
        </section>

        <section class="dormitory-info-section">
          <h3>ИНФОРМАЦИЯ ОБ ОПЛАТЕ</h3>
          <strong>По полугодиям:</strong> <span>50% до 01 сентября, 50% до 15 февраля.</span>
          <strong>Поэтапно для студентов очной формы:</strong> <span>25% до 01 сентября, до 01 ноября, до 15 февраля, до 01 мая.</span>
        </section>

        <section class="payment-methods-section">
        <h3>СПОСОБЫ ОПЛАТЫ</h3>
        <div class="payment-methods">
          <div class="method">
            <h4>Оплата по счету в банке</h4>
            <span>Перейдите на текущую страницу, распечатайте счет и оплатите любым удобным способом.</span>
          </div>
          <div class="method">
            <h4>Оплата банковской картой</h4>
            <span>Оплатите через защищенную платежную страницу ПАО Сбербанк с использованием карт VISA, MasterCard или
              МИР.
            </span>
          </div>
        </div>
        </section>

        <section class="refund-section">
          <h3>Возврат денежных средств</h3>
          <p>Возврат средств возможен по заявлению в случае досрочного расторжения договора.</p>
        </section>

        <section class="dormitory-info-section">
          <h3>Контакты</h3>
          <span><strong>Юридический адрес:</strong> 450064, Россия, Республика Башкортостан, г.Уфа, ул.Космонавтов,1</span>
          <span><strong>Электронная почта:</strong> info@rusoil.net</span>
          <span><strong>Телефоны:</strong> +7-347-2431419, +7-347-2242918</span>
        </section>
      </section>
    </section>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  overflow-x: hidden;
  background-color: white;
}

.dark-theme .container {
  background-color: #1e1e1e;
}

.dormitory-container {
  width: 100%;
  background-color: rgba(237, 244, 255, 0.82);
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  min-height: 93vh;
  border-top-left-radius: 20px;
  border: 1px solid #e0e0e0;
}

.dormitory-header {
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
  border: 1px solid #e0e0e0;

  & span {
    font-size: 30px;
    color: #3b3b7f;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.dormitory-info {
  display: flex;
  flex-direction: column;
  width: 90%;
  font-size: 16px;
  color: #333;
  gap: 30px;
}

h3 {
  font-size: 22px;
  color: #3b3b7f;
  text-align: center;
}

.payment-methods-section,
.dormitory-info-section,
.refund-section {
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: 1px solid #e0e0e0;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  gap: 10px;
  &.dormitory-info-section:last-child {
    margin-bottom: 20px;
  }
}

.refund-section {
  background-color: #fff5f5;
  padding: 20px;
  border-radius: 20px;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  color: #ab0028;
}

.payment-methods {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.method {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 45%;
  border: 1px solid #e0e0e0;
  & h4 {
    font-size: 18px;
    color: #3b3b7f;
    margin-bottom: 10px;
  }

  & span {
    font-size: 14px;
    color: #555;
  }
}

@media (max-width: 768px) {
  .payment-methods {
    flex-direction: column;
    align-items: center;
  }

  .method {
    width: 80%;
    margin-bottom: 20px;
  }
}
.dark-theme .dormitory-container {
  background-color: #151515;
  border: 1px solid #2c2c2c;
}

.dark-theme .dormitory-header {
  background-color: #1e1e1e;
  border: 1px solid #2c2c2c;
  & span {
    color: white;
  }
}

.dark-theme .payment-methods-section,
.dark-theme .dormitory-info-section,
.dark-theme .refund-section {
  background-color: #1e1e1e;
  border: 1px solid #2c2c2c;
  & span {
    color: white;
  }
  & strong {
    color: #4e45e3;
  }
  & h3 {
    color: white;
  }
}

.dark-theme .method {
  background-color: #151515;
  border: 1px solid #2c2c2c;
  & span {
    color: white;
  }
  & h4 {
    color: #4e45e3;
  }
}
</style>