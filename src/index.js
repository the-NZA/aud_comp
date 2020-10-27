/* IMPORT SCRIPTS */
import Homepage from "./js/parts/homepage"
import Services from "./js/parts/services"
import Vue from 'vue';
import App from '@/App.vue';

window.addEventListener("DOMContentLoaded", function () {
	Homepage();
	Services();
});




Vue.config.productionTip = false;

if (document.querySelector("#app")) {
	new Vue({
		render: h => h(App),
	}).$mount('#app')
}


/* IMPORT STYLES */
import "./styles/index.css";