document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // THEME TOGGLE (LIGHT / DARK MODE)
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Retrieve saved theme or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme ? savedTheme : (systemPrefersDark.matches ? 'dark' : 'light');
    
    // Set theme on document root
    document.documentElement.setAttribute('data-theme', initialTheme);
    
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // ==========================================================================
    // MOBILE NAVIGATION MENU
    // ==========================================================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-item');
    
    const toggleMenu = () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // ==========================================================================
    // NAVBAR STYLING ON SCROLL
    // ==========================================================================
    const navbar = document.getElementById('navbar');
    
    const handleScrollNavbar = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScrollNavbar);
    handleScrollNavbar(); // Initial call in case of refresh

    // ==========================================================================
    // INTERSECTION OBSERVER FOR SCROLL REVEAL ANIMATIONS
    // ==========================================================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================================================
    // ACTIVE NAV LINK HIGHLIGHTING ON SCROLL
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-item');

    const handleActiveNavLink = () => {
        let current = '';
        
        if (window.scrollY < 100) {
            current = 'about';
        } else {
            sections.forEach(section => {
                const sectionId = section.getAttribute('id');
                const hasNavLink = document.querySelector(`.nav-item[href="#${sectionId}"]`);
                if (!hasNavLink) return;
                
                const rect = section.getBoundingClientRect();
                if (rect.top <= 160 && rect.bottom >= 160) {
                    current = sectionId;
                }
            });
        }
        
        if (current) {
            navLinksList.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
    };

    window.addEventListener('scroll', handleActiveNavLink);
    handleActiveNavLink(); // Initial call
});
