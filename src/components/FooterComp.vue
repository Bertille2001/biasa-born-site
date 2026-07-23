<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="footer-logos">
          <div class="logo-box">
            <img src="/images/logo-biasa-born.png" alt="Biasa Born" class="footer-logo-born" />
          </div>
          <div class="logo-sep"></div>
          <div class="logo-box">
            <img src="/images/logo-fondation.png" alt="Fondation Dr Robert Fiadjoe" class="footer-logo-fondation" />
          </div>
          <div class="logo-sep"></div>
          <div class="logo-box">
            <img src="/images/logo-clinique.png" alt="Clinique Biasa" class="footer-logo-clinique" />
          </div>
        </div>
        <p class="footer-desc">Une initiative de la Fondation Dr Robert Fiadjoe · Lomé, Togo</p>
        <a href="https://wa.me/22893956409" target="_blank" class="footer-wa">+228 93 95 64 09</a>
      </div>

      <div class="footer-nav">
        <div class="footer-col-title">Navigation</div>
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/inscription">Inscription</RouterLink>
        <RouterLink to="/communaute">Communauté</RouterLink>
        <RouterLink to="/entraide">Entraide</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </div>

      <div class="footer-social">
        <div class="footer-col-title">Nous suivre</div>
        <a href="https://web.facebook.com/FondationDrRobertFiadjoe" target="_blank">Facebook — Fondation Dr Robert Fiadjoe</a>
        <a href="https://wa.me/22893956409" target="_blank">WhatsApp — +228 93 95 64 09</a>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© 2024 Fondation Dr Robert Fiadjoe · Tous droits réservés · Lomé, Togo</span>
    </div>
  </footer>

  <a href="https://wa.me/22893956409" target="_blank" class="wa-float" title="Nous contacter sur WhatsApp">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.864L.057 23.571a.75.75 0 00.918.919l5.699-1.476A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.714 9.714 0 01-4.907-1.326l-.352-.209-3.643.944.964-3.546-.229-.364A9.714 9.714 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
  </a>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.footer { background: #0B3C7A; padding: 56px 40px 0; margin-top: 80px; }
.footer-inner { max-width: 1100px; margin: 0 auto; display: flex; gap: 60px; flex-wrap: wrap; padding-bottom: 48px; border-bottom: 1px solid rgba(255,255,255,0.1); }
.footer-brand { flex: 2; min-width: 260px; }
.footer-logos { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
.logo-box { background: white; border-radius: 6px; padding: 10px 14px; display: flex; align-items: center; justify-content: center; }
.footer-logo-born { height: 48px; object-fit: contain; }
.footer-logo-fondation { height: 44px; object-fit: contain; }
.footer-logo-clinique { height: 32px; object-fit: contain; }
.logo-sep { width: 1px; height: 36px; background: rgba(255,255,255,0.15); }
.footer-desc { font-size: 13px; color: rgba(255,255,255,0.5); margin-bottom: 16px; line-height: 1.6; }
.footer-wa { display: inline-block; background: #25D366; color: white; border-radius: 6px; padding: 8px 16px; font-size: 13px; font-weight: 600; }
.footer-nav { flex: 1; min-width: 140px; display: flex; flex-direction: column; gap: 10px; }
.footer-social { flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 12px; }
.footer-col-title { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
.footer-nav a { font-size: 14px; color: rgba(255,255,255,0.6); transition: color 0.2s; }
.footer-nav a:hover, .footer-nav a.router-link-active { color: white; }
.footer-social a { font-size: 13px; color: rgba(255,255,255,0.6); transition: color 0.2s; }
.footer-social a:hover { color: white; }
.footer-bottom { max-width: 1100px; margin: 0 auto; padding: 20px 0; }
.footer-bottom span { font-size: 12px; color: rgba(255,255,255,0.25); }
.wa-float { position: fixed; bottom: 28px; right: 28px; width: 54px; height: 54px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(0,0,0,0.2); z-index: 999; transition: transform 0.2s; }
.wa-float:hover { transform: scale(1.08); }
</style>
