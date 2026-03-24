# 🌐 Azura AI Web Search 🇲🇾

<p align="center">
  <img src="https://raw.githubusercontent.com/Lilmoki91/Azura-Ai-Web-Search/refs/heads/main/Azura-Ai-Wallpaper.png" alt="Azura AI Web Search Banner" width="100%" style="border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);"/>
</p>

<p align="center">
  <a href="https://azura-ai-web-search.pages.dev">
    <img src="https://img.shields.io/badge/🚀_Demo_Langsung-Cuba_Sekarang-8A2BE2?style=for-the-badge&logo=cloudflare" alt="Live Demo"/>
  </a>
  <a href="https://github.com/Lilmoki91/Azura-Ai-Web-Search">
    <img src="https://img.shields.io/badge/GitHub-Repo-black?style=for-the-badge&logo=github" alt="GitHub Repo"/>
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/Lesen-MIT-green?style=for-the-badge" alt="MIT License"/>
  </a>
  <a href="https://t.me/johansetia">
    <img src="https://img.shields.io/badge/Telegram-Hubungi-blue?style=for-the-badge&logo=telegram" alt="Telegram"/>
  </a>
</p>

<div align="center">
  <h3>🤖 Enjin Carian Pintar dengan AI • Dibangunkan di Malaysia 🇲🇾</h3>
  <p><i>"Meneroka ilmu dengan teknologi terkini - sumber terbuka untuk semua"</i></p>
</div>

---

## 📋 Senarai Kandungan

