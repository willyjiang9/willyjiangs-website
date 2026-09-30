import { useState } from 'react'
import { formatDate, getPosts } from '../lib/posts'

export default function Notes() {
  const posts = getPosts()
  const [filter, setFilter] = useState('all')
  const categories = [...new Set(posts.map((post) => post.category).filter(Boolean))]
  const visible = filter === 'all' ? posts : posts.filter((post) => post.category === filter)

  return (
    <section className="section wrap blog-page" id="blog">
      <h1 className="blog-heading">blog</h1>
      {posts.length === 0 ? <p className="blog-empty">nothing here yet.</p> : (
      <div className="blog-filters" role="tablist" aria-label="filter posts">
        <Filter count={posts.length} active={filter === 'all'} onClick={() => setFilter('all')}>all</Filter>
        {categories.map((category) => (
          <Filter
            key={category}
            count={posts.filter((post) => post.category === category).length}
            active={filter === category}
            onClick={() => setFilter(category)}
          >
            {category}
          </Filter>
        ))}
      </div>
      )}
      <div className="blog-grid">
        {visible.map((post) => {
          const external = /^https?:/.test(post.url)
          return (
            <a
              key={post.slug}
              className="blog-card"
              href={external ? post.url : `/blog/${post.slug}`}
              {...(external ? { target: '_blank', rel: 'noopener' } : {})}
            >
              <h2>
                {post.title}
                {external ? <span className="blog-out" aria-hidden="true">↗</span> : null}
              </h2>
              <p className="blog-meta">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span> · {post.minutes} min read</span>
              </p>
              {post.excerpt ? <p className="blog-excerpt">{post.excerpt}</p> : null}
            </a>
          )
        })}
      </div>
    </section>
  )
}

function Filter({ children, count, active, onClick }) {
  return (
    <button
      type="button"
      className={`blog-filter${active ? ' is-on' : ''}`}
      role="tab"
      aria-selected={active}
      onClick={onClick}
    >
      {children} ({count})
    </button>
  )
}
