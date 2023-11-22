import Spotlight from 'spotlight.js/dist/spotlight.bundle.js'

document.addEventListener('DOMContentLoaded', () => {
	toggleMenu()
	toggleMobileSubMenu()

	// REMOVE DEFAULT ACTION AND LINK FROM PARENT NAVIGATION ITEMS

	if (document.querySelector('.no-link')) {
		const noLink = document.querySelectorAll('.no-link > a')

		noLink.forEach((link) => {
			link.removeAttribute('href')

			link.addEventListener('click', (e) => {
				e.preventDefault()
			})
		})
	}
})

/**
 * Toggle the state of the mobile menu
 *
 * @returns void
 */
const toggleMenu = () => {
	const menuButtons = document.querySelectorAll('[data-toggle-menu]')
	const mainElement = document.querySelector('main')
	const staggerContainers = document.querySelectorAll(
		'[data-animate-stagger-menu]'
	)

	menuButtons.forEach((btn) => {
		btn.addEventListener('click', () => {
			document.body.classList.toggle('menuIsOpen')
			document.documentElement.classList.toggle('overflow-hidden')

			if (document.body.classList.contains('menuIsOpen')) {
				staggerContainers.forEach((stagger) => {
					const elementsStagger = gsap.utils.toArray(stagger.children)

					gsap.from(elementsStagger, {
						y: 20,
						opacity: 0,
						delay: 0.5,
						stagger: 0.1,
					})
				})
			}
		})
	})

	const closeMenu = () => {
		document.body.classList.remove('menuIsOpen')
		document.documentElement.classList.remove('overflow-hidden')
	}

	mainElement.addEventListener('click', () => {
		if (document.body.classList.contains('menuIsOpen')) {
			closeMenu()
		}
	})

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && document.body.classList.contains('menuIsOpen')) {
			closeMenu()
		}
	})
}

/**
 * Toggles the mobile sub menu
 *
 * @returns void
 */
const toggleMobileSubMenu = () => {
	const toggles = document.querySelectorAll('[data-toggle-mobile-sub-menu]')

	toggles.forEach((toggle) => {
		toggle.addEventListener('click', () => {
			const parentEl = toggle.closest('[data-mobile-menu-item]')
			const subMenu = parentEl.querySelector('[data-mobile-sub-menu]')

			// Doesn't exist, bail early
			if (!subMenu) {
				return
			}

			subMenu.classList.toggle('hidden')
		})
	})
}
