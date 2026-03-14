<template>
  <div class="vacancies-page">
    <section class="hero hero--vacancies">
      <div class="hero-bg-glow hero-bg-glow--1"></div>
      <div class="hero-bg-glow hero-bg-glow--2"></div>
      <div class="hero-grid-overlay"></div>

      <div class="container">
        <div class="hero-content">
          <div class="hero-badge fade-in">
            <i class="bi bi-geo-alt-fill"></i>
            <span>г. Барнаул, Алтайский край</span>
          </div>

          <h1 class="hero-title">Вакансии</h1>
          <p class="hero-subtitle">
            Работа на заводе, где твой результат виден в поле.<br>
            Официально, стабильно, с возможностью роста.
          </p>

          <div class="hero-perks">
            <div class="hero-perk">
              <i class="bi bi-shield-check"></i>
              <span>Официальное трудоустройство</span>
            </div>
            <div class="hero-perk">
              <i class="bi bi-mortarboard"></i>
              <span>Обучение с нуля</span>
            </div>
            <div class="hero-perk">
              <i class="bi bi-cup-hot"></i>
              <span>Питание за счёт компании</span>
            </div>
            <div class="hero-perk">
              <i class="bi bi-graph-up-arrow"></i>
              <span>Карьерный рост</span>
            </div>
            <div class="hero-perk">
              <i class="bi bi-tools"></i>
              <span>Современное оборудование</span>
            </div>
          </div>

          <a href="#vacancies-list" class="hero-scroll-hint">
            <span>Смотреть вакансии</span>
            <i class="bi bi-chevron-down"></i>
          </a>
        </div>
      </div>
    </section>

    <section class="section vacancies-section" id="vacancies-list">
      <div class="container">

        <!-- Загрузка -->
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Загружаем актуальные вакансии...</p>
        </div>

        <!-- Ошибка загрузки -->
        <div v-else-if="vacanciesError" class="error-state">
          <div class="error-icon">
            <i class="bi bi-wifi-off"></i>
          </div>
          <h3>Не удалось загрузить вакансии</h3>
          <p>Сервис HeadHunter временно недоступен. Попробуйте позже или свяжитесь с нами напрямую.</p>

          <div class="error-actions">
            <button class="btn-retry" @click="retry" :disabled="retrying">
              <i :class="['bi', retrying ? 'bi-arrow-repeat spin' : 'bi-arrow-clockwise']"></i>
              {{ retrying ? 'Загружаем...' : 'Попробовать снова' }}
            </button>
            <router-link to="/contacts" class="btn-contact">
              <i class="bi bi-telephone"></i>
              Позвонить нам
            </router-link>
          </div>

          <!-- Карточки с контактами как запасной вариант -->
          <div class="error-contacts">
            <div class="error-contact-card">
              <i class="bi bi-briefcase"></i>
              <div>
                <h4>Отдел кадров</h4>
                <p>Расскажем об открытых позициях по телефону</p>
                <a href="tel:88007005008">8 800 700-50-08</a>
              </div>
            </div>
            <div class="error-contact-card">
              <i class="bi bi-envelope"></i>
              <div>
                <h4>Написать письмо</h4>
                <p>Отправьте резюме — ответим в течение дня</p>
                <a href="mailto:info@anitim-oao.ru">info@anitim-oao.ru</a>
              </div>
            </div>
            <div class="error-contact-card">
              <i class="bi bi-globe"></i>
              <div>
                <h4>HeadHunter</h4>
                <p>Все вакансии на официальной странице</p>
                <a href="https://barnaul.hh.ru/employer/2529692" target="_blank" rel="noopener">Открыть hh.ru</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Вакансии загружены -->
        <template v-else>
          <div class="filters-wrap">
            <div class="filters-scroll">
              <button v-for="dept in departmentsWithCount" :key="dept.id" @click="selectDept(dept.id)"
                :class="['filter-btn', { active: selectedDept === dept.id }]">
                <i :class="dept.icon"></i>
                <span>{{ dept.name }}</span>
                <span class="filter-count">{{ dept.count }}</span>
              </button>
            </div>
          </div>

          <transition-group name="card-list" tag="div" class="vacancies-grid">
            <article v-for="(vacancy, index) in filteredVacancies" :key="vacancy.id" class="vacancy-card"
              :style="{ '--i': index }">
              <div class="vacancy-card__stripe"></div>

              <div class="vacancy-header">
                <div class="vacancy-meta">
                  <span class="vacancy-badge" :style="getBadgeStyle(vacancy.categoryId)">
                    <i :class="getCategoryIcon(vacancy.categoryId)"></i>
                    {{ vacancy.department }}
                  </span>
                  <span class="vacancy-salary">
                    <i class="bi bi-cash-coin"></i>
                    {{ vacancy.salary }}
                  </span>
                </div>
                <h3 class="vacancy-title">{{ vacancy.title }}</h3>
                <p v-if="vacancy.area" class="vacancy-area">
                  <i class="bi bi-geo-alt"></i>{{ vacancy.area }}
                </p>
              </div>

              <div class="vacancy-body">
                <div v-if="vacancy.requirement" class="vacancy-section">
                  <h4><i class="bi bi-tools"></i> Требования</h4>
                  <p class="snippet-text" v-html="vacancy.requirement"></p>
                </div>
                <div v-if="vacancy.responsibility" class="vacancy-section">
                  <h4><i class="bi bi-clipboard-check"></i> Обязанности</h4>
                  <p class="snippet-text" v-html="vacancy.responsibility"></p>
                </div>
              </div>

              <div class="vacancy-footer">
                <a :href="vacancy.url" target="_blank" rel="noopener noreferrer" class="btn-apply">
                  <i class="bi bi-box-arrow-up-right"></i>
                  <span>Откликнуться на hh.ru</span>
                </a>
              </div>
            </article>
          </transition-group>

          <div v-if="filteredVacancies.length === 0 && !vacanciesError" class="empty-state">
            <div class="empty-icon"><i class="bi bi-search"></i></div>
            <h3>Вакансий не найдено</h3>
            <p>В этой категории сейчас нет открытых позиций</p>
            <button @click="selectedDept = 'all'" class="btn btn-primary">
              <i class="bi bi-grid-3x3-gap"></i>
              Показать все
            </button>
          </div>
        </template>

      </div>
    </section>

    <section class="cta-section">
      <div class="cta-bg-glow cta-bg-glow--1"></div>
      <div class="cta-bg-glow cta-bg-glow--2"></div>
      <div class="cta-grid-overlay"></div>
      <div class="container">
        <div class="cta-content">
          <div class="cta-icon"><i class="bi bi-envelope-paper"></i></div>
          <h2 class="cta-title">Не нашли подходящую вакансию?</h2>
          <p class="cta-text">
            Отправьте резюме — мы сохраним его и свяжемся, как только появится подходящая позиция.
          </p>
          <div class="cta-actions">
            <router-link to="/contacts" class="cta-btn cta-btn--ghost">
              <i class="bi bi-telephone"></i>
              <span>Связаться с HR</span>
            </router-link>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

