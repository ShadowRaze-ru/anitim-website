<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <nav class="nav">
          <router-link to="/" class="logo">
            <span class="logo-text">АНИТИМ</span>
          </router-link>

          <button class="mobile-menu-toggle" @click="toggleMobileMenu">
            <i :class="showMobileMenu ? 'bi bi-x' : 'bi bi-list'"></i>
          </button>

          <ul class="nav-links" :class="{ show: showMobileMenu }">
            <li>
              <router-link to="/" class="nav-link" @click="closeMobileMenu">
                <i class="bi bi-house"></i>
                Главная
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="nav-link" @click="closeMobileMenu">
                <i class="bi bi-info-circle"></i>
                О компании
              </router-link>
            </li>
            <li>
              <router-link to="/vacancies" class="nav-link" @click="closeMobileMenu">
                <i class="bi bi-person-workspace"></i>
                Вакансии
              </router-link>
            </li>
            <li>
              <router-link to="/contacts" class="nav-link" @click="closeMobileMenu">
                <i class="bi bi-envelope"></i>
                Контакты
              </router-link>
            </li>
            <li v-if="isAdmin">
              <router-link to="/admin" class="nav-link admin-link" @click="closeMobileMenu">
                <i class="bi bi-shield-lock"></i>
                Админ
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer" v-if="$route.path !== '/admin'">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <div class="flex">
              <h3>{{ siteInfo.shortName }}</h3>
              <div class="footer-social">
                <a href="https://yandex.ru/maps/org/altayskiy_nauchno_issledovatelskiy_institut_tekhnologii_mashinostroyeniya/1007131026/?ll=83.768484%2C53.381384&z=16"
                  target="_blank" class="social-link" title="Карта">
                  <i class="bi bi-geo-alt-fill"></i>
                </a>
                <a href="https://barnaul.hh.ru/employer/2529692" target="_blank" class="social-link" title="HH.ru">
                  <i id="hhIcon"></i>
                </a>
                <a :href="settings.youtube" target="_blank" class="social-link" title="YouTube">
                  <i class="bi bi-youtube"></i>
                </a>
                <a :href="settings.telegram" target="_blank" class="social-link" title="Telegram">
                  <i class="bi bi-telegram"></i>
                </a>
                <a :href="settings.vk" target="_blank" class="social-link" title="VKontakte">
                  <i id="vkIcon"></i>
                </a>
                <a :href="settings.rutube" target="_blank" class="social-link" title="Rutube">
                  <i id="RutIcon"></i>
                </a>
              </div>
            </div>
            <p class="footer-description">
              {{ siteInfo.name }} — ведущий научный центр в области
              машиностроительных технологий и материаловедения
            </p>
          </div>

          <div class="footer-nav">
            <div class="footer-section">
              <h3>Быстрые ссылки</h3>
              <ul class="footer-links">
                <li><router-link to="/about">О нас</router-link></li>
                <li><router-link to="/vacancies">Вакансии</router-link></li>
                <li><router-link to="/contacts">Контакты</router-link></li>
              </ul>
            </div>

            <div class="footer-section">
              <h3>Контакты</h3>
              <ul class="footer-contacts">
                <li>
                  <i class="bi bi-geo-alt"></i>
                  <span>{{ settings.address }}</span>
                </li>
                <li>
                  <i class="bi bi-telephone"></i>
                  <a :href="`tel:${settings.phone.replace(/[^\d+]/g, '')}`">{{ settings.phone }}</a>
                </li>
                <li>
                  <i class="bi bi-envelope"></i>
                  <a :href="`mailto:${settings.email}`">{{ settings.email }}</a>
                </li>
                <li>
                  <i class="bi bi-clock"></i>
                  <span>{{ settings.hours }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} {{ siteInfo.shortName }}. Все права защищены.</p>
        </div>
      </div>
    </footer>

    <button v-show="showScrollTop && $route.path !== '/admin'" @click="scrollToTop" class="scroll-top-btn"
      title="Наверх">
      <i class="bi bi-arrow-up"></i>
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',

  data() {
    return {
      showMobileMenu: false,
      showScrollTop: false,
      currentYear: new Date().getFullYear(),
      isAdmin: !!sessionStorage.getItem('admin_auth'),
    }
  },

  computed: {
    ...mapGetters(['siteInfo', 'settings']),
  },

  async mounted() {
    this.subscribeSettings()

    if (!this.$route.path.startsWith('/admin')) {
      this.trackVisit()
    }

    window.addEventListener('scroll', this.handleScroll)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    this.unsubscribeSettings()
  },

  methods: {
    ...mapActions(['subscribeSettings', 'unsubscribeSettings', 'trackVisit']),

    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
    },
    closeMobileMenu() {
      this.showMobileMenu = false
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    handleScroll() {
      this.showScrollTop = window.scrollY > 300
    }
  },

  watch: {
    $route() {
      this.closeMobileMenu()
    }
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#app:has(.admin-root) .header {
  height: 7vh;
}

.main-content {
  flex: 1;
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.75rem;
  color: #414042;
  cursor: pointer;
  padding: 0.5rem;
  transition: var(--transition-base);
}

.mobile-menu-toggle:hover {
  color: #FFB300;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.logo-text {
  font-size: 1.75rem;
  font-weight: 800;
  background: var(--primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link i {
  font-size: 1.125rem;
}

.admin-link {
  color: #FFB300 !important;
}

.admin-link.router-link-active {
  color: white !important;
}

.footer-description {
  margin-top: 2rem;
  margin-bottom: 4rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}

.footer-social {
  display: flex;
  gap: 1rem;
  margin-left: 25px;
}

.social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: #FEFEFE;
  transition: var(--transition-fast);
}

.social-link:hover {
  background: #FFB300;
  color: #414042;
  transform: translateY(-3px);
}

.social-link i {
  font-size: 1.25rem;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.8);
  transition: var(--transition-fast);
  display: inline-block;
}

.footer-links a:hover {
  color: #FFB300;
  padding-left: 5px;
}

.footer-contacts {
  list-style: none;
  padding: 0;
}

.footer-contacts li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.8);
}

.footer-contacts i {
  font-size: 1.125rem;
  color: #FFB300;
  margin-top: 0.125rem;
  flex-shrink: 0;
}

.footer-contacts a {
  color: rgba(255, 255, 255, 0.8);
  transition: var(--transition-fast);
}

.footer-contacts a:hover {
  color: #FFB300;
}

.footer-nav {
  display: flex;
  justify-content: space-between;
}

.footer-bottom {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
}

.scroll-top-btn {
  cursor: pointer;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 50%;
  box-shadow: var(--shadow-lg);
  transition: var(--transition-fast);
  z-index: 1000;
  font-size: 1.25rem;
}

.scroll-top-btn:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
}

#vkIcon {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  background-image: url('/src/assets/icons/vk.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: brightness(0) invert(1);
}

#RutIcon {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  background-image: url('/src/assets/icons/rutube.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: brightness(0) invert(1);
}

#hhIcon {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  background-image: url('/src/assets/icons/hhru.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: brightness(0) invert(1);
}

.social-link:hover #vkIcon {
  filter: brightness(0) invert(0);
}
</style>