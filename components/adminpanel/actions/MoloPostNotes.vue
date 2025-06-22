<script lang="ts" setup>
import { ref } from "vue";

const isOpen = ref(false);
const statusMessage = ref('');
const notes = ref<any[]>(loadNotes());
const newBody = ref('');
const currentNoteIndex = ref<number | null>(null);

const addNote = () => {
  if (!newBody.value.trim()) {
    statusMessage.value = 'Текст заметки не может быть пустым!';
    return;
  }
  const newNote = {
    id: Date.now(),
    body: newBody.value
  };
  statusMessage.value = 'Идёт создание заметки...';
  notes.value.push(newNote);
  saveNotes();
  statusMessage.value = 'Заметка создана!';
  setTimeout(() => {
    closeModal();
    statusMessage.value = '';
  }, 1500);
  console.log(currentNoteIndex.value)
};

const removeNote = (index: number) => {
  notes.value.splice(index, 1);
  saveNotes();
};

const openModal = () => {
  isOpen.value = true;
  currentNoteIndex.value = null;
  newBody.value = '';
};

const closeModal = () => {
  isOpen.value = false;
  newBody.value = '';
  currentNoteIndex.value = null;
};

function loadNotes() {
  if (typeof window === 'undefined') return [];
  const savedNotes = window.localStorage.getItem('notes');
  try {
    const parsedNotes = savedNotes ? JSON.parse(savedNotes) : [];
    return parsedNotes.filter(note => note.id && note.body);
  } catch (error) {
    console.error('Ошибка при загрузке заметок:', error);
    window.localStorage.removeItem('notes');
    return [];
  }
}

function saveNotes() {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('notes', JSON.stringify(notes.value));
}

const editNote = (index: number) => {
  currentNoteIndex.value = index;
  console.log(currentNoteIndex.value)
  newBody.value = notes.value[index].body;
  isOpen.value = true;
};

const saveEdit = () => {
  if (!newBody.value.trim()) {
    statusMessage.value = 'Текст заметки не может быть пустым!';
    return;
  }
  if (currentNoteIndex.value !== null) {
    notes.value[currentNoteIndex.value].body = newBody.value;
    saveNotes();
    statusMessage.value = 'Заметка обновлена!';
    setTimeout(() => {
      closeModal();
      statusMessage.value = '';
    }, 1500);
  }
};

onMounted(() => {
  notes.value = loadNotes();
});

</script>

<template>
  <section class="sections_notes">
    <span>Заметки</span>
    <section v-if="notes.length === 0" class="notes">
      Нет заметок, создайте сейчас!
    </section>
    <section v-else class="note-list">
      <div class="notes-container">
        <div
            v-for="(noteItem, index) in notes"
            :key="noteItem.id"
            class="note-item"
        >
          <div class="note-content">
            {{ noteItem.body }}
          </div>
          <section class="actions">
            <button class="img" @click="editNote(index)">
              <img src="/public/adminPanel/edit.png" alt="">
            </button>
            <button class="img" @click="removeNote(index)">
              <img src="/public/adminPanel/delete.png" alt="">
            </button>
          </section>
        </div>
      </div>
    </section>
    <section class="add">
      <button class="add-note" @click="openModal">
        <img alt="" src="/public/adminPanel/add.png">
      </button>
    </section>

    <AdminpanelUIMoloModal
        :visible="isOpen"
        :title="currentNoteIndex !== null ? 'Изменение вашей заметки' : 'Ваша новая заметка'"
    >
      <template #body>
        <AdminpanelMoloInput
            v-model="newBody"
            class="input"
            :placeholder="currentNoteIndex !== null ? 'Введите новый текст...' : 'Введите текст заметки...'"
        />
      </template>
      <template #confirm-button>
        <AdminpanelMoloButton
            type="confirm"
            @click="currentNoteIndex !== null ? saveEdit() : addNote()"
        >
          {{ currentNoteIndex !== null ? 'Сохранить' : 'Добавить' }}
        </AdminpanelMoloButton>
      </template>

      <template #status>
        <span class="ok">
          {{ statusMessage }}
        </span>
      </template>
      <template #cancel-button>
        <AdminpanelMoloButton
            type="cancel"
            @click="closeModal"
        >
          Отмена
        </AdminpanelMoloButton>
      </template>
    </AdminpanelUIMoloModal>
  </section>
</template>

<style scoped>
.sections_notes {
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: #2c2c2c;
  border-radius: 10px;
  gap: 20px;
  padding: 20px;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  & span {
    text-align: center;
    font-weight: bolder;
  }

  & .ok {
    font-weight: normal;
  }
}

.add {
  display: flex;
  justify-content: center;
}
.add-note {
  width: fit-content;
  display: flex;
  background-color: transparent;
  border: none;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  & img {
    width: 70%;
    display: block;
  }
  &:hover {
    transform: rotate(180deg);
  }
}

.notes-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
  padding: 0;
  margin: 0;
  width: 100%;
}

.note-item {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #4a4a4a;
  margin: 0;
}

.note-content {
  text-align: start;
}

.actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: max-content;
  flex-shrink: 0;
}

.img {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  margin: 0;
  padding: 0;
  & img {
    width: 50%;
    object-fit: contain;
    display: block;
  }
  &:hover {
    scale: 1.2;
  }
}
</style>