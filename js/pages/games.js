(() => {
    const templates = (window.PageTemplates = window.PageTemplates || {});

    templates.renderGames = (config) => {
        return `
            <section class="section">
                <h1 class="section-title">Play Games</h1>

                <div class="games-container">
                    <div class="grid grid-4">
                        ${config.games.map((game) => `
                            <div class="game-card" onclick="openGame('${game.id}')">
                                <div class="game-card-image">
                                    <img src="${game.image}" alt="${game.title}" loading="lazy">
                                </div>
                                <div class="game-card-content">
                                    <h3 class="game-card-title">${game.title}</h3>
                                    <p class="game-card-desc">${game.description}</p>
                                    <button class="btn-play">Play Game</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
            <footer>
                <p>© 2026 Sandesh Khatiwada | <a href="https://github.com/SandeshKhatiwada05">GitHub</a></p>
            </footer>
        `;
    };
})();
