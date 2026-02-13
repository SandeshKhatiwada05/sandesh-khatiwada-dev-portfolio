(() => {
    const templates = (window.PageTemplates = window.PageTemplates || {});

    templates.renderProjects = (config) => {
        return `
            <section class="section">
                <h1 class="section-title">Projects</h1>
                <p class="section-subtitle">Recent work and notable projects</p>

                ${config.projects.map((project) => `
                    <div class="project-item${project.isMore ? ' more-projects' : ''}">
                        <div class="project-header">
                            <h3 class="project-title">${project.title}</h3>
                            <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">${project.isMore ? 'View All →' : 'View Repo →'}</a>
                        </div>
                        <p class="project-desc">${project.description}</p>
                        <div class="tag-list">
                            ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </section>
            <footer>
                <p>© 2026 Sandesh Khatiwada | <a href="https://github.com/SandeshKhatiwada05">GitHub</a></p>
            </footer>
        `;
    };
})();
