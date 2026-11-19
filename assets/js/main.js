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

  // Top bar: menu button on phones, and underline the section being read.
  var navbar = document.getElementById('navbar');
  if (navbar) {
    var menuBtn = navbar.querySelector('.navbar-menu-btn');
    var navLinks = navbar.querySelectorAll('.navbar-links a');
    var setMenu = function (open) {
      navbar.classList.toggle('is-open', open);
      if (menuBtn) menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    if (menuBtn) {
      menuBtn.addEventListener('click', function () {
        setMenu(!navbar.classList.contains('is-open'));
      });
    }
    navLinks.forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target)) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });

    // Links to sections of this page, paired with the section they point to.
    var spied = [];
    navLinks.forEach(function (a) {
      if (a.hash && a.pathname === location.pathname) {
        var el = document.getElementById(decodeURIComponent(a.hash.slice(1)));
        if (el) spied.push({ link: a, el: el });
      }
    });
    if (spied.length) {
      var ticking = false;
      var spy = function () {
        ticking = false;
        var line = navbar.offsetHeight + 24;
        var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
        var current = null;
        var best = -Infinity;
        // The lowest section whose heading has scrolled past the bar
        // (or the last section once the page is scrolled to the bottom).
        spied.forEach(function (s) {
          var top = s.el.getBoundingClientRect().top;
          if ((atBottom || top <= line) && top > best) { best = top; current = s; }
        });
        spied.forEach(function (s) { s.link.classList.toggle('active', s === current); });
      };
      window.addEventListener('scroll', function () {
        if (!ticking) { ticking = true; window.requestAnimationFrame(spy); }
      }, { passive: true });
      spy();
    }
  }

  // Click a publication or gallery image to zoom; click anywhere or press Esc to close.
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
