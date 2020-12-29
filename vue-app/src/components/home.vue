<template>
	<div className="grid h-screen grid-cols-10 grid-rows-20">
		<!-- Header -->
		<Header />
		<!-- File Preview -->
		<div className="col-span-2 p-4 bg-gray-200 row-span-19">
			<p className="font-bold">File Explorer</p>
			<FileExplorer v-bind="{ selectedText, files, generateRandomString }" @selectText="selectText" />
		</div>
		<!-- Corpus -->
		<div className="grid col-span-6 row-span-19 grid-rows-10">
			<TextViewer
				v-bind="{
					...this.selectedText,
					selectedFeature: this.selectedFeature,
					files: this.files,
					generateRandomString: this.generateRandomString,
				}"
			/>
			<div className="row-span-2 p-4 bg-gray-500">
				<!-- <Definition :definition="definition" /> -->
			</div>
		</div>
		<!-- Statistics -->
		<div className="col-span-2 p-4 bg-gray-200 row-span-19">
			<Features v-bind="{ features, generateRandomString }" @selectFeature="selectFeature" />
		</div>
	</div>
</template>

<script>
import { get } from "superagent";
import Header from "./header";
import FileExplorer from "./fileExplorer";
import TextViewer from "./textViewer";
import Features from "./features";

export default {
	components: {
		Header,
		FileExplorer,
		TextViewer,
		Features,
	},
	beforeMount() {
		this.getFiles();
	},
	data() {
		return {
			selectedText: {
				selectedAuthor: "",
				selectedTitle: "",
			},
			selectedFeature: "",
			features: {
				"Unmarked Theme": {
					Obama: 0,
				},
				"Marked Theme": {
					Obama: 0,
				},
				Disputed: {
					Obama: 12,
				},
			},
			definition: undefined,
			files: undefined,
		};
	},
	methods: {
		selectText(text) {
			this.selectedText = text;
		},
		selectFeature(text) {
			this.selectedFeature = text;
		},
		generateRandomString(key) {
			return (
				key +
				Math.random()
					.toString(20)
					.substr(2, 6)
			);
		},
		getFiles() {
			get("http://localhost:5000")
				.then(({ body }) => {
					this.$data.files = body;
					["Unmarked Theme", "Marked Theme"].map((feature) => {
						body?.["Obama"]?.["Text 1"]?.highlight[feature].forEach((item) => {
							this.features[feature]["Obama"] += item !== -1 ? 1 : 0;
						});
					});
				})
				.catch((e) => console.log(e));
		},
		getDefinition(word) {
			get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
				.then(({ body }) => {
					this.definition = body;
				})
				.catch(() => (this.definition = [{ word: "Word not in dictionary", meanings: [], phonetics: [] }]));
		},
	},
};
</script>
