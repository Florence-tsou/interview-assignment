<template>
  <div class="ball-system">
    <div class="controls">
      <button @click="router.push('/')">返回九宮格</button>
      <div class="ball-input">
        <input type="number" v-model="startX" placeholder="起點X" />
        <input type="number" v-model="startY" placeholder="起點Y" />
        <input type="number" v-model="endX" placeholder="終點X" />
        <input type="number" v-model="endY" placeholder="終點Y" />
        <button @click="addRandomBall">添加球</button>
      </div>
      <button @click="clearAllBalls">清除所有球</button>
      <span class="ball-count">球數: {{ balls.length }}</span>
    </div>

    <div class="ball-container">
      <BallItem v-for="ball in balls" :key="ball.id" :ball="ball" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BallItem from '../components/BallItem.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

export interface BallConfig {
  id: string
  startX: number
  startY: number
  endX: number
  endY: number
  color: string
  duration: number
}

const balls = ref<BallConfig[]>([])
const ballIdCounter = ref(0)
const startX = ref(0)
const startY = ref(0)
const endX = ref(300)
const endY = ref(600)

const addRandomBall = () => {
  if (balls.value.length >= 100) return

  const newBall: BallConfig = {
    id: `ball-${ballIdCounter.value++}`,
    startX: startX.value,
    startY: startY.value,
    endX: endX.value,
    endY: endY.value,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    duration: 2000,
  }
  balls.value.push(newBall)
}

const clearAllBalls = () => {
  balls.value = []
}
</script>

<style scoped lang="scss">
.ball-system {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .controls {
    z-index: 10;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex-wrap: wrap;
    background: rgba(255, 255, 255, 0.9);
    padding: 0.75rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .ball-input {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      flex-wrap: wrap;
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.25rem;
      background: #667eea;
      color: white;
      cursor: pointer;
      font-size: 0.875rem;
    }

    .ball-count {
      margin-left: 0.5rem;
      font-weight: 500;
      color: #333;
    }
  }

  .ball-container {
    width: 100%;
    height: 100%;
    position: relative;
    contain: layout style paint;
  }
}
</style>
