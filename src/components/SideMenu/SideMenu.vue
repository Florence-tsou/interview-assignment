<template>
  <div class="side-menu">
    <div>
      <select v-model="selectedKey">
        <option v-for="item in selectedList" :key="item.key" :value="item.key">
          {{ item.label }}
        </option>
      </select>
    </div>

    <div>
      <button ref="menuButtonRef" class="menu-button" @click="toggleMenu">側邊選單</button>

      <transition name="slide">
        <div v-if="isMenuOpen" ref="menuListRef" class="menu-list">
          <SideItem :menuData="menuList" :selectedKey="selectedKey" @item-click="handleItemClick" />
        </div>
      </transition>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import SideItem from './SideItem.vue'

type MenuItem = {
  key: string
  text: string
  children?: MenuItem[]
}
const menuButtonRef = ref<HTMLDivElement | null>(null)
const menuListRef = ref<HTMLDivElement | null>(null)
const isMenuOpen = ref(false)
const selectedList = ref<{ key: string; label: string }[]>([])
const selectedKey = ref<string | null>(null)

const handleItemClick = (key: string) => {
  selectedKey.value = key
}

const menuList = ref<MenuItem[]>([
  {
    key: '64f',
    text: '好喝黑糖',
    children: [
      {
        key: '445',
        text: '黑糖鮮奶',
        children: [
          {
            key: '37a',
            text: '黑糖珍珠鮮奶',
          },
          {
            key: 'feb',
            text: '黑糖芋圓鮮奶',
          },
          {
            key: '59c',
            text: '黑糖蒟蒻鮮奶',
          },
        ],
      },
      {
        key: '29e',
        text: '黑糖冬瓜',
        children: [
          {
            key: 'ac3',
            text: '黑糖冬瓜牛奶',
          },
          {
            key: 'ca0',
            text: '黑糖冬瓜珍珠',
          },
        ],
      },
    ],
  },
  {
    key: '6c3',
    text: '茶',
    children: [
      {
        key: '5dc',
        text: '烏龍綠',
      },
      {
        key: 'b5f',
        text: '綠茶',
      },
      {
        key: 'b09',
        text: '紅茶',
      },
      {
        key: '887',
        text: '青茶',
      },
    ],
  },
  {
    key: 'c81',
    text: '咖啡',
    children: [
      {
        key: 'e02',
        text: '黑咖啡',
        children: [
          {
            key: 'd20',
            text: '濃縮咖啡',
          },
          {
            key: '1f8',
            text: '美式咖啡',
          },
        ],
      },
      {
        key: 'd7a',
        text: '牛奶咖啡',
        children: [
          {
            key: 'c09',
            text: '拿鐵',
            children: [
              {
                key: 'db2',
                text: '黑糖拿鐵',
              },
              {
                key: '9f6',
                text: '榛果拿鐵',
              },
              {
                key: 'b61',
                text: '香草拿鐵',
              },
            ],
          },
          {
            key: '9ac',
            text: '卡布奇諾',
          },
          {
            key: 'ce8',
            text: '摩卡',
          },
        ],
      },
    ],
  },
])

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = (event: MouseEvent) => {
  if (event.target !== menuButtonRef.value && !menuListRef.value?.contains(event.target as Node)) {
    isMenuOpen.value = false
  }
}

const getSelectedList = () => {
  menuList.value.forEach((item) => getSelectedListRecursive(item))
}

const getSelectedListRecursive = (item: MenuItem) => {
  if (item.children) {
    item.children.forEach((child) => getSelectedListRecursive(child))
  }
  selectedList.value.push({
    key: item.key,
    label: item.text,
  })
}

watch(selectedKey, (newVal) => {
  if (newVal) {
    localStorage.setItem('selectedKey', newVal)
  }
})

onMounted(() => {
  document.addEventListener('click', closeMenu)
  selectedKey.value = localStorage.getItem('selectedKey') || null
  getSelectedList()
})

onUnmounted(() => {
  document.removeEventListener('click', closeMenu)
})
</script>
<style scoped lang="scss">
.side-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;

  .menu-button {
    width: 100px;
    cursor: pointer;
  }

  .menu-list {
    min-width: 50%;
    height: 100vh;
    background-color: #000;
    color: #fff;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 2;
    padding: 1rem;
    overflow-y: auto;
  }

  .slide-enter-active {
    animation: slide 0.3s ease-in-out;
  }

  .slide-leave-active {
    animation: slide 0.3s ease-in-out reverse;
  }

  @keyframes slide {
    0% {
      right: -50%;
    }
    100% {
      right: 0;
    }
  }
}
</style>
