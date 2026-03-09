<template>
  <div class="admin-root">

    <transition name="fade">
      <div v-if="!isAuth" class="login-screen">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="login-card">
          <div class="login-brand">
            <div class="login-brand-icon">А</div>
            <div>
              <div class="login-brand-name">АНИТИМ</div>
              <div class="login-brand-sub">Панель управления</div>
            </div>
          </div>
          <div class="field-group">
            <label class="field-label">Логин</label>
            <div class="field-row">
              <i class="bi bi-person"></i>
              <input v-model="form.login" type="text" placeholder="admin" @keyup.enter="doLogin" />
            </div>
          </div>
          <div class="field-group">
            <label class="field-label">Пароль</label>
            <div class="field-row">
              <i class="bi bi-lock"></i>
              <input v-model="form.password" :type="showPwd ? 'text' : 'password'" placeholder="••••••••" @keyup.enter="doLogin" />
              <button class="eye-btn" @click="showPwd = !showPwd" type="button">
                <i :class="showPwd ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
            </div>
          </div>
          <div v-if="loginErr" class="login-err">
            <i class="bi bi-exclamation-circle"></i> {{ loginErr }}
          </div>
          <button class="btn-gold full" @click="doLogin" :disabled="loginBusy">
            <span v-if="!loginBusy">Войти</span>
            <span v-else><i class="bi bi-arrow-repeat spin"></i> Входим...</span>
          </button>
        </div>
      </div>
    </transition>

    <div v-if="isAuth" class="dashboard">

      <aside :class="['sidebar', { open: mobileOpen }]">
        <div class="sidebar-top">
          <div class="s-brand">
            <div class="s-brand-ico">А</div>
            <div class="s-brand-text">
              <span class="s-brand-name">АНИТИМ</span>
              <span class="s-brand-sub">Admin</span>
            </div>
          </div>
        </div>
        <nav class="s-nav">
          <button v-for="t in tabs" :key="t.id"
            :class="['s-nav-item', { active: tab === t.id }]"
            @click="goTab(t.id)">
            <i :class="t.icon"></i>
            <span>{{ t.label }}</span>
          </button>
        </nav>
        <div class="s-footer">
          <div class="fb-status" :class="fbOk ? 'ok' : 'err'">
            <span class="fb-dot"></span>
            {{ fbOk ? 'Подключено' : 'Нет связи' }}
          </div>
          <button class="s-logout" @click="doLogout">
            <i class="bi bi-box-arrow-left"></i> Выйти
          </button>
        </div>
      </aside>

      <div v-if="mobileOpen" class="mobile-veil" @click="mobileOpen = false"></div>

      <div class="main">
        <header class="topbar">
          <button class="burger" @click="mobileOpen = !mobileOpen"><i class="bi bi-list"></i></button>
          <span class="topbar-title">{{ currentTab.label }}</span>
          <span class="topbar-time">{{ clock }}</span>
        </header>

        <main class="content">

          <section v-if="tab === 'gallery'">
            <div class="section-head">
              <div><h1>Галерея</h1><p>Изображения на главной странице</p></div>
              <button class="btn-gold" @click="openGal()"><i class="bi bi-plus-lg"></i> Добавить</button>
            </div>
            <div v-if="galLoading" class="loader-wrap"><div class="ring"></div></div>
            <div v-else-if="gallery.length === 0" class="empty">
              <i class="bi bi-images"></i><p>Галерея пуста. Добавьте первое изображение.</p>
            </div>
            <div v-else class="gal-grid">
              <div v-for="img in gallery" :key="img.id" class="gal-card">
                <div class="gal-img">
                  <img :src="img.url" :alt="img.alt" @error="e => e.target.style.display='none'" />
                  <div class="gal-actions">
                    <button class="icon-btn edit" @click="openGal(img)"><i class="bi bi-pencil"></i></button>
                    <button class="icon-btn del" @click="askDel('gallery', img.id, img.alt || 'фото')"><i class="bi bi-trash3"></i></button>
                  </div>
                </div>
                <div class="gal-info">
                  <span class="gal-alt">{{ img.alt || 'Без описания' }}</span>
                  <span class="gal-order">№{{ img.order ?? 0 }}</span>
                </div>
              </div>
            </div>
          </section>

          <section v-if="tab === 'settings'">
            <div class="section-head">
              <div><h1>Настройки сайта</h1><p>Контакты, статистика и соцсети</p></div>
              <button class="btn-gold" @click="saveSettings" :disabled="setsSaving">
                <i class="bi bi-check-lg"></i>
                {{ setsSaving ? 'Сохраняем...' : 'Сохранить' }}
              </button>
            </div>
            <div v-if="setsLoading" class="loader-wrap"><div class="ring"></div></div>
            <div v-else class="settings-body">

              <div class="card">
                <div class="card-title"><i class="bi bi-telephone"></i> Контакты</div>
                <div class="form-grid">
                  <div class="field-group">
                    <label class="field-label">Телефон</label>
                    <div class="field-row"><i class="bi bi-telephone"></i><input v-model="sets.phone" type="text" placeholder="8 800 700-50-08" /></div>
                  </div>
                  <div class="field-group">
                    <label class="field-label">Email</label>
                    <div class="field-row"><i class="bi bi-envelope"></i><input v-model="sets.email" type="email" placeholder="info@anitim-oao.ru" /></div>
                  </div>
                  <div class="field-group span-2">
                    <label class="field-label">Адрес</label>
                    <div class="field-row"><i class="bi bi-geo-alt"></i><input v-model="sets.address" type="text" placeholder="г. Барнаул..." /></div>
                  </div>
                  <div class="field-group">
                    <label class="field-label">Часы работы</label>
                    <div class="field-row"><i class="bi bi-clock"></i><input v-model="sets.hours" type="text" placeholder="Пн–Пт: 09:00–18:00" /></div>
                  </div>
                </div>
              </div>

              <div class="card">
                <div class="card-title"><i class="bi bi-bar-chart-line"></i> Статистика (главная страница)</div>
                <div class="form-grid">
                  <div class="field-group">
                    <label class="field-label">Машин в год</label>
                    <div class="field-row"><i class="bi bi-gear"></i><input v-model="sets.statMachines" type="text" placeholder="2.6 тыс." /></div>
                  </div>
                  <div class="field-group">
                    <label class="field-label">Запасных частей</label>
                    <div class="field-row"><i class="bi bi-tools"></i><input v-model="sets.statParts" type="text" placeholder="8 млн+" /></div>
                  </div>
                  <div class="field-group">
                    <label class="field-label">Рабочих мест</label>
                    <div class="field-row"><i class="bi bi-people"></i><input v-model="sets.statJobs" type="text" placeholder="1700+" /></div>
                  </div>
                  <div class="field-group">
                    <label class="field-label">Производственных площадей</label>
                    <div class="field-row"><i class="bi bi-building"></i><input v-model="sets.statArea" type="text" placeholder="65 000 м²" /></div>
                  </div>
                </div>
              </div>

              <div class="card">
                <div class="card-title"><i class="bi bi-share"></i> Социальные сети</div>
                <div class="form-grid">
                  <div class="field-group">
                    <label class="field-label">ВКонтакте</label>
                    <div class="field-row"><i class="bi bi-globe2"></i><input v-model="sets.vk" type="url" placeholder="https://vk.com/..." /></div>
                  </div>
                  <div class="field-group">
                    <label class="field-label">Telegram</label>
                    <div class="field-row"><i class="bi bi-telegram"></i><input v-model="sets.telegram" type="url" placeholder="https://t.me/..." /></div>
                  </div>
                  <div class="field-group">
                    <label class="field-label">YouTube</label>
                    <div class="field-row"><i class="bi bi-youtube"></i><input v-model="sets.youtube" type="url" placeholder="https://youtube.com/..." /></div>
                  </div>
                  <div class="field-group">
                    <label class="field-label">RuTube</label>
                    <div class="field-row"><i class="bi bi-play-btn"></i><input v-model="sets.rutube" type="url" placeholder="https://rutube.ru/..." /></div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          <section v-if="tab === 'analytics'">
            <div class="section-head">
              <div><h1>Аналитика</h1><p>Посещаемость и активность пользователей</p></div>
              <button class="btn-gold" @click="refreshAnalytics" :disabled="analyticsRefreshing">
                <i :class="['bi', analyticsRefreshing ? 'bi-arrow-repeat spin' : 'bi-arrow-clockwise']"></i>
                {{ analyticsRefreshing ? 'Обновляем...' : 'Обновить' }}
              </button>
            </div>

            <div v-if="!analyticsLoaded" class="loader-wrap"><div class="ring"></div></div>

            <div v-else class="analytics-body">

              <div class="kpi-grid">
                <div class="kpi-card">
                  <div class="kpi-icon kpi-icon--total"><i class="bi bi-people-fill"></i></div>
                  <div class="kpi-data">
                    <div class="kpi-value">{{ visitorStats.total.toLocaleString('ru') }}</div>
                    <div class="kpi-label">Всего посетителей</div>
                  </div>
                  <div class="kpi-trend kpi-trend--up"><i class="bi bi-arrow-up-right"></i></div>
                </div>
                <div class="kpi-card">
                  <div class="kpi-icon kpi-icon--today"><i class="bi bi-person-check"></i></div>
                  <div class="kpi-data">
                    <div class="kpi-value">{{ visitorStats.today.toLocaleString('ru') }}</div>
                    <div class="kpi-label">Сегодня</div>
                  </div>
                </div>
                <div class="kpi-card">
                  <div class="kpi-icon kpi-icon--week"><i class="bi bi-calendar-week"></i></div>
                  <div class="kpi-data">
                    <div class="kpi-value">{{ visitorStats.thisWeek.toLocaleString('ru') }}</div>
                    <div class="kpi-label">За 7 дней</div>
                  </div>
                </div>
                <div class="kpi-card">
                  <div class="kpi-icon kpi-icon--month"><i class="bi bi-calendar-month"></i></div>
                  <div class="kpi-data">
                    <div class="kpi-value">{{ visitorStats.thisMonth.toLocaleString('ru') }}</div>
                    <div class="kpi-label">За 30 дней</div>
                  </div>
                </div>
              </div>

              <div class="card chart-card">
                <div class="card-title"><i class="bi bi-graph-up"></i> Посещения за 30 дней</div>
                <div class="chart-wrap" v-if="visitorStats.daily && visitorStats.daily.length">
                  <div class="chart-bars">
                    <div
                      v-for="day in visitorStats.daily"
                      :key="day.date"
                      class="chart-bar-wrap"
                      :title="`${formatChartDate(day.date)}: ${day.count} посет.`"
                    >
                      <div
                        class="chart-bar"
                        :style="{ height: barHeight(day.count) + '%' }"
                        :class="{ 'chart-bar--today': day.date === todayStr }"
                      ></div>
                      <span v-if="shouldShowLabel(day.date)" class="chart-label">
                        {{ shortDate(day.date) }}
                      </span>
                    </div>
                  </div>
                  <div class="chart-baseline"></div>
                </div>
                <div v-else class="empty" style="padding:2rem 0">
                  <i class="bi bi-bar-chart"></i><p>Данных пока нет</p>
                </div>
              </div>

              <div class="card" v-if="pagesBreakdown.length">
                <div class="card-title"><i class="bi bi-layout-text-sidebar"></i> Популярные страницы</div>
                <div class="pages-list">
                  <div v-for="pg in pagesBreakdown" :key="pg.page" class="page-row">
                    <span class="page-name">{{ pg.label }}</span>
                    <div class="page-bar-wrap">
                      <div class="page-bar" :style="{ width: pg.pct + '%' }"></div>
                    </div>
                    <span class="page-count">{{ pg.count }}</span>
                  </div>
                </div>
              </div>

              <div class="card">
                <div class="card-title"><i class="bi bi-clock-history"></i> Последние визиты</div>
                <div v-if="recentVisits.length === 0" class="empty" style="padding:1.5rem 0">
                  <i class="bi bi-inbox"></i><p>Визитов пока нет</p>
                </div>
                <div v-else class="visits-table-wrap">
                  <table class="visits-table">
                    <thead>
                      <tr>
                        <th>Время</th>
                        <th>Страница</th>
                        <th>Браузер / ОС</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="v in recentVisits" :key="v.id">
                        <td class="td-time">{{ v.ts }}</td>
                        <td><span class="page-badge">{{ pageLabel(v.page) }}</span></td>
                        <td class="td-ua">{{ shortUA(v.ua) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </section>

        </main>
      </div>
    </div>

    <transition name="modal">
      <div v-if="galModal.open" class="modal-bg" @click.self="galModal.open = false">
        <div class="modal">
          <div class="modal-hd">
            <span>{{ galModal.id ? 'Редактировать' : 'Добавить' }} фото</span>
            <button @click="galModal.open = false"><i class="bi bi-x-lg"></i></button>
          </div>
          <div class="modal-bd">
            <div class="field-group">
              <label class="field-label">URL изображения *</label>
              <div class="field-row"><i class="bi bi-link-45deg"></i><input v-model="galModal.url" type="url" placeholder="https://..." /></div>
            </div>
            <div v-if="galModal.url" class="img-preview">
              <img :src="galModal.url" alt="" @error="e => e.target.style.opacity='0.2'" />
            </div>
            <div class="field-group">
              <label class="field-label">Описание (alt)</label>
              <div class="field-row"><i class="bi bi-card-text"></i><input v-model="galModal.alt" type="text" placeholder="Описание изображения" /></div>
            </div>
            <div class="field-group">
              <label class="field-label">Порядок отображения</label>
              <div class="field-row"><i class="bi bi-sort-numeric-down"></i><input v-model.number="galModal.order" type="number" placeholder="0" /></div>
            </div>
          </div>
          <div class="modal-ft">
            <button class="btn-ghost" @click="galModal.open = false">Отмена</button>
            <button class="btn-gold" @click="saveGal" :disabled="galModal.saving">
              <i class="bi bi-check-lg"></i>
              {{ galModal.saving ? 'Сохраняем...' : (galModal.id ? 'Обновить' : 'Добавить') }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="modal">
      <div v-if="delModal.open" class="modal-bg" @click.self="delModal.open = false">
        <div class="modal modal--sm">
          <div class="modal-hd">
            <span style="color:#f87171"><i class="bi bi-exclamation-triangle"></i> Удалить?</span>
            <button @click="delModal.open = false"><i class="bi bi-x-lg"></i></button>
          </div>
          <div class="modal-bd">
            <p class="del-msg">Удалить <strong>«{{ delModal.name }}»</strong>? Это действие нельзя отменить.</p>
          </div>
          <div class="modal-ft">
            <button class="btn-ghost" @click="delModal.open = false">Отмена</button>
            <button class="btn-danger" @click="doDel" :disabled="delModal.busy">
              <i class="bi bi-trash3"></i>
              {{ delModal.busy ? 'Удаляем...' : 'Удалить' }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <div class="toasts">
      <transition-group name="toast">
        <div v-for="t in toasts" :key="t.id" :class="['toast', t.type]">
          <i :class="t.type === 'ok' ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'"></i>
          {{ t.msg }}
        </div>
      </transition-group>
    </div>

  </div>
</template>

<script>
import {
  getFirestore, collection, doc,
  onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, getDoc,
  serverTimestamp, query, orderBy
} from 'firebase/firestore'
import { mapGetters, mapActions } from 'vuex'
import app from '../firebase/config.js'

const db = getFirestore(app)
const CREDS = { login: import.meta.env.ADMIN_PANEL_LOGIN, password: import.meta.env.ADMIN_PANEL_PASSWORD }

const defaultSets = () => ({
  phone: '8 800 700-50-08',
  email: 'info@anitim-oao.ru',
  address: 'г. Барнаул, ул. Северо-Западная, д. 2а',
  hours: 'Пн–Пт: 09:00–18:00',
  statMachines: '2.6 тыс.',
  statParts: '8 млн+',
  statJobs: '1700+',
  statArea: '65 000 м²',
  vk: 'https://vk.com/almaztd_official',
  telegram: 'https://t.me/almaztd_official',
  youtube: 'https://youtube.com/@almaztd_official',
  rutube: 'https://rutube.ru/channel/25059762/',
})

const PAGE_LABELS = {
  '/': 'Главная',
  '/about': 'О компании',
  '/vacancies': 'Вакансии',
  '/contacts': 'Контакты',
}

export default {
  name: 'AdminPage',

  data() {
    return {
      isAuth: !!sessionStorage.getItem('admin_auth'),
      form: { login: '', password: '' },
      showPwd: false,
      loginErr: '',
      loginBusy: false,

      tab: 'gallery',
      mobileOpen: false,
      clock: '',
      fbOk: false,
      _tick: null,
      _unsubs: [],

      tabs: [
        { id: 'gallery',   icon: 'bi bi-images',       label: 'Галерея' },
        { id: 'settings',  icon: 'bi bi-sliders',       label: 'Настройки сайта' },
        { id: 'analytics', icon: 'bi bi-graph-up-arrow', label: 'Аналитика' },
      ],

      gallery: [],
      galLoading: true,
      galModal: { open: false, id: null, url: '', alt: '', order: 0, saving: false },

      sets: defaultSets(),
      setsLoading: true,
      setsSaving: false,

      delModal: { open: false, col: '', id: '', name: '', busy: false },
      toasts: [],
      _tid: 0,

      analyticsRefreshing: false,
    }
  },

  computed: {
    ...mapGetters(['visitorStats', 'recentVisits', 'analyticsLoaded']),

    currentTab() {
      return this.tabs.find(t => t.id === this.tab) || this.tabs[0]
    },

    todayStr() {
      return new Date().toISOString().split('T')[0]
    },

    maxDayCount() {
      if (!this.visitorStats.daily) return 1
      return Math.max(...this.visitorStats.daily.map(d => d.count), 1)
    },

    pagesBreakdown() {
      const counts = {}
      this.recentVisits.forEach(v => {
        counts[v.page] = (counts[v.page] || 0) + 1
      })
      const total = this.recentVisits.length || 1
      return Object.entries(counts)
        .map(([page, count]) => ({
          page, count,
          label: PAGE_LABELS[page] || page,
          pct: Math.round((count / total) * 100)
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6)
    }
  },

  mounted() {
    this.updateClock()
    this._tick = setInterval(this.updateClock, 1000)
    if (this.isAuth) this.initFB()
  },

  beforeUnmount() {
    this._unsubs.forEach(u => u())
    clearInterval(this._tick)
  },

  methods: {
    ...mapActions(['loadAnalytics']),

    doLogin() {
      this.loginErr = ''
      if (!this.form.login || !this.form.password) { this.loginErr = 'Введите логин и пароль'; return }
      this.loginBusy = true
      setTimeout(() => {
        if (this.form.login === CREDS.login && this.form.password === CREDS.password) {
          sessionStorage.setItem('admin_auth', '1')
          this.isAuth = true
          this.initFB()
        } else {
          this.loginErr = 'Неверный логин или пароль'
        }
        this.loginBusy = false
      }, 500)
    },

    doLogout() {
      this._unsubs.forEach(u => u()); this._unsubs = []
      sessionStorage.removeItem('admin_auth')
      this.isAuth = false
      this.gallery = []
      this.sets = defaultSets()
    },

    initFB() {
      const q = query(collection(db, 'gallery'), orderBy('order', 'asc'))
      this._unsubs.push(onSnapshot(q, snap => {
        this.gallery = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        this.galLoading = false
        this.fbOk = true
      }, () => { this.galLoading = false; this.fbOk = false }))

      this.loadSettings()
      this.loadAnalytics()
    },

    async loadSettings() {
      try {
        const snap = await getDoc(doc(db, 'settings', 'main'))
        if (snap.exists()) this.sets = { ...defaultSets(), ...snap.data() }
        this.setsLoading = false
        this.fbOk = true
      } catch { this.setsLoading = false }
    },

    openGal(item = null) {
      if (item) {
        this.galModal = { open: true, id: item.id, url: item.url || '', alt: item.alt || '', order: item.order ?? 0, saving: false }
      } else {
        this.galModal = { open: true, id: null, url: '', alt: '', order: this.gallery.length, saving: false }
      }
    },

    async saveGal() {
      if (!this.galModal.url.trim()) { this.toast('err', 'Введите URL изображения'); return }
      this.galModal.saving = true
      try {
        const data = { url: this.galModal.url, alt: this.galModal.alt, order: this.galModal.order }
        if (this.galModal.id) {
          await updateDoc(doc(db, 'gallery', this.galModal.id), data)
          this.toast('ok', 'Изображение обновлено')
        } else {
          data.createdAt = serverTimestamp()
          await addDoc(collection(db, 'gallery'), data)
          this.toast('ok', 'Изображение добавлено')
        }
        this.galModal.open = false
      } catch (e) { this.toast('err', 'Ошибка: ' + e.message) }
      this.galModal.saving = false
    },

    async saveSettings() {
      this.setsSaving = true
      try {
        await setDoc(doc(db, 'settings', 'main'), { ...this.sets })
        this.toast('ok', 'Настройки сохранены')
      } catch (e) { this.toast('err', 'Ошибка: ' + e.message) }
      this.setsSaving = false
    },

    async refreshAnalytics() {
      this.analyticsRefreshing = true
      await this.loadAnalytics()
      this.analyticsRefreshing = false
      this.toast('ok', 'Данные обновлены')
    },

    askDel(col, id, name) { this.delModal = { open: true, col, id, name, busy: false } },

    async doDel() {
      this.delModal.busy = true
      try {
        await deleteDoc(doc(db, this.delModal.col, this.delModal.id))
        this.toast('ok', 'Удалено')
        this.delModal.open = false
      } catch (e) { this.toast('err', 'Ошибка: ' + e.message) }
      this.delModal.busy = false
    },

    goTab(id) {
      this.tab = id
      this.mobileOpen = false
      if (id === 'analytics' && !this.analyticsLoaded) this.loadAnalytics()
    },

    updateClock() {
      this.clock = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    },

    toast(type, msg) {
      const id = ++this._tid
      this.toasts.push({ id, type, msg })
      setTimeout(() => { this.toasts = this.toasts.filter(t => t.id !== id) }, 3000)
    },

    barHeight(count) {
      if (!this.maxDayCount) return 0
      return Math.max(2, Math.round((count / this.maxDayCount) * 100))
    },

    shouldShowLabel(dateStr) {
      if (!this.visitorStats.daily) return false
      const arr = this.visitorStats.daily
      const idx = arr.findIndex(d => d.date === dateStr)
      return idx % 5 === 0 || dateStr === this.todayStr
    },

    formatChartDate(dateStr) {
      return new Date(dateStr).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
    },

    shortDate(dateStr) {
      const d = new Date(dateStr)
      return `${d.getDate()} ${['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'][d.getMonth()]}`
    },

    pageLabel(page) {
      return PAGE_LABELS[page] || page || '/'
    },

    shortUA(ua) {
      if (!ua) return '—'
      if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome'
      if (ua.includes('Firefox')) return 'Firefox'
      if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari'
      if (ua.includes('Edg')) return 'Edge'
      if (ua.includes('OPR') || ua.includes('Opera')) return 'Opera'
      return ua.slice(0, 30)
    }
  }
}
</script>

<style scoped>
.admin-root {
  --gold: #FFB300;
  --gold-dim: rgba(255,179,0,0.12);
  --bg: #0d0d10;
  --surface: #141418;
  --elevated: #1c1c22;
  --hover: #222228;
  --border: rgba(255,255,255,0.07);
  --border-md: rgba(255,255,255,0.11);
  --txt: #eeeef2;
  --txt2: #8888a0;
  --txt3: #50505e;
  --sidebar-w: 220px;
  --topbar-h: 56px;
  --r: 10px;
  height: 100vh;
  overflow: hidden;
  background: var(--bg);
  color: var(--txt);
  font-family: 'FedraSansPro', 'Segoe UI', sans-serif;
}

.login-screen {
  position: fixed; inset: 0; display: flex;
  align-items: center; justify-content: center;
  background: var(--bg); overflow: hidden;
}
.orb { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; }
.orb-1 { width:500px;height:500px; background:radial-gradient(circle,rgba(255,179,0,.2) 0%,transparent 70%); top:-150px;left:-150px; animation:drift 14s ease-in-out infinite; }
.orb-2 { width:350px;height:350px; background:radial-gradient(circle,rgba(99,102,241,.15) 0%,transparent 70%); bottom:-80px;right:-50px; animation:drift 18s ease-in-out infinite reverse; }
@keyframes drift { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-40px)} }
.login-card {
  position:relative;z-index:1;background:var(--surface);
  border:1px solid var(--border-md);border-radius:18px;
  padding:2.25rem 2rem;width:380px;
  box-shadow:0 32px 80px rgba(0,0,0,.5),0 0 60px rgba(255,179,0,.05);
}
.login-brand { display:flex;align-items:center;gap:.75rem;margin-bottom:2rem; }
.login-brand-icon { width:40px;height:40px;background:var(--gold);color:#1a1000;font-weight:900;font-size:1.1rem;border-radius:10px;display:flex;align-items:center;justify-content:center; }
.login-brand-name { font-size:1.1rem;font-weight:800;color:var(--gold);line-height:1.1; }
.login-brand-sub { font-size:.7rem;color:var(--txt3);text-transform:uppercase;letter-spacing:.07em; }
.login-err { background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);color:#fca5a5;border-radius:var(--r);padding:.625rem .875rem;font-size:.825rem;margin-bottom:.875rem;display:flex;align-items:center;gap:.4rem; }

.field-group { margin-bottom:1rem; }
.field-label { display:block;font-size:.775rem;font-weight:600;color:var(--txt2);margin-bottom:.4rem;letter-spacing:.02em; }
.field-row { position:relative;display:flex;align-items:center;background:var(--elevated);border:1.5px solid var(--border);border-radius:var(--r);transition:border-color .15s,box-shadow .15s; }
.field-row:focus-within { border-color:var(--gold);box-shadow:0 0 0 3px rgba(255,179,0,.1); }
.field-row>i { position:absolute;left:.875rem;color:var(--txt3);font-size:.85rem;pointer-events:none; }
.field-row input,.field-row select { width:100%;background:none;border:none;outline:none;color:var(--txt);font-size:.9rem;padding:.7rem 1rem .7rem 2.375rem;font-family:inherit; }
.field-row input::placeholder { color:var(--txt3); }
.eye-btn { position:absolute;right:.75rem;background:none;border:none;color:var(--txt3);cursor:pointer;padding:.25rem;font-size:.85rem;transition:color .15s; }
.eye-btn:hover { color:var(--txt2); }

.btn-gold { display:inline-flex;align-items:center;gap:.45rem;padding:.625rem 1.125rem;background:linear-gradient(135deg,var(--gold) 0%,#e6a000 100%);color:#1a1000;font-weight:700;font-size:.875rem;border:none;border-radius:var(--r);cursor:pointer;transition:all .2s;white-space:nowrap; }
.btn-gold:hover:not(:disabled) { transform:translateY(-1px);box-shadow:0 6px 20px rgba(255,179,0,.35); }
.btn-gold:disabled { opacity:.6;cursor:not-allowed; }
.btn-gold.full { width:100%;justify-content:center;margin-top:.25rem;padding:.75rem; }
.btn-ghost { display:inline-flex;align-items:center;gap:.45rem;padding:.625rem 1.125rem;background:var(--elevated);color:var(--txt2);border:1px solid var(--border-md);border-radius:var(--r);font-weight:600;font-size:.875rem;cursor:pointer;transition:all .15s; }
.btn-ghost:hover { background:var(--hover);color:var(--txt); }
.btn-danger { display:inline-flex;align-items:center;gap:.45rem;padding:.625rem 1.125rem;background:rgba(239,68,68,.1);color:#f87171;border:1px solid rgba(239,68,68,.25);border-radius:var(--r);font-weight:600;font-size:.875rem;cursor:pointer;transition:all .15s; }
.btn-danger:hover:not(:disabled) { background:rgba(239,68,68,.2); }
.btn-danger:disabled { opacity:.6;cursor:not-allowed; }
.icon-btn { width:32px;height:32px;border:1px solid var(--border-md);border-radius:7px;background:rgba(0,0,0,.5);color:var(--txt2);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:.8rem;transition:all .15s; }
.icon-btn.edit:hover { background:var(--gold-dim);border-color:rgba(255,179,0,.3);color:var(--gold); }
.icon-btn.del:hover { background:rgba(239,68,68,.12);border-color:rgba(239,68,68,.3);color:#f87171; }

.dashboard { display:flex;height:100vh;overflow:hidden; }
.sidebar { width:var(--sidebar-w);background:var(--surface);border-right:1px solid var(--border);display:flex;flex-direction:column;flex-shrink:0;z-index:100; }
.sidebar-top { height:var(--topbar-h);display:flex;align-items:center;padding:0 1.125rem;border-bottom:1px solid var(--border);flex-shrink:0; }
.s-brand { display:flex;align-items:center;gap:.65rem; }
.s-brand-ico { width:32px;height:32px;background:var(--gold);color:#1a1000;font-weight:900;font-size:.9rem;border-radius:8px;display:flex;align-items:center;justify-content:center; }
.s-brand-name { display:block;font-size:.95rem;font-weight:800;color:var(--gold);line-height:1.2; }
.s-brand-sub { display:block;font-size:.65rem;color:var(--txt3);text-transform:uppercase;letter-spacing:.07em; }
.s-nav { flex:1;padding:.75rem;display:flex;flex-direction:column;gap:.25rem; }
.s-nav-item { display:flex;align-items:center;gap:.75rem;padding:.625rem .875rem;border-radius:8px;background:none;border:none;color:var(--txt2);cursor:pointer;font-size:.875rem;transition:all .15s;text-align:left;width:100%; }
.s-nav-item:hover { background:var(--hover);color:var(--txt); }
.s-nav-item.active { background:var(--gold-dim);color:var(--gold);font-weight:600; }
.s-nav-item i { font-size:1rem;flex-shrink:0; }
.s-footer { padding:.75rem;border-top:1px solid var(--border);display:flex;flex-direction:column;gap:.5rem; }
.fb-status { display:flex;align-items:center;gap:.5rem;padding:.45rem .75rem;border-radius:7px;font-size:.73rem;font-weight:600; }
.fb-status.ok { background:rgba(34,197,94,.08);color:#4ade80; }
.fb-status.err { background:rgba(239,68,68,.08);color:#f87171; }
.fb-dot { width:6px;height:6px;border-radius:50%;background:currentColor;flex-shrink:0; }
.fb-status.ok .fb-dot { box-shadow:0 0 5px currentColor; }
.s-logout { display:flex;align-items:center;gap:.65rem;padding:.55rem .875rem;border-radius:8px;background:none;border:none;color:var(--txt3);cursor:pointer;font-size:.85rem;transition:all .15s;text-align:left; }
.s-logout:hover { background:rgba(239,68,68,.08);color:#f87171; }
.main { flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0; }
.topbar { height:var(--topbar-h);background:var(--surface);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 1.5rem;gap:.875rem;flex-shrink:0; }
.burger { display:none;background:none;border:none;color:var(--txt2);font-size:1.2rem;cursor:pointer; }
.topbar-title { font-size:.9375rem;font-weight:700;color:var(--txt);flex:1; }
.topbar-time { font-size:.8rem;color:var(--txt3);font-variant-numeric:tabular-nums; }
.content { flex:1;overflow-y:auto;padding:1.75rem;background:var(--bg); }
.content::-webkit-scrollbar { width:5px; }
.content::-webkit-scrollbar-thumb { background:var(--border-md);border-radius:3px; }
.section-head { display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:1.5rem;flex-wrap:wrap;gap:1rem; }
.section-head h1 { font-size:1.5rem;font-weight:800;letter-spacing:-.02em;margin:0 0 .2rem; }
.section-head p { margin:0;font-size:.85rem;color:var(--txt2); }

.gal-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:.875rem; }
.gal-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden;transition:transform .2s,border-color .2s; }
.gal-card:hover { transform:translateY(-2px);border-color:var(--border-md); }
.gal-img { position:relative;aspect-ratio:4/3;background:var(--elevated);overflow:hidden; }
.gal-img img { width:100%;height:100%;object-fit:cover;transition:transform .3s; }
.gal-card:hover .gal-img img { transform:scale(1.05); }
.gal-actions { position:absolute;inset:0;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;gap:.5rem;opacity:0;transition:opacity .2s; }
.gal-card:hover .gal-actions { opacity:1; }
.gal-info { display:flex;align-items:center;justify-content:space-between;padding:.55rem .75rem;font-size:.73rem; }
.gal-alt { color:var(--txt2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
.gal-order { color:var(--txt3);flex-shrink:0;margin-left:.5rem; }

.settings-body { display:flex;flex-direction:column;gap:1.25rem;max-width:900px; }
.card { background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:1.375rem; }
.card-title { font-size:.9rem;font-weight:700;color:var(--txt);margin-bottom:1.125rem;padding-bottom:.75rem;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:.5rem; }
.card-title i { color:var(--gold); }
.form-grid { display:grid;grid-template-columns:1fr 1fr;gap:0 1rem; }
.span-2 { grid-column:1/-1; }

.analytics-body { display:flex;flex-direction:column;gap:1.25rem; }

.kpi-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:1rem; }
.kpi-card {
  background:var(--surface);border:1px solid var(--border);border-radius:14px;
  padding:1.25rem 1.375rem;display:flex;align-items:center;gap:1rem;
  transition:border-color .2s,transform .2s;position:relative;overflow:hidden;
}
.kpi-card::before { content:'';position:absolute;inset:0;background:radial-gradient(circle at 80% 50%,rgba(255,179,0,.04) 0%,transparent 60%);pointer-events:none; }
.kpi-card:hover { border-color:rgba(255,179,0,.25);transform:translateY(-2px); }
.kpi-icon { width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0; }
.kpi-icon--total { background:rgba(255,179,0,.12);color:var(--gold); }
.kpi-icon--today { background:rgba(34,197,94,.1);color:#4ade80; }
.kpi-icon--week  { background:rgba(99,102,241,.1);color:#a5b4fc; }
.kpi-icon--month { background:rgba(251,146,60,.1);color:#fb923c; }
.kpi-data { flex:1; }
.kpi-value { font-size:1.625rem;font-weight:800;color:var(--txt);line-height:1;letter-spacing:-.02em; }
.kpi-label { font-size:.72rem;color:var(--txt3);margin-top:.25rem;font-weight:500;text-transform:uppercase;letter-spacing:.06em; }
.kpi-trend { width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:.85rem; }
.kpi-trend--up { background:rgba(34,197,94,.1);color:#4ade80; }

.chart-card { padding:1.375rem; }
.chart-wrap { margin-top:1.25rem; }
.chart-bars {
  display:flex;align-items:flex-end;gap:3px;
  height:140px;padding-bottom:24px;position:relative;
}
.chart-bar-wrap { flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;position:relative;height:100%; }
.chart-bar {
  width:100%;border-radius:3px 3px 0 0;
  background:rgba(255,179,0,.35);
  transition:height .5s cubic-bezier(.22,1,.36,1),background .2s;
  min-height:2px;
}
.chart-bar--today { background:var(--gold);box-shadow:0 0 8px rgba(255,179,0,.4); }
.chart-bar-wrap:hover .chart-bar { background:var(--gold); }
.chart-label { position:absolute;bottom:0;font-size:.6rem;color:var(--txt3);white-space:nowrap;transform:translateX(-50%);left:50%; }
.chart-baseline { height:1px;background:var(--border);margin-top:-1px; }

.pages-list { display:flex;flex-direction:column;gap:.75rem;margin-top:.5rem; }
.page-row { display:flex;align-items:center;gap:1rem; }
.page-name { width:120px;font-size:.82rem;color:var(--txt2);flex-shrink:0; }
.page-bar-wrap { flex:1;height:6px;background:var(--elevated);border-radius:99px;overflow:hidden; }
.page-bar { height:100%;background:linear-gradient(90deg,var(--gold),rgba(255,179,0,.5));border-radius:99px;transition:width .6s cubic-bezier(.22,1,.36,1); }
.page-count { width:32px;text-align:right;font-size:.8rem;font-weight:700;color:var(--txt2);flex-shrink:0; }

.visits-table-wrap { overflow-x:auto;margin-top:.5rem; }
.visits-table { width:100%;border-collapse:collapse;font-size:.825rem; }
.visits-table th { text-align:left;padding:.5rem .75rem;color:var(--txt3);font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;border-bottom:1px solid var(--border); }
.visits-table td { padding:.625rem .75rem;border-bottom:1px solid var(--border);color:var(--txt2); }
.visits-table tr:last-child td { border-bottom:none; }
.visits-table tr:hover td { background:var(--elevated); }
.td-time { color:var(--txt3);font-size:.78rem;white-space:nowrap; }
.td-ua { font-size:.78rem; }
.page-badge { display:inline-flex;align-items:center;padding:.2rem .65rem;border-radius:6px;background:var(--gold-dim);color:var(--gold);font-size:.72rem;font-weight:600; }

.loader-wrap { display:flex;align-items:center;justify-content:center;padding:4rem; }
.ring { width:32px;height:32px;border:3px solid var(--border-md);border-top-color:var(--gold);border-radius:50%;animation:spin .7s linear infinite; }
@keyframes spin { to { transform:rotate(360deg); } }
.empty { text-align:center;padding:4rem 2rem;color:var(--txt3); }
.empty i { font-size:2.5rem;display:block;margin-bottom:.75rem;opacity:.4; }
.empty p { font-size:.875rem;margin:0; }

.modal-bg { position:fixed;inset:0;background:rgba(0,0,0,.65);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:500;padding:1rem; }
.modal { background:var(--surface);border:1px solid var(--border-md);border-radius:16px;width:100%;max-width:520px;max-height:90vh;display:flex;flex-direction:column;box-shadow:0 24px 64px rgba(0,0,0,.5); }
.modal--sm { max-width:420px; }
.modal-hd { display:flex;align-items:center;justify-content:space-between;padding:1.125rem 1.375rem;border-bottom:1px solid var(--border);font-size:.975rem;font-weight:700;color:var(--txt);flex-shrink:0; }
.modal-hd>button { width:28px;height:28px;background:var(--hover);border:none;border-radius:6px;color:var(--txt2);cursor:pointer;font-size:.75rem;display:flex;align-items:center;justify-content:center;transition:all .15s; }
.modal-hd>button:hover { background:var(--elevated);color:var(--txt); }
.modal-bd { padding:1.375rem;overflow-y:auto;flex:1; }
.modal-ft { display:flex;justify-content:flex-end;gap:.625rem;padding:1rem 1.375rem;border-top:1px solid var(--border);flex-shrink:0; }
.img-preview { margin-bottom:1rem;border-radius:8px;overflow:hidden;background:var(--elevated);border:1px solid var(--border);max-height:160px; }
.img-preview img { width:100%;max-height:160px;object-fit:cover;display:block; }
.del-msg { color:var(--txt2);line-height:1.7;font-size:.9rem;margin:0; }
.del-msg strong { color:var(--txt); }

.toasts { position:fixed;bottom:1.25rem;right:1.25rem;z-index:9999;display:flex;flex-direction:column;gap:.5rem; }
.toast { display:flex;align-items:center;gap:.6rem;padding:.75rem 1rem;border-radius:10px;font-size:.85rem;font-weight:600;border:1px solid;pointer-events:none;box-shadow:0 8px 24px rgba(0,0,0,.4); }
.toast.ok  { background:rgba(34,197,94,.1);color:#4ade80;border-color:rgba(34,197,94,.2); }
.toast.err { background:rgba(239,68,68,.1);color:#f87171;border-color:rgba(239,68,68,.2); }
.mobile-veil { display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:99; }

@media (max-width:900px) {
  .kpi-grid { grid-template-columns:repeat(2,1fr); }
}
@media (max-width:768px) {
  .sidebar { position:fixed;left:0;top:0;bottom:0;transform:translateX(-100%);z-index:200;transition:transform .3s ease; }
  .sidebar.open { transform:translateX(0); }
  .mobile-veil { display:block; }
  .burger { display:block; }
  .content { padding:1.125rem; }
  .form-grid { grid-template-columns:1fr; }
  .span-2 { grid-column:1; }
  .gal-grid { grid-template-columns:repeat(2,1fr); }
}
@media (max-width:480px) {
  .kpi-grid { grid-template-columns:1fr 1fr; }
  .gal-grid { grid-template-columns:repeat(2,1fr);gap:.6rem; }
  .modal-ft { flex-direction:column-reverse; }
  .modal-ft>* { width:100%;justify-content:center; }
}

.fade-enter-active,.fade-leave-active { transition:opacity .3s; }
.fade-enter-from,.fade-leave-to { opacity:0; }
.modal-enter-active,.modal-leave-active { transition:opacity .22s; }
.modal-enter-active .modal,.modal-leave-active .modal { transition:transform .22s,opacity .22s; }
.modal-enter-from,.modal-leave-to { opacity:0; }
.modal-enter-from .modal,.modal-leave-to .modal { transform:translateY(16px) scale(.97);opacity:0; }
.toast-enter-active { transition:all .28s cubic-bezier(.34,1.56,.64,1); }
.toast-leave-active { transition:all .18s ease; }
.toast-enter-from,.toast-leave-to { opacity:0;transform:translateX(24px); }
.spin { animation:spin .7s linear infinite; }
</style>