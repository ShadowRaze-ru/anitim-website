<template>
  <div class="home-page">
    <section class="hero">
      <img src="../assets/icons/black-white-flex.png" alt="АЛМАЗ" class="hero-logo" />
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            Алтайские <br>
            машиностроительные заводы<br>
            <span class="hero-title-accent"> АЛМАЗ</span>
          </h1>

          <p class="hero-subtitle fade-in">
            Сайт вакансий <strong>АО «Анитим»</strong> — входит в состав АЛМАЗ
          </p>

          <div class="hero-badge fade-in">
            <span>«Твоя работа - основа урожая. Построй карьеру в компании, которая создаёт технику для жизни»</span>
          </div>

          <div class="hero-stats">
            <div class="stat">
              <div class="stat-icon"><i class="bi bi-calendar-check"></i></div>
              <span class="stat-number">{{ settings.statMachines }}</span>
              <span class="stat-label">Машин в год</span>
            </div>
            <div class="stat">
              <div class="stat-icon"><i class="bi bi-lightbulb"></i></div>
              <span class="stat-number">{{ settings.statParts }}</span>
              <span class="stat-label">Запасных частей в год</span>
            </div>
            <div class="stat">
              <div class="stat-icon"><i class="bi bi-mortarboard"></i></div>
              <span class="stat-number">{{ settings.statJobs }}</span>
              <span class="stat-label">Рабочих мест</span>
            </div>
            <div class="stat">
              <div class="stat-icon"><i class="bi bi-trophy"></i></div>
              <span class="stat-number">{{ settings.statArea }}</span>
              <span class="stat-label">Новых производственных площадей</span>
            </div>
          </div>

          <div class="hero-actions">
            <router-link to="/vacancies" class="btn btn-primary btn-lg">
              <i class="bi bi-briefcase"></i>
              Смотреть вакансии
            </router-link>
            <router-link to="/contacts" class="btn btn-secondary btn-lg">
              <i class="bi bi-envelope"></i>
              Будь с нами
            </router-link>
          </div>
        </div>
      </div>

      <div class="hero-particles">
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
      </div>
    </section>

    <section class="section about-factory">
      <div class="container">
        <div class="section-header-center">
          <h2 class="section-title">АО «Анитим»</h2>
        </div>

        <div class="factory-info">
          <div class="factory-facts">
            <div class="fact-item">
              <i class="bi bi-calendar3"></i>
              <p>65+ лет успешной работы</p>
            </div>
            <div class="fact-item">
              <i class="bi bi-tools"></i>
              <p>Более 1000 единиц в год</p>
            </div>
            <div class="fact-item">
              <i class="bi bi-geo-alt"></i>
              <p>г. Барнаул, Алтайский край</p>
            </div>
          </div>

          <div class="factory-gallery">
            <h3>Фотогалерея «Наша техника в деле»</h3>
            <p>Реальные фото с полей — показываем, как наша техника работает на практике</p>

            <div v-if="galLoading" class="gallery-loading">
              <div class="gallery-spinner"></div>
              <p>Загружаем галерею...</p>
            </div>

            <div v-else-if="gallery.length === 0" class="gallery-empty">
              <i class="bi bi-images"></i>
              <p>Фотографии скоро появятся</p>
            </div>

            <div v-else class="gallery-grid">
              <div
                v-for="(img, index) in gallery"
                :key="img.id"
                class="gallery-item"
                @click="openLightbox(index)"
              >
                <img
                  :src="img.url"
                  :alt="img.alt || 'Фото'"
                  loading="lazy"
                  @error="e => e.target.style.opacity = '0.3'"
                />
                <div class="gallery-overlay"><i class="bi bi-zoom-in"></i></div>
              </div>
            </div>

            <Teleport to="body">
              <div v-if="lightboxOpen" class="lightbox" @click.self="closeLightbox">
                <button class="lightbox-close" @click="closeLightbox"><i class="bi bi-x-lg"></i></button>
                <button class="lightbox-prev" @click="prevImage"><i class="bi bi-chevron-left"></i></button>
                <img
                  :src="gallery[lightboxIndex]?.url"
                  :alt="gallery[lightboxIndex]?.alt || 'Фото'"
                  class="lightbox-img"
                />
                <button class="lightbox-next" @click="nextImage"><i class="bi bi-chevron-right"></i></button>
                <div class="lightbox-counter">{{ lightboxIndex + 1 }} / {{ gallery.length }}</div>
              </div>
            </Teleport>
          </div>

          <div class="factory-testimonial" style="margin-top: 2rem;">
            <p class="testimonial-quote">«То, что ты создаёшь здесь, работает здесь»</p>
            <p class="testimonial-caption">Механизм, который собрали в цехе, сейчас трудится в поле недалеко от завода</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section benefits-section">
      <div class="container">
        <div class="section-header-center">
          <h2 class="section-title">Работа, которая даёт больше</h2>
        </div>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon"><i class="bi bi-building"></i></div>
            <h3>Стабильность</h3>
            <p>Соцпакет, питание и медпункт — за счёт компании</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon"><i class="bi bi-gear-wide-connected"></i></div>
            <h3>Современные условия</h3>
            <p>Новое оборудование, роботы, ЧПУ-станки и форма в подарок</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon"><i class="bi bi-book"></i></div>
            <h3>Обучение с нуля</h3>
            <p>Обучим, дадим наставника и поможем вырасти</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon"><i class="bi bi-cash-coin"></i></div>
            <h3>Достойная оплата</h3>
            <p>Официальная зарплата без задержек и сюрпризов</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section testimonials-section">
      <div class="container">
        <div class="section-header-center">
          <h2 class="section-title">Истории сотрудников</h2>
        </div>
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testimonial-header">
              <div class="testimonial-avatar"><i class="bi bi-person-circle"></i></div>
              <div><h4>Александр</h4><p class="role">Электрогазосварщик</p></div>
            </div>
            <blockquote>«Я собираю узлы для сеялок. От того, насколько точно я это сделаю, зависит, взойдут ли семена. Это ответственность. Но меня здесь научили делать идеально».</blockquote>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-header">
              <div class="testimonial-avatar"><i class="bi bi-person-circle"></i></div>
              <div><h4>Мария</h4><p class="role">Инженер</p></div>
            </div>
            <blockquote>«Раньше работала в автопроме. Здесь проект идёт от чертежа до поля быстрее. Видишь, как твоя разработка реально повышает урожай — это кайф».</blockquote>
          </div>
        </div>
      </div>
    </section>

    <section class="section vacancies-preview-section">
      <div class="container">
        <div class="section-header-center">
          <h2 class="section-title">Открытые вакансии</h2>
        </div>

        <div v-if="vacanciesLoading" class="vp-loading">
          <div class="vp-spinner"></div>
          <p>Загружаем вакансии...</p>
        </div>

        <template v-else>
          <div v-if="previewVacancies.length" class="vp-grid">
            <div v-for="(vacancy, index) in previewVacancies" :key="vacancy.id" class="vp-card" :style="{ '--i': index }">
              <div class="vp-card__top">
                <span class="vp-badge">{{ vacancy.department }}</span>
                <span class="vp-salary"><i class="bi bi-cash-coin"></i>{{ vacancy.salary }}</span>
              </div>
              <h3 class="vp-title">{{ vacancy.title }}</h3>
              <p v-if="vacancy.snippet" class="vp-snippet">{{ vacancy.snippet }}</p>
              <div class="vp-footer">
                <a v-if="vacancy.url" :href="vacancy.url" target="_blank" rel="noopener noreferrer" class="vp-btn">
                  Откликнуться <i class="bi bi-arrow-right"></i>
                </a>
                <router-link v-else to="/contacts" class="vp-btn">Связаться с HR <i class="bi bi-arrow-right"></i></router-link>
              </div>
            </div>
          </div>
          <div v-else class="vp-empty">
            <i class="bi bi-briefcase"></i>
            <p>Актуальные вакансии скоро появятся</p>
          </div>
          <div class="vp-cta">
            <router-link to="/vacancies" class="btn btn-primary btn-lg">
              <i class="bi bi-grid-3x3-gap"></i>Все вакансии
            </router-link>
            <p class="vp-cta-note" v-if="vacancies.length > 3">
              Ещё {{ vacancies.length - 3 }} {{ pluralVacancy(vacancies.length - 3) }}
            </p>
          </div>
        </template>
      </div>
    </section>

    <section class="section hiring-process">
      <div class="container">
        <div class="section-header-center">
          <h2 class="section-title">Хочешь в команду?</h2>
        </div>
        <div class="process-steps">
          <template v-for="(step, index) in steps" :key="index">
            <div class="process-step">
              <div class="step-number">{{ index + 1 }}</div>
              <h4>{{ step.title }}</h4>
              <p>{{ step.desc }}</p>
            </div>
            <div v-if="index < steps.length - 1" class="process-arrow"><i class="bi bi-arrow-right"></i></div>
          </template>
        </div>
      </div>
    </section>

    <section class="section virtual-tour">
      <div class="container">
        <div class="section-header-center">
          <h2 class="section-title">Виртуальный тур по заводу</h2>
        </div>
        <div class="tour-video-wrapper">
          <div v-if="!tourPlaying" class="tour-preview" @click="tourPlaying = true">
            <img src="../assets/png/preview.jpg" alt="Виртуальный тур" class="tour-preview-img" />
            <div class="tour-play-btn"><i class="bi bi-play-fill"></i></div>
          </div>
          <iframe v-else src="https://rutube.ru/play/embed/3ab15bcdf35c43813dc64165d8c3a37b/?autoplay=1&mute=0"
            allow="autoplay; clipboard-write; fullscreen" allowfullscreen />
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <div class="cta-icon"><i class="bi bi-people"></i></div>
          <h2 class="cta-title">Присоединяйся к команде</h2>
          <p class="cta-subtext"><strong>Посмотри открытые вакансии или напиши нам — найдём место для тебя</strong></p>
          <div class="cta-actions">
            <router-link to="/vacancies" class="btn btn-primary btn-lg">
              <i class="bi bi-briefcase"></i>Смотреть вакансии
            </router-link>
            <router-link to="/contacts" class="btn btn-accent btn-lg">
              <i class="bi bi-envelope"></i>Связаться с нами
            </router-link>
          </div>
          <div class="contact-info-footer">
            <p><i class="bi bi-telephone"></i> {{ settings.phone }}</p>
            <p><i class="bi bi-envelope"></i> {{ settings.email }}</p>
            <p><i class="bi bi-geo-alt"></i> {{ settings.address }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'HomePage',
  data() {
    return {
      steps: [
        { title: 'Откликнись', desc: 'Выбери вакансию и отправь отклик — это займёт пару минут' },
        { title: 'Поговори с HR', desc: 'Коротко познакомимся и ответим на твои вопросы' },
        { title: 'Приходи на завод', desc: 'Покажем цеха, оборудование и познакомим с командой' },
        { title: 'Выходи на работу', desc: 'Начнёшь с наставником — не бросим с первого дня' }
      ],
      lightboxOpen: false,
      lightboxIndex: 0,
      tourPlaying: false,
    }
  },

  computed: {
    ...mapGetters(['settings', 'vacancies', 'vacanciesLoading', 'gallery', 'galLoading']),

    previewVacancies() {
      return (this.vacancies || []).slice(0, 3).map(v => ({
        id: v.id,
        title: v.name,
        url: v.alternate_url || null,
        department: v.department?.name || v.professional_roles?.[0]?.name || 'Вакансия',
        salary: this.formatSalary(v.salary),
        snippet: v.snippet?.responsibility
          ? v.snippet.responsibility.replace(/<[^>]+>/g, '').slice(0, 120) + '…'
          : (v.snippet?.requirement ? v.snippet.requirement.replace(/<[^>]+>/g, '').slice(0, 120) + '…' : null)
      }))
    }
  },

  async mounted() {
    this.subscribeGallery()
    await this.fetchVacancies()
  },

  methods: {
    ...mapActions(['fetchVacancies', 'subscribeGallery']),

    formatSalary(salary) {
      if (!salary) return 'З/п по договорённости'
      const cur = salary.currency === 'RUR' ? '₽' : salary.currency
      if (salary.from && salary.to) return `от ${salary.from.toLocaleString('ru')} до ${salary.to.toLocaleString('ru')} ${cur}`
      if (salary.from) return `от ${salary.from.toLocaleString('ru')} ${cur}`
      if (salary.to) return `до ${salary.to.toLocaleString('ru')} ${cur}`
      return 'З/п по договорённости'
    },

    pluralVacancy(n) {
      const mod10 = n % 10, mod100 = n % 100
      if (mod10 === 1 && mod100 !== 11) return 'вакансия'
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'вакансии'
      return 'вакансий'
    },

    openLightbox(index) {
      this.lightboxIndex = index
      this.lightboxOpen = true
      document.documentElement.style.overflow = 'hidden'
    },
    closeLightbox() {
      this.lightboxOpen = false
      document.documentElement.style.overflow = ''
    },
    prevImage() {
      this.lightboxIndex = (this.lightboxIndex - 1 + this.gallery.length) % this.gallery.length
    },
    nextImage() {
      this.lightboxIndex = (this.lightboxIndex + 1) % this.gallery.length
    }
  }
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  background:
    linear-gradient(135deg, rgba(45, 45, 47, 0.82) 0%, rgba(65, 64, 66, 0.75) 100%),
    url('../assets/png/background-hero.jpg') center center / cover no-repeat;
  color: #FEFEFE;
  overflow: hidden;
  padding: 6rem 0 4rem;
}

