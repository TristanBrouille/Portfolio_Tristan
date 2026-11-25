// Met en évidence la section en cours dans la navigation latérale.
(() => {
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
})();
