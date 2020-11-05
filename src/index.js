/* IMPORT SCRIPTS */
import Homepage from "./js/parts/homepage";
import Services from "./js/parts/services";
import Materials from "./js/parts/materials";
import Vue from 'vue';
import App from '@/App.vue';

window.addEventListener("DOMContentLoaded", function () {
	Homepage();
	Services();
	Materials();
});




Vue.config.productionTip = false;

if (document.querySelector("#app")) {
	new Vue({
		render: h => h(App),
	}).$mount('#app')
}


/* IMPORT STYLES */
import "./styles/index.css";