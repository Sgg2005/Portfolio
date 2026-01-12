// ==========================================
// WAIT FOR PAGE TO FULLY LOAD
// ==========================================

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================
    const backToTop = document.getElementById('backToTop');

    function toggleBackToTop() {
        if (!backToTop) return;
        backToTop.classList.toggle('show', window.scrollY > 500);
    }

    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop();
    
    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================
    
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    
    // ==========================================
    // MOBILE NAV MENU
    // ==========================================
    
    const navToggle = document.getElementById('navToggle');
    const navOverlay = document.getElementById('navOverlay');
    const navLinksContainer = document.getElementById('navLinks');

    // Close menu function
    function closeNav() {
        document.body.classList.remove('nav-open');
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }

    // Open menu function
    function openNav() {
        document.body.classList.add('nav-open');
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'true');
        }
    }

    // Toggle button click
    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = document.body.classList.contains('nav-open');
            isOpen ? closeNav() : openNav();
        });
    }

    // Overlay click to close
    if (navOverlay) {
    navOverlay.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });
    }

    // Tap/click outside the menu to close (reliable on mobile)
    document.addEventListener('pointerdown', function (e) {
    if (!document.body.classList.contains('nav-open')) return;

    const clickedLinkMenu = navLinksContainer && navLinksContainer.contains(e.target);
    const clickedToggle = navToggle && navToggle.contains(e.target);

    if (!clickedLinkMenu && !clickedToggle) {
        closeNav();
    }
    }, { capture: true });

    // Escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeNav();
    });
    
    // ===============================
    // NAV LINK HANDLER - FIXED - NO MORE DOUBLE CLICK!
    // ===============================
    (function () {
    const navLinks = document.querySelectorAll('.nav-link');

    function closeNavImmediate() {
        document.body.classList.remove('nav-open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    }

    navLinks.forEach((link) => {
        link.addEventListener('pointerdown', function (e) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            const targetId = href.slice(1);
            const targetSection = document.getElementById(targetId);
            if (!targetSection) return;

            // Stop everything else (including overlay "click to close" timing issues)
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            closeNavImmediate();

            // Scroll on the next frame (after class change applies)
            requestAnimationFrame(() => {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }, { capture: true }); // CAPTURE is important
    });
})();

    // ==========================================
    // ACTIVE NAV LINK ON SCROLL + CLICK
    // ==========================================

    const sectionsForNav = document.querySelectorAll('section');
    const navLinksForNav = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        let currentSection = '';

        sectionsForNav.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });

        navLinksForNav.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Run on scroll
    window.addEventListener('scroll', updateActiveNav);

    // Run once on load
    updateActiveNav();
        
    // ==========================================
    // FADE-IN ANIMATION ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    
    // ==========================================
    // PROJECT CARDS HOVER EFFECT
    // ==========================================
    
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    
    // ==========================================
    // TIMELINE ITEMS ANIMATION
    // ==========================================
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.style.animation = 'fadeInUp 0.6s ease forwards';
    });
    
    
    // ==========================================
    // SKILL TAGS ANIMATION
    // ==========================================
    
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.style.animation = 'fadeInUp 0.5s ease forwards';
    });
    
    
    // ==========================================
    // CONTACT FORM HANDLING - WEB3FORMS
    // ==========================================
    
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('formStatusSuccess');
    
    if (form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Hide any previous messages
            if (successMessage) {
                successMessage.hidden = true;
            }
            
            const formData = new FormData(form);
            
            // Add your Web3Forms access key
            formData.append("access_key", "a73e9e35-c157-4611-83fd-29da37d0e3d2");
            
            // Save original button text
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;
            
            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    // Show success message
                    if (successMessage) {
                        successMessage.hidden = false;
                        successMessage.textContent = "✅ Message sent successfully!";
                        successMessage.style.background = "rgba(34, 197, 94, 0.15)";
                        successMessage.style.borderColor = "rgba(34, 197, 94, 0.35)";
                        successMessage.style.color = "#bbf7d0";
                    }
                    
                    // Clear the form
                    form.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        if (successMessage) {
                            successMessage.hidden = true;
                        }
                    }, 5000);
                } else {
                    // Show error message
                    if (successMessage) {
                        successMessage.hidden = false;
                        successMessage.textContent = "❌ Error: " + data.message;
                        successMessage.style.background = "rgba(239, 68, 68, 0.15)";
                        successMessage.style.borderColor = "rgba(239, 68, 68, 0.35)";
                        successMessage.style.color = "#fecaca";
                    }
                }
            } catch (error) {
                // Show error message
                if (successMessage) {
                    successMessage.hidden = false;
                    successMessage.textContent = "❌ Something went wrong. Please try again.";
                    successMessage.style.background = "rgba(239, 68, 68, 0.15)";
                    successMessage.style.borderColor = "rgba(239, 68, 68, 0.35)";
                    successMessage.style.color = "#fecaca";
                }
            } finally {
                // Reset button text and enable it
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    
    // ==========================================
    // FORM INPUT ANIMATIONS
    // ==========================================
    
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    
    // ==========================================
    // BUTTON CLICK EFFECTS - FIXED TO EXCLUDE NAV LINKS!
    // ==========================================
    
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Skip nav links completely!
        if (button.classList.contains('nav-link')) return;
        
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    
    // ==========================================
    // TYPING EFFECT FOR HERO SUBTITLE
    // ==========================================
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroSubtitle) {
        const subtitleText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < subtitleText.length) {
                heroSubtitle.textContent += subtitleText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
    
    
    // ==========================================
    // PROJECT CAROUSEL AUTO-SCROLL
    // ==========================================
    
    (function() {
        const wrapper = document.getElementById('carouselWrapper');
        const dotsContainer = document.getElementById('carouselDots');
        
        if (!wrapper || !dotsContainer) return;
        
        const cards = wrapper.querySelectorAll('.project-card');
        const totalCards = cards.length;
        let currentIndex = 0;
        let autoScrollInterval;
        
        // Create dots
        for (let i = 0; i < totalCards; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        const dots = dotsContainer.querySelectorAll('.dot');
        
        // Calculate card width including gap
        function getCardWidth() {
            const card = cards[0];
            const style = window.getComputedStyle(card);
            const width = card.offsetWidth;
            const marginRight = parseInt(style.marginRight) || 0;
            return width + marginRight + 30; // 30px is the gap
        }
        
        // Update carousel position - SHOWS ONE CARD AT A TIME
        function updateCarousel() {
            const cardWidth = getCardWidth();
            const offset = -(currentIndex * cardWidth);
            wrapper.style.transform = `translateX(${offset}px)`;
            
            // Update dots - only one active at a time
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Go to specific slide
        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
            resetAutoScroll();
        }
        
        // Next slide
        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalCards;
            updateCarousel();
        }
        
        // Start auto-scroll - 4 SECONDS
        function startAutoScroll() {
            autoScrollInterval = setInterval(nextSlide, 4000); // 4 seconds
        }
        
        // Reset auto-scroll
        function resetAutoScroll() {
            clearInterval(autoScrollInterval);
            startAutoScroll();
        }
        
        // Pause on hover
        wrapper.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });
        
        wrapper.addEventListener('mouseleave', () => {
            startAutoScroll();
        });
        
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateCarousel, 100);
        });
        
        // Initialize
        startAutoScroll();
        updateCarousel();
    })();
    
    
    // ==========================================
    // CONSOLE MESSAGE (Easter Egg)
    // ==========================================
    
    console.log('%c👋 Hello, fellow developer!', 'color: #a78bfa; font-size: 20px; font-weight: bold;');
    console.log('%cLooking at the code? Feel free to reach out if you want to collaborate!', 'color: #ec4899; font-size: 14px;');
    
});


// ==========================================
// RIPPLE ANIMATION KEYFRAMES
// ==========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);