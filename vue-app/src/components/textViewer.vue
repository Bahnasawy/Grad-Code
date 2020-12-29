<template>
	<p class="px-8 py-4 overflow-x-hidden overflow-y-auto text-lg font-semibold leading-relaxed bg-gray-300 row-span-8">
		<span v-if="selectedAuthor && selectedFeature && selectedFeature !== 'Disputed'">
			<span
				v-for="(text, textIdx) in files?.[selectedAuthor]?.[selectedTitle]?.content[selectedFeature]"
				:key="generateRandomString(textIdx)"
			>
				<span v-for="(token, tokenIdx) in text" :key="generateRandomString(tokenIdx)">
					<!-- <span>{{ files?.[selectedAuthor]?.[selectedTitle]?.highlight[selectedFeature][textIdx].toString() }}</span> -->
					<span v-if="isEqual(token, textIdx, tokenIdx)" class="relative group">
						<span
							class="relative text-red-700 transition duration-300 ease-in-out cursor-pointer group-hover:text-gray-100 group-hover:bg-red-700"
						>
							{{ token[0].join(" ") }} </span
						>{{ " " }}
						<span
							class="absolute left-0 invisible group-hover:visible z-10 px-1 bg-gray-700 opacity-0 top-full text-gray-50 group-hover:opacity-100 mt-0.5 whitespace-nowrap"
						>
							{{ selectedFeature }}, {{ token[1] }}
						</span>
					</span>
					<span v-else>
						<span v-if="Array.isArray(token[0])"> {{ token[0].join(" ") }} {{ " " }} </span>
						<span v-else>{{ token[0] }}{{ " " }}</span>
					</span> </span
				>{{ "." }}
				<br />
			</span>
		</span>
	</p>
</template>

<script>
export default {
	props: ["files", "selectedAuthor", "selectedTitle", "selectedFeature", "generateRandomString"],
	data() {
		return {
			highlight: [],
		};
	},
	beforeUpdate() {
		this.highlight = this.files?.[this.selectedAuthor]?.[this.selectedTitle]?.highlight[this.selectedFeature];
	},
	methods: {
		isEqual(token, textIdx, tokenIdx) {
			return Array.isArray(token[0]) && this.highlight[textIdx.toString()] === tokenIdx;
		},
	},
};
</script>
