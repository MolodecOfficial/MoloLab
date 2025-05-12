<script lang="ts" setup>
import {onMounted, ref} from 'vue';

const count = ref(0);

const fetchCount = async () => {
  try {
    const response = await $fetch('/api/active-users');
    count.value = response?.count || 0;
  } catch (error) {
    console.error('Не могу определить активных пользователей:', error);
    count.value = 0;
  }
}
let intervalId: any;

const day = ref()
const month = ref()
const year = ref()

const hour = ref()
const minute = ref()
const seconds = ref()

const updateTime = () => {
  const now = new Date();
  hour.value = String(now.getHours()).padStart(2, '0');
  minute.value = String(now.getMinutes()).padStart(2, '0');
  seconds.value = String(now.getSeconds()).padStart(2, '0');
  day.value = String(now.getDate()).padStart(2, '0')
  month.value = String(now.getMonth()+1).padStart(2, '0')
  year.value = String(now.getFullYear()).padStart(2, '0')
};

useHead({
  title: 'УГНТУ | Панель администратора'
})


onMounted(() => {
  fetchCount();
  updateTime();
  intervalId = setInterval(updateTime, 10);
  setInterval(fetchCount, 2000);
  localStorage.getItem('notes')
})

onUnmounted(() => {
  clearInterval(intervalId);
});

</script>

<template>
  <AccountMoloGuard>
    <AdminpanelPatternsMoloAdmin header_text="Добро пожаловать в панель администратора">
      <template #more-info>
        <span class="online-status">
          <a class="dot"></a> Текущий онлайн на сайте: {{ count }}
        </span>
      </template>
      <div class="update-info">
        <div class="update-content">
          <div class="update">
            <h2>Обновление 0.2</h2>
            <ul class="text">
              <li>Новая панель администратора</li>
              <li>Переработанная кодовая составляющая</li>
            </ul>
          </div>
          <button class="more-button">Подробнее</button>
        </div>
        <div class="support-project">
          <h3>Связь с разработчиком</h3>
          <div class="social-buttons">
            <NuxtLink class="social-button vk"
                      to="https://vk.com/molodec_official"
            >
              <img src="/public/adminPanel/vk.png" alt="vk"/>
            </NuxtLink>
            <NuxtLink class="social-button telegram"
                      to="https://t.me/molodec_official_tg"
            >
              <img src="/public/adminPanel/telegram.png" alt="telegram"/>
            </NuxtLink>
            <NuxtLink class="social-button github"
                      to="https://github.com/MolodecOfficial"
            >
              <img src="/public/adminPanel/github.png" alt="github"/>
            </NuxtLink>
          </div>
        </div>
      </div>
      <hr>
      <section class="sections">
        <section class="section-1">
          <section class="sections_messages">
            <span>У вас нет новых сообщений</span>
          </section>
          <AdminpanelActionsMoloPostNotes/>
        </section>
        <section class="section-2">
          <section class="extra_buttons">
            <span>Экстра кнопки</span>
            <section class="btns">
              <AdminpanelMoloButton type="delete">Новый пользователь</AdminpanelMoloButton>
              <AdminpanelMoloButton type="specialty">Новое расписание</AdminpanelMoloButton>
              <span>Ваши предложения для функционала можете предложить в тгк</span>
            </section>
          </section>
          <AdminpanelMoloCurrentDate/>
          <section class="current_version">
            <span>
              Текущая версия сайта - 0.2
            </span>
          </section>
        </section>
      </section>
    </AdminpanelPatternsMoloAdmin>
  </AccountMoloGuard>
</template>


<style scoped>


.online-status {
  display: flex;
  align-items: center;

}

.dot {
  width: 8px;
  height: 8px;
  background-color: #00ea00;
  border-radius: 50%;
  margin-right: 8px;
  animation: blink 1.5s infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.update-info {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  gap: 30px;
}

.update-content {
  background-color: var(--dk-bg-ins-light-color);
  padding: 20px;
  border-radius: 8px;

  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  text-align: start;
}

.update-content h2 {
  margin-top: 0;
}

.update {
  display: flex;
  flex-direction: column;
}

.more-button {
  background-color: #600000;
  border: 1px solid red;
  color: white;
  padding: 12px 18px;
  width: fit-content;
  height: fit-content;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: red;
    border: 1px solid red;
  }
}

.support-project {
  height: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  background-color: var(--dk-bg-ins-light-color);
  padding: 20px;
  border-radius: 8px;
  width: 15%;
}

.social-buttons {
  display: flex;
  gap: 10px;
}

.social-button {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  padding: 6px;
  justify-content: center;
  align-items: center;
  transition: 0.3s all ease-in-out;

  & img {
    width: 80%;
    height: 80%;
  }

}

.social-button.vk {
  border: 1px solid #0065fc;
  background-color: #06006e;

  &:hover {
    background-color: var(--dk-bg-ins-color);
    border: 1px solid transparent;
  }
}

.social-button.telegram {
  border: 1px solid #0097ff;
  background-color: #0b5080;

  &:hover {
    background-color: var(--dk-bg-ins-color);
    border: 1px solid transparent;
  }
}

.social-button.github {
  border: 1px solid #ffffff;
  background-color: #828282;

  &:hover {
    background-color: var(--dk-bg-ins-color);
    border: 1px solid transparent;
  }
}

.sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px;
  width: 40%;
}

.section-1 {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
}

.sections_messages {
  background-color: var(--dk-bg-ins-light-color);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.section-2 {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  gap: 20px;
}

.extra_buttons {
  background-color: var(--dk-bg-ins-light-color);
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  & span {
    font-weight: bold;
  }
}

.btns {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.current_date,
.current_version {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  background-color: var(--dk-bg-ins-light-color);
  padding: 20px;
  border-radius: 10px;
}
.current_date {
  border: none;
}
hr {
  border: 1px solid var(--dk-border-color);
}
</style>