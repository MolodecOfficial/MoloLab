<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { useMessageStore } from '~/stores/messageStore';

const count = ref(0);
const messageStore = useMessageStore();
const isInitialized = ref(false);

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
  title: 'MoloLab | Панель Администратора'
})

const initMessageStore = async () => {
  try {
    // Восстанавливаем состояние из localStorage перед инициализацией
    const savedState = localStorage.getItem('messageStoreState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        Object.assign(messageStore.unreadCounts, parsed.unreadCounts || {});
      } catch (e) {
        console.error('Failed to load message store state', e);
      }
    }

    isInitialized.value = true;
  } catch (error) {
    console.error('Ошибка инициализации сообщений:', error);
  }
}

// Считаем общее количество непрочитанных сообщений
const totalUnreadMessages: any = computed(() => {
  if (!isInitialized.value) {
    // Пока не инициализированы, показываем сохраненное значение
    const savedState = localStorage.getItem('messageStoreState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        return Object.values(parsed.unreadCounts || {}).reduce((sum: number, count: number) => sum + count, 0);
      } catch (e) {
        return 0;
      }
    }
    return 0;
  }

  return Object.values(messageStore.unreadCounts).reduce((sum, count) => sum + count, 0);
});

onMounted(() => {
  fetchCount();
  updateTime();
  intervalId = setInterval(updateTime, 10);
  setInterval(fetchCount, 2000);

  // Инициализируем хранилище сообщений
  initMessageStore();
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
          <a class="dot"></a>
          <span>{{ count }}</span>
        </span>
      </template>
      <section class="admin">
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
        <div class="sections-container">
          <div class="sections">
            <div class="section-1">
              <!-- Отображаем количество непрочитанных сообщений -->
              <span v-if="totalUnreadMessages > 0" class="sections_messages unread-messages">
                У вас {{ totalUnreadMessages }} новых сообщений
              </span>
              <span v-else class="sections_messages">
                У вас нет новых сообщений
              </span>
              <AdminpanelActionsMoloPostNotes/>
            </div>
            <div class="section-2">
              <div class="extra_buttons">
                <span class="section-title">Экстра кнопки</span>
                <div class="btns">
                  <AdminpanelActionsMoloPostNewUser displayAs="button" />
                  <AdminpanelActionsMoloPostSchedule />
                  <span class="suggestion-text">Ваши предложения для функционала можете предложить в тгк</span>
                </div>
              </div>
              <AdminpanelMoloCurrentDate/>
              <div class="current_version">
              <span>
                Текущая версия сайта - 0.2
              </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminpanelPatternsMoloAdmin>
  </AccountMoloGuard>
</template>


<style scoped>
.admin {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

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
  padding: 0 20px;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
}

.update-content {
  background-color: var(--dk-bg-ins-light-color);
  padding: 20px;
  border-radius: 8px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  text-align: start;
  min-height: 100%;
}

.update-content h2 {
  margin-top: 0;
  margin-bottom: 10px;
}

.update {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.more-button {
  background-color: #600000;
  border: 1px solid red;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  align-self: flex-end;
  margin-left: 15px;

  &:hover {
    background-color: red;
    border: 1px solid red;
  }
}

.support-project {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--dk-bg-ins-light-color);
  padding: 20px;
  border-radius: 8px;
  width: 240px;
  flex-shrink: 0;
  box-sizing: border-box;
}

.support-project h3 {
  margin-top: 0;
  margin-bottom: 15px;
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

.sections-container {
  padding: 0 20px 20px;
  width: 100%;
  box-sizing: border-box;
}

.sections {
  display: flex;
  gap: 20px;
  width: 100%;
}

.section-1 {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  min-width: 0;
}

.sections_messages {
  background-color: var(--dk-bg-ins-light-color);
  padding: 15px 20px;
  border-radius: 10px;
  text-align: center;
  font-size: 0.95em;
}

.section-2 {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  min-width: 0;
}

.extra_buttons {
  background-color: var(--dk-bg-ins-light-color);
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.section-title {
  font-weight: bold;
  font-size: 1em;
  text-align: center;
}

.btns {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 12px;

}

.suggestion-text {
  font-size: 0.85em;
  color: #aaa;
  text-align: center;
  margin-top: 5px;
}

.current_date,
.current_version {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--dk-bg-ins-light-color);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
}

.current_version {
  padding: 15px;
}

.current_date {
  border: none;
}

hr {
  border: 1px solid var(--dk-border-color);
  margin: 0 20px;
}

.unread-messages {
  color: red;
  font-weight: bold;
}

@media (max-width: 1020px) {

  .online-status {
    display: flex;
    font-size: 10px;
  }

  .update-info {
    flex-direction: column;

  }
  .update {
    flex-direction: column;
  }

  .more-button {
    display: none;
  }
  .support-project {
    width: 100%;
  }

  .sections {
    flex-direction: column;
  }

  .section-1,
  .section-2 {
    width: 100%;
  }
}
</style>