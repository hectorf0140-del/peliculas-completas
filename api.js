const TMDB_BASE = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w342";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w780";

async function tmdb(path, params = {}) {
  const qs = new URLSearchParams({ api_key: CONFIG.TMDB_API_KEY, language: "es-ES", ...params });
  const res = await fetch(`${TMDB_BASE}${path}?${qs}`);
  if (!res.ok) throw new Error("TMDB " + res.status);
  return res.json();
}

function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str || "";
  return d.innerHTML;
}
