/* ═══════════════════════════════════════════════════════════════
   D. BALAKRISHNA PORTAL – SHARED NAVIGATION
   nav.js  ·  Version 1.0

   PURPOSE:
   Builds and injects the nav-panel and nav-drawer into every page.
   To add, remove, or rename a nav item — edit NAV_LINKS below only.
   All pages update automatically.
   ═══════════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────────────────────────
   J.01.00 – NAV LINK DEFINITIONS
   To add a page: add one entry { href, label }
   To rename:     change the label value
   To reorder:    move the entry up or down
   ───────────────────────────────────────────────────────────── */

var NAV_LINKS = [
  { href: 'index.html',         label: 'Home'            },
  { href: 'artist.html',        label: 'Artist'          },
  { href: 'about.html',         label: 'About'           },
  { href: 'lineage.html',       label: 'Lineage'         },
  { href: 'international.html', label: 'International'   },
  { href: 'media.html',         label: 'Media'           },
  { href: 'mysore-bani.html',   label: 'Mysore B\u0101\u1e47i'  },
  { href: 'vainika-voice.html', label: 'Vainika\u2019s Voice'   },
  { href: 'awards.html',        label: 'Awards'          },
  { href: 'gallery.html',       label: 'Gallery'         },
  { href: 'contact.html',       label: 'Contact'         }
];


/* ─────────────────────────────────────────────────────────────
   J.01.01 – DETECT CURRENT PAGE
   Reads the filename from the URL path.
   Returns empty string on root / index access.
   ───────────────────────────────────────────────────────────── */

function getCurrentPage() {
  var path     = window.location.pathname;
  var segments = path.split('/');
  var filename = segments[segments.length - 1];
  if (filename === '' || filename === '/') {
    return 'index.html';
  }
  return filename;
}


/* ─────────────────────────────────────────────────────────────
   J.01.02 – BUILD NAV PANEL HTML
   Constructs the fixed top nav bar with logo, links, hamburger.
   ───────────────────────────────────────────────────────────── */

function buildNavPanel(currentPage) {

  var linksHTML = '';

  for (var i = 0; i < NAV_LINKS.length; i++) {
    var item        = NAV_LINKS[i];
    var activeClass = (item.href === currentPage) ? ' class="active"' : '';
    linksHTML += '    <a href="' + item.href + '"' + activeClass + '>' + item.label + '</a>\n';
  }

  var panelHTML =
    '\n<!-- ═══════════════════════════════════════════════════════════════\n' +
    '     H.00.00 – NAVIGATION PANEL  (injected by nav.js)\n' +
    '     ═══════════════════════════════════════════════════════════ -->\n\n' +
    '<div class="nav-panel">\n' +
    '  <div class="nav-logo">\n' +
    '    <img src="images/logo-db.png" alt="D. Balakrishna">\n' +
    '  </div>\n' +
    '  <div class="nav-links">\n' +
    linksHTML +
    '  </div>\n' +
    '  <button class="nav-hamburger" id="navHamburger" aria-label="Open menu">\n' +
    '    <div class="nav-hamburger-icon">\n' +
    '      <span></span>\n' +
    '      <span></span>\n' +
    '      <span></span>\n' +
    '    </div>\n' +
    '  </button>\n' +
    '</div>\n';

  return panelHTML;
}


/* ─────────────────────────────────────────────────────────────
   J.01.03 – BUILD NAV DRAWER HTML
   Constructs the mobile slide-down drawer.
   ───────────────────────────────────────────────────────────── */

function buildNavDrawer(currentPage) {

  var linksHTML = '';

  for (var i = 0; i < NAV_LINKS.length; i++) {
    var item        = NAV_LINKS[i];
    var activeClass = (item.href === currentPage) ? ' class="active"' : '';
    linksHTML += '  <a href="' + item.href + '"' + activeClass + '>' + item.label + '</a>\n';
  }

  var drawerHTML =
    '\n<!-- ═══════════════════════════════════════════════════════════════\n' +
    '     H.00.01 – NAV DRAWER  (injected by nav.js)\n' +
    '     ═══════════════════════════════════════════════════════════ -->\n\n' +
    '<nav class="nav-drawer" id="navDrawer">\n' +
    linksHTML +
    '</nav>\n';

  return drawerHTML;
}


/* ─────────────────────────────────────────────────────────────
   J.01.04 – INJECT NAV INTO PAGE
   Inserts panel and drawer at the very start of <body>.
   ───────────────────────────────────────────────────────────── */

function injectNav() {

  var currentPage = getCurrentPage();
  var panelHTML   = buildNavPanel(currentPage);
  var drawerHTML  = buildNavDrawer(currentPage);
  var combined    = panelHTML + drawerHTML;

  var placeholder = document.getElementById('nav-placeholder');

  if (placeholder) {
    placeholder.outerHTML = combined;
  } else {
    document.body.insertAdjacentHTML('afterbegin', combined);
  }

}


/* ─────────────────────────────────────────────────────────────
   J.01.05 – HAMBURGER TOGGLE
   Opens and closes the mobile drawer.
   Closes on outside click and Escape key.
   ───────────────────────────────────────────────────────────── */

function initHamburger() {

  var btn    = document.getElementById('navHamburger');
  var drawer = document.getElementById('navDrawer');

  if (!btn || !drawer) { return; }

  /* Toggle open/closed on button click */
  btn.addEventListener('click', function () {
    var isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
    } else {
      drawer.classList.add('open');
    }
  });

  /* Close when clicking anywhere outside nav */
  document.addEventListener('click', function (e) {
    if (!btn.contains(e.target) && !drawer.contains(e.target)) {
      drawer.classList.remove('open');
    }
  });

  /* Close on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      drawer.classList.remove('open');
    }
  });

}


/* ─────────────────────────────────────────────────────────────
   J.01.06 – INITIALISE ON DOM READY
   ───────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', function () {
  injectNav();
  initHamburger();
});
