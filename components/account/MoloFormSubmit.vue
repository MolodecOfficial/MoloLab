<script setup lang="ts">

const formProps = defineProps({
  loading: Boolean,
  label: String,
})
</script>

<template>
  <form type="submit">
    <a class="register_btn">{{ label }}</a>
  </form>
</template>

<style scoped>
.register_btn {
  background-color: #4e45e3;
  border: none;
  height: 40px;
  color: #eee;
  border-radius: 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  transition: 0.2s all ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #4038bb;
  }
}
</style>