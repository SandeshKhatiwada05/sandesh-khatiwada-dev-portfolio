(() => {
    const templates = (window.PageTemplates = window.PageTemplates || {});

    templates.renderHome = (config) => {
        return `
            <section class="section">
                <h1 class="section-title">Sandesh Khatiwada</h1>
                <p class="section-subtitle">Backend Developer | ML & Automation</p>

                <p style="max-width: 800px; margin-bottom: 3rem;">
                    Backend developer exploring advanced backend development with Spring Boot alongside machine learning and automation.
                    Hands-on experience building Java systems using Spring Data JPA, Spring Security, and PostgreSQL.
                    Worked on AI/automation projects with Python, Jupyter, and n8n.
                    Familiar with multiple languages (Java, Python, C#, JavaScript), cloud platforms (Azure), and containerization (Docker).
                </p>

                <!-- Tic-Tac-Toe Mini Game -->
                <div id="tictactoe-game" class="tictactoe-container"></div>

                <!-- Arcade Hold -->
                <div class="arcade-entry">
                    <div class="arcade-hold" id="arcade-hold">
                        <button class="arcade-hold-btn" type="button" aria-label="Press and hold to enter game section">
                            <span class="arcade-hold-text">
                                <span class="arcade-hold-label">Press &amp; Hold to Enter Game Section</span>
                                <span class="arcade-hold-enter">Entering...</span>
                            </span>
                            <span class="arcade-hold-ring" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
                <div class="arcade-backdrop" aria-hidden="true"></div>

                <h2 class="section-title" style="margin-top: 3rem;">My Learning Journey</h2>
                <p class="section-subtitle">From university beginnings to professional development (2022-2026)</p>

                <div class="timeline-container">
                    <div class="timeline-line"></div>
                    ${config.timeline.map((item) => `
                        <div class="timeline-item" data-year="${item.year}" onclick="toggleTimeline(this)">
                            <div class="timeline-marker"></div>
                            <div class="timeline-year">${item.year}</div>
                            <div class="timeline-content">
                                <h3 class="timeline-title">${item.title}</h3>
                                <p class="timeline-desc">${item.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
            <footer>
                <p>© 2026 Sandesh Khatiwada | <a href="https://github.com/SandeshKhatiwada05">GitHub</a></p>
            </footer>
        `;
    };

    window.toggleTimeline = (element) => {
        document.querySelectorAll('.timeline-item').forEach((item) => {
            if (item !== element) {
                item.classList.remove('active');
            }
        });

        element.classList.toggle('active');
    };

    window.initArcadeHold = () => {
        const hold = document.getElementById('arcade-hold');
        if (!hold) return;

        const button = hold.querySelector('.arcade-hold-btn');
        const ring = hold.querySelector('.arcade-hold-ring');
        const duration = 1200;

        let holding = false;
        let startTime = 0;
        let frameId = 0;
        let progress = 0;
        let resetFrameId = 0;

        const setProgress = (value) => {
            progress = Math.min(1, Math.max(0, value));
            ring.style.setProperty('--progress', progress);
        };

        const animateReset = () => {
            const resetStart = performance.now();
            const resetDuration = 260;
            const from = progress;

            const step = (timestamp) => {
                const elapsed = timestamp - resetStart;
                const t = Math.min(1, elapsed / resetDuration);
                const eased = 1 - Math.pow(1 - t, 3);
                setProgress(from * (1 - eased));
                if (t < 1) {
                    resetFrameId = window.requestAnimationFrame(step);
                }
            };

            resetFrameId = window.requestAnimationFrame(step);
        };

        const tick = (timestamp) => {
            if (!holding) return;
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            setProgress(elapsed / duration);

            if (progress >= 1) {
                holding = false;
                button.classList.add('complete', 'entering');
                document.body.classList.add('arcade-transition');
                setTimeout(() => {
                    if (typeof window.navigate === 'function') {
                        window.navigate('games');
                    }
                    setTimeout(() => {
                        const target = document.querySelector('.games-container') || document.querySelector('.section');
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 60);
                    document.body.classList.remove('arcade-transition');
                }, 200);
                return;
            }

            frameId = window.requestAnimationFrame(tick);
        };

        const startHold = (event) => {
            if (event && event.button !== undefined && event.button !== 0) return;
            if (holding) return;
            holding = true;
            startTime = 0;
            button.classList.add('holding');
            button.classList.remove('complete', 'entering');
            window.cancelAnimationFrame(resetFrameId);
            frameId = window.requestAnimationFrame(tick);
        };

        const endHold = () => {
            if (!holding) return;
            holding = false;
            button.classList.remove('holding');
            window.cancelAnimationFrame(frameId);
            animateReset();
        };

        button.addEventListener('pointerdown', (event) => {
            button.setPointerCapture(event.pointerId);
            startHold(event);
        });

        button.addEventListener('pointerup', endHold);
        button.addEventListener('pointercancel', endHold);
        button.addEventListener('pointerleave', endHold);

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                endHold();
            }
        });

        setProgress(0);
    };
})();
