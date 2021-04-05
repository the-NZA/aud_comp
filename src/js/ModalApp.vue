<template>
	<div id="modal_app">
		<transition name="appear">
			<div
				v-if="showModal"
				@click.self="closeModal"
				class="mat_modal"
			>
				<transition name="slide">
					<div
						v-if="showContainer"
						class="mat_modal__container"
					>
						<div class="mat_modal__header">
							<h2 class="mat_modal__title">
								{{ Title }}
							</h2>
							<p class="mat_modal__descr">
								{{ Desc }}
							</p>

							<button
								@click="closeModal"
								class="mat_modal__close"
							>
								<img
									:src="
										path(
											'img/close.svg'
										)
									"
									alt="X"
								/>
							</button>

							<input
								class="mat_modal__search"
								type="search"
								name="search_file"
								id="filesearcher"
								placeholder="Поиск"
								v-model.trim="filter"
							/>
						</div>
						<loader v-if="isLoading" />
						<div v-else class="mat_modal__cards">
							<div
								v-for="card in Cards()"
								v-bind:key="card.time"
								class="modalcard"
							>
								<div class="modalcard__header">
									<h3
										class="modalcard__title"
									>
										{{ card.title }}
									</h3>
									<div
										class="modalcard__date"
									>
										{{
											card.timestring
										}}
									</div>
								</div>

								<div class="modalcard__body">
									<p>
										{{ card.desc }}
									</p>
								</div>

								<div
									class="modalcard__downlink"
								>
									<a
										:href="
											card.filelink
										"
										class="mcard__download download_link"
										download
										>Скачать</a
									>
								</div>
							</div>
						</div>
					</div>
				</transition>
			</div>
		</transition>
	</div>
</template>

<script>
	import Loader from "./components/Loader";
	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
	export default {
		name: "App",
		components: {
			Loader,
			/* Async Component generates separate files */
			// Loader: () => import("./components/Loader"),
		},
		data() {
			return {
				isLoading: true,
				showModal: false,
				showContainer: false,
				filter: "",
				fetched: {
					title: "",
					desc: "",
					materials: [],
				},
			};
		},
		computed: {
			Title() {
				return this.fetched.title === "" ? "..." : this.fetched.title;
			},
			Desc() {
				return this.fetched.desc === "" ? "..." : this.fetched.desc;
			},
		},
		methods: {
			closeModal() {
				document.body.style.overflow = "";
				this.showContainer = false;
				setTimeout(() => {
					this.showModal = false;
				}, 75);

				setTimeout(() => {
					this.$destroy();
				}, 100);

				// setTimeout(() => {
				// 	this.$parent.$emit("KILLAPP");
				// }, 100);
			},
			Cards() {
				if (this.filter === "") {
					return this.fetched.materials;
				} else {
					// const a = [...this.fetched.materials];
					const fltr = this.filter.toLowerCase();
					return this.fetched.materials.filter((card) => {
						return (
							card.title.toLowerCase().includes(fltr) ||
							card.desc.toLowerCase().includes(fltr)
						);
					});
				}
			},
			path(url) {
				return this.$IS_DEV ? url : `/static/${url}`;
			},
		},
		created() {
			// this.$on("KILLAPP", () => {
			// 	this.$destroy();
			// });
		},
		beforeCreate() {},
		beforeMount() {
			fetch(`http://localhost/api/matcategory?slug=${this.$fetch_slug}`, {
				method: "GET",
			})
				.then((r) => r.json())
				.then((d) => {
					Object.assign(this.fetched, d);
					this.fetched.materials = [...d.materials];
					setTimeout(() => {
						this.isLoading = false;
					}, 500);
					// console.log(d);
				})
				.catch((e) => {
					this.isLoading = false;
					console.error(e);
				});
		},
		beforeDestroy() {
			console.log("DESTROYED");
		},
		mounted() {
			document.body.style.overflow = "hidden";
			this.showModal = true;
			setTimeout(() => {
				this.showContainer = true;
			}, 75);
		},
	};
</script>

