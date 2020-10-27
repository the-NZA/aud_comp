function hoverIcons() {
	const serviceCards = document.querySelectorAll(".service_card");

	serviceCards.forEach(card => {
		const hoverDescr = card.querySelector(".service_card__hoverdescr");

		card.addEventListener("mouseover", e => {
			if (e.target.classList.contains("service_card__icon")) {
				hoverDescr.classList.add("service_card__hoverdescr--active");
			}
		});

		card.addEventListener("mouseout", e => {
			if (e.target.classList.contains("service_card__icon")) {
				hoverDescr.classList.remove("service_card__hoverdescr--active");
			}
		});
	});
}

export default function Services() {
	if (document.querySelector(".services")) {
		hoverIcons();
	}
}