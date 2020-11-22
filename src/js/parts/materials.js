import { ToggleBodyScroll } from "./helpers";

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

function modal() {
	const showBtns = document.querySelectorAll(".mcat__showall");

	const modal = document.querySelector(".matfull")
	const closeBtn = modal.querySelector(".matfull__close")
	const modalBox = modal.querySelector(".matfull__container")

	showBtns.forEach(btn => {
		btn.addEventListener("click", e => {
			/* For track what API call must use */
			console.log(e.target.dataset.slug);

			ToggleBodyScroll();
			modal.classList.add("animated", "matfull--active", "matfull-anim-show")
			modalBox.classList.add("animated", "matfull__container--show")
		});
	});

	closeBtn.addEventListener("click", () => {
		ToggleBodyScroll();

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




export default function Materials() {
	if (document.querySelector(".materials")) {
		toggleCards();
		// detectSafari();
		modal();
	}
}