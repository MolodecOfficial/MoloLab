<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type {UserSchema} from "~/types/User";

const props = defineProps({
  user: Object
});

const userStore = useUserStore();

const selectedUserId = ref<string | null>(null);
const selectedUserName = ref('');
const selectedScore: any = ref<number | null>(null);
const selectedSubject: any = ref<string | null>(null);
const selectedCourse = ref<keyof UserSchema['score'] | null>(null);
const showScoresModal = ref(false);
const statusMessage = ref('');
const availableSubjects = ref<string[]>([]);

const openScoresModal = (user: any) => {
  selectedUserId.value = user._id;
  selectedUserName.value = `${user.firstName} ${user.lastName}`;
  selectedScore.value = null;
  selectedSubject.value = null;
  selectedCourse.value = null;
  showScoresModal.value = true;
};

const updateUserScores = async () => {
  if (!selectedUserId.value || !selectedSubject.value || !selectedScore.value || !selectedCourse.value) {
    statusMessage.value = 'Заполните все поля';
    return;
  }

  try {
    statusMessage.value = 'Идёт добавление оценки...';
    await userStore.addScore(
        selectedUserId.value,
        selectedSubject.value,
        selectedScore.value,
        selectedCourse.value
    );
    statusMessage.value = 'Оценка успешно добавлена!';
    setTimeout(() => {
      showScoresModal.value = false;
      statusMessage.value = '';
    }, 1500);
  } catch (error) {
    statusMessage.value = 'Произошла ошибка со стороны сервера';
  }
};

async function fetchAvailableSubjects() {
  try {
    const response = await fetch('/api/lessons');
    const data = await response.json();
    availableSubjects.value = data.lessons.sort((a, b) =>
        a.name.localeCompare(b.name, 'ru')
    );
  } catch (error) {
    console.error('Ошибка при загрузке предметов:', error);
  }
}

const scoresTitle = computed(
    () => `Выдача оценок пользователю ${selectedUserName.value}`
);

onMounted(fetchAvailableSubjects);
</script>

<template>
  <AdminpanelMoloButton
      type="scores"
      @click="openScoresModal(user)"
  >
    Добавление оценки
  </AdminpanelMoloButton>

  <AdminpanelUIMoloModal
      :statusMessage="statusMessage"
      :title="scoresTitle"
      :visible="showScoresModal"
      @close="showScoresModal = false"
  >
    <template #select>
      <label for="course-select">Курс:</label>
      <AdminpanelMoloSelect v-model="selectedCourse" class="select">
        <option value="" disabled>Выберите курс</option>
        <option value="firstCourse">1 курс</option>
        <option value="secondCourse">2 курс</option>
        <option value="thirdCourse">3 курс</option>
        <option value="fourthCourse">4 курс</option>
        <option value="fifthCourse">5 курс</option>
      </AdminpanelMoloSelect>

      <label for="subject-select">Предмет:</label>
      <AdminpanelMoloSelect v-model="selectedSubject" class="select">
        <option value="" disabled>Выберите предмет</option>
        <option
            v-for="subject in availableSubjects"
            :key="subject._id"
            :value="subject.name"
        >
          {{ subject.name }}
        </option>
      </AdminpanelMoloSelect>

      <label for="score-select">Оценка:</label>
      <AdminpanelMoloSelect v-model.number="selectedScore" class="select">
        <option value="" disabled>Выберите оценку</option>
        <option :value="5">Отлично</option>
        <option :value="4">Хорошо</option>
        <option :value="3">Удовлетворительно</option>
        <option :value="2">Неудовлетворительно</option>
        <option :value="1">Плохо</option>
      </AdminpanelMoloSelect>
    </template>

    <template #confirm-button>
      <AdminpanelMoloButton
          type="confirm"
          @click="updateUserScores"
      >
        Подтвердить
      </AdminpanelMoloButton>
    </template>

    <template #status>
      <span>{{ statusMessage }}</span>
    </template>

    <template #cancel-button>
      <AdminpanelMoloButton
          type="cancel"
          @click="showScoresModal = false"
      >
        Отмена
      </AdminpanelMoloButton>
    </template>
  </AdminpanelUIMoloModal>
</template>

<style scoped>

</style>