// ====================================
// Theme Management
// ====================================
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// ====================================
// Smooth Scrolling & Active Navigation
// ====================================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.content-section');

// Smooth scroll to section on nav link click
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 20;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        }
    });
});

// Update active nav link on scroll
const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// ====================================
// Mobile Menu Toggle
// ====================================
const sidebar = document.querySelector('.sidebar');

// Create mobile menu button dynamically for better control
if (window.innerWidth <= 768) {
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-toggle';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    menuButton.setAttribute('aria-label', 'Toggle navigation menu');
    document.body.appendChild(menuButton);
    
    menuButton.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        const icon = menuButton.querySelector('i');
        
        if (sidebar.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('open') && 
            !sidebar.contains(e.target) && 
            !menuButton.contains(e.target)) {
            sidebar.classList.remove('open');
            const icon = menuButton.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const menuButton = document.querySelector('.mobile-menu-toggle');
        
        if (window.innerWidth > 768) {
            // Desktop: remove mobile menu button
            if (menuButton) {
                menuButton.remove();
            }
            sidebar.classList.remove('open');
        } else if (window.innerWidth <= 768 && !menuButton) {
            // Mobile: add menu button if it doesn't exist
            const newMenuButton = document.createElement('button');
            newMenuButton.className = 'mobile-menu-toggle';
            newMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
            newMenuButton.setAttribute('aria-label', 'Toggle navigation menu');
            document.body.appendChild(newMenuButton);
            
            newMenuButton.addEventListener('click', () => {
                sidebar.classList.toggle('open');
                const icon = newMenuButton.querySelector('i');
                
                if (sidebar.classList.contains('open')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }
    }, 250);
});

// ====================================
// Scroll Animations (Optional)
// ====================================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.publication-item, .project-card, .experience-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ====================================
// Copy Email on Click (Bonus Feature)
// ====================================
const emailLink = document.querySelector('a[href^="mailto:"]');
if (emailLink) {
    emailLink.addEventListener('click', (e) => {
        const email = emailLink.getAttribute('href').replace('mailto:', '');
        
        // Try to copy to clipboard
        if (navigator.clipboard) {
            e.preventDefault();
            navigator.clipboard.writeText(email).then(() => {
                // Show temporary feedback
                const originalText = emailLink.getAttribute('title');
                emailLink.setAttribute('title', 'Email copied!');
                
                setTimeout(() => {
                    emailLink.setAttribute('title', originalText);
                    // Allow default email client to open
                    window.location.href = `mailto:${email}`;
                }, 1000);
            });
        }
    });
}

// ====================================
// Lazy Loading Images (Performance)
// ====================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ====================================
// Scroll to Top Button (Optional)
// ====================================
const createScrollToTop = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Initialize scroll to top (uncomment to enable)
// createScrollToTop();

// ====================================
// Image Modal for Publications
// ====================================
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const pubImages = document.querySelectorAll('.pub-image img');
const closeBtn = document.querySelector('.modal-close');

// Open modal when clicking on publication images
pubImages.forEach(img => {
    img.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
        modalImg.src = this.src;
    });
});

// Close modal when clicking the X button
if (closeBtn) {
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
}

// Close modal when clicking outside the image
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});

// ====================================
// Console Easter Egg
// ====================================
console.log('%c👋 Hello, fellow developer!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cLooking at the code? Check out my GitHub: https://github.com/suryaprakashrajkumar', 'font-size: 14px; color: #4a5568;');
console.log('%cInterested in collaboration? Reach out at suryaprakash.rajkumar@concordia.ca', 'font-size: 14px; color: #4a5568;');
