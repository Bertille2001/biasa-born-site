<template>
  <div>
    <NavBar />
    <div class="page">

      <!-- LOGIN ADMIN -->
      <div v-if="!loggedIn" class="login-wrap">
        <div class="login-card">
          <div class="section-tag">Administration</div>
          <h1>Espace Admin</h1>
          <p>Accès réservé à la Fondation Dr Robert Fiadjoe.</p>
          <div class="field">
            <label>Mot de passe admin</label>
            <input v-model="pwd" type="password" placeholder="••••••••" @keyup.enter="login" />
          </div>
          <div v-if="loginErr" class="alert-err">Mot de passe incorrect.</div>
          <button class="btn-submit" @click="login">Accéder</button>
        </div>
      </div>

      <!-- DASHBOARD ADMIN -->
      <div v-else>
        <div class="admin-header">
          <div>
            <div class="section-tag">Administration</div>
            <h1>Tableau de bord admin</h1>
          </div>
          <button class="btn-logout" @click="loggedIn = false">Déconnexion</button>
        </div>

        <!-- ONGLETS -->
        <div class="tabs">
          <button :class="{active: tab==='membres'}" @click="tab='membres'; loadMembres()">Membres ({{ statsData.total || 0 }})</button>
          <button :class="{active: tab==='entraide'}" @click="tab='entraide'; loadEntaide()">Entraide ({{ entraideItems.length }})</button>
          <button :class="{active: tab==='ajouter'}" @click="tab='ajouter'">Ajouter une offre</button>
        </div>

        <!-- MEMBRES -->
        <div v-if="tab==='membres'">
          <div class="stats-row">
            <div class="stat-card"><div class="stat-num">{{ statsData.total || 0 }}</div><div class="stat-label">Total membres</div></div>
            <div class="stat-card"><div class="stat-num">{{ statsData.this_week || 0 }}</div><div class="stat-label">Cette semaine</div></div>
            <div class="stat-card"><div class="stat-num">{{ statsData.from_phone || 0 }}</div><div class="stat-label">Via appli mobile</div></div>
            <div class="stat-card"><div class="stat-num">{{ statsData.from_web || 0 }}</div><div class="stat-label">Via site web</div></div>
          </div>

          <div class="search-bar">
            <input v-model="search" placeholder="Rechercher un membre..." @input="loadMembres" />
          </div>

          <div v-if="loadingM" class="loading">Chargement...</div>
          <div v-else class="table-wrap">
            <table class="table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Téléphone</th>
                  <th>Email</th>
                  <th>Ville</th>
                  <th>Pays</th>
                  <th>Profession</th>
                  <th>Source</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="m in membres" :key="m.id">
                  <td><strong>{{ m.first_name }} {{ m.last_name }}</strong></td>
                  <td>{{ m.phone_number || '—' }}</td>
                  <td>{{ m.email || '—' }}</td>
                  <td>{{ m.ville || '—' }}</td>
                  <td>{{ m.pays || '—' }}</td>
                  <td>{{ m.profession || '—' }}</td>
                  <td><span class="badge" :class="m.source">{{ m.source }}</span></td>
                  <td>{{ formatDate(m.created_at) }}</td>
                  <td><button class="btn-del" @click="deleteMembre(m.id)">Supprimer</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ENTRAIDE -->
        <div v-if="tab==='entraide'">
          <div v-if="loadingE" class="loading">Chargement...</div>
          <div v-else class="table-wrap">
            <table class="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Catégorie</th>
                  <th>Titre</th>
                  <th>Nom</th>
                  <th>Lieu</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="e in entraideItems" :key="e.id">
                  <td><span class="badge" :class="e.type">{{ e.type }}</span></td>
                  <td>{{ e.categorie }}</td>
                  <td>{{ e.titre }}</td>
                  <td>{{ e.nom }}</td>
                  <td>{{ e.lieu }}</td>
                  <td>{{ formatDate(e.created_at) }}</td>
                  <td><button class="btn-del" @click="deleteEntraide(e.id)">Supprimer</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- AJOUTER OFFRE -->
        <div v-if="tab==='ajouter'" class="form-card">
          <h2>Ajouter une offre ou demande</h2>
          <div v-if="ajoutOk" class="alert-ok">Publication ajoutée avec succès !</div>
          <div v-else class="grid2">
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
              <label>Nom *</label>
              <input v-model="newItem.nom" placeholder="Nom de la personne" />
            </div>
            <div class="field full">
              <label>Titre *</label>
              <input v-model="newItem.titre" placeholder="Titre de l'offre" />
            </div>
            <div class="field full">
              <label>Description *</label>
              <textarea v-model="newItem.description" rows="3" placeholder="Description détaillée..."></textarea>
            </div>
            <div class="field">
              <label>Lieu</label>
              <input v-model="newItem.lieu" placeholder="Lomé, Togo" />
            </div>
            <div class="field">
              <label>Contact</label>
              <input v-model="newItem.contact" placeholder="+228 90 00 00 00" />
            </div>
            <div class="field full">
              <button class="btn-submit" @click="ajouterEntraide">Publier</button>
            </div>
          </div>
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
const ADMIN_PWD = 'biasa2024'

