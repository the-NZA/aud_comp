/* IMPORT SCRIPTS */
import Homepage from "./js/parts/homepage";
import Services from "./js/parts/services";
import Materials from "./js/parts/materials";
import Header from "./js/parts/header";
import Vue from 'vue';
import App from '@/App.vue';

window.addEventListener("DOMContentLoaded", function () {
	Homepage();
	Services();
	Materials();
	Header();
});

Vue.config.productionTip = false;

if (document.querySelector(".materials__main")) {
	const show_all_btn = document.querySelectorAll(".mcat__showall");
	show_all_btn.forEach(b => {
		b.addEventListener("click", e => {
			Vue.prototype.$fetch_slug = e.target.dataset.slug;

			new Vue({
				render: h => h(App),
			}).$mount('#modal_app')
		})
	});
}


/* IMPORT STYLES */
import "./styles/index.css";