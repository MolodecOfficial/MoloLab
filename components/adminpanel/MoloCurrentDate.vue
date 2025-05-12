<script setup lang="ts">
import {ref} from "vue";

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

onMounted(() => {
  updateTime();
  intervalId = setInterval(updateTime, 10);
})
</script>

<template>
  <section class="current_date">
    <span>
              Текущая дата - {{ day }}.{{ month }}.{{ year }}
    </span>
    <span>
              Текущее время - {{ hour }}:{{ minute }}:{{ seconds }}
    </span>
  </section>
</template>

<style scoped>
.current_date {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  background-color: var(--dk-bg-color);
  border: 1px solid var(--dk-border-color);
  padding: 20px;
  border-radius: 10px;
}
</style>