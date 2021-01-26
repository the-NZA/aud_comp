import { ToggleBodyScroll } from "./helpers";
import smoothscroll from 'smoothscroll-polyfill';

function toggleCards() {
	const categories = document.querySelectorAll(".mcat");
	categories.forEach(cat => {
		const cards = cat.querySelectorAll(".mcard");

		cards.forEach(card => {
			card.addEventListener("click", e => {
				if (e.target.classList.contains("mcard__toggle")) {
					card.classList.toggle("mcard--active");
				}
			})
		});
	});

}

function modal(selector) {
	const showBtns = document.querySelectorAll(selector);

	const modal = document.querySelector(".matfull")
	const closeBtn = modal.querySelector(".matfull__close")
	const modalBox = modal.querySelector(".matfull__container")

	showBtns.forEach(btn => {
		btn.addEventListener("click", e => {
			/* For track what API call must use */
			// console.log(e.target.dataset.slug);

			ToggleBodyScroll();
			modal.classList.add("animated", "matfull--active", "matfull-anim-show")
			modalBox.classList.add("animated", "matfull__container--show")
		});
	});

	closeBtn.addEventListener("click", () => {
		document.body.style.overflow = ""

		modalBox.classList.remove("matfull__container--show")
		modalBox.classList.add("matfull__container--hide")

		modal.classList.remove("matfull-anim-show")
		modal.classList.add("matfull-anim-hide")

		window.setTimeout(() => {
			modalBox.classList.remove("matfull__container--hide")
			modal.classList.remove("matfull--active", "matfull-anim-hide")
		}, 250)

	});
}

/* 
* detectSafari just add specific class 
* for disable hack in safari browsers
*/
function detectSafari() {
	const usrAgnt = String(window.navigator.userAgent);
	if (usrAgnt.includes("Safari") && !usrAgnt.includes("Chrome")) {
		document.querySelector(".matfull__cards").classList.add("matfull__cards--safari")
	}
}

function scrollMatCats() {
	smoothscroll.polyfill();

	const widgetCategories = document.querySelector(".widget__categories");
	const menuLinks = widgetCategories.querySelectorAll("a");

	menuLinks.forEach(link => {
		link.addEventListener("click", e => {
			const toScroll = document.querySelector(`.materials__category[data-section="${e.target.dataset.slug}"]`);
			const pos = toScroll.getBoundingClientRect();

			window.scrollTo({
				behavior: "smooth", top: pos.y
			});
		});
	});

	widgetCategories.addEventListener("click", e => {
		if (e.target.dataset.slug) {
			menuLinks.forEach(link => {
				link.classList.remove("active");
			});
			e.target.classList.add("active");
		}
	});
}



export default function Materials() {
	if (document.querySelector(".materials")) {
		toggleCards();
		// detectSafari();
		scrollMatCats();
		// modal(".mcat__showall"); // modal open for show all btns
		// modal(".widget__categories li a"); // modal open for sidebar menu
	}
}