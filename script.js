document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const form = document.getElementById('quoteForm');

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Form Submission → WhatsApp
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name    = form.querySelector('input[type="text"]').value.trim();
            const email   = form.querySelector('input[type="email"]').value.trim();
            const phone   = form.querySelector('input[type="tel"]').value.trim();
            const message = form.querySelector('textarea').value.trim();

            // Format message
            const waText = 
`Hello VS Square! 👋

*New Enquiry from Website*

👤 *Name:* ${name}
📧 *Email:* ${email}
📞 *Phone:* ${phone}

📝 *Requirements:*
${message}

Please get back to me at the earliest. Thank you!`;

            // WhatsApp number (Sathish Kumar: +91 63833 63702)
            const waNumber = '916383363702';
            const waURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;

            // Open WhatsApp
            window.open(waURL, '_blank');

            // Reset form
            form.reset();
        });
    }

    // Reveal animations on scroll (Classical 3D Move)
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .contact-info, .contact-form, .image-placeholder, .gallery-item, .founder-card, .timeline-content'
    );

    elementsToAnimate.forEach(el => {
        el.classList.add('reveal-3d');
        observer.observe(el);
    });

    // Lightbox Gallery Viewer Implementation
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        // Create Lightbox Markup dynamically
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-modal';
        lightbox.innerHTML = `
            <button class="lightbox-btn lightbox-close" aria-label="Close Gallery">&times;</button>
            <button class="lightbox-btn lightbox-prev" aria-label="Previous Image">&#10094;</button>
            <div class="lightbox-content">
                <img src="" alt="Full uPVC Installation View">
                <div class="lightbox-caption"></div>
            </div>
            <button class="lightbox-btn lightbox-next" aria-label="Next Image">&#10095;</button>
        `;
        document.body.appendChild(lightbox);

        const imgElement = lightbox.querySelector('img');
        const captionElement = lightbox.querySelector('.lightbox-caption');
        let currentIndex = 0;

        const updateLightbox = (index) => {
            const currentItem = galleryItems[index];
            const img = currentItem.querySelector('img');
            const captionText = currentItem.querySelector('.gallery-overlay span') ? currentItem.querySelector('.gallery-overlay span').textContent : 'uPVC Installation';
            
            // Add a small scale-down effect during switch
            imgElement.style.opacity = '0';
            imgElement.style.transform = 'scale(0.95)';
            imgElement.style.transition = 'all 0.2s ease-out';
            
            setTimeout(() => {
                imgElement.src = img.src;
                imgElement.alt = img.alt;
                captionElement.textContent = captionText;
                imgElement.style.opacity = '1';
                imgElement.style.transform = 'scale(1)';
            }, 200);

            currentIndex = index;
        };

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                updateLightbox(index);
                lightbox.classList.add('active');
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
        };

        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        const showNext = () => {
            let nextIndex = (currentIndex + 1) % galleryItems.length;
            updateLightbox(nextIndex);
        };

        const showPrev = () => {
            let prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateLightbox(prevIndex);
        };

        lightbox.querySelector('.lightbox-next').addEventListener('click', showNext);
        lightbox.querySelector('.lightbox-prev').addEventListener('click', showPrev);

        // Keyboard Controls
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        });
    }
});
