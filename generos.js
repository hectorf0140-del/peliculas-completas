document.addEventListener("DOMContentLoaded", async () => {
  renderHeader("generos");
  renderFooter();
  renderModals();
  initAuth();

  try {
    const [movieG, tvG] = await Promise.all([tmdb("/genre/movie/list"), tmdb("/genre/tv/list")]);
    document.getElementById("movieGenres").innerHTML = movieG.genres.map(g =>
      `<a class="chip" href="peliculas.html?genero=${g.id}">${escapeHtml(g.name)}</a>`).join("");
    document.getElementById("tvGenres").innerHTML = tvG.genres.map(g =>
      `<a class="chip" href="series.html?genero=${g.id}">${escapeHtml(g.name)}</a>`).join("");
  } catch (err) {
    console.error(err);
  }
});
