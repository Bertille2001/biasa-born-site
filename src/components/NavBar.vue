<template>
  <nav class="navbar">
    <div class="logo-area">
      <img src="/images/logo-biasa-born.png" alt="Biasa Born" class="logo-born" />
    </div>
    <div class="nav-links">
      <RouterLink to="/">Accueil</RouterLink>
      <RouterLink to="/communaute">Communauté</RouterLink>
      <RouterLink to="/entraide">Entraide</RouterLink>
      <RouterLink to="/contact">Contact</RouterLink>
    </div>
    <RouterLink to="/inscription" class="nav-cta">Je m'inscris</RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 40px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
  gap: 20px;
}
.logo-born { height: 90px; object-fit: contain; }
.nav-links { display: flex; gap: 28px; font-size: 14px; color: #6b7280; flex: 1; justify-content: center; }
.nav-links a { font-weight: 500; transition: color 0.2s; }
.nav-links a:hover, .nav-links a.router-link-active { color: #1a7a1a; }
.nav-cta { background: #1a7a1a; color: white; border-radius: 8px; padding: 9px 20px; font-size: 14px; font-weight: 600; white-space: nowrap; transition: background 0.2s; }
.nav-cta:hover { background: #155e15; }
</style>