- [Tentang Projek](#-tentang-projek)
- [Ciri-ciri Utama](#-ciri-ciri-utama)
- [Demo Langsung](#-demo-langsung)
- [Sistem Keselamatan](#-sistem-keselamatan-unik)
- [Struktur Projek](#-struktur-projek)
- [Mula Pantas](#-mula-pantas)
- [Konfigurasi](#-konfigurasi)
- [Cara Guna](#-cara-guna)
- [Tangkapan Skrin](#-tangkapan-skrin)
- [Sumbangan](#-sumbangan)
- [Kredit](#-kredit--penghargaan)
- [Pembangun](#-pembangun)
- [Pengiktirafan](#-pengiktirafan)
- [Derma / Sokongan](#-derma--sumbangan)
- [Lesen](#-lesen)

---

## 📖 Tentang Projek

**Azura AI Web Search** adalah projek sumber terbuka (open-source) yang menggabungkan enjin carian web dengan teknologi AI untuk memberikan pengalaman mencari maklumat yang lebih pintar dan bermakna.

> 🎯 **Objektif**: Menyediakan platform carian pendidikan yang memanfaatkan AI untuk merumuskan maklumat dari pelbagai sumber, memudahkan pembelajaran dan penyelidikan.

Dibangunkan oleh **pelajar Malaysia berusia 16 tahun** sebagai projek pembelajaran dan sumbangan kepada komuniti teknologi tempatan.

### Teknologi Utama:

• 🔍 **DuckDuckGo® API** - Enjin carian utama

• 📚 **Wikipedia REST API** - Sumber kandungan pendidikan

• 🧠 **Gemma-3-27B IT** - Model AI Google untuk ringkasan pintar

• ☁️ **Cloudflare** - Hosting & proxy workers

• 🔒 **IPFS + AES-GCM** - Penyimpanan API key yang selamat

---

## ✨ Ciri-ciri Utama

| | Kategori | Penerangan |
|---|----------|------------|
| 🔍 | **Carian Multi-Engine** | Gabungan DuckDuckGo® & Wikipedia dalam satu input |
| 🤖 | **Jawapan AI** | Ringkasan pintar menggunakan model AI Gemma-3 |
| 🎨 | **Antara Muka Moden** | UI gelap, responsif, ikon FontAwesome, tema gradient |
| 📱 | **PWA Sedia** | Boleh install macam app di telefon (manifest + service worker) |
| 🛡️ | **Keselamatan** | Perlindungan XSS, input validator, had input |
| 🔄 | **Kemas Kini Masa Nyata** | Loading animasi, butang reload, clear input pintar |
| 🌍 | **Sokongan Bahasa** | UI pelbagai bahasa (default: Melayu) |
| 👥 | **Sumber Terbuka** | Kod terbuka untuk sumbangan komuniti |

---

## 🚀 Demo Langsung

<p align="center">
  <a href="https://azura-ai-web-search.pages.dev" target="_blank">
    <img src="https://img.shields.io/badge/🔗_https://azura--ai--web--search.pages.dev-8A2BE2?style=for-the-badge&fontSize=20" alt="Demo Link"/>
  </a>
</p>

<p align="center">
  <a href="https://azura-ai-web-search.pages.dev">
    <img src="https://img.shields.io/badge/▶️_Klik_Untuk_Cuba_Sekarang-FF6B6B?style=for-the-badge&fontSize=16" alt="Cuba Sekarang"/>
  </a>
</p>

---

## 🔒 Sistem Keselamatan Unik

Azura AI menggunakan pendekatan keselamatan **3-lapisan** untuk melindungi API key:

```

┌─────────────────────────────────────────────────────┐
│  🔐 LAPISAN 1: IPFS STORAGE                         │
│  ├─ API key disimpan dalam IPFS                     │
│  ├─ Content Identifier (CID): Qmb5ES6...            │
│  └─ Desentralisasi - tiada single point of failure  │
├─────────────────────────────────────────────────────┤
│  🔑 LAPISAN 2: AES-GCM ENCRYPTION                   │
│  ├─ Data disulit dengan AES sebelum muat naik       │
│  ├─ 256-bit encryption standard                     │
│  └─ Hanya worker yang boleh decrypt                  │
├─────────────────────────────────────────────────────┤
│  ☁️ LAPISAN 3: CLOUDFLARE WORKER                     │
│  ├─ Proxy permintaan ke Google AI                   │
│  ├─ Elak CORS & IP blocking                          │
│  └─ Tambah lapisan keselamatan                       │
└─────────────────────────────────────────────────────┘

```

**Mengapa pendekatan ini?**

- ✅ Tiada API key didedahkan dalam kod sumber

- ✅ Selamat dari serangan XSS dan injection

- ✅ Mudah dikemas kini tanpa deploy semula

- ✅ Boleh digunakan oleh ramai pengguna serentak

---

## 📁 Struktur Projek

```

📦 Azura-Ai-Web-Search
├── 📄 index.html                    # Halaman utama aplikasi
├── 📄 manifest.json                  # Konfigurasi PWA
├── 📄 sw.js                          # Service Worker untuk offline capability
├── 🖼️ AZURA-LOGO.png                 # Logo utama
├── 🖼️ AZURA-AI.webp                  # Background image
├── 🖼️ icon-192.png                   # Ikon PWA (192px)
├── 🖼️ icon-512.png                   # Ikon PWA (512px)
├── 🖼️ icon-192-maskable.png          # Ikon maskable untuk PWA
├── 🖼️ icon-512-maskable.png          # Ikon maskable untuk PWA
├── 🖼️ Azura-Ai-WebSearch.jpg         # Screenshot aplikasi
├── 🖼️ Azura-Ai-Wallpaper.png         # Wallpaper untuk banner
├── 🖼️ RHB-BANK-QR.jpg                # QR code RHB Bank (derma)
├── 🖼️ TNG-QR.jpg                      # QR code Touch 'n Go (derma)
├── 🖼️ wld-acc.jpg                     # QR code WorldChain (derma)
├── 📄 README.md                       # Dokumentasi projek (anda di sini!)
└── 📄 LICENSE                         # Lesen MIT

```

---

## 🚀 Mula Pantas

### 📋 Keperluan Asas

• Pelayar web moden (Chrome, Firefox, Edge, Safari)

• Text editor (VS Code, Sublime Text) - untuk ubahsuai

• Git (optional)

### ⚙️ Cara Pasang (Lokal)

```bash
# 1. Clone repositori
git clone https://github.com/Lilmoki91/Azura-Ai-Web-Search.git

# 2. Masuk ke folder projek
cd Azura-Ai-Web-Search

# 3. Buka index.html dalam pelayar
# Cara 1: Double click index.html
# Cara 2: Guna Live Server (VSCode)
# Cara 3: Python HTTP server
python -m http.server 8000
# Kemudian buka http://localhost:8000
```

### ☁️ Deploy ke Cloudflare Pages (Recommended)

```bash
1. Buka https://dash.cloudflare.com
2. Klik Workers & Pages > Create application > Pages
3. Connect GitHub account
4. Pilih repo "Azura-Ai-Web-Search"
5. Klik "Save and Deploy"
6. Selesai! Dapat URL seperti: https://azura-ai-web-search.pages.dev
```

---

## ⚙️ Konfigurasi

#### 🔑 Konfigurasi API Key

Sistem menggunakan IPFS + AES-GCM encryption. Tiada API key didedahkan dalam kod sumber.

```javascript
// Config dalam index.html
IPFS_CONFIG = {
    cid: "Qmb5ES6JihBKaeQ9yah39Vy7QXh1Ls6CuaHBzatE8ZBdHV",
    aesKey: "++YYOXRnKIuM69sJq6eTBm4g3yB+MKInltySJrGm9p0=",
    gateway: "https://gateway.pinata.cloud/ipfs/"
}
```

## 🔍 Modifikasi Enjin Carian

**Anda boleh tambah atau ubah SEARCH_ENGINES dalam index.html:**

```javascript
const SEARCH_ENGINES = {
    duckduckgo: 'https://api.duckduckgo.com/',
    wikipedia: 'https://en.wikipedia.org/api/rest_v1/',
    // Tambah enjin lain di sini
};
```

---

## 🎯 Cara Guna

<p align="center">
  <img src="https://raw.githubusercontent.com/Lilmoki91/Azura-Ai-Web-Search/refs/heads/main/Azura-Ai-WebSearch.jpg" alt="Cara Guna Azura AI" width="80%" style="border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);"/>
</p>

### Langkah-langkah:

1. Taip soalan/carian dalam kotak input di halaman utama
2. Tekan butang "Cari" atau kekunci Enter pada papan kekunci
3. Tunggu proses - animasi loading akan dipaparkan semasa AI memproses
4. Lihat hasil ringkasan AI yang dijana oleh model Gemma-3
5. Rujuk sumber asal di panel "Sources" untuk maklumat lanjut
6. Guna ikon sidebar (☰) untuk:
   • Menu navigasi

   • Info pembangun
 
   • Share link

    • Help & FAQ

### 📱 Di Telefon Bimbit:

• Buka di Chrome/Edge/Safari

• Klik "Install App" atau "Add to Home Screen"

• Guna seperti aplikasi native

---

## 📸 Tangkapan Skrin

<p align="center">
  <table>
    <tr>
      <td align="center" width="33%">
        <img src="https://raw.githubusercontent.com/Lilmoki91/Azura-Ai-Web-Search/refs/heads/main/azurai-ai-halaman-ui.jpg" width="200" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
        <br/>
        <b>🏠 Halaman Utama</b>
        <br/>
        <sub>Antaramuka carian utama</sub>
      </td>
      <td align="center" width="33%">
        <img src="https://raw.githubusercontent.com/Lilmoki91/Azura-Ai-Web-Search/refs/heads/main/azura-ai-ringkasan-ui.jpg" width="200" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
        <br/>
        <b>📊 Hasil Carian</b>
        <br/>
        <sub>Ringkasan AI + sumber</sub>
      </td>
      <td align="center" width="33%">
        <img src="https://raw.githubusercontent.com/Lilmoki91/Azura-Ai-Web-Search/refs/heads/main/apps-azura-ai.png" width="200" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
        <br/>
        <b>📱 Mod Mudah Alih</b>
        <br/>
        <sub>PWA sedia install</sub>
      </td>
    </tr>
  </table>
</p>

---

## 🤝 Sumbangan

Kami mengalu-alukan sumbangan daripada semua! Sama ada anda developer, designer, atau pengguna biasa.

## 📝 Cara Menyumbang

```bash
# 1. Fork repositori ini
# 2. Clone fork anda
git clone https://github.com/[username-anda]/Azura-Ai-Web-Search.git

# 3. Buat branch baru
git checkout -b fitur-baru-anda

# 4. Commit perubahan
git add .
git commit -m "Tambah: [huraian ringkas perubahan]"

# 5. Push ke branch anda
git push origin fitur-baru-anda

# 6. Buat Pull Request di GitHub
```

## 💡 Apa yang Boleh Disumbangkan?

### Jenis Sumbangan Penerangan:

🐛 Lapor Bug Jumpa masalah? Buat issue di GitHub

💡 Cadangan Fitur Ada idea menarik? Kongsikan!

📝 Dokumentasi Bantu kemas kini README atau docs

🌐 Terjemahan Tambah sokongan bahasa baru

🎨 UI/UX Cadangkan penambahbaikan reka bentuk

⚡ Optimisasi Bantu jadikan kod lebih efisien

---

## ❤️ Kredit & Penghargaan

### Sumbangan:

🔍 DuckDuckGo® Enjin carian utama (API)

📚 Wikipedia Sumber kandungan pendidikan (REST API)

🧠 Google Gemma Model AI untuk ringkasan pintar

☁️ Cloudflare Hosting & Workers (proxy)

📦 IPFS & Pinata Storage encrypted API key

🎨 Font Awesome Ikon-ikon cantik

✍️ JetBrains Mono Font coding yang elegan

📝 Inter Font Font utama untuk UI

Terima kasih khas kepada:

• Semua pengguna yang mencuba dan memberi maklum balas

• Penyumbang kod dan idea

• Komuniti open-source Malaysia

• Guru-guru dan rakan yang memberi sokongan moral

---

## 👨‍💻 Pembangun

<div align="center">
  <img src="https://raw.githubusercontent.com/Lilmoki91/Azura-Ai-Web-Search/refs/heads/main/AZURA-LOGO.png" alt="Pembangun" width="150" style="border-radius: 50%;"/>
</div>

### Zulkarnain Bin Suyitno

---

### Butiran:

🎓 Status: Pelajar

🏫 Sekolah: SMK Rantau Panjang, Klang, Selangor

🌱 Usia: 16 tahun (2026)

💻 Peranan: Pembangun Utama

📧 Email: khairuldinsuyitno@gmail.com

💬 Telegram: @johansetia

🐙 GitHub: @Lilmoki91

"Saya percaya teknologi boleh mengubah pendidikan. Projek ini adalah sumbangan kecil saya untuk ekosistem AI Malaysia."

---

## 🎖️ Pengiktirafan

<div align="center">
  <p>
    <img src="https://img.shields.io/badge/🎀_Master_of_Ribbons_Educational_2026-FF69B4?style=for-the-badge&fontSize=20" alt="Master of Ribbons"/>
  </p>
  <p>
    <i>"Atas sumbangan dalam membangunkan teknologi AI untuk pendidikan Malaysia"</i>
  </p>
  <p>
    <img src="https://img.shields.io/badge/🏆_Anugerah_Inovasi_Pelajar_2026-Gold?style=for-the-badge" alt="Anugerah Inovasi"/>
    <img src="https://img.shields.io/badge/🇲🇾_Malaysia_AI_Champion_2026-Silver?style=for-the-badge" alt="Malaysia AI Champion"/>
  </p>
</div>

---

## ☕ Derma / Sumbangan

> Platform ini dibangunkan secara persendirian dengan sumber terhad. Jika anda rasa projek ini bermanfaat dan ingin menyokong, berikut adalah kaedah pembayaran yang tersedia:

---

**🇲🇾 Touch 'n Go eWallet**

Butiran Nilai
No. Akaun: ```150979504703```
Platform Touch 'n Go eWallet Malaysia

<p align="center">
  <img src="https://raw.githubusercontent.com/Lilmoki91/Azura-Ai-Web-Search/refs/heads/main/TNG-QR.jpg" alt="TNG eWallet QR" width="250" style="border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);"/>
  <br>
  <em>📱 Scan QR code di atas untuk menderma</em>
</p>

Cara Derma:

1. Buka app Touch 'n Go eWallet
2. Klik ikon "Scan" di halaman utama
3. Scan QR code di atas
4. Masukkan jumlah derma
5. Sahkan dengan PIN/keselamatan
6. Selesai! Terima kasih!

---

**🏦 RHB Bank (Malaysia)**

Butiran Nilai
No. Akaun: ```16207200095095```
Bank RHB Bank Berhad
Negara Malaysia

<p align="center">
  <img src="https://raw.githubusercontent.com/Lilmoki91/Azura-Ai-Web-Search/refs/heads/main/RHB-BANK-QR.jpg" alt="RHB Bank QR" width="250" style="border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);"/>
  <br>
  <em>🏦 Scan QR code di atas untuk menderma</em>
</p>

Cara Derma:

1. Buka app RHB Malaysia
2. Pilih "Scan & Pay" / "QR Pay"
3. Scan QR code di atas
4. Masukkan jumlah dan pengesahan
5. Selesai! Terima kasih!

---

**🌐 WorldChain (Worldcoin Wallet)**

Butiran Nilai
Network WorldChain
Alamat Wallet: ```0x9e194F4d7eb5fa82BD26491e23D19f23e1AC4A28```
Mata Wang Crypto (Worldcoin, ETH, dll)

<p align="center">
  <img src="https://raw.githubusercontent.com/Lilmoki91/Azura-Ai-Web-Search/refs/heads/main/wld-acc.jpg" alt="WorldChain Wallet QR" width="250" style="border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);"/>
  <br>
  <em>🌍 Scan QR code untuk transaksi crypto</em>
</p>

Cara Derma:

1. Buka wallet yang menyokong WorldChain network:
   • World App
   • MetaMask (tambah network manual)
   • OKX Wallet
   • Trust Wallet
2. Pastikan network ditetapkan ke WorldChain
3. Scan QR code di atas ATAU paste alamat wallet:
   ```
   0x9e194F4d7eb5fa82BD26491e23D19f23e1AC4A28
   ```
4. Masukkan jumlah yang diingini
5. Sahkan transaksi
6. Terima kasih atas sokongan crypto anda!

---

## 📋 Ringkasan Kaedah Pembayaran:

### Kaedah Butiran Akaun QR Code

🏦 RHB Bank: ```16207200095095``` <img src="https://raw.githubusercontent.com/Lilmoki91/Azura-Ai-Web-Search/refs/heads/main/RHB-BANK-QR.jpg" width="80" style="border-radius: 5px;"/>

🇲🇾 Touch 'n Go eWallet: ```150979504703``` <img src="https://raw.githubusercontent.com/Lilmoki91/Azura-Ai-Web-Search/refs/heads/main/TNG-QR.jpg" width="80" style="border-radius: 5px;"/>

🌐 WorldChain WorldChain: ```0x9e194F4d7eb5fa82BD26491e23D19f23e1AC4A28``` <img src="https://raw.githubusercontent.com/Lilmoki91/Azura-Ai-Web-Search/refs/heads/main/wld-acc.jpg" width="80" style="border-radius: 5px;"/>

---

<div align="center">
  <p>
    <img src="https://img.shields.io/badge/💝_Tiada_paksaan-FF69B4?style=flat-square" alt="Tiada Paksaan"/>
    <img src="https://img.shields.io/badge/🙏_Setiap_sumbangan_dihargai-success?style=flat-square" alt="Sumbangan Dihargai"/>
  </p>

  <p>
    <i>"Siapa yang menanam, dia yang menuai. Siapa yang memberi, dia yang menerima."</i>
  </p>

<h4>Semoga hidup anda diberkahi dan dimurahkan rezeki. 🙏</h4>

</div>

---

## 📜 Lesen

### Projek ini dilindungi di bawah MIT License - anda bebas untuk:

**❌ Tidak Boleh**
Menggunakan secara komersial Menuntuk sebagai karya sendiri
Mengubahsuai kod Menanggalkan notis hak cipta
Mengedarkan semula -
Menggunakan secara peribadi -

```
MIT License

Copyright (c) 2026 Zulkarnain bin suyitno.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

#### 📄 Baca Lesen Penuh



<div align="center">
  <hr width="80%">

  <p>
    <a href="#-azura-ai-web-search-">⬆️ Kembali ke Atas</a>
  </p>

  <p>
    <img src="https://img.shields.io/github/stars/Lilmoki91/Azura-Ai-Web-Search?style=social" alt="GitHub stars"/>
    <img src="https://img.shields.io/github/forks/Lilmoki91/Azura-Ai-Web-Search?style=social" alt="GitHub forks"/>
    <img src="https://img.shields.io/github/watchers/Lilmoki91/Azura-Ai-Web-Search?style=social" alt="GitHub watchers"/>
  </p>

  <p>
    <b>Jom #SumberTerbuka & hidupkan ekosistem AI Malaysia!</b>
  </p>

  <p>
    <img src="https://img.shields.io/badge/🇲🇾_Dibangunkan_di_Malaysia_dengan_❤️_untuk_pendidikan-8A2BE2?style=for-the-badge" alt="Dibangunkan di Malaysia"/>
  </p>

  <p>
    <a href="https://github.com/Lilmoki91/Azura-Ai-Web-Search">📦 GitHub Repo</a> •
    <a href="https://azura-ai-web-search.pages.dev">🚀 Demo Langsung</a> •
    <a href="https://github.com/Lilmoki91/Azura-Ai-Web-Search/issues">🐛 Report Bug</a> •
    <a href="https://github.com/Lilmoki91/Azura-Ai-Web-Search/fork">🍴 Fork Repo</a>
  </p>

  <p>
    <sub>📅 Last updated: Mac 2026</sub>
  </p>

  <p>
    <img src="https://raw.githubusercontent.com/Lilmoki91/Azura-Ai-Web-Search/refs/heads/main/AZURA-AI.png" alt="Azura AI Icon" width="250"/>
  </p>

  <p>
    🎀 <b>Azura AI - Master of Ribbons Educational 2026</b> ✨
  </p>

  <p>
    © 2026 Azura AI Web Search | Hak cipta terpelihara
  </p>
</div>

<p align="center">
  <img src="https://raw.githubusercontent.com/Lilmoki91/Azura-Ai-Web-Search/refs/heads/main/johan%26Azura-Ai.png" alt="Azura AI Web Search Banner" width="100%" style="border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);"/>
</p>
