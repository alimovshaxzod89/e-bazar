import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { async } from '@firebase/util'

const routes = [
  { path: '/register', name: 'register',component: () => import('../views/Register.vue')},
  { path: '/sign-in', name: 'sing-in',component: () => import('../views/SignIn.vue')},
  { 
    path: '/', 
    name: 'home',component: () => import('../views/Home.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  { path: '/products', name: 'products',component: () => import('../views/Products/Products.vue')},
  { path: '/debtors', name: 'debtors',component: () => import('../views/Debtors/Debtor.vue')},
  { path: '/dailysale', name: 'dailysale',component: () => import('../views/DailySale/DailySale.vue')},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async(to, from, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)){
    if(await getCurrentUser()){
      next();
    }else{
      alert("You dont have access!");
      next('/sign-in');
    }
  }else{
    next();
  }
})

export default router