const loggedIn = ref(false)
const pwd = ref('')
const loginErr = ref(false)
const tab = ref('membres')
const membres = ref([])
const entraideItems = ref([])
const statsData = ref({})
const search = ref('')
const loadingM = ref(false)
const loadingE = ref(false)
const ajoutOk = ref(false)
const cats = ['Emploi', 'Formation', 'Santé', 'Logement', 'Financement', 'Mentorat', 'Orientation', 'Autre']
const newItem = ref({ type: 'offre', categorie: '', nom: '', titre: '', description: '', lieu: '', contact: '' })

const login = () => {
  if (pwd.value === ADMIN_PWD) { loggedIn.value = true; loginErr.value = false; loadMembres(); loadStats() }
  else loginErr.value = true
}

const loadStats = async () => {
  try { const r = await fetch(`${API}/biasa-born/stats`); statsData.value = await r.json() } catch {}
}

const loadMembres = async () => {
  loadingM.value = true
  try {
    const url = search.value ? `${API}/biasa-born?search=${search.value}` : `${API}/biasa-born?limit=100`
    const r = await fetch(url)
    membres.value = await r.json()
  } catch {}
  loadingM.value = false
}

const loadEntaide = async () => {
  loadingE.value = true
  try { const r = await fetch(`${API}/entraide`); entraideItems.value = await r.json() } catch {}
  loadingE.value = false
}

const deleteMembre = async (id) => {
  if (!confirm('Supprimer ce membre ?')) return
  await fetch(`${API}/biasa-born/${id}`, { method: 'DELETE' })
  loadMembres(); loadStats()
}