.hero-logo {
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  height: 52px;
  width: auto;
  z-index: 3;
  opacity: 0.92;
  transition: opacity 0.2s ease;
}

.hero-logo:hover {
  opacity: 1;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  width: 100%;
}

.hero-title {
  font-size: clamp(1.5rem, 5vw, 4.5rem);
  margin-bottom: 1.5rem;
  line-height: 1.2;
  color: #FEFEFE;
  animation: fadeInUp 0.8s ease 0.2s both;
  word-break: break-word;
}

.hero-title-accent {
  background: linear-gradient(180deg, #FFB300 0%, #ffd166 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-title-accent::selection {
  background: #ffb30039;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 179, 0, 0.12);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 179, 0, 0.25);
  margin-bottom: 1.25rem;
  font-weight: 600;
  font-size: clamp(0.8rem, 2vw, 0.9375rem);
  color: rgba(255, 255, 255, 0.9);
  animation: fadeInUp 0.8s ease both;
  max-width: 100%;
  text-align: center;
}

.hero-badge i {
  color: #FFB300;
  flex-shrink: 0;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 2.5rem 0;
  animation: fadeInUp 0.8s ease 0.4s both;
}

.stat {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 179, 0, 0.2);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.625rem;
  font-size: 1.25rem;
  color: #FFB300;
  flex-shrink: 0;
}

