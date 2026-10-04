(function () {
  // Open links to other websites in a new tab.
  document.querySelectorAll('a[href]').forEach(function (a) {
    if (a.hostname && a.hostname !== location.hostname) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }
  });

  // "Show less" at the bottom of an expanded list: collapse it and scroll
  // back to the "Show more" link so the reader doesn't lose their place.
  document.querySelectorAll('.more-collapse').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var details = btn.closest('details');
      details.open = false;
      var summary = details.querySelector('summary');
      try {
        summary.scrollIntoView({ block: 'center', behavior: 'instant' });
      } catch (e) {
        summary.scrollIntoView(); // older browsers
      }
    });
  });

  // Light / dark theme button. The choice is remembered in this browser.
  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var root = document.documentElement;
      var current = root.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // Click a publication image to zoom; click anywhere or press Esc to close.
  var box = document.getElementById('lightbox');
  if (!box) return;
  var img = box.querySelector('img');
  var lastFocus = null;

  function open(src, alt) {
    lastFocus = document.activeElement;
    img.src = src;
    img.alt = alt || '';
    box.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function close() {
    box.hidden = true;
    img.removeAttribute('src');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('[data-zoom]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var inner = btn.querySelector('img');
      open(btn.getAttribute('data-zoom'), inner && inner.alt);
    });
  });
  box.addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !box.hidden) close();
  });
})();
