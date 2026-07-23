<template>
  <div>
    <NavBar />
    <div class="page">
      <div class="page-header">
        <div class="section-tag">Entraide</div>
        <h1>S'entraider entre Biasa Born</h1>
        <p>Proposez votre aide ou trouvez du soutien au sein de la communauté.</p>
      </div>

      <div class="tabs">
        <button :class="{active: tab==='offres'}" @click="tab='offres'; loadEntraide('offre')">Offres d'aide</button>
        <button :class="{active: tab==='demandes'}" @click="tab='demandes'; loadEntraide('demande')">Demandes d'aide</button>
        <button :class="{active: tab==='proposer'}" @click="tab='proposer'">Proposer mon aide</button>
      </div>

      <!-- OFFRES / DEMANDES -->
      <div v-if="tab==='offres' || tab==='demandes'">
        <div v-if="loading" class="loading">Chargement...</div>
        <div v-else-if="items.length === 0" class="empty">
          <p>Aucune {{ tab === 'offres' ? 'offre' : 'demande' }} pour le moment.</p>
          <p style="margin-top:8px;font-size:13px;color:#9ca3af">Soyez le premier à publier !</p>
        </div>
        <div v-else class="cards-grid">
          <div class="aide-card" :class="{demande: tab==='demandes'}" v-for="o in items" :key="o.id">
            <div class="card-header">
              <div class="avatar" :style="{background: getColor(o.nom)}">{{ getInitials(o.nom) }}</div>
              <div>
                <div class="card-name">{{ o.nom }}</div>
                <div class="card-lieu">{{ o.lieu }}</div>
              </div>
              <span class="badge" :class="{yellow: tab==='demandes'}">{{ o.categorie }}</span>
            </div>
            <div class="card-title">{{ o.titre }}</div>
            <div class="card-desc">{{ o.description }}</div>
            <a :href="`https://wa.me/22893956409?text=Bonjour, je suis intéressé par: ${o.titre}`" target="_blank" class="btn-contact" :class="{aider: tab==='demandes'}">
              {{ tab === 'offres' ? 'Contacter' : 'Je peux aider' }}
            </a>
          </div>
        </div>
      </div>

      <!-- FORMULAIRE PROPOSER -->
      <div v-if="tab==='proposer'" class="form-card">
        <h2>Proposer mon aide / Soumettre une demande</h2>
        <p>Votre publication sera visible par tous les membres de la communauté.</p>

        <div v-if="publiee" class="alert-ok">Votre publication a été soumise. Elle sera visible après validation.</div>
        <div v-else>
          <div class="grid2">
            <div class="field full">
              <label>Type *</label>
              <div class="radio-group">
                <label class="radio-opt" :class="{active: newItem.type==='offre'}">
                  <input type="radio" v-model="newItem.type" value="offre" /> Offre d'aide
                </label>
                <label class="radio-opt" :class="{active: newItem.type==='demande'}">
                  <input type="radio" v-model="newItem.type" value="demande" /> Demande d'aide
                </label>
              </div>
            </div>
            <div class="field">
              <label>Catégorie *</label>
              <select v-model="newItem.categorie">
                <option value="">Choisir</option>
                <option v-for="c in cats" :key="c">{{ c }}</option>
              </select>
            </div>
            <div class="field">
              <label>Votre nom *</label>
              <input v-model="newItem.nom" placeholder="Kofi M." />
            </div>
            <div class="field full">
              <label>Titre *</label>
              <input v-model="newItem.titre" placeholder="ex: Mentorat en informatique" />
            </div>
            <div class="field full">
              <label>Description *</label>
              <textarea v-model="newItem.description" rows="3" placeholder="Décrivez votre offre ou votre besoin en détail..."></textarea>
            </div>
            <div class="field">
              <label>Ville / Pays</label>
              <input v-model="newItem.lieu" placeholder="Lomé, Togo" />
            </div>
            <div class="field">
              <label>Contact (tél / email)</label>
              <input v-model="newItem.contact" placeholder="+228 90 00 00 00" />
            </div>
          </div>
          <div v-if="erreur" class="alert-err">{{ erreur }}</div>
          <button class="btn-submit" @click="publier" :disabled="loading2">
            {{ loading2 ? 'Envoi...' : 'Soumettre' }}
          </button>
        </div>
      </div>
    </div>
    <FooterComp />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavBar from '../components/NavBar.vue'
import FooterComp from '../components/FooterComp.vue'

const API = 'https://biasa-born-api.onrender.com'
const tab = ref('offres')
const items = ref([])
const loading = ref(false)
const loading2 = ref(false)
const publiee = ref(false)
const erreur = ref('')
const cats = ['Emploi', 'Formation', 'Santé', 'Logement', 'Financement', 'Mentorat', 'Orientation', 'Autre']
const newItem = ref({ type: 'offre', categorie: '', nom: '', titre: '', description: '', lieu: '', contact: '' })

