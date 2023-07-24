import { visit } from 'unist-util-visit'
import dedent from 'dedent'

const escapeHtml = (str) => str.replace(/[&<>"']/g, c => c)

export function remarkDiagram() {
  return function (tree, { data }) {
    if (!data.astro.frontmatter['extra']) {
      data.astro.frontmatter.extra = []
    }
    visit(tree, "code", node => {
      if (node.lang !== "mermaid") return
  
      node.type = "html"
      node.value = dedent`
        <div class="mermaid" data-content="${escapeHtml(node.value)}">
          <p>Loading graph...</p>
        </div>
      `
    })
  }
}