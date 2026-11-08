/* ============================================================
   Sumber data tunggal untuk konten dinamis portofolio.
   Ubah nilai di sini untuk memperbarui keahlian dan proyek.
   ============================================================ */

window.PORTFOLIO = {
  profile: {
    name: "Sindu Oktorino",
    role: "Full-Stack Developer & Systems Builder",
    email: "sinduoktorino70@gmail.com",
    location: "Indonesia",
    domain: "sinduoktorino.com",
    github: "https://github.com/sinduoktorino",
    linkedin: "https://www.linkedin.com/in/sinduoktorino",
    cv: "assets/cv/CV-Sindu-Oktorino.pdf"
  },

  skills: [
    {
      title: "Languages",
      icon: "code",
      items: ["Python", "JavaScript", "TypeScript", "SQL", "HTML/CSS"]
    },
    {
      title: "Frontend",
      icon: "layout",
      items: ["React.js", "Next.js", "Tailwind CSS"]
    },
    {
      title: "Backend & Server",
      icon: "server",
      items: ["Node.js", "FastAPI / Flask", "REST API", "GraphQL"]
    },
    {
      title: "Databases & DevOps",
      icon: "database",
      items: ["PostgreSQL", "Docker", "Git", "Nginx", "Linux"]
    }
  ],

  projects: [
    {
      id: "arus-data",
      title: "Arus Data",
      category: "web",
      categoryLabel: "Aplikasi Web",
      summary: "Dashboard analitik real-time untuk memantau metrik operasional dalam satu tampilan.",
      problem: "Data tersebar di beberapa sistem sehingga tim sulit mendapat gambaran operasional secara cepat.",
      solution: "Dashboard terpadu dengan visualisasi real-time, filter periode, dan ekspor laporan.",
      stack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL"],
      image: "assets/images/project-arus-data.svg",
      demoUrl: null,
      repoUrl: "https://github.com/sinduoktorino"
    },
    {
      id: "kirim-cepat",
      title: "Kirim Cepat",
      category: "api",
      categoryLabel: "API & Backend",
      summary: "Layanan API pengiriman untuk menghitung tarif, melacak paket, dan mengelola status pengiriman.",
      problem: "Proses pengiriman manual menyebabkan status paket tidak konsisten dan sulit dilacak.",
      solution: "REST API terpusat dengan validasi status, dokumentasi endpoint, dan integrasi webhook.",
      stack: ["Node.js", "REST API", "PostgreSQL", "Docker"],
      image: "assets/images/project-kirim-cepat.svg",
      demoUrl: null,
      repoUrl: "https://github.com/sinduoktorino"
    },
    {
      id: "ruang-belajar",
      title: "Ruang Belajar",
      category: "web",
      categoryLabel: "Aplikasi Web",
      summary: "Platform kursus online dengan katalog materi, progres belajar, dan akses kelas.",
      problem: "Materi belajar tersebar dalam file dan grup chat sehingga progres peserta tidak terukur.",
      solution: "Platform terstruktur dengan katalog kursus, pelacakan progres, dan panel pengajar.",
      stack: ["React.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
      image: "assets/images/project-ruang-belajar.svg",
      demoUrl: null,
      repoUrl: "https://github.com/sinduoktorino"
    },
    {
      id: "deploykit",
      title: "DeployKit",
      category: "devops",
      categoryLabel: "DevOps",
      summary: "Kumpulan skrip dan konfigurasi untuk menstandarkan proses deployment aplikasi.",
      problem: "Setiap deployment dilakukan manual dengan langkah berbeda-beda dan rawan human error.",
      solution: "Pipeline containerized yang reprodusibel dengan health check dan rollback sederhana.",
      stack: ["Docker", "Nginx", "Linux", "Git"],
      image: "assets/images/project-deploykit.svg",
      demoUrl: null,
      repoUrl: "https://github.com/sinduoktorino"
    },
    {
      id: "inventra",
      title: "Inventra",
      category: "web",
      categoryLabel: "Aplikasi Web",
      summary: "Sistem manajemen inventaris untuk stok masuk, stok keluar, dan laporan berkala.",
      problem: "Pencatatan stok manual sering tidak sinkron dan menyulitkan audit persediaan.",
      solution: "Aplikasi inventaris dengan riwayat transaksi, validasi stok, dan laporan otomatis.",
      stack: ["Python", "FastAPI", "React.js", "PostgreSQL"],
      image: "assets/images/project-inventra.svg",
      demoUrl: null,
      repoUrl: "https://github.com/sinduoktorino"
    },
    {
      id: "cuaca-kita",
      title: "Cuaca Kita",
      category: "frontend",
      categoryLabel: "Frontend",
      summary: "Aplikasi cuaca ringan dengan pencarian kota, prakiraan harian, dan tampilan responsif.",
      problem: "Informasi cuaca sering tersaji dengan antarmuka berat dan sulit dibaca di layar kecil.",
      solution: "Antarmuka mobile-first yang cepat, aksesibel, dan memanfaatkan data dari REST API publik.",
      stack: ["JavaScript", "HTML/CSS", "REST API"],
      image: "assets/images/project-cuaca-kita.svg",
      demoUrl: null,
      repoUrl: "https://github.com/sinduoktorino"
    }
  ]
};
