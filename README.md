# Jagganath Ji Ki Rasoi 🍛

A clean, modern, and fully responsive website designed for a local home-style vegetarian food service. Built entirely with pure HTML, CSS, and JavaScript (No external frameworks).

## 🌟 Features

- **Mobile-First Responsive Design:** Looks great on all devices (mobile, tablet, desktop).
- **Dynamic Menu System:** Menu items are loaded dynamically via JavaScript, making it incredibly easy to add new products in the future without touching the HTML.
- **Indian Food Theme:** Warm colors (orange, yellow, light brown) reflecting the cultural and traditional essence of Indian food.
- **Smooth Animations:** Fade-in animations on scroll and a custom image lightbox gallery.
- **WhatsApp Integration:** Direct "WhatsApp Order" buttons and a floating WhatsApp chat widget.
- **Customer Reviews:** Testimonials section showcasing local customer feedback.
- **Location & Contact:** Embedded Google Maps and clickable phone number links.

## 🛠️ Technologies Used

- **HTML5:** Semantic structure.
- **CSS3:** Custom styling, CSS Grid/Flexbox, and animations.
- **JavaScript (ES6):** DOM manipulation, dynamic product rendering, IntersectionObserver for scroll animations, and interactive elements (mobile menu, lightbox).
- **Google Fonts:** `Mukta` and `Poppins`.
- **FontAwesome:** For scalable vector icons.

## 🚀 How to Run

1. Simply download or clone this repository to your local machine.
2. Open the `index.html` file in any modern web browser (Chrome, Firefox, Edge, Safari).
3. No server or build process is required!

## 📝 How to Add New Products

Adding new items to your menu is very simple! You **do not** need to edit the `index.html` file. 

1. Open the `script.js` file.
2. At the very top, you will see an array named `products`.
3. Add a new product block inside the array following this format:

```javascript
{
    name: "Item Name",
    description: "A short description of your delicious food item.",
    image: "link_to_your_image.jpg"
}
```

### Example:

```javascript
const products = [
    // ... existing products ...
    {
        name: "Samosa",
        description: "Crispy fried pastry with a savory filling of spiced potatoes and peas.",
        image: "https://example.com/samosa.jpg"
    }
];
```
Save the file and refresh your browser. The new item will automatically appear in the "Our Menu" section!

## 📸 Adding Images to Gallery

Currently, gallery images are located in the `index.html` file under the `<section id="gallery">`. To change or add images, simply update the `<img>` tags in that section with your new image URLs.

---
*Developed for Jagganath Ji Ki Rasoi - शुद्धता, श्रद्धा और स्वाद का संगम*