.stat-number {
  display: block;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 900;
  margin-bottom: 0.25rem;
  color: #FEFEFE;
  line-height: 1;
}

.stat-label {
  font-size: clamp(0.75rem, 1.5vw, 0.9375rem);
  opacity: 0.9;
  color: rgba(255, 255, 255, 0.85);
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
  animation: fadeInUp 0.8s ease 0.6s both;
}

.hero-particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.hero-subtitle {
  font-size: clamp(0.8rem, 1.5vw, 1rem);
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1.25rem;
  margin-top: -1rem;
  font-weight: 400;
  letter-spacing: 0.03em;
}

.hero-subtitle strong {
  color: rgba(255, 255, 255, 0.85);
  font-weight: 600;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 179, 0, 0.5);
  border-radius: 50%;
  animation: particleFloat 15s infinite ease-in-out;
}

.particle:nth-child(1) { left: 20%; top: 20%; animation-delay: 0s; }
.particle:nth-child(2) { left: 80%; top: 40%; animation-delay: -3s; }
.particle:nth-child(3) { left: 50%; top: 60%; animation-delay: -6s; }
.particle:nth-child(4) { left: 30%; top: 80%; animation-delay: -9s; }
.particle:nth-child(5) { left: 70%; top: 70%; animation-delay: -12s; }

