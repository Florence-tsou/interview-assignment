<template>
  <div class="menu-item-area" v-for="item in props.menuData" :key="item.key">
    <div
      class="menu-item"
      :class="{
        active: shouldHighlight(item),
        'first-level': props.level === 0,
      }"
      @click.stop="handleClickItem(item.key)"
    >
      <span>{{ item.text }}</span>
      <div v-if="item.children?.length && shouldHighlight(item)" class="menu-children">
        <SideItem
          :menuData="item.children"
          :selectedKey="props.selectedKey"
          :level="props.level + 1"
          @item-click="handleClickItem"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
type MenuItem = {
  key: string
  text: string
  children?: MenuItem[]
}

const props = withDefaults(
  defineProps<{
    menuData: MenuItem[]
    selectedKey?: string | null
    level?: number
  }>(),
  {
    level: 0,
  },
)

const emit = defineEmits<{
  'item-click': [key: string]
}>()

const isSelected = (key: string) => {
  return props.selectedKey === key
}

const shouldHighlight = (item: MenuItem) => {
  if (!props.selectedKey) return false
  if (isSelected(item.key)) return true

  // selectedKey是不是item的旗下商品
  if (item.children) return hasSelectedKeyInChildren(item.children)
  return false
}

// 遞歸檢查每個item的旗下商品是不是selectedKey的項目
const hasSelectedKeyInChildren = (children: MenuItem[]) => {
  for (const child of children) {
    if (
      child.key === props.selectedKey ||
      (child.children && hasSelectedKeyInChildren(child.children))
    )
      return true
  }
  return false
}

const handleClickItem = (key: string) => {
  // 把選擇的項目emit回去存起來
  emit('item-click', key)
}
</script>
<style scoped lang="scss">
.menu-item {
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 0.25rem;
  color: #fff;

  &.active {
    color: yellow;
    font-weight: bold;

    &.first-level {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

  .menu-children {
    margin-top: 0.5rem;
    margin-left: 1rem;
  }
}
</style>
