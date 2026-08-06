// ==================== DATE & TIME ==================== 
function updateDateTime() {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'Asia/Jakarta'
    };
    
    const date = new Date();
    const indonesianDate = new Intl.DateTimeFormat('id-ID', options).format(date);
    
    // Capitalize first letter
    const formattedDate = indonesianDate.charAt(0).toUpperCase() + indonesianDate.slice(1);
    
    document.getElementById('dateTime').textContent = formattedDate;
}

// ==================== SEARCH FUNCTIONALITY ==================== 
document.querySelector('.search-btn').addEventListener('click', function() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim();
    
    if (query) {
        console.log('Searching for:', query);
        // Implementasi search dapat ditambahkan di sini
        alert('Pencarian untuk: ' + query);
    }
});

document.querySelector('.search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.querySelector('.search-btn').click();
    }
});

// ==================== SUBSCRIBE BUTTON ==================== 
document.querySelector('.subscribe-btn').addEventListener('click', function() {
    console.log('Subscribe button clicked');
    alert('Terima kasih! Anda akan menerima notifikasi berita terbaru.');
});

// ==================== NEWSLETTER FORM ==================== 
document.querySelector('.newsletter-btn').addEventListener('click', function() {
    const emailInput = document.querySelector('.newsletter-input');
    const email = emailInput.value.trim();
    
    if (email && validateEmail(email)) {
        console.log('Newsletter signup:', email);
        alert('Email ' + email + ' telah terdaftar untuk newsletter.');
        emailInput.value = '';
    } else {
        alert('Silakan masukkan email yang valid.');
    }
});

// ==================== EMAIL VALIDATION ==================== 
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ==================== SMOOTH SCROLL ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== NAVIGATION ACTIVE STATE ==================== 
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
       // e.preventDefault();
        
        document.querySelectorAll('.nav-link').forEach(l => {
            l.style.borderBottomColor = 'transparent';
        });
        
        this.style.borderBottomColor = '#ffc107';
    });
});

// ==================== ARTICLE CARD INTERACTIONS ==================== 
document.querySelectorAll('.news-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ==================== READ MORE BUTTONS ==================== 
document.querySelectorAll('.btn-read-more, .btn-read').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Read more clicked');
        alert('Fitur baca selengkapnya akan membuka artikel lengkap.');
    });
});

// ==================== CATEGORY LINKS ==================== 
document.querySelectorAll('.kategori-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const categoryName = this.querySelector('span').textContent;
        console.log('Kategori dipilih:', categoryName);
        alert('Menampilkan berita kategori: ' + categoryName);
    });
});

// ==================== SOCIAL MEDIA LINKS ==================== 
document.querySelectorAll('.social-icons a, .footer-social a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Social link clicked');
        // Implementasi navigasi ke social media
    });
});

// ==================== TRENDING ITEM CLICKS ==================== 
document.querySelectorAll('.trending-item').forEach(item => {
    item.addEventListener('click', function() {
        const title = this.querySelector('h4').textContent;
        console.log('Trending article clicked:', title);
        alert('Membuka artikel: ' + title);
    });
    
    item.style.cursor = 'pointer';
    item.addEventListener('mouseenter', function() {
        this.style.opacity = '0.7';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.opacity = '1';
    });
});

// ==================== POPULAR ARTICLE CLICKS ==================== 
document.querySelectorAll('.popular-article').forEach(article => {
    article.addEventListener('click', function(e) {
        e.preventDefault();
        const title = this.querySelector('h4').textContent;
        console.log('Popular article clicked:', title);
        alert('Membuka artikel populer: ' + title);
    });
});

// ==================== FOOTER LINK CLICKS ==================== 
document.querySelectorAll('.footer-section a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const text = this.textContent;
        console.log('Footer link clicked:', text);
        alert('Navigasi ke halaman: ' + text);
    });
});

// ==================== RESPONSIVE MENU ==================== 
function setupResponsiveMenu() {
    if (window.innerWidth <= 768) {
        // Implementasi menu mobile jika diperlukan
        console.log('Mobile view activated');
    }
}

function setupFrontOfficeCarousel() {
    const carousel = document.querySelector('.front-office-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const prevButton = carousel.querySelector('.carousel-btn.prev');
    const nextButton = carousel.querySelector('.carousel-btn.next');
    const dots = Array.from(document.querySelectorAll('.carousel-dot'));

    if (!track || slides.length === 0) return;

    let currentIndex = 0;

    function updateCarousel(index) {
        currentIndex = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === currentIndex);
        });
    }

    prevButton?.addEventListener('click', () => updateCarousel(currentIndex - 1));
    nextButton?.addEventListener('click', () => updateCarousel(currentIndex + 1));
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => updateCarousel(index));
    });

    updateCarousel(0);
    setInterval(() => updateCarousel(currentIndex + 1), 5000);
}

window.addEventListener('resize', setupResponsiveMenu);

// ==================== KEYBOARD SHORTCUTS ==================== 
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K untuk focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('.search-input').focus();
    }
    
    // Escape untuk blur search
    if (e.key === 'Escape') {
        document.activeElement.blur();
    }
});

// ==================== INITIALIZATION ==================== 
document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    setupResponsiveMenu();
    setupFrontOfficeCarousel();
    
    // Update time every minute
    setInterval(updateDateTime, 60000);
    
    console.log('KemenagNews website loaded successfully!');
});

// ==================== LAZY LOADING SIMULATION ==================== 
function setupLazyLoading() {
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '1';
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.style.opacity = '0.7';
            imageObserver.observe(img);
        });
    }
}

// ==================== SCROLL ANIMATION ==================== 
function setupScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            }
        });
    });
    
    document.querySelectorAll('.news-card, .news-grid article, .kategori-item').forEach(el => {
        observer.observe(el);
    });
}

// ==================== ANIMATIONS ==================== 
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize animations on load
window.addEventListener('load', function() {
    setupLazyLoading();
    setupScrollAnimation();
});
