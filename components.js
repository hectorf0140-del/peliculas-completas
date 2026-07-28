function renderHeader(active) {
  const links = [
    { href: "index.html", label: "Inicio", key: "inicio" },
    { href: "peliculas.html", label: "Películas", key: "peliculas" },
    { href: "series.html", label: "Series", key: "series" },
    { href: "anime.html", label: "Anime", key: "anime" },
    { href: "generos.html", label: "Géneros", key: "generos" },
  ];
  const navHtml = links.map(l =>
    `<a href="${l.href}" class="navlink${active === l.key ? ' navlink--active' : ''}">${l.label}</a>`
  ).join("");

  document.getElementById("site-header").innerHTML = `
    <div class="wrap topbar__inner">
      <a href="index.html" class="logo">CARRETE</a>
      <nav class="nav">${navHtml}</nav>
      <div id="authArea" class="auth-area">
        <a id="loginBtn" class="login-btn" href="${CONFIG.LOGIN_BUTTON_URL}" target="_blank" rel="noopener">Iniciar sesión</a>
        <div id="userChip" class="user-chip hidden">
          <img id="userPic" alt="">
          <span id="userName"></span>
          <button id="logoutBtn" class="logout-btn">Salir</button>
        </div>
      </div>
    </div>
  `;
}

function renderFooter() {
  document.getElementById("site-footer").innerHTML =
    `<div class="wrap">Proyecto de demostración — datos de películas y series vía TMDB.</div>`;
}

function renderModals() {
  document.getElementById("modals").innerHTML = `
    <div id="authModalOverlay" class="modal-overlay hidden">
      <div class="modal">
        <button id="authModalClose" class="modal-close" aria-label="Cerrar">×</button>
        <span class="lock-badge">Contenido restringido</span>
        <h3>Antes de continuar</h3>
        <p id="authModalText">Iniciá sesión con tu cuenta de Google para continuar.</p>
        <a class="login-btn modal-login-btn" href="${CONFIG.LOGIN_BUTTON_URL}" target="_blank" rel="noopener">Iniciar sesión</a>
      </div>
    </div>
    <div id="movieModalOverlay" class="modal-overlay hidden">
      <div class="modal">
        <button id="movieModalClose" class="modal-close" aria-label="Cerrar">×</button>
        <div id="movieModalContent"></div>
      </div>
    </div>
  `;
  document.getElementById("movieModalClose").addEventListener("click",
    () => document.getElementById("movieModalOverlay").classList.add("hidden"));
  document.getElementById("movieModalOverlay").addEventListener("click", e => {
    if (e.target.id === "movieModalOverlay") e.target.classList.add("hidden");
  });
}
