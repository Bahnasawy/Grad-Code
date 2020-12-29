<template>
	<ul>
		<li v-for="(file, author) in files" :key="author + generateRandomString()">
			<p className="p-1 text-sm font-semibold select-none">{{ author }}</p>
			<div
				v-for="(content, title) in files[author]"
				:key="title + generateRandomString()"
				className="ml-1 border-l border-gray-400"
			>
				<p
					className="p-1 text-xs transition duration-100 ease-in-out cursor-pointer select-none hover:bg-gray-400 active:bg-gray-600"
					@click="$emit('selectText', { selectedAuthor: author, selectedTitle: title })"
				>
					{{ title }}
				</p>
			</div>
		</li>
	</ul>
</template>

<script>
export default {
	emits: ["selectText"],
	props: ["files", "generateRandomString", "selectedText"],
};
</script>
