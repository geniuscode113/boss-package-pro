document.addEventListener("DOMContentLoaded", () => {
  const currentYear = document.getElementById("currentYear");
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });
  }

  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get("name")?.toString().trim() || "Customer";

      formStatus.textContent = `Thank you, ${name}! Your request has been received. We will contact you shortly.`;
      formStatus.style.color = "#0b5f52";
      contactForm.reset();
    });
  }
});
