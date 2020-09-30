import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  },
  {
    path:'/forum',
    name:'Forum',
    component: () => import('../views/Forum.vue'),
  },
  {
    path:'/post',
    name:'NewPost',
    component: () => import('../views/NewPost.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && to.name !== 'Home' && to.name !== 'SignUp')
    if (!localStorage.getItem('token'))
    next({ name: 'Home'})
    next()
})

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status) {
      alert('Votre session à expiré !')
      localStorage.clear()
      window.location = '/'
  } else {
      return Promise.reject(error);
  }
});

export default router
