// ==========================================================
// BAGIAN 0: PUSAT DATA PROPERTI
// ==========================================================
const propertyData = [
    {
        id: 1,
        title: "Rumah minimalis di semarang",
        specs: "3 Kamar tidur | 2 Kamar mandi | 120m²",
        price: "Rp 850.000.000",
        description: "Rumah modern minimalis yang terletak di jantung kota Semarang, menawarkan akses mudah ke fasilitas publik. Desain interior yang lapang dengan pencahayaan alami yang melimpah.",
        tag: "Baru", tagClass: "",
        gallery: [ "rumah.png" ]
    },
    {
        id: 2,
        title: "Apartemen Mewah di jakarta",
        specs: "2 Kamar tidur | 1 Kamar mandi | 90m²",
        price: "Rp 1.200.000.000",
        description: "Apartemen mewah dengan pemandangan kota Jakarta yang menakjubkan. Dilengkapi dengan fasilitas bintang lima seperti kolam renang infinity, gym, dan keamanan 24 jam.",
        tag: "Terjual", tagClass: "sold",
        gallery: [ "apartment.png" ]
    },
    {
        id: 3,
        title: "Villa Nyaman di Bali",
        specs: "4 Kamar tidur | 3 Kamar mandi | 200m²",
        price: "Rp 2.500.000.000",
        description: "Nikmati ketenangan di villa pribadi Anda di Bali. Dikelilingi oleh sawah yang hijau, villa ini menawarkan kolam renang pribadi dan desain arsitektur Bali yang otentik.",
        tag: "", tagClass: "",
        gallery: [ "villa.png" ]
    }
];

document.addEventListener('DOMContentLoaded', function() {
    
    // --- Inisialisasi Elemen ---
    const propertyContainer = document.querySelector('.property-container');
    const modalOverlay = document.getElementById('property-modal');
    const modalContent = modalOverlay.querySelector('.modal-content');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const body = document.body;
    const overlay = document.querySelector('.overlay');

    // ==========================================================
    // BAGIAN 1: FUNGSI MODAL & PEMBUATAN KARTU
    // ==========================================================
    function openModal(propertyId) {
        const property = propertyData.find(p => p.id === propertyId);
        if (!property) return;
        const slides = property.gallery.map(imgUrl => `<div class="swiper-slide"><img src="${imgUrl}" alt="Galeri ${property.title}"></div>`).join('');
        modalContent.innerHTML = `
            <button class="modal-close" id="modal-close-btn"><i class="fas fa-times"></i></button>
            <div class="modal-grid">
                <div class="modal-slider">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">${slides}</div>
                        <div class="swiper-button-next"></div><div class="swiper-button-prev"></div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
                <div class="modal-info">
                    <h2>${property.title}</h2>
                    <p class="modal-specs">${property.specs}</p>
                    <p class="modal-price">${property.price}</p>
                    <p class="modal-description">${property.description}</p>
                    <a href="#contact" class="btn btn-primary">Hubungi Agen</a>
                </div>
            </div>`;
        modalOverlay.classList.add('active');
        body.style.overflow = 'hidden';
        new Swiper('.swiper-container', {
            loop: true,
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        });
        document.getElementById('modal-close-btn').addEventListener('click', closeModal);
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        body.style.overflow = 'auto';
        modalContent.innerHTML = "";
    }

    function createPropertyCards() {
        if (!propertyContainer) return;
        propertyContainer.innerHTML = "";
        propertyData.forEach(prop => {
            const cardHTML = `
                <div class="property-card" data-aos="fade-up" data-aos-delay="${prop.id * 100}">
                    ${prop.tag ? `<span class="property-tag ${prop.tagClass}">${prop.tag}</span>` : ''}
                    <img src="${prop.gallery[0].replace('1200/800', '300/200')}" alt="${prop.title}">
                    <div class="card-content">
                        <h3>${prop.title}</h3>
                        <p>${prop.specs}</p>
                        <p class="price">${prop.price}</p>
                        <button class="btn btn-detail" data-id="${prop.id}">Detail</button>
                    </div>
                </div>`;
            propertyContainer.innerHTML += cardHTML;
        });
        document.querySelectorAll('.btn-detail').forEach(button => {
            button.addEventListener('click', () => openModal(parseInt(button.dataset.id)));
        });
    }
    
    createPropertyCards();
    modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

    // ==========================================================
    // BAGIAN 2: HAMBURGER MENU
    // ==========================================================
    if (hamburgerMenu) {
        const navLinks = mobileNav.querySelectorAll('a');
        function toggleMenu() {
            mobileNav.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        }
        hamburgerMenu.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
        navLinks.forEach(link => link.addEventListener('click', () => {
            if (mobileNav.classList.contains('active')) toggleMenu();
        }));
    }

    // ==========================================================
    // BAGIAN 3: SMOOTH SCROLL
    // ==========================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});