.section-header-center {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: clamp(1.5rem, 4vw, 3rem);
  margin-bottom: 1rem;
  color: #414042;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #5a5a5c;
}

.about-factory {
  background: #f9f9fa;
  content-visibility: auto;
  contain-intrinsic-size: 0 800px;
}

.factory-info {
  max-width: 900px;
  margin: 0 auto;
}

.factory-facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.fact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: #FEFEFE;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-slow);
  border: solid 1px transparent;
}

.fact-item:hover {
  border-color: var(--primary);
}

.fact-item i {
  font-size: 1.75rem;
  color: #FFB300;
  flex-shrink: 0;
}

.fact-item p {
  margin: 0 0 0.25rem;
}

.factory-testimonial {
  background: #FEFEFE;
  padding: 2rem;
  border-radius: var(--radius-xl);
  border-left: 4px solid #FFB300;
  transition: var(--transition-slow);
}

.factory-testimonial:hover {
  transform: scale(1.02);
}

.testimonial-quote {
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: 600;
  margin-bottom: 1rem;
  color: #414042;
}

.testimonial-caption {
  color: #5a5a5c;
  font-style: italic;
  margin: 0;
}

.gallery-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem 0;
  color: #5a5a5c;
}

.gallery-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #e8e8ea;
  border-top-color: #FFB300;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.gallery-empty {
  text-align: center;
  padding: 3rem 0;
  color: #a5a5a7;
}

