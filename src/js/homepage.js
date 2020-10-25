function hoverIcons() {
	const serviceCards = document.querySelectorAll(".h_service_card");

	serviceCards.forEach(card => {
		const hoverDescr = card.querySelector(".h_service_card__hoverdescr");

		card.addEventListener("mouseover", e => {
			if (e.target.classList.contains("h_service_card__icon")) {
				hoverDescr.classList.add("h_service_card__hoverdescr--active");
			}
		});

		card.addEventListener("mouseout", e => {
			if (e.target.classList.contains("h_service_card__icon")) {
				hoverDescr.classList.remove("h_service_card__hoverdescr--active");
			}
		});
	});
}

export default function Homepage() {
	if (document.querySelector(".home__main")) {
		hoverIcons();
	}
}
