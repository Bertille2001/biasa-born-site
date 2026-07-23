<template>
  <div>
    <NavBar />
    <div class="page">
      <div class="page-header">
        <div class="section-tag">Communauté</div>
        <h1>Les Biasa Born</h1>
        <p>Découvrez les membres de la communauté à travers le Togo et la diaspora mondiale.</p>
      </div>

      <div class="stats-bar">
        <div class="stat"><div class="stat-num">{{ stats.total }}</div><div class="stat-label">Membres inscrits</div></div>
        <div class="stat-sep"></div>
        <div class="stat"><div class="stat-num">{{ stats.this_week }}</div><div class="stat-label">Cette semaine</div></div>
        <div class="stat-sep"></div>
        <div class="stat"><div class="stat-num">40+</div><div class="stat-label">Années de naissances</div></div>
        <div class="stat-sep"></div>
        <div class="stat"><div class="stat-num">{{ (stats.from_web || 0) + (stats.manual || 0) }}</div><div class="stat-label">Via le site</div></div>
      </div>

      <div v-if="loading" class="loading">Chargement des membres...</div>

      <div v-else-if="membres.length === 0" class="empty">
        <p>Soyez le premier à rejoindre la communauté.</p>
        <RouterLink to="/inscription" class="btn-primary" style="margin-top:16px;display:inline-block">S'inscrire maintenant</RouterLink>
      </div>

      <div v-else class="membres-grid">
        <div class="membre-card" v-for="m in membres" :key="m.id">
          <div class="avatar" :style="{background: getColor(m.name)}">
            {{ getInitials(m.first_name, m.last_name) }}
          </div>
          <div class="m-name">{{ m.first_name || m.name }}</div>
          <div class="m-info">{{ [m.ville, m.pays].filter(Boolean).join(', ') }}</div>
          <div class="m-badge">Biasa Born</div>
        </div>
        <RouterLink to="/inscription" class="membre-card add-card">
          <div class="add-icon">+</div>
          <div class="add-label">Rejoindre</div>
        </RouterLink>
      </div>
    </div>
    <FooterComp />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import FooterComp from '../components/FooterComp.vue'

const API = 'https://biasa-born-api.onrender.com'
const membres = ref([])
const stats = ref({ total: 0, this_week: 0, from_web: 0, manual: 0 })
const loading = ref(true)

const colors = ['#1a7a1a', '#0B3C7A', '#185FA5', '#854F0B', '#A32D2D', '#6b21a8']
const getColor = (n) => colors[(n?.charCodeAt(0) || 0) % colors.length]
const getInitials = (f, l) => `${(f||'?')[0]}${(l||'')[0]||''}`.toUpperCase()

onMounted(async () => {
  try {
    const [mRes, sRes] = await Promise.all([
      fetch(`${API}/biasa-born?limit=50`),
      fetch(`${API}/biasa-born/stats`)
    ])
    membres.value = await mRes.json()
    stats.value = await sRes.json()
  } catch (e) { console.error(e) }
  loading.value = false
})
</script>

<style scoped>
.page { max-width: 1000px; margin: 0 auto; padding: 56px 20px; }
.page-header { margin-bottom: 36px; }
.section-tag { font-size: 11px; font-weight: 700; color: #1a7a1a; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 10px; }
.page-header h1 { font-size: 28px; font-weight: 800; color: #1a1a1a; margin-bottom: 10px; }
.page-header p { font-size: 15px; color: #6b7280; }
.stats-bar { display: flex; align-items: center; justify-content: center; gap: 40px; background: #0B3C7A; border-radius: 8px; padding: 28px; margin-bottom: 40px; flex-wrap: wrap; }
.stat { text-align: center; }
.stat-num { font-size: 28px; font-weight: 800; color: #f5d020; }
.stat-label { font-size: 11px; color: rgba(255,255,255,0.55); margin-top: 4px; text-transform: uppercase; letter-spacing: 0.05em; }
.stat-sep { width: 1px; height: 36px; background: rgba(255,255,255,0.15); }
.membres-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 14px; }
.membre-card { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px 12px; text-align: center; transition: box-shadow 0.2s; }
.membre-card:hover { box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
.avatar { width: 48px; height: 48px; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 15px; color: white; }
.m-name { font-size: 13px; font-weight: 700; color: #1a1a1a; }
.m-info { font-size: 11px; color: #9ca3af; margin-top: 3px; }
.m-badge { display: inline-block; background: #EAF3DE; color: #1a7a1a; font-size: 10px; padding: 3px 8px; border-radius: 3px; margin-top: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
.add-card { border: 1.5px dashed #d1d5db; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 130px; cursor: pointer; background: #f8f9fa; }
.add-card:hover { border-color: #1a7a1a; background: #EAF3DE; }
.add-icon { font-size: 24px; color: #9ca3af; }
.add-label { font-size: 12px; color: #9ca3af; margin-top: 6px; }
.add-card:hover .add-icon, .add-card:hover .add-label { color: #1a7a1a; }
.loading, .empty { text-align: center; padding: 60px; color: #6b7280; }
.btn-primary { background: #1a7a1a; color: white; border-radius: 6px; padding: 11px 22px; font-size: 14px; font-weight: 700; }
</style>
