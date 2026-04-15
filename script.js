// ==========================================
// 🍔 PRODUCT DATA (Add future products here)
// ==========================================
const products = [
    {
        name: "Pani Puri",
        description: "Crispy hollow puris filled with spicy, tangy water and potatoes.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Chole Tikki",
        description: "Spicy chickpea curry served over crispy potato patties.",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Desi Burger",
        description: "Delicious veg patty inside a soft bun with creamy sauces and fresh veggies.",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Pav Bhaji",
        description: "A spicy blend of mashed vegetables served with butter-toasted bread.",
        image: "https://images.unsplash.com/photo-1606491956391-70868b5d0f47?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Tiffin Service",
        description: "Wholesome, home-style daily meals delivered right to your doorstep.",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Evening Snacks",
        description: "Assorted traditional Indian snacks, perfect with your evening tea.",
        image: "https://images.unsplash.com/photo-1599487405702-00aae808c286?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Render Products Dynamically
    const menuGrid = document.getElementById('menu-grid');
    if (menuGrid) {
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'menu-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="card-content">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                </div>
            `;
            menuGrid.appendChild(card);
        });
    }

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    
    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        if (navList.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-list li a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Sticky Navbar on Scroll
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for anchor links (fallback for browsers that don't support scroll-behavior: smooth)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lightbox for Gallery
    const galleryImages = document.querySelectorAll('.gallery-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src;
            document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close lightbox on clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close lightbox on pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Intersection Observer for Fade-in Animations
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});