const colors = ['#1a7a1a', '#0B3C7A', '#185FA5', '#854F0B', '#A32D2D', '#6b21a8']
const getColor = (n) => colors[(n?.charCodeAt(0) || 0) % colors.length]
const getInitials = (n) => (n || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

const loadEntraide = async (type) => {
  loading.value = true
  try {
    const res = await fetch(`${API}/entraide?type=${type}`)
    items.value = await res.json()
  } catch { items.value = [] }
  loading.value = false
}

const publier = async () => {
  if (!newItem.value.titre || !newItem.value.nom || !newItem.value.categorie) {
    erreur.value = 'Veuillez remplir les champs obligatoires.'
    return
  }
  loading2.value = true
  erreur.value = ''
  try {
    const res = await fetch(`${API}/entraide`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newItem.value, admin_password: 'biasa2024' })
    })
    const data = await res.json()
    if (data.success) publiee.value = true
    else erreur.value = data.detail || 'Erreur.'
  } catch { erreur.value = 'Connexion impossible.' }
  loading2.value = false
}

onMounted(() => loadEntraide('offre'))
</script>

<style scoped>
.page { max-width: 1000px; margin: 0 auto; padding: 56px 20px; }
.page-header { margin-bottom: 36px; }
.section-tag { font-size: 11px; font-weight: 700; color: #1a7a1a; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 10px; }
.page-header h1 { font-size: 28px; font-weight: 800; color: #1a1a1a; margin-bottom: 10px; }
.page-header p { font-size: 15px; color: #6b7280; }
.tabs { display: flex; margin-bottom: 36px; border-bottom: 1px solid #e5e7eb; }
.tabs button { background: none; border: none; padding: 12px 24px; font-size: 14px; font-weight: 500; color: #6b7280; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all 0.2s; }
.tabs button.active { color: #1a7a1a; border-bottom-color: #1a7a1a; font-weight: 700; }
.cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 18px; }
.aide-card { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; }
.aide-card.demande { border-left: 3px solid #f5d020; }
.card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.avatar { width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: white; flex-shrink: 0; }
.card-name { font-size: 14px; font-weight: 700; color: #1a1a1a; }
.card-lieu { font-size: 12px; color: #9ca3af; }
.badge { margin-left: auto; font-size: 11px; padding: 3px 10px; border-radius: 3px; font-weight: 600; background: #EAF3DE; color: #1a7a1a; }
.badge.yellow { background: #FFF8E1; color: #854F0B; }
.card-title { font-size: 15px; font-weight: 700; color: #1a1a1a; margin-bottom: 8px; }
.card-desc { font-size: 13px; color: #6b7280; line-height: 1.6; margin-bottom: 18px; }
.btn-contact { display: block; background: #1a7a1a; color: white; border: none; border-radius: 6px; padding: 10px; font-size: 13px; font-weight: 600; text-align: center; }
.btn-contact.aider { background: #f5d020; color: #1a1a1a; }
.form-card { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 36px; max-width: 640px; }
.form-card h2 { font-size: 20px; font-weight: 800; color: #1a1a1a; margin-bottom: 6px; }
.form-card p { font-size: 14px; color: #6b7280; margin-bottom: 28px; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field.full { grid-column: 1/-1; }
.field label { font-size: 13px; font-weight: 600; color: #374151; }
textarea { border: 1.5px solid #e5e7eb; border-radius: 6px; padding: 10px 14px; font-family: inherit; font-size: 14px; resize: vertical; }
.radio-group { display: flex; gap: 12px; margin-top: 4px; }
.radio-opt { display: flex; align-items: center; gap: 8px; padding: 10px 16px; border: 1.5px solid #e5e7eb; border-radius: 6px; cursor: pointer; font-size: 14px; color: #6b7280; }
.radio-opt.active { border-color: #1a7a1a; color: #1a7a1a; font-weight: 600; background: #EAF3DE; }
.radio-opt input { display: none; }
.btn-submit { background: #1a7a1a; color: white; border: none; border-radius: 6px; padding: 13px 28px; font-size: 14px; font-weight: 700; cursor: pointer; }
.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
.alert-ok { background: #EAF3DE; color: #1a7a1a; border-radius: 6px; padding: 16px; font-size: 14px; border-left: 3px solid #1a7a1a; margin-bottom: 16px; }
.alert-err { background: #fef2f2; color: #dc2626; border-radius: 6px; padding: 12px; font-size: 14px; border-left: 3px solid #dc2626; margin-bottom: 16px; }
.loading, .empty { text-align: center; padding: 48px; color: #6b7280; }
</style>
