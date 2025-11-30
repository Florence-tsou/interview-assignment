<template>
  <div class="square-grid">
    <div class="square-area">
      <div
        v-for="square in 9"
        :key="square"
        class="square-item"
        :class="{ shine: shineSquares.includes(square) }"
      >
        <div v-if="ballSquares.includes(square)" class="ball" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const shineSquares = [3, 5, 9]
const ballSquares = [1, 3, 7, 9]
</script>
<style scoped lang="scss">
.square-grid {
  flex: 1;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.625rem;

  .square-area {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.625rem;

    .square-item {
      height: 100px;
      border: black solid 2px;
      background: radial-gradient(circle, rgba(113, 81, 95, 1) 81%, rgba(0, 0, 0, 1) 100%);
      position: relative;

      &.shine {
        animation: shine 1s infinite;

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
      }
    }
  }
}
</style>
