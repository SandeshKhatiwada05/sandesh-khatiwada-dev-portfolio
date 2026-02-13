document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const hamburger = document.getElementById('hamburger');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const themeToggle = document.getElementById('themeToggle');
    const toggleIcon = document.getElementById('toggleIcon');
    const body = document.body;
    const themeStorageKey = 'saisa-theme';
    const templates = window.PageTemplates || {};

    let currentPage = 'home';

    const renderPage = (page) => {
        switch (page) {
            case 'skills':
                mainContent.innerHTML = templates.renderSkills(CONFIG);
                break;
            case 'projects':
                mainContent.innerHTML = templates.renderProjects(CONFIG);
                break;
            case 'games':
                mainContent.innerHTML = templates.renderGames(CONFIG);
                mainContent.classList.remove('games-fade-in');
                requestAnimationFrame(() => {
                    mainContent.classList.add('games-fade-in');
                });
                setTimeout(() => {
                    mainContent.classList.remove('games-fade-in');
                }, 800);
                break;
            default:
                mainContent.innerHTML = templates.renderHome(CONFIG);
                if (window.ticTacToe && typeof window.ticTacToe.render === 'function') {
                    window.ticTacToe.render();
                }
                if (typeof window.initArcadeHold === 'function') {
                    window.initArcadeHold();
                }
        }
    };

    const closeSidebar = () => {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        hamburger.classList.remove('active');
    };

    const navigate = (page) => {
        currentPage = page;
        document.querySelectorAll('.nav-item').forEach((item) => item.classList.remove('active'));
        const activeItem = document.querySelector(`[data-page="${page}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }

        renderPage(page);
        closeSidebar();
        window.scrollTo(0, 0);
    };

    window.navigate = navigate;

    sidebarToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        sidebar.classList.toggle('collapsed');
    });

    document.querySelectorAll('.nav-item').forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            navigate(item.dataset.page);
        });
    });

    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    sidebarOverlay.addEventListener('click', closeSidebar);

    const gameModal = document.getElementById('game-modal');
    const gameTitle = document.getElementById('game-title');
    const gameIframe = document.getElementById('game-iframe');

    const openGame = (gameId) => {
        const game = CONFIG.games.find((item) => item.id === gameId);
        if (!game) return;

        gameTitle.textContent = game.title;
        gameIframe.src = game.embedUrl;
        gameModal.classList.add('active');
        body.style.overflow = 'hidden';
    };

    window.openGame = openGame;

    document.getElementById('game-close').addEventListener('click', () => {
        gameModal.classList.remove('active');
        gameIframe.src = '';
        body.style.overflow = '';
    });

    gameModal.addEventListener('click', (event) => {
        if (event.target === gameModal) {
            gameModal.classList.remove('active');
            gameIframe.src = '';
            body.style.overflow = '';
        }
    });

    document.getElementById('fullscreen-btn').addEventListener('click', () => {
        const iframe = document.getElementById('game-iframe');
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
        } else if (iframe.mozRequestFullScreen) {
            iframe.mozRequestFullScreen();
        }
    });

    document.getElementById('mute-btn').addEventListener('click', function () {
        const muteText = this.querySelector('.mute-text');
        const volumeIcon = this.querySelector('.volume-icon');

        if (muteText.textContent === 'Mute') {
            muteText.textContent = 'Unmute';
            volumeIcon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>';
        } else {
            muteText.textContent = 'Mute';
            volumeIcon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>';
        }
    });

    document.getElementById('reload-btn').addEventListener('click', () => {
        gameIframe.src = gameIframe.src;
    });

    const moonIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    const sunIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';

    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light');
            toggleIcon.innerHTML = sunIcon;
        } else {
            body.classList.remove('light');
            toggleIcon.innerHTML = moonIcon;
        }

        localStorage.setItem(themeStorageKey, theme);
    };

    themeToggle.addEventListener('click', () => {
        const isLight = body.classList.contains('light');
        applyTheme(isLight ? 'dark' : 'light');
    });

    const savedTheme = localStorage.getItem(themeStorageKey);
    applyTheme(savedTheme === 'light' ? 'light' : 'dark');

    const cvBtn = document.getElementById('cv-btn');
    const cvModal = document.getElementById('cv-modal');
    const cvCloseBtn = document.getElementById('cv-close-btn');
    const cvIframe = document.getElementById('cv-iframe');
    const cvOverlay = document.querySelector('.cv-modal-overlay');

    cvBtn.addEventListener('click', () => {
        cvModal.classList.add('active');
        cvIframe.src = 'sources/Sandesh_CV.pdf';
        body.style.overflow = 'hidden';
    });

    const closeCVModal = () => {
        cvModal.classList.remove('active');
        setTimeout(() => {
            cvIframe.src = '';
        }, 300);
        body.style.overflow = '';
    };

    cvCloseBtn.addEventListener('click', closeCVModal);
    cvOverlay.addEventListener('click', closeCVModal);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeCVModal();
            gameModal.classList.remove('active');
            gameIframe.src = '';
            body.style.overflow = '';
        }
    });

    navigate(currentPage);
});
