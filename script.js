/**
 * KERA Portfolio - JavaScript
 * Handles gallery filtering, lazy loading, and interactions
 */

/**
 * SITE CONFIGURATION
 * Centralized control for categories and ads
 */
const SiteConfig = {
    categories: [
        { id: 'real-estate', name: 'Real Estate', iconClass: 'hgi-stroke hgi-building-01' },
        { id: 'restaurants', name: 'Restaurants', iconClass: 'hgi-stroke hgi-restaurant-table' },
        { id: 'fashion', name: 'Fashion', iconClass: 'hgi-stroke hgi-shirt-01' },
        { id: 'cars', name: 'Cars', iconClass: 'hgi-stroke hgi-car-01' },
        { id: 'ads', name: 'Ads', iconClass: 'hgi-stroke hgi-checkmark-badge-01' }
    ],
    ads: {
        heroAd: {
            enabled: false,
            title: 'Ads',
            description: '',
            iconClass: 'hgi-stroke hgi-checkmark-badge-01', // Specific icon for ad
            link: 'contact.html#special-offer'
        },
        galleryAd: {
            enabled: false,
            title: 'Sponsored Content',
            description: 'Partner with us',
            imageSrc: 'gallery/ad-placeholder.jpg', // Would need a real image
            link: 'contact.html'
        }
    }
};

// ===== GALLERY FILTERING SYSTEM =====
document.addEventListener('DOMContentLoaded', function () {

    // Render Dynamic Content
    renderHeroServices();
    renderGalleryFilters();
    injectGalleryAds();

    // Initialize gallery filtering if on gallery page
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryGrid = document.getElementById('galleryGrid');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        initGalleryFiltering();
    }

    // Initialize lazy loading with Intersection Observer
    initLazyLoading();

    // Initialize smooth scroll for anchor links
    initSmoothScroll();

    // Initialize mobile menu if needed
    // Initialize mobile menu if needed
    initMobileMenu();

    // Initialize sticky header observer
    initStickyObserver();
});

// ... existing functions ...

function initStickyObserver() {
    const sentinel = document.getElementById('filter-sentinel');
    const filterSection = document.querySelector('.filter-section');

    if (!sentinel || !filterSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                filterSection.classList.add('is-stuck');
            } else {
                filterSection.classList.remove('is-stuck');
            }
        });
    }, {
        threshold: 0
    });

    observer.observe(sentinel);
}


/**
 * Gallery Category Filtering
 * Client-side filtering with smooth animations
 */
function initGalleryFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryGrid = document.getElementById('galleryGrid');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const category = this.getAttribute('data-category');

            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Add filtering class for transition
            if (galleryGrid) {
                galleryGrid.classList.add('filtering');
            }

            // Filter gallery items with animation
            setTimeout(() => {
                filterGalleryItems(category, galleryItems);

                if (galleryGrid) {
                    galleryGrid.classList.remove('filtering');
                }
            }, 150);
        });
    });
}

/**
 * Filter gallery items based on category
 * @param {string} category - Category to filter by
 * @param {NodeList} items - Gallery items to filter
 */
function filterGalleryItems(category, items) {
    let visibleIndex = 0;

    items.forEach((item) => {
        const itemCategory = item.getAttribute('data-category');

        if (category === 'all' || itemCategory === category) {
            // Show item with stagger animation
            item.style.display = 'block';
            item.classList.remove('hidden');

            // Stagger animation delay
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, visibleIndex * 50);

            visibleIndex++;
        } else {
            // Hide item immediately
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.display = 'none';
            item.classList.add('hidden');
        }
    });

    // Reset pagination when filter changes
    if (typeof resetPagination === 'function') {
        resetPagination();
    }
}

/**
 * Lazy Loading Implementation using Intersection Observer
 * More performant than native loading="lazy" for complex layouts
 */
function initLazyLoading() {
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    // Load the image
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }

                    // Add loaded class for fade-in effect
                    img.classList.add('loaded');

                    // Stop observing this image
                    observer.unobserve(img);
                }
            });
        }, {
            // Load images 50px before they enter viewport
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // Observe all gallery images with data-src attribute OR .gallery-image class
        const lazyImages = document.querySelectorAll('img[data-src], .gallery-image');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Fallback: Images with loading="lazy" will work natively
    // Already implemented in HTML
}

