<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  userId: string;
  size?: number;
}>();

const generateAvatar = (id: string) => {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colors = ['#6b72ff', '#4ECDC4', '#45B7D1', '#00ee81', '#FFEEAD'];
  const bgColor = colors[hash % colors.length];
  const shape = hash % 3;
  const size = props.size || 48;

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="${bgColor}"/>
      <path
        fill="#FFF"
        d="${getShapePath(shape)}"
        transform="scale(0.8) translate(12.5, 12.5)"
      />
    </svg>
  `;
};

const getShapePath = (shape: number): string => {
  const shapes = [
    'M50 10L90 90H10L50 10Z', // Треугольник
    'M20 20H80V80H20V20ZM50 50V70H70V50H50Z', // Прямоугольник с квадратом
    'M50 20A30 30 0 0 1 50 80A30 30 0 0 1 50 20ZM50 35A15 15 0 0 0 50 65A15 15 0 0 0 50 35Z' // Круг с кольцом
  ];
  return shapes[shape] || shapes[0];
};

const avatarSvg = computed(() =>
    `data:image/svg+xml;utf8,${encodeURIComponent(generateAvatar(props.userId))}`
);
</script>

<template>
  <img :src="avatarSvg" alt="" class="avatar">
</template>

<style scoped>
.avatar {
  border-radius: 20%;
  object-fit: cover;
  width: 48px;
  height: 48px;
}
</style>