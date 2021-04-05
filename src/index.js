/* IMPORT SCRIPTS */
import Homepage from "./js/parts/homepage";
import Services from "./js/parts/services";
import Materials from "./js/parts/materials";
import Header from "./js/parts/header";
import Vue from 'vue';
import ModalApp from '@/ModalApp.vue';

window.addEventListener("DOMContentLoaded", function () {
	Homepage();
	Services();
	Materials();
	Header();
});

Vue.config.productionTip = false;
Vue.prototype.$IS_DEV = IS_DEV; // * Add current mode into Vue

if (document.querySelector(".materials__main")) {
	const show_all_btn = document.querySelectorAll(".mcat__showall");

	show_all_btn.forEach(b => {
		b.addEventListener("click", e => {
			Vue.prototype.$fetch_slug = e.target.dataset.slug; // * Set slug for fetching data from API

			/*
			* For each click creates new Vue instance 
			* Which will be destroyed on "hide" modal window
			*/
			new Vue({
				render: h => h(ModalApp),
			}).$mount('#modal_app')
		})
	});
}


/* IMPORT STYLES */
import "./styles/index.css";