/**
 * Smooth Scroll for Anchor Links
 * Enhances user experience for internal navigation
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only handle actual anchor links, not just "#"
            if (href && href !== '#') {
                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();

                    // Smooth scroll to target
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Update URL without jumping
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            }
        });
    });
}

/**
 * Mobile Menu Toggle
 * Responsive navigation for smaller screens
 */
/**
 * Mobile Menu Toggle
 * Responsive navigation for smaller screens
 */
function initMobileMenu() {
    // Create hamburger menu for mobile if nav exists
    const nav = document.querySelector('.navbar-custom');

    if (nav) {
        const navMenu = document.querySelector('.nav-menu');

        // Add mobile menu toggle button if it doesn't exist
        if (!document.querySelector('.mobile-menu-toggle')) {
            const menuToggle = document.createElement('button');
            menuToggle.classList.add('mobile-menu-toggle');
            menuToggle.innerHTML = '☰';
            menuToggle.setAttribute('aria-label', 'Toggle Menu');

            const brandLogo = document.querySelector('.brand-logo');
            if (brandLogo) {
                // Insert after logo
                brandLogo.parentNode.insertBefore(menuToggle, brandLogo.nextSibling);
            }

            // Toggle menu on click
            menuToggle.addEventListener('click', function () {
                navMenu.classList.toggle('active');
                this.classList.toggle('active');
                document.body.classList.toggle('no-scroll'); // Prevent background scrolling

                // Change icon
                this.innerHTML = this.classList.contains('active') ? '✕' : '☰';
            });

            // Close menu when clicking menu items
            const menuLinks = navMenu.querySelectorAll('a');
            menuLinks.forEach(link => {
                link.addEventListener('click', function () {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.innerHTML = '☰';
                    document.body.classList.remove('no-scroll');
                });
            });
        }
    }
}

/**
 * Image Preloader for Hero Image
 * Ensures hero image loads quickly
 */
function preloadHeroImage() {
    const heroImage = document.querySelector('.hero-image');

    if (heroImage && heroImage.src) {
        const img = new Image();
        img.src = heroImage.src;

        img.onload = function () {
            heroImage.classList.add('loaded');
        };
    }
}

// Preload hero image on page load
window.addEventListener('load', preloadHeroImage);

/**
 * Scroll to Top Functionality
 * Adds a "back to top" button when scrolling down
 */
