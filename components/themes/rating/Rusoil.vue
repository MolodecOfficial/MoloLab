<script setup lang="ts">
import {ref} from "vue";

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

// Загрузка данных
async function getAllScores() {
  try {
    await userStore.getUsers();


    // Сортировка
    userStore.users.sort((a, b) => {
      const valA = parseFloat(a[sortField.value]) || 0;
      const valB = parseFloat(b[sortField.value]) || 0;
      return sortDirection.value === 'desc' ? valB - valA : valA - valB;
    });

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

useHead({
  title: 'MoloLab | Рейтинг'
})
</script>

<template>
  <AccountMoloMobile title="Рейтинг">
    <section class="rating-container">
      <!-- Статистика текущего пользователя -->
      <div class="user-stats-card">
        <div class="stats-header">
          <h3>Ваше место в рейтинге</h3>
          <div class="ranking-badge">{{ userRanking }}</div>
        </div>

        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-label">Средний балл</div>
            <div class="stat-value">{{ userAverageScore }}</div>
          </div>

          <div class="stat-item">
            <div class="stat-label">Общий балл</div>
            <div class="stat-value">{{ userGeneralScore }}</div>
          </div>
        </div>
      </div>

      <!-- Фильтры и поиск -->
      <div class="controls-row">
        <div class="search-box">
          <input
              v-model="searchQuery"
              placeholder="Поиск по имени или группе"
              class="search-input"
          >
          <svg class="search-icon" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>

        <div class="sort-controls">
          <button
              :class="{ active: sortField === 'generalScore' }"
              @click="toggleSort('generalScore')"
          >
            Общий балл
            <svg v-if="sortField === 'generalScore'" width="12" height="12" viewBox="0 0 24 24">
              <path v-if="sortDirection === 'desc'" d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/>
              <path v-else d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/>
            </svg>
          </button>

          <button
              :class="{ active: sortField === 'averageScore' }"
              @click="toggleSort('averageScore')"
          >
            Средний балл
            <svg v-if="sortField === 'averageScore'" width="12" height="12" viewBox="0 0 24 24">
              <path v-if="sortDirection === 'desc'" d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/>
              <path v-else d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Список рейтинга -->
      <div class="rating-list">
        <div
            v-for="(user, index) in filteredUsers"
            :key="index"
            :class="['user-card', { 'current-user': currentUser && user.email === currentUser.email }]"
        >
          <div class="user-rank">{{ index + 1 }}</div>

          <div class="user-info">
            <div class="user-name">
              {{ user.firstName }} {{ user.lastName }}
            </div>
            <div class="user-group">
              {{ user.group || 'Группа не указана' }}
            </div>
          </div>

          <div class="user-scores">
            <div class="score-item">
              <span class="score-label">Общий:</span>
              <span class="score-value">{{ user.generalScore || '0' }}</span>
            </div>
            <div class="score-item">
              <span class="score-label">Средний:</span>
              <span class="score-value">{{ user.averageScore || '0.0' }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </AccountMoloMobile>
</template>

<style scoped>
.rating-container {
  width: 85%;
  padding-bottom: 100px;
}

.user-stats-card {
  background: white;
  border-radius: 16px;
  padding: 20px 10px;
  margin-bottom: 20px;
}

.stats-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.stats-header h3 {
  font-size: 1.2rem;
  color: #343a40;
  margin: 0;
}

.ranking-badge {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #243aaa, #4e45e3);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.stat-item {
  background: #f1f3f5;
  border-radius: 12px;
  padding: 15px;
  text-align: center;
}

.stat-label {
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 6px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #495057;
}

.controls-row {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.search-box {
  position: relative;
}

.search-input {
  box-sizing: border-box;
  width: 100%;
  padding: 14px 20px 14px 45px;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  background: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #243aaa;
  outline: none;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  fill: #adb5bd;
}

.sort-controls {
  display: flex;
  gap: 10px;
}

.sort-controls button {
  flex: 1;
  padding: 12px 15px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  color: #495057;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sort-controls button.active {
  background: #f3f0ff;
  border-color: #bfccff;
  color: #243aaa;
  font-weight: 500;
}

.sort-controls button:hover {
  background: #f8f9fa;
}

.rating-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-card {
  background: white;
  border-radius: 16px;
  padding: 18px;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-card:hover {
  transform: translateY(-2px);
}

.user-card.current-user {
  border-left: 4px solid #243aaa;
  background: linear-gradient(to right, #ffffff, #faf5ff);
}

.user-rank {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f3f5;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1.1rem;
  color: #495057;
  margin-right: 15px;
}

.user-card.current-user .user-rank {
  background: #dde0ff;
  color: #243aaa;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: #212529;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-group {
  font-size: 0.9rem;
  color: #6c757d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-scores {
  display: flex;
  flex-direction: column;
  gap: 6px;

  text-align: right;
}

.score-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: end;
  gap: 6px;
}

.score-label {
  font-size: 0.8rem;
  color: #868e96;
}

.score-value {
  font-weight: 600;
  font-size: 1rem;
  color: #495057;
  min-width: 40px;
  text-align: end;
}

@media (max-width: 480px) {
  .user-card {
    padding: 15px;
  }

  .user-scores {
    flex-direction: row;
    gap: 12px;
  }

  .score-item {
    flex-direction: column;
    gap: 2px;
  }

  .score-label {
    font-size: 0.7rem;
  }

  .score-value {
    font-size: 0.95rem;
  }
}
</style>