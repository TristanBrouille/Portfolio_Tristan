(() => {
  // Thème clair / sombre
  const root = document.documentElement;
  document.getElementById("themeToggle").addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  });

  // Section en cours dans la navigation
  const links = [...document.querySelectorAll(".side__nav a")];
  const byId = Object.fromEntries(links.map(a => [a.hash.slice(1), a]));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(a => a.classList.remove("is-active"));
      byId[entry.target.id]?.classList.add("is-active");
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  document.querySelectorAll("main section[id]").forEach(s => observer.observe(s));

  // Filtres des projets
  const filters = [...document.querySelectorAll(".filter")];
  const cards = [...document.querySelectorAll("#cards .card")];
  filters.forEach(btn => btn.addEventListener("click", () => {
    filters.forEach(b => { b.classList.remove("is-on"); b.setAttribute("aria-pressed", "false"); });
    btn.classList.add("is-on");
    btn.setAttribute("aria-pressed", "true");
    const f = btn.dataset.filter;
    cards.forEach(c => { c.hidden = f !== "all" && !c.dataset.cat.split(" ").includes(f); });
  }));
})();
