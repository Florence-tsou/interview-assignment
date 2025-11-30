<template>
  <div class="ball-item" :style="ballStyle" :data-ball-id="ball.id">
    <div class="ball" :style="{ backgroundColor: ball.color }" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BallConfig } from '../views/BallPage.vue'

const props = defineProps<{
  ball: BallConfig
}>()

const ballStyle = computed(() => {
  return {
    '--start-x': `${props.ball.startX}px`,
    '--start-y': `${props.ball.startY}px`,
    '--end-x': `${props.ball.endX}px`,
    '--end-y': `${props.ball.endY}px`,
    '--duration': `${props.ball.duration}ms`,
  }
})
</script>

<style scoped lang="scss">
.ball-item {
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  left: 0;
  top: 0;
  will-change: transform;
  contain: layout style paint;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  animation: fly var(--duration) linear infinite;

  .ball {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  @keyframes fly {
    0% {
      transform: translate(calc(var(--start-x) - 0.75rem), calc(var(--start-y) - 0.75rem));
    }
    100% {
      transform: translate(calc(var(--end-x) - 0.75rem), calc(var(--end-y) - 0.75rem));
    }
  }
}
</style>
