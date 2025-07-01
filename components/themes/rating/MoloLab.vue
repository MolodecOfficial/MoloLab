<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "~/stores/userStore";

// Состояния
const userAverageScore = ref('0.0');
const userGeneralScore = ref('0');
const userRanking = ref('0');
const currentUser = ref<any>(null);
const userStore = useUserStore();

// Фильтры и сортировка
const sortField = ref<'generalScore' | 'averageScore'>('generalScore');
const sortDirection = ref<'asc' | 'desc'>('desc');
const searchQuery = ref('');

const loading = ref(false);

// Загрузка данных
async function getAllScores() {
  loading.value = true;
  try {
    await userStore.getUsers();
    // Сортировка
    userStore.users.sort((a, b) => {
      const valA = parseFloat(a[sortField.value]) || 0;
      const valB = parseFloat(b[sortField.value]) || 0;
      return sortDirection.value === 'desc' ? valB - valA : valA - valB;
    });
    loading.value = false;
    // Определение текущего пользователя
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      currentUser.value = JSON.parse(storedUser);
      const rankIndex = userStore.users.findIndex(
          user => user.email === currentUser.value.email
      );
      if (rankIndex !== -1) {
        userRanking.value = String(rankIndex + 1);
        userGeneralScore.value = currentUser.value.generalScore || '0';
        userAverageScore.value = currentUser.value.averageScore || '0';

      }
    }
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error);
  }
}

// Фильтрация пользователей
const filteredUsers = computed(() => {
  if (!searchQuery.value) return userStore.users;

  return userStore.users.filter(user => {
    const search = searchQuery.value.toLowerCase();
    return (
        user.firstName.toLowerCase().includes(search) ||
        user.lastName.toLowerCase().includes(search) ||
        user.group?.toLowerCase().includes(search)
    );
  });
});

onMounted(() => {
  getAllScores();
});

// Переключение сортировки
function toggleSort(field: 'generalScore' | 'averageScore') {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'desc' ? 'asc' : 'desc';
  } else {
    sortField.value = field;
    sortDirection.value = 'desc';
  }
  getAllScores();
}
</script>

<template>
  <AccountPatternsMoloLab>
    <AdminpanelUIMoloLoader :is-loading="loading" class="loader"/>

    <div class="rating-container">

      <!-- Заголовок и статистика текущего пользователя -->
      <div class="rating-header">
        <h2>Рейтинг студентов</h2>

        <div class="user-stats">
          <div class="stat-card">
            <div class="stat-value">{{ userRanking }}</div>
            <div class="stat-label">Ваше место</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ userGeneralScore }}</div>
            <div class="stat-label">Общий балл</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ userAverageScore }}</div>
            <div class="stat-label">Средний балл</div>
          </div>
        </div>
      </div>

      <!-- Фильтры и сортировка -->
      <div class="rating-controls">
        <div class="search-box">
          <input
              v-model="searchQuery"
              placeholder="Поиск по имени, фамилии или группе"
              class="search-input"
          >
          <svg viewBox="0 0 24 24" class="search-icon">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"/>
          </svg>
        </div>

        <div class="sort-buttons">
          <button
              @click="toggleSort('generalScore')"
              :class="{ active: sortField === 'generalScore' }"
              class="sort-button"
          >
            Общий балл
            <svg viewBox="0 0 24 24" class="sort-icon">
              <path d="M7 15l5 5m0 0l5-5m-5 5V4"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>
            </svg>
          </button>
          <button
              @click="toggleSort('averageScore')"
              :class="{ active: sortField === 'averageScore' }"
              class="sort-button"
          >
            Средний балл
            <svg viewBox="0 0 24 24" class="sort-icon">
              <path d="M7 15l5 5m0 0l5-5m-5 5V4"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Таблица рейтинга -->
      <div class="rating-table">
        <div class="table-header">
          <div class="header-cell rank">Место</div>
          <div class="header-cell name">Студент</div>
          <div class="header-cell group">Группа</div>
          <div class="header-cell score" @click="toggleSort('generalScore')">
            Общий балл
            <svg viewBox="0 0 24 24" class="sort-arrow">
              <path d="M7 15l5 5m0 0l5-5m-5 5V4"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="header-cell score" @click="toggleSort('averageScore')">
            Средний балл
            <svg viewBox="0 0 24 24" class="sort-arrow">
              <path d="M7 15l5 5m0 0l5-5m-5 5V4"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>
            </svg>
          </div>
        </div>

        <div class="table-body">
          <div
              v-for="(user, index) in filteredUsers"
              :key="user._id"
              class="table-row"
              :class="{ current: currentUser && user.email === currentUser.email }"
          >
            <div class="cell rank">{{ index + 1 }}</div>
            <div class="cell name">
              {{ user.firstName }} {{ user.lastName }}
            </div>
            <div class="cell group">{{ user.group || '—' }}</div>
            <div class="cell score">{{ user.generalScore || '0' }}</div>
            <div class="cell score">{{ user.averageScore || '0.0' }}</div>
          </div>
        </div>
      </div>
    </div>
  </AccountPatternsMoloLab>
