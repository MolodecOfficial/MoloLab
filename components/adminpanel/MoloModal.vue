<script setup lang="ts">
const props = defineProps({
  visible: Boolean,
  title: String,
  statusMessage: String
});
</script>

<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <h4>{{ title }}</h4>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
      <slot name="select"></slot>
      <div class="modal-buttons">

        <slot name="confirm-button"></slot>

        <slot name="status"></slot>

        <slot name="cancel-button"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>


.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  display: flex;
  flex-direction: column;
  background-color: #1a1a1a;
  border: 1px solid #2c2c2c;
  color: white;
  border-radius: 8px;
  padding: 20px;
  gap: 8px;
  width: 400px;
  max-height: 80vh;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease;
  overflow-y: auto;
  text-align: center;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8%;
}


@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.input {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

</style>