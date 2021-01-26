<template>
	<div class="lds-ring">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
</template>

<script>
	export default {
		name: "Loader",
	};
</script>

<style >
.lds-ring {
	flex-grow: 1;
	background-color: var(--ghost-white);
	border-radius: var(--border-radius);
	display: flex;
	box-shadow: var(--main-shadow);
	margin: 5px;
	padding: var(--offset) var(--offset) 0 var(--offset);
	align-items: center;
	justify-content: center;
}

.lds-ring div {
	box-sizing: border-box;
	display: block;
	position: absolute;
	width: 130px;
	height: 130px;
	margin: 10px;
	border: 12px solid var(--wild_blue);
	border-radius: 50%;
	animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
	border-color: var(--wild_blue) transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
	animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
	animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
	animation-delay: -0.15s;
}
@keyframes lds-ring {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>