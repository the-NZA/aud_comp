export function ToggleBodyScroll() {
	const bodyOverflow = document.body.style.overflow;

	if (document.body.style.overflow === "") {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "";
	}
}