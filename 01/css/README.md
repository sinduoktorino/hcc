# Portofolio Sindu Oktorino

Website portofolio statis untuk **Sindu Oktorino** — Full-Stack Developer & Systems Builder.
Dibangun tanpa framework dan tanpa build step: **HTML + CSS + JavaScript**.

- Domain di metadata: `https://sinduoktorino.com`
- Repositori: `github.com/sinduoktorino/hcc`
- Tema: dark mode native (`#0F172A`) dengan aksen teal/cyan/indigo
- Bahasa konten: Indonesia

## Status Implementasi

- [x] **Fase 1** — Struktur proyek, design token, font, metadata SEO
- [x] **Fase 2** — Navbar, Hero, About, Skills, Projects, Contact, Footer, responsif 320–1920px
- [x] **Fase 3** — Data proyek & keahlian terpusat, filter kategori, salin email

## Struktur Folder

```text
hcc/
├── index.html                 # Halaman utama
|                              # Halaman error statis
├── css/
│   └── styles.css             # Design token, komponen, responsif
├── js/
│   ├── head.js                # Menandai JS aktif (mencegah flash reveal)
│   ├── data.js                # Sumber data keahlian & proyek
│   └── main.js                # Navigasi, filter, salin email, validasi form
├── assets/
│   ├── favicon.svg
│   ├── cv/                    # Letakkan PDF CV di sini
│   └── images/                # Mockup proyek, og-cover.png (sosial), og-cover.svg (sumber)
|
└── websindu.md                # Dokumen kebutuhan awal
```

## Mengedit Konten

### Data proyek & keahlian

Semua konten dinamis ada di **`js/data.js`**:

- `profile` — nama, email, domain, GitHub, LinkedIn, path CV
- `skills` — kategori keahlian dan daftar teknologinya
- `projects` — judul, kategori, ringkasan, masalah, solusi, tech stack, gambar, URL demo/repo

Setelah mengubah data, muat ulang halaman. Filter kategori membaca nilai
`category` (`web`, `api`, `devops`, `frontend`).

### Konten statis

Teks Hero, About, dan Contact ada langsung di **`index.html`**.

### CV

Letakkan file PDF di:

```text
assets/cv/CV-Sindu-Oktorino.pdf
```

Jika nama file berbeda, sesuaikan atribut `href` tombol **Unduh CV** di
`index.html` dan nilai `profile.cv` di `js/data.js`.

## Yang Perlu Disesuaikan

1. **Email** — saat ini memakai `sinduoktorino70@gmail.com`. Verifikasi dan ganti
   di `index.html` (tautan `mailto:` + tombol salin) dan `js/data.js`.
2. **LinkedIn** — URL `https://www.linkedin.com/in/sinduoktorino` adalah perkiraan.
   Ganti dengan URL profil yang benar.
3. **Proyek** — enam proyek di `js/data.js` adalah **contoh** untuk menunjukkan
   struktur. Ganti dengan proyek nyata, termasuk `demoUrl` dan `repoUrl`.
4. **CV** — pastikan PDF tersedia di `assets/cv/`.
5. **Gambar sosial** — `assets/images/og-cover.png` adalah hasil render dari
   `og-cover.svg` (1200×630). Jika mengubah desain, perbarui SVG lalu render
   ulang ke PNG agar pratinjau di media sosial ikut berubah.

## Form Kontak

Saat ini form melakukan:

- Validasi sisi klien (nama, email, panjang pesan)
- Honeypot field (`company`) untuk menyaring bot sederhana
- Status loading dan pesan sukses/error
- Pengiriman melalui `mailto:` (membuka aplikasi email pengunjung)

## Aksesibilitas & Performa

- Skip link, fokus keyboard terlihat, dan target sentuh minimal 44px
- Mendukung `prefers-reduced-motion`
- Kontras teks mengikuti WCAG AA
- Gambar proyek berupa SVG ringan dengan `loading="lazy"`
- Tanpa dependensi npm, tanpa framework, sehingga payload awal kecil

Target Lighthouse: **Performance, Accessibility, SEO > 90**.

## Catatan

- Folder `01/` dibiarkan apa adanya.
- `websindu.md` adalah dokumen kebutuhan awal dan tidak diubah.
- Tidak ada proses build; semua file dapat langsung dibuka dan dijalankan secara lokal.
