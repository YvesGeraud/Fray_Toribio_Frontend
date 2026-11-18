<template>
  <footer class="site-footer">
    <div class="footer-main">
      <div class="footer-brand-column">
        <NuxtLink class="school-brand footer-brand" to="/" aria-label="Colegio Fray Toribio de Benavente, inicio">
          <img src="/images/escudo.jpeg" alt="Escudo oficial del Colegio Fray Toribio de Benavente" width="56" height="56">
          <span class="brand-copy"><strong>Colegio Fray Toribio<br>de Benavente</strong><small>SECUNDARIA GENERAL · CCT 29PES0084Y</small></span>
        </NuxtLink>
        <p class="footer-description">Formación académica y humana en Xicohtzinco, Tlaxcala.</p>
      </div>

      <div class="footer-nav-groups flex flex-wrap gap-8 lg:gap-12">
        <div>
          <span class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Navegación</span>
          <nav class="footer-links flex flex-col gap-2" aria-label="Enlaces del pie de página">
            <NuxtLink to="/el-colegio">El colegio</NuxtLink>
            <NuxtLink to="/oferta-educativa">Oferta educativa</NuxtLink>
            <NuxtLink to="/vida-escolar">Vida escolar</NuxtLink>
            <NuxtLink to="/admisiones">Admisiones</NuxtLink>
            <NuxtLink to="/portales">Portales escolares</NuxtLink>
            <NuxtLink to="/contacto">Contacto</NuxtLink>
          </nav>
        </div>

        <div>
          <span class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Plataformas Oficiales</span>
          <div class="flex flex-col gap-2.5 text-sm text-slate-300">
            <a
              href="https://colegiofraymotolinia.servoescolar.mx/"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-amber-300 transition-colors inline-flex items-center gap-1.5"
            >
              <span>Control Escolar (ServoEscolar)</span>
              <UIcon name="i-lucide-external-link" class="size-3.5 opacity-60" />
            </a>
            <a
              href="https://suite.amco.me/"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-amber-300 transition-colors inline-flex items-center gap-1.5"
            >
              <span>Sistema de Enseñanza (Suite AMCO)</span>
              <UIcon name="i-lucide-external-link" class="size-3.5 opacity-60" />
            </a>
            <a
              href="https://compradelibros.amco.me/"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-amber-300 transition-colors inline-flex items-center gap-1.5"
            >
              <span>Compra de Libros y Licencias</span>
              <UIcon name="i-lucide-external-link" class="size-3.5 opacity-60" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© {{ new Date().getFullYear() }} Colegio Fray Toribio de Benavente</span>
      <span>CCT 29PES0084Y · Xicohtzinco, Tlaxcala</span>
    </div>
  </footer>
</template>
