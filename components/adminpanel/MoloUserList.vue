<script lang="ts" setup>

import {onMounted} from "vue";

const props = defineProps({
  loading: Boolean,
  users: Object,
  user: Object
})

const expandedUserIds = ref<Record<string, boolean>>({});

async function getAllUsers() {
  const userStore = useUserStore();
  try {
    await userStore.getUsers();
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error);
  }
}

const fetchGroups = async () => {
  try {
    const response = await $fetch('/api/groups');
    console.log('Ответ от API', response);
  } catch (error) {
    console.error('Ошибка при получении предметов:', error);
  }
}

const toggleExpand = (userId: string) => {
  expandedUserIds.value[userId] = !expandedUserIds.value[userId];
};

function convertCourseName(courseKey: any) {
  const map: Record<string, string> = {
    firstCourse: '1 курс',
    secondCourse: '2 курс',
    thirdCourse: '3 курс',
    fourthCourse: '4 курс',
    fifthCourse: '5 курс'
  };
  return map[courseKey] || courseKey;
}

function getCourseScores(subjects: Record<string, number[]> | undefined | null) {
  if (!subjects) return [];
  return Object.values(subjects)
      .filter(Array.isArray)
      .flat();
}

const calculateAverage = (scores: any) => {
  if (!Array.isArray(scores) || scores.length === 0) return 'Нет оценок';
  const sum = scores.reduce((acc, score) => acc + Number(score), 0);
  return (sum / scores.length).toFixed(2);
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

const sortedCourses = (user: any) => {
  const order = ['firstCourse', 'secondCourse', 'thirdCourse', 'fourthCourse', 'fifthCourse'];
  return order.filter(courseKey => user?.score?.[courseKey]);
};

const getAllScores = (user: any) => {
  if (!user || !user.score) return [];
  const courses = ['firstCourse', 'secondCourse', 'thirdCourse', 'fourthCourse', 'fifthCourse'];
  return courses.flatMap(courseKey =>
      Object.values(user.score[courseKey] || {}).flatMap(scores =>
          Array.isArray(scores) ? scores : []
      )
  );
};

const getTotalScore = (user: any) => {
  const allScores = getAllScores(user);
  return allScores.reduce((sum, score) => sum + Number(score), 0);
};

const getOverallAverage = (user: any) => {
  const allScores = getAllScores(user);
  return allScores.length
      ? (allScores.reduce((sum, score) => sum + Number(score), 0) / allScores.length).toFixed(2)
      : 0;
};

onMounted(async () => {
  await getAllUsers();
  await fetchGroups()
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
        <section class="user-scores">
          <div
              v-for="courseKey in sortedCourses(user)"
              :key="courseKey"
              class="user-scores-block"
          >
            <template v-if="user.score[courseKey]">
              <span class="course">{{ convertCourseName(courseKey) }}</span>
              <div
                  v-for="(scores, subject) in user.score[courseKey]"
                  :key="subject"
                  class="subject-scores"
              >
                <span class="user-span">{{ subject }}</span>
                <span :style="{ color: getAverageColor(scores) }">
                  {{ calculateAverage(scores) }}
                </span>
              </div>
              <hr>
              <div class="course-average">
                <span>Средний балл:</span>
                <span :style="{ color: getAverageColor(getCourseScores(user.score[courseKey])) }">
                  {{ calculateAverage(getCourseScores(user.score[courseKey])) }}
                </span>
              </div>
              <hr>
            </template>
            <span v-else>
              нет оценок
            </span>
          </div>
        </section>
        <hr>
        <section class="course-sum">
          <span>Средний балл по всем курсам: </span>
          <span :style="{ color: getAverageColor(getAllScores(user)) }">
            {{ getOverallAverage(user) }}
          </span>
        </section>
        <section class="course-sum">
          <span>Общий балл по всем курсам: </span>
          <span>{{ getTotalScore(user) }}</span>
        </section>
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
          <AdminpanelActionsMoloPostScores :user="user"/>
          <AdminpanelActionsMoloPostStatus :user="user"/>
          <AdminpanelActionsMoloPostAchievement :user="user"/>
          <AdminpanelActionsMoloPostLearning :user="user"/>
          <AdminpanelActionsMoloPostSpecialty :user="user"/>
          <AdminpanelActionsMoloPostGroup :user="user"/>
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
    <section class="actions">
      <AdminpanelActionsMoloPostNewSpecialty/>
      <AdminpanelActionsMoloPostNewUser/>
      <AdminpanelActionsMoloPostNewGroup @saved="fetchGroups"/>
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
  color: var(--dk-span-color);

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
  flex-direction: column;
  gap: 15px;
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 8px ;
  & .user-scores-block {
    display: flex;
    flex-direction: column;
    min-height: fit-content;
    gap: 10px;
  }
  & .course {
    border: 1px solid var(--dk-border-color);
    width: fit-content;
    padding: 5px 10px;
    border-radius: 10px;
    box-sizing: border-box;
    background-color: var(--dk-bg-ins-color);
  }
  & .subject-scores {
    display: flex;
    justify-content: space-between;
  }
  & .course-average {
    display: flex;
    justify-content: space-between;
  }
  &::-webkit-scrollbar {
    width: 10px;

  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--dk-border-color);
    border-radius: 20px;
    border: 4px solid transparent;
  }
}

.course-sum {
  display: flex;
  justify-content: space-between;
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

@media (max-width: 765px) {
  .actions {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

</style>