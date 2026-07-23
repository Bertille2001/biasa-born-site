<template>
  <div>
    <NavBar />
    <div class="page">
      <div class="page-header">
        <div class="section-tag">Rejoindre</div>
        <h1>Inscription Biasa Born</h1>
        <p>Complétez le formulaire pour rejoindre la communauté. La Fondation utilisera ces informations pour mieux vous connaître et vous aider.</p>
      </div>

      <div v-if="succes" class="success-card">
        <div class="success-check">✓</div>
        <h2>Bienvenue dans la communauté Biasa Born</h2>
        <p>Votre inscription a été enregistrée avec succès. La Fondation Dr Robert Fiadjoe vous contactera prochainement.</p>
        <RouterLink to="/" class="btn-primary">Retour à l'accueil</RouterLink>
      </div>

      <form v-else @submit.prevent="soumettre" class="form-wrap">

        <div class="bloc">
          <h2 class="bloc-title">Identité</h2>
          <div class="grid2">
            <div class="field">
              <label>Prénom <span class="req">*</span></label>
              <input v-model="f.prenom" placeholder="Kofi" required />
            </div>
            <div class="field">
              <label>Nom <span class="req">*</span></label>
              <input v-model="f.nom" placeholder="Mensah" required />
            </div>
            <div class="field">
              <label>Date de naissance</label>
              <input v-model="f.dateNaissance" type="date" />
            </div>
            <div class="field">
              <label>Genre</label>
              <select v-model="f.genre">
                <option value="">Sélectionner</option>
                <option>Homme</option>
                <option>Femme</option>
                <option>Autre</option>
              </select>
            </div>
          </div>
        </div>

        <div class="bloc">
          <h2 class="bloc-title">Contact</h2>
          <div class="grid2">
            <div class="field">
              <label>Téléphone <span class="req">*</span></label>
              <input v-model="f.telephone" placeholder="+228 90 00 00 00" required />
            </div>
            <div class="field">
              <label>Email</label>
              <input v-model="f.email" type="email" placeholder="votre@email.com" />
            </div>
            <div class="field">
              <label>Ville actuelle</label>
              <input v-model="f.ville" placeholder="Lomé" />
            </div>
            <div class="field">
              <label>Pays</label>
              <input v-model="f.pays" placeholder="Togo" />
            </div>
          </div>
        </div>

        <div class="bloc">
          <h2 class="bloc-title">Profession & Situation</h2>
          <div class="grid2">
            <div class="field full">
              <label>Profession / Secteur d'activité</label>
              <input v-model="f.profession" placeholder="Médecin, Ingénieur, Étudiant..." />
            </div>
            <div class="field">
              <label>Niveau d'études</label>
              <select v-model="f.niveauEtudes">
                <option value="">Sélectionner</option>
                <option>Primaire</option>
                <option>Secondaire</option>
                <option>Baccalauréat</option>
                <option>Licence / BTS</option>
                <option>Master</option>
                <option>Doctorat</option>
              </select>
            </div>
            <div class="field">
              <label>Situation actuelle</label>
              <select v-model="f.situation">
                <option value="">Sélectionner</option>
                <option>En emploi</option>
                <option>Étudiant(e)</option>
                <option>En recherche d'emploi</option>
                <option>Entrepreneur(e)</option>
                <option>Retraité(e)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="bloc">
          <h2 class="bloc-title">Besoins & Compétences</h2>
          <div class="field">
            <label>J'ai besoin d'aide pour</label>
            <div class="chips">
              <span v-for="b in besoinsOpts" :key="b" class="chip" :class="{active: f.besoins.includes(b)}" @click="toggle(f.besoins, b)">{{ b }}</span>
            </div>
          </div>
          <div class="field mt">
            <label>Je peux aider dans</label>
            <div class="chips">
              <span v-for="c in compOpts" :key="c" class="chip" :class="{active: f.competences.includes(c)}" @click="toggle(f.competences, c)">{{ c }}</span>
            </div>
          </div>
          <div class="field mt">
            <label>Message (optionnel)</label>
            <textarea v-model="f.message" rows="3" placeholder="Parlez-nous de vous, de votre histoire avec la Clinique Biasa..."></textarea>
          </div>
        </div>

        <div class="submit-area">
          <div v-if="erreur" class="alert-err">{{ erreur }}</div>
          <button type="submit" class="btn-submit" :disabled="loading">
            {{ loading ? 'Envoi en cours...' : 'Rejoindre la communauté Biasa Born' }}
          </button>
          <p class="note">Vos données sont protégées et utilisées uniquement par la Fondation Dr Robert Fiadjoe.</p>
        </div>

      </form>
    </div>
    <FooterComp />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import FooterComp from '../components/FooterComp.vue'

