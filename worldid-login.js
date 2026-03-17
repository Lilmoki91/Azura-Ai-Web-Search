// ==============================================
// 🌐 World ID Login untuk Azura AI (V2 - Fixed)
// ==============================================

// Konfigurasi World ID
const WORLD_ID_CONFIG = {
  app_id: "app_16b861659b5f66f3fc33d9d515a82f80",
  action: "azura_login", 
  signal: "azura_user"
};

// Debug mode - ON
const DEBUG = true;

function log(...args) {
  if (DEBUG) console.log("🔐 [WorldID]:", ...args);
}

// Tunggu IDKitWidget sedia
function waitForIDKit(timeout = 5000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    
    const check = () => {
      if (window.IDKitWidget) {
        log("✅ IDKitWidget sedia!");
        resolve(window.IDKitWidget);
      } else if (Date.now() - start > timeout) {
        reject(new Error("IDKitWidget tak dimuatkan"));
      } else {
        setTimeout(check, 100);
      }
    };
    
    check();
  });
}

// Simpan bukti login (improved)
function saveWorldID(proof) {
  log("✅ Proof diterima:", proof);
  
  try {
    // Simpan dengan timestamp
    const session = {
      verified: true,
      nullifier: proof.nullifier_hash,
      timestamp: Date.now(),
      expires: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 hari
    };
    
    localStorage.setItem("world_session", JSON.stringify(session));
    localStorage.setItem("world_verified", "true");
    localStorage.setItem("world_nullifier", proof.nullifier_hash);
    
    log("🔓 Data disimpan dalam localStorage");
    
    // Panggil showSearchUI dengan pelbagai cara
    if (typeof window.showSearchUI === "function") {
      log("✅ Memanggil window.showSearchUI()");
      window.showSearchUI();
    } 
    else if (typeof showSearchUI === "function") {
      log("✅ Memanggil showSearchUI() global");
      showSearchUI();
    }
    else {
      log("❌ Fungsi showSearchUI tak jumpa!");
      
      // Cubaan manual
      const searchSection = document.getElementById('searchSection');
      const loginSection = document.getElementById('loginSection');
      
      if (searchSection && loginSection) {
        log("🔄 Cubaan manual: tunjuk search section");
        loginSection.style.display = 'none';
        searchSection.style.display = 'block';
        
        // Buang container login kalau ada
        const container = document.getElementById('worldid-container');
        if (container) container.remove();
      }
    }
    
    // Berjaya!
    setTimeout(() => {
      alert("✅ World ID verified! Selamat datang ke Azura AI!");
    }, 100);
    
  } catch (e) {
    console.error("❌ Gagal simpan session:", e);
  }
}

// Periksa login status (improved)
function isWorldIDVerified() {
  try {
    // Check cara baru dulu
    const session = JSON.parse(localStorage.getItem("world_session") || "{}");
    
    if (session.verified) {
      // Check expiry
      if (session.expires && Date.now() > session.expires) {
        log("⏰ Session expired");
        localStorage.removeItem("world_session");
        localStorage.removeItem("world_verified");
        return false;
      }
      return true;
    }
    
    // Fallback ke cara lama
    return localStorage.getItem("world_verified") === "true";
  } catch (e) {
    return localStorage.getItem("world_verified") === "true";
  }
}

// Buat butang login (improved styling & positioning)
async function initWorldIDLogin() {
  log("📢 Initializing World ID login...");
  
  // Check jika dah login
  if (isWorldIDVerified()) {
    log("✅ User dah verified, trigger UI terus");
    if (typeof window.showSearchUI === "function") {
      window.showSearchUI();
    }
    return;
  }
  
  // Tunggu IDKit siap
  try {
    await waitForIDKit();
  } catch (e) {
    console.error("❌ IDKit tak siap:", e);
    alert("Gagal muatkan World ID SDK. Sila refresh halaman.");
    return;
  }
  
  // Buang container lama kalau ada
  const oldContainer = document.getElementById('worldid-container');
  if (oldContainer) oldContainer.remove();
  
  // Cipta container baru
  const container = document.createElement("div");
  container.id = "worldid-container";
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(5px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  // Kotak dialog
  const dialog = document.createElement("div");
  dialog.style.cssText = `
    background: linear-gradient(145deg, #1a1f2e, #0f1117);
    padding: 40px;
    border-radius: 20px;
    border: 2px solid #007AFF;
    box-shadow: 0 0 50px rgba(0,122,255,0.5);
    text-align: center;
    max-width: 400px;
    width: 90%;
    position: relative;
  `;

  // Title
  const title = document.createElement("h2");
  title.style.cssText = `
    color: white;
    margin-bottom: 20px;
    font-size: 24px;
  `;
  title.innerHTML = '🌐 <span style="color: #007AFF;">Azura AI</span> Login';
  dialog.appendChild(title);

  // Subtitle
  const subtitle = document.createElement("p");
  subtitle.style.cssText = `
    color: #94a3b8;
    margin-bottom: 30px;
    font-size: 14px;
  `;
  subtitle.textContent = "Sila sahkan dengan World ID untuk teruskan";
  dialog.appendChild(subtitle);

  // Butang login
  const btn = document.createElement("button");
  btn.innerText = "🔓 Login dengan World ID";
  btn.style.cssText = `
    padding: 15px 40px;
    font-size: 18px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;
    width: 100%;
  `;

  btn.onmouseover = () => {
    btn.style.transform = "scale(1.02)";
    btn.style.boxShadow = "0 0 20px #667eea";
  };
  
  btn.onmouseout = () => {
    btn.style.transform = "scale(1)";
    btn.style.boxShadow = "none";
  };

  btn.onclick = () => {
    log("🔑 Opening World ID widget...");
    
    try {
      const idkit = new window.IDKitWidget({
        app_id: WORLD_ID_CONFIG.app_id,
        action: WORLD_ID_CONFIG.action,
        signal: WORLD_ID_CONFIG.signal,
        onSuccess: (proof) => {
          log("✅ World ID success!");
          container.remove(); // Buang dialog
          saveWorldID(proof);
        },
        onError: (error) => {
          console.error("❌ World ID error:", error);
          alert("Ralat World ID: " + (error.message || "Sila cuba lagi"));
        }
      });
      idkit.open();
    } catch (e) {
      console.error("❌ Gagal buka IDKit:", e);
      alert("Gagal buka World ID. Pastikan sambungan internet OK.");
    }
  };

  dialog.appendChild(btn);
  
  // Butang tutup
  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "✕";
  closeBtn.style.cssText = `
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    color: #ff4444;
    font-size: 24px;
    cursor: pointer;
    padding: 5px 10px;
  `;
  closeBtn.onclick = () => container.remove();
  closeBtn.onmouseover = () => closeBtn.style.color = "#ff0000";
  closeBtn.onmouseout = () => closeBtn.style.color = "#ff4444";
  dialog.appendChild(closeBtn);

  container.appendChild(dialog);
  document.body.appendChild(container);
  
  log("✅ Butang World ID dipaparkan");
}

// Mulakan
log("🚀 World ID script dimulakan...");

if (!isWorldIDVerified()) {
  log("⏳ User belum login - menyediakan butang...");
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWorldIDLogin);
  } else {
    initWorldIDLogin();
  }
} else {
  log("✅ User sudah login - memanggil search UI...");
  if (typeof window.showSearchUI === "function") {
    window.showSearchUI();
  } else {
    log("❌ showSearchUI tak jumpa!");
  }
}