.gallery-empty i {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 0.75rem;
  opacity: 0.4;
}

.gallery-empty p {
  margin: 0;
  font-size: 0.9rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-top: 2rem;
  contain: layout style;
}

.gallery-item {
  position: relative;
  aspect-ratio: 4/3;
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  contain: layout style;
  background: #e8e8ea;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: rgba(45, 45, 47, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  font-size: 1.75rem;
  color: white;
  opacity: 0;
}

.gallery-item:hover img {
  transform: scale(1.08);
}

.gallery-item:hover .gallery-overlay {
  background: rgba(45, 45, 47, 0.45);
  opacity: 1;
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
  overflow: hidden;
}

.lightbox-img {
  max-width: 85vw;
  max-height: 70vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: var(--radius-lg);
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.6);
  display: block;
  flex-shrink: 0;
}

.lightbox-close,
.lightbox-prev,
.lightbox-next {
  position: absolute;
  background: rgba(255, 179, 0, 0.85);
  border: none;
  color: white;
  font-size: 1.25rem;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.lightbox-close:hover,
.lightbox-prev:hover,
.lightbox-next:hover {
  background: #e6a000;
}

.lightbox-close { top: 1.5rem; right: 1.5rem; }
.lightbox-prev { left: 1.5rem; top: 50%; transform: translateY(-50%); }
.lightbox-next { right: 1.5rem; top: 50%; transform: translateY(-50%); }

.lightbox-counter {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.benefit-card {
  background: #FEFEFE;
  padding: 2rem 1.5rem;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-md);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: var(--transition-base);
}

.benefit-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.benefit-icon {
  width: 68px;
  height: 68px;
  background: var(--secondary);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin: 0 auto 1.25rem;
  color: white;
  font-size: 1.875rem;
}

.benefit-card h3 {
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  margin-bottom: 0.75rem;
  line-height: 1.3;
  color: #414042;
}

.benefit-card p {
  font-size: clamp(0.875rem, 1.2vw, 1rem);
  color: #5a5a5c;
  margin: 0;
  line-height: 1.6;
}

.testimonials-section,
.hiring-process,
.virtual-tour {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background: #FEFEFE;
  padding: 2rem;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-lg);
  transition: var(--transition-slow);
}

.testimonial-card:hover {
  transform: translateY(-12px);
}

.testimonial-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.testimonial-avatar {
  font-size: 3rem;
  color: #FFB300;
}

.testimonial-header h4 {
  margin: 0;
  color: #414042;
}

.role {
  color: #5a5a5c;
  margin: 0;
}

