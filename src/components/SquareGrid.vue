<template>
  <div class="square-grid">
    <div class="type-area">
      <button @click="handlerChangeMoveType('right')">朝右移動</button>
      <button @click="handlerChangeMoveType('left')">朝左移動</button>
      <button @click="handlerChangeMoveType('same')">朝同一座標點移動</button>
      <button @click="router.push('/ball-system')">一百顆球</button>
    </div>

    <div class="square-area">
      <div
        v-for="square in 9"
        :key="square"
        class="square-item"
        :class="{ shine: shineSquares.includes(square) }"
      >
        <div
          v-if="ballSquares.includes(square)"
          class="ball"
          :class="{ same: moveSameStatus, 'move-left': moveLeftStatus }"
          :data-position="square"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const shineSquares = [3, 5, 9]
const ballSquares = [1, 3, 7, 9]
const moveSameStatus = ref(false) // 朝中間移動
const moveLeftStatus = ref(false) // 朝左移動
const leftAnimations = ref<Animation[]>([]) // 朝左移動的動畫

const stopAllAnimations = async () => {
  // 取消所有動畫
  leftAnimations.value.forEach((animation) => {
    animation.cancel()
  })
  leftAnimations.value = []

  // 重置球的位置
  const balls = document.querySelectorAll('.ball')
  balls.forEach((ball) => {
    const element = ball as HTMLElement
    element.style.left = '50%'
    element.style.top = '50%'
  })
}

const handlerChangeMoveType = async (type: string) => {
  await stopAllAnimations()

  if (type === 'right') {
    moveSameStatus.value = false
    moveLeftStatus.value = false
  } else if (type === 'left') {
    moveSameStatus.value = false
    moveLeftStatus.value = true
    animateBallsLeft()
  } else if (type === 'same') {
    moveSameStatus.value = true
    moveLeftStatus.value = false
  }
}

const animateBallsLeft = () => {
  const balls = document.querySelectorAll('.ball')

  balls.forEach((ball) => {
    const element = ball as HTMLElement
    const animation = element.animate([{ left: '50%' }, { left: '-200%' }], {
      duration: 2000,
      iterations: Infinity,
      easing: 'ease-in-out',
    })

    leftAnimations.value.push(animation)
  })
}
</script>
<style scoped lang="scss">
.square-grid {
  flex: 1;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 0.625rem;
  position: relative;

  .type-area {
    width: 100%;
    position: absolute;
    top: 1rem;
    left: 0.625rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.625rem;
  }

  .square-area {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.625rem;

    .square-item {
      height: 100px;
      border: black solid 2px;
      position: relative;
      border: black solid 2px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle, rgba(113, 81, 95, 1) 81%, rgba(0, 0, 0, 1) 100%);
      }

      &.shine {
        &::before {
          animation: shine 1s infinite;
        }

        @keyframes shine {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
      }

      .ball {
        width: 1.875rem;
        height: 1.875rem;
        background-color: #a5f12b;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        animation: ball-move 2s infinite;
        z-index: 1;

        @keyframes ball-move {
          0% {
            left: 50%;
          }
          100% {
            left: 300%;
          }
        }

        // 朝左移動
        &.move-left {
          animation: none;
          transition: left 2s ease-in-out;
        }

        // 朝中間移動
        &.same {
          &[data-position='1'] {
            animation: ball-move-to-center-1 2s infinite;
          }

          &[data-position='3'] {
            animation: ball-move-to-center-3 2s infinite;
          }

          &[data-position='7'] {
            animation: ball-move-to-center-7 2s infinite;
          }

          &[data-position='9'] {
            animation: ball-move-to-center-9 2s infinite;
          }

          @keyframes ball-move-to-center-1 {
            0% {
              left: 50%;
            }
            100% {
              left: calc(50% + 100% + 0.9rem);
              top: calc(50% + 100px + 0.9rem);
            }
          }

          @keyframes ball-move-to-center-3 {
            0% {
              left: 50%;
            }
            100% {
              left: calc(50% - 100% - 0.9rem);
              top: calc(50% + 100px + 0.9rem);
            }
          }

          @keyframes ball-move-to-center-7 {
            0% {
              left: 50%;
            }
            100% {
              left: calc(50% + 100% + 0.9rem);
              top: calc(50% - 100px - 0.9rem);
            }
          }

          @keyframes ball-move-to-center-9 {
            0% {
              left: 50%;
            }
            100% {
              left: calc(50% - 100% - 0.9rem);
              top: calc(50% - 100px - 0.9rem);
            }
          }
        }
      }
    }
  }
}
</style>
