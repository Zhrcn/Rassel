/**
 * RASEEL Innovation Company - Project Details Handler
 * Displays comprehensive project information on individual project pages
 */

class ProjectDetailsHandler {
    constructor() {
        // Prevent multiple initializations
        if (window.projectDetailsInitialized) {
            console.log('RASEEL: ProjectDetailsHandler already initialized, skipping...');
            return;
        }
        
        this.heroImage = document.getElementById('hero-image');
        this.title = document.getElementById('title');
        this.category = document.getElementById('category');
        this.overview = document.getElementById('overview');
        this.scope = document.getElementById('scope');
        this.meta = document.getElementById('meta');
        
        this.currentProject = null;
        console.log('RASEEL: ProjectDetailsHandler initialized');
        
        // Mark as initialized
        window.projectDetailsInitialized = true;
        
        this.init();
    }

    init() {
        console.log('RASEEL: Initializing ProjectDetailsHandler...');
        // Wait for projects data to be available
        this.waitForProjectsData();
    }

    waitForProjectsData() {
        // Prevent multiple calls
        if (this.waitingForData) {
            return;
        }
        
        this.waitingForData = true;
        
        // Add timeout for data loading
        const timeout = setTimeout(() => {
            console.error('Timeout waiting for projects data');
            this.showDataError();
        }, 10000); // 10 second timeout
        
        if (typeof window.RASEEL_PROJECTS !== 'undefined' && window.RASEEL_PROJECTS.length > 0) {
            clearTimeout(timeout);
            console.log('RASEEL: Projects data found, loading project details...');
            this.loadProjectDetails();
            this.setupBackButton();
            this.setupRelatedProjects();
        } else {
            console.log('RASEEL: Waiting for projects data...');
            setTimeout(() => this.waitForProjectsData(), 100);
        }
    }

    showDataError() {
        console.error('RASEEL: Failed to load projects data after timeout');
        const title = document.getElementById('title');
        const category = document.getElementById('category');
        const overview = document.getElementById('overview');
        const scope = document.getElementById('scope');
        const meta = document.getElementById('meta');

        if (title) title.innerHTML = '<span class="text-red-500">Error: Failed to load project data</span>';
        if (category) category.innerHTML = '<span class="text-red-400">Please refresh the page</span>';
        if (overview) overview.innerHTML = '<span class="text-red-400">Unable to load project details</span>';
        if (scope) scope.innerHTML = '<li class="text-red-400">Project data unavailable</li>';
        if (meta) meta.innerHTML = '<div class="text-red-400">No project information available</div>';
    }

    loadProjectDetails() {
        const slug = this.getProjectSlug();
        console.log('RASEEL: Loading project with slug:', slug);
        
        if (!slug) {
            console.warn('RASEEL: No slug found, redirecting to projects page');
            this.redirectToProjects();
            return;
        }

        // Find the project
        this.currentProject = window.RASEEL_PROJECTS.find(p => p.slug === slug);
        
        if (!this.currentProject) {
            console.error('RASEEL: Project not found for slug:', slug);
            console.log('RASEEL: Available projects:', window.RASEEL_PROJECTS.length);
            console.log('RASEEL: Available slugs:', window.RASEEL_PROJECTS.map(p => p.slug));
            this.redirectToProjects();
            return;
        }

        console.log('RASEEL: Project found:', this.currentProject.title);
        this.populateProjectDetails();
        this.updatePageTitle();
        this.updateMetaTags();
    }

