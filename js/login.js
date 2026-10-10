const DEMO_USER = {
  email: "admin@bosspackagepro.com",
  password: "admin123",
};

const isFirebaseReady = () => {
  const hasFirebase = typeof firebase !== "undefined" && firebase.apps && firebase.apps.length > 0;
  const configLooksSet = !!window.firebaseConfig && Object.values(window.firebaseConfig).some((value) => value && value !== "YOUR_API_KEY" && value !== "YOUR_PROJECT_ID");
  return hasFirebase && configLooksSet;
};

const loginWithDemoCredentials = (email, password) => {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const normalizedPassword = String(password || "");

  if (normalizedEmail === DEMO_USER.email && normalizedPassword === DEMO_USER.password) {
    localStorage.setItem("bossPackageProAdmin", JSON.stringify({ email: normalizedEmail, loggedIn: true, mode: "demo" }));
    return { ok: true, user: { email: normalizedEmail }, mode: "demo" };
  }

  return { ok: false, message: "Incorrect email or password." };
};

const loginWithFirebase = async (email, password) => {
  if (typeof firebase === "undefined" || !firebase.auth) {
    return { ok: false, message: "Firebase is not configured on this project yet." };
  }

  try {
    const auth = firebase.auth();
    const result = await auth.signInWithEmailAndPassword(email, password);
    localStorage.setItem("bossPackageProAdmin", JSON.stringify({ email: result.user.email, loggedIn: true, mode: "firebase" }));
    return { ok: true, user: result.user, mode: "firebase" };
  } catch (error) {
    return { ok: false, message: error.message || "Unable to sign in." };
  }
};

const logoutAdmin = async () => {
  localStorage.removeItem("bossPackageProAdmin");

  if (typeof firebase !== "undefined" && firebase.auth) {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.warn("Logout warning:", error.message || error);
    }
  }

  window.location.href = "login.html";
};

const getActiveAdminSession = () => {
  try {
    const raw = localStorage.getItem("bossPackageProAdmin");
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
};

const isLoggedIn = () => {
  const session = getActiveAdminSession();
  return !!session?.loggedIn;
};

window.BossPackagePro = {
  DEMO_USER,
  isFirebaseReady,
  loginWithDemoCredentials,
  loginWithFirebase,
  logoutAdmin,
  getActiveAdminSession,
  isLoggedIn,
};
