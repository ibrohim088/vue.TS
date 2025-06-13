import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import PostIdPage from '../page/PostIdPage.vue';
import Composition from '../page/PostPageComposition.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'CompotionAPi',
    component: Composition,
  },
  {
    path: '/posts/:id',
    name: 'PostIdPage',
    component: PostIdPage,
    props: true, // позволяет передавать :id как пропс в компонент
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;