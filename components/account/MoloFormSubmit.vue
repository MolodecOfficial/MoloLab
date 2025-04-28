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
  width: 100%;
  &:hover {
    background-color: #231e67;
  }
}

.button-guest .register_btn {
  background-color: #a60202; /* Цвет фона для кнопки гостя */
}

.button-guest .register_btn:hover {
  background-color: #570000; /* Цвет фона при наведении для кнопки гостя */
}


</style>