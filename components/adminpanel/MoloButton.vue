<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: value => [
      'delete',
      'confirm',
      'cancel',
      'primary',
      'status',
      'achievement',
      'learning',
      'scores',
      'create'
    ].includes(value)
  },
  onClick: {
    type: Function,
    default: () => {}
  }
});

const handleClick = () => {
  props.onClick();
};
</script>

<template>
  <button :class="['button', type]" @click="handleClick">
    <slot></slot>
  </button>
</template>

<style scoped>

button {
  color: white;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button.scores {
  border: 1px solid #be4f00;
  background-color: #5b2900;
  &:hover {
    background-color: #be4f00;
  }
}

.button.learning {
  border: 1px solid #00bea8;
  background-color: #005b50;
  &:hover {
    background-color: #00bea8;
  }
}

.button.specialty {
  border: 1px solid #0020be;
  background-color: #00055b;
  &:hover {
    background-color: #0020be;
  }
}


.button.achievement {
  border: 1px solid #0cb000;
  background-color: #0e4400;
  &:hover {
    background-color: #0cb000;
  }
}

.button.status {
  border: 1px solid #beae00;
  background-color: #5b5000;
  &:hover {
    background-color: #beae00;
  }
}

.button.delete {
  border: 1px solid #ab1000;
  background-color: #3f0000;
  &:hover {
    background-color: #ab1000;

  }
}


.button.confirm {
  border: 1px solid #0cb000;
  background-color: #0e4400;
  &:hover {
    background-color: #0cb000;
  }
}

.button.cancel {
  border: 1px solid #ab1000;
  background-color: #3f0000;
  &:hover {
    background-color: #ab1000;
  }
}

.button.create {
  border: 1px solid #5e0894;
  background-color: #2d143b;
  &:hover {
    background-color: #5e0894;
  }
}
</style>