<template>
	<input v-model="search" placeholder="Search post title, description and content" />
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
				let frontmatterHas = Object.keys(post.frontmatter).filter((key) => {
					return post.frontmatter[key].toLowerCase().includes(this.search.toLowerCase())
				}).length > 0
				
				let contentHas = post.content?.toLowerCase().includes(this.search.toLowerCase())

				return frontmatterHas || contentHas
			})
		}
	}
}
</script>