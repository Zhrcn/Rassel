/**
 * RASEEL Innovation Company - Projects Search & Filter System
 * Provides advanced search, filtering, and view options for projects
 */

class ProjectsSearchFilter {
    constructor() {
        this.searchInput = document.getElementById('project-search');
        this.categoryFilter = document.getElementById('category-filter');
        this.filterTags = document.getElementById('filter-tags');
        this.projectGrid = document.getElementById('project-grid');
        this.resultsCount = document.getElementById('results-count');
        this.noResults = document.getElementById('no-results');
        this.gridViewBtn = document.getElementById('grid-view');
        this.listViewBtn = document.getElementById('list-view');
        
        this.currentView = 'grid';
        this.currentFilters = {
            search: '',
            category: ''
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.populateCategoryFilter();
        this.renderProjects();
        this.updateResultsCount();
    }

    setupEventListeners() {
        // Search input
        if (this.searchInput) {
            this.searchInput.addEventListener('input', this.debounce(() => {
                this.currentFilters.search = this.searchInput.value;
                this.renderProjects();
                this.updateResultsCount();
            }, 300));
        }

        // Category filter
        if (this.categoryFilter) {
            this.categoryFilter.addEventListener('change', () => {
                this.currentFilters.category = this.categoryFilter.value;
                this.renderProjects();
                this.updateResultsCount();
            });
        }

        // View toggle buttons
        if (this.gridViewBtn) {
            this.gridViewBtn.addEventListener('click', () => this.setView('grid'));
        }
        if (this.listViewBtn) {
            this.listViewBtn.addEventListener('click', () => this.setView('list'));
        }
    }

    populateCategoryFilter() {
        if (!this.categoryFilter) return;
        
        const categories = window.getProjectCategories ? window.getProjectCategories() : [];
        const currentValue = this.categoryFilter.value;
        
        // Clear existing options except the first one
        while (this.categoryFilter.children.length > 1) {
            this.categoryFilter.removeChild(this.categoryFilter.lastChild);
        }
        
        // Add category options
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            this.categoryFilter.appendChild(option);
        });
        
        // Restore selected value
        this.categoryFilter.value = currentValue;
    }

    getFilteredProjects() {
        let projects = window.RASEEL_PROJECTS || [];
        
        // Apply search filter
        if (this.currentFilters.search) {
            projects = window.searchProjects ? window.searchProjects(this.currentFilters.search) : projects;
        }
        
        // Apply category filter
        if (this.currentFilters.category) {
            projects = window.filterProjectsByCategory ? window.filterProjectsByCategory(this.currentFilters.category) : projects;
        }
        
        return projects;
    }

    renderProjects() {
        if (!this.projectGrid) return;
        
        const projects = this.getFilteredProjects();
        
        if (projects.length === 0) {
            this.showNoResults();
            return;
        }
        
        this.hideNoResults();
        
        const projectHTML = projects.map(project => this.createProjectCard(project)).join('');
        this.projectGrid.innerHTML = projectHTML;
        
        // Add animation classes
        setTimeout(() => {
            const cards = this.projectGrid.querySelectorAll('.project-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate-fade-in-up');
                }, index * 100);
            });
        }, 100);
    }

    createProjectCard(project) {
        const href = `project.html?slug=${encodeURIComponent(project.slug)}`;
        
        if (this.currentView === 'list') {
            return `
                <div class="project-card bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift md:col-span-2 lg:col-span-3">
                    <a href="${href}" class="block p-6">
                        <div class="flex flex-col md:flex-row gap-6">
                            <div class="md:w-1/3">
                                <img class="w-full aspect-[4/3] object-cover rounded-xl transition-transform duration-500 group-hover:scale-105" 
                                     src="${project.image}" alt="${project.title}" />
                            </div>
                            <div class="md:w-2/3 space-y-4">
                                <div>
                                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">${project.title}</h3>
                                    <p class="text-accent-600 dark:text-accent-400 font-medium">${project.category}</p>
                                </div>
                                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">${project.description}</p>
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <span class="text-gray-500 dark:text-gray-400">Location:</span>
                                        <p class="font-medium text-gray-900 dark:text-white">${project.location}</p>
                                    </div>
                                    <div>
                                        <span class="text-gray-500 dark:text-gray-400">Client:</span>
                                        <p class="font-medium text-gray-900 dark:text-white">${project.client}</p>
                                    </div>
                                    <div>
                                        <span class="text-gray-500 dark:text-gray-400">Year:</span>
                                        <p class="font-medium text-gray-900 dark:text-white">${project.year}</p>
                                    </div>
                                    <div>
                                        <span class="text-gray-500 dark:text-gray-400">Area:</span>
                                        <p class="font-medium text-gray-900 dark:text-white">${project.area}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            `;
        }
        
        // Grid view
        return `
            <div class="project-card bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
                <a href="${href}" class="group block">
                    <img class="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105" 
                         src="${project.image}" alt="${project.title}" />
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${project.title}</h3>
                        <p class="text-gray-600 dark:text-gray-400 mb-3">${project.category}</p>
                        <p class="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">${project.description}</p>
                        <div class="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>${project.location}</span>
                            <span>${project.year}</span>
                        </div>
                    </div>
                </a>
            </div>
        `;
    }

    setView(view) {
        this.currentView = view;
        
        // Update button states
        if (this.gridViewBtn) {
            this.gridViewBtn.className = view === 'grid' 
                ? 'p-2 rounded-lg bg-accent-500 text-white transition-all hover:bg-accent-600' 
                : 'p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 transition-all hover:bg-gray-300 dark:hover:bg-gray-600';
        }
        
        if (this.listViewBtn) {
            this.listViewBtn.className = view === 'list' 
                ? 'p-2 rounded-lg bg-accent-500 text-white transition-all hover:bg-accent-600' 
                : 'p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 transition-all hover:bg-gray-300 dark:hover:bg-gray-600';
        }
        
        // Update grid layout
        if (this.projectGrid) {
            if (view === 'list') {
                this.projectGrid.className = 'grid md:grid-cols-1 gap-8 transition-all duration-500';
            } else {
                this.projectGrid.className = 'grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500';
            }
        }
        
        // Re-render projects
        this.renderProjects();
    }

    updateResultsCount() {
        if (!this.resultsCount) return;
        
        const projects = this.getFilteredProjects();
        const total = window.RASEEL_PROJECTS ? window.RASEEL_PROJECTS.length : 0;
        
        if (this.currentFilters.search || this.currentFilters.category) {
            this.resultsCount.textContent = `Showing ${projects.length} of ${total} projects`;
        } else {
            this.resultsCount.textContent = `Showing all ${total} projects`;
        }
    }

    showNoResults() {
        if (this.noResults) {
            this.noResults.classList.remove('hidden');
        }
        if (this.projectGrid) {
            this.projectGrid.innerHTML = '';
        }
    }

    hideNoResults() {
        if (this.noResults) {
            this.noResults.classList.add('hidden');
        }
    }

    // Utility function for debouncing
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsSearchFilter();
});

// Export for use in other scripts
window.ProjectsSearchFilter = ProjectsSearchFilter;
