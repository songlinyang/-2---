import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: 'Home',
    props : {
      menu : 'service'
    },
    component: () => import('@/views/Home.vue'),
    children : [{
      path: 'service',
      name: 'service',
      component: () => import('../views/service')
    },
    {
      path: '',
      name: 'service',
      component: ()=> import('../views/service')
    }
  ]
  },
  {
    path: '/',
    name: 'Home',
    props : {
      menu : 'task'
    },
    component: () => import('@/views/Home.vue'),
    children : [{
      path: 'task',
      name: 'task',
      component: () => import('../views/task')
    }]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
