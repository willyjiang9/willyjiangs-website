import { formatDate, getPost } from '../lib/posts'
import Markdown from './Markdown'

export default function Note({ slug }) {
  const post = getPost(slug)

  if (!post) {
    return (
      <section className="section wrap note-page">
        <a className="note-back" href="/notes">← notes</a>
        <h1>that note isn't here</h1>
      </section>
    )
  }

  return (
    <article className="section wrap note-page">
      <a className="note-back" href="/notes">← notes</a>
      <h1>{post.title}</h1>
      {post.date ? <time className="note-date" dateTime={post.date}>{formatDate(post.date)}</time> : null}
      {post.cover ? <img className="note-hero" src={post.cover} alt="" /> : null}
      <Markdown slug={post.slug} source={post.body} />
    </article>
  )
}