blockquote {
  margin: 0;
  font-style: italic;
  color: #5a5a5c;
  line-height: 1.7;
  border-left: 4px solid #FFB300;
  padding-left: 1.5rem;
}

.vacancies-preview-section {
  background: linear-gradient(160deg, #f9f9fa 0%, #fff8e1 50%, #f9f9fa 100%);
}

.vp-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem 0;
  color: #5a5a5c;
}

.vp-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e8e8ea;
  border-top-color: #FFB300;
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
}

.vp-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.vp-card {
  background: #FEFEFE;
  border-radius: 20px;
  padding: 1.75rem;
  border: 1px solid rgba(65, 64, 66, 0.07);
  box-shadow: 0 4px 20px rgba(65, 64, 66, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: transform 0.3s cubic-bezier(.22, 1, .36, 1), box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: cardIn 0.4s ease both;
  animation-delay: calc(var(--i, 0) * 0.08s);
}

.vp-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, #FFB300, #414042);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.vp-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(255, 179, 0, 0.12), 0 4px 12px rgba(65, 64, 66, 0.06);
}

.vp-card:hover::before { opacity: 1; }

@keyframes cardIn {
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.vp-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.vp-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 99px;
  background: linear-gradient(135deg, rgba(255, 179, 0, 0.1) 0%, rgba(65, 64, 66, 0.1) 100%);
  border: 1px solid rgba(255, 179, 0, 0.2);
  color: #cc8f00;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  white-space: nowrap;
}

.vp-salary {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #414042;
}