const deleteEntraide = async (id) => {
  if (!confirm('Supprimer cette publication ?')) return
  await fetch(`${API}/entraide/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ admin_password: ADMIN_PWD })
  })
  loadEntaide()
}

const ajouterEntraide = async () => {
  if (!newItem.value.titre || !newItem.value.nom) return
  const r = await fetch(`${API}/entraide`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...newItem.value, admin_password: ADMIN_PWD })
  })
  const data = await r.json()
  if (data.success) { ajoutOk.value = true; setTimeout(() => { ajoutOk.value = false; newItem.value = { type: 'offre', categorie: '', nom: '', titre: '', description: '', lieu: '', contact: '' } }, 2000) }
}

const formatDate = (d) => d ? new Date(d).toLocaleDateString('fr-FR') : '—'

onMounted(() => { if (loggedIn.value) { loadMembres(); loadStats() } })
</script>

<style scoped>
.page { max-width: 1100px; margin: 0 auto; padding: 56px 20px; }
.login-wrap { display: flex; justify-content: center; padding: 60px 0; }
.login-card { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 40px; width: 100%; max-width: 400px; }
.section-tag { font-size: 11px; font-weight: 700; color: #1a7a1a; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 10px; }
.login-card h1 { font-size: 24px; font-weight: 800; color: #1a1a1a; margin-bottom: 6px; }
.login-card p { font-size: 14px; color: #6b7280; margin-bottom: 24px; }
.admin-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
.admin-header h1 { font-size: 28px; font-weight: 800; color: #1a1a1a; }
.btn-logout { background: #f8f9fa; border: 1px solid #e5e7eb; color: #6b7280; border-radius: 6px; padding: 8px 16px; font-size: 13px; cursor: pointer; }
.tabs { display: flex; margin-bottom: 32px; border-bottom: 1px solid #e5e7eb; }
.tabs button { background: none; border: none; padding: 12px 24px; font-size: 14px; font-weight: 500; color: #6b7280; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all 0.2s; }
.tabs button.active { color: #1a7a1a; border-bottom-color: #1a7a1a; font-weight: 700; }
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
.stat-card { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; text-align: center; }
.stat-num { font-size: 28px; font-weight: 800; color: #1a7a1a; }
.stat-label { font-size: 12px; color: #9ca3af; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.05em; }
.search-bar { margin-bottom: 16px; }
.search-bar input { max-width: 320px; border: 1.5px solid #e5e7eb; border-radius: 6px; padding: 9px 14px; font-size: 14px; }
.table-wrap { overflow-x: auto; background: white; border: 1px solid #e5e7eb; border-radius: 8px; }
.table { width: 100%; border-collapse: collapse; font-size: 13px; }
.table th { padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 1px solid #e5e7eb; background: #f8f9fa; }
.table td { padding: 12px 16px; border-bottom: 1px solid #f3f4f6; color: #374151; }
.table tr:last-child td { border-bottom: none; }
.table tr:hover td { background: #f8f9fa; }
.badge { font-size: 11px; padding: 3px 8px; border-radius: 3px; font-weight: 600; }
.badge.web, .badge.offre { background: #EAF3DE; color: #1a7a1a; }
.badge.phone { background: #E3F2FD; color: #0B3C7A; }
.badge.demande { background: #FFF8E1; color: #854F0B; }
.btn-del { background: none; border: 1px solid #fca5a5; color: #dc2626; border-radius: 4px; padding: 4px 10px; font-size: 12px; cursor: pointer; }
.btn-del:hover { background: #fef2f2; }
.form-card { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 36px; max-width: 640px; }
.form-card h2 { font-size: 20px; font-weight: 800; color: #1a1a1a; margin-bottom: 24px; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field.full { grid-column: 1/-1; }
.field label { font-size: 13px; font-weight: 600; color: #374151; }
textarea { border: 1.5px solid #e5e7eb; border-radius: 6px; padding: 10px 14px; font-family: inherit; font-size: 14px; resize: vertical; }
.radio-group { display: flex; gap: 12px; }
.radio-opt { display: flex; align-items: center; gap: 8px; padding: 10px 16px; border: 1.5px solid #e5e7eb; border-radius: 6px; cursor: pointer; font-size: 14px; color: #6b7280; }
.radio-opt.active { border-color: #1a7a1a; color: #1a7a1a; font-weight: 600; background: #EAF3DE; }
.radio-opt input { display: none; }
.btn-submit { background: #1a7a1a; color: white; border: none; border-radius: 6px; padding: 13px 28px; font-size: 14px; font-weight: 700; cursor: pointer; }
.alert-ok { background: #EAF3DE; color: #1a7a1a; border-radius: 6px; padding: 14px; font-size: 14px; border-left: 3px solid #1a7a1a; margin-bottom: 16px; }
.alert-err { background: #fef2f2; color: #dc2626; border-radius: 6px; padding: 12px; font-size: 14px; margin-bottom: 14px; }
.loading { text-align: center; padding: 40px; color: #9ca3af; }
</style>
