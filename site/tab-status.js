// While the tab is in the background: the title cycles "On hold." → ".." → "..." → "" and the favicon
// gains a red dot. Both are restored when the visitor comes back. Loaded by index.html and 404.html.
(() => {
  const FRAMES = ['On hold.', 'On hold..', 'On hold...', 'On hold'];
  const ICON = '/favicon.svg', ICON_HOLD = '/favicon-hold.svg';

  let icon = document.querySelector('link[rel="icon"]');
  if (!icon) {
    icon = document.createElement('link');
    icon.rel = 'icon';
    icon.type = 'image/svg+xml';
    icon.href = ICON;
    document.head.appendChild(icon);
  }
  new Image().src = ICON_HOLD; // warm the cache so the swap is instant

  let title = document.title, timer = 0, frame = 0;

  function tick() { document.title = FRAMES[frame++ % FRAMES.length]; }

  function away() {
    if (timer) return;
    title = document.title;
    frame = 0;
    icon.href = ICON_HOLD;
    tick();
    timer = setInterval(tick, 1000);
  }

  function back() {
    if (!timer) return;
    clearInterval(timer);
    timer = 0;
    document.title = title;
    icon.href = ICON;
  }

  document.addEventListener('visibilitychange', () => (document.hidden ? away() : back()));
  if (document.hidden) away();
})();
