document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const statusBox = document.getElementById("loginStatus");

  if (!form || !statusBox) {
    return;
  }

  const redirectToAdmin = () => {
    window.location.href = "admin.html";
  };

  if (window.BossPackagePro && window.BossPackagePro.isLoggedIn()) {
    redirectToAdmin();
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email")?.value || "";
    const password = document.getElementById("password")?.value || "";

    statusBox.textContent = "Checking your credentials...";
    statusBox.style.color = "#2b3a4a";

    const demoResult = window.BossPackagePro.loginWithDemoCredentials(email, password);
    if (demoResult.ok) {
      statusBox.textContent = "Demo login successful. Redirecting...";
      statusBox.style.color = "#0b5f52";
      setTimeout(redirectToAdmin, 600);
      return;
    }

    const firebaseReady = window.BossPackagePro.isFirebaseReady();
    if (firebaseReady) {
      const firebaseResult = await window.BossPackagePro.loginWithFirebase(email, password);
      if (firebaseResult.ok) {
        statusBox.textContent = "Login successful. Redirecting...";
        statusBox.style.color = "#0b5f52";
        setTimeout(redirectToAdmin, 600);
        return;
      }

      statusBox.textContent = firebaseResult.message || "Unable to sign in.";
      statusBox.style.color = "#b42318";
      return;
    }

    statusBox.textContent = demoResult.message;
    statusBox.style.color = "#b42318";
  });
});
