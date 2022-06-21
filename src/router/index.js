import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ContactApp from '../views/ContactApp.vue'
import ContactDetails from '../views/ContactDetails.vue'
import ContactEdit from '../views/ContactEdit.vue'
import Charts from '../views/Charts.vue'

const router = createRouter({
   history: createWebHashHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/',
         component: HomePage
      },
      {
         path: '/contact',
         component: ContactApp
      },
      {
         path: '/contact/details/:_id',
         component: ContactDetails
      },
      {
         path: '/contact/edit/:_id?',
         component: ContactEdit
      },
      {
         path: '/Chart/',
         component: Charts
      },
   ]
})

export default router
