// =========================================================
// Portfolio Tristan Dhersin — script.js
// =========================================================

(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // ---------- Thème clair / sombre ----------
  const root = document.documentElement;
  const storedTheme = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  root.dataset.theme = storedTheme || (prefersLight ? "light" : "dark");

  $("#themeToggle").addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch { /* ignore */ }
  });

  // ---------- Menu mobile ----------
  const burger = $("#burger");
  const navLinks = $("#navLinks");
  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });
  $$("#navLinks a").forEach(a => a.addEventListener("click", () => {
    burger.classList.remove("open");
    navLinks.classList.remove("open");
  }));

  // ---------- Barre de progression + nav au scroll ----------
  const nav = $("#nav");
  const progress = $("#progress");
  const onScroll = () => {
    const h = document.documentElement;
    const ratio = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    progress.style.width = `${ratio * 100}%`;
    nav.classList.toggle("scrolled", h.scrollTop > 30);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- Lien actif dans la nav ----------
  const sections = $$("main section[id]");
  const linkFor = id => $(`#navLinks a[href="#${id}"]`);
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        $$("#navLinks a").forEach(a => a.classList.remove("active"));
        linkFor(e.target.id)?.classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(s => spy.observe(s));

  // ---------- Apparition au scroll ----------
  const revealer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach(el => revealer.observe(el));

  // ---------- Compteurs animés ----------
  const counters = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || "";
      const start = performance.now();
      const dur = 1400;
      const tick = now => {
        const p = Math.min((now - start) / dur, 1);
        const val = Math.round(target * (1 - Math.pow(1 - p, 3)));
        el.textContent = val.toLocaleString("fr-FR") + (p === 1 ? suffix : "");
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counters.unobserve(el);
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach(el => counters.observe(el));

  // ---------- Effet machine à écrire ----------
  const roles = [
    "Ingénieur développeur web full-stack",
    "Java / Spring Boot & Angular",
    "3D temps réel avec Three.js",
    "Architecture DDD & sécurité",
    "DevOps : Docker, CI/CD, Nginx",
  ];
  const typed = $("#typed");
  let r = 0, i = roles[0].length, deleting = true;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const type = () => {
    const word = roles[r];
    typed.textContent = word.slice(0, i);
    let delay = deleting ? 35 : 70;
    if (!deleting && i === word.length) { deleting = true; delay = 2200; }
    else if (deleting && i === 0) { deleting = false; r = (r + 1) % roles.length; delay = 300; }
    i += deleting ? -1 : 1;
    setTimeout(type, delay);
  };
  if (!reduce) setTimeout(type, 2500);

  // ---------- Onglets parcours ----------
  $$(".tab").forEach(tab => tab.addEventListener("click", () => {
    $$(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    $$("[data-panel]").forEach(p => p.classList.toggle("hidden", p.dataset.panel !== tab.dataset.tab));
    $$(`[data-panel="${tab.dataset.tab}"] .reveal`).forEach(el => el.classList.add("visible"));
  }));

  // ---------- Filtres projets ----------
  $$(".filter").forEach(btn => btn.addEventListener("click", () => {
    $$(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    $$("#projectGrid .project").forEach(p => {
      const show = f === "all" || p.dataset.cat.split(" ").includes(f);
      p.classList.toggle("hide", !show);
      if (show) p.classList.add("visible");
    });
  }));

  // ---------- Barres de langues ----------
  const langs = $(".langs");
  new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) { langs.classList.add("visible"); obs.disconnect(); }
  }, { threshold: 0.4 }).observe(langs);

  // ---------- Copier l'e-mail ----------
  const toast = $("#toast");
  $("#copyMail").addEventListener("click", async e => {
    try {
      await navigator.clipboard.writeText(e.currentTarget.dataset.mail);
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1800);
    } catch {
      window.location.href = `mailto:${e.currentTarget.dataset.mail}`;
    }
  });

  // ---------- Année du footer ----------
  $("#year").textContent = new Date().getFullYear();
})();
