<template>
  <div class="contacts-page">

    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge fade-in">
            <i class="bi bi-telephone-fill"></i>
            <span>Мы на связи</span>
          </div>
          <h1 class="hero-title">Контакты</h1>
          <div class="hero-badge">
            <span class="hero-subtitle">
              Свяжитесь с нами любым удобным способом — ответим на все вопросы
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="grid grid-2">

          <div>
            <h2 class="contacts-heading mb-5">Как с нами связаться</h2>
            <div class="contact-cards">
              <div class="contact-card">
                <div class="contact-icon"><i class="bi bi-geo-alt"></i></div>
                <div class="contact-details">
                  <p>{{ settings.address }}</p>
                  <a href="https://yandex.ru/maps/org/altayskiy_nauchno_issledovatelskiy_institut_tekhnologii_mashinostroyeniya/1007131026/"
                    target="_blank" class="contact-link">
                    <i class="bi bi-arrow-right"></i>
                    Открыть на карте
                  </a>
                </div>
              </div>
              <div class="contact-card">
                <div class="contact-icon"><i class="bi bi-telephone"></i></div>
                <div class="contact-details">
                  <p><a :href="`tel:${settings.phone.replace(/[^\d+]/g, '')}`">{{ settings.phone }}</a></p>
                  <p class="contact-note">Бесплатно по всей России</p>
                </div>
              </div>
              <div class="contact-card">
                <div class="contact-icon"><i class="bi bi-envelope"></i></div>
                <div class="contact-details">
                  <p><a :href="`mailto:${settings.email}`">{{ settings.email }}</a></p>
                  <p class="contact-note">Общие вопросы</p>
                </div>
              </div>
              <div class="contact-card">
                <div class="contact-icon"><i class="bi bi-clock"></i></div>
                <div class="contact-details">
                  <p>{{ settings.hours }}</p>
                  <p class="contact-note">Сб-Вс: выходные</p>
                </div>
              </div>
            </div>
          </div>

          <div class="contact-form-wrapper">
            <h2 class="contacts-heading mb-4">Напишите нам</h2>
            <div class="contact-form">
              <div class="form-illustration">
                <div class="form-illustration__circle form-illustration__circle--1"></div>
                <div class="form-illustration__circle form-illustration__circle--2"></div>
                <i class="bi bi-send-arrow-up-fill form-illustration__icon"></i>
              </div>

              <h4 class="form-cta-title">Хотите работать с нами?</h4>
              <p class="form-cta-text">
                Мы всегда рады талантливым специалистам. Ознакомьтесь с нашими открытыми вакансиями
                на HeadHunter и откликнитесь на подходящую позицию.
              </p>
              <a href="https://barnaul.hh.ru/employer/2529692" target="_blank" rel="noopener noreferrer"
                class="form-hh-btn">
                <svg class="form-hh-btn__logo" viewBox="0 0 48 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <text x="0" y="16" font-family="Arial Black, sans-serif" font-weight="900" font-size="18"
                    fill="white">hh</text>
                </svg>
                <span>Смотреть вакансии</span>
                <i class="bi bi-arrow-right"></i>
              </a>

              <p class="form-hh-note">
                <i class="bi bi-shield-check"></i>
                Официальный работодатель на hh.ru
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="socials-section section">
      <div class="container">
        <div class="socials-inner">

          <div class="socials-text">
            <h2 class="socials-title">АЛМАЗ В СОЦИАЛЬНЫХ СЕТЯХ</h2>
            <p class="socials-desc">
              Мы стремимся, чтобы у наших клиентов, дилеров, подписчиков и друзей был постоянный
              доступ к актуальной информации.
            </p>
            <p class="socials-sub">
              Чтобы оставаться с нами на связи, подписывайтесь:
            </p>
          </div>

          <div class="socials-grid">
            <a :href="settings.vk" target="_blank" rel="noopener noreferrer" class="social-card social-card--vk">
              <div class="social-card__icon-wrap">
                <svg class="social-card__icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.712-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.558c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C5.059 11.176 4.27 8.875 4.27 8.403c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.932c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.474-.085.712-.576.712z"/>
                </svg>
              </div>
              <div class="social-card__body">
                <span class="social-card__name">ВКонтакте</span>
                <span class="social-card__handle">{{ settings.vk.replace('https://', '') }}</span>
              </div>
              <i class="bi bi-arrow-up-right social-card__arrow"></i>
            </a>

            <a :href="settings.telegram" target="_blank" rel="noopener noreferrer" class="social-card social-card--tg">
              <div class="social-card__icon-wrap">
                <svg class="social-card__icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </div>
              <div class="social-card__body">
                <span class="social-card__name">Telegram</span>
                <span class="social-card__handle">{{ settings.telegram.replace('https://', '') }}</span>
              </div>
              <i class="bi bi-arrow-up-right social-card__arrow"></i>
            </a>

            <a :href="settings.rutube" target="_blank" rel="noopener noreferrer" class="social-card social-card--rt">
              <div class="social-card__icon-wrap">
                <svg class="social-card__icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 12.75l-6.75 4.5V7.75l6.75 4.5z"/>
                </svg>
              </div>
              <div class="social-card__body">
                <span class="social-card__name">RuTube</span>
                <span class="social-card__handle">{{ settings.rutube.replace('https://', '') }}</span>
              </div>
              <i class="bi bi-arrow-up-right social-card__arrow"></i>
            </a>

            <a :href="settings.youtube" target="_blank" rel="noopener noreferrer" class="social-card social-card--yt">
              <div class="social-card__icon-wrap">
                <svg class="social-card__icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div class="social-card__body">
                <span class="social-card__name">YouTube</span>
                <span class="social-card__handle">{{ settings.youtube.replace('https://', '') }}</span>
              </div>
              <i class="bi bi-arrow-up-right social-card__arrow"></i>
            </a>
          </div>

          <div class="socials-cta">
            <i class="bi bi-bell-fill socials-cta__icon"></i>
            <span>Будьте первыми в курсе всех новостей и акций от Алмаз!</span>
          </div>

        </div>
      </div>
    </section>

    <section class="map-section">
      <div class="container">
        <h2 class="section-title">Как нас найти</h2>
        <div class="map-container">
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=83.768484%2C53.381384&z=16&pt=83.768484%2C53.381384~%D0%90%D0%9D%D0%98%D0%A2%D0%98%D0%9C"
            width="100%" height="450" frameborder="0" allowfullscreen title="Карта расположения АНИТИМ"></iframe>
        </div>
      </div>
      <div class="container mt-4">
        <div class="map-info">
          <div class="map-info-item">
            <i class="bi bi-car-front"></i>
            <div>
              <h4>На автомобиле</h4>
              <p>Удобный подъезд, есть парковка для посетителей</p>
            </div>
          </div>
          <div class="map-info-item">
            <i class="bi bi-bus-front"></i>
            <div>
              <h4>Общественным транспортом</h4>
              <p>Остановка "Завод АНИТИМ" - автобусы № 10, 25, 47</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ContactsPage',

  computed: {
    ...mapGetters(['settings']),
  }
}
</script>