    getProjectSlug() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('slug');
    }

    populateProjectDetails() {
        if (!this.currentProject) return;

        console.log('RASEEL: Populating project details...');

        // Hero image carousel
        if (this.heroImage && !this.heroImage.dataset.populated) {
            this.renderImageCarousel();
            this.heroImage.dataset.populated = 'true';
        }

        // Title and category
        if (this.title && !this.title.dataset.populated) {
            this.title.textContent = this.currentProject.title;
            this.title.dataset.populated = 'true';
            console.log('RASEEL: Set title:', this.currentProject.title);
        }
        if (this.category && !this.category.dataset.populated) {
            this.category.textContent = this.currentProject.category;
            this.category.dataset.populated = 'true';
            console.log('RASEEL: Set category:', this.currentProject.category);
        }

        // Overview
        if (this.overview && !this.overview.dataset.populated) {
            this.overview.textContent = this.currentProject.description || 
                `RASEEL Innovation delivered ${this.currentProject.title} with high-quality standards, focusing on schedule, cost, and safety. Our team of experienced professionals ensured every aspect of the project met the highest industry standards.`;
            this.overview.dataset.populated = 'true';
            console.log('RASEEL: Set overview');
        }

        // Scope of work
        if (this.scope && !this.scope.dataset.populated) {
            const scopeItems = this.currentProject.scope || [
                'Civil and structural works',
                'Finishing and fit-out',
                'MEP and safety systems',
                'Project management'
            ];
            
            this.scope.innerHTML = scopeItems.map(item => 
                `<li class="flex items-center">
                    <div class="w-2 h-2 bg-accent-500 rounded-full mr-3"></div>
                    ${item}
                </li>`
            ).join('');
            this.scope.dataset.populated = 'true';
            console.log('RASEEL: Set scope with', scopeItems.length, 'items');
        }

        // Project meta information
        if (this.meta && !this.meta.dataset.populated) {
            const metaData = [
                ['Location', this.currentProject.location || 'Saudi Arabia'],
                ['Client', this.currentProject.client || '—'],
                ['Year', this.currentProject.year || '—'],
                ['Discipline', this.currentProject.category || 'General Contracting'],
                ['Area', this.currentProject.area || '—'],
                ['Duration', this.currentProject.duration || '—']
            ];

            this.meta.innerHTML = metaData.map(([label, value]) => 
                `<div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <dt class="font-medium text-gray-700 dark:text-gray-300">${label}</dt>
                    <dd class="text-gray-900 dark:text-white">${value}</dd>
                </div>`
            ).join('');
            this.meta.dataset.populated = 'true';
            console.log('RASEEL: Set meta information');
        }
    }

    updatePageTitle() {
        if (this.currentProject && document.title) {
            document.title = `${this.currentProject.title} - RASEEL Innovation Company`;
        }
    }

    updateMetaTags() {
        if (!this.currentProject) return;

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = this.currentProject.description || 
                `Project details for ${this.currentProject.title} by RASEEL Innovation Company.`;
        }

        // Update Open Graph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.content = `${this.currentProject.title} - RASEEL Innovation Company`;
        }

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.content = this.currentProject.description || 
                `Project details for ${this.currentProject.title}`;
        }

        const ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) {
            ogImage.content = this.currentProject.image;
        }
    }

    setupBackButton() {
        const backButton = document.querySelector('a[href="projects.html"]');
        if (backButton) {
            backButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.goBack();
            });
        }
    }

    goBack() {
        // Check if we can go back in history
        if (document.referrer && document.referrer.includes('projects.html')) {
            window.history.back();
        } else {
            window.location.href = 'projects.html';
        }
    }

    setupRelatedProjects() {
        if (!this.currentProject) return;

        // Find related projects (same category or similar type)
        const relatedProjects = this.getRelatedProjects();
        
        if (relatedProjects.length > 0) {
            this.displayRelatedProjects(relatedProjects);
        }
    }

    getRelatedProjects() {
        if (!this.currentProject || !window.RASEEL_PROJECTS) return [];

        const currentCategory = this.currentProject.category;
        const currentSlug = this.currentProject.slug;

        return window.RASEEL_PROJECTS
            .filter(project => 
                project.slug !== currentSlug && 
                (project.category === currentCategory || 
                 project.category.split(' / ')[0] === currentCategory.split(' / ')[0])
            )
            .slice(0, 3); // Show max 3 related projects
    }

    displayRelatedProjects(relatedProjects) {
        const relatedSection = document.createElement('section');
        relatedSection.className = 'py-16 bg-gray-50 dark:bg-gray-800';
        relatedSection.innerHTML = `
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Related Projects</h2>
                    <p class="text-gray-600 dark:text-gray-300">Explore more of our work in similar categories</p>
                </div>
                <div class="grid md:grid-cols-3 gap-8">
                    ${relatedProjects.map(project => this.createRelatedProjectCard(project)).join('')}
                </div>
            </div>
        `;

        // Insert before footer
        const footer = document.querySelector('footer');
        if (footer && footer.parentNode) {
            footer.parentNode.insertBefore(relatedSection, footer);
        }
    }

    createRelatedProjectCard(project) {
        const href = `project.html?slug=${encodeURIComponent(project.slug)}`;
        return `
            <div class="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
                <a href="${href}" class="group block">
                    <img class="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105" 
                         src="${project.image}" alt="${project.title}" />
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${project.title}</h3>
                        <p class="text-gray-600 dark:text-gray-400 mb-3">${project.category}</p>
                        <p class="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">${project.description}</p>
                        <div class="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>${project.location}</span>
                            <span>${project.year}</span>
                        </div>
                    </div>
                </a>
            </div>
        `;
    }

    redirectToProjects() {
        console.warn('RASEEL: Project not found, redirecting to projects page');
        window.location.href = 'projects.html';
    }

    // Add a new method for rendering the image carousel
    renderImageCarousel() {
        const images = this.currentProject.images || [this.currentProject.cover];
        const heroDiv = document.getElementById('hero');
        if (!heroDiv || !images.length) return;

        // Create carousel container
        const carousel = document.createElement('div');
        carousel.className = 'relative w-full';
        carousel.innerHTML = `
            <div id="carousel-images" class="relative w-full overflow-hidden rounded-2xl aspect-[16/9]">
                ${images.map((img, idx) => `
                    <img src="${img}" data-idx="${idx}" class="carousel-slide absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${idx === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}" alt="Project Image ${idx+1}" />
                `).join('')}
            </div>
            <button id="carousel-prev" class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow hover:bg-accent-500 hover:text-white transition-all z-20"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg></button>
            <button id="carousel-next" class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow hover:bg-accent-500 hover:text-white transition-all z-20"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></button>
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                ${images.map((_, idx) => `<span class="carousel-dot w-3 h-3 rounded-full bg-white border border-accent-500 ${idx === 0 ? 'bg-accent-500' : 'bg-white/70'} cursor-pointer transition-all"></span>`).join('')}
            </div>
        `;
        heroDiv.innerHTML = '';
        heroDiv.appendChild(carousel);

        // Carousel logic
        let current = 0;
        const slides = heroDiv.querySelectorAll('.carousel-slide');
        const dots = heroDiv.querySelectorAll('.carousel-dot');
        const showSlide = idx => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('opacity-100', i === idx);
                slide.classList.toggle('z-10', i === idx);
                slide.classList.toggle('opacity-0', i !== idx);
                slide.classList.toggle('z-0', i !== idx);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('bg-accent-500', i === idx);
                dot.classList.toggle('bg-white/70', i !== idx);
            });
            current = idx;
        };
        heroDiv.querySelector('#carousel-prev').onclick = () => {
            showSlide((current - 1 + slides.length) % slides.length);
        };
        heroDiv.querySelector('#carousel-next').onclick = () => {
            showSlide((current + 1) % slides.length);
        };
        dots.forEach((dot, idx) => {
            dot.onclick = () => showSlide(idx);
        });
    }
}

// Export for use in other scripts
window.ProjectDetailsHandler = ProjectDetailsHandler;