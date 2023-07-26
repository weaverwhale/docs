<template>
	<label for="search">Search All Documents</label>
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
			<div class="matches" v-if="search.length > 0 && matchingAreas(post)">
				<span>Matches found in: </span>
				<span class="tag" v-for="area in matchingAreas(post)" :key="area">{{ area }}</span>
			</div>
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
				return this.matchingAreas(post).length > 0
			})
		},

		postText() {
			return 'post' + (this.filteredPosts.length > 1 ? 's' : '')
		}
	},

	methods: {
		matchingAreas(post) {
			let matchingContent = Object.keys(post.frontmatter).filter((key) => {
				const includes = post.frontmatter[key].toString().toLowerCase().includes(this.search.toLowerCase())
				if(includes) return key
			})
			
			let contentHas = post.content.toString().toLowerCase().includes(this.search.toLowerCase())

			return [...matchingContent, contentHas && 'content'].filter(Boolean)
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

.matches {
	margin-bottom: 1em;
}

.matches span {
	display: inline-block;
	margin-right: 5px;
	margin-bottom: 5px;
	font-size: 0.9em;
}

span.tag {
	font-size: 0.8em;
	border-radius: 5px;
	background: var(--yellow);
	padding: 2px 5px;
	text-transform: capitalize;
	color: var(--black) !important;
}
</style>