.vp-salary i { color: #FFB300; }

.vp-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #414042;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

.vp-snippet {
  font-size: 0.875rem;
  color: #5a5a5c;
  line-height: 1.6;
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.vp-footer {
  margin-top: auto;
  padding-top: 0.75rem;
}

.vp-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #FFB300;
  text-decoration: none;
  transition: gap 0.2s ease, color 0.2s ease;
}

.vp-btn:hover { gap: 0.7rem; color: #e6a000; }
.vp-btn i { font-size: 0.9rem; }

.vp-empty {
  text-align: center;
  padding: 3rem;
  color: #a5a5a7;
}

.vp-empty i {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 0.75rem;
}

.vp-empty p { margin: 0; }

.vp-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.vp-cta-note {
  margin: 0;
  font-size: 0.875rem;
  color: #8c8c8e;
}

.process-steps {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.process-steps:has(.process-step:hover) .process-step {
  opacity: 0.4;
  filter: blur(1px);
  transform: scale(0.96);
  transition: opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease;
}

.process-steps:has(.process-step:hover) .process-step:hover {
  opacity: 1;
  filter: blur(0);
  transform: scale(1.04);
}

.process-step {
  background: #FEFEFE;
  padding: 2rem 1.5rem;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  text-align: center;
  flex: 1;
  min-width: 160px;
  max-width: 220px;
  transition: opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease;
}

.step-number {
  width: 52px;
  height: 52px;
  background: var(--secondary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.375rem;
  font-weight: 900;
  margin: 0 auto 1rem;
}

.process-step h4 { margin-bottom: 0.5rem; color: #414042; }
.process-step p { color: #5a5a5c; }
.process-arrow { font-size: 1.75rem; color: var(--secondary); }

.virtual-tour .container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tour-preview {
  position: absolute;
  inset: 0;
  cursor: pointer;
}

.tour-preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: filter 0.3s ease;
}

.tour-preview:hover .tour-preview-img { filter: brightness(0.75); }

.tour-play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: rgba(255, 179, 0, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.25rem;
  color: white;
  transition: transform 0.2s ease, background 0.2s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.tour-preview:hover .tour-play-btn {
  transform: translate(-50%, -50%) scale(1.1);
  background: #FFB300;
}

.tour-video-wrapper {
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-2xl);
  max-width: 900px;
  width: 100%;
  position: relative;
  aspect-ratio: 8/3;
}

.tour-video-wrapper iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

.cta-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #2d2d2f 0%, #414042 100%);
  color: #FEFEFE;
  text-align: center;
}

.cta-icon {
  width: 96px;
  height: 96px;
  background: rgba(255, 179, 0, 0.2);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  font-size: 2.75rem;
  color: #FFB300;
}

.cta-title {
  font-size: clamp(1.5rem, 5vw, 3.5rem);
  margin-bottom: 1rem;
  color: #FEFEFE;
}

.cta-subtext {
  font-size: 1.125rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.contact-info-footer {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  opacity: 0.9;
}

.contact-info-footer p {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0;
  color: rgba(255, 255, 255, 0.85);
}

.contact-info-footer i { color: #FFB300; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes particleFloat {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  50% { transform: translateY(-100px) translateX(50px); }
}

@media (max-width: 1024px) {
  .benefits-grid { grid-template-columns: repeat(2, 1fr); }
  .hero-stats { grid-template-columns: repeat(4, 1fr); gap: 0.75rem; }
  .vp-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .gallery-grid { grid-template-columns: repeat(3, 1fr); }
  .lightbox-prev { left: 0.5rem; }
  .lightbox-next { right: 0.5rem; }
  .hero { min-height: 100svh; padding: 5.5rem 0 3rem; align-items: flex-start; }
  .hero-logo { height: 40px; top: 1rem; left: 1rem; }
  .hero-stats { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin: 1.75rem 0; }
  .stat-icon { width: 40px; height: 40px; font-size: 1.1rem; margin-bottom: 0.5rem; }
  .hero-actions { flex-direction: column; align-items: stretch; padding: 0 1rem; }
  .hero-actions .btn { width: 100%; justify-content: center; }
  .hero-badge { font-size: 0.8125rem; padding: 0.4rem 0.875rem; }
  .benefits-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
  .benefit-card { padding: 1.5rem 1rem; }
  .benefit-icon { width: 54px; height: 54px; font-size: 1.5rem; }
  .testimonials-grid { grid-template-columns: 1fr; }
  .process-arrow { display: none; }
  .process-step { min-width: 140px; max-width: 100%; flex: 1 1 calc(50% - 1rem); }
  .cta-section { padding: 4rem 0; }
  .cta-actions { flex-direction: column; align-items: center; }
  .cta-actions .btn { width: 100%; max-width: 320px; }
  .tour-video-wrapper { aspect-ratio: 16/9; border-radius: var(--radius-lg); }
  .vp-grid { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .gallery-grid { grid-template-columns: repeat(2, 1fr); }
  .hero { padding-top: 5rem; }
  .hero-logo { height: 36px; }
  .hero-title br { display: none; }
  .hero-stats { grid-template-columns: repeat(2, 1fr); gap: 0.625rem; }
  .stat {
    background: rgba(255, 179, 0, 0.1);
    border: 1px solid rgba(255, 179, 0, 0.2);
    border-radius: var(--radius-xl);
    padding: 0.875rem 0.5rem;
  }
  .benefits-grid { grid-template-columns: 1fr; }
  .benefit-card { flex-direction: row; text-align: left; gap: 1rem; padding: 1.25rem; align-items: flex-start; }
  .benefit-icon { margin: 0; flex-shrink: 0; }
  .benefit-card h3 { margin-bottom: 0.375rem; }
  .process-step { flex: 1 1 100%; max-width: 100%; }
  .cta-section { padding: 3rem 0; }
  .cta-icon { width: 72px; height: 72px; font-size: 2rem; }
}

@media (max-width: 360px) {
  .stat-number { font-size: 1.375rem; }
  .stat-label { font-size: 0.6875rem; }
  .stat-icon { width: 36px; height: 36px; font-size: 1rem; }
}

@media (hover: none) and (pointer: coarse) {
  .benefit-card:hover,
  .fact-item:hover,
  .factory-testimonial:hover,
  .testimonial-card:hover,
  .vp-card:hover { transform: none; box-shadow: var(--shadow-md); }
  .process-steps:has(.process-step:hover) .process-step { opacity: 1; filter: none; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .particle,
  .hero-title,
  .hero-badge,
  .hero-stats,
  .hero-actions { animation: none !important; }
}
</style>