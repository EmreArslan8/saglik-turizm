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
  const icon = (name, cls = "i") => `<svg class="${cls}"><use href="#${name.startsWith("wa") ? name : "i-" + name}"/></svg>`;

  // Stok görsel yüklenemezse markalı yer tutucu
  const FALLBACK_SRC = "data:image/svg+xml," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#16463b"/><stop offset="1" stop-color="#8fb8a4"/></linearGradient></defs><rect width="400" height="300" fill="url(#g)"/><path d="M188 122h24v24h24v24h-24v24h-24v-24h-24v-24h24z" fill="#fff" opacity=".22"/></svg>'
  );
  document.addEventListener("error", (e) => {
    const img = e.target;
    if (img.tagName === "IMG" && img.src !== FALLBACK_SRC) img.src = FALLBACK_SRC;
  }, true);

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

    const tel = "tel:" + CLINIC.phone.replace(/\s/g, "");
    $("#ctPhone").textContent = CLINIC.phone;
    $("#ctPhone").href = tel;
    $("#mbarCall").href = tel;
    $("#ctMail").textContent = CLINIC.email;
    $("#ctMail").href = "mailto:" + CLINIC.email;
    $("#ctAddr").textContent = L(CLINIC.address);
    $("#scoreStars").innerHTML = icon("star").repeat(5);
  }

  function renderMarquee() {
    const cities = ["London", "Berlin", "Riyadh", "Dubai", "Amsterdam", "Paris", "Doha", "Stockholm", "Kuwait", "Zürich", "Dublin", "Manama", "Oslo", "Brussels"];
    const row = cities.map((c) => `<span>${c}</span><i></i>`).join("");
    $("#mqRow").innerHTML = row + row;
  }

  function renderTreatments() {
    $("#treatmentGrid").innerHTML = TREATMENTS.map((x, i) => `
      <article class="tc ${i === 0 ? "tc--hero" : ""}">
        <figure class="tc__img"><img loading="lazy" src="${x.img}" alt="${L(x.name)}"></figure>
        <div class="tc__body">
          <div class="tc__top">
            <span class="tc__ico">${icon(x.icon)}</span>
            <a class="tc__go" href="${waLink(L(x.name))}" target="_blank" rel="noopener" aria-label="${t("tr.ask")}">${icon("arrow-up-right")}</a>
          </div>
          <h3>${L(x.name)}</h3>
          <p>${L(x.desc)}</p>
          <ul class="tc__meta">
            <li>${icon("calendar-days")}${fmt(x.days)} ${t("tr.days")}</li>
            <li>${icon("bed-double")}${x.stay ? fmt(x.stay) + " " + t("tr.night") : t("tr.none")}</li>
          </ul>
          <div class="tc__price"><small>${t("tr.from")}</small><b>${money(x.price)}</b></div>
        </div>
      </article>`).join("") + `
      <article class="tc tc--cta">
        <span class="tc__ico">${icon("message-circle")}</span>
        <h3>${t("tr.ctaT")}</h3>
        <p>${t("tr.ctaD")}</p>
        <a class="btn btn--lime btn--block" href="${waLink()}" target="_blank" rel="noopener">${icon("wa")}${t("hero.cta2")}</a>
      </article>`;

    $$(".js-treatment-select").forEach((s) => {
      const v = s.value;
      const first = s.closest("#quickForm") ? t("quick.treatment") : t("form.select");
      s.innerHTML = `<option value="">${first}</option>` +
        TREATMENTS.map((x) => `<option value="${x.id}">${L(x.name)}</option>`).join("");
      s.value = v;
    });
  }

  function renderPackages() {
    $("#packageGrid").innerHTML = PACKAGES.map((p) => `
      <article class="pk ${p.featured ? "pk--featured" : ""}">
        <div class="pk__head">
          <h3>${L(p.name)}</h3>
          ${p.featured ? `<span class="pk__tag">${icon("sparkles")}${t("pk.popular")}</span>` : ""}
        </div>
        <div class="pk__price"><small>${t("tr.from")}</small><b>${money(p.price)}</b></div>
        <ul>${L(p.items).map((i) => `<li>${icon("check")}${i}</li>`).join("")}</ul>
        <a href="#appointment" class="btn ${p.featured ? "btn--lime" : "btn--line"} btn--block">${t("pk.choose")}${icon("arrow-right")}</a>
      </article>`).join("");
  }

  function renderDoctors() {
    $("#doctorGrid").innerHTML = DOCTORS.map((d) => `
      <article class="doc">
        <figure><img loading="lazy" src="${d.img}" alt="${d.name}"></figure>
        <div class="doc__body">
          <h4>${d.name}</h4>
          <p>${L(d.title)}</p>
          <span class="doc__exp">${icon("award")}${fmt(d.exp)} ${t("dr.exp")}</span>
        </div>
      </article>`).join("");
  }

  function renderReviews() {
    const tName = (id) => L(TREATMENTS.find((x) => x.id === id).name);
    $("#reviewGrid").innerHTML = TESTIMONIALS.map((r, i) => `
      <figure class="rc ${i === 0 ? "rc--big" : ""}">
        ${icon("quote", "i rc__q")}
        <blockquote>${L(r.text)}</blockquote>
        <figcaption>
          <span class="rc__av">${r.name.split(" ").map((s) => s[0]).join("")}</span>
          <div><b>${r.name} <span class="flag">${r.flag}</span></b><small>${tName(r.treatment)}</small></div>
          <span class="rc__stars">${icon("star").repeat(r.rating)}</span>
        </figcaption>
      </figure>`).join("");
  }

  function renderFaq() {
    $("#faqList").innerHTML = FAQ.map((f, i) => `
      <details ${i === 0 ? "open" : ""}>
        <summary><span>${L(f.q)}</span>${icon("plus")}</summary>
        <p>${L(f.a)}</p>
      </details>`).join("");
  }

  function renderAll() {
    renderStatic();
    renderMarquee();
    renderTreatments();
    renderPackages();
    renderDoctors();
    renderReviews();
    renderFaq();
  }

  // --- Etkileşimler ---
  $$(".lang button").forEach((b) => b.addEventListener("click", () => {
    lang = b.dataset.lang;
    store.set("lang", lang);
    renderAll();
  }));

  const burger = $("#burger");
  const setNav = (open) => {
    document.body.classList.toggle("nav-open", open);
    burger.setAttribute("aria-expanded", open);
  };
  burger.addEventListener("click", () => setNav(!document.body.classList.contains("nav-open")));
  $$("#nav a").forEach((a) => a.addEventListener("click", () => setNav(false)));

  // Kaydırınca header küçülsün
  const onScroll = () => document.body.classList.toggle("scrolled", scrollY > 20);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const modal = $("#okModal");
  const openModal = (treatmentId) => {
    const tr = TREATMENTS.find((x) => x.id === treatmentId);
    $("#okWa").href = waLink(tr && L(tr.name));
    $("#okWa").target = "_blank";
    modal.hidden = false;
  };
  $("#okClose").addEventListener("click", () => (modal.hidden = true));
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.hidden = true; });
  addEventListener("keydown", (e) => { if (e.key === "Escape") { modal.hidden = true; setNav(false); } });

  const saveLead = (data) => {
    let leads = [];
    try { leads = JSON.parse(store.get("demoLeads") || "[]"); } catch {}
    leads.push({ ...data, lang, at: new Date().toISOString() });
    store.set("demoLeads", JSON.stringify(leads));
    console.info("[demo] lead kaydedildi:", data);
  };

  const handle = (form, source, showErr) => (e) => {
    e.preventDefault();
    const ok = form.checkValidity();
    $$("[required]", form).forEach((el) => el.classList.toggle("invalid", !el.checkValidity()));
    if (showErr) $("#formErr").hidden = ok;
    if (!ok) { if (!showErr) form.reportValidity(); return; }
    const data = Object.fromEntries(new FormData(form));
    saveLead({ source, ...data });
    openModal(data.treatment);
    form.reset();
  };
  $("#quickForm").addEventListener("submit", handle($("#quickForm"), "hero", false));
  $("#apptForm").addEventListener("submit", handle($("#apptForm"), "appointment", true));

  // Görünür olunca yumuşak giriş animasyonu
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  const observeReveal = () => $$(".sec__head, .tc, .pk, .doc, .rc, .why__list li, .timeline li, .appt").forEach((el) => {
    if (!el.classList.contains("in")) { el.classList.add("rv-up"); io.observe(el); }
  });

  $("#heroImg").src = HERO_IMG;
  $("#heroImg2").src = HERO_IMG2;
  $("#cityImg").src = CITY_IMG;
  $("#year").textContent = new Date().getFullYear();
  $('#apptForm [name="date"]').min = new Date().toISOString().slice(0, 10);

  renderAll();
  observeReveal();
  $$(".lang button").forEach((b) => b.addEventListener("click", observeReveal));
})();
