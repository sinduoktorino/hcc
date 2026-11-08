(function () {
  "use strict";

  var data = window.PORTFOLIO || {};
  var skills = Array.isArray(data.skills) ? data.skills : [];
  var projects = Array.isArray(data.projects) ? data.projects : [];

  var FILTER_LABELS = {
    all: "semua proyek",
    web: "Aplikasi Web",
    api: "API & Backend",
    devops: "DevOps",
    frontend: "Frontend"
  };

  var ICONS = {
    code:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    layout:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
    server:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>',
    database:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>',
    external:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
    github:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>'
  };

  var activeFilter = "all";
  var revealObserver = null;
  var toastTimer = null;

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $$(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[character];
    });
  }

  function renderSkills() {
    var grid = $("#skills-grid");
    if (!grid || !skills.length) {
      return;
    }

    var fragment = document.createDocumentFragment();

    skills.forEach(function (skill, index) {
      var card = document.createElement("article");
      var delayClass = index > 0 ? " reveal-delay-" + Math.min(index, 2) : "";
      var items = Array.isArray(skill.items) ? skill.items : [];

      card.className = "skill-card reveal" + delayClass;
      card.innerHTML =
        '<div class="skill-icon" aria-hidden="true">' +
        (ICONS[skill.icon] || ICONS.code) +
        "</div>" +
        "<h3>" +
        escapeHtml(skill.title) +
        "</h3>" +
        '<ul class="tech-list">' +
        items
          .map(function (item) {
            return '<li class="tech-badge">' + escapeHtml(item) + "</li>";
          })
          .join("") +
        "</ul>";

      fragment.appendChild(card);
    });

    grid.replaceChildren(fragment);
  }

  function renderProjects() {
    var grid = $("#projects-grid");
    if (!grid) {
      return;
    }

    var visible = projects.filter(function (project) {
      return activeFilter === "all" || project.category === activeFilter;
    });

    var fragment = document.createDocumentFragment();

    visible.forEach(function (project) {
      var article = document.createElement("article");
      var stack = Array.isArray(project.stack) ? project.stack : [];
      var demo = project.demoUrl
        ? '<a class="btn btn-sm btn-primary" href="' +
          escapeHtml(project.demoUrl) +
          '" target="_blank" rel="noopener noreferrer">Demo Langsung ' +
          ICONS.external +
          "</a>"
        : '<span class="btn btn-sm btn-disabled" aria-disabled="true">Demo segera</span>';
      var repo = project.repoUrl
        ? '<a class="btn btn-sm btn-ghost" href="' +
          escapeHtml(project.repoUrl) +
          '" target="_blank" rel="noopener noreferrer">' +
          ICONS.github +
          " GitHub</a>"
        : "";

      article.className = "project-card reveal";
      article.setAttribute("data-category", project.category || "");

      article.innerHTML =
        '<div class="project-media">' +
        '<img src="' +
        escapeHtml(project.image) +
        '" alt="Mockup antarmuka proyek ' +
        escapeHtml(project.title) +
        '" width="800" height="500" loading="lazy" decoding="async">' +
        "</div>" +
        '<div class="project-body">' +
        '<span class="project-category">' +
        escapeHtml(project.categoryLabel || project.category || "Proyek") +
        "</span>" +
        "<h3>" +
        escapeHtml(project.title) +
        "</h3>" +
        '<p class="project-summary">' +
        escapeHtml(project.summary) +
        "</p>" +
        '<dl class="project-detail">' +
        "<div><dt>Masalah</dt><dd>" +
        escapeHtml(project.problem) +
        "</dd></div>" +
        "<div><dt>Solusi</dt><dd>" +
        escapeHtml(project.solution) +
        "</dd></div>" +
        "</dl>" +
        '<ul class="project-tags" aria-label="Teknologi">' +
        stack
          .map(function (item) {
            return "<li>" + escapeHtml(item) + "</li>";
          })
          .join("") +
        "</ul>" +
        '<div class="project-actions">' +
        demo +
        repo +
        "</div>" +
        "</div>";

      fragment.appendChild(article);
    });

    grid.replaceChildren(fragment);

    var status = $("#projects-status");
    if (status) {
      status.textContent =
        "Menampilkan " +
        visible.length +
        " proyek" +
        (activeFilter === "all"
          ? "."
          : " kategori " + (FILTER_LABELS[activeFilter] || activeFilter) + ".");
    }

    initReveal();
  }

  function initReveal() {
    var elements = $$(".reveal:not(.is-visible)");
    if (!elements.length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      elements.forEach(function (element) {
        element.classList.add("is-visible");
      });
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add("is-visible");
            window.setTimeout(function () {
              entry.target.classList.remove("reveal-delay-1", "reveal-delay-2");
            }, 900);
            revealObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
    }

    elements.forEach(function (element) {
      revealObserver.observe(element);
    });
  }

  function initFilters() {
    var buttons = $$(".filter-btn");
    if (!buttons.length) {
      return;
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        activeFilter = button.getAttribute("data-filter") || "all";

        buttons.forEach(function (item) {
          var isActive = item === button;
          item.classList.toggle("is-active", isActive);
          item.setAttribute("aria-pressed", String(isActive));
        });

        renderProjects();
      });
    });
  }

  function trapFocus(event, container) {
    var focusable = $$(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      container
    ).filter(function (element) {
      return element.offsetParent !== null;
    });

    if (!focusable.length) {
      return;
    }

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function initNav() {
    var toggle = $("#nav-toggle");
    var nav = $("#site-nav");
    var overlay = $("#nav-overlay");
    var desktop = window.matchMedia("(min-width: 900px)");

    if (!toggle || !nav) {
      return;
    }

    function setOpen(open, restoreFocus) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute(
        "aria-label",
        open ? "Tutup menu navigasi" : "Buka menu navigasi"
      );
      document.body.classList.toggle("nav-open", open);

      if (overlay) {
        overlay.hidden = !open;
      }

      if (open) {
        var first = nav.querySelector("a[href], button:not([disabled])");
        if (first) {
          window.requestAnimationFrame(function () {
            first.focus({ preventScroll: true });
          });
        }
      } else if (restoreFocus !== false) {
        toggle.focus();
      }
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    if (overlay) {
      overlay.addEventListener("click", function () {
        setOpen(false);
      });
    }

    nav.addEventListener("click", function (event) {
      if (!document.body.classList.contains("nav-open")) {
        return;
      }

      if (event.target.closest("a")) {
        setOpen(false);
        window.setTimeout(function () {
          toggle.focus({ preventScroll: true });
        }, 0);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && document.body.classList.contains("nav-open")) {
        setOpen(false);
      }

      if (event.key === "Tab" && document.body.classList.contains("nav-open")) {
        trapFocus(event, nav);
      }
    });

    var onBreakpointChange = function (event) {
      if (event.matches) {
        setOpen(false, false);
      }
    };

    if (desktop.addEventListener) {
      desktop.addEventListener("change", onBreakpointChange);
    } else if (desktop.addListener) {
      desktop.addListener(onBreakpointChange);
    }
  }

  function initHeader() {
    var header = $("#site-header");
    if (!header) {
      return;
    }

    var ticking = false;

    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(update);
        }
      },
      { passive: true }
    );

    update();
  }

  function initYear() {
    var year = $("#year");
    if (year) {
      year.textContent = String(new Date().getFullYear());
    }
  }

  function showToast(message) {
    var toast = $("#toast");
    if (!toast) {
      return;
    }

    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 3200);
  }

  function fallbackCopy(text) {
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.className = "copy-helper";
    document.body.appendChild(area);
    area.select();

    try {
      document.execCommand("copy");
    } finally {
      document.body.removeChild(area);
    }
  }

  function initCopyEmail() {
    var button = $("#copy-email");
    if (!button) {
      return;
    }

    button.addEventListener("click", function () {
      var email =
        button.getAttribute("data-email") ||
        (data.profile && data.profile.email) ||
        "";

      if (!email) {
        return;
      }

      var copyPromise =
        navigator.clipboard && window.isSecureContext
          ? navigator.clipboard.writeText(email)
          : Promise.resolve(fallbackCopy(email));

      copyPromise
        .then(function () {
          showToast("Email berhasil disalin.");
        })
        .catch(function () {
          try {
            fallbackCopy(email);
            showToast("Email berhasil disalin.");
          } catch (error) {
            showToast("Gagal menyalin. Email: " + email);
          }
        });
    });
  }

  function initForm() {
    var form = $("#contact-form");
    if (!form) {
      return;
    }

    var fields = {
      name: $("#name"),
      email: $("#email"),
      message: $("#message")
    };
    var status = $("#form-status");
    var submit = $("#submit-btn");
    var honeypot = $("#company");

    function fieldWrap(input) {
      return input ? input.closest(".form-field") : null;
    }

    function errorElement(input) {
      return input ? document.getElementById(input.id + "-error") : null;
    }

    function setError(input, message) {
      if (!input) {
        return;
      }

      var wrap = fieldWrap(input);
      var error = errorElement(input);

      if (wrap) {
        wrap.classList.toggle("has-error", Boolean(message));
      }

      if (error) {
        error.textContent = message || "";
      }

      input.setAttribute("aria-invalid", message ? "true" : "false");
    }

    function validateField(input) {
      if (!input) {
        return true;
      }

      var value = input.value.trim();
      var message = "";

      if (!value) {
        message =
          input.id === "message"
            ? "Pesan wajib diisi."
            : (input.id === "name" ? "Nama" : "Email") + " wajib diisi.";
      } else if (input.id === "name" && value.length < 2) {
        message = "Nama minimal 2 karakter.";
      } else if (
        input.id === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        message = "Masukkan alamat email yang valid.";
      } else if (input.id === "message" && value.length < 10) {
        message = "Pesan minimal 10 karakter.";
      }

      setError(input, message);
      return !message;
    }

    function setStatus(message, state) {
      if (!status) {
        return;
      }

      status.textContent = message;

      if (state) {
        status.setAttribute("data-state", state);
      } else {
        status.removeAttribute("data-state");
      }
    }

    Object.keys(fields).forEach(function (key) {
      var input = fields[key];
      if (!input) {
        return;
      }

      input.addEventListener("blur", function () {
        validateField(input);
      });

      input.addEventListener("input", function () {
        var wrap = fieldWrap(input);
        if (wrap && wrap.classList.contains("has-error")) {
          validateField(input);
        }
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (honeypot && honeypot.value.trim() !== "") {
        form.reset();
        setStatus("Pesan Anda telah dikirim.", "success");
        return;
      }

      var valid = Object.keys(fields)
        .map(function (key) {
          return validateField(fields[key]);
        })
        .every(Boolean);

      if (!valid) {
        var firstInvalid = Object.keys(fields)
          .map(function (key) {
            return fields[key];
          })
          .filter(function (input) {
            return input && input.getAttribute("aria-invalid") === "true";
          })[0];

        if (firstInvalid) {
          firstInvalid.focus();
        }

        setStatus("Periksa kembali kolom yang ditandai.", "error");
        return;
      }

      var name = fields.name.value.trim();
      var email = fields.email.value.trim();
      var message = fields.message.value.trim();
      var to =
        (data.profile && data.profile.email) || "sinduoktorino70@gmail.com";
      var subject = encodeURIComponent("Pesan dari " + name + " — Portofolio");
      var body = encodeURIComponent(
        "Nama: " + name + "\nEmail: " + email + "\n\n" + message
      );

      if (submit) {
        submit.classList.add("is-loading");
        submit.disabled = true;
        submit.setAttribute("aria-busy", "true");
      }

      setStatus("Menyiapkan aplikasi email...", "");

      window.setTimeout(function () {
        window.location.href =
          "mailto:" + to + "?subject=" + subject + "&body=" + body;

        if (submit) {
          submit.classList.remove("is-loading");
          submit.disabled = false;
          submit.removeAttribute("aria-busy");
        }

        setStatus(
          "Aplikasi email Anda akan terbuka. Terima kasih sudah menghubungi!",
          "success"
        );
      }, 350);
    });
  }

  function initActiveNav() {
    var sections = $$("main section[id]");
    var links = $$(".nav-link");

    if (!sections.length || !links.length || !("IntersectionObserver" in window)) {
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          var id = entry.target.getAttribute("id");

          links.forEach(function (link) {
            var isActive = link.getAttribute("href") === "#" + id;
            link.classList.toggle("is-active", isActive);

            if (isActive) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  function init() {
    renderSkills();
    renderProjects();
    initFilters();
    initNav();
    initHeader();
    initYear();
    initCopyEmail();
    initForm();
    initActiveNav();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
