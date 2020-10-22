/* IMPORT SCRIPTS */
import Vue from 'vue';
import App from '@/App.vue';

Vue.config.productionTip = false;


if (document.querySelector("#app")) {
	new Vue({
		render: h => h(App),
	}).$mount('#app')
}


/* IMPORT STYLES */
import "./styles/index.css";