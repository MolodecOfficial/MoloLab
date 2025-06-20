<script setup lang="ts">
const props = defineProps({
  to: [String, Object],
  span: String,
})
</script>

<template>
  <section class="profile-button">
    <NuxtLink :to="to" class="link">
      <section class="content">
        <section class="left">
          <slot name="svg"/>
          <span>{{ span }}</span>
        </section>
        <section class="right">
          <svg class="vector" fill="none" height="10" viewBox="0 0 6 10" width="6" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L1 9" stroke="#7B7B7B" stroke-linecap="round" stroke-width="1.25"/>
          </svg>
        </section>
      </section>
    </NuxtLink>
  </section>
</template>

<style scoped>
.profile-button {
  background-color: white;
  width: 100%;
  height: max-content;
  border-radius: 15px;
  gap: 10px;
  display: flex;
  flex-direction: column;
}

.link {
  text-decoration: none;
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

}

.content {
  width: 100%;
  background-color: white;
  padding: 12px 16px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;
}

.left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status {
  font-size: 16px;
  font-weight: bold;
}

.done {
  color: #4CAF50;
}

.not-done {
  color: #F44336;
}

.vector {
  flex-shrink: 0;
}

.content:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}

.content:active {
  background-color: #ebebeb;
}
</style>