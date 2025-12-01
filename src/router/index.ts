import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'
import BallSystemView from '../views/BallPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/ball-system',
      name: 'ball-system',
      component: BallSystemView,
    },
  ],
})

export default router
