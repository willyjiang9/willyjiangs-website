const WORDS = ['Operations', 'Supply chain', 'AI', 'Technology','Strategy', 'Project Management', 'Building things', 'Process Improvement','Development']
export default function Marquee() {
  const items = [...WORDS, ...WORDS]
  return (
    <div className="strip" aria-hidden="true">
      <div className="marquee">{items.map((w, i) => <span key={i}>{w}</span>)}</div>
    </div>
  )
}
