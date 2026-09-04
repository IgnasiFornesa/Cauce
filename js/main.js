/**
 * Cauce — landing page
 * JavaScript vanilla, sin dependencias. Todo se ejecuta en el navegador
 * del usuario; no hay llamadas de red ni analítica.
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
   * 1. Calculadora de inflación
   *
   * Metodología: para un importe A parado desde el año Y, calculamos su
   * valor real hoy dividiendo A entre el producto acumulado de
   * (1 + IPC_i/100) para cada año i desde Y (incluido) hasta el último
   * año con dato disponible en IPC_ES. Se incluye el año de inicio
   * porque, si el dinero llevaba parado desde ese año, ya sufrió la
   * inflación registrada durante esos doce meses.
   * ------------------------------------------------------------------ */

  var amountInput = document.getElementById('amount');
  var yearSelect = document.getElementById('year-start');
  var realValueEl = document.getElementById('real-value');
  var lossAmountEl = document.getElementById('loss-amount');
  var lossPctEl = document.getElementById('loss-pct');

  function formatEUR(value) {
    return value.toLocaleString('es-ES', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }

  function formatPct(value) {
    return value.toLocaleString('es-ES', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    });
  }

  function populateYears() {
    if (!yearSelect || typeof IPC_ES === 'undefined') return;

    for (var y = IPC_ES_FIRST_YEAR; y <= IPC_ES_LAST_YEAR; y++) {
      var opt = document.createElement('option');
      opt.value = String(y);
      opt.textContent = String(y);
      yearSelect.appendChild(opt);
    }

    // Año de ejemplo por defecto: ni el extremo más antiguo ni el más
    // reciente, para que el primer resultado que ve alguien sea legible.
    var defaultYear = 2015;
    if (Object.prototype.hasOwnProperty.call(IPC_ES, defaultYear)) {
      yearSelect.value = String(defaultYear);
    }
  }

  function calculateInflationLoss() {
    if (!amountInput || !yearSelect || !realValueEl || typeof IPC_ES === 'undefined') {
      return;
    }

    var amount = parseFloat(amountInput.value);
    var startYear = parseInt(yearSelect.value, 10);

    if (!isFinite(amount) || amount <= 0 || !isFinite(startYear)) {
      realValueEl.textContent = '—';
      lossAmountEl.textContent = '—';
      lossPctEl.textContent = '—';
      return;
    }

    var factor = 1;
    for (var y = startYear; y <= IPC_ES_LAST_YEAR; y++) {
      var rate = IPC_ES[y];
      if (typeof rate === 'number') {
        factor *= (1 + rate / 100);
      }
    }

    var realValue = amount / factor;
    var loss = amount - realValue;
    var lossPct = (loss / amount) * 100;

    realValueEl.textContent = formatEUR(Math.round(realValue));
    lossAmountEl.textContent = formatEUR(Math.round(loss));
    lossPctEl.textContent = formatPct(lossPct);
  }

  if (amountInput && yearSelect) {
    populateYears();
    amountInput.addEventListener('input', calculateInflationLoss);
    yearSelect.addEventListener('change', calculateInflationLoss);
    calculateInflationLoss();
  }

  /* ------------------------------------------------------------------
   * 2. El coste de esperar
   *
   * Interés compuesto sobre una aportación única, con una rentabilidad
   * hipotética explícita (no vinculada a ningún producto real). Sirve
   * solo para ilustrar el efecto del tiempo, tal y como indica la nota
   * junto a los números en la propia página.
   * ------------------------------------------------------------------ */

  var HYPOTHETICAL_ANNUAL_RATE = 0.05; // 5 % anual, supuesto explícito.
  var PRINCIPAL = 10000; // €
  var HORIZON_YEARS = 20;

  function futureValue(principal, rate, years) {
    return principal * Math.pow(1 + rate, years);
  }

  [
    { id: 'wait-0', delay: 0 },
    { id: 'wait-5', delay: 5 },
    { id: 'wait-10', delay: 10 }
  ].forEach(function (block) {
    var el = document.getElementById(block.id);
    if (!el) return;
    var yearsInvested = HORIZON_YEARS - block.delay;
    var value = futureValue(PRINCIPAL, HYPOTHETICAL_ANNUAL_RATE, yearsInvested);
    el.textContent = formatEUR(Math.round(value)) + ' €';
  });

  /* ------------------------------------------------------------------
   * 3. Año actual en el pie
   * ------------------------------------------------------------------ */
  var yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ------------------------------------------------------------------
   * 4. Portadas (covers): revelado al entrar en pantalla
   *
   * Mejora progresiva a propósito: la clase 'js-reveal' es lo único
   * que activa el estado inicial oculto en CSS (ver .js-reveal en
   * css/styles.css). Sin JS, o si la persona prefiere menos
   * movimiento, todo el contenido es visible desde el principio y no
   * dependemos de que IntersectionObserver exista.
   * ------------------------------------------------------------------ */
  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-reveal');

    var covers = document.querySelectorAll('[data-cover]');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });

    covers.forEach(function (cover) {
      observer.observe(cover);
    });
  }
})();
