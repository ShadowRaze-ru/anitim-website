<template>
  <div class="about-page">
    <section class="hero hero--about">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">О компании</h1>

          <div class="hero-badge">
            <i class="bi bi-award"></i>
            <span>История, миссия и ценности Алтайских машиностроительных заводов АЛМАЗ</span>
          </div>

          <div class="hero-actions">
            <a href="#mission-section" class="btn btn--about">
              <i class="bi bi-arrow-down"></i>
              <span>Узнать больше</span>
            </a>
          </div>
        </div>
      </div>

      <div class="hero-shape hero-shape--1"></div>
      <div class="hero-shape hero-shape--2"></div>
      <div class="hero-grid"></div>
    </section>

    <section class="section mission-section" id="mission-section">
      <div class="container">

        <div class="mission-header">
          <h2 class="mission-title">Миссия и ценности</h2>
        </div>

        <div class="mission-main-card">
          <div class="mission-main-card__bg"></div>
          <div class="mission-main-card__icon">
            <i class="bi bi-rocket-takeoff"></i>
          </div>
          <div class="mission-main-card__content">
            <div class="mission-main-card__label">Наша миссия</div>
            <p class="mission-main-card__text">
              Алтайские машиностроительные заводы «АЛМАЗ» — производитель сельскохозяйственной техники
              и запасных частей для аграриев России. Мы создаём машины, которые работают в полях,
              а не на витринах. Наш девиз: надёжная техника — ответственное партнёрство.
            </p>
          </div>
          <div class="mission-main-card__decoration">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
              <circle cx="100" cy="100" r="55" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
              <circle cx="100" cy="100" r="30" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
              <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(255,255,255,0.04)" stroke-width="1" />
              <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(255,255,255,0.04)" stroke-width="1" />
            </svg>
          </div>
        </div>

        <div class="mission-grid-wrapper">
          <div class="mission-grid">
            <div class="mission-card mission-card--values">
              <div class="mission-card__header">
                <div class="mission-card__icon-wrap mission-card__icon-wrap--gold">
                  <i class="bi bi-gem"></i>
                </div>
                <h3 class="mission-card__title">Ценности</h3>
              </div>
              <div class="values-grid">
                <div class="value-chip">
                  <i class="bi bi-shield-check"></i>
                  <span class="value-chip__short">Я — личность.</span>
                  <span class="value-chip__tooltip">Целостная, профессиональная, развивающаяся и развивающая других,
                    решающая сложные и интересные задачи, ответственная.</span>
                </div>
                <div class="value-chip">
                  <i class="bi bi-lightbulb"></i>
                  <span class="value-chip__short">Мы — команда.</span>
                  <span class="value-chip__tooltip">Основанная на взаимном уважении, доверии, нацеленная на достижение
                    результата.</span>
                </div>
                <div class="value-chip">
                  <i class="bi bi-award"></i>
                  <span class="value-chip__short">Наш бизнес.</span>
                  <span class="value-chip__tooltip">Ориентирован на клиента и общество, дает каждому уверенность в
                    завтрашнем дне, материальном благополучии и общественное признание.</span>
                </div>
                <div class="value-chip">
                  <i class="bi bi-people"></i>
                  <span class="value-chip__short">Все для клиента.</span>
                  <span class="value-chip__tooltip">Инновации, качество, долгосрочное взаимовыгодное партнерство.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <section class="section timeline-section">
      <div class="container">
        <h2 class="text-center mb-5 section-title-custom">Наша история</h2>
        <p class="timeline-subtitle">Алтайские машиностроительные заводы «АЛМАЗ» расположены в Алтайском крае, где
          традиционно было развито сельскохозяйственное машиностроение и находился один из
          крупнейших в СССР Алтайский тракторный завод.</p>

        <div class="timeline">
          <div class="timeline-line"></div>

          <div v-for="(item, index) in timelineItems" :key="item.year" class="timeline-item"
            :class="[index % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right', { 'is-visible': item.visible }]"
            :ref="el => { if (el) itemRefs[index] = el }">
            <div class="timeline-dot">
              <i :class="['bi', item.icon]"></i>
            </div>

            <div class="timeline-card">
              <div class="timeline-year-badge">{{ item.year }}</div>
              <p class="timeline-card-text">{{ item.text }}</p>
              <div class="timeline-tag" v-if="item.tag">{{ item.tag }}</div>
            </div>

            <div class="timeline-connector"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutInstitute',
  data() {
    return {
      itemRefs: [],
      observer: null,
      timelineItems: [
        {
          year: '1992',
          text: 'Образована фирма «Инсайдер», торговое предприятие, одним из профилей которого была торговля запасными частями для техники.',
          icon: 'bi-piggy-bank',
          tag: 'Начало торговли запчастями',
          visible: false
        },
        {
          year: '2001',
          text: 'Основано ЗАО «Рубцовский завод запасных частей», открыто производство запасных частей.',
          icon: 'bi-buildings',
          tag: 'Собственное производство',
          visible: false
        },
        {
          year: '2010',
          text: 'Создан ТД «Алмаз», начато формирование дилерской сети компании.',
          icon: 'bi-diagram-3',
          tag: 'Формирование дилерской сети',
          visible: false
        },
        {
          year: '2017',
          text: 'АО «АНИТИМ» вошло в состав объединения компаний «Алмаз»',
          icon: 'bi-people',
          tag: 'Объединение активов',
          visible: false
        },
        {
          year: '2022',
          text: 'Введен в эксплуатацию первый в Алтайском крае промышленный технопарк «Юг Алтая»',
          icon: 'bi-houses-fill',
          tag: 'Первый технопарк в крае',
          visible: false
        },
        {
          year: '2024',
          text: 'Запуск третьего в Алтайском крае Технопарка «Компонент»',
          icon: 'bi-houses',
          tag: 'Новый технопарк',
          visible: false
        }
      ]
    }
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    this.$nextTick(() => {
      this.setupObserver()
    })
  },
  beforeUnmount() {
    if (this.observer) this.observer.disconnect()
  },
  methods: {
    setupObserver() {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const index = this.itemRefs.indexOf(entry.target)
              if (index !== -1) {
                setTimeout(() => {
                  this.timelineItems[index].visible = true
                }, index * 100)
              }
            }
          })
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
      )
      this.itemRefs.forEach(el => {
        if (el) this.observer.observe(el)
      })
    }
  }
}
</script>

