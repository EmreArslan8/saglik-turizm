(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const LANGS = ["tr", "en", "ar"];
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };

  const urlLang = new URLSearchParams(location.search).get("lang");
  let lang = LANGS.includes(urlLang) ? urlLang : store.get("lang");
  if (!LANGS.includes(lang)) {
    const nav = (navigator.language || "tr").slice(0, 2);
    lang = LANGS.includes(nav) ? nav : "tr";
  }

  const t = (k) => I18N[lang][k] ?? I18N.tr[k] ?? k;
  const L = (obj) => obj[lang] ?? obj.tr;
  const fmt = (n) => new Intl.NumberFormat(lang === "ar" ? "ar-EG" : lang).format(n);
  const money = (n) => "€" + fmt(n);

  // Stok görsel yüklenemezse markalı degrade yer tutucuya düş
  const FALLBACK_SRC = "data:image/svg+xml," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b6e6e"/><stop offset="1" stop-color="#7fd3ca"/></linearGradient></defs><rect width="400" height="300" fill="url(#g)"/><path d="M185 115h30v30h30v30h-30v30h-30v-30h-30v-30h30z" fill="#fff" opacity=".35"/></svg>'
  );
  document.addEventListener("error", (e) => {
    const img = e.target;
    if (img.tagName === "IMG" && img.src !== FALLBACK_SRC) img.src = FALLBACK_SRC;
  }, true);
  const imgFallback = (img) => { if (img.complete && img.src && !img.naturalWidth) img.src = FALLBACK_SRC; };

  const waLink = (treatmentName) => {
    const text = t("wa.msg").replace("{t}", treatmentName || t("wa.default"));
    return `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  function renderStatic() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    $$("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
    $$("[data-i18n-html]").forEach((el) => (el.innerHTML = t(el.dataset.i18nHtml)));
    $$("[data-i18n-ph]").forEach((el) => (el.placeholder = t(el.dataset.i18nPh)));
    $$(".lang button").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
    $$(".js-wa").forEach((a) => { a.href = waLink(); a.target = "_blank"; a.rel = "noopener"; });

    $("#ctPhone").textContent = CLINIC.phone;
    $("#ctPhone").href = "tel:" + CLINIC.phone.replace(/\s/g, "");
    $("#ctMail").textContent = CLINIC.email;
    $("#ctMail").href = "mailto:" + CLINIC.email;
    $("#ctAddr").textContent = L(CLINIC.address);
    $$("[data-count][data-done]").forEach((el) => (el.textContent = fmt(+el.dataset.count)));
  }

  function renderTreatments() {
    $("#treatmentGrid").innerHTML = TREATMENTS.map((x) => `
      <article class="card tcard">
        <div class="tcard__img"><img loading="lazy" src="${x.img}" alt="${L(x.name)}"><span class="tcard__icon">${x.icon}</span></div>
        <div class="tcard__body">
          <h3>${L(x.name)}</h3>
          <p>${L(x.desc)}</p>
          <dl class="tcard__meta">
            <div><dt>${t("tr.stay")}</dt><dd>${fmt(x.days)} ${t("tr.days")}</dd></div>
            <div><dt>${t("tr.hospital")}</dt><dd>${x.stay ? fmt(x.stay) + " " + t("tr.night") : t("tr.none")}</dd></div>
          </dl>
          <div class="tcard__foot">
            <div class="price"><small>${t("tr.from")}</small>${money(x.price)}</div>
            <a class="btn btn--wa btn--sm" target="_blank" rel="noopener" href="${waLink(L(x.name))}"><svg class="ico"><use href="#wa"/></svg>${t("tr.ask")}</a>
          </div>
        </div>
      </article>`).join("");

    const opts = `<option value="">${t("form.select")}</option>` +
      TREATMENTS.map((x) => `<option value="${x.id}">${L(x.name)}</option>`).join("");
    $$(".js-treatment-select").forEach((s) => {
      const v = s.value;
      s.innerHTML = opts.replace(t("form.select"), s.closest("#quickForm") ? t("quick.treatment") : t("form.select"));
      s.value = v;
    });
  }

  function renderPackages() {
    $("#packageGrid").innerHTML = PACKAGES.map((p) => `
      <article class="card pkg ${p.featured ? "pkg--featured" : ""}">
        ${p.featured ? `<span class="pkg__tag">${t("pk.popular")}</span>` : ""}
        <h3>${L(p.name)}</h3>
        <div class="pkg__price">${money(p.price)}<small>${t("tr.from")}</small></div>
        <ul>${L(p.items).map((i) => `<li>${i}</li>`).join("")}</ul>
        <a href="#appointment" class="btn ${p.featured ? "btn--primary" : "btn--outline"} btn--block">${t("pk.choose")}</a>
      </article>`).join("");
  }

  function renderDoctors() {
    $("#doctorGrid").innerHTML = DOCTORS.map((d) => `
      <article class="card doc">
        <img loading="lazy" src="${d.img}" alt="${d.name}">
        <div class="doc__body"><h4>${d.name}</h4><p>${L(d.title)}</p><small>${fmt(d.exp)} ${t("dr.exp")}</small></div>
      </article>`).join("");
  }

  function renderReviews() {
    const tName = (id) => L(TREATMENTS.find((x) => x.id === id).name);
    $("#reviewGrid").innerHTML = TESTIMONIALS.map((r) => `
      <figure class="card review">
        <div class="stars">${"★".repeat(r.rating)}</div>
        <blockquote>“${L(r.text)}”</blockquote>
        <figcaption><span class="flag">${r.flag}</span><b>${r.name}</b><small>${tName(r.treatment)}</small></figcaption>
      </figure>`).join("");
  }

  function renderFaq() {
    $("#faqList").innerHTML = FAQ.map((f, i) => `
      <details ${i === 0 ? "open" : ""}><summary>${L(f.q)}</summary><p>${L(f.a)}</p></details>`).join("");
  }

  function renderAll() {
    renderStatic();
    renderTreatments();
    renderPackages();
    renderDoctors();
    renderReviews();
    renderFaq();
    $$("img").forEach(imgFallback);
  }

  // --- Etkileşimler ---
  $$(".lang button").forEach((b) => b.addEventListener("click", () => {
    lang = b.dataset.lang;
    store.set("lang", lang);
    renderAll();
  }));

  $("#burger").addEventListener("click", () => document.body.classList.toggle("nav-open"));
  $$("#nav a").forEach((a) => a.addEventListener("click", () => document.body.classList.remove("nav-open")));

  const modal = $("#okModal");
  const openModal = (treatmentId) => {
    const tr = TREATMENTS.find((x) => x.id === treatmentId);
    $("#okWa").href = waLink(tr && L(tr.name));
    $("#okWa").target = "_blank";
    modal.hidden = false;
  };
  $("#okClose").addEventListener("click", () => (modal.hidden = true));
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.hidden = true; });

  const saveLead = (data) => {
    const leads = JSON.parse(store.get("demoLeads") || "[]");
    leads.push({ ...data, lang, at: new Date().toISOString() });
    store.set("demoLeads", JSON.stringify(leads));
    console.info("[demo] lead kaydedildi:", data);
  };

  $("#quickForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    if (!f.checkValidity()) { f.reportValidity(); return; }
    const data = Object.fromEntries(new FormData(f));
    saveLead({ source: "hero", ...data });
    openModal(data.treatment);
    f.reset();
  });

  $("#apptForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    const ok = f.checkValidity();
    $("#formErr").hidden = ok;
    $$("[required]", f).forEach((el) => el.classList.toggle("invalid", !el.checkValidity()));
    if (!ok) return;
    const data = Object.fromEntries(new FormData(f));
    saveLead({ source: "appointment", ...data });
    openModal(data.treatment);
    f.reset();
  });

  // Sayaç animasyonu
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    const el = en.target, end = +el.dataset.count, t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / 1200);
      el.textContent = fmt(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step); else el.dataset.done = "1";
    };
    requestAnimationFrame(step);
    io.unobserve(el);
  }), { threshold: 0.4 });
  $$("[data-count]").forEach((el) => io.observe(el));

  // Görseller
  $("#heroImg").src = HERO_IMG;
  $("#aboutImg").src = ABOUT_IMG;
  $("#year").textContent = new Date().getFullYear();
  const d = $('#apptForm [name="date"]');
  d.min = new Date().toISOString().slice(0, 10);

  renderAll();
})();
