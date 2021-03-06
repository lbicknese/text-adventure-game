import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Templates from '../views/Templates.vue'
import NewTemplate from '../views/NewTemplate.vue'
import EditTemplate from '../views/EditTemplate.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/templates',
    name: 'templates',
    component: Templates
  },
  {
    path: '/templates/new',
    name: 'newTemplate',
    component: NewTemplate
  },
  {
    path: '/templates/:id',
    name: 'editTemplate',
    component: EditTemplate
  },
  {
    path: '/about',
    name: 'about',
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

const whitelisted: Array<string | null | undefined> = [
  'login',
  'about'
]

router.beforeEach((to, from, next) => {
  const username = localStorage.getItem('username')
  if (!whitelisted.includes(to.name) && (!username || username.length === 0)) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
