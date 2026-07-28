let currentUser = JSON.parse(localStorage.getItem("carrete_user") || "null");
let pendingCallback = null;

function decodeJwt(token) {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
}

function handleCredentialResponse(response) {
  const payload = decodeJwt(response.credential);
  currentUser = { name: payload.name, picture: payload.picture, email: payload.email };
  localStorage.setItem("carrete_user", JSON.stringify(currentUser));
  updateAuthUI();
  closeAuthModal();
  if (pendingCallback) { const cb = pendingCallback; pendingCallback = null; cb(); }
}

function updateAuthUI() {
  const loginBtn = document.getElementById("loginBtn");
  if (!loginBtn) return;
  const chip = document.getElementById("userChip");
  if (currentUser) {
    loginBtn.classList.add("hidden");
    chip.classList.remove("hidden");
    document.getElementById("userPic").src = currentUser.picture;
    document.getElementById("userName").textContent = currentUser.name;
  } else {
    loginBtn.classList.remove("hidden");
    chip.classList.add("hidden");
  }
}

function openAuthModal(message, onSuccess) {
  pendingCallback = onSuccess || null;
  document.getElementById("authModalText").textContent = message;
  document.getElementById("authModalOverlay").classList.remove("hidden");
  document.getElementById("authModalGoogleBtn").innerHTML = "";
  google.accounts.id.renderButton(
    document.getElementById("authModalGoogleBtn"),
    { theme: "filled_black", size: "large", text: "signin_with" }
  );
}

function closeAuthModal() {
  document.getElementById("authModalOverlay").classList.add("hidden");
}

function requireLogin(onSuccess) {
  if (currentUser) { onSuccess(); return; }
  openAuthModal("Para reproducir este contenido, iniciá sesión con tu cuenta de Google.", onSuccess);
}

function logout() {
  currentUser = null;
  localStorage.removeItem("carrete_user");
  google.accounts.id.disableAutoSelect();
  updateAuthUI();
}

function initAuth() {
  google.accounts.id.initialize({ client_id: CONFIG.GOOGLE_CLIENT_ID, callback: handleCredentialResponse });
  updateAuthUI();
  document.getElementById("logoutBtn").addEventListener("click", logout);
  document.getElementById("authModalClose").addEventListener("click", closeAuthModal);
}
