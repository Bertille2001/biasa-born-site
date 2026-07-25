<template>
  <div>
    <NavBar />

    <!-- HERO -->
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-text">
          <div class="hero-tag">Clinique Biasa · Lomé, Togo · Depuis 1984</div>
          <h1>Vous êtes né(e) à la<br><span class="green">Clinique Biasa ?</span></h1>
          <p>Biasa Born réunit tous ceux nés à la Clinique Biasa depuis 1984. Une communauté d'entraide, de solidarité et de liens pour la vie.</p>
          <div class="hero-btns">
            <RouterLink to="/inscription" class="btn-primary">Rejoindre la communauté</RouterLink>
            <a href="https://wa.me/22893956409" target="_blank" class="btn-outline">Nous contacter</a>
          </div>
        </div>
        <div class="hero-visual">
          <img src="/images/logo-biasa-born.png" alt="Biasa Born" class="hero-logo" />
        </div>
      </div>
      <div class="hero-stats">
        <div class="stat"><div class="stat-num">40+</div><div class="stat-label">Années de naissances</div></div>
        <div class="sep"></div>
        <div class="stat"><div class="stat-num">3</div><div class="stat-label">Générations</div></div>
        <div class="sep"></div>
        <div class="stat"><div class="stat-num">1984</div><div class="stat-label">Année de fondation</div></div>
        <div class="sep"></div>
        <div class="stat"><div class="stat-num">Togo</div><div class="stat-label">& diaspora mondiale</div></div>
      </div>
    </section>

    <!-- POURQUOI -->
    <section class="section bg-light">
      <div class="inner">
        <div class="section-tag">Pourquoi rejoindre</div>
        <h2>Une communauté qui vous soutient</h2>
        <p class="section-sub">La Fondation Dr Robert Fiadjoe crée un réseau de solidarité pour tous les Biasa Born.</p>
        <div class="grid4">
          <div class="card" v-for="c in cards" :key="c.title">
            <div class="card-line" :style="{background: c.color}"></div>
            <h3>{{ c.title }}</h3>
            <p>{{ c.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ETAPES -->
    <section class="section bg-white">
      <div class="inner">
        <div class="section-tag">Comment ça marche</div>
        <h2>Ce que vous pouvez faire</h2>
        <div class="steps">
          <div class="step" v-for="s in steps" :key="s.num">
            <div class="step-num">{{ s.num }}</div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FONDATION -->
    <section class="fondation">
      <div class="inner fondation-inner">
        <div class="fondation-text">
          <div class="section-tag" style="color:#f5d020">À propos</div>
          <h2 style="color:white">La Fondation Dr Robert Fiadjoe</h2>
          <p>Créée par le Dr Robert Fiadjoe, fondateur de la Clinique Biasa, la Fondation œuvre depuis des décennies au service des plus défavorisés au Togo, en Côte d'Ivoire et au Ghana.</p>
          <div class="fondation-btns">
            <a href="https://web.facebook.com/FondationDrRobertFiadjoe" target="_blank" class="btn-yellow">Voir sur Facebook</a>
            <a href="https://wa.me/22893956409" target="_blank" class="btn-wa-out">WhatsApp</a>
          </div>
        </div>
        <div class="fondation-logo">
          <img src="/images/logo-fondation.png" alt="Fondation Dr Robert Fiadjoe" style="height:140px;object-fit:contain;" />
        </div>
      </div>
    </section>

    <!-- CLINIQUE -->
    <section class="section bg-light">
      <div class="inner" style="text-align:center">
        <div class="section-tag">Partenaire santé</div>
        <h2>La Clinique Biasa</h2>
        <p class="section-sub" style="margin:0 auto 40px">La Clinique Biasa et la Fondation s'engagent ensemble pour la communauté.</p>
        <div class="clinique-card">
          <img src="/images/logo-clinique.png" alt="Clinique Biasa" style="height:80px;object-fit:contain;flex-shrink:0" />
          <div class="avantages-grid">
            <div class="av" v-for="a in avantages" :key="a">{{ a }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <div class="inner" style="text-align:center">
        <h2>Rejoignez la communauté aujourd'hui</h2>
        <p>Inscrivez-vous gratuitement et connectez-vous avec des milliers de Biasa Born.</p>
        <div class="cta-btns">
          <RouterLink to="/inscription" class="btn-primary">S'inscrire maintenant</RouterLink>
          <a href="https://wa.me/22893956409" target="_blank" class="btn-outline">Nous contacter</a>
        </div>
      </div>
    </section>

    <FooterComp />
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import FooterComp from '../components/FooterComp.vue'

const cards = [
  { color: '#1a7a1a', title: 'Réseau d\'entraide', desc: 'Emploi, logement, formation — connectez-vous avec des Biasa Born qui peuvent vous aider.' },
  { color: '#0B3C7A', title: 'Aide de la Fondation', desc: 'La Fondation identifie les membres dans le besoin et mobilise les ressources nécessaires.' },
  { color: '#f5d020', title: 'Événements', desc: 'Retrouvailles annuelles, célébrations et rencontres entre générations de Biasa Born.' },
  { color: '#1a7a1a', title: 'Clinique Biasa', desc: 'Partenaire santé de la communauté avec des tarifs préférentiels pour les membres inscrits.' },
]

const steps = [
  { num: '01', title: 'S\'inscrire en tant que Biasa Born', desc: 'Remplissez le formulaire d\'inscription. Gratuit, en moins de 2 minutes.' },
  { num: '02', title: 'Découvrir les membres de la communauté', desc: 'Accédez à l\'annuaire des membres Biasa Born à travers le Togo et la diaspora mondiale.' },
  { num: '03', title: 'Publier ou consulter des offres d\'entraide', desc: 'Emploi, logement, formation, santé — trouvez ou proposez de l\'aide.' },
  { num: '04', title: 'Contacter la Fondation', desc: 'Contactez la Fondation Dr Robert Fiadjoe directement via WhatsApp ou le formulaire de contact.' },
]

const avantages = [
  'Communauté présente au Togo et dans la diaspora',
  'Entraide entre membres — emploi, logement, formation',
  'La Fondation aide les membres dans le besoin',
  'Événements et retrouvailles annuelles',
  'Formation et mentorat entre membres',
  'Nés au même endroit, liés pour toujours',
  'Tarifs préférentiels à la Clinique Biasa',
]
</script>

<style scoped>
.hero { padding: 80px 40px 0; background: white; }
.hero-inner { display: flex; align-items: center; justify-content: space-between; max-width: 1100px; margin: 0 auto; gap: 60px; flex-wrap: wrap; }
.hero-text { flex: 1; min-width: 300px; }
.hero-tag { font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 20px; }
.hero-text h1 { font-size: 44px; font-weight: 800; color: #1a1a1a; line-height: 1.15; margin-bottom: 18px; }
.green { color: #1a7a1a; }
.hero-text p { font-size: 17px; color: #6b7280; line-height: 1.8; margin-bottom: 32px; max-width: 480px; }
.hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
.btn-primary { background: #1a7a1a; color: white; border-radius: 6px; padding: 13px 28px; font-size: 14px; font-weight: 600; display: inline-block; transition: background 0.2s; }
.btn-primary:hover { background: #155e15; }
.btn-outline { background: white; color: #1a1a1a; border: 1.5px solid #d1d5db; border-radius: 6px; padding: 13px 28px; font-size: 14px; font-weight: 500; display: inline-block; transition: border-color 0.2s; }
.btn-outline:hover { border-color: #1a7a1a; color: #1a7a1a; }
.hero-visual { flex-shrink: 0; }
.hero-logo { height: 200px; object-fit: contain; display: block; }
.hero-stats { display: flex; align-items: center; justify-content: center; gap: 48px; max-width: 1100px; margin: 56px auto 0; padding: 28px 0; border-top: 1px solid #e5e7eb; flex-wrap: wrap; }
.stat { text-align: center; }
.stat-num { font-size: 32px; font-weight: 800; color: #1a7a1a; }
.stat-label { font-size: 12px; color: #9ca3af; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.05em; }
.sep { width: 1px; height: 36px; background: #e5e7eb; }

.section { padding: 88px 40px; }
.bg-white { background: white; }
.bg-light { background: #f8f9fa; }
.inner { max-width: 1100px; margin: 0 auto; }
.section-tag { font-size: 11px; font-weight: 700; color: #1a7a1a; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 12px; }
h2 { font-size: 32px; font-weight: 800; color: #1a1a1a; margin-bottom: 12px; }
.section-sub { font-size: 16px; color: #6b7280; margin-bottom: 44px; max-width: 520px; line-height: 1.7; }

.grid4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-top: 40px; }
.card { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 28px; transition: box-shadow 0.2s; position: relative; overflow: hidden; }
.card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.07); }
.card-line { width: 40px; height: 3px; border-radius: 2px; margin-bottom: 18px; }
.card h3 { font-size: 16px; font-weight: 700; color: #1a1a1a; margin-bottom: 10px; }
.card p { font-size: 13px; color: #6b7280; line-height: 1.7; }

.steps { display: flex; gap: 0; margin-top: 44px; }
.step { flex: 1; padding: 32px 28px; border-left: 1px solid #e5e7eb; }
.step:first-child { border-left: none; padding-left: 0; }
.step-num { font-size: 36px; font-weight: 800; color: #e5e7eb; margin-bottom: 16px; font-family: 'Georgia', serif; }
.step h3 { font-size: 16px; font-weight: 700; color: #1a1a1a; margin-bottom: 8px; }
.step p { font-size: 13px; color: #6b7280; line-height: 1.7; }

.fondation { background: #0B3C7A; padding: 88px 40px; }
.fondation-inner { display: flex; align-items: center; gap: 60px; flex-wrap: wrap; }
.fondation-text { flex: 1; min-width: 280px; }
.fondation-text p { font-size: 15px; color: rgba(255,255,255,0.75); line-height: 1.8; margin: 16px 0 28px; }
.fondation-btns { display: flex; gap: 12px; flex-wrap: wrap; }
.btn-yellow { display: inline-block; background: #f5d020; color: #0B3C7A; border-radius: 6px; padding: 11px 22px; font-size: 14px; font-weight: 700; }
.btn-wa-out { display: inline-block; background: transparent; color: white; border: 1.5px solid rgba(255,255,255,0.4); border-radius: 6px; padding: 11px 22px; font-size: 14px; font-weight: 500; }
.btn-wa-out:hover { border-color: white; }
.fondation-logo { flex-shrink: 0; }

.clinique-card { display: flex; align-items: flex-start; gap: 48px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 40px 48px; flex-wrap: wrap; text-align: left; }
.avantages-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; flex: 1; }
.av { background: #f8f9fa; border-left: 2px solid #1a7a1a; padding: 10px 14px; font-size: 13px; color: #374151; font-weight: 500; }

.cta { background: #f8f9fa; padding: 88px 40px; border-top: 1px solid #e5e7eb; }
.cta p { font-size: 16px; color: #6b7280; margin: 12px 0 32px; }
.cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
</style>
