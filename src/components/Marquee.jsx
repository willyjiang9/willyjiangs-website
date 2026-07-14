const WORDS = ['Operations', 'Supply chain', 'Strategy', 'Project Management', 'Building things', 'Development']
export default function Marquee() {
  const items = [...WORDS, ...WORDS]
  return (
    <div className="strip" aria-hidden="true">
      <div className="marquee">{items.map((w, i) => <span key={i}>{w}</span>)}</div>
    </div>
  )
}
