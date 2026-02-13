(() => {
    const templates = (window.PageTemplates = window.PageTemplates || {});

    templates.renderSkills = (config) => {
        return `
            <section class="section">
                <h1 class="section-title">Skills & Expertise</h1>
                <p class="section-subtitle">Key technologies and specializations</p>

                <div class="grid grid-3">
                    ${Object.entries(config.skills).map(([category, items]) => `
                        <div class="skill-group">
                            <h3 class="skill-group-title">${category}</h3>
                            <ul class="skill-list">
                                ${items.map((skill) => `<li>${skill}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            </section>
            <footer>
                <p>© 2026 Sandesh Khatiwada | <a href="https://github.com/SandeshKhatiwada05">GitHub</a></p>
            </footer>
        `;
    };
})();