const API = 'https://biasa-born-api.onrender.com'
const loading = ref(false)
const succes = ref(false)
const erreur = ref('')

const besoinsOpts = ['Emploi', 'Formation', 'Santé', 'Logement', 'Financement', 'Orientation', 'Rien pour l\'instant']
const compOpts = ['Mon domaine professionnel', 'Orientation', 'Hébergement', 'Financement', 'Mentorat', 'Réseau']

const f = reactive({ prenom: '', nom: '', dateNaissance: '', genre: '', telephone: '', email: '', ville: '', pays: '', profession: '', niveauEtudes: '', situation: '', besoins: [], competences: [], message: '' })

const toggle = (arr, val) => {
  const i = arr.indexOf(val)
  if (i === -1) arr.push(val)
  else arr.splice(i, 1)
}

const soumettre = async () => {
  if (!f.prenom || !f.nom || !f.telephone) { erreur.value = 'Prénom, nom et téléphone sont obligatoires.'; return }
  loading.value = true; erreur.value = ''
  try {
    const res = await fetch(`${API}/biasa-born`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: f.prenom, lastName: f.nom, phoneNumber: f.telephone,
        email: f.email, birthDate: f.dateNaissance,
        birthYear: f.dateNaissance ? new Date(f.dateNaissance).getFullYear() : null,
        gender: f.genre, ville: f.ville, pays: f.pays,
        profession: f.profession, niveauEtudes: f.niveauEtudes,
        situation: f.situation, besoins: f.besoins,
        competences: f.competences, message: f.message, source: 'web'
      })
    })
    const data = await res.json()
    if (res.ok && data.success) succes.value = true
    else erreur.value = data.detail || 'Une erreur est survenue. Veuillez réessayer.'
  } catch { erreur.value = 'Connexion impossible. Vérifiez votre connexion internet.' }
  loading.value = false
}
</script>

<style scoped>
.page { max-width: 700px; margin: 0 auto; padding: 56px 20px; }
.page-header { margin-bottom: 40px; }
.section-tag { font-size: 11px; font-weight: 700; color: #1a7a1a; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 10px; }
.page-header h1 { font-size: 28px; font-weight: 800; color: #1a1a1a; margin-bottom: 10px; }
.page-header p { font-size: 15px; color: #6b7280; line-height: 1.7; }

.success-card { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 56px; text-align: center; }
.success-check { width: 56px; height: 56px; border-radius: 50%; background: #1a7a1a; color: white; font-size: 24px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
.success-card h2 { font-size: 22px; font-weight: 800; color: #1a1a1a; margin-bottom: 12px; }
.success-card p { font-size: 15px; color: #6b7280; margin-bottom: 28px; line-height: 1.7; }

.form-wrap { background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
.bloc { padding: 32px; border-bottom: 1px solid #f3f4f6; }
.bloc-title { font-size: 14px; font-weight: 700; color: #1a1a1a; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 2px solid #1a7a1a; display: inline-block; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field.full { grid-column: 1 / -1; }
.field.mt { margin-top: 20px; }
.field label { font-size: 13px; font-weight: 600; color: #374151; }
.req { color: #ef4444; }
textarea { resize: vertical; border: 1.5px solid #e5e7eb; border-radius: 6px; padding: 10px 14px; font-family: inherit; font-size: 14px; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
.chip { background: white; border: 1.5px solid #e5e7eb; border-radius: 4px; padding: 6px 14px; font-size: 13px; color: #6b7280; cursor: pointer; transition: all 0.15s; }
.chip.active { background: #EAF3DE; border-color: #1a7a1a; color: #1a7a1a; font-weight: 600; }
.submit-area { padding: 32px; }
.btn-submit { width: 100%; background: #1a7a1a; color: white; border: none; border-radius: 6px; padding: 15px; font-size: 15px; font-weight: 700; cursor: pointer; transition: background 0.2s; }
.btn-submit:hover { background: #155e15; }
.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-primary { display: inline-block; background: #1a7a1a; color: white; border-radius: 6px; padding: 12px 24px; font-size: 14px; font-weight: 700; margin-top: 8px; }
.note { font-size: 12px; color: #9ca3af; text-align: center; margin-top: 14px; line-height: 1.6; }
.alert-err { background: #fef2f2; color: #dc2626; border-radius: 6px; padding: 12px 16px; margin-bottom: 16px; font-size: 14px; border-left: 3px solid #dc2626; }
@media (max-width: 540px) { .grid2 { grid-template-columns: 1fr; } .field.full { grid-column: 1; } }
</style>