<style scoped>
.timeline-section {
  background: linear-gradient(160deg, #f9f9fa 0%, #fff8e1 50%, #f9f9fa 100%);
  position: relative;
  overflow: hidden;
}

.timeline-section::before {
  content: '';
  position: absolute;
  top: -200px;
  right: -200px;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 179, 0, 0.06) 0%, transparent 70%);
  pointer-events: none;
}

.section-title-custom {
  font-size: clamp(2rem, 5vw, 3.5rem);
  text-align: center;
  position: relative;
  padding-bottom: 1.5rem;
  margin-bottom: 0.5rem !important;
}

.section-title-custom::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(135deg, #FFB300 0%, #414042 100%);
  border-radius: 99px;
}

.timeline-subtitle {
  text-align: center;
  color: #5a5a5c;
  font-size: 1.1rem;
  margin-bottom: 5rem;
  letter-spacing: 0.02em;
}

.timeline {
  position: relative;
  padding: 1rem 0 3rem;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  transform: translateX(-50%);
  width: 3px;
  background: linear-gradient(180deg,
      transparent 0%,
      var(--primary),
      transparent 100%);
}

.timeline-item {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 4rem;
  opacity: 0;
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.timeline-item--left {
  flex-direction: row;
  transform: translateX(-60px);
}

.timeline-item--right {
  flex-direction: row-reverse;
  transform: translateX(60px);
}

.timeline-item.is-visible {
  opacity: 1;
  transform: translateX(0);
}

.timeline-dot {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 6px rgba(255, 179, 0, 0.15), 0 8px 24px rgba(255, 179, 0, 0.3);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.timeline-dot i {
  font-size: 1.3rem;
  color: white;
}

.timeline-item.is-visible .timeline-dot {
  animation: dotPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: 0.2s;
}

@keyframes dotPop {
  from {
    transform: translateX(-50%) scale(0.5);
  }

  to {
    transform: translateX(-50%) scale(1);
  }
}

.timeline-item:hover .timeline-dot {
  transform: translateX(-50%) scale(1.1);
  box-shadow: 0 0 0 10px rgba(255, 179, 0, 0.2), 0 12px 32px rgba(255, 179, 0, 0.4);
}

.timeline-connector {
  flex: 0 0 calc(50% - 50px);
}

.timeline-card {
  flex: 0 0 calc(50% - 90px);
  background: #FEFEFE;
  border-radius: 20px;
  padding: 2rem 2rem 1.75rem;
  box-shadow: 0 4px 24px rgba(65, 64, 66, 0.07), 0 1px 4px rgba(65, 64, 66, 0.04);
  border: 1px solid rgba(255, 179, 0, 0.1);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.timeline-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #FFB300, #414042);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.timeline-item:hover .timeline-card {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(255, 179, 0, 0.12), 0 4px 12px rgba(65, 64, 66, 0.06);
}

.timeline-item:hover .timeline-card::before {
  opacity: 1;
}

.timeline-item--left .timeline-card::after {
  content: '';
  position: absolute;
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
  border: 12px solid transparent;
  border-right: 0;
  border-left-color: #FEFEFE;
  filter: drop-shadow(2px 0 2px rgba(0, 0, 0, 0.05));
}

.timeline-item--right .timeline-card::after {
  content: '';
  position: absolute;
  left: -12px;
  top: 50%;
  transform: translateY(-50%);
  border: 12px solid transparent;
  border-left: 0;
  border-right-color: #FEFEFE;
  filter: drop-shadow(-2px 0 2px rgba(0, 0, 0, 0.05));
}

.timeline-year-badge {
  display: inline-block;
  padding: 0.3rem 0.9rem;
  border-radius: 99px;
  background: linear-gradient(135deg, rgba(255, 179, 0, 0.12) 0%, rgba(65, 64, 66, 0.12) 100%);
  color: #cc8f00;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  margin-bottom: 0.75rem;
  border: 1px solid rgba(255, 179, 0, 0.2);
}

.timeline-card-text {
  color: #5a5a5c;
  font-size: 0.97rem;
  line-height: 1.75;
  margin-bottom: 1rem;
}

.timeline-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.8rem;
  border-radius: 99px;
  background: linear-gradient(135deg, #FFB300 0%, #414042 100%);
  color: white;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.03em;
}

.mission-section {
  background: linear-gradient(170deg, #f9f9fa 0%, #fff8e1 40%, #f9f9fa 100%);
  position: relative;
  overflow: hidden;
}

.mission-section::before {
  content: '';
  position: absolute;
  bottom: -150px;
  left: -150px;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(65, 64, 66, 0.05) 0%, transparent 70%);
  pointer-events: none;
}

.mission-header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.mission-eyebrow {
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.78rem;
  font-weight: 700;
  color: #cc8f00;
  background: rgba(255, 179, 0, 0.1);
  border: 1px solid rgba(255, 179, 0, 0.25);
  padding: 0.3rem 1rem;
  border-radius: 99px;
  margin-bottom: 1rem;
}

.mission-title {
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 800;
  color: #414042;
  margin-bottom: 1rem;
  letter-spacing: -0.03em;
  background: none;
  -webkit-text-fill-color: #414042;
}

.mission-lead {
  max-width: 580px;
  margin: 0 auto;
  color: #5a5a5c;
  font-size: 1.05rem;
  line-height: 1.75;
  margin-bottom: 0;
}

.mission-main-card {
  position: relative;
  background: linear-gradient(135deg, #2d2d2f 0%, #414042 100%);
  border-radius: 24px;
  padding: 3rem 3.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 2.5rem;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(65, 64, 66, 0.25), 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.mission-main-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 28px 70px rgba(65, 64, 66, 0.3), 0 8px 24px rgba(0, 0, 0, 0.12);
}

.mission-main-card__bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 80% 50%, rgba(255, 179, 0, 0.12) 0%, transparent 50%),
    radial-gradient(circle at 10% 80%, rgba(255, 179, 0, 0.08) 0%, transparent 40%);
  pointer-events: none;
}

.mission-main-card__decoration {
  position: absolute;
  right: -20px;
  top: -20px;
  width: 200px;
  height: 200px;
  opacity: 0.5;
  pointer-events: none;
}

.mission-main-card__icon {
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: 20px;
  background: rgba(255, 179, 0, 0.15);
  border: 1px solid rgba(255, 179, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #FFB300;
  backdrop-filter: blur(10px);
}

.mission-main-card__content {
  position: relative;
  z-index: 1;
}

.mission-main-card__label {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.72rem;
  font-weight: 700;
  color: rgba(255, 179, 0, 0.7);
  margin-bottom: 0.6rem;
}

.mission-main-card__text {
  color: white;
  font-size: 1.15rem;
  line-height: 1.7;
  margin: 0;
  font-weight: 400;
  opacity: 0.95;
}

.mission-grid-wrapper {
  display: flex;
  justify-content: center;
}

.mission-grid {
  width: fit-content;
  max-width: 100%;
}

.mission-card {
  background: #FEFEFE;
  border-radius: 20px;
  padding: 2.25rem 2.5rem;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 20px rgba(65, 64, 66, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.mission-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.mission-card--values::after {
  background: linear-gradient(90deg, #FFB300, #414042);
}

.mission-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 40px rgba(65, 64, 66, 0.1);
}

.mission-card:hover::after {
  opacity: 1;
}

.mission-card__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.75rem;
}

.mission-card__icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex-shrink: 0;
}

.mission-card__icon-wrap--gold {
  background: rgba(255, 179, 0, 0.1);
  color: #cc8f00;
  border: 1px solid rgba(255, 179, 0, 0.2);
}

.mission-card__title {
  font-size: 1.35rem;
  font-weight: 700;
  color: #414042;
  margin: 0;
  letter-spacing: -0.02em;
}

.values-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.value-chip {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(255, 179, 0, 0.05) 0%, rgba(65, 64, 66, 0.05) 100%);
  border: 1px solid rgba(255, 179, 0, 0.15);
  font-size: 0.88rem;
  font-weight: 600;
  color: #414042;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  cursor: default;
  width: fit-content;
  white-space: nowrap;
}

.value-chip i {
  font-size: 1rem;
  color: #FFB300;
  flex-shrink: 0;
}

.value-chip:hover {
  background: linear-gradient(135deg, rgba(255, 179, 0, 0.1) 0%, rgba(65, 64, 66, 0.1) 100%);
  border-color: rgba(255, 179, 0, 0.3);
  transform: translateY(-2px);
}

.value-chip__tooltip {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;

  position: absolute;
  bottom: calc(100% + 10px);
  left: 0;
  width: 220px;
  z-index: 10;

  background: #414042;
  color: #f9f9fa;
  font-size: 0.82rem;
  font-weight: 400;
  line-height: 1.6;
  white-space: normal;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);

  transform: translateY(4px);
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.value-chip__tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 1.2rem;
  border: 7px solid transparent;
  border-top-color: #414042;
}

