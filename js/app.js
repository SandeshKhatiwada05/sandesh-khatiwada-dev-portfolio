/* ============================
   MAIN APP CLASS
   Handles modals, game player, CV viewer
   ============================ */

class App {
    constructor() {
        this.gameModal = document.getElementById('game-modal');
        this.cvModal = document.getElementById('cv-modal');
        this.gameIframe = document.getElementById('game-iframe');
        this.gameModalTitle = document.getElementById('game-modal-title');
        this.cvBtn = document.getElementById('cv-btn');
        
        this.init();
    }

    init() {
        // CV Button
        this.cvBtn.addEventListener('click', () => this.openCVModal());

        // Modal close buttons
        document.getElementById('game-modal-close').addEventListener('click', () => this.closeGameModal());
        const cvCloseBtn = document.getElementById('cv-close');
        if (cvCloseBtn) {
            cvCloseBtn.addEventListener('click', () => this.closeCVModal());
        }

        // CV Overlay click to close
        const cvOverlay = document.querySelector('.fullscreen-overlay');
        if (cvOverlay) {
            cvOverlay.addEventListener('click', () => this.closeCVModal());
        }

        // Game overlay click
        const gameOverlay = document.querySelector('.modal-overlay');
        if (gameOverlay) {
            gameOverlay.addEventListener('click', (e) => {
                if (e.target === gameOverlay) {
                    this.closeGameModal();
                }
            });
        }

        // Game controls
        document.getElementById('fullscreen-btn').addEventListener('click', () => this.toggleFullscreen());
        document.getElementById('mute-btn').addEventListener('click', () => this.toggleMute());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.cvModal.classList.contains('active')) {
                    this.closeCVModal();
                } else if (this.gameModal.classList.contains('active')) {
                    this.closeGameModal();
                }
            }
            // F key for CV fullscreen
            if (e.key === 'f' || e.key === 'F') {
                if (this.cvModal.classList.contains('active')) {
                    e.preventDefault();
                    this.toggleCVFullscreen();
                }
            }
        });
    }

    // ===== GAME MODAL =====

    openGame(gameId) {
        const game = CONFIG.games.find(g => g.id === gameId);
        if (!game) return;

        this.gameModalTitle.textContent = game.title;
        document.getElementById('game-title-info').textContent = game.title;
        this.gameIframe.src = game.embedUrl;
        this.gameModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Reset mute button
        document.getElementById('mute-btn').textContent = '🔊 Mute';
        this.isMuted = false;
    }

    closeGameModal() {
        this.gameModal.classList.remove('active');
        this.gameIframe.src = '';
        document.body.style.overflow = '';
    }

    toggleFullscreen() {
        const iframe = this.gameIframe;
        
        if (!document.fullscreenElement) {
            if (iframe.requestFullscreen) {
                iframe.requestFullscreen();
            } else if (iframe.webkitRequestFullscreen) {
                iframe.webkitRequestFullscreen();
            } else if (iframe.mozRequestFullScreen) {
                iframe.mozRequestFullScreen();
            } else if (iframe.msRequestFullscreen) {
                iframe.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        const muteBtn = document.getElementById('mute-btn');
        
        if (this.isMuted) {
            muteBtn.textContent = '🔇 Unmute';
            // Note: Direct muting is limited due to iframe sandbox restrictions
            // Some games may support mute parameter
        } else {
            muteBtn.textContent = '🔊 Mute';
        }
    }

    // ===== CV MODAL =====

    openCVModal() {
        this.cvModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeCVModal() {
        this.cvModal.classList.remove('active');
        document.body.style.overflow = '';
        // Exit fullscreen if active
        if (document.fullscreenElement === this.cvImage) {
            document.exitFullscreen().catch(() => {});
        }
    }

    /**
     * Toggle fullscreen mode for CV image
     */
    toggleCVFullscreen() {
        if (!this.cvImage) return;

        if (!document.fullscreenElement) {
            // Enter fullscreen
            if (this.cvImage.requestFullscreen) {
                this.cvImage.requestFullscreen().catch(err => console.error('[CV] Fullscreen error:', err));
            } else if (this.cvImage.webkitRequestFullscreen) {
                this.cvImage.webkitRequestFullscreen();
            } else if (this.cvImage.mozRequestFullScreen) {
                this.cvImage.mozRequestFullScreen();
            } else if (this.cvImage.msRequestFullscreen) {
                this.cvImage.msRequestFullscreen();
            }
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen().catch(() => {});
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    /**
     * Zoom in CV PDF
     */
    zoomInCV() {
        if (!this.cvImage) return;
        if (this.cvIsZoomed) return; // Already zoomed

        this.cvIsZoomed = true;
        this.cvImage.classList.add('zoomed');
        
        const wrapper = this.cvImage.parentElement;
        if (wrapper) {
            wrapper.classList.add('zoomed');
            wrapper.style.overflow = 'auto';
        }
        
        this.updateCVZoomButtons();
    }

    /**
     * Zoom out CV PDF (fit to screen)
     */
    zoomOutCV() {
        if (!this.cvImage) return;
    }

    // ===== UTILITIES =====

    log(message) {
        console.log(`[Portfolio App] ${message}`);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
    this.log = (msg) => console.log(`[Portfolio] ${msg}`);
});
