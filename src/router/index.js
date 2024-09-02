import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddView from '../views/AddView.vue'
import EditView from '../views/EditView.vue'

// Blog Posts Form WordPress
import PostsView from '../views/posts/PostsView.vue'
import PostDetail from '../views/posts/PostDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/add',
      name: 'add',
      component: AddView
    },
    {
      path: '/student/:id',
      name: 'edit',
      component: EditView
    },
    {
      path: '/blog',
      name: 'blog',
      component: PostsView
    },
    {
      path: '/:id',
      name: 'PostDetail',
      component: PostDetail,
    }
  ]
})

export default router
