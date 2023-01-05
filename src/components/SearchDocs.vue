<template>
	<label for="search">Search Docs</label>
	<br />
	<input name="search" id="search" v-model="search" placeholder="Search title, description and content" />
	<p style="margin: 0;"><small v-if="search.length > 0 && filteredPosts.length > 0">{{ filteredPosts.length }} matching {{ postText }}</small>&nbsp;</p>
	<br />
	<hr />
	<br />
	<br />
	<div class="posts">
		<a v-for="post in filteredPosts" :href="post.url" class="post">
			<h2>{{ post.frontmatter.title }}</h2>
			<time datetime={post.frontmatter.pubDate}>
				{{new Date(post.frontmatter.pubDate).toLocaleDateString('en-us', {
					year: 'numeric',
					month: 'short',
					day: 'numeric',
				})}}
			</time>
			<p>{{ post.frontmatter.description }}</p>
		</a>
	</div>
	<p v-if="filteredPosts.length <= 0">Sorry, no results for "{{ search }}"</p>
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
		},

		postText() {
			return 'post' + (this.filteredPosts.length > 1 ? 's' : '')
		}
	}
}
</script>

<style scoped>
label {
	font-size: 0.9em;
}

input {
	min-width: 50%;
	padding: 0.5em;
}
</style>