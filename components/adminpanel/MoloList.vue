<script setup lang="ts">
const props = defineProps<{
  title: string;
  items: any[];
  expandedItemsIds?: string[];
  itemKey: (item: any) => string | number;
  itemTitle: (item: any) => string;
  showList: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggle-expand', id: string): void;
  (e: 'toggle-show-list'): void;
}>();

const isExpanded = (id: string) => {
  if (!props.expandedItemsIds) return false;
  return props.expandedItemsIds.includes(String(id));
};

const toggleItem = (id: string) => {
  emit('toggle-expand', String(id));
};

const toggleShowList = () => {
  emit('toggle-show-list');
};
</script>

<template>
  <section class="schedule-section">
    <div class="header">
      <span>{{ title }}</span>
      <button class="show-hide-btn" @click="toggleShowList">
        {{ showList ? 'Скрыть список' : 'Показать список' }}
        <img
            :class="{ rotated: showList }"
            alt="Показать/Скрыть"
            src="/public/adminPanel/down.png"
        />
      </button>
    </div>

    <section class="lessons-wrapper" :class="{ show: showList }">
      <section
          class="lessons"
          v-for="(item, idx) in items"
          :key="itemKey(item)"
      >
        <span>{{ idx + 1 }} - {{ itemTitle(item) }}</span>

        <slot
            name="details"
            :item="item"
            :is-expanded="isExpanded(itemKey(item))"
            :toggle="() => toggleItem(itemKey(item))"
        />

        <button class="toggle-item-btn" @click="toggleItem(itemKey(item))">
          {{ isExpanded(itemKey(item)) ? 'Скрыть детали' : 'Показать детали' }}
          <img
              :class="{ rotated: isExpanded(itemKey(item)) }"
              alt="Раскрыть"
              src="/public/adminPanel/down.png"
          />
        </button>
      </section>
    </section>
  </section>
</template>

<style scoped>
.schedule-section {
  border: 1px solid var(--dk-border-color);
  background-color: var(--dk-bg-color);
  color: white;
  border-radius: 10px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.show-hide-btn {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 600;
}

.show-hide-btn img {
  width: 16px;
  transition: transform 0.3s ease;
}

.show-hide-btn img.rotated {
  transform: rotate(180deg);
}

.lessons-wrapper {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.5s ease, opacity 0.3s ease;
}

.lessons-wrapper.show {
  max-height: 1000px; /* достаточно большой, чтобы вместить список */
  opacity: 1;
  overflow-y: auto;
}

.lessons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}

.toggle-item-btn {
  background: transparent;
  border: none;
  color: var(--dk-span-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9em;
  margin-left: 20px;
  padding: 0;
}

.toggle-item-btn img {
  width: 14px;
  transition: transform 0.3s ease;
}

.toggle-item-btn img.rotated {
  transform: rotate(180deg);
}
</style>
