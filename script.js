// ==========================================
// 🍔 PRODUCT DATA (Add future products here)
// ==========================================
const products = [
    { name: "Burger", price: 50, description: "Delicious veg patty inside a soft bun with creamy sauces.", image: "https://images.pexels.com/photos/31450802/pexels-photo-31450802.jpeg" },
    { name: "Vada Pav", price: 30, description: "Classic Mumbai street food, spicy potato filling in soft bread.", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { name: "Dahi Bhalle", price: 50, description: "Soft lentil fritters soaked in creamy yogurt and chutneys.", image: "https://images.pexels.com/photos/9213253/pexels-photo-9213253.jpeg" },
    { name: "Dahi Tikki", price: 50, description: "Crispy potato patties topped with sweet yogurt and spices.", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { name: "Chole Tikki", price: 50, description: "Spicy chickpea curry served over crispy potato patties.", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { name: "Ram Ladoo", price: 50, description: "Moong dal fritters topped with grated radish and tangy chutney.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { name: "Appe", price: 50, description: "South Indian snack made from fermented batter, crispy outside and soft inside.", image: "https://images.unsplash.com/photo-1606491956391-70868b5d0f47?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { name: "Bhelpuri", price: 30, description: "Savory snack made of puffed rice, vegetables and tangy tamarind sauce.", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { name: "Sev Puri", price: 50, description: "Crispy flat puris loaded with diced potatoes, onions, chutneys and sev.", image: "https://images.unsplash.com/photo-1599487405702-00aae808c286?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { name: "Fried Idli", price: 50, description: "Leftover idlis cut and fried with spices for a delicious twist.", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { name: "Chole Kulche", price: 50, description: "Spicy and tangy chole served with soft and fluffy kulchas.", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" }
];

let cart = JSON.parse(localStorage.getItem('rasoi_cart')) || [];

function updateCartCount() {
    // Re-fetch cart from localStorage to ensure it's up to date across tabs/pages
    cart = JSON.parse(localStorage.getItem('rasoi_cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Attempt to update by class first
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
    });
    
    // Also attempt to update by ID in case any page still uses id="cart-count"
    const idEl = document.getElementById('cart-count');
    if (idEl) {
        idEl.textContent = count;
    }
}

// Add a storage event listener so if cart is updated in one tab, other tabs update instantly
window.addEventListener('storage', (e) => {
    if (e.key === 'rasoi_cart') {
        updateCartCount();
        if (typeof renderCart === 'function' && document.getElementById('cart-items')) {
            renderCart();
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Render Products Dynamically
    const menuGrid = document.getElementById('menu-grid');
    if (menuGrid) {
        products.forEach((product, index) => {
            const card = document.createElement('div');
            card.className = 'menu-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="card-content">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px;">
                        <span style="font-weight:bold; color:var(--primary-color);">₹${product.price}</span>
                        <button class="btn btn-primary add-to-cart" data-index="${index}" style="padding: 8px 15px; font-size: 0.9rem;">Add to Cart</button>
                    </div>
                </div>
            `;
            menuGrid.appendChild(card);
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                const product = products[index];
                addToCart(product);
            });
        });
    }

    function addToCart(product) {
        const existingItem = cart.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('rasoi_cart', JSON.stringify(cart));
        updateCartCount();
        showToast(`${product.name} added to cart!`);
    }

    let toastTimeout;

    function showToast(message) {
        let toast = document.getElementById('toast-notification');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast-notification';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.className = 'toast show';
        
        clearTimeout(toastTimeout);
        // Remove class after 2 seconds
        toastTimeout = setTimeout(() => {
            toast.className = 'toast';
        }, 2000);
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

    if (lightbox && closeLightbox) {
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
    }

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

    // --- Order Page Logic ---
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        renderCart();

        document.getElementById('cust-area').addEventListener('change', updateTotals);

        document.getElementById('location-btn').addEventListener('click', () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    document.getElementById('cust-location').value = `https://maps.google.com/?q=${lat},${lon}`;
                    document.getElementById('location-status').style.display = 'block';
                }, error => {
                    alert("Error capturing location. Please allow location access.");
                });
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        });

        document.getElementById('checkout-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }

            const name = document.getElementById('cust-name').value;
            const age = document.getElementById('cust-age').value;
            const phone = document.getElementById('cust-phone').value;
            const area = document.getElementById('cust-area').value;
            const location = document.getElementById('cust-location').value;
            
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const deliveryCharge = area === 'paid' ? 30 : 0;
            const total = subtotal + deliveryCharge;

            let orderDetails = `*New Order from Jagganath Ji Ki Rasoi*%0A%0A`;
            orderDetails += `*Customer Details:*%0A`;
            orderDetails += `- Name: ${name}%0A`;
            orderDetails += `- Age: ${age}%0A`;
            orderDetails += `- Phone: ${phone}%0A`;
            orderDetails += `- Delivery Area: ${area === 'free' ? 'Within 2-3 km' : 'Beyond 3 km'}%0A`;
            if (location) {
                orderDetails += `- Live Location: ${location}%0A`;
            }
            
            orderDetails += `%0A*Order Items:*%0A`;
            cart.forEach(item => {
                orderDetails += `- ${item.name} x${item.quantity} (₹${item.price * item.quantity})%0A`;
            });
            
            orderDetails += `%0A*Bill Summary:*%0A`;
            orderDetails += `Subtotal: ₹${subtotal}%0A`;
            orderDetails += `Delivery Charge: ₹${deliveryCharge}%0A`;
            orderDetails += `*Total Amount: ₹${total}*`;

            const whatsappUrl = `https://wa.me/919034713457?text=${orderDetails}`;
            window.open(whatsappUrl, '_blank');
            
            // Clear cart after order
            cart = [];
            localStorage.setItem('rasoi_cart', JSON.stringify(cart));
            updateCartCount();
            renderCart();
        });
    }

    function renderCart() {
        if (cart.length === 0) {
            document.getElementById('cart-items').innerHTML = '';
            document.getElementById('empty-cart-msg').style.display = 'block';
            document.getElementById('cart-summary').style.display = 'none';
            document.getElementById('checkout-form').style.display = 'none';
            return;
        }

        document.getElementById('empty-cart-msg').style.display = 'none';
        document.getElementById('cart-summary').style.display = 'block';
        document.getElementById('checkout-form').style.display = 'flex';

        let html = '';
        cart.forEach((item, index) => {
            html += `
                <div class="cart-item">
                    <div>
                        <h4>${item.name}</h4>
                        <p style="margin:0; font-size:0.9rem; color:#555;">₹${item.price} x ${item.quantity}</p>
                    </div>
                    <div class="cart-item-controls">
                        <button onclick="updateQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${index}, 1)">+</button>
                        <button onclick="removeItem(${index})" style="background:red; margin-left:10px;"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
        });
        document.getElementById('cart-items').innerHTML = html;
        updateTotals();
    }

    window.updateQuantity = function(index, change) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        localStorage.setItem('rasoi_cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
    };

    window.removeItem = function(index) {
        cart.splice(index, 1);
        localStorage.setItem('rasoi_cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
    };

    function updateTotals() {
        if (!document.getElementById('cart-subtotal')) return;
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const area = document.getElementById('cust-area').value;
        const deliveryCharge = area === 'paid' ? 30 : 0;
        
        document.getElementById('cart-subtotal').textContent = subtotal;
        document.getElementById('delivery-charge').textContent = deliveryCharge;
        document.getElementById('cart-total').textContent = subtotal + deliveryCharge;
    }
});
