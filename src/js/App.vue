<template>
	<div id="app">
		<HelloWorld msg="Component text" />
	</div>
</template>

<script>
	import HelloWorld from "./components/HelloWorld.vue";

	export default {
		name: "App",
		components: {
			HelloWorld,
		},
		data() {
			return {};
		},
		methods: {},
	};
</script>

<style>
#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>