<style scoped>
.contacts-page { min-height: 100vh; }
.hero { background: linear-gradient(135deg, #2d2d2f 0%, #414042 100%); }
.hero-badge {
  display: inline-flex; align-items: center; gap: .55rem;
  padding: .6rem 1.3rem;
  background: rgba(255, 179, 0, .12); border: 1px solid rgba(255, 179, 0, .3);
  border-radius: 99px; font-size: .85rem; font-weight: 600; color: #ffd166;
  letter-spacing: .03em; margin-bottom: 1.75rem;
  animation: fadeInUp .7s ease both;
}
.mb-5 { margin-bottom: 3rem; }
.mb-4 { margin-bottom: 1.5rem; }
.mt-4 { margin-top: 2rem; }
.contact-cards { display: flex; flex-direction: column; gap: 1.5rem; }
.contact-card {
  background: #FEFEFE; border-radius: var(--radius-2xl); padding: 2rem;
  box-shadow: var(--shadow-md); display: flex; gap: 1.5rem;
  transition: var(--transition-base); border: 1px solid rgba(0,0,0,0.05);
}
.contact-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-xl); }
.contact-icon {
  width: 60px; height: 60px; background: var(--secondary);
  border-radius: var(--radius-xl); display: flex; align-items: center;
  justify-content: center; color: white; font-size: 1.75rem; flex-shrink: 0;
}
.contact-details { flex: 1; }
.contact-details h4 { font-size: 1.125rem; margin-bottom: 0.5rem; color: #414042; }
.contact-details p { margin: 0.25rem 0; color: #5a5a5c; }
.contact-details a { color: #FFB300; font-weight: 600; text-decoration: none; }
.contact-details a:hover { color: #e6a000; text-decoration: underline; }
.contact-note { font-size: 0.875rem; color: #a5a5a7; }
.contact-link {
  display: inline-flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;
  color: #FFB300; font-weight: 600; transition: var(--transition-fast);
}
.contact-link:hover { gap: 0.75rem; color: #e6a000; }
.contacts-heading { font-size: 2.5rem; }
.contact-form-wrapper { display: flex; flex-direction: column; height: 100%; }
.contact-form {
  flex: 1; display: flex; flex-direction: column; align-items: center;
  justify-content: center; text-align: center; background: #FEFEFE;
  border-radius: var(--radius-2xl); padding: 3rem 2.5rem;
  box-shadow: var(--shadow-md); border: 1px solid rgba(0,0,0,0.05);
  position: relative; overflow: hidden; gap: 1.25rem;
}
.form-illustration {
  position: relative; width: 100px; height: 100px;
  display: flex; align-items: center; justify-content: center; margin-bottom: 0.5rem;
}
.form-illustration__circle {
  position: absolute; border-radius: 50%;
  animation: pulse-ring 3s ease-in-out infinite;
}
.form-illustration__circle--1 {
  width: 100px; height: 100px;
  background: rgba(255,179,0,0.08); border: 2px solid rgba(255,179,0,0.15);
}
.form-illustration__circle--2 {
  width: 70px; height: 70px;
  background: rgba(65,64,66,0.08); border: 2px solid rgba(65,64,66,0.15);
  animation-delay: 0.5s;
}
.form-illustration__icon {
  position: relative; z-index: 1; font-size: 2.2rem;
  background: var(--primary); -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; background-clip: text;
}
@keyframes pulse-ring {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.08); opacity: 0.7; }
}
.form-cta-title { font-size: 1.3rem; font-weight: 700; color: #414042; margin: 0; letter-spacing: -0.02em; }
.form-cta-text { color: #5a5a5c; font-size: 0.95rem; line-height: 1.7; max-width: 340px; margin: 0; }
.form-hh-btn {
  display: inline-flex; align-items: center; gap: 0.75rem; padding: 1rem 2rem;
  border-radius: 60px; background: linear-gradient(135deg, #2d2d2f 0%, #414042 100%);
  color: white; font-weight: 700; font-size: 1rem; text-decoration: none;
  box-shadow: 0 10px 28px -6px rgba(65,64,66,0.45); transition: all 0.3s ease;
  width: 100%; justify-content: center;
}
.form-hh-btn:hover { transform: translateY(-3px); box-shadow: 0 16px 36px -6px rgba(65,64,66,0.55); color: white; }
.form-hh-btn:hover .bi-arrow-right { transform: translateX(4px); }
.form-hh-btn .bi-arrow-right { transition: transform 0.2s ease; }
.form-hh-btn__logo { width: 36px; height: 18px; flex-shrink: 0; }
.form-hh-note { display: flex; align-items: center; gap: 0.4rem; font-size: 0.78rem; color: #a5a5a7; margin: 0; }
.form-hh-note i { color: #FFB300; font-size: 0.85rem; }
.socials-section { background: #FEFEFE; position: relative; overflow: hidden; }
.socials-section::before {
  content: ''; position: absolute; width: 600px; height: 600px;
  top: -250px; right: -200px; border-radius: 50%;
  background: radial-gradient(circle, rgba(255,179,0,0.07) 0%, transparent 65%); pointer-events: none;
}
.socials-inner { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 2.5rem; }
.socials-text { text-align: center; max-width: 620px; }
.socials-title { font-size: clamp(1.75rem, 4vw, 2.75rem); font-weight: 900; color: #414042; letter-spacing: -0.02em; margin-bottom: 1rem; }
.socials-desc { color: #5a5a5c; font-size: 1rem; line-height: 1.75; margin-bottom: 0.25rem; }
.socials-sub { color: #a5a5a7; font-size: 0.9rem; margin: 0; }
.socials-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; width: 100%; max-width: 760px; }
.social-card {
  display: flex; align-items: center; gap: 1.25rem; padding: 1.5rem 1.75rem;
  border-radius: 1.25rem; text-decoration: none; border: 1px solid rgba(65,64,66,0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative;
  overflow: hidden; background: #FEFEFE; box-shadow: 0 2px 12px -4px rgba(65,64,66,0.1);
}
.social-card::before { content: ''; position: absolute; inset: 0; opacity: 0; transition: opacity 0.3s ease; }
.social-card:hover { transform: translateY(-5px); border-color: rgba(255,179,0,0.3); box-shadow: 0 16px 36px -8px rgba(65,64,66,0.15); }
.social-card:hover::before { opacity: 1; }
.social-card--vk::before { background: linear-gradient(135deg, rgba(0,119,255,0.04) 0%, transparent 60%); }
.social-card--vk .social-card__icon-wrap { background: linear-gradient(135deg, #0077FF 0%, #005fd8 100%); box-shadow: 0 6px 16px -4px rgba(0,119,255,0.35); }
.social-card--tg::before { background: linear-gradient(135deg, rgba(38,161,220,0.04) 0%, transparent 60%); }
.social-card--tg .social-card__icon-wrap { background: linear-gradient(135deg, #26a1dc 0%, #1a8ec4 100%); box-shadow: 0 6px 16px -4px rgba(38,161,220,0.35); }
.social-card--rt::before { background: linear-gradient(135deg, rgba(255,50,50,0.04) 0%, transparent 60%); }
.social-card--rt .social-card__icon-wrap { background: linear-gradient(135deg, #FF3232 0%, #d41f1f 100%); box-shadow: 0 6px 16px -4px rgba(255,50,50,0.35); }
.social-card--yt::before { background: linear-gradient(135deg, rgba(255,0,0,0.04) 0%, transparent 60%); }
.social-card--yt .social-card__icon-wrap { background: linear-gradient(135deg, #FF0000 0%, #cc0000 100%); box-shadow: 0 6px 16px -4px rgba(255,0,0,0.35); }
.social-card__icon-wrap { width: 52px; height: 52px; border-radius: 0.875rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: transform 0.3s ease; }
.social-card:hover .social-card__icon-wrap { transform: scale(1.1) rotate(-3deg); }
.social-card__icon { width: 26px; height: 26px; color: white; }
.social-card__body { flex: 1; display: flex; flex-direction: column; gap: 0.2rem; }
.social-card__name { font-size: 1rem; font-weight: 700; color: #414042; }
.social-card__handle { font-size: 0.78rem; color: #a5a5a7; }
.social-card__arrow { font-size: 1.1rem; color: #d7d7d9; transition: all 0.3s ease; flex-shrink: 0; }
.social-card:hover .social-card__arrow { color: #FFB300; transform: translate(3px,-3px); }
.socials-cta {
  display: inline-flex; align-items: center; gap: 0.75rem; padding: 1rem 2rem;
  background: rgba(255,179,0,0.08); border: 1px solid rgba(255,179,0,0.3);
  border-radius: 99px; color: #414042; font-size: 0.95rem; font-weight: 600;
}
.socials-cta__icon { font-size: 1rem; color: #FFB300; animation: bell-ring 2.5s ease-in-out infinite; }
@keyframes bell-ring {
  0%, 100% { transform: rotate(0deg); }
  10% { transform: rotate(15deg); }
  20% { transform: rotate(-12deg); }
  30% { transform: rotate(10deg); }
  40% { transform: rotate(-8deg); }
  50% { transform: rotate(0deg); }
}
.map-section { padding: 4rem 0; }
.map-container { width: 100%; border-radius: var(--radius-2xl); overflow: hidden; box-shadow: var(--shadow-xl); margin: 2rem 0; border: 1px solid var(--gray-200); }
.map-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px,1fr)); gap: 2rem; margin-top: 2rem; }
.map-info-item { display: flex; gap: 1.5rem; padding: 1.5rem; background: #FEFEFE; border-radius: var(--radius-xl); box-shadow: var(--shadow-md); }
.map-info-item i { font-size: 2.5rem; color: #FFB300; }
.map-info-item h4 { margin-bottom: 0.5rem; }
.map-info-item p { color: #5a5a5c; margin: 0; }
@media (max-width: 768px) {
  .contact-card { flex-direction: column; text-align: center; }
  .contact-form { padding: 2rem 1.5rem; }
  .map-info { grid-template-columns: 1fr; }
  .map-info-item { flex-direction: column; align-items: center; text-align: center; }
  .socials-grid { grid-template-columns: 1fr; }
  .socials-cta { text-align: center; flex-direction: column; gap: 0.5rem; padding: 1rem 1.5rem; }
}
@media (min-width: 481px) and (max-width: 768px) {
  .socials-grid { grid-template-columns: repeat(2,1fr); }
}
</style>