const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav");

menu?.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("open"));
});

document.querySelector("#whatsappForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = document.querySelector("#message").value.trim();
  if (!message) return;

  // India country code +91; the number was provided by the portfolio owner.
  const phone = "919274213780";
  const text = encodeURIComponent(message);
  window.open(`https://wa.me/${phone}?text=${text}`, "_blank", "noopener");
});
