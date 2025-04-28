<script lang="ts" setup>

import {onMounted} from "vue";

const props = defineProps({
  loading: Boolean,
  users: Object,
  user: Object
})

const expandedUserIds = ref<Record<string, boolean>>({});

const toggleExpand = (userId: string) => {
  expandedUserIds.value[userId] = !expandedUserIds.value[userId];
};

const calculateAverage = (scores: any) => {
  if (Array.isArray(scores) && scores.length > 0) {
    const sum = scores.reduce((acc, score) => acc + Number(score), 0);
    return (sum / scores.length).toFixed(2);
  }
  return 'Нет оценок';
}

function getAverageColor(scores: any) {
  const average = parseFloat(calculateAverage(scores));
  if (isNaN(average)) return '#ffffff';

  if (average >= 4.5) return '#0cb000';  // Green
  if (average >= 4.0) return '#8ab000';  // Yellow-Green
  if (average >= 3.5) return '#ffcc00';  // Yellow
  if (average >= 3.0) return '#ff5900';  // Orange
  if (average >= 2.5) return '#ff0000';  // Red
  if (average >= 2.0) return '#ff0000';  // Max red
  return '#731601';  // Dark Red
}

async function getAllUsers() {
  const userStore = useUserStore();
  try {
    await userStore.getUsers();
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error);
  }
}

onMounted(async () => {
  await getAllUsers();

})


</script>

<template>
  <AdminpanelMoloLoader :is-loading="loading"/>

  <section v-if="!loading" class="user-section_v-else">
    <div v-if="!users || users.length === 0" class="no">Нет пользователя с таким именем</div>
    <section v-for="user in props.users"
             :key="user._id"
             class="user-section"
    >
      <section class="basic-info">
        <section class="basic">
          <span class="user-span"> <span class="user">{{ user.firstName }} </span></span>
          <span class="user-span"> <span class="user">{{ user.lastName }}</span> </span>
          <span class="user-span"> {{ user.specialty }} </span>
        </section>
        <section class="basic">
          <span class="user-span"> <span class="user">{{ user.group }}</span> </span>
          <span class="user-span"> {{ user.status }} </span>
        </section>
      </section>
      <section
          :class="{ 'show': expandedUserIds[user._id] }"
          class="other-info"
      >
        <hr>
        <span class="user-span"> Почта: <span class="user">{{ user.email }}</span> </span>
        <span class="user-span"> Достижения:
          <span class="user">
              {{
              Array.isArray(user.achievements) && user.achievements.length > 0
                  ? user.achievements.sort((a: any, b: any) => parseInt(a) - parseInt(b)).join(', ')
                  : 'Нет достижений'
            }}
          </span>
        </span>
        <span class="user-span"> Направление: <span class="user">{{ user.direction }}</span> </span>
        <span class="user-span"> Код: <span class="user">{{ user.code }}</span> </span>
        <span class="user-span"> Факультет: <span class="user">{{ user.faculty }}</span> </span>
        <span class="user-span"> Форма обучения: <span class="user">{{ user.form_of_learning }}</span> </span>
        <span class="user-span"> Обучение: <span class="user">{{ user.learning }}</span> </span>
        <span class="user-span"> Курс: <span class="user">{{ user.course }}</span> </span>
        <hr>
        <section>
          <span>Данные о успеваемости</span>
        </section>
        <hr>
        <div v-for="(scores, subject) in user.score" :key="subject" class="user-scores">
          <span class="user-span">{{ subject }}</span>
          <span v-if="Array.isArray(scores)"
                :data-average="calculateAverage(scores)"
                :style="{ color: getAverageColor(scores) }"
                class="user">
                    {{ calculateAverage(scores) }}
        </span>
        </div>
        <hr>
        <section>
        <span>
          Общий балл: {{ user.generalScore }}
        </span>
        </section>
        <section>
        <span>
          Средний балл: {{ user.averageScore }}
        </span>
        </section>
        <hr>
      </section>
      <section :class="{ 'show': expandedUserIds[user._id] }"
               class="actions-info"
      >
        <hr>
        <section>
          <span>Действия</span>
        </section>
        <hr>
        <section class="actions">
          <AdminpanelActionsMoloDeleteUser :user="user"/>
          <AdminpanelActionsMoloGiveScores :user="user"/>
          <AdminpanelActionsMoloGiveStatus :user="user"/>
          <AdminpanelActionsMoloGiveAchievement :user="user"/>
          <AdminpanelActionsMoloGiveLearning :user="user"/>
          <AdminpanelActionsMoloGiveSpecialty :user="user"/>


        </section>

      </section>
      <section class="btn">
        <button
            class="show-more"
            @click="toggleExpand(user._id)"
        >
          <img
              :class="{ rotated: expandedUserIds[user._id] }"
              alt=""
              src="/public/adminPanel/down.png"
          >
        </button>
      </section>
    </section>

  </section>
</template>

<style scoped>

@keyframes bounce {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

.user-section_v-else {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
  overflow: hidden;
}

.user-section {
  border: 1px solid var(--dk-border-color);
  background-color: var(--dk-bg-color);
  color: white;
  display: flex;
  border-radius: 10px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: start;

}

.user-span {
  color: #398aec;

  & .user {
    color: white;
  }
}


.basic-info {
  display: flex;
  gap: 10px;
  flex-direction: column;
  text-align: start;
  width: 100%;
  & .basic {
    display: flex;
    gap: 10px;
  }
}

.show-more {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  box-sizing: border-box;
  border: none;
  border-radius: 10px;
  height: fit-content;
  width: fit-content;
  padding: 12px 8px;
  transition: all 0.4s ease-in-out;
  cursor: pointer;
}

.show-more img {
  width: 60%;
  transition: all 0.4s ease-in-out;
}

.show-more img.rotated {
  transform: rotate(180deg);
}

.other-info {
  display: flex;
  flex-direction: column;
  text-align: start;
  gap: 10px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  max-height: 0;
  margin: 0;
}

.other-info.show {
  max-height: 80vh;
  opacity: 1;
}

.actions-info {
  display: flex;
  flex-direction: column;
  text-align: start;
  gap: 10px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  max-height: 0;
  margin: 0;

  &.show {
    max-height: 80vh;
    opacity: 1;
  }

}

.user-scores {
  display: flex;
  justify-content: space-between;
  text-align: start;
  align-items: start;

  & .user-span {
    width: 70%;
  }

  & .user {
    padding: 2px;
    text-decoration: underline 1px;
    text-underline-offset: 4px;
    text-align: end;
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

hr {
  width: 100%;
  border: 1px solid var(--dk-bg-ins-light-color);
}


.btn {
  display: flex;
  justify-content: flex-end;
}

.no {
  padding: 10px 20px;
  background-color: var(--dk-bg-color);
  text-align: center;
  width: max-content;
  border: 1px solid var(--dk-border-color);
  border-radius: 10px;
}
</style>