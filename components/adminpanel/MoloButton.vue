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
      'group'
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

.button.primary {
  background-color: var(--dk-bg-ins-light-color);
  border: 1px solid var(--dk-border-color);
  &:hover {
    background-color: var(--dk-border-color);
  }
}

.button.scores {
  background-color: var(--dk-bg-ins-light-color);
  border: 1px solid var(--dk-border-color);
  &:hover {
    border: 1px solid #ff6a00;
    background-color: var(--dk-bg-ins-color);
  }
}

.button.learning {
  background-color: var(--dk-bg-ins-light-color);
  border: 1px solid var(--dk-border-color);
  &:hover {
    border: 1px solid #00ffe2;
    background-color: var(--dk-bg-ins-color);
  }
}

.button.specialty {
  background-color: var(--dk-bg-ins-light-color);
  border: 1px solid var(--dk-border-color);
  &:hover {
    border: 1px solid #002bff;
    background-color: var(--dk-bg-ins-color);
  }
}


.button.achievement {
  background-color: var(--dk-bg-ins-light-color);
  border: 1px solid var(--dk-border-color);
  &:hover {
    border: 1px solid #10ff00;
    background-color: var(--dk-bg-ins-color);

  }
}

.button.status {
  background-color: var(--dk-bg-ins-light-color);
  border: 1px solid var(--dk-border-color);
  &:hover {
    border: 1px solid #ffe800;
    background-color: var(--dk-bg-ins-color);
  }
}

.button.delete {
  background-color: var(--dk-bg-ins-light-color);
  border: 1px solid var(--dk-border-color);
  &:hover {
    border: 1px solid #ff1900;
    background-color: var(--dk-bg-ins-color);
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

.button.group {
  background-color: var(--dk-bg-ins-light-color);
  border: 1px solid var(--dk-border-color);
  &:hover {
    border: 1px solid #9c00ff;
    background-color: var(--dk-bg-ins-color);
  }
}
</style>