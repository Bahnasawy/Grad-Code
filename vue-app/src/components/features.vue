<template>
	<p className="font-bold">Statistics</p>
	<ul>
		<li v-for="(authors, feature) in features" :key="generateRandomString(feature)">
			<p
				class="p-1 text-sm font-semibold transition duration-100 ease-in-out cursor-pointer select-none hover:bg-gray-400 active:bg-gray-600"
				@click="$emit('selectFeature', feature)"
			>
				{{ feature }}
			</p>
			<div class="ml-1 border-l border-gray-400">
				<p v-for="(count, author) in authors" :key="generateRandomString(count)" class="p-1 text-xs select-none">
					{{ author }}: {{ count }}
				</p>
			</div>
		</li>
	</ul>
</template>

<script>
export default {
	emits: ["selectFeature"],
	props: ["features", "generateRandomString"],
};
</script>
