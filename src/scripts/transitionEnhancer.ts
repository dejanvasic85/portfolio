/**
 * Enhanced page transition utilities for Astro portfolio
 * Handles client-side navigation enhancements and interactive elements
 */
export class TransitionEnhancer {
	constructor() {
		this.init();
	}

	/**
	 * Initialize transition event listeners
	 */
	private init(): void {
		// Add transition listeners
		document.addEventListener('astro:before-preparation', this.handleBeforePreparation.bind(this));
		document.addEventListener('astro:before-swap', this.handleBeforeSwap.bind(this));
		document.addEventListener('astro:after-swap', this.handleAfterSwap.bind(this));
	}

	/**
	 * Handle before page preparation
	 */
	private handleBeforePreparation(event: Event): void {
		// Add custom loading states
		document.body.classList.add('page-transitioning');
	}

	/**
	 * Handle before DOM swap
	 */
	private handleBeforeSwap(event: Event): void {
		// Before DOM swap
		this.preserveScrollPosition();
	}

	/**
	 * Handle after DOM swap
	 */
	private handleAfterSwap(event: Event): void {
		// After DOM swap - re-initialize any JavaScript components
		document.body.classList.remove('page-transitioning');
		this.initializeNewPageElements();
		this.handleScrollRestoration();
	}

	/**
	 * Store scroll position for restoration
	 */
	private preserveScrollPosition(): void {
		// Store scroll position for specific elements if needed
		const mainContent = document.querySelector('main');
		if (mainContent) {
			sessionStorage.setItem('scrollPosition', mainContent.scrollTop.toString());
		}
	}

	/**
	 * Handle scroll restoration or reset
	 */
	private handleScrollRestoration(): void {
		// Restore scroll position if needed, or scroll to top for new pages
		const shouldScrollToTop = !sessionStorage.getItem('preserveScroll');
		if (shouldScrollToTop) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
		sessionStorage.removeItem('preserveScroll');
	}

	/**
	 * Re-initialize JavaScript components after page swap
	 */
	private initializeNewPageElements(): void {
		// Re-initialize any components that need JavaScript
		this.initializeInteractiveElements();
	}

	/**
	 * Initialize interactive elements like hover effects and smooth scrolling
	 */
	private initializeInteractiveElements(): void {
		// Add hover effects to project cards
		const projectCards = document.querySelectorAll('.project-card');
		projectCards.forEach((card) => {
			const htmlCard = card as HTMLElement;
			htmlCard.addEventListener('mouseenter', () => {
				htmlCard.style.transform = 'translateY(-4px)';
			});

			htmlCard.addEventListener('mouseleave', () => {
				htmlCard.style.transform = 'translateY(0)';
			});
		});

		// Add smooth scrolling to anchor links
		const anchorLinks = document.querySelectorAll('a[href^="#"]');
		anchorLinks.forEach((link) => {
			link.addEventListener('click', (e) => {
				e.preventDefault();
				const href = link.getAttribute('href');
				if (href) {
					const target = document.querySelector(href);
					if (target) {
						target.scrollIntoView({ behavior: 'smooth' });
					}
				}
			});
		});
	}
}

/**
 * Initialize the TransitionEnhancer when DOM is ready
 */
export function initializeTransitions(): void {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => {
			new TransitionEnhancer();
		});
	} else {
		new TransitionEnhancer();
	}
}
