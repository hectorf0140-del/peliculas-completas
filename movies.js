function cardHtml(item, type) {
  const title = item.title || item.name;
  const year = (item.release_date || item.first_air_date || "").slice(0, 4) || "—";
  const poster = item.poster_path
    ? IMG_BASE + item.poster_path
    : "https://placehold.co/342x513/16161C/8A8790?text=Sin+imagen";
  return `<article class="card" data-id="${item.id}" data-type="${type}">
    <div class="card__glow"></div>
    <img loading="lazy" src="${poster}" alt="${escapeHtml(title)}">
    <div class="card__meta">
      <p class="card__title">${escapeHtml(title)}</p>
      <p class="card__year">${year}</p>
    </div>
  </article>`;
}

function attachCardClicks(container, itemsMap, selector = ".card") {
  container.querySelectorAll(selector).forEach(el => {
    el.addEventListener("click", () => {
      const item = itemsMap[el.dataset.id];
      openMovieModal(item, el.dataset.type);
    });
  });
}

function openMovieModal(item, type) {
  requireLogin();
}