</template>

<style scoped>

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
}


.rating-container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

.rating-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.rating-header h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: white;
  margin: 0;
  background: linear-gradient(90deg, #ffffff, #e0e0e0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.user-stats {
  display: flex;
  gap: 12px;
}

.stat-card {
  background: rgba(32, 32, 35, 0.7);
  border-radius: 12px;
  padding: 16px 20px;
  min-width: 100px;
  text-align: center;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #68d391;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

.rating-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.search-box {
  position: relative;
  flex-grow: 1;
  max-width: 400px;
}

.search-input {
  width: 100%;
  background: rgba(32, 32, 35, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 16px 12px 40px;
  color: white;
  font-family: inherit;
  font-size: 0.95rem;
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.7);
}

.sort-buttons {
  display: flex;
  gap: 8px;
}

.sort-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: rgba(32, 32, 35, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(12px);
}

.sort-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.sort-button.active {
  background: rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.3);
  color: white;
}

.sort-icon {
  width: 16px;
  height: 16px;
}

.rating-table {
  background: rgba(32, 32, 35, 0.5);
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.table-header {
  display: grid;
  grid-template-columns: 80px 1fr 120px 100px 100px;
  background: rgba(255, 255, 255, 0.05);
  padding: 14px 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
}

.header-cell {
  display: flex;
  align-items: center;
  gap: 6px;
}

.header-cell.score {
  cursor: pointer;
  transition: color 0.2s ease;
}

.header-cell.score:hover {
  color: white;
}

.sort-arrow {
  width: 14px;
  height: 14px;
  opacity: 0.7;
}

.table-body {
  max-height: 500px;
  overflow-y: auto;
}

.table-body::-webkit-scrollbar {
  width: 10px;
}

.table-body::-webkit-scrollbar-track {
  background: transparent;
}

.table-body::-webkit-scrollbar-thumb {
  background-color: var(--dk-border-color);
  border-radius: 20px;
  border: 4px solid transparent;
}


.table-row {
  display: grid;
  grid-template-columns: 80px 1fr 120px 100px 100px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background: rgba(255, 255, 255, 0.05);
}

.table-row.current {
  background: rgba(102, 126, 234, 0.15);
  position: relative;
}

.table-row.current::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #667eea;
}

.cell {
  display: flex;
  align-items: center;
  padding: 4px 0;
  color: white;
}

.cell.rank {
  font-weight: 500;
  color: #f6ad55;
}

.cell.name {
  font-weight: 500;
  color: white;
}

.cell.score {
  font-family: 'Courier New', monospace;
  font-weight: 500;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .table-header,
  .table-row {
    grid-template-columns: 60px 1fr 100px 80px 80px;
  }

  .header-cell,
  .cell {
    font-size: 0.9rem;
  }

  .rating-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    max-width: none;
  }
}

@media (max-width: 480px) {
  .rating-container {
    padding: 16px;
  }

  .user-stats {
    width: 100%;
    justify-content: space-between;
  }

  .stat-card {
    flex: 1;
    padding: 12px;
  }

  .table-header {
    display: none;
  }

  .table-row {
    grid-template-columns: 1fr;
    padding: 16px;
    gap: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .cell::before {
    content: attr(data-label);
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
    margin-right: 8px;
    min-width: 100px;
  }

  .cell.rank::before { content: 'Место'; }
  .cell.name::before { content: 'Студент'; }
  .cell.group::before { content: 'Группа'; }
  .cell.score:nth-of-type(1)::before { content: 'Общий балл'; }
  .cell.score:nth-of-type(2)::before { content: 'Средний балл'; }
}
</style>