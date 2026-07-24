/**
 * Pewman Innovation — Web Components compartidos.
 * Cargar UNA vez (defer) desde layout/theme.liquid:
 *   {{ 'pewman-elements.js' | asset_url | script_tag: defer: true }}
 *
 * Convención: cada elemento hace todas sus querySelector relativas a `this`
 * (nunca a document), para que 2+ instancias de la misma sección en una
 * página no interfieran entre sí. Guard de registro para evitar error si
 * el asset se evalúa más de una vez.
 */
(function () {
  'use strict';

  // ---------------------------------------------------------------------
  // <pewman-horizontal-scroller> — track con scroll-snap + botones prev/next
  // Usado por: premios, casos de éxito, empresas que confían (home)
  // ---------------------------------------------------------------------
  class PewmanHorizontalScroller extends HTMLElement {
    connectedCallback() {
      this.track = this.querySelector('[data-track]');
      if (!this.track) return;
      this.step = parseInt(this.dataset.step || '330', 10);
      this.querySelectorAll('[data-dir]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const dir = parseInt(btn.dataset.dir, 10) || 1;
          this.track.scrollBy({ left: dir * this.step, behavior: 'smooth' });
        });
      });
    }
  }

  // ---------------------------------------------------------------------
  // <pewman-count-up-stat> — cuenta animada al entrar en viewport
  // Usado por: contador (home), franja de stats (empresa, fase 2)
  // ---------------------------------------------------------------------
  class PewmanCountUpStat extends HTMLElement {
    connectedCallback() {
      this.valueEl = this.querySelector('[data-value]');
      if (!this.valueEl) return;
      const to = parseFloat(this.dataset.to || '0');
      const prefix = this.dataset.prefix || '';
      const suffix = this.dataset.suffix || '';
      const duration = 1400;
      const el = this.valueEl;
      let started = false;

      const run = () => {
        if (started) return;
        started = true;
        let startTime = null;
        const step = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const eased = 0.5 - Math.cos(Math.PI * progress) / 2;
          const val = Math.floor(eased * to);
          el.textContent = prefix + val.toLocaleString('es-CL') + suffix;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              run();
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      io.observe(this);
    }
  }

  // ---------------------------------------------------------------------
  // <pewman-slideshow> — carrusel autoplay + dots + pausa on hover/focus
  // Usado por: hero de home
  // Nota: implementado como componente propio (no delega al slideshow
  // nativo de Horizon) porque no fue posible confirmar el nombre exacto
  // de ese componente mientras el MCP de Shopify estuvo desconectado.
  // Revisar al reconectar si conviene migrar al nativo.
  // ---------------------------------------------------------------------
  class PewmanSlideshow extends HTMLElement {
    connectedCallback() {
      this.track = this.querySelector('[data-track]');
      this.dotsWrap = this.querySelector('[data-dots]');
      if (!this.track) return;
      this.slides = [...this.track.children];
      if (this.slides.length <= 1) return;

      this.index = 0;
      this.autoplay = this.dataset.autoplay !== 'false';
      this.speed = (parseFloat(this.dataset.speed) || 6.5) * 1000;
      this.timer = null;

      if (this.dotsWrap) {
        this.slides.forEach((_, i) => {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.setAttribute('aria-label', 'Ir al slide ' + (i + 1));
          if (i === 0) dot.classList.add('is-active');
          dot.addEventListener('click', () => {
            this.goTo(i);
            this.restart();
          });
          this.dotsWrap.appendChild(dot);
        });
      }

      this.addEventListener('pointerenter', () => this.stop());
      this.addEventListener('pointerleave', () => this.restart());
      this.addEventListener('focusin', () => this.stop());
      this.addEventListener('focusout', () => this.restart());

      if (this.autoplay) this.restart();
    }

    goTo(i) {
      this.index = (i + this.slides.length) % this.slides.length;
      this.track.style.transform = 'translateX(-' + this.index * 100 + '%)';
      if (this.dotsWrap) {
        [...this.dotsWrap.children].forEach((dot, k) => dot.classList.toggle('is-active', k === this.index));
      }
    }

    restart() {
      if (!this.autoplay) return;
      this.stop();
      this.timer = setInterval(() => this.goTo(this.index + 1), this.speed);
    }

    stop() {
      if (this.timer) clearInterval(this.timer);
    }

    disconnectedCallback() {
      this.stop();
    }
  }

  // ---------------------------------------------------------------------
  // <pewman-modal> — shell de modal genérico (overlay + close + ESC + backdrop click)
  // Usado por: banner distribuidor CALS, guía de aplicación gated
  // Contrato: cualquier elemento con [data-modal-open="<id-del-modal>"] lo abre;
  // el propio <pewman-modal id="..."> se cierra con [data-modal-close] o ESC/backdrop.
  // ---------------------------------------------------------------------
  class PewmanModal extends HTMLElement {
    connectedCallback() {
      this.overlay = this.querySelector('.pewman-modal-overlay');
      if (!this.overlay) return;

      this.querySelectorAll('[data-modal-close]').forEach((btn) => {
        btn.addEventListener('click', () => this.close());
      });
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) this.close();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !this.overlay.hidden) this.close();
      });

      if (this.id) {
        document.querySelectorAll('[data-modal-open="' + this.id + '"]').forEach((trigger) => {
          trigger.addEventListener('click', () => this.open());
        });
      }

      // Tras el round-trip de {% form 'contact' %} el estado de éxito se
      // renderiza dentro del form, que marca [data-open-modal-now]. `form` no
      // existe fuera del bloque {% form %}, así que la señal viaja en el DOM.
      if (this.querySelector('[data-open-modal-now]')) this.open();
    }

    open() {
      this.overlay.hidden = false;
      document.body.style.overflow = 'hidden';
      this.dispatchEvent(new CustomEvent('pewman:modal-open'));
    }

    close() {
      this.overlay.hidden = true;
      document.body.style.overflow = '';
      this.dispatchEvent(new CustomEvent('pewman:modal-close'));
    }
  }

  // ---------------------------------------------------------------------
  // <pewman-cals-banner> — selector de zona -> sucursal + URL de distribuidor
  // Lee las zonas desde data-zones (JSON armado por Liquid a partir de los
  // blocks `zone`), en vez de un objeto JS hardcodeado.
  // ---------------------------------------------------------------------
  class PewmanCalsBanner extends HTMLElement {
    connectedCallback() {
      let zones = [];
      try {
        zones = JSON.parse(this.dataset.zones || '[]');
      } catch (err) {
        zones = [];
      }
      this.zonesByKey = Object.fromEntries(zones.map((z) => [z.key, z]));

      this.select = this.querySelector('[data-zone-select]');
      this.branchBox = this.querySelector('[data-branch-box]');
      this.branchText = this.querySelector('[data-branch-text]');
      this.goLink = this.querySelector('[data-cals-go]');

      if (this.select) {
        this.select.addEventListener('change', () => {
          const zone = this.zonesByKey[this.select.value];
          if (zone && this.branchBox && this.branchText) {
            this.branchText.textContent = zone.branch;
            this.branchBox.hidden = false;
            if (this.goLink) this.goLink.href = zone.url;
          } else if (this.branchBox) {
            this.branchBox.hidden = true;
          }
        });
      }

      // Al enviar el formulario nativo de contacto, si ya viene marcado como
      // exitoso (round-trip), actualizar el link de destino a la URL de la
      // zona seleccionada (persistida en un input oculto).
      const hiddenZone = this.querySelector('[data-selected-zone]');
      if (hiddenZone && hiddenZone.value && this.goLink) {
        const zone = this.zonesByKey[hiddenZone.value];
        if (zone) {
          this.goLink.href = zone.url;
          if (this.branchText) this.branchText.textContent = zone.branch;
        }
      }
    }
  }

  // ---------------------------------------------------------------------
  // <pewman-variant-picker> — selector de formato tipo píldora (1L/5L/20L)
  // Restylea el variant picker nativo como píldoras y sincroniza precio +
  // imagen + disponibilidad + input oculto de variant id, sin reescribir
  // el flujo de carrito (el <form> sigue siendo {% form 'product' %} nativo).
  // Lee los datos de cada variante desde data-variants (JSON armado por Liquid).
  // ---------------------------------------------------------------------
  class PewmanVariantPicker extends HTMLElement {
    connectedCallback() {
      let variants = [];
      try {
        variants = JSON.parse(this.dataset.variants || '[]');
      } catch (err) {
        variants = [];
      }
      this.variantsById = Object.fromEntries(variants.map((v) => [String(v.id), v]));

      this.priceEl = this.querySelector('[data-price]');
      this.imageEl = this.querySelector('[data-gallery-image]');
      this.variantIdInput = this.querySelector('[data-variant-id-input]');
      this.submitBtn = this.querySelector('[data-add-to-cart]');

      this.querySelectorAll('[data-variant-option]').forEach((btn) => {
        btn.addEventListener('click', () => this.select(btn.dataset.variantOption, btn));
      });
    }

    select(variantId, btnEl) {
      const variant = this.variantsById[variantId];
      if (!variant) return;

      this.querySelectorAll('[data-variant-option]').forEach((b) => b.classList.remove('is-active'));
      if (btnEl) btnEl.classList.add('is-active');

      if (this.priceEl) this.priceEl.textContent = variant.priceFormatted;
      if (this.imageEl && variant.image) this.imageEl.setAttribute('src', variant.image);
      if (this.variantIdInput) this.variantIdInput.value = variant.id;
      if (this.submitBtn) {
        this.submitBtn.disabled = !variant.available;
        this.submitBtn.textContent = variant.available ? this.submitBtn.dataset.availableLabel : this.submitBtn.dataset.soldOutLabel;
      }
      this.dispatchEvent(new CustomEvent('pewman:variant-change', { detail: variant }));
    }
  }

  // ---------------------------------------------------------------------
  // <pewman-video-modal> — modal compartido de video YouTube (Casos).
  // Delega por clic en cualquier [data-yt] dentro de la sección (event
  // delegation), asi funciona sin importar cuantos testimonios agregue
  // Denisse despues, sin reinicializacion.
  // ---------------------------------------------------------------------
  class PewmanVideoModal extends HTMLElement {
    connectedCallback() {
      this.overlay = this.querySelector('.pewman-modal-overlay');
      this.frame = this.querySelector('[data-yt-frame]');
      if (!this.overlay || !this.frame) return;

      document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-yt]');
        if (!trigger) return;
        this.open(trigger.dataset.yt);
      });
      document.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const trigger = e.target.closest('[data-yt]');
        if (!trigger) return;
        e.preventDefault();
        this.open(trigger.dataset.yt);
      });

      this.querySelectorAll('[data-modal-close]').forEach((btn) => btn.addEventListener('click', () => this.close()));
      this.overlay.addEventListener('click', (e) => { if (e.target === this.overlay) this.close(); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !this.overlay.hidden) this.close(); });
    }

    open(videoId) {
      if (!videoId) return;
      this.frame.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
      this.overlay.hidden = false;
      document.body.style.overflow = 'hidden';
    }

    close() {
      this.frame.src = '';
      this.overlay.hidden = true;
      document.body.style.overflow = '';
    }
  }

  // ---------------------------------------------------------------------
  // <pewman-pdf-modal> — modal compartido de visor de PDF (Casos, ensayos).
  // Mismo patron de event delegation sobre [data-pdf]/[data-title].
  // ---------------------------------------------------------------------
  class PewmanPdfModal extends HTMLElement {
    connectedCallback() {
      this.overlay = this.querySelector('.pewman-modal-overlay');
      this.frame = this.querySelector('[data-pdf-frame]');
      this.titleEl = this.querySelector('[data-pdf-title]');
      this.downloadLink = this.querySelector('[data-pdf-download]');
      if (!this.overlay || !this.frame) return;

      document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.has-pdf[data-pdf]');
        if (!trigger) return;
        this.open(trigger.dataset.pdf, trigger.dataset.title);
      });

      this.querySelectorAll('[data-modal-close]').forEach((btn) => btn.addEventListener('click', () => this.close()));
      this.overlay.addEventListener('click', (e) => { if (e.target === this.overlay) this.close(); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !this.overlay.hidden) this.close(); });
    }

    open(pdfUrl, title) {
      if (!pdfUrl) return;
      this.frame.src = pdfUrl;
      if (this.downloadLink) this.downloadLink.href = pdfUrl;
      if (this.titleEl) this.titleEl.textContent = title || 'Informe técnico';
      this.overlay.hidden = false;
      document.body.style.overflow = 'hidden';
    }

    close() {
      this.frame.src = '';
      this.overlay.hidden = true;
      document.body.style.overflow = '';
    }
  }

  const registry = [
    ['pewman-horizontal-scroller', PewmanHorizontalScroller],
    ['pewman-count-up-stat', PewmanCountUpStat],
    ['pewman-slideshow', PewmanSlideshow],
    ['pewman-modal', PewmanModal],
    ['pewman-cals-banner', PewmanCalsBanner],
    ['pewman-variant-picker', PewmanVariantPicker],
    ['pewman-video-modal', PewmanVideoModal],
    ['pewman-pdf-modal', PewmanPdfModal],
  ];

  registry.forEach(([name, klass]) => {
    if (!customElements.get(name)) customElements.define(name, klass);
  });
})();
