import { formatDate, getPost } from '../lib/posts'
import Markdown from './Markdown'

export default function Note({ slug }) {
  const post = getPost(slug)

  if (!post) {
    return (
      <section className="section wrap note-page">
        <a className="note-back" href="/#blog">← blog</a>
        <h1>that post isn't here</h1>
      </section>
    )
  }

  return (
    <article className="section wrap note-page">
      <header className="note-head">
        <a className="note-back" href="/#blog">← blog</a>
        <h1>{post.title}</h1>
        <p className="note-meta">
          {post.date ? <time dateTime={post.date}>{formatDate(post.date)}</time> : null}
          {post.date ? <span aria-hidden="true">·</span> : null}
          <span>{post.minutes} min read</span>
        </p>
      </header>
      {post.cover ? <img className="note-hero" src={post.cover} alt="" /> : null}
      <Markdown slug={post.slug} source={post.body} />
    </article>
  )
}
