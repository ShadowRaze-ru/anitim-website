import { createStore } from 'vuex'
import axios from 'axios'
import {
  getFirestore, doc, getDoc, setDoc, onSnapshot,
  increment, serverTimestamp, collection, addDoc, query, orderBy, limit, getDocs
} from 'firebase/firestore'
import app from '../firebase/config.js'

const db = getFirestore(app)

const defaultSettings = () => ({
  phone: '8 800 700-50-08',
  email: 'info@anitim-oao.ru',
  address: 'г.Барнаул, ул. Северо-Западная, д. 2а',
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

const store = createStore({
  state: {
    siteInfo: {
      name: 'Алтайский НИИ технологии машиностроения',
      shortName: 'АНИТИМ',
      address: 'г.Барнаул, ул. Северо-Западная, д. 2а',
      phone: '8 800 700-50-08',
      email: 'info@anitim-oao.ru',
      workingHours: 'Пн-Пт: 09:00 - 18:00'
    },
    settings: defaultSettings(),
    settingsLoaded: false,
    settingsUnsubscribe: null,

    gallery: [],
    galLoading: true,
    galUnsubscribe: null,

    vacancies: [],
    vacanciesLoading: false,

    visitorStats: {
      total: 0,
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
    },
    recentVisits: [],
    analyticsLoaded: false,
  },

  mutations: {
    SET_VACANCIES(state, data) {
      state.vacancies = data
    },
    SET_VACANCIES_LOADING(state, val) {
      state.vacanciesLoading = val
    },
    SET_SETTINGS(state, data) {
      state.settings = { ...defaultSettings(), ...data }
      state.settingsLoaded = true
      state.siteInfo.address = state.settings.address
      state.siteInfo.phone = state.settings.phone
      state.siteInfo.email = state.settings.email
      state.siteInfo.workingHours = state.settings.hours
    },
    SET_SETTINGS_UNSUBSCRIBE(state, fn) {
      state.settingsUnsubscribe = fn
    },
    SET_VISITOR_STATS(state, data) {
      state.visitorStats = data
    },
    SET_RECENT_VISITS(state, data) {
      state.recentVisits = data
    },
    SET_ANALYTICS_LOADED(state, val) {
      state.analyticsLoaded = val
    },

    SET_GALLERY(state, data) {
      state.gallery = data
    },
    SET_GAL_LOADING(state, val) {
      state.galLoading = val
    },
    SET_GAL_UNSUBSCRIBE(state, fn) {
      state.galUnsubscribe = fn
    },
  },

  actions: {
    subscribeSettings({ commit, state }) {
      if (state.settingsUnsubscribe) return
      const unsub = onSnapshot(doc(db, 'settings', 'main'), snap => {
        if (snap.exists()) {
          commit('SET_SETTINGS', snap.data())
        }
      })
      commit('SET_SETTINGS_UNSUBSCRIBE', unsub)
    },

    unsubscribeSettings({ state, commit }) {
      if (state.settingsUnsubscribe) {
        state.settingsUnsubscribe()
        commit('SET_SETTINGS_UNSUBSCRIBE', null)
      }
    },

    subscribeGallery({ commit, state }) {
      if (state.galUnsubscribe) return
      const q = query(collection(db, 'gallery'), orderBy('order', 'asc'))
      const unsub = onSnapshot(
        q,
        snap => {
          commit('SET_GALLERY', snap.docs.map(d => ({ id: d.id, ...d.data() })))
          commit('SET_GAL_LOADING', false)
        },
        () => {
          commit('SET_GAL_LOADING', false)
        }
      )
      commit('SET_GAL_UNSUBSCRIBE', unsub)
    },

    unsubscribeGallery({ state, commit }) {
      if (state.galUnsubscribe) {
        state.galUnsubscribe()
        commit('SET_GAL_UNSUBSCRIBE', null)
      }
    },

    async fetchVacancies({ commit, state }) {
      if (state.vacancies.length > 0) return
      commit('SET_VACANCIES_LOADING', true)
      try {
        const response = await axios.get(
          'https://api.hh.ru/vacancies?employer_id=2529692&per_page=100'
        )
        commit('SET_VACANCIES', response.data.items || [])
      } catch (error) {
        console.error('Ошибка загрузки вакансий с HH:', error)
        commit('SET_VACANCIES', [])
      } finally {
        commit('SET_VACANCIES_LOADING', false)
      }
    },

    async trackVisit() {
      try {
        const now = new Date()
        const todayStr = now.toISOString().split('T')[0]
        const storageKey = 'anitim_last_visit'

        const lastVisit = localStorage.getItem(storageKey)
        if (lastVisit === todayStr) return

        localStorage.setItem(storageKey, todayStr)

        const globalRef = doc(db, 'analytics', 'global')
        await setDoc(globalRef, {
          total: increment(1),
          updatedAt: serverTimestamp()
        }, { merge: true })

        const dayRef = doc(db, 'analytics_daily', todayStr)
        await setDoc(dayRef, {
          date: todayStr,
          count: increment(1),
          updatedAt: serverTimestamp()
        }, { merge: true })

        await addDoc(collection(db, 'visits'), {
          ts: serverTimestamp(),
          page: window.location.pathname,
          ua: navigator.userAgent.slice(0, 120),
          date: todayStr,
        })
      } catch (e) {
        console.warn('Tracking error:', e)
      }
    },

    async loadAnalytics({ commit }) {
      try {
        const globalSnap = await getDoc(doc(db, 'analytics', 'global'))
        const globalData = globalSnap.exists() ? globalSnap.data() : { total: 0 }

        const now = new Date()
        const days30 = []
        for (let i = 29; i >= 0; i--) {
          const d = new Date(now)
          d.setDate(d.getDate() - i)
          days30.push(d.toISOString().split('T')[0])
        }

        const dailyPromises = days30.map(date =>
          getDoc(doc(db, 'analytics_daily', date)).then(s => ({
            date,
            count: s.exists() ? (s.data().count || 0) : 0
          }))
        )
        const dailyData = await Promise.all(dailyPromises)

        const todayStr = now.toISOString().split('T')[0]
        const todayCount = dailyData.find(d => d.date === todayStr)?.count || 0

        const weekStart = new Date(now)
        weekStart.setDate(weekStart.getDate() - 6)
        const weekStartStr = weekStart.toISOString().split('T')[0]
        const weekCount = dailyData
          .filter(d => d.date >= weekStartStr)
          .reduce((s, d) => s + d.count, 0)

        const monthStart = new Date(now)
        monthStart.setDate(monthStart.getDate() - 29)
        const monthStartStr = monthStart.toISOString().split('T')[0]
        const monthCount = dailyData
          .filter(d => d.date >= monthStartStr)
          .reduce((s, d) => s + d.count, 0)

        commit('SET_VISITOR_STATS', {
          total: globalData.total || 0,
          today: todayCount,
          thisWeek: weekCount,
          thisMonth: monthCount,
          daily: dailyData,
        })

        const visitsQ = query(
          collection(db, 'visits'),
          orderBy('ts', 'desc'),
          limit(20)
        )
        const visitsSnap = await getDocs(visitsQ)
        const recentVisits = visitsSnap.docs.map(d => {
          const data = d.data()
          return {
            id: d.id,
            page: data.page || '/',
            date: data.date || '',
            ts: data.ts?.toDate?.()?.toLocaleString('ru-RU') || '—',
            ua: data.ua || '',
          }
        })
        commit('SET_RECENT_VISITS', recentVisits)
        commit('SET_ANALYTICS_LOADED', true)
      } catch (e) {
        console.warn('Analytics load error:', e)
        commit('SET_ANALYTICS_LOADED', true)
      }
    },
  },

  getters: {
    siteInfo: state => state.siteInfo,
    settings: state => state.settings,
    settingsLoaded: state => state.settingsLoaded,
    vacancies: state => state.vacancies,
    vacanciesLoading: state => state.vacanciesLoading,
    visitorStats: state => state.visitorStats,
    recentVisits: state => state.recentVisits,
    analyticsLoaded: state => state.analyticsLoaded,

    gallery: state => state.gallery,
    galLoading: state => state.galLoading,
  }
})

export default store