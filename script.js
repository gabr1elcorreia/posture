document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle-desktop');
    const body = document.body;
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNavLinks = document.getElementById('mobile-nav-links');

    const updateIcons = () => {
        const isLightMode = body.classList.contains('light-mode');
        const moonIcon = document.querySelector('.icon-indicator.moon');
        const sunIcon = document.querySelector('.icon-indicator.sun');
        const mainLogo = document.querySelector('.main-logo');

        if (isLightMode) {
            if (moonIcon) moonIcon.style.opacity = '0';
            if (sunIcon) sunIcon.style.opacity = '1';
        } else {
            if (moonIcon) moonIcon.style.opacity = '1';
            if (sunIcon) sunIcon.style.opacity = '0';
        }
    };

    const checkSystemTheme = () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.classList.remove('light-mode');
            if (themeToggle) themeToggle.checked = false;
        } else {
            body.classList.add('light-mode');
            if (themeToggle) themeToggle.checked = true;
        }
        updateIcons();
    };

    const toggleTheme = () => {
        body.classList.toggle('light-mode');
        const isLightMode = body.classList.contains('light-mode');
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
        
        if (themeToggle) {
            themeToggle.checked = isLightMode;
        }
        updateIcons();
    };

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            if (themeToggle) themeToggle.checked = true;
        } else {
            body.classList.remove('light-mode');
            if (themeToggle) themeToggle.checked = false;
        }
    } else {
        checkSystemTheme();
    }
    updateIcons();

    if (themeToggle) {
        themeToggle.addEventListener('change', toggleTheme);
    }
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                body.classList.remove('light-mode');
                if (themeToggle) themeToggle.checked = false;
            } else {
                body.classList.add('light-mode');
                if (themeToggle) themeToggle.checked = true;
            }
        }
        updateIcons();
    });

    hamburgerMenu.addEventListener('click', () => {
        mobileNavLinks.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
        body.classList.toggle('no-scroll');
    });
});
