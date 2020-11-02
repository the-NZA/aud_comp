import smoothscroll from 'smoothscroll-polyfill';

export default function Homepage() {
	if (document.querySelector(".home__main")) {
		homeScrollFunc();
	}
}

function homeScrollFunc() {
	smoothscroll.polyfill();

	const btn = document.querySelector(".home_hero__icon");

	btn.addEventListener("click", function () {
		window.scroll({
			top: document.querySelector(".home_hero").clientHeight - 20,
			left: 0,
			behavior: "smooth"
		});
	})
}