const CATEGORIES = [
  { id: 'all', name: 'Все вакансии', icon: 'bi bi-grid-3x3-gap', color: '#414042', keywords: null },
  { id: 'workers', name: 'Рабочие', icon: 'bi bi-hammer', color: '#e67e00', keywords: /сварщик|токарь|фрезер|слесарь|оператор\s+(станк|чпу|цпу|лазер|плазм|гибоч)|наладчик|штамповщик|кузнец|шлифовщ|термист|гальваник|маляр|сборщик|монтажник|электрик|электромонтаж|механик|ремонтник|котельщик|жестянщик|стропальщик|крановщик|такелажник|рабочий|аппаратчик|вальцовщик|заточник|зуборезчик|карусельщик|расточник|долбежник|протяжчик|резьбонарез/i },
  { id: 'engineering', name: 'Инженеры', icon: 'bi bi-cpu', color: '#2980b9', keywords: /инженер|конструктор|технолог|проектировщик|расчёт|нормировщик|метролог|испытатель|программист чпу|cam\b|cad\b|компас|solidworks|inventor|автокад|autocad|\bnx\b|catia/i },
  { id: 'itc', name: 'Офис и управление', icon: 'bi bi-briefcase', color: '#8e44ad', keywords: /программист|разработчик|аналитик|системный администратор|сисадмин|\b1с\b|бухгалтер|экономист|финансист|плановик|менеджер|руководитель|директор|начальник|мастер участка|мастер цеха|диспетчер|делопроизводитель|кадровик|\bhr\b|рекрутер|юрист|юрисконсульт|офис-менеджер/i },
  { id: 'logistics', name: 'Склад и логистика', icon: 'bi bi-truck', color: '#27ae60', keywords: /кладовщик|склад|логист|снабженец|снабжение|комплектовщик|грузчик|водитель|экспедитор|курьер|доставка|транспорт|перевозк/i },
  { id: 'internship', name: 'Стажировка', icon: 'bi bi-mortarboard', color: '#c0392b', keywords: /практик|стажёр|стажер|стажировка|intern|студент|практикант|помощник\s+(инженер|технолог|конструктор)/i }
]

