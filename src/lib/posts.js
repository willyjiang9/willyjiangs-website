const rawPosts = import.meta.glob('../posts/*/index.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const rawAssets = import.meta.glob('../posts/*/*.{png,jpg,jpeg,webp,gif,svg}', {
  query: '?url',
  import: 'default',
  eager: true,
})

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function splitFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!match) return { data: {}, body: raw }
  const data = {}
  for (const line of match[1].split('\n')) {
    const i = line.indexOf(':')
    if (i === -1) continue
    const key = line.slice(0, i).trim()
    let value = line.slice(i + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    data[key] = value
  }
  return { data, body: raw.slice(match[0].length).trim() }
}

function slugFrom(path) {
  return path.match(/posts\/([^/]+)\/index\.md$/)?.[1] ?? ''
}

function assetMap() {
  const map = {}
  for (const [path, url] of Object.entries(rawAssets)) {
    const match = path.match(/posts\/([^/]+)\/([^/]+)$/)
    if (match) map[`${match[1]}/${match[2]}`] = url
  }
  return map
}

export function resolveSrc(slug, src) {
  if (!src || /^(https?:|data:|\/)/.test(src)) return src
  const file = src.replace(/^\.\//, '')
  return assets[`${slug}/${file}`] || src
}

export function formatDate(iso) {
  if (!iso) return ''
  const [year, month, day] = iso.split('-').map(Number)
  if (!year || !month || !day) return iso
  return `${MONTHS[month - 1]} ${day}, ${year}`
}

function readMinutes(body) {
  const words = body
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/[#>*_`\[\]\(\)]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

function excerptFrom(body) {
  const block = body
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .find((part) => part && !part.startsWith('#') && !part.startsWith('![') && !part.startsWith('- ') && !part.startsWith('> '))
  if (!block) return ''
  return block
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

const assets = assetMap()

const posts = Object.entries(rawPosts)
  .map(([path, raw]) => {
    const slug = slugFrom(path)
    const { data, body } = splitFrontmatter(raw)
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      category: (data.category || '').toLowerCase(),
      url: data.url || '',
      cover: data.cover ? resolveSrc(slug, data.cover) : '',
      minutes: readMinutes(body),
      body,
      excerpt: excerptFrom(body),
    }
  })
  .filter((post) => post.slug)
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

export function getPosts() {
  return posts
}

export function getPost(slug) {
  return posts.find((post) => post.slug === slug) || null
}
