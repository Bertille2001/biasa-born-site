<template>
  <div>
    <NavBar />
    <div class="page">
      <div class="page-header">
        <div class="section-tag">Contact</div>
        <h1>Nous contacter</h1>
        <p>Une question sur Biasa Born ? Contactez la Fondation Dr Robert Fiadjoe.</p>
      </div>

      <div class="contact-grid">
        <div class="infos">
          <div class="logos-card">
            <img src="/images/logo-biasa-born.png" alt="Biasa Born" style="height:56px;object-fit:contain" />
            <div class="logo-sep"></div>
            <img src="/images/logo-fondation.png" alt="Fondation Dr Robert Fiadjoe" style="height:52px;object-fit:contain" />
            <div class="logo-sep"></div>
            <img src="/images/logo-clinique.png" alt="Clinique Biasa" style="height:40px;object-fit:contain" />
          </div>

          <div class="info-list">
            <div class="info-item">
              <div class="info-label">Adresse</div>
              <div class="info-val">Clinique Biasa, Lomé, Togo</div>
            </div>
            <div class="info-item">
              <div class="info-label">Téléphone</div>
              <div class="info-val">+228 93 95 64 09</div>
            </div>
            <div class="info-item">
              <div class="info-label">WhatsApp</div>
              <a href="https://wa.me/22893956409" target="_blank" class="info-link">+228 93 95 64 09</a>
            </div>
            <div class="info-item">
              <div class="info-label">Facebook</div>
              <a href="https://web.facebook.com/FondationDrRobertFiadjoe" target="_blank" class="info-link">Fondation Dr Robert Fiadjoe</a>
            </div>
          </div>

          <div class="fondation-card">
            <div class="fc-tag">À propos de la Fondation</div>
            <p>La Fondation Dr Robert Fiadjoe œuvre au service des plus défavorisés au Togo, en Côte d'Ivoire et au Ghana. Biasa Born est son initiative pour reconnecter tous ceux nés à la Clinique Biasa.</p>
            <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">
              <a href="https://web.facebook.com/FondationDrRobertFiadjoe" target="_blank" class="btn-yellow">Facebook</a>
              <a href="https://wa.me/22893956409" target="_blank" class="btn-wa">WhatsApp</a>
            </div>
          </div>
        </div>

        <div class="form-card">
          <h2>Envoyer un message</h2>
          <p>Nous vous répondrons dans les plus brefs délais.</p>
          <div v-if="envoye" class="alert-ok">Message envoyé. La Fondation vous répondra prochainement.</div>
          <div v-else>
            <div class="field"><label>Nom complet <span class="req">*</span></label><input v-model="f.nom" placeholder="Kofi Mensah" /></div>
            <div class="field"><label>Email <span class="req">*</span></label><input v-model="f.email" type="email" placeholder="votre@email.com" /></div>
            <div class="field"><label>Téléphone</label><input v-model="f.tel" placeholder="+228 90 00 00 00" /></div>
            <div class="field">
              <label>Sujet</label>
              <select v-model="f.sujet">
                <option value="">Choisir un sujet</option>
                <option>Je souhaite rejoindre Biasa Born</option>
                <option>Je veux aider la communauté</option>
                <option>Partenariat avec la Fondation</option>
                <option>Question sur la Clinique Biasa</option>
                <option>Autre</option>
              </select>
            </div>
            <div class="field"><label>Message <span class="req">*</span></label><textarea v-model="f.message" rows="5" placeholder="Votre message..."></textarea></div>
            <button class="btn-submit" @click="envoyer">Envoyer le message</button>
          </div>
        </div>
      </div>
    </div>
    <FooterComp />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import NavBar from '../components/NavBar.vue'
import FooterComp from '../components/FooterComp.vue'

const envoye = ref(false)
const f = reactive({ nom: '', email: '', tel: '', sujet: '', message: '' })
const envoyer = () => {
  if (!f.nom || !f.email || !f.message) return
  envoye.value = true
  Object.keys(f).forEach(k => f[k] = '')
}
</script>

<style scoped>
.page { max-width: 1000px; margin: 0 auto; padding: 56px 20px; }
.page-header { margin-bottom: 40px; }
.section-tag { font-size: 11px; font-weight: 700; color: #1a7a1a; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 10px; }
.page-header h1 { font-size: 28px; font-weight: 800; color: #1a1a1a; margin-bottom: 10px; }
.page-header p { font-size: 15px; color: #6b7280; }
.contact-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 28px; align-items: start; }
.infos { display: flex; flex-direction: column; gap: 20px; }
.logos-card { background: #f8f9fa; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px 24px; display: flex; align-items: center; gap: 20px; }
.logo-sep { width: 1px; height: 40px; background: #e5e7eb; }
.info-list { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; display: flex; flex-direction: column; gap: 0; }
.info-item { padding: 14px 0; border-bottom: 1px solid #f3f4f6; }
.info-item:last-child { border-bottom: none; }
.info-label { font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
.info-val { font-size: 14px; color: #1a1a1a; font-weight: 500; }
.info-link { font-size: 14px; color: #1a7a1a; font-weight: 500; }
.info-link:hover { text-decoration: underline; }
.fondation-card { background: #0B3C7A; border-radius: 8px; padding: 24px; }
.fc-tag { font-size: 11px; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px; }
.fondation-card p { font-size: 13px; color: rgba(255,255,255,0.75); line-height: 1.7; }
.btn-yellow { display: inline-block; background: #f5d020; color: #0B3C7A; border-radius: 6px; padding: 8px 16px; font-size: 13px; font-weight: 700; }
.btn-wa { display: inline-block; background: #25D366; color: white; border-radius: 6px; padding: 8px 16px; font-size: 13px; font-weight: 600; }
.form-card { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 32px; }
.form-card h2 { font-size: 20px; font-weight: 800; color: #1a1a1a; margin-bottom: 6px; }
.form-card p { font-size: 14px; color: #6b7280; margin-bottom: 28px; }
.field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.field label { font-size: 13px; font-weight: 600; color: #374151; }
.req { color: #ef4444; }
textarea { border: 1.5px solid #e5e7eb; border-radius: 6px; padding: 10px 14px; font-family: inherit; font-size: 14px; resize: vertical; }
.btn-submit { width: 100%; background: #1a7a1a; color: white; border: none; border-radius: 6px; padding: 13px; font-size: 14px; font-weight: 700; cursor: pointer; }
.btn-submit:hover { background: #155e15; }
.alert-ok { background: #EAF3DE; color: #1a7a1a; border-radius: 6px; padding: 16px; font-size: 14px; border-left: 3px solid #1a7a1a; }
@media (max-width: 700px) { .contact-grid { grid-template-columns: 1fr; } }
</style>
