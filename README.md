# KERA Portfolio Website

A pixel-perfect, fully responsive portfolio website built with HTML, CSS, JavaScript, and Bootstrap 5.

## 🎨 Design Reference

This website is a pixel-perfect recreation of the provided reference design, featuring:
- Modern gradient hero section
- Clean typography and spacing
- Smooth animations and transitions
- Professional color scheme (Orange/Coral gradient with dark backgrounds)
- Fully responsive layout (desktop-first approach)

## 📁 Project Structure

```
KERA/
├── index.html          # Landing page
├── gallery.html        # Gallery with category filtering
├── style.css           # All custom styles
├── script.js           # JavaScript functionality
├── gallery/            # Image assets folder
│   ├── hero-banner.jpg          # Hero section horizontal image
│   ├── car-1.jpg, car-2.jpg...  # Car category images
│   ├── realestate-1.jpg...      # Real estate category images
│   ├── restaurant-1.jpg...      # Restaurant category images
│   ├── fashion-1.jpg...         # Fashion category images
│   └── ads-1.jpg...             # Ads category images
└── README.md           # This file
```

## 🖼️ Image Requirements

### Expected Images in `/gallery` folder:

1. **Hero Banner** (Horizontal format)
   - `hero-banner.jpg` - Main hero image (recommended: 1920x800px)

2. **Cars Category** (Vertical format)
   - `car-1.jpg`, `car-2.jpg`, `car-3.jpg`, `car-4.jpg`

3. **Real Estate Category** (Vertical format)
   - `realestate-1.jpg`, `realestate-2.jpg`, `realestate-3.jpg`, `realestate-4.jpg`

4. **Restaurants Category** (Vertical format)
   - `restaurant-1.jpg`, `restaurant-2.jpg`, `restaurant-3.jpg`, `restaurant-4.jpg`

5. **Fashion Category** (Vertical format)
   - `fashion-1.jpg`, `fashion-2.jpg`, `fashion-3.jpg`, `fashion-4.jpg`

6. **Ads Category** (Vertical format)
   - `ads-1.jpg`, `ads-2.jpg`, `ads-3.jpg`, `ads-4.jpg`

**Recommended dimensions for vertical images:** 800x1200px or similar 2:3 ratio

## ✨ Features

### Index Page (Landing)
- Hero section with gradient background
- Navigation bar with CTA button
- Services grid (4 items)
- Trusted brands showcase
- "Behind the Designs" section
- Gallery preview (3 images)
- Footer with links and social media

### Gallery Page
- Category filtering system (All, Cars, Real Estate, Restaurants, Fashion, Ads)
- Responsive grid layout
- Smooth filter animations
- Hover effects on images
- Lazy loading for optimal performance

### Technical Features
- ✅ Fully responsive (desktop-first)
- ✅ Native lazy loading (`loading="lazy"`)
- ✅ Intersection Observer for advanced lazy loading
- ✅ Smooth scroll behavior
- ✅ Client-side category filtering
- ✅ Mobile-friendly navigation
- ✅ Accessibility features (ARIA labels, focus states)
- ✅ Performance optimized
- ✅ Clean, commented code
- ✅ Video-ready structure (can easily add videos to gallery)

## 🚀 How to Use

1. **Add Your Images**
   - Place all your images in the `/gallery` folder
   - Follow the naming convention: `category-number.jpg`
   - Ensure you have a `hero-banner.jpg` for the main hero section

2. **Open in Browser**
   - Simply open `index.html` in any modern web browser
   - No build process or server required

3. **Customize Content**
   - Edit HTML files to change text content
   - Modify `style.css` to adjust colors, fonts, or spacing
   - Update `script.js` for additional functionality

## 🎨 Color Palette

```css
--primary-orange: #FF6B4A
--primary-coral: #FF7F66
--primary-dark: #0d0d0d
--secondary-dark: #1a1a1a
--text-light: #ffffff
--text-gray: #b3b3b3
```

## 📱 Responsive Breakpoints

- Desktop: 1200px and above
- Tablet: 768px - 1199px
- Mobile: 767px and below

## 🔧 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)** - Vanilla JS for interactivity
- **Bootstrap 5** - Grid system and responsiveness only
- **Intersection Observer API** - Advanced lazy loading

## 📝 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Performance Features

1. **Lazy Loading**: Images load only when needed
2. **Optimized Animations**: Hardware-accelerated CSS transitions
3. **Debounced Resize Handlers**: Prevents performance issues
4. **Minimal Dependencies**: Bootstrap only for grid system

## 🔮 Future Enhancements Ready

The code structure supports easy addition of:
- Video gallery items
- Lightbox/modal for full-screen image viewing
- More categories
- Contact form functionality
- Blog section
- CMS integration

## 📄 File Details

### HTML Files
- **index.html**: Landing page with hero, services, and preview
- **gallery.html**: Full gallery with filtering

### CSS File
- **style.css**: All custom styles (700+ lines)
  - CSS Variables for easy theming
  - Mobile-first responsive design
  - Smooth animations and transitions
  - Accessibility features

### JavaScript File
- **script.js**: All functionality (350+ lines)
  - Gallery filtering
  - Lazy loading
  - Smooth scroll
  - Mobile menu
  - Performance optimizations

## 💡 Tips

1. Use high-quality images (but optimize file sizes)
2. Maintain consistent aspect ratios for best results
3. Test on multiple devices and browsers
4. Add more images by following the naming convention
5. Customize colors using CSS variables in `:root`

## 📞 Support

For questions or issues:
- Check HTML comments in the code
- Review JavaScript console messages
- Validate HTML/CSS using W3C validators

---

**Built with care for KERA Portfolio**
*Version 1.0 - January 2026*
