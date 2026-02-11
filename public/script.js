/* =================================================
   SECTION CONTROL (SPA)
   ================================================= */
function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');

  sections.forEach(section => {
    section.classList.remove('active');
  });

  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add('active');
  }
}

/* Papar halaman Utama semasa mula */
window.addEventListener('load', () => {
  showSection('home');
});


/* =================================================
   LIGHTBOX GALERI
   ================================================= */
function openLightbox(img) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (!lightbox || !lightboxImg) return;

  lightboxImg.src = img.src;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.style.display = "none";
  }
}


/* =================================================
   TARIKH & HARI HEADER
   ================================================= */
function paparkanTarikh() {
  const headerDate = document.getElementById("headerDate");
  if (!headerDate) return;

  const hari = [
    "Ahad", "Isnin", "Selasa",
    "Rabu", "Khamis", "Jumaat", "Sabtu"
  ];

  const bulan = [
    "Januari", "Februari", "Mac", "April",
    "Mei", "Jun", "Julai", "Ogos",
    "September", "Oktober", "November", "Disember"
  ];

  const now = new Date();

  const paparan =
    hari[now.getDay()] + "<br>" +
    now.getDate() + " " +
    bulan[now.getMonth()] + " " +
    now.getFullYear();

  headerDate.innerHTML = paparan;
}

window.addEventListener("load", paparkanTarikh);


/* =================================================
   CHATBOT CONTROL (FINAL – TIADA AUTO OPEN)
   ================================================= */
document.addEventListener('DOMContentLoaded', () => {

  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotBox = document.getElementById('chatbotBox');
  const chatbotClose = document.getElementById('chatbotClose');

  // Jika elemen chatbot tiada, hentikan
  if (!chatbotToggle || !chatbotBox) return;

  // Pastikan chatbot tertutup semasa load
  chatbotBox.style.display = 'none';

  // Klik ikon chatbot (toggle)
  chatbotToggle.addEventListener('click', () => {
    const isVisible = chatbotBox.style.display === 'block';
    chatbotBox.style.display = isVisible ? 'none' : 'block';
  });

  // Klik butang tutup (X)
  if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
      chatbotBox.style.display = 'none';
    });
  }

});

/* ================= CHECKLIST INTERAKTIF ================= */

const checklistForm = document.getElementById('checklistForm');
const checklistStatus = document.getElementById('checklistStatus');

if (checklistForm && checklistStatus) {
  checklistForm.addEventListener('change', () => {
    const checkboxes = checklistForm.querySelectorAll('input[type="checkbox"]');
    const allChecked = [...checkboxes].every(cb => cb.checked);

    if (allChecked) {
      checklistStatus.textContent = '✅ Checklist lengkap – boleh cetak';
      checklistStatus.className = 'status-siap';
    } else {
      checklistStatus.textContent = '❌ Checklist belum lengkap';
      checklistStatus.className = 'status-belum';
    }
  });
}

function resetChecklist() {
  const checkboxes = document.querySelectorAll('#checklistForm input[type="checkbox"]');
  checkboxes.forEach(cb => cb.checked = false);

  checklistStatus.textContent = '❌ Checklist belum lengkap';
  checklistStatus.className = 'status-belum';
}

/* ================= REKOD PdP ================= */

function simpanRekod() {

  const guru = document.getElementById('guru').value;
  const murid = document.getElementById('murid').value;
  const kelas = document.getElementById('kelas').value;
  const filament = document.getElementById('filament').value;
  const tujuan = document.getElementById('tujuan').value;
  const tarikh = document.getElementById('tarikh').value;

  if (!guru || !murid || !kelas || !tarikh) {
    alert('Sila lengkapkan maklumat wajib!');
    return;
  }

  const table = document.getElementById('rekodTable');
  const row = table.insertRow();

  row.innerHTML = `
    <td>${tarikh}</td>
    <td>${guru}</td>
    <td>${murid}</td>
    <td>${kelas}</td>
    <td>${filament}</td>
    <td>${tujuan}</td>
  `;

  document.getElementById('pdpForm').reset();
}

/* =================================================
   MOBILE MENU + DROPDOWN (FINAL FIX)
   ================================================= */

document.addEventListener('DOMContentLoaded', () => {

  const navList = document.querySelector('nav ul');

  /* === TAP MENU DROPDOWN (BUKA / TUTUP) === */
  document.querySelectorAll('.dropdown > a').forEach(link => {
    link.addEventListener('click', e => {

      if (window.innerWidth <= 768) {
        e.preventDefault();

        const parent = link.parentElement;

        // Tutup submenu lain
        document.querySelectorAll('.dropdown').forEach(d => {
          if (d !== parent) d.classList.remove('active');
        });

        // Toggle submenu ini
        parent.classList.toggle('active');
      }

    });
  });

  /* === KLIK SUBMENU → AUTO TUTUP SEMUA === */
  document.querySelectorAll('.dropdown-menu a').forEach(link => {
    link.addEventListener('click', () => {

      if (window.innerWidth <= 768) {
        // Tutup semua submenu
        document.querySelectorAll('.dropdown').forEach(d => {
          d.classList.remove('active');
        });

        // Tutup menu utama
        navList.classList.remove('show');
      }

    });
  });

  /* === KLIK MENU BIASA (TANPA SUBMENU) === */
  document.querySelectorAll('nav > ul > li:not(.dropdown) > a').forEach(link => {
    link.addEventListener('click', () => {

      if (window.innerWidth <= 768) {
        navList.classList.remove('show');
      }

    });
  });

});


