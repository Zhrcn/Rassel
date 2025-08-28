/**
 * RASEEL Innovation Company - Enhanced Interactive Features
 * Modern JavaScript with performance optimizations and enhanced UX
 */

(function () {
	'use strict';

	// Global rounded theme
	try {
		if (document && document.body) {
			document.body.classList.add('rounded-theme');
		}
	} catch (e) {}

	// ==================== Utilities ==================== //
	const utils = {
		// Debounce function for performance
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
		},

		// Throttle function for scroll events
		throttle(func, wait) {
			let inThrottle;
			return function executedFunction(...args) {
				if (!inThrottle) {
					func.apply(this, args);
					inThrottle = true;
					setTimeout(() => inThrottle = false, wait);
				}
			};
		},

		// Safe localStorage operations
		storage: {
			get(key) {
				try {
					return localStorage.getItem(key);
				} catch (e) {
					console.warn('localStorage not available:', e);
					return null;
				}
			},
			set(key, value) {
				try {
					localStorage.setItem(key, value);
					return true;
				} catch (e) {
					console.warn('localStorage not available:', e);
					return false;
				}
			}
		},

		// Smooth scroll to element
		scrollTo(target, offset = 80) {
			const element = typeof target === 'string' ? document.querySelector(target) : target;
			if (!element) return;

			const elementTop = element.getBoundingClientRect().top;
			const offsetPosition = elementTop + window.pageYOffset - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
		},

		// Email validation
		isValidEmail(email) {
			const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return re.test(email);
		},

		// Generate unique ID
		generateId() {
			return 'id-' + Math.random().toString(36).substr(2, 9);
		}
	};

	// ==================== Header & Navigation ==================== //
	class HeaderController {
		constructor() {
			this.header = document.getElementById('site-header');
			this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
			this.mobileMenu = document.getElementById('mobile-menu');
			this.isMenuOpen = false;
			this.lastScrollY = 0;

			this.init();
		}

		init() {
			this.bindEvents();
			this.setActiveNavItem();
			this.handleInitialScroll();
		}

		bindEvents() {
			// Optimized scroll handler
			const scrollHandler = utils.throttle(() => this.handleScroll(), 16);
			window.addEventListener('scroll', scrollHandler, { passive: true });

			// Mobile menu toggle
			if (this.mobileMenuBtn && this.mobileMenu) {
				this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());

				// Close menu when clicking links
				this.mobileMenu.querySelectorAll('a').forEach(link => {
					link.addEventListener('click', () => this.closeMobileMenu());
				});

				// Close menu when clicking outside
				document.addEventListener('click', (e) => {
					if (this.isMenuOpen && !this.header.contains(e.target)) {
						this.closeMobileMenu();
					}
				});

				// Handle escape key
				document.addEventListener('keydown', (e) => {
					if (e.key === 'Escape' && this.isMenuOpen) {
						this.closeMobileMenu();
					}
				});
			}

			// Smooth scroll for anchor links
			document.querySelectorAll('a[href^="#"]').forEach(link => {
				link.addEventListener('click', (e) => {
					const href = link.getAttribute('href');
					if (href.length > 1) {
						e.preventDefault();
						utils.scrollTo(href);
					}
				});
			});
		}

		handleScroll() {
			if (!this.header) return;

			const currentScrollY = window.scrollY;
			const isScrollingDown = currentScrollY > this.lastScrollY;

			// Add scrolled class for styling
			if (currentScrollY > 50) {
				this.header.classList.add('scrolled');
			} else {
				this.header.classList.remove('scrolled');
			}

			this.lastScrollY = currentScrollY;
		}

		toggleMobileMenu() {
			this.isMenuOpen = !this.isMenuOpen;
			this.mobileMenu.classList.toggle('hidden');
			this.mobileMenu.classList.toggle('open');
			this.mobileMenuBtn.classList.toggle('active');
			this.mobileMenuBtn.setAttribute('aria-expanded', String(this.isMenuOpen));

			// Prevent body scroll when menu is open
			document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
		}

		closeMobileMenu() {
			if (!this.isMenuOpen) return;

			this.isMenuOpen = false;
			this.mobileMenu.classList.add('hidden');
			this.mobileMenu.classList.remove('open');
			this.mobileMenuBtn.classList.remove('active');
			this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
			document.body.style.overflow = '';
		}

		setActiveNavItem() {
			let currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
			if (!currentPage) currentPage = 'index.html';
			if (currentPage.indexOf('project.html') !== -1) currentPage = 'projects.html';

			const header = document.getElementById('site-header');
			const navLinks = header ? header.querySelectorAll('nav a, #mobile-menu a') : document.querySelectorAll('#mobile-menu a');

			navLinks.forEach(link => {
				const href = (link.getAttribute('href') || '').toLowerCase();
				const page = (href.split('#')[0] || 'index.html') || 'index.html';
				const normalized = page === '' || page === '.' || page === '/' ? 'index.html' : page;
				const isIndexAnchor = currentPage === 'index.html' && href.indexOf('#home') !== -1;
				const isActive = normalized === currentPage || isIndexAnchor;

				link.classList.toggle('active', isActive);
				link.classList.toggle('text-accent', isActive);
				link.classList.toggle('font-semibold', isActive);
				if (isActive) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
			});
		}

		handleInitialScroll() {
			this.handleScroll();
		}
	}

	class RevealController {
		constructor() {
			this.elements = document.querySelectorAll('.reveal');
			this.observer = null;
			this.init();
		}

		init() {
			if (!('IntersectionObserver' in window) || !this.elements.length) {
				this.fallback();
				return;
			}

			this.observer = new IntersectionObserver(
				(entries) => this.handleIntersection(entries),
				{
					threshold: 0.1,
					rootMargin: '0px 0px -50px 0px'
				}
			);

			// Add staggered animation delays
			this.elements.forEach((el, index) => {
				el.style.setProperty('--stagger', index);
				this.observer.observe(el);
			});
		}

		handleIntersection(entries) {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const el = entry.target;
					const delay = parseInt(el.style.getPropertyValue('--stagger') || '0') * 100;

					setTimeout(() => {
						el.classList.add('is-visible');
					}, delay);

					this.observer.unobserve(el);
				}
			});
		}

		fallback() {
			this.elements.forEach(el => {
				el.style.opacity = '1';
				el.style.transform = 'none';
			});
		}
	}

	// ==================== Theme Controller ==================== //
	class ThemeController {
		constructor() {
			this.themeBtn = document.getElementById('theme-toggle');
			this.rootEl = document.documentElement;
			this.currentTheme = 'light';

			this.init();
		}

		init() {
			// Load saved theme or detect system preference
			const savedTheme = utils.storage.get('theme');
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			this.currentTheme = savedTheme || systemTheme;

			this.applyTheme(this.currentTheme);
			this.bindEvents();
			this.createThemeToggle();
		}

		bindEvents() {
			// Listen for system theme changes
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
				if (!utils.storage.get('theme')) {
					this.currentTheme = e.matches ? 'dark' : 'light';
					this.applyTheme(this.currentTheme);
				}
			});

			if (this.themeBtn) {
				this.themeBtn.addEventListener('click', () => this.toggleTheme());
			}
		}

		createThemeToggle() {
			if (this.themeBtn || !document.querySelector('.nav-list')) return;

			// Create theme toggle button if it doesn't exist
			const themeToggle = document.createElement('button');
			themeToggle.id = 'theme-toggle';
			themeToggle.className = 'theme-toggle';
			themeToggle.setAttribute('aria-label', 'Toggle theme');
			themeToggle.innerHTML = `
				<svg class="sun-icon w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<circle cx="12" cy="12" r="5"/>
					<path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
				</svg>
				<svg class="moon-icon w-5 h-5 hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
				</svg>
			`;

			const navList = document.querySelector('.nav-list');
			if (navList) {
				navList.appendChild(themeToggle);
				this.themeBtn = themeToggle;
				this.themeBtn.addEventListener('click', () => this.toggleTheme());
			}
		}

		toggleTheme() {
			this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
			this.applyTheme(this.currentTheme);
			utils.storage.set('theme', this.currentTheme);
		}

		applyTheme(theme) {
			if (theme === 'dark') {
				this.rootEl.classList.add('dark');
			} else {
				this.rootEl.classList.remove('dark');
			}

			// Update theme toggle icon
			if (this.themeBtn) {
				const sunIcon = this.themeBtn.querySelector('.sun-icon');
				const moonIcon = this.themeBtn.querySelector('.moon-icon');

				if (sunIcon && moonIcon) {
					if (theme === 'dark') {
						sunIcon.classList.add('hidden');
						moonIcon.classList.remove('hidden');
					} else {
						sunIcon.classList.remove('hidden');
						moonIcon.classList.add('hidden');
					}
				}
			}

			// Update meta theme-color
			const metaTheme = document.querySelector('meta[name="theme-color"]');
			if (metaTheme) {
				metaTheme.setAttribute('content', theme === 'dark' ? '#1A202C' : '#d5ad65');
			}
		}
	}

	// ==================== Form Controller ==================== //
	class FormController {
		constructor() {
			this.form = document.getElementById('contact-form');
			this.status = document.getElementById('form-status');
			this.submitBtn = null;
			this.originalBtnText = '';

			if (this.form) {
				this.init();
			}
		}

		init() {
			this.submitBtn = this.form.querySelector('button[type="submit"]');
			this.originalBtnText = this.submitBtn?.textContent || 'Send Message';

			this.bindEvents();
			this.enhanceFormFields();
		}

		bindEvents() {
			this.form.addEventListener('submit', (e) => this.handleSubmit(e));

			// Real-time validation
			const inputs = this.form.querySelectorAll('input, textarea');
			inputs.forEach(input => {
				input.addEventListener('blur', () => this.validateField(input));
				input.addEventListener('input', () => this.clearFieldError(input));
			});
		}

		enhanceFormFields() {
			// Add floating labels effect
			const fields = this.form.querySelectorAll('.form-field');
			fields.forEach(field => {
				const input = field.querySelector('input, textarea');
				const label = field.querySelector('label');

				if (input && label) {
					// Handle focus states
					input.addEventListener('focus', () => field.classList.add('focused'));
					input.addEventListener('blur', () => {
						field.classList.remove('focused');
						if (input.value.trim()) {
							field.classList.add('filled');
						} else {
							field.classList.remove('filled');
						}
					});

					// Check initial state
					if (input.value.trim()) {
						field.classList.add('filled');
					}
				}
			});
		}

		validateField(field) {
			const value = field.value.trim();
			const fieldContainer = field.closest('.form-field');
			const isRequired = field.hasAttribute('required');
			let isValid = true;
			let errorMessage = '';

			// Remove previous errors
			this.clearFieldError(field);

			if (isRequired && !value) {
				isValid = false;
				errorMessage = 'This field is required';
			} else if (field.type === 'email' && value && !utils.isValidEmail(value)) {
				isValid = false;
				errorMessage = 'Please enter a valid email address';
			}

			if (!isValid) {
				this.showFieldError(field, errorMessage);
				fieldContainer.classList.add('error');
			} else {
				fieldContainer.classList.add('valid');
			}

			return isValid;
		}

		showFieldError(field, message) {
			const fieldContainer = field.closest('.form-field');
			let errorEl = fieldContainer.querySelector('.field-error');

			if (!errorEl) {
				errorEl = document.createElement('div');
				errorEl.className = 'field-error';
				errorEl.style.cssText = `
					color: var(--color-error);
					font-size: var(--font-size-xs);
					margin-top: var(--space-1);
					font-weight: var(--font-weight-medium);
					opacity: 0;
					transition: var(--transition-fast);
				`;
				fieldContainer.appendChild(errorEl);
			}

			errorEl.textContent = message;
			setTimeout(() => errorEl.style.opacity = '1', 10);
		}

		clearFieldError(field) {
			const fieldContainer = field.closest('.form-field');
			const errorEl = fieldContainer.querySelector('.field-error');

			if (errorEl) {
				errorEl.style.opacity = '0';
				setTimeout(() => errorEl.remove(), 150);
			}

			fieldContainer.classList.remove('error', 'valid');
		}

		async handleSubmit(e) {
			e.preventDefault();

			// Validate all fields
			const inputs = this.form.querySelectorAll('input, textarea');
			let isFormValid = true;

			inputs.forEach(input => {
				if (!this.validateField(input)) {
					isFormValid = false;
				}
			});

			if (!isFormValid) {
				this.showStatus('Please fix the errors above.', 'error');
				return;
			}

			// Show loading state
			this.setLoadingState(true);

			try {
				// Simulate form submission
				await this.simulateSubmission();
				this.showStatus('Thank you! Your message has been sent. We will get back to you shortly.', 'success');
				this.form.reset();

				// Clear states
				this.form.querySelectorAll('.form-field').forEach(field => {
					field.classList.remove('filled', 'valid');
				});

			} catch (error) {
				this.showStatus('Sorry, there was an error. Please try again.', 'error');
			} finally {
				this.setLoadingState(false);
			}
		}

		setLoadingState(isLoading) {
			if (!this.submitBtn) return;

			if (isLoading) {
				this.submitBtn.disabled = true;
				this.submitBtn.classList.add('loading');
				this.submitBtn.textContent = 'Sending...';
			} else {
				this.submitBtn.disabled = false;
				this.submitBtn.classList.remove('loading');
				this.submitBtn.textContent = this.originalBtnText;
			}
		}

		showStatus(message, type = 'info') {
			if (!this.status) return;

			this.status.textContent = message;
			this.status.className = `form-status ${type}`;

			// Auto-clear messages
			if (type === 'success') {
				setTimeout(() => {
					this.status.textContent = '';
					this.status.className = 'form-status';
				}, 5000);
			}
		}

		async simulateSubmission() {
			return new Promise((resolve) => setTimeout(resolve, 1500));
		}
	}

	// ==================== Performance & UX ==================== //
	class PerformanceController {
		constructor() {
			this.init();
		}

		init() {
			this.updateYear();
			this.setupScrollProgress();
			this.setupKeyboardNavigation();
		}

		updateYear() {
			const yearElements = document.querySelectorAll('#year, [data-year]');
			const currentYear = new Date().getFullYear();
			yearElements.forEach(el => el.textContent = currentYear);
		}

		setupScrollProgress() {
			const progressBar = document.createElement('div');
			progressBar.className = 'scroll-progress';
			progressBar.style.cssText = `
				position: fixed; top: 0; left: 0; width: 0%; height: 3px;
				background: linear-gradient(90deg, var(--color-accent), var(--color-secondary));
				z-index: calc(var(--z-fixed) + 1); transition: var(--transition-fast);
			`;

			document.body.appendChild(progressBar);

			const updateProgress = utils.throttle(() => {
				const scrollTop = window.pageYOffset;
				const docHeight = document.body.scrollHeight - window.innerHeight;
				const scrollPercent = (scrollTop / docHeight) * 100;
				progressBar.style.width = Math.min(scrollPercent, 100) + '%';
			}, 16);

			window.addEventListener('scroll', updateProgress, { passive: true });
		}

		setupKeyboardNavigation() {
			document.addEventListener('keydown', (e) => {
				if (e.key === 'Tab' && !e.shiftKey && document.activeElement === document.body) {
					const main = document.querySelector('main, #home');
					if (main) {
						e.preventDefault();
						main.focus();
					}
				}
			});
		}
	}

	// ==================== Project Filtering & Search ==================== //
	class ProjectsController {
		constructor() {
			this.projectsData = window.RASEEL_PROJECTS || [];
			this.filteredProjects = [...this.projectsData];
			this.currentView = 'grid'; // 'grid' or 'list'
			this.currentCategory = '';
			this.currentSearch = '';

			this.elements = {
				container: document.getElementById('project-grid'),
				searchInput: document.getElementById('project-search'),
				categoryFilter: document.getElementById('category-filter'),
				resultsCount: document.getElementById('results-count'),
				noResults: document.getElementById('no-results'),
				gridViewBtn: document.getElementById('grid-view'),
				listViewBtn: document.getElementById('list-view'),
				filterTags: document.getElementById('filter-tags')
			};

			if (this.elements.container) this.init();
		}

		init() {
			this.bindEvents();
			this.renderProjects();
			this.updateResultsCount();
		}

		bindEvents() {
			if (this.elements.searchInput) {
				this.elements.searchInput.addEventListener('input', 
					utils.debounce((e) => this.handleSearch(e.target.value), 300)
				);
			}

			if (this.elements.categoryFilter) {
				this.elements.categoryFilter.addEventListener('change', 
					(e) => this.handleCategoryFilter(e.target.value)
				);
			}

			if (this.elements.gridViewBtn) {
				this.elements.gridViewBtn.addEventListener('click', () => this.setView('grid'));
			}

			if (this.elements.listViewBtn) {
				this.elements.listViewBtn.addEventListener('click', () => this.setView('list'));
			}
		}

		handleSearch(query) {
			this.currentSearch = query.toLowerCase().trim();
			this.filterProjects();
		}

		handleCategoryFilter(category) {
			this.currentCategory = category;
			this.filterProjects();
			this.updateFilterTags();
		}

		filterProjects() {
			this.filteredProjects = this.projectsData.filter(project => {
				const matchesSearch = !this.currentSearch || 
					project.title.toLowerCase().includes(this.currentSearch) ||
					project.category.toLowerCase().includes(this.currentSearch);

				const matchesCategory = !this.currentCategory || 
					project.category.toLowerCase().includes(this.currentCategory.toLowerCase());

				return matchesSearch && matchesCategory;
			});

			this.renderProjects();
			this.updateResultsCount();
		}

		setView(view) {
			this.currentView = view;
			this.updateViewButtons();
			this.renderProjects();
		}

		updateViewButtons() {
			if (this.elements.gridViewBtn && this.elements.listViewBtn) {
				const isGrid = this.currentView === 'grid';
				
				this.elements.gridViewBtn.className = isGrid ? 
					'p-2 rounded-lg bg-accent text-white transition-all hover:bg-accent-dark' :
					'p-2 rounded-lg bg-gray-200 text-gray-600 transition-all hover:bg-gray-300';

				this.elements.listViewBtn.className = !isGrid ? 
					'p-2 rounded-lg bg-accent text-white transition-all hover:bg-accent-dark' :
					'p-2 rounded-lg bg-gray-200 text-gray-600 transition-all hover:bg-gray-300';
			}
		}

		updateFilterTags() {
			if (!this.elements.filterTags) return;

			const tags = [];
			if (this.currentSearch) {
				tags.push({
					type: 'search',
					label: `Search: "${this.currentSearch}"`,
					value: this.currentSearch
				});
			}
			if (this.currentCategory) {
				tags.push({
					type: 'category',
					label: `Category: ${this.currentCategory}`,
					value: this.currentCategory
				});
			}

			this.elements.filterTags.innerHTML = tags.map(tag => 
				`<span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">
					${tag.label}
					<button onclick="projectsController.removeFilter('${tag.type}')" class="hover:bg-accent/20 rounded-full p-1">
						<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
						</svg>
					</button>
				</span>`
			).join('');
		}

		removeFilter(type) {
			if (type === 'search') {
				this.currentSearch = '';
				if (this.elements.searchInput) this.elements.searchInput.value = '';
			} else if (type === 'category') {
				this.currentCategory = '';
				if (this.elements.categoryFilter) this.elements.categoryFilter.value = '';
			}
			this.filterProjects();
			this.updateFilterTags();
		}

		renderProjects() {
			if (!this.elements.container) return;

			if (this.filteredProjects.length === 0) {
				this.elements.container.style.display = 'none';
				if (this.elements.noResults) this.elements.noResults.classList.remove('hidden');
				return;
			}

			this.elements.container.style.display = 'grid';
			if (this.elements.noResults) this.elements.noResults.classList.add('hidden');

			// Update grid classes based on view
			const gridClasses = this.currentView === 'grid' ? 
				'grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500' :
				'grid grid-cols-1 gap-4 transition-all duration-500';
			
			this.elements.container.className = gridClasses;

			const projectsHTML = this.filteredProjects.map((project, index) => {
				const href = `project.html?slug=${encodeURIComponent(project.slug)}`;
				
				if (this.currentView === 'list') {
					return `
						<a href="${href}" class="group flex items-center gap-6 p-6 bg-white rounded-lgx shadow-soft hover:-translate-y-1 transition-all duration-300 reveal opacity-0 translate-y-6" style="--stagger: ${index}">
							<img class="w-24 h-24 object-cover rounded-lg flex-shrink-0 transition-transform duration-500 group-hover:scale-105" src="${project.image}" alt="${project.title}" loading="lazy" />
							<div class="flex-1">
								<h3 class="font-semibold text-lg group-hover:text-accent transition-colors">${project.title}</h3>
								<p class="text-text text-sm mt-1">${project.category}</p>
							</div>
							<svg class="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
							</svg>
						</a>
					`;
				} else {
					return `
						<a href="${href}" class="group block reveal opacity-0 translate-y-6 rounded-lgx overflow-hidden shadow-soft bg-white hover:-translate-y-2 transition-all duration-300 magnetic" style="--stagger: ${index}">
							<div class="relative overflow-hidden">
								<img class="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110" src="${project.image}" alt="${project.title}" loading="lazy" />
								<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								<div class="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-medium text-primary">
									${project.category}
								</div>
							</div>
							<div class="p-6">
								<h3 class="font-semibold text-lg group-hover:text-accent transition-colors">${project.title}</h3>
								<div class="flex items-center justify-between mt-2">
									<span class="text-text text-sm">${project.category}</span>
									<svg class="w-4 h-4 text-accent transform translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
									</svg>
								</div>
							</div>
						</a>
					`;
				}
			}).join('');

			this.elements.container.innerHTML = projectsHTML;

			// Re-trigger reveal animations
			setTimeout(() => {
				const reveals = this.elements.container.querySelectorAll('.reveal');
				reveals.forEach((el, index) => {
					setTimeout(() => el.classList.add('is-visible'), index * 100);
				});
			}, 50);
		}

		updateResultsCount() {
			if (this.elements.resultsCount) {
				const count = this.filteredProjects.length;
				const total = this.projectsData.length;
				this.elements.resultsCount.textContent = count === total ? 
					`Showing all ${total} projects` : 
					`Showing ${count} of ${total} projects`;
			}
		}

		updateFilterTags() {
			if (!this.elements.filterTags) return;

			const tags = [];
			if (this.currentSearch) {
				tags.push({
					type: 'search',
					label: `Search: "${this.currentSearch}"`,
					value: this.currentSearch
				});
			}
			if (this.currentCategory) {
				tags.push({
					type: 'category',
					label: `Category: ${this.currentCategory}`,
					value: this.currentCategory
				});
			}

			this.elements.filterTags.innerHTML = tags.length ? tags.map(tag => 
				`<span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">
					${tag.label}
					<button onclick="window.projectsController?.removeFilter('${tag.type}')" class="hover:bg-accent/20 rounded-full p-1 transition-colors">
						<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
						</svg>
					</button>
				</span>`
			).join('') : '';
		}
	}

	// ==================== Lazy Loading ==================== //
	class LazyLoadController {
		constructor() {
			this.images = document.querySelectorAll('img[loading="lazy"]');
			this.imageObserver = null;

			if (this.images.length) this.init();
		}

		init() {
			if ('IntersectionObserver' in window) {
				this.imageObserver = new IntersectionObserver(
					(entries) => this.handleImageIntersection(entries),
					{ rootMargin: '50px' }
				);

				this.images.forEach(img => {
					this.imageObserver.observe(img);
				});
			}
		}

		handleImageIntersection(entries) {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const img = entry.target;
					this.loadImage(img);
					this.imageObserver.unobserve(img);
				}
			});
		}

		loadImage(img) {
			const placeholder = img.getAttribute('data-placeholder');
			
			if (placeholder) {
				img.style.filter = 'blur(5px)';
				img.src = placeholder;
			}

			const actualSrc = img.getAttribute('data-src') || img.src;
			const newImg = new Image();
			
			newImg.onload = () => {
				img.src = actualSrc;
				img.style.filter = '';
				img.classList.add('loaded');
			};
			
			newImg.onerror = () => {
				img.classList.add('error');
			};
			
			newImg.src = actualSrc;
		}
	}

	// ==================== Statistics Counter ==================== //
	class StatsController {
		constructor() {
			this.statElements = document.querySelectorAll('.stat-number');
			this.hasAnimated = false;

			if (this.statElements.length) this.init();
		}

		init() {
			const observer = new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting && !this.hasAnimated) {
						this.hasAnimated = true;
						this.animateStats();
						observer.disconnect();
					}
				});
			}, { threshold: 0.5 });

			this.statElements.forEach(el => observer.observe(el));
		}

		animateStats() {
			this.statElements.forEach((el, index) => {
				const finalValue = el.textContent.replace(/[^\d]/g, '');
				const hasPlus = el.textContent.includes('+');
				const suffix = el.textContent.replace(/[\d\+]/g, '').trim();

				if (finalValue) {
					setTimeout(() => this.countUp(el, parseInt(finalValue), hasPlus, suffix), index * 200);
				}
			});
		}

		countUp(element, target, hasPlus = false, suffix = '') {
			const duration = 2000;
			const step = target / (duration / 16);
			let current = 0;

			const counter = () => {
				current += step;
				if (current < target) {
					element.textContent = (hasPlus ? '+' : '') + Math.floor(current).toLocaleString() + suffix;
					requestAnimationFrame(counter);
				} else {
					element.textContent = (hasPlus ? '+' : '') + target.toLocaleString() + suffix;
				}
			};

			element.textContent = '0';
			counter();
		}
	}

	// ==================== Initialize ==================== //
	const controllers = {};

	function initializeApp() {
		try {
			controllers.header = new HeaderController();
			controllers.reveal = new RevealController();
			controllers.theme = new ThemeController();
			controllers.form = new FormController();
			controllers.performance = new PerformanceController();
			controllers.stats = new StatsController();
			controllers.lazyLoad = new LazyLoadController();
			
			// Initialize projects controller on projects page
			if (document.getElementById('project-grid')) {
				controllers.projects = new ProjectsController();
				// Make it globally accessible for filter removal
				window.projectsController = controllers.projects;
			}

			// Enhanced smooth scrolling with accessibility
			document.querySelectorAll('a[href*="#"]').forEach(link => {
				link.addEventListener('click', function(e) {
					const href = this.getAttribute('href');
					
					// Skip if it's an external link or just a hash
					if (href.startsWith('http') || href === '#') return;
					
					const targetId = href.split('#')[1];
					if (!targetId) return;
					
					const target = document.getElementById(targetId);
					if (target && href.split('#')[0] === '' || href.split('#')[0] === window.location.pathname.split('/').pop()) {
						e.preventDefault();
						utils.scrollTo(target);
						
						// Improve accessibility by managing focus
						target.setAttribute('tabindex', '-1');
						setTimeout(() => {
							target.focus({ preventScroll: true });
							target.removeAttribute('tabindex');
						}, 500);
					}
				});
			});

			// Add loading animation to buttons
			document.querySelectorAll('a, button').forEach(element => {
				if (element.classList.contains('btn') || element.tagName === 'BUTTON') {
					element.addEventListener('click', function(e) {
						if (!this.disabled && this.type !== 'submit') {
							this.style.transform = 'scale(0.95)';
							setTimeout(() => {
								this.style.transform = '';
							}, 150);
						}
					});
				}
			});

			// Add magnetic effect to elements with keyboard support
			// document.querySelectorAll('.magnetic').forEach(element => {
			// 	const addEffect = () => this.style.transform = 'translateY(-4px) scale(1.02)';
			// 	const removeEffect = () => this.style.transform = '';
				
			// 	element.addEventListener('mouseenter', addEffect);
			// 	element.addEventListener('mouseleave', removeEffect);
			// 	element.addEventListener('focusin', addEffect);
			// 	element.addEventListener('focusout', removeEffect);
			// });

			// Add intersection observer for scroll animations
			const observeElements = document.querySelectorAll('[data-animate]');
			if (observeElements.length && 'IntersectionObserver' in window) {
				const animationObserver = new IntersectionObserver((entries) => {
					entries.forEach(entry => {
						if (entry.isIntersecting) {
							const animation = entry.target.dataset.animate;
							entry.target.classList.add(`animate-${animation}`);
							animationObserver.unobserve(entry.target);
						}
					});
				}, { threshold: 0.1 });

				observeElements.forEach(el => animationObserver.observe(el));
			}

			// Performance monitoring
			if ('performance' in window && 'measure' in performance) {
				performance.mark('app-init-end');
				try {
					performance.measure('app-init', 'navigationStart', 'app-init-end');
					const measure = performance.getEntriesByName('app-init')[0];
					console.log(`App initialized in ${measure.duration.toFixed(2)}ms`);
				} catch (e) {
					// Silently fail if performance API is not fully supported
				}
			}

			// Setup accessibility enhancements
			// this.setupAccessibilityEnhancements();
			
			console.log('RASEEL Innovation - App initialized successfully');
		} catch (error) {
			console.error('Error initializing:', error);
			// Show user-friendly error message
			const errorDiv = document.createElement('div');
			errorDiv.className = 'fixed top-4 right-4 z-50 p-4 bg-red-500 text-white rounded-lg shadow-lg';
			errorDiv.textContent = 'Something went wrong. Please refresh the page.';
			document.body.appendChild(errorDiv);
			setTimeout(() => errorDiv.remove(), 5000);
		}
	}
	
	// Accessibility Enhancement Function
	// function setupAccessibilityEnhancements() {
	// 	// Track keyboard navigation
	// 	let isUsingKeyboard = false;
		
	// 	document.addEventListener('keydown', (e) => {
	// 		if (e.key === 'Tab') {
	// 			isUsingKeyboard = true;
	// 			document.body.classList.add('keyboard-navigation');
	// 		}
			
	// 		// Skip if user is typing in an input
	// 		if (e.target.matches('input, textarea, select')) return;
			
	// 		// Alt + H for Home
	// 		if (e.altKey && e.key === 'h') {
	// 			e.preventDefault();
	// 			window.location.href = 'index.html#home';
	// 		}
			
	// 		// Alt + S for Services
	// 		if (e.altKey && e.key === 's') {
	// 			e.preventDefault();
	// 			window.location.href = 'services.html';
	// 		}
			
	// 		// Alt + P for Projects
	// 		if (e.altKey && e.key === 'p') {
	// 			e.preventDefault();
	// 			window.location.href = 'projects.html';
	// 		}
			
	// 		// Alt + C for Contact
	// 		if (e.altKey && e.key === 'c') {
	// 			e.preventDefault();
	// 			const contactSection = document.getElementById('contact');
	// 			if (contactSection) {
	// 				contactSection.scrollIntoView({ behavior: 'smooth' });
	// 				setTimeout(() => {
	// 					const firstInput = contactSection.querySelector('input, textarea');
	// 					if (firstInput) firstInput.focus();
	// 				}, 500);
	// 			} else {
	// 				window.location.href = 'index.html#contact';
	// 			}
	// 		}
			
	// 		// Escape to close mobile menu
	// 		if (e.key === 'Escape') {
	// 			const mobileMenu = document.getElementById('mobile-menu');
	// 			const mobileMenuBtn = document.getElementById('mobile-menu-btn');
	// 			if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
	// 				mobileMenuBtn?.click();
	// 			}
	// 		}
	// 	});
		
	// 	document.addEventListener('mousedown', () => {
	// 		isUsingKeyboard = false;
	// 		document.body.classList.remove('keyboard-navigation');
	// 	});
		
	// 	// Enhanced focus indicators
	// 	document.addEventListener('focusin', (e) => {
	// 		if (isUsingKeyboard && e.target.matches('a, button, input, textarea, select')) {
	// 			e.target.classList.add('keyboard-focused');
	// 		}
	// 	});
		
	// 	document.addEventListener('focusout', (e) => {
	// 		e.target.classList.remove('keyboard-focused');
	// 	});
		
	// 	// Mobile menu keyboard navigation
	// 	const mobileMenu = document.getElementById('mobile-menu');
	// 	if (mobileMenu) {
	// 		mobileMenu.addEventListener('keydown', (e) => {
	// 			const menuItems = mobileMenu.querySelectorAll('a');
	// 			const currentIndex = Array.from(menuItems).indexOf(e.target);
				
	// 			if (e.key === 'ArrowDown') {
	// 				e.preventDefault();
	// 				const nextIndex = (currentIndex + 1) % menuItems.length;
	// 				menuItems[nextIndex]?.focus();
	// 			} else if (e.key === 'ArrowUp') {
	// 				e.preventDefault();
	// 				const prevIndex = currentIndex === 0 ? menuItems.length - 1 : currentIndex - 1;
	// 				menuItems[prevIndex]?.focus();
	// 			}
	// 		});
	// 	}
		
	// 	// Respect reduced motion preferences
	// 	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
	// 		document.documentElement.style.setProperty('--animation-duration', '0.01ms');
	// 		document.documentElement.style.setProperty('--transition-duration', '0.01ms');
			
	// 		// Disable reveal animations
	// 		const reveals = document.querySelectorAll('.reveal');
	// 		reveals.forEach(el => {
	// 			el.classList.add('is-visible');
	// 			el.style.opacity = '1';
	// 			el.style.transform = 'translateY(0)';
	// 		});
	// 	}
		
	// 	// Create live region for screen readers
	// 	if (!document.getElementById('live-region')) {
	// 		const liveRegion = document.createElement('div');
	// 		liveRegion.id = 'live-region';
	// 		liveRegion.setAttribute('aria-live', 'polite');
	// 		liveRegion.setAttribute('aria-atomic', 'true');
	// 		liveRegion.className = 'sr-only';
	// 		document.body.appendChild(liveRegion);
	// 	}
	// }

	// Performance mark for initialization start
	if ('performance' in window && 'mark' in performance) {
		performance.mark('app-init-start');
	}

	// Initialize when ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initializeApp);
	} else {
		initializeApp();
	}

	// Global access
	window.RASEEL = { controllers, utils, version: '2.0.0' };

	// Service Worker registration for PWA capabilities (optional)
	if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
		window.addEventListener('load', () => {
			// Uncomment if you want to add service worker
			// navigator.serviceWorker.register('/sw.js')
			//   .then(reg => console.log('SW registered:', reg))
			//   .catch(err => console.log('SW registration failed:', err));
		});
	}

})();
