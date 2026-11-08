# Dokumen Analisis Kebutuhan Website Personal & Portofolio
**Nama Website:** Sindu Oktorino  
**Tujuan Utama:** Portofolio Profesional, Profil Engineer/Developer, & Showcase Proyek  
**Status Dokumen:** Rencana Kerja & Spesifikasi Teknis  

---

## 1. Branding & Identitas Digital

* **Nama Domain Utama:** `sinduoktorino.com` (Alt: `sinduoktorino.dev` / `sinduoktorino.my.id`)
* **Identitas Visual:**
  * **Tema Utama:** *Dark Mode Native* dengan latar belakang gelap (`#0F172A` / `#121212`) dan aksen warna terang (*Teal / Cyan / Indigo*).
  * **Logo & Visual:** Typography logo minimalis menggunakan inisial **SO** atau monogram `sinduoktorino.dev`.
* **Proposisi Nilai:** Menyajikan profil teknis yang bersih, cepat diakses, serba dinamis, serta menyoroti proyek *software engineering* berbasis bukti penyelesaian masalah.

---

## 2. Arsitektur Informasi & Struktur Halaman

```
[ Header / Sticky Navbar ]
       │
       ├── Hero Section (Introduksi & CTA Utama)
       ├── About & Bio (Filosofi & Latar Belakang)
       ├── Skills & Tech Stack (Pengelompokan Keahlian Teknis)
       ├── Projects Showcase (Galeri Proyek & Arsitektur)
       └── Contact & Footer (Formulir & Media Sosial)
```

### Rincian Elemen Halaman:
1. **Header / Navbar:** Logo, Navigasi Cepat (*About, Projects, Stack, Contact*), Tombol Unduh CV/Resume, serta *Theme Switcher*.
2. **Hero Section:** Tagline utama (*"Full-Stack Developer & Systems Builder"*), indikator status (*"Available for work"*), dan dua tombol CTA (*"View Projects"* & *"Contact Me"*).
3. **About Section:** Narasi ringkas latar belakang profesional, fokus area (Backend, Cloud/DevOps, Frontend), dan pencapaian utama.
4. **Skills & Tech Stack:** Pengelompokan visual berbasis *badges/cards*:
   * **Languages:** Python, JavaScript, TypeScript, SQL, HTML/CSS.
   * **Frontend:** React.js, Next.js, Tailwind CSS.
   * **Backend & Server:** Node.js, FastAPI/Flask, REST API, GraphQL.
   * **Databases & DevOps:** PostgreSQL, Docker, Git, Nginx, Linux.
5. **Projects Showcase:** Kartu-kartu proyek yang dilengkapi:
   * Tangkapan layar / Mockup antarmuka.
   * Judul, deskripsi singkat masalah & solusi.
   * Tag *Tech Stack* yang digunakan.
   * Tombol *Live Demo* & Repositori *GitHub*.
6. **Contact & Footer:** Formulir kontak interaktif, tombol *click-to-copy email*, serta tautan ke profil GitHub, LinkedIn, dan hak cipta.

---

## 3. Infrastruktur & Tech Stack

### Opsi A: Jamstack / Static Site Generation (Sangat Direkomendasikan)
* **Frontend Framework:** Next.js (React) atau Astro (Performa & SEO maksimal).
* **Styling:** Tailwind CSS + Lucide Icons.

### Opsi B: Dynamic Full-Stack (Jika Butuh CMS / Dashboard Admin)
* **Frontend:** React.js / Next.js.
* **Backend:** Python (FastAPI) atau Node.js.
* **Database:** PostgreSQL.
---

## 4. Analisis Kebutuhan UI/UX (Mobile & Desktop)

### A. Prinsip Antarmuka (UI) & Pengalaman Pengguna (UX)
* **Content-First Layout:** Informasi dapat dipindai (*scanable*) dalam kurun waktu 3-5 detik pertama.
* **Tipografi Dual-Font:** Font *Sans-serif* (Inter / Plus Jakarta Sans) untuk teks umum dan font *Monospace* (Fira Code / JetBrains Mono) untuk tag teknis atau kode.
* **Micro-Interactions:** Efek *hover* halus pada tombol dan kartu proyek, status *loading* yang jelas pada formulir, serta animasi transisi layar minimalis.

### B. Strategi Responsivitas (Mobile-First)

| Komponen Antarmuka | Layar Mobile ( < 768px ) | Layar Desktop ( ≥ 1024px ) |
| :--- | :--- | :--- |
| **Navigasi Navbar** | *Hamburger Menu* / *Slide-over Drawer* | Menu horizontal penuh pada *Navbar* |
| **Layout Proyek** | Grid 1 Kolom (Menumpuk vertikal) | Grid 2 - 3 Kolom |
| **Ukuran Tipografi** | H1: `28px - 32px` | Body: `14px` | H1: `48px - 60px` | Body: `16px` |
| **Ukuran Target Sentuh** | Area tombol minimal `44x44px` | Bebas, dioptimalkan untuk efek kursor |
| **Tech Stack Badges** | Grid 2 kolom atau *scroll* horizontal | Grid multi-kolom terstruktur |

---

## 5. Keamanan & Optimasi Sistem (Security & Hardening)

### A. Keamanan Website
1. **Enkripsi HTTPS & Transport Security:**
   * Wajib sertifikat SSL/TLS (Let's Encrypt / Cloudflare Edge).
   * Menerapkan header **HSTS** (*HTTP Strict Transport Security*).
2. **Proteksi Formulir Kontak:**
   * **Rate Limiting:** Membatasi maksimum 3 pengiriman pesan per 10 menit per IP.
   * **CORS Policy:** Membatasi domain API agar hanya memproses *request* dari domain `sinduoktorino.com`.
   * **Bot Filtering:** Menggunakan reCAPTCHA v3 atau teknik *honeypot input*.
   * **Input Sanitization:** Mencegah serangan *XSS* (*Cross-Site Scripting*) dan *SQL Injection* pada pesan yang dikirim.
3. **HTTP Security Headers:**
   * `Content-Security-Policy (CSP)`
   * `X-Frame-Options: DENY` (Mencegah *Clickjacking*)
   * `X-Content-Type-Options: nosniff`

### B. Optimasi Performa & Aksesibilitas
* **Core Web Vitals Target:** Skor Google Lighthouse > 90 (Performance, Accessibility, SEO).
* **Format Gambar:** Menggunakan `.webp` atau `.avif` dengan ukuran yang disesuaikan (*responsive images*).
* **Aksesibilitas (WCAG 2.1):** Kontras warna teks memenuhi standar AA, serta mendukung navigasi *Keyboard Tab*.

---

## 6. Checklist Pelaksanaan Proyek

- [ ] Registrasi domain nama `sinduoktorino.com`
- [ ] Pembuatan Wireframe UI di Figma (Tampilan Mobile & Desktop)
- [ ] Pengaturan Repositori Git di GitHub (`sindu-oktorino-portfolio`)
- [ ] Pengembangan Komponen (Navbar, Hero, Stack, Projects, Contact)
- [ ] Implementasi Form Sanitization & Rate Limiting
- [ ] Pengujian Responsivitas di Berbagai Ukuran Layar
- [ ] Audit Keamanan Header & Performa Google Lighthouse