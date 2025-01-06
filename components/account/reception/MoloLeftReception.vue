<script setup lang="ts">
const receptionProps = defineProps({
  title: String,
  link: String
})
</script>

<template>
  <section class="addresses">
    <section class="small-addresses">
      <span class="address-title"> {{ receptionProps.title }} </span>
      <span v-html="receptionProps.link"></span>
    </section>
  </section>
</template>

<style scoped>

.addresses {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  gap: 10px;
  border-radius: 20px;
  background-color: #ffffff;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;

  & .address-title {
    font-size: 20px;
    color: #4e45e3;
  }
}

.small-addresses {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dark-theme .addresses {
  background-color: #1e1e1e;
  border: 1px solid #2c2c2c;

  & .address-title {
    color: #4e45e3;
  }
  & span {
    color: white;
  }
}

</style>