function initScrollToTop() {
    // Create scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.classList.add('scroll-to-top');
    scrollButton.innerHTML = '↑';
    scrollButton.setAttribute('aria-label', 'Scroll to Top');
    document.body.appendChild(scrollButton);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    // Scroll to top on click
    scrollButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top on gallery page
if (window.location.pathname.includes('gallery')) {
    initScrollToTop();
}

/**
 * Gallery Item Click Handler
 * Prepares for future lightbox or modal functionality
 */
document.addEventListener('click', function (e) {
    const galleryCard = e.target.closest('.gallery-card');

    if (galleryCard) {
        // Get image source
        const img = galleryCard.querySelector('.gallery-image');
        const category = galleryCard.closest('.gallery-item')?.getAttribute('data-category');

        if (img) {
            // Log for now - can add lightbox/modal later
            console.log('Gallery item clicked:', {
                src: img.src,
                alt: img.alt,
                category: category
            });

            // Future: Open lightbox/modal with image
            // openLightbox(img.src, img.alt);
        }
    }
});

/**
 * Performance Optimization: Debounce Function
 * Limits the rate at which a function can fire
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Window Resize Handler
 * Handles responsive adjustments
 */
const handleResize = debounce(function () {
    // Adjust layout if needed on resize
    const galleryGrid = document.querySelector('.gallery-grid');

    if (galleryGrid) {
        // Force reflow for masonry-like layouts
        galleryGrid.style.opacity = '0.99';
        setTimeout(() => {
            galleryGrid.style.opacity = '1';
        }, 50);
    }
}, 250);

window.addEventListener('resize', handleResize);

/**
 * Add CSS for dynamic elements
 */


/**
 * Console message for developers
 */
console.log('%c Built with HTML, CSS, JavaScript & Bootstrap 5 ', 'background: #0d0d0d; color: white; font-size: 12px; padding: 4px 8px;');


/**
 * REELS/HIGHLIGHTS FEATURE
 * Dynamic rendering of video showcases
 */

const reelsData = [
    {
        id: 'reel-ale',
        thumbnailSrc: 'gallery/reel-thumb-1.jpg',
        videoLink: 'video/ale-1.mp4',
        viewCount: '1.2M',
        isFeatured: true,
        brandLogo: 'logos/banu.png',
        description: 'Brand showcase video featuring dynamic product presentation'
    },
    {
        id: 'reel-auto',
        thumbnailSrc: 'gallery/reel-thumb-2.jpg',
        videoLink: 'video/autocarservice-1.mp4',
        viewCount: '850K',
        isFeatured: true,
        brandLogo: 'logos/fofy.png',
        description: 'Automotive service promotional content'
    },
    {
        id: 'reel-cm',
        thumbnailSrc: 'gallery/reel-thumb-3.jpg',
        videoLink: 'video/cm-1.mp4',
        viewCount: '2.1M',
        isFeatured: true,
        brandLogo: 'logos/never_enough.png',
        description: 'Creative marketing campaign highlight'
    },
    {
        id: 'reel-ne',
        thumbnailSrc: 'gallery/reel-thumb-4.jpg',
        videoLink: 'video/ne-1.mp4',
        viewCount: '500K',
        isFeatured: true,
        brandLogo: 'logos/privo.png',
        description: 'Product launch teaser and brand storytelling'
    },
    {
        id: 'reel-tur1',
        thumbnailSrc: 'gallery/reel-thumb-5.jpg',
        videoLink: 'video/tur-1.mp4',
        viewCount: '1.8M',
        isFeatured: false,
        brandLogo: 'logos/rueffect.png',
        description: 'Social media content series - Episode 1'
    },
    {
        id: 'reel-tur2',
        thumbnailSrc: 'gallery/reel-thumb-6.jpg',
        videoLink: 'video/tur-2.mp4',
        viewCount: '920K',
        isFeatured: false,
        brandLogo: 'logos/banu.png',
        description: 'Behind the scenes brand collaboration'
    },
    {
        id: 'reel-tur3',
        thumbnailSrc: 'gallery/reel-thumb-6.jpg',
        videoLink: 'video/tur-3.mp4',
        viewCount: '750K',
        isFeatured: false,
        brandLogo: 'logos/fofy.png',
        description: 'Seasonal campaign promotional video'
    }
];

/**
 * Render Reels Card
 * @param {Object} reel - Reel data object
 * @returns {string} - HTML string for the reel card
 */
function createReelCard(reel) {
    return `
        <div class="reel-card" onclick="openReelModal('${reel.videoLink}')">
            <video 
                src="${reel.videoLink}#t=0.001" 
                class="reel-thumbnail" 
                muted 
                loop 
                playsinline
                preload="metadata"
                onmouseover="this.play()"
                onmouseout="this.pause();this.currentTime=0;"
            ></video>
            
            <div class="reel-overlay">
                <div class="play-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5V19L19 12L8 5Z" fill="white"/>
                    </svg>
                </div>
                
                <div class="view-count">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span>${reel.viewCount}</span>
                </div>
            </div>
        </div>
    `;
}

/**
 * Render Reels to Container
 * @param {string} containerId - ID of the container element
 * @param {boolean} onlyFeatured - Whether to show only featured reels
 */
function renderReels(containerId, onlyFeatured = false) {
    const container = document.getElementById(containerId);

    if (!container) return; // Exit if container doesn't exist on this page

    const filteredReels = onlyFeatured
        ? reelsData.filter(reel => reel.isFeatured)
        : reelsData;

    container.innerHTML = filteredReels.map(createReelCard).join('');
}

/**
 * REELS LIGHTBOX FUNCTIONS
 */

let currentReelIndex = 0;
let allReelsForModal = [];

function createLightbox() {
    if (document.querySelector('.reel-lightbox')) return; // Already exists

    const lightboxHTML = `
        <div class="reel-lightbox" id="reelLightbox">
            <div class="lightbox-close" onclick="closeReelModal()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
            
            <!-- Navigation Arrows (Desktop) -->
            <div class="nav-arrow nav-arrow-left" id="navArrowLeft" onclick="navigateReel(-1)">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </div>
            <div class="nav-arrow nav-arrow-right" id="navArrowRight" onclick="navigateReel(1)">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </div>
            
            <div class="lightbox-content">
                <video class="lightbox-video" id="lightboxPlayer" controls playsinline></video>
            </div>
            
            <!-- Video Metadata (Below Video) -->
            <div class="video-metadata" id="videoMetadata">
                <img src="" alt="Brand Logo" class="brand-logo-lightbox" id="brandLogoLightbox">
                <p class="video-description" id="videoDescription"></p>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    const lightbox = document.getElementById('reelLightbox');

    // Close on background click
    lightbox.addEventListener('click', function (e) {
        if (e.target === this) closeReelModal();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'ArrowLeft') navigateReel(-1);
        else if (e.key === 'ArrowRight') navigateReel(1);
        else if (e.key === 'Escape') closeReelModal();
    });

    // Touch/Swipe support for mobile (vertical swipe)
    let touchStartY = 0;
    let touchEndY = 0;

    lightbox.addEventListener('touchstart', function (e) {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    lightbox.addEventListener('touchend', function (e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped up - next video
                navigateReel(1);
            } else {
                // Swiped down - previous video
                navigateReel(-1);
            }
        }
    }
}

function openReelModal(videoSrc) {
    const lightbox = document.getElementById('reelLightbox');
    const player = document.getElementById('lightboxPlayer');

    if (lightbox && player) {
        // Find the index of the clicked video
        currentReelIndex = reelsData.findIndex(reel => reel.videoLink === videoSrc);
        allReelsForModal = reelsData;

        const currentReel = allReelsForModal[currentReelIndex];

        player.src = videoSrc;
        lightbox.classList.add('active');
        document.body.classList.add('no-scroll');
        player.play().catch(e => console.log('Autoplay prevented:', e));

        // Update metadata
        updateVideoMetadata(currentReel);
        updateNavigationArrows();
    }
}

function updateVideoMetadata(reel) {
    const brandLogo = document.getElementById('brandLogoLightbox');
    const description = document.getElementById('videoDescription');

    if (brandLogo && description) {
        brandLogo.src = reel.brandLogo;
        brandLogo.alt = `${reel.id} brand logo`;
        description.textContent = reel.description;
    }
}

function navigateReel(direction) {
    const newIndex = currentReelIndex + direction;

    // Check bounds
    if (newIndex < 0 || newIndex >= allReelsForModal.length) return;

    currentReelIndex = newIndex;
    const currentReel = allReelsForModal[currentReelIndex];
    const player = document.getElementById('lightboxPlayer');

    if (player) {
        player.src = currentReel.videoLink;
        player.play().catch(e => console.log('Autoplay prevented:', e));
    }

    updateVideoMetadata(currentReel);
    updateNavigationArrows();
}

function updateNavigationArrows() {
    const leftArrow = document.getElementById('navArrowLeft');
    const rightArrow = document.getElementById('navArrowRight');

    if (leftArrow && rightArrow) {
        // Hide left arrow if at first video
        leftArrow.style.display = currentReelIndex === 0 ? 'none' : 'flex';

        // Hide right arrow if at last video
        rightArrow.style.display = currentReelIndex === allReelsForModal.length - 1 ? 'none' : 'flex';
    }
}

function closeReelModal() {
    const lightbox = document.getElementById('reelLightbox');
    const player = document.getElementById('lightboxPlayer');

    if (lightbox && player) {
        lightbox.classList.remove('active');
        document.body.classList.remove('no-scroll');
        player.pause();
        player.currentTime = 0;
        player.src = '';
        currentReelIndex = 0;
    }
}


// Initialize Reels and Lightbox on load
document.addEventListener('DOMContentLoaded', function () {
    createLightbox(); // Inject modal
    renderReels('featured-reels', false);   // For Index Page (Show All)
    renderReels('all-reels', false);       // For Gallery/Projects Page
});

/**
 * DYNAMIC RENDERING FUNCTIONS
 */

function renderHeroServices() {
    const grid = document.querySelector('.services-grid');
    if (!grid) return;

    let html = '';

    // 1. Inject Hero Ad (First Card) if enabled
    if (SiteConfig.ads.heroAd.enabled) {
        const ad = SiteConfig.ads.heroAd;
        html += `
            <div class="service-item ad-card">
                <i class="${ad.iconClass} service-icon" style="color: var(--primary-light);"></i>
                <p class="service-name">${ad.title}</p>
                 <span style="font-size: 0.75rem; opacity: 0.7; margin-top: 5px;">${ad.description}</span>
            </div>
        `;
    }

    // 2. Render Categories
    SiteConfig.categories.forEach(cat => {
        html += `
            <a href="gallery.html?category=${cat.slug}" class="service-item" style="text-decoration: none; color: inherit;">
                <i class="${cat.iconClass} service-icon"></i>
                <p class="service-name">${cat.name}</p>
            </a>
        `;
    });

    grid.innerHTML = html;

    // Adjust grid columns via CSS variable for responsiveness
    const itemCount = (SiteConfig.ads.heroAd.enabled ? 1 : 0) + SiteConfig.categories.length;
    grid.style.setProperty('--col-count', itemCount);
    grid.style.maxWidth = `${itemCount * 220}px`; // Approximate width scaling
}

function renderGalleryFilters() {
    const filterContainer = document.querySelector('.filter-tabs');
    if (!filterContainer) return;

    const allIcon = 'hgi-stroke hgi-grid-view'; // Default icon for "All"
    let html = `<button class="filter-btn active" data-category="all"><i class="${allIcon}"></i> All</button>`;

    SiteConfig.categories.forEach(cat => {
        html += `<button class="filter-btn" data-category="${cat.id}"><i class="${cat.iconClass}"></i> ${cat.name}</button>`;
    });

    filterContainer.innerHTML = html;

    // Auto-select category from URL parameter
    autoSelectFilterFromURL();

    // Re-initialize filtering logic after dynamic insertion
    initGalleryFiltering();
}

function injectGalleryAds() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid || !SiteConfig.ads.galleryAd.enabled) return;

    // Check if ad already exists to differ repeated calls
    if (galleryGrid.querySelector('.gallery-ad-card')) return;

    const ad = SiteConfig.ads.galleryAd;
    const adHTML = `
        <div class="col-lg-4 col-md-6 gallery-item gallery-ad-card" data-category="all">
            <div class="gallery-card">
                <div class="gallery-image-container" style="background: rgba(255,255,255,0.05); border: 1px dashed rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; height: 100%;">
                    <img src="${ad.imageSrc}" alt="${ad.title}" class="gallery-image" style="opacity: 0.3; filter: grayscale(1);">
                </div>
                <div class="gallery-content">
                    <div class="gallery-header-row">
                        <div class="gallery-text">
                            <h3 class="gallery-item-title">${ad.title}</h3>
                        </div>
                        <a href="${ad.link}" class="gallery-arrow-btn">
                            <i class="hgi-stroke hgi-link-external-01"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Inject as the first item (or could be random)
    galleryGrid.insertAdjacentHTML('afterbegin', adHTML);
}

// ===== SCROLL TO TOP BUTTON =====
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top smoothly when clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== AUTO-SELECT FILTER FROM URL =====
function autoSelectFilterFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');

    if (categoryParam) {
        // Find the matching filter button
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            const btnCategory = btn.getAttribute('data-category');

            // Match slug to category ID
            const matchingCat = SiteConfig.categories.find(cat => cat.slug === categoryParam);
            if (matchingCat && btnCategory === matchingCat.id) {
                // Remove active from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Activate the matching button
                btn.classList.add('active');
                // Trigger the filter
                btn.click();
            }
        });
    }
}

