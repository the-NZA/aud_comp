import { doc } from "prettier";

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
	const allBtns = document.querySelectorAll(".mcat__showall");
	const modal = document.querySelector(".materials__all");
	const closeBtn = modal.querySelector(".matfull__close");

	allBtns.forEach(btn => {
		btn.addEventListener("click", e => {
			/* For track what API call must use */
			console.log(e.target.dataset.slug);

			modal.classList.add("materials__all--active", "matfull__show");
			document.body.style.overflow = "hidden";
		});
	});

	closeBtn.addEventListener("click", () => {
		modal.classList.remove("materials__all--active", "matfull__show");
		document.body.style.overflow = "auto";
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
		detectSafari();
		modal();
	}
}