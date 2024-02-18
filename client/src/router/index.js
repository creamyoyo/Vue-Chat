import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Chat from '../views/Chat.vue'
import Avatar from '../views/Avatar.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/login',
      name:'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },{
      path: '/',
      name: 'chat',
      component: Chat
    },{
      path:'/avatar',
      name:'avatar',
      component: Avatar
    }
  ]
})

router.beforeEach((to) => {
  // 在这里执行你的逻辑
  if(to.name !== 'login' && to.name !== 'register'){
    const user = JSON.parse(localStorage.getItem('currentUser'))?.currentUser
    if (!user) {
      // 如果未登录，可以重定向到登录页
      return {name: 'login'}
    } else {
      return true
    }
  }
  return true
});

export default router
