(() => {
  const phone = "5551980130227"; // WhatsApp já utilizado no site do Coach Max.
  const messages = {
    geral: "Olá, Coach Max! Tenho interesse no Personal Training Presencial e gostaria de saber mais sobre o acompanhamento.",
    trimestral: "Olá, Coach Max! Tenho interesse no Plano Trimestral de Personal Training Presencial. Poderia me informar os valores e as condições de contratação?",
    bimestral: "Olá, Coach Max! Gostaria de conhecer os valores e as condições do Plano Bimestral de Personal Training Presencial.",
    mensal: "Olá, Coach Max! Tenho interesse no Plano Mensal de Personal Training Presencial. Poderia me informar os valores e como funciona a contratação?"
  };
  document.querySelectorAll("[data-wa]").forEach(link => {
    const key = link.dataset.wa || "geral";
    link.href = "https://wa.me/" + phone + "?text=" + encodeURIComponent(messages[key] || messages.geral);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
    }));
  }
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    items.forEach(item => observer.observe(item));
  } else items.forEach(item => item.classList.add("visible"));
})();