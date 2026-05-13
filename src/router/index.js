import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import ContactsPage from '@/views/ContactsPage.vue'
import VacanciesPage from '@/views/VacanciesPage.vue'
import AdminPage from '@/views/AdminPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage }, 
    { path: '/contacts', component: ContactsPage }, 
    { path: '/vacancies', component: VacanciesPage }, 
    { path: '/admin', component: AdminPage } 
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