// ===== GALLERY PAGINATION =====
let itemsPerPage = 6;
let currentPage = 1;

function initGalleryPagination() {
    const showMoreBtn = document.getElementById('showMoreBtn');
    const showMoreContainer = document.getElementById('showMoreContainer');

    if (!showMoreBtn) return;

    showMoreBtn.addEventListener('click', loadMoreItems);

    // Initial display
    updateGalleryDisplay();
}

function updateGalleryDisplay() {
    const allItems = Array.from(document.querySelectorAll('.gallery-item'));
    const visibleItems = allItems.filter(item => !item.classList.contains('hidden'));
    const showMoreContainer = document.getElementById('showMoreContainer');

    // Hide all visible items first
    visibleItems.forEach(item => item.style.display = 'none');

    // Show only the items for current page
    const itemsToShow = visibleItems.slice(0, currentPage * itemsPerPage);
    itemsToShow.forEach(item => item.style.display = 'block');

    // Show or hide the Show More button
    if (showMoreContainer) {
        if (visibleItems.length <= currentPage * itemsPerPage) {
            showMoreContainer.classList.add('hidden');
        } else {
            showMoreContainer.classList.remove('hidden');
        }
    }
}

function loadMoreItems() {
    currentPage++;
    updateGalleryDisplay();
}

function resetPagination() {
    currentPage = 1;
    updateGalleryDisplay();
}

// Initialize pagination when DOM is loaded
if (document.querySelector('.gallery-grid')) {
    initGalleryPagination();
}
