<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue';
import dayjs from 'dayjs';

const groups = ref<Array<any>>([])
const emit = defineEmits<{
  (e: 'saved'): void
}>();

const fetchGroups = async () => {
  try {
    const response = await $fetch('/api/groups');
    groups.value = response.groups || [];
  } catch (error) {
    console.error("Ошибка при получении списка групп:", error);
    statusMessage.value = 'Не удалось загрузить список групп.';
  }
};


const sortedGroups = computed(() =>
    [...groups.value].sort((a: any, b) => a.name.localeCompare(b.name, 'ru'))
);


const userStore = useUserStore();
const subjects = ref<string[]>([]);
const teachers = ref<string[]>([]);
const showScheduleModal = ref(false);
const selectedDate = ref(dayjs().format('YYYY-MM-DD'));
const selectedGroup = ref<string | null>(null);
const selectedSubject: any = ref<string | null>(null);
const selectedTime: any = ref<string | null>(null);
const selectedCabinet: any = ref<string | null>(null);
const selectedTeacher: any = ref<string | null>(null);
const selectedTypeOfLesson: any = ref<string | null>(null);
const selectedCommon: any = ref<null | string>(null);
const selectedSubgroup1: any = ref<string | null>(null);
const selectedSubgroup1Teacher: any = ref<string | null>(null);
const selectedSubgroup2: any = ref<string | null>(null);
const selectedSubgroup2Teacher: any = ref<string | null>(null);
const statusMessage: any = ref<string | null>(null);
const scheduleData: any = ref(null);


const resetForm = () => {
  selectedGroup.value = null
  selectedSubject.value = null;
  selectedTime.value = null;
  selectedCabinet.value = null;
  selectedTeacher.value = null;
  selectedTypeOfLesson.value = null;
  selectedCommon.value = null;
  selectedSubgroup1.value = null;
  selectedSubgroup1Teacher.value = null;
  selectedSubgroup2.value = null;
  selectedSubgroup2Teacher.value = null;
  selectedTime.value = null;
};

const fetchLessons = async () => {
  try {
    const response = await $fetch('/api/lessons');
    subjects.value = response.lessons
        .map((l: any) => l.name)
        .sort((a: string, b: string) => a.localeCompare(b, 'ru'));
  } catch (error) {
    console.error('Ошибка при получении предметов:', error);
  }
};

const fetchTeachers = async () => {
  try {
    const response = await $fetch('/api/teachers');
    teachers.value = response.teachers
        .map((l: any) => l.name)
        .sort((a: string, b: string) => a.localeCompare(b, 'ru'));
  } catch (error) {
    console.error('Ошибка при получении преподавателей:', error);
  }
};


const addSchedule = async () => {
  if (
      !selectedDate.value ||
      !selectedGroup.value ||
      !selectedSubject.value ||
      !selectedTime.value ||
      !selectedTypeOfLesson.value ||
      selectedCommon.value === null
  ) {
    statusMessage.value = 'Пожалуйста, заполните все поля.';
    return;
  }

  const isCommon = selectedCommon.value === 'true';

  const normalizeValue = (val: string | null) => (val && val.trim() !== '' ? val : 'Не указан');
  const formatCabinet = (val: string | null) => {
    const normalized = normalizeValue(val);
    return normalized === 'Не указан' ? normalized : `${normalized} кабинет`;
  };

  const payload = {
    date: selectedDate.value,
    groups: [
      {
        groupName: selectedGroup.value,
        lessons: [
          {
            time: selectedTime.value,
            subject: selectedSubject.value,
            teacher: isCommon ? normalizeValue(selectedTeacher.value) : 'Не указан',
            cabinet: isCommon ? formatCabinet(selectedCabinet.value) : 'Не указан',
            typeOfLesson: selectedTypeOfLesson.value,
            conditionOfLesson: isCommon
                ? {
                  common: formatCabinet(selectedCabinet.value),
                  subgroup1: { cabinet: 'Не указан', teacher: 'Не указан' },
                  subgroup2: { cabinet: 'Не указан', teacher: 'Не указан' },
                }
                : {
                  common: 'Не указан',
                  subgroup1: {
                    cabinet: formatCabinet(selectedSubgroup1.value),
                    teacher: normalizeValue(selectedSubgroup1Teacher.value),
                  },
                  subgroup2: {
                    cabinet: formatCabinet(selectedSubgroup2.value),
                    teacher: normalizeValue(selectedSubgroup2Teacher.value),
                  },
                },
          },
        ],
      },
    ],
  };

  try {
    statusMessage.value = 'Идёт создание расписания...';

    const savedSchedule = await userStore.addSchedule(payload);  // Сохраняем расписание
    statusMessage.value = 'Расписание успешно добавлено!';
    resetForm();

    emit('saved');

    // Убедимся, что scheduleData.value — это массив
    if (!Array.isArray(scheduleData.value)) {
      scheduleData.value = []; // Инициализируем, если это null или undefined
    }

    // Добавляем новое расписание в локальное состояние
    scheduleData.value.push(savedSchedule);

    setTimeout(() => {
      showScheduleModal.value = false;
      statusMessage.value = '';
    }, 1500);
  } catch (err: any) {
    console.error('Ошибка при добавлении расписания:', err);
    if (err.response) {
      console.error('Детали ошибки с сервера:', err.response);
    }
    statusMessage.value = 'Не удалось добавить расписание.';
  }
};


