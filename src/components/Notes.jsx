import { formatDate, getPosts } from '../lib/posts'

export default function Notes() {
  const posts = getPosts()

  return (
    <section className="section wrap notes-page">
      <div className="section-head">
        <span className="num">03</span>
        <h2>notes</h2>
      </div>
      <p className="notes-lead">things i find interesting, and whatever is on my mind.</p>
      <div className="note-list">
        {posts.map((post) => (
          <a key={post.slug} className="note-row" href={`/notes/${post.slug}`}>
            {post.cover
              ? <img className="note-cover" src={post.cover} alt="" />
              : <span className="note-cover" aria-hidden="true" />}
            <span className="note-copy">
              <span className="note-title">{post.title}</span>
              {post.excerpt ? <span className="note-excerpt">{post.excerpt}</span> : null}
            </span>
            <time className="note-date" dateTime={post.date}>{formatDate(post.date)}</time>
          </a>
        ))}
      </div>
    </section>
  )
}
