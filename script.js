/**
 * Ashford & Briggs - Main JavaScript
 * Paladin Veritai Agent — Product Site
 */

(function() {
    'use strict';

    // Mobile Navigation Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking a nav link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }

    // Header scroll effect - add shadow on scroll
    const header = document.querySelector('.site-header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 20) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }

        lastScrollTop = scrollTop;
    });

    // Smooth scroll for anchor links (enhanced)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Don't prevent default for links that just go to "#"
            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handler
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                company: document.getElementById('company').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                role: document.getElementById('role').value,
                teamSize: document.getElementById('teamSize').value,
                message: document.getElementById('message').value
            };

            // Here you would normally send the data to your server
            // For now, we'll show a success message
            showFormMessage('success', 'Thank you for your interest! We\'ll reach out to schedule your demo within one business day.');

            // Reset form
            contactForm.reset();
        });
    }

    // Form message display helper
    function showFormMessage(type, message) {
        // Remove any existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-message-${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            padding: 1rem 1.5rem;
            margin-bottom: 1.5rem;
            border-radius: 6px;
            font-weight: 500;
            background-color: ${type === 'success' ? '#d1fae5' : '#fee2e2'};
            color: ${type === 'success' ? '#065f46' : '#991b1b'};
            border: 1px solid ${type === 'success' ? '#6ee7b7' : '#fca5a5'};
        `;

        // Insert at top of form
        contactForm.insertBefore(messageDiv, contactForm.firstChild);

        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Remove message after 8 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transition = 'opacity 0.5s ease';
            setTimeout(() => messageDiv.remove(), 500);
        }, 8000);
    }

    // Form validation enhancement
    const formInputs = contactForm?.querySelectorAll('input, select, textarea');

    if (formInputs) {
        formInputs.forEach(input => {
            // Add real-time validation feedback
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#ef4444';
                } else if (this.type === 'email' && this.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(this.value)) {
                        this.style.borderColor = '#ef4444';
                    } else {
                        this.style.borderColor = '#6ee7b7';
                    }
                } else if (this.value) {
                    this.style.borderColor = '#6ee7b7';
                }
            });

            // Reset border color on focus
            input.addEventListener('focus', function() {
                this.style.borderColor = '#2563eb';
            });
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.stat-card, .solution-card, .step-card, .advantage-card, .team-card, .service-card, .market-stat, .callout-item'
    );

    animatedElements.forEach(el => observer.observe(el));

    // Add stagger effect to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add stagger effect to solution cards
    const solutionCards = document.querySelectorAll('.solution-card');
    solutionCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add stagger effect to step cards
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });

    // Add stagger effect to advantage cards
    const advantageCards = document.querySelectorAll('.advantage-card');
    advantageCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Keyboard accessibility - trap focus in mobile menu when open
    if (navMenu && mobileMenuToggle) {
        document.addEventListener('keydown', function(e) {
            if (!navMenu.classList.contains('active')) return;

            const focusableElements = navMenu.querySelectorAll(
                'a[href], button:not([disabled])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            // Close menu on Escape key
            if (e.key === 'Escape') {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.focus();
                return;
            }

            // Trap focus within menu
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }

    // Performance: Lazy load background images if any are added
    if ('IntersectionObserver' in window) {
        const lazyBackgrounds = document.querySelectorAll('.lazy-background');

        const backgroundObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    backgroundObserver.unobserve(entry.target);
                }
            });
        });

        lazyBackgrounds.forEach(bg => backgroundObserver.observe(bg));
    }

    // Console message for developers
    console.log('%cAshford & Briggs', 'font-size: 20px; font-weight: bold; color: #1a365d;');
    console.log('%cPaladin Veritai Agent — Real-Time AI for Recruiting', 'font-size: 14px; color: #64748b;');

})();