.value-chip:hover .value-chip__tooltip {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
}

.about-page .hero.hero--about {
  background: linear-gradient(135deg, #2d2d2f 0%, #414042 100%);
  color: white;
  padding: 6rem 0 8rem;
  position: relative;
  overflow: hidden;
  min-height: 60vh;
  display: flex;
  align-items: center;
}

.hero-shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03);
  pointer-events: none;
  animation: float 20s infinite ease-in-out;
}

.hero-shape--1 {
  width: 500px;
  height: 500px;
  bottom: -200px;
  left: -150px;
  background: radial-gradient(circle, rgba(255, 179, 0, 0.1) 0%, transparent 70%);
  animation-delay: -3s;
}

.hero-shape--2 {
  width: 350px;
  height: 350px;
  top: -120px;
  right: -80px;
  background: radial-gradient(circle, rgba(255, 179, 0, 0.08) 0%, transparent 70%);
  animation-duration: 18s;
  animation-delay: -1s;
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-30px) rotate(4deg);
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #FFB300, #ffd166);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fadeInUp 0.8s ease;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 179, 0, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 60px;
  border: 1px solid rgba(255, 179, 0, 0.25);
  margin-bottom: 2rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 0.8s ease 0.2s both;
}

.hero-badge i {
  font-size: 1.1rem;
  color: #FFB300;
}