export default {
  name: 'VacanciesPage',

  data() {
    return {
      selectedDept: 'all',
      departments: CATEGORIES,
      retrying: false,
    }
  },

  computed: {
    ...mapGetters(['vacancies', 'vacanciesLoading', 'vacanciesError']),

    loading() {
      return this.vacanciesLoading || false
    },

    normalizedVacancies() {
      return (this.vacancies || []).map(v => {
        const categoryId = this.detectCategory(v)
        const cat = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[1]
        return {
          id: v.id,
          title: v.name,
          url: v.alternate_url || '#',
          area: v.area?.name || null,
          categoryId,
          department: cat.name,
          salary: this.formatSalary(v.salary),
          requirement: this.cleanSnippet(v.snippet?.requirement),
          responsibility: this.cleanSnippet(v.snippet?.responsibility)
        }
      })
    },

    departmentsWithCount() {
      return CATEGORIES
        .map(cat => ({
          ...cat,
          count: cat.id === 'all'
            ? this.normalizedVacancies.length
            : this.normalizedVacancies.filter(v => v.categoryId === cat.id).length
        }))
        .filter(cat => cat.id === 'all' || cat.count > 0)
    },

    filteredVacancies() {
      if (this.selectedDept === 'all') return this.normalizedVacancies
      return this.normalizedVacancies.filter(v => v.categoryId === this.selectedDept)
    }
  },

  async mounted() {
    await this.fetchVacancies()
  },

  methods: {
    ...mapActions(['fetchVacancies', 'retryVacancies']),

    async retry() {
      this.retrying = true
      await this.retryVacancies()
      this.retrying = false
    },

    detectCategory(vacancy) {
      const title = vacancy.name || ''
      const roles = (vacancy.professional_roles || []).map(r => r.name).join(' ')
      const text = `${title} ${roles}`
      const internCat = CATEGORIES.find(c => c.id === 'internship')
      if (internCat.keywords.test(text)) return 'internship'
      for (const cat of CATEGORIES) {
        if (!cat.keywords || cat.id === 'internship') continue
        if (cat.keywords.test(text)) return cat.id
      }
      return 'workers'
    },

    getCategoryIcon(categoryId) {
      return CATEGORIES.find(c => c.id === categoryId)?.icon || 'bi bi-briefcase'
    },

    getBadgeStyle(categoryId) {
      const color = CATEGORIES.find(c => c.id === categoryId)?.color || '#414042'
      return { background: `${color}1a`, border: `1px solid ${color}40`, color }
    },

    formatSalary(salary) {
      if (!salary) return 'З/п по договорённости'
      const cur = salary.currency === 'RUR' ? '₽' : (salary.currency || '₽')
      const gross = salary.gross ? ' (до вычета налогов)' : ''
      if (salary.from && salary.to) return `от ${salary.from.toLocaleString('ru')} до ${salary.to.toLocaleString('ru')} ${cur}${gross}`
      if (salary.from) return `от ${salary.from.toLocaleString('ru')} ${cur}${gross}`
      if (salary.to) return `до ${salary.to.toLocaleString('ru')} ${cur}${gross}`
      return 'З/п по договорённости'
    },

    cleanSnippet(html) {
      if (!html) return null
      return html
        .replace(/<highlighttext>/gi, '<mark>')
        .replace(/<\/highlighttext>/gi, '</mark>')
        .replace(/<(?!mark|\/mark)[^>]+>/g, '')
        .trim() || null
    },

    selectDept(id) {
      if (this.selectedDept === id) return
      this.selectedDept = id
    }
  }
}
</script>