watch(selectedCommon, (val) => {
  if (val === 'true') {
    selectedSubgroup1.value = '';
    selectedSubgroup1Teacher.value = '';
    selectedSubgroup2.value = '';
    selectedSubgroup2Teacher.value = '';
  }
});

const modalTitle = computed(() => 'Добавление нового расписания');

onMounted(() => {
  fetchLessons()
  fetchTeachers()
  fetchGroups()
})
</script>

<template>
    <AdminpanelUIMoloButton type="primary" @click="showScheduleModal = true">
      Добавить новое расписание
    </AdminpanelUIMoloButton>


  <AdminpanelUIMoloModal
      :statusMessage="statusMessage"
      :title="modalTitle"
      :visible="showScheduleModal"
      @close="showScheduleModal = false"
  >
    <template #select>
      <label>Дата:</label>
      <AdminpanelUIMoloInput v-model="selectedDate" type="date"/>

      <label>Группа:</label>
      <AdminpanelUIMoloSelect v-model="selectedGroup">
        <option disabled :value="null">Выберите группу</option>
        <option v-for="(group, idx) in sortedGroups" :key="idx" :value="group.name">{{ group.name }}</option>
      </AdminpanelUIMoloSelect>

      <label>Предмет:</label>
      <AdminpanelUIMoloSelect v-model="selectedSubject">
        <option disabled :value="null">Выберите предмет</option>
        <option v-for="(subject, i) in subjects" :key="i" :value="subject">
          {{ subject }}
        </option>
      </AdminpanelUIMoloSelect>


      <label>Есть ли деление на подгруппы?</label>
      <AdminpanelUIMoloSelect v-model="selectedCommon">
        <option disabled :value="null">Выберите...</option>
        <option value="true">Нет, общее занятие</option>
        <option value="false">Да, деление на подгруппы</option>
      </AdminpanelUIMoloSelect>

      <!-- Только для общего занятия -->
      <section class="choice" v-if="selectedCommon === 'true'">
        <label>Кабинет:</label>
        <AdminpanelUIMoloInput v-model="selectedCabinet" placeholder="Номер кабинета"/>

        <label>Преподаватель:</label>
        <AdminpanelUIMoloSelect v-model="selectedTeacher">
          <option disabled :value="null">Выберите преподавателя</option>
          <option v-for="(teacher, i) in teachers" :key="i" :value="teacher">{{ teacher }}</option>
        </AdminpanelUIMoloSelect>

      </section>

      <!-- Только если есть подгруппы -->
      <section class="choice" v-else-if="selectedCommon === 'false'">
        <label>Кабинет 1 подгруппы:</label>
        <AdminpanelUIMoloInput v-model="selectedSubgroup1" placeholder="Номер кабинета"/>

        <label>Преподаватель 1 подгруппы:</label>
        <AdminpanelUIMoloSelect v-model="selectedSubgroup1Teacher">
          <option disabled :value="null">Выберите преподавателя</option>
          <option v-for="(teacher, i) in teachers" :key="i" :value="teacher">{{ teacher }}</option>
        </AdminpanelUIMoloSelect>

        <label>Кабинет 2 подгруппы:</label>
        <AdminpanelUIMoloInput v-model="selectedSubgroup2" placeholder="Номер кабинета"/>

        <label>Преподаватель 2 подгруппы:</label>
        <AdminpanelUIMoloSelect v-model="selectedSubgroup2Teacher">
          <option disabled :value="null">Выберите преподавателя</option>
          <option v-for="(teacher, i) in teachers" :key="i" :value="teacher">{{ teacher }}</option>
        </AdminpanelUIMoloSelect>
      </section>

      <label>Тип предмета:</label>
      <AdminpanelUIMoloSelect v-model="selectedTypeOfLesson">
        <option disabled :value="null">Выберите тип</option>
        <option value="Лекция">Лекция</option>
        <option value="Практика">Практика</option>
        <option value="Лабораторная работа">Лабораторная работа</option>
        <option value="Самостоятельная работа">Самостоятельная работа</option>
        <option value="Консультация">Консультация</option>
        <option value="Экзамен">Экзамен</option>
      </AdminpanelUIMoloSelect>

      <label>Время:</label>
      <AdminpanelUIMoloSelect v-model="selectedTime">
        <option disabled :value="null">Выберите время</option>
        <option value="8:30-10:50">8:30-10:50</option>
        <option value="11:00-12:30">11:00-12:30</option>
        <option value="13:30-13:50">13:30-13:50</option>
        <option value="14:00-15:20">14:00-15:20</option>
        <option value="15:30-16:50">15:30-16:50</option>
        <option value="17:00-18:20">17:00-18:20</option>
        <option value="18:30-19:50">18:30-19:50</option>
        <option value="20:00-21:20">20:00-21:20</option>
      </AdminpanelUIMoloSelect>
    </template>

    <template #confirm-button>
      <AdminpanelUIMoloButton type="confirm" @click="addSchedule">
        Подтвердить
      </AdminpanelUIMoloButton>
    </template>

    <template #status>
      <span>{{ statusMessage }}</span>
    </template>

    <template #cancel-button>
      <AdminpanelUIMoloButton type="cancel" @click="showScheduleModal = false">
        Отмена
      </AdminpanelUIMoloButton>
    </template>
  </AdminpanelUIMoloModal>
</template>

<style scoped>

.choice {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

</style>


