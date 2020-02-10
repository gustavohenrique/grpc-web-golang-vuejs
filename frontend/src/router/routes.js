import { events, TOKEN_KEY } from '../constants'
import bus from '../libs/bus'

const isAuthenticated = (to, from, next) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    next()
    return
  }
  bus.publish(events.DIALOG_ERROR, 'Token not found.')
  next({ name: 'login' })
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/Login.vue')
      },
      {
        path: 'create',
        name: 'create',
        component: () => import('pages/Create.vue')
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('pages/Home.vue'),
        beforeEnter: isAuthenticated
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
