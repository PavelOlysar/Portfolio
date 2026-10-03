(function () {
  if (window.__poSmooth) return;
  window.__poSmooth = true;
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var KEY = 'poTx';
  var SOFT = 'cubic-bezier(.4,0,.2,1)', CURT = 'cubic-bezier(.76,0,.24,1)';
  var LIGHT = '#F4F7F2';

  function styleName() {
    var s = window.poTxStyle;
    if (!s) try { s = localStorage.getItem('po-tx'); } catch (e) {}
    return s === 'fade' || s === 'curtain' ? s : 'blur';
  }

  var root = document.createElement('div');
  root.setAttribute('aria-hidden', 'true');
  root.style.cssText = 'position:fixed;inset:0;z-index:2147483000;pointer-events:none;overflow:hidden';
  var blur = document.createElement('div');
  blur.style.cssText = 'position:absolute;inset:0;opacity:0;backdrop-filter:blur(22px) saturate(1.1);-webkit-backdrop-filter:blur(22px) saturate(1.1)';
  var veil = document.createElement('div');
  veil.style.cssText = 'position:absolute;inset:0;opacity:0;background:#F4F7F2';
  var panel = document.createElement('div');
  panel.style.cssText = 'position:absolute;left:-10vw;right:-10vw;top:-14vh;height:128vh;border-radius:50% / 14vh;background:#16231B;transform:translateY(120vh);will-change:transform';
  root.appendChild(blur); root.appendChild(veil); root.appendChild(panel);
  document.documentElement.appendChild(root);

  // Resolves when the animation finishes, or shortly after it should have: if the browser never starts it
  // (throttled tab, low-power mode, some WebKit builds) the jump/navigation must still happen.
  function anim(el, from, to, dur, ease, delay) {
    var a = el.animate([from, to], { duration: dur, delay: delay || 0, easing: ease, fill: 'forwards' });
    return new Promise(function (resolve) {
      var done = false;
      function finish() { if (done) return; done = true; for (var k in to) el.style[k] = to[k]; a.cancel(); resolve(); }
      a.finished.then(finish, finish);
      setTimeout(finish, (delay || 0) + dur + 150);
    });
  }
  function reset() {
    blur.style.opacity = veil.style.opacity = '0';
    panel.style.transform = 'translateY(120vh)';
    root.style.pointerEvents = 'none';
  }
  var FX = {
    fade: {
      set: function (c) { veil.style.background = c; veil.style.opacity = '1'; },
      cover: function (c) { veil.style.background = c; return anim(veil, { opacity: 0 }, { opacity: 1 }, 420, SOFT); },
      reveal: function () { return anim(veil, { opacity: 1 }, { opacity: 0 }, 680, SOFT); }
    },
    blur: {
      set: function (c) { veil.style.background = c; veil.style.opacity = blur.style.opacity = '1'; },
      cover: function (c) {
        veil.style.background = c;
        return Promise.all([anim(blur, { opacity: 0 }, { opacity: 1 }, 380, SOFT), anim(veil, { opacity: 0 }, { opacity: 1 }, 380, SOFT, 140)]);
      },
      reveal: function () {
        return Promise.all([anim(veil, { opacity: 1 }, { opacity: 0 }, 420, SOFT), anim(blur, { opacity: 1 }, { opacity: 0 }, 760, SOFT, 120)]);
      }
    },
    curtain: {
      set: function () { panel.style.transform = 'translateY(0)'; },
      cover: function () { return anim(panel, { transform: 'translateY(120vh)' }, { transform: 'translateY(0)' }, 720, CURT); },
      reveal: function () { return anim(panel, { transform: 'translateY(0)' }, { transform: 'translateY(-140vh)' }, 820, CURT); }
    }
  };

  function jumpTo(el) {
    var y = el === document.body ? 0 : el.getBoundingClientRect().top + window.scrollY;
    if (window.lenis) window.lenis.scrollTo(y, { immediate: true, force: true });
    window.scrollTo({ top: y, behavior: 'instant' });
  }

  var arriving = null;
  try { arriving = JSON.parse(sessionStorage.getItem(KEY) || 'null'); sessionStorage.removeItem(KEY); } catch (e) {}
  if (arriving) window.__poArrived = true;
  if (arriving && !reduced && FX[arriving.s]) { FX[arriving.s].set(arriving.c); root.style.pointerEvents = 'auto'; }
  document.documentElement.removeAttribute('data-po-tx');

  var busy = false;
  window.poJump = function (target) {
    var el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el || busy) return;
    if (reduced) return jumpTo(el);
    busy = true;
    var fx = FX[styleName()];
    root.style.pointerEvents = 'auto';
    fx.cover(LIGHT).then(function () {
      jumpTo(el);
      return new Promise(function (r) { requestAnimationFrame(function () { setTimeout(r, 80); }); });
    }).then(fx.reveal).then(function () { reset(); busy = false; });
  };

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
    if (a.origin !== location.origin || !/^https?:/.test(a.protocol)) return;
    if (a.pathname === location.pathname) {
      var raw = a.getAttribute('href') || '';
      if (raw.charAt(0) === '#' && a.hash.length < 2) return;
      var el = a.hash.length < 2 ? document.body : document.querySelector(a.hash);
      if (!el) return;
      e.preventDefault();
      window.poJump(el);
      return;
    }
    e.preventDefault();
    if (busy) return;
    busy = true;
    var href = a.href, s = styleName();
    var c = s === 'curtain' ? '#16231B' : LIGHT;
    try { sessionStorage.setItem(KEY, JSON.stringify({ s: s, c: c })); } catch (err) {}
    if (reduced) { location.href = href; return; }
    root.style.pointerEvents = 'auto';
    FX[s].cover(c).then(function () { location.href = href; });
  }, true);

  window.addEventListener('pageshow', function (e) { if (e.persisted) { busy = false; reset(); } });

  var hash = location.hash.length > 1 ? location.hash : null, t0 = performance.now();
  (function wait() {
    var el = hash && document.querySelector(hash), dt = performance.now() - t0;
    if ((hash && !el && dt < 1800) || (document.readyState !== 'complete' && dt < 1200) || (arriving && dt < 320)) return setTimeout(wait, 50);
    if (el) jumpTo(el);
    if (arriving && !reduced && FX[arriving.s]) requestAnimationFrame(function () { FX[arriving.s].reveal().then(reset); });
  })();

  // shared scroll reveal — same entrance timing as the intro (1200ms, expo-out)
  if (!reduced && 'IntersectionObserver' in window && Element.prototype.animate) {
    var rio = new IntersectionObserver(function (es) {
      es.filter(function (e) { return e.isIntersecting; })
        .sort(function (x, y) { return (x.boundingClientRect.top - y.boundingClientRect.top) || (x.boundingClientRect.left - y.boundingClientRect.left); })
        .forEach(function (en, i) {
          var el = en.target;
          rio.unobserve(el);
          el.animate([{ opacity: 0, transform: 'translate3d(0,28px,0)' }, { opacity: 1, transform: 'translate3d(0,0,0)' }],
            { duration: 1200, delay: (+el.dataset.revealDelay || 0) + Math.min(i, 6) * 90, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
          el.style.opacity = '';
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    var scanT;
    // Only touch the rendered page (#dc-root), never the raw <x-dc> template: on a slow connection this runs while
    // the HTML is still streaming in, and the runtime builds the page from that template, so anything stamped on it
    // (a marker attribute, opacity:0) is cloned into every rendered element, which then never gets observed and
    // stays invisible. Observed elements are tracked in a WeakSet rather than an attribute for the same reason.
    var seen = typeof WeakSet === 'function' ? new WeakSet() : null;
    var scan = function () {
      document.querySelectorAll('#dc-root [data-reveal]').forEach(function (el) {
        if (seen ? seen.has(el) : el.__rv) return;
        if (seen) seen.add(el); else el.__rv = 1;
        el.style.opacity = '0';
        rio.observe(el);
      });
    };
    new MutationObserver(function () { clearTimeout(scanT); scanT = setTimeout(scan, 30); }).observe(document.documentElement, { childList: true, subtree: true });
    scan();
  }

  if (reduced) return;
  var s = document.createElement('script');
  s.src = '/vendor/lenis.min.js'; // lenis@1.1.13, self-hosted (was unpkg)
  s.onload = function () {
    if (!window.Lenis) return;
    var l = new window.Lenis({ duration: 1.15, easing: function (t) { return 1 - Math.pow(1 - t, 4); }, smoothWheel: true });
    window.lenis = l;
    (function raf(t) { l.raf(t); requestAnimationFrame(raf); })(performance.now());
  };
  document.head.appendChild(s);
})();