<style scoped>
/* Error state */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 5rem 2rem;
  max-width: 680px;
  margin: 0 auto;
}

.error-icon {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: #f87171;
  margin-bottom: 1.75rem;
  animation: pulse-err 2.5s ease-in-out infinite;
}

@keyframes pulse-err {
  0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.15); }
  50% { box-shadow: 0 0 0 12px rgba(239, 68, 68, 0); }
}

.error-state h3 {
  font-size: 1.75rem;
  font-weight: 800;
  color: #414042;
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
}

.error-state p {
  color: #5a5a5c;
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 480px;
}

.error-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 3rem;
}

.btn-retry {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #FFB300 0%, #e6a000 100%);
  color: #1a1000;
  font-weight: 700;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 6px 20px rgba(255, 179, 0, 0.3);
}

.btn-retry:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(255, 179, 0, 0.4);
}

.btn-retry:disabled { opacity: 0.7; cursor: not-allowed; }

.btn-contact {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  border-radius: 12px;
  background: #FEFEFE;
  color: #414042;
  font-weight: 700;
  font-size: 0.95rem;
  border: 1.5px solid #e8e8ea;
  text-decoration: none;
  transition: all 0.25s ease;
}

.btn-contact:hover {
  border-color: #FFB300;
  color: #FFB300;
  transform: translateY(-2px);
}

.error-contacts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
}

.error-contact-card {
  background: #FEFEFE;
  border: 1px solid rgba(65, 64, 66, 0.08);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 2px 12px rgba(65, 64, 66, 0.06);
}

.error-contact-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(65, 64, 66, 0.1);
}

.error-contact-card > i {
  font-size: 1.75rem;
  color: #FFB300;
}

.error-contact-card h4 {
  font-size: 0.95rem;
  font-weight: 700;
  color: #414042;
  margin: 0;
}

.error-contact-card p {
  font-size: 0.8rem;
  color: #8c8c8e;
  line-height: 1.5;
  margin: 0;
}

.error-contact-card a {
  font-size: 0.875rem;
  font-weight: 700;
  color: #FFB300;
  text-decoration: none;
  transition: color 0.15s;
}

.error-contact-card a:hover { color: #e6a000; }

/* Loading */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  padding: 6rem 0;
  color: #5a5a5c;
}

