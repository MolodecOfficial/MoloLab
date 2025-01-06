<script setup lang="ts">
useHead({
  title: 'УГНТУ | Оплата обучения'
})
</script>

<template>
  <AccountMoloHeader/>
  <div class="container">
    <AccountMoloRouteList/>
    <section class="payment-container">
      <section class="payment-header">
        <span>Оплата обучения</span>
      </section>
      <section class="payment-content">
        <section class="payment-info">
          <section class="payment-info-section">
            <h3>ИНФОРМАЦИЯ ОБ ОПЛАТЕ</h3>
            <div class="payment-schedule">
              <strong>По полугодиям:</strong> <span>50% от годовой стоимости обучения — до 01 сентября; до 15 февраля;</span>
              <strong>Поэтапно для студентов очной формы (кроме выпускного курса):</strong> <span>25% до 01 сентября, до 01 ноября, до 15 февраля, до 01 мая.</span>
            </div>
          </section>
          <section class="payment-methods-section">
            <h3>СПОСОБЫ ОПЛАТЫ</h3>
            <div class="payment-methods">
              <div class="method">
                <h4>Оплата по счету в банке</h4>
                <p>Перейдите на текущую страницу, распечатайте счет и оплатите любым удобным способом: отделение банка, банкомат или банковское приложение.</p>
              </div>
              <div class="method">
                <h4>Оплата банковской картой</h4>
                <p>Оплатите через защищенную платежную страницу ПАО Сбербанк с использованием карт VISA, MasterCard или МИР.</p>
              </div>
            </div>
          </section>

          <section class="refund-section">
            <h3>Возврат денежных средств</h3>
            <p>Возврат средств возможен по заявлению в случае досрочного расторжения договора.</p>
          </section>

          <section class="contacts-section">
            <h3>Контакты</h3>
            <div class="contact-details">
              <span><strong>Юридический адрес:</strong> 450064, Россия, Республика Башкортостан, г.Уфа, ул.Космонавтов, 1</span>
              <span><strong>Электронная почта:</strong> info@rusoil.net</span>
              <span><strong>Телефоны:</strong> +7-347-2431419, +7-347-2242918</span>
            </div>
          </section>
        </section>
      </section>
    </section>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  overflow-x: hidden;
  background-color: #f4f7fb;
}

.dark-theme .container {
  background-color: #1e1e1e;
}

.payment-container {
  width: 100%;
  background-color: rgba(237, 244, 255, 0.9);
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  min-height: 93vh;
  border-top-left-radius: 20px;
  border: 1px solid #e0e0e0;
}

.payment-header {
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
}

.payment-header span {
  font-size: 30px;
  color: #3b3b7f;
}

.payment-content {
  display: flex;
  flex-direction: column;
  width: 90%;
  font-size: 16px;
  color: #333;
  gap: 40px;
}

.payment-info {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.contacts-section {
  margin-bottom: 20px;
}

.payment-info-section,
.payment-methods-section,
.refund-section,
.contacts-section {
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: 1px solid #e0e0e0;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  gap: 10px;
}

.payment-info-section h3,
.payment-methods-section h3,
.refund-section h3,
.contacts-section h3 {
  font-size: 22px;
  color: #3b3b7f;
}

.payment-schedule {
  font-size: 16px;
  color: #555;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
}

.payment-schedule ul {
  list-style: none;
  padding: 0;
}

.payment-schedule li {
  margin-bottom: 8px;
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
  text-align: center;
  border: 1px solid #e0e0e0;
}

.method h4 {
  font-size: 18px;
  color: #3b3b7f;
  margin-bottom: 10px;
}

.method p {
  font-size: 14px;
  color: #555;
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

.contact-details {
  font-size: 16px;
  color: #333;
}

.contact-details span {
  display: block;
  margin-bottom: 10px;
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

.dark-theme .payment-container {
  background-color: #151515;
  border: 1px solid #2c2c2c;
}

.dark-theme .payment-header,
.dark-theme .payment-methods-section,
.dark-theme .payment-info-section,
.dark-theme .refund-section,
.dark-theme .contacts-section {
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
  & h4 {
    color: #4e45e3;
  }
  & p {
    color: white;
  }
}
</style>