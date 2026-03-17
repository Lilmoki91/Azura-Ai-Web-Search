// Konfigurasi World ID
const WORLD_ID_APP_ID = "app_16b861659b5f66f3fc33d9d515a82f80";
const WORLD_ID_ACTION = "azura_login";
const WORLD_ID_SIGNAL = "azura_user";

// Simpan bukti login
function saveWorldID(proof) {
  localStorage.setItem("world_verified", "true");
  localStorage.setItem("world_nullifier", proof.nullifier_hash);

  // Trigger search engine Azura AI
  if (typeof window.showSearchUI === "function") {
    window.showSearchUI();
  }
}

// Periksa jika user sudah verify
function isWorldIDVerified() {
  return localStorage.getItem("world_verified") === "true";
}

// Buat butang login
function initWorldIDLogin() {
  const container = document.createElement("div");
  container.style.textAlign = "center";
  container.style.marginTop = "30px";

  const btn = document.createElement("button");
  btn.innerText = "Login dengan World ID";
  btn.style.padding = "12px 24px";
  btn.style.fontSize = "16px";
  btn.style.borderRadius = "8px";
  btn.style.cursor = "pointer";

  btn.onclick = () => {
    const idkit = new window.IDKitWidget({
      app_id: WORLD_ID_APP_ID,
      action: WORLD_ID_ACTION,
      signal: WORLD_ID_SIGNAL,
      onSuccess: saveWorldID,
      onError: (err) => alert("Verification error: " + err)
    });
    idkit.open();
  };

  container.appendChild(btn);
  document.body.prepend(container); // letak di atas page
}

// Mulakan login jika belum verify
if (!isWorldIDVerified()) {
  initWorldIDLogin();
} else {
  // Kalau sudah login, trigger search UI platform
  if (typeof window.showSearchUI === "function") {
    window.showSearchUI();
  }
}