.loading-spinner {
  width: 44px;
  height: 44px;
  border: 4px solid #e8e8ea;
  border-top-color: #FFB300;
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* Hero */
.hero--vacancies {
  position: relative;
  min-height: 82vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #2d2d2f 0%, #414042 55%, #1a1a1c 100%);
  color: #fff;
  overflow: hidden;
  padding: 5rem 0 6rem;
}

.hero-bg-glow { position: absolute; border-radius: 50%; pointer-events: none; }
.hero-bg-glow--1 { width: 600px; height: 600px; top: -200px; right: -150px; background: radial-gradient(circle, rgba(255,179,0,.1) 0%, transparent 65%); }
.hero-bg-glow--2 { width: 500px; height: 500px; bottom: -200px; left: -100px; background: radial-gradient(circle, rgba(65,64,66,.15) 0%, transparent 65%); }
.hero-grid-overlay { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px); background-size: 50px 50px; pointer-events: none; }

.hero-content { position: relative; z-index: 2; text-align: center; max-width: 820px; margin: 0 auto; }

.hero-badge { display: inline-flex; align-items: center; gap: .55rem; padding: .6rem 1.3rem; background: rgba(255,179,0,.12); border: 1px solid rgba(255,179,0,.3); border-radius: 99px; font-size: .85rem; font-weight: 600; color: #ffd166; letter-spacing: .03em; margin-bottom: 1.75rem; animation: fadeInUp .7s ease both; }
.hero-badge i { color: #FFB300; font-size: 1rem; }

.hero-title { font-size: clamp(2.8rem, 7vw, 5rem); font-weight: 800; line-height: 1.1; letter-spacing: -.03em; background: linear-gradient(135deg, #fff 0%, #ffd166 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 1.25rem; animation: fadeInUp .7s ease .1s both; }
.hero-subtitle { font-size: 1.15rem; line-height: 1.7; color: rgba(255,255,255,.6); margin-bottom: 3rem; animation: fadeInUp .7s ease .2s both; }

.hero-perks { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 3rem; animation: fadeInUp .7s ease .3s both; max-width: 760px; margin-left: auto; margin-right: auto; }
.hero-perk { display: inline-flex; align-items: center; gap: .5rem; padding: .55rem 1.1rem; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); border-radius: 99px; font-size: .875rem; font-weight: 600; color: rgba(255,255,255,.75); backdrop-filter: blur(8px); transition: background .2s ease, border-color .2s ease; }
.hero-perk:hover { background: rgba(255,179,0,.1); border-color: rgba(255,179,0,.3); color: #ffd166; }
.hero-perk i { color: #FFB300; font-size: 1rem; }

.hero-scroll-hint { display: inline-flex; align-items: center; gap: .5rem; color: rgba(255,255,255,.45); font-size: .85rem; font-weight: 600; letter-spacing: .04em; text-decoration: none; transition: color .2s ease; animation: fadeInUp .7s ease .45s both; }
.hero-scroll-hint:hover { color: #FFB300; }
.hero-scroll-hint i { animation: bounceDown 1.6s ease-in-out infinite; }
@keyframes bounceDown { 0%,100% { transform: translateY(0); } 50% { transform: translateY(5px); } }

/* Vacancies section */
.vacancies-section { background: linear-gradient(160deg, #f9f9fa 0%, #fff8e1 50%, #f9f9fa 100%); padding: 5rem 0 7rem; }

.filters-wrap { margin-bottom: 3rem; }
.filters-scroll { display: flex; gap: .625rem; flex-wrap: wrap; justify-content: center; }
.filter-btn { display: inline-flex; align-items: center; gap: .5rem; padding: .6rem 1.1rem; border-radius: 12px; border: 1.5px solid #e8e8ea; background: #FEFEFE; font-size: .875rem; font-weight: 600; color: #5a5a5c; cursor: pointer; transition: all .22s ease; white-space: nowrap; }
.filter-btn i { font-size: .9rem; }
.filter-btn:hover:not(.active) { border-color: #FFB300; color: #cc8f00; background: rgba(255,179,0,.04); transform: translateY(-1px); }
.filter-btn.active { background: linear-gradient(135deg, #FFB300 0%, #e6a000 100%); border-color: transparent; color: #fff; box-shadow: 0 4px 14px rgba(255,179,0,.35); transform: translateY(-1px); }
.filter-btn.active i { color: #fff; }
.filter-count { display: inline-flex; align-items: center; justify-content: center; min-width: 20px; height: 20px; padding: 0 5px; border-radius: 99px; font-size: .72rem; font-weight: 700; background: rgba(65,64,66,.08); color: #737375; transition: background .22s ease, color .22s ease; line-height: 1; }
.filter-btn.active .filter-count { background: rgba(255,255,255,.28); color: #fff; }

.vacancies-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 400px), 1fr)); gap: 1.75rem; margin-bottom: 4rem; }

.vacancy-card { position: relative; background: #FEFEFE; border-radius: 22px; box-shadow: 0 4px 20px rgba(65,64,66,.06), 0 1px 4px rgba(65,64,66,.04); border: 1px solid rgba(65,64,66,.06); display: flex; flex-direction: column; overflow: hidden; transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease; }
.vacancy-card:hover { transform: translateY(-7px); box-shadow: 0 20px 48px rgba(255,179,0,.11), 0 4px 14px rgba(65,64,66,.07); }
.vacancy-card__stripe { height: 4px; background: linear-gradient(90deg, #FFB300, #414042); opacity: 0; transition: opacity .3s ease; }
.vacancy-card:hover .vacancy-card__stripe { opacity: 1; }

.vacancy-header { padding: 1.6rem 1.75rem 1.2rem; border-bottom: 1px solid #f4f4f5; }
.vacancy-meta { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: .5rem; margin-bottom: .85rem; }
.vacancy-badge { display: inline-flex; align-items: center; gap: .35rem; padding: .28rem .8rem; border-radius: 99px; font-size: .72rem; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; }
.vacancy-badge i { font-size: .8rem; }
.vacancy-salary { display: flex; align-items: center; gap: .35rem; font-size: .9rem; font-weight: 700; color: #414042; }
.vacancy-salary i { color: #FFB300; }
.vacancy-title { font-size: 1.35rem; font-weight: 800; color: #414042; margin: 0 0 .4rem; letter-spacing: -.02em; line-height: 1.3; }
.vacancy-area { display: flex; align-items: center; gap: .3rem; font-size: .82rem; color: #8c8c8e; margin: 0; }
.vacancy-area i { color: #FFB300; font-size: .85rem; }

.vacancy-body { padding: 1.25rem 1.75rem; flex: 1; display: flex; flex-direction: column; gap: 1rem; }
.vacancy-section h4 { display: flex; align-items: center; gap: .4rem; font-size: .78rem; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: #8c8c8e; margin-bottom: .5rem; }
.vacancy-section h4 i { color: #FFB300; }
.snippet-text { font-size: .9rem; line-height: 1.65; color: #5a5a5c; margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.snippet-text :deep(mark) { background: rgba(255,179,0,.18); color: #8a5f00; border-radius: 3px; padding: 0 2px; }

.vacancy-footer { padding: 1.1rem 1.75rem 1.6rem; }
.btn-apply { display: flex; align-items: center; justify-content: center; gap: .55rem; width: 100%; padding: .8rem 1.5rem; border-radius: 12px; background: var(--primary); color: #FEFEFE; font-size: .9rem; font-weight: 700; border: none; box-shadow: 0 6px 20px rgba(255,179,0,.28); transition: transform .25s ease, box-shadow .25s ease; letter-spacing: .02em; text-decoration: none; cursor: pointer; }
.btn-apply:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(255,179,0,.4); color: #FEFEFE; }
.btn-apply i { transition: transform .2s ease; }
.btn-apply:hover i { transform: translateX(3px); }

.empty-state { text-align: center; padding: 5rem 2rem; }
.empty-icon { width: 90px; height: 90px; border-radius: 50%; background: #f4f4f5; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2.5rem; color: #bebec0; }
.empty-state h3 { color: #414042; margin-bottom: .6rem; }
.empty-state p { color: #5a5a5c; margin-bottom: 2rem; }

.card-list-enter-active, .card-list-leave-active { transition: all .28s ease; }
.card-list-enter-from { opacity: 0; transform: translateY(14px) scale(.98); }
.card-list-leave-to { opacity: 0; transform: scale(.96); }
.card-list-move { transition: transform .32s ease; }

/* CTA */
.cta-section { position: relative; padding: 8rem 0; background: linear-gradient(135deg, #2d2d2f 0%, #414042 55%, #1a1a1c 100%); color: #fff; text-align: center; overflow: hidden; }
.cta-bg-glow { position: absolute; border-radius: 50%; pointer-events: none; }
.cta-bg-glow--1 { width: 500px; height: 500px; top: -150px; right: -150px; background: radial-gradient(circle, rgba(255,179,0,.1) 0%, transparent 65%); }
.cta-bg-glow--2 { width: 400px; height: 400px; bottom: -150px; left: -100px; background: radial-gradient(circle, rgba(65,64,66,.15) 0%, transparent 65%); }
.cta-grid-overlay { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px); background-size: 50px 50px; pointer-events: none; }
.cta-content { position: relative; z-index: 1; max-width: 620px; margin: 0 auto; }
.cta-icon { width: 80px; height: 80px; border-radius: 50%; background: rgba(255,179,0,.15); border: 1px solid rgba(255,179,0,.3); display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; font-size: 2rem; color: #FFB300; animation: pulse-glow 3s ease-in-out infinite; }
@keyframes pulse-glow { 0%,100% { box-shadow: 0 0 30px rgba(255,179,0,.2); } 50% { box-shadow: 0 0 55px rgba(255,179,0,.4); } }
.cta-title { font-size: clamp(1.75rem, 4vw, 2.75rem); font-weight: 800; letter-spacing: -.03em; background: linear-gradient(135deg, #fff 0%, #ffd166 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 1rem; }
.cta-text { font-size: 1.05rem; color: rgba(255,255,255,.55); line-height: 1.7; margin-bottom: 2.5rem; }
.cta-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
.cta-btn { display: inline-flex; align-items: center; gap: .6rem; padding: .9rem 2rem; border-radius: 12px; font-size: .95rem; font-weight: 700; text-decoration: none; transition: transform .25s ease, box-shadow .25s ease; letter-spacing: .02em; }
.cta-btn--ghost { background: rgba(255,255,255,.07); border: 1.5px solid rgba(255,255,255,.15); color: rgba(255,255,255,.8); backdrop-filter: blur(10px); }
.cta-btn--ghost:hover { transform: translateY(-3px); background: rgba(255,255,255,.12); border-color: rgba(255,179,0,.4); color: #fff; }

@keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

/* Responsive */
@media (max-width: 768px) {
  .hero--vacancies { padding: 4rem 0 5rem; min-height: auto; }
  .filters-scroll { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 6px; justify-content: flex-start; -webkit-overflow-scrolling: touch; }
  .filters-scroll::-webkit-scrollbar { display: none; }
  .filter-btn { flex-shrink: 0; }
  .vacancies-grid { grid-template-columns: 1fr; gap: 1.25rem; }
  .vacancy-header, .vacancy-body, .vacancy-footer { padding-left: 1.25rem; padding-right: 1.25rem; }
  .cta-section { padding: 5rem 0; }
  .cta-btn { width: 100%; max-width: 320px; justify-content: center; }
  .error-contacts { grid-template-columns: 1fr; }
  .error-actions { flex-direction: column; align-items: center; }
  .btn-retry, .btn-contact { width: 100%; max-width: 320px; justify-content: center; }
}

@media (max-width: 480px) {
  .hero-title { font-size: 2.4rem; }
  .vacancy-title { font-size: 1.2rem; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}

.spin { animation: spin .7s linear infinite; }
</style>