# 🌐 Azura AI Web Search 🇲🇾

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge&logo=cloudflare)](https://azura-ai-web-search.pages.dev)
[![GitHub Repo](https://img.shields.io/badge/github-repo-blue?style=for-the-badge&logo=github)](https://github.com/Lilmoki91/Azura-Ai-Web-Search)
[![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)](LICENSE)

---

Azura AI Web Search adalah projek sumber terbuka carian web yang menggunakan teknologi AI untuk memperkayakan maklumat hasil carian. Ia menggunakan enjin DuckDuckGo®, Wikipedia API, dan model AI (Gemma-3-27B IT) untuk menjana jawapan pintar dalam satu antara muka moden dan responsif.

> **Nota:** Ini adalah platform **pendidikan & eksperimen** dibangunkan pelajar Malaysia, dibuka untuk komuniti meneroka dan menyumbang.

---

## ✨ Ciri-ciri Utama

| | |
|---|---|
| 🔍 **Carian Multi-Engine** | Gabungan DuckDuckGo® & Wikipedia dalam satu input |
| 🤖 **Jawapan AI** | Menjana ringkasan pintar menggunakan model AI opensource |
| 🎨 **Antara Muka Moden** | UI gelap, responsif, ikon FontAwesome, tema gradient |
| 📱 **PWA Sedia** | Boleh install macam app di telefon (manifest + service worker) |
| 🛡️ **Keselamatan** | Perlindungan XSS (input validator), had input dan corak dibenarkan |
| 🔄 **Kemas Kini Masa Nyata** | Loading animasi, butang reload, clear input pintar |
| 🌍 **Sokongan Bahasa** | _multi-bahasa UI_ (default: Melayu) |
| 👥 **Sumbangan Komuniti** | Kod terbuka untuk penambahbaikan bersama |

---

## 🚀 **Demo Langsung**

🔗 **https://azura-ai-web-search.pages.dev**

---

## 🧠 **Sistem Keselamatan Unik**

Azura AI menggunakan pendekatan keselamatan **3-lapisan** untuk melindungi API key:

```

┌─────────────────────────────────────┐
│  Lapisan 1: IPFS Storage            │
│  API key disimpan dalam IPFS        │
│  (Content Identifier: Qmb5ES6...)   │
├─────────────────────────────────────┤
│  Lapisan 2: AES-GCM Encryption      │
│  Data disulit dengan AES sebelum    │
│  dimuat naik ke IPFS                 │
├─────────────────────────────────────┤
│  Lapisan 3: Cloudflare Worker        │
│  Proxy permintaan ke Google AI       │
│  (elak CORS & IP blocking)           │
└─────────────────────────────────────┘

```

---

## 📁 **Struktur Projek**

```

📂 Azura-Ai-Web-Search/
├── 📄 index.html              # Halaman utama
├── 📄 manifest.json            # Konfigurasi PWA
├── 📄 sw.js                    # Service Worker
├── 🖼️ AZURA-LOGO.png           # Logo utama
├── 🖼️ AZURA-AI.webp            # Background image
├── 🖼️ icon-192.png             # Ikon PWA (192px)
├── 🖼️ icon-512.png             # Ikon PWA (512px)
├── 🖼️ icon-192-maskable.png    # Ikon maskable
├── 🖼️ icon-512-maskable.png    # Ikon maskable
├── 📄 README.md                 # Dokumentasi
└── 📄 LICENSE                   # Lesen MIT

```

---

## 🚀 Mula Pantas

#### 1. Klon Repo

```bash
git clone https://github.com/Lilmoki91/Azura-Ai-Web-Search.git
cd Azura-Ai-Web-Search
```

2. Guna Terus di Lokal

Hanya buka index.html dalam pelayar anda:

```bash
# Cara 1: Double click index.html
# Cara 2: Guna Live Server (VSCode)
# Cara 3: Python HTTP server
python -m http.server 8000
```

3. Deploy ke Cloudflare Pages (Recommended)

```bash
1. Buka https://dash.cloudflare.com
2. Klik Workers & Pages > Create application > Pages
3. Connect GitHub repo
4. Pilih repo Azura-Ai-Web-Search
5. Klik "Save and Deploy"
```

---

⚙️ Konfigurasi

Kunci API:
Sistem menggunakan IPFS + AES-GCM encryption untuk menyimpan API key. Tiada API key didedahkan dalam kod sumber.

```javascript
IPFS_CONFIG = {
    cid: "Qmb5ES6JihBKaeQ9yah39Vy7QXh1Ls6CuaHBzatE8ZBdHV",
    aesKey: "++YYOXRnKIuM69sJq6eTBm4g3yB+MKInltySJrGm9p0=",
    gateway: "https://gateway.pinata.cloud/ipfs/"
}
```

Modifikasi Engine Carian:
Anda boleh tambah atau ubah SEARCH_ENGINES dalam index.html.

---

📸 Screenshot

https://raw.githubusercontent.com/Lilmoki91/Azura-Ai-Web-Search/main/screenshot.png

---

👨‍💻 Cara Guna

1. Taip soalan/carian dalam kotak input.
2. Tekan butang Cari atau Enter.
3. Lihat hasil ringkasan AI dan sumber asal di panel Sources.
4. Guna ikon sidebar (☰) untuk menu, info pembangun, atau share link.
5. Di telefon, boleh install sebagai app (PWA).

---

💡 Sumbangan

Sumbangan sangat dialu-alukan!

· Isu / Bug: Buka issue jika jumpa pepijat atau mahu ciri baharu.
· PR: Fork repo, commit perubahan, dan buat Pull Request — semua sumbangan dialu-alukan.
· Diskusi: Guna menu Help & Q&A, atau hubungi pembangun di Telegram: [@johansetia](https://t.me/johansetia)

---

📜 Lesen

Projek ini di bawah MIT License.

---

❤️ Kredit & Terima kasih

· DuckDuckGo® API - Enjin carian utama
· Wikipedia REST API - Sumber kandungan pendidikan
· Google Generative Language (Gemma) - Model AI untuk ringkasan pintar
· Cloudflare - Hosting & Workers (proxy)
· IPFS & Pinata - Storage encrypted API key
· Font Awesome, JetBrains Mono, Inter Font - Tipografi & ikon
· Penyumbang & komuniti opensource - Sokongan tidak terhingga

---

👨‍💻 Pembangun

Zulkarnain Bin Suyitno
🎓 Pelajar, Sekolah Menengah Kebangsaan Rantau Panjang, Klang, Selangor
🌱 Usia: 16 tahun (2026)
📧 Khairuldinsuyitno@gmail.com
📱 Telegram: https://t.me/johansetia

---

🎖️ Pengiktirafan

Platform ini diiktiraf sebagai:

"🎀 Master of Ribbons Educational 2026 ✨"

Atas sumbangan dalam membangunkan teknologi AI untuk pendidikan Malaysia.

---

☕ Derma/Sumbangan

Platform ini dibangunkan secara persendirian dengan sumber terhad. Jika berminat untuk menyokong:

RHB Bank Malaysia
No. Akaun: ```16207200095095```

Tiada paksaan, setiap sumbangan ikhlas amat dihargai. Semoga hidup anda diberkahi dan dimurahkan rezeki.

---

Platform ini untuk pembelajaran & komuniti. Setiap sumbangan diterima dengan penuh penghargaan 🤗.

---

Jom #SumberTerbuka & hidupkan ekosistem AI Malaysia!

🇲🇾 Dibangunkan di Malaysia dengan ❤️ untuk pendidikan

🎀 Azura AI - Master of Ribbons Educational 2026 ✨