<style >
@keyframes opacity_appear {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

.appear-enter-active {
	animation: opacity_appear 0.15s;
}
.appear-leave-active {
	animation: opacity_appear 0.15s reverse;
}

.slide-enter-active,
.slide-leave-active {
	transition: transform 0.2s;
}

.slide-enter,
.slide-leave-to {
	transform: translateY(100%);
}

.mat_modal {
	position: fixed;
	display: flex;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	justify-content: center;
	align-items: center;

	background-color: rgba(0, 0, 0, 0.2);
	z-index: 2;

	padding: var(--offset-half);
}

@media screen and (max-width: 980px) {
	.mat_modal__container {
		border-width: var(--offset-half);
		min-height: 95vh;
		max-height: 100vh;
	}

	.mat_modal__header {
		padding-bottom: var(--offset-half);
	}

	.mat_modal__cards {
		padding: var(--offset-half) var(--offset-half) 0 var(--offset-half);
	}

	.modalcard {
		display: flex;
		flex-direction: column;
	}

	.modalcard__body {
		margin-top: auto;
	}

	.modalcard__header {
		flex-direction: column;
		align-items: flex-start;
	}

	.modalcard__title {
		align-self: flex-start;
		margin-bottom: calc(var(--offset-half) / 2);
	}

	.mat_modal__cards::after {
		height: 1px;
	}
}

@media screen and (max-width: 880px) {
	.mat_modal__cards {
		grid-template-columns: 1fr;
	}
}

@media screen and (max-width: 720px) {
	.mat_modal__header {
		grid-auto-rows: repeat(3, 1fr);
	}

	.mat_modal__descr {
		grid-column: 1/3;
	}

	.mat_modal__search {
		grid-column: 1/3;
		grid-row-start: 3;
		justify-self: start;
		max-width: 100%;
		width: 100%;
	}
}

@media screen and (max-width: 560px) {
	.mat_modal {
		padding: 0;
	}

	.mat_modal__container {
		height: 100%;
		border-radius: 0;
	}
}

.mat_modal__container {
	max-width: var(--site-width);
	width: 100%;
	background-color: var(--main-white);

	z-index: 3;
	min-height: 85vh;
	max-height: 90vh;

	overflow: scroll;
	scrollbar-width: none;

	display: flex;
	flex-direction: column;

	border: var(--offset) solid var(--main-white);
	border-radius: var(--offset-half);
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}
/* Hide scrollbar */
::-webkit-scrollbar {
	width: 0;
	height: 0;
}

.mat_modal__header {
	position: sticky;
	top: 0;
	background-color: var(--main-white);

	display: grid;
	grid-template-columns: 2fr 1fr;
	grid-template-rows: repeat(2, max-content);
	gap: var(--offset-half) 0;

	padding-bottom: var(--offset);
}

.mat_modal__title {
	/* grid-area: modal_title; */
	margin: 0;
}

.mat_modal__descr {
	/* grid-area: modal_descr; */
	grid-row-start: 2;
	margin: 0;
	color: var(--main-gray);
}

.mat_modal__close {
	/* grid-area: modal_btn; */
	justify-self: end;
	align-self: flex-start;
	appearance: none;

	width: 22px;
	height: 22px;
	padding: 8px;
	box-sizing: content-box;
	border-radius: 50%;
	border: none;
	background-color: var(--main-white);
	cursor: pointer;
	transition: var(--main-transition);

	& img {
		display: block;
		max-width: 100%;
		height: auto;
	}
}

.mat_modal__close:hover {
	background-color: var(--lavender);
}

.mat_modal__search {
	/* grid-area: modal_search; */
	grid-row-start: 2;
	max-width: 250px;
	max-height: calc(var(--offset) * 1.5);
	border-radius: 20px;
	padding: 10px var(--offset-half);
	border: 1px solid var(--light-gray);
	justify-self: end;
	align-self: flex-end;

	&:focus {
		outline: none;
	}
}

.mat_modal__cards {
	flex-grow: 1;
	overflow: auto;
	background-color: var(--ghost-white);
	border-radius: var(--border-radius);

	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-auto-rows: max-content;
	gap: var(--offset-half);
	box-shadow: var(--main-shadow);
	margin: 5px;

	padding: var(--offset) var(--offset) 0 var(--offset);
}

.mat_modal__cards::after {
	content: "";
	display: block;
	height: var(--offset-half);
	grid-column: 1/2;
}

.modalcard {
	background-color: var(--main-white);
	box-shadow: var(--main-shadow);
	border-radius: var(--border-radius);
	padding: calc(var(--offset-half) * 1.5);
}

.modalcard__header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: var(--offset-half);
}

.modalcard__title {
	margin: 0;
}

.modalcard__date {
	color: var(--main-gray);
}

.modalcard__body {
	margin-bottom: var(--offset-half);

	& p {
		margin: 0;
		line-height: 1.8;
		font-size: 0.9rem;
		color: var(--main-gray);
	}
}
</style>