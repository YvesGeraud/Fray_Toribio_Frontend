<template>
  <footer class="site-footer">
    <div class="footer-main">
      <NuxtLink class="school-brand footer-brand" to="/" aria-label="Colegio Fray Toribio de Benavente, inicio">
        <img src="/images/escudo.jpeg" alt="Escudo oficial del Colegio Fray Toribio de Benavente" width="56" height="56">
        <span class="brand-copy"><strong>Colegio Fray Toribio<br>de Benavente</strong><small>SECUNDARIA GENERAL · CCT 29PES0084Y</small></span>
      </NuxtLink>
      <p class="footer-description">Formación académica y humana en Xicohtzinco, Tlaxcala.</p>
      <nav class="footer-links" aria-label="Enlaces del pie de página">
        <NuxtLink to="/el-colegio">El colegio</NuxtLink>
        <NuxtLink to="/oferta-educativa">Oferta educativa</NuxtLink>
        <NuxtLink to="/vida-escolar">Vida escolar</NuxtLink>
        <NuxtLink to="/admisiones">Admisiones</NuxtLink>
        <NuxtLink to="/contacto">Contacto</NuxtLink>
      </nav>
    </div>
    <div class="footer-bottom"><span>© {{ new Date().getFullYear() }} Colegio Fray Toribio de Benavente</span><span>CCT 29PES0084Y</span></div>
  </footer>
</template>
