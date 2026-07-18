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

    // ==========================================================================
    // INTERACTIVE PROJECTS: SPLIT-SCREEN ACCORDION SHOWCASE
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const showcaseItems = document.querySelectorAll('.showcase-item');
    const previewImages = document.querySelectorAll('.preview-img');

    if (showcaseItems.length > 0 && previewImages.length > 0) {
        // Function to switch active project preview image
        const activateProject = (index) => {
            showcaseItems.forEach(item => item.classList.remove('active'));
            previewImages.forEach(img => img.classList.remove('active'));

            if (showcaseItems[index]) showcaseItems[index].classList.add('active');
            if (previewImages[index]) previewImages[index].classList.add('active');
        };

        // Click / Hover interaction for list items
        showcaseItems.forEach((item, index) => {
            // Hover/Click to trigger spotlight update
            const triggerActivation = () => {
                if (!item.classList.contains('hide')) {
                    activateProject(index);
                }
            };
            
            item.addEventListener('mouseenter', triggerActivation);
            item.addEventListener('click', triggerActivation);
        });

        // Filter button click handler
        if (filterButtons.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    if (button.classList.contains('active')) return;

                    // Update active button state
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    const filterValue = button.getAttribute('data-filter');

                    // Filter matching project items
                    showcaseItems.forEach(item => {
                        const itemCategory = item.getAttribute('data-category');
                        
                        if (filterValue === 'all' || itemCategory === filterValue) {
                            item.classList.remove('hide');
                        } else {
                            item.classList.remove('active');
                            item.classList.add('hide');
                        }
                    });

                    // Automatically activate the first visible project after filtering
                    const firstVisibleIndex = Array.from(showcaseItems).findIndex(item => !item.classList.contains('hide'));
                    if (firstVisibleIndex !== -1) {
                        activateProject(firstVisibleIndex);
                    }
                });
            });
        }
    }

    window.addEventListener('scroll', handleActiveNavLink);
    handleActiveNavLink(); // Initial call
});
