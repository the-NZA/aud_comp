import { ToggleBodyScroll } from "./helpers";

function mobileMenu() {
	const header = document.querySelector(".header__container");
	const nav = header.querySelector(".header__nav");
	const mobtoggler = header.querySelector(".header__mobtoggler");
	const menu = header.querySelector(".menu");

	mobtoggler.addEventListener("click", () => {
		ToggleBodyScroll();
		mobtoggler.classList.toggle("header__mobtoggler--active");

		if (nav.classList.contains("header__nav--active")) {
			nav.classList.remove("header__nav-anim-show");
			nav.classList.add("header__nav-anim-hide");

			menu.classList.remove("menu--show");
			menu.classList.add("menu--hide");

			window.setTimeout(() => {
				nav.classList.remove("header__nav--active", "header__nav-anim-hide");
				menu.classList.remove("menu--hide");
			}, 200);
		} else {
			nav.classList.add("animated", "header__nav--active", "header__nav-anim-show");
			menu.classList.add("animated", "menu--show");
		}

	});
}


export default function Header() {
	mobileMenu();
}