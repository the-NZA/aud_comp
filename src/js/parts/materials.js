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




export default function Materials() {
	if (document.querySelector(".materials")) {
		toggleCards();
	}
}