.lead {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  animation: fadeInUp 0.8s ease 0.4s both;
}

.hero-actions {
  animation: fadeInUp 0.8s ease 0.6s both;
}

.btn--about {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 2.2rem;
  border-radius: 60px;
  background: linear-gradient(135deg, #FFB300, #e6a000);
  color: #FEFEFE;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 10px 20px -8px rgba(255, 179, 0, 0.6);
  transition: all 0.3s ease;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn--about:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 28px -8px rgba(255, 179, 0, 0.7);
  color: #FEFEFE;
}

.btn--about i {
  font-size: 1.1rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero--about {
    padding: 4rem 0 5rem;
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .lead {
    font-size: 1.1rem;
  }

  .hero-badge {
    font-size: 0.85rem;
    padding: 0.6rem 1.2rem;
  }
}

@media (max-width: 480px) {
  .hero--about {
    padding: 3rem 0 4rem;
  }

  .hero-title {
    font-size: 2rem;
  }
}

@media (max-width: 900px) {
  .mission-main-card {
    padding: 2rem 2rem;
    gap: 1.5rem;
  }

  .mission-main-card__icon {
    width: 56px;
    height: 56px;
    font-size: 1.5rem;
  }

  .mission-main-card__text {
    font-size: 1rem;
  }

  .mission-grid {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .mission-main-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem 1.75rem;
    gap: 1.25rem;
  }

  .mission-main-card__decoration {
    display: none;
  }

  .mission-card {
    padding: 1.75rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .mission-card {
    padding: 1.75rem 1.5rem;
  }

  .values-grid {
    flex-direction: column;
    align-items: flex-start;
  }

  .value-chip {
    width: 100%;
  }

  .mission-main-card {
    padding: 1.75rem 1.5rem;
  }
}

@media (max-width: 900px) {
  .timeline-line {
    left: 28px;
  }

  .timeline-item {
    flex-direction: column !important;
    align-items: flex-start;
    padding-left: 70px;
    margin-bottom: 3rem;
  }

  .timeline-item--left {
    transform: translateX(-40px);
  }

  .timeline-item--right {
    transform: translateX(-40px);
  }

  .timeline-item.is-visible {
    transform: translateX(0);
  }

  .timeline-dot {
    left: 28px;
    top: 0;
    transform: translateX(-50%);
    width: 46px;
    height: 46px;
  }

  .timeline-item.is-visible .timeline-dot {
    animation-name: dotPopMobile;
  }

  @keyframes dotPopMobile {
    from {
      transform: translateX(-50%) scale(0.5);
    }

    to {
      transform: translateX(-50%) scale(1);
    }
  }

  .timeline-item:hover .timeline-dot {
    transform: translateX(-50%) scale(1.08);
  }

  .timeline-card {
    flex: 1;
    width: 100%;
    margin-top: 0.5rem;
  }

  .timeline-connector {
    display: none;
  }

  .timeline-item--left .timeline-card::after,
  .timeline-item--right .timeline-card::after {
    display: none;
  }
}

@media (max-width: 480px) {
  .timeline-card {
    padding: 1.5rem 1.25rem;
  }

  .timeline-card-text {
    font-size: 0.92rem;
  }

  .timeline-line {
    left: 22px;
  }

  .timeline-item {
    padding-left: 56px;
  }

  .timeline-dot {
    left: 22px;
    width: 40px;
    height: 40px;
  }

  .timeline-dot i {
    font-size: 1.1rem;
  }
}

@media (max-width: 350px) {
  .timeline-line {
    display: none;
  }

  .timeline-dot {
    display: none;
  }

  .timeline-card {
    padding: 1.5rem 1.25rem;
  }

  .timeline-card-text {
    font-size: 0.92rem;
  }

  .timeline-item {
    padding-left: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .timeline-item {
    transition: none;
    opacity: 1;
    transform: none;
  }

  .timeline-dot {
    animation: none !important;
  }
}
</style>