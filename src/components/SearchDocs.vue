<template>
	<input v-model="search" placeholder="Search posts" />
	<p v-for="post in filteredPosts">
		<a :href="post.url">{{ post.frontmatter.title }} - {{ post.frontmatter.description }}</a>
	</p>
	<p v-if="filteredPosts.length <= 0">Sorry, no results</p>
</template>

<script>
export default {
	props: ['posts'],
	data() {
		return {
			search: ''
		}
	},

	computed: {
		filteredPosts() {
			return this.posts.filter((post) => {
				return Object.keys(post.frontmatter).filter((key) => {
					return post.frontmatter[key].toLowerCase().includes(this.search.toLowerCase())
				}).length > 0
			})
		}
	}
}
</script>