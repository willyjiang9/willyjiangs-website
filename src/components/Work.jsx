const EXPERIENCE = [
  { name: 'The Boeing Company', desc: 'Global Aerospace & Aviation | BCA 767 Program Management Intern', year: '2026', href: 'https://www.boeing.com/' },
  { name: 'Expeditors', desc: 'Global Freight Forwarding | Customs Brokerage Intern', year: '2025', href: 'https://www.expeditors.com/' },
  { name: 'Relish', desc: 'Marketing & Analytics Startup | Marketing & Management Intern', year: '2024', href: 'https://tryrelish.com/' },
  { name: 'Grandview Builder', desc: 'Residential Contracting | Project Manager', year: '2024', href: 'https://grandviewbuilder.com/' },
]

const PROJECTS = [
  { name: 'JobPilot', desc: 'Job applications on autopilot', year: '2026', href: '', building: true },
  { name: "r'courses", desc: 'Course reviews for UC Riverside', year: '2026', href: 'https://rcourses.org' },
  { name: 'memoiv', desc: 'Multi-user journaling app', year: '2026', href: 'https://memoiv.com' },
]

function Index({ items }) {
  return (
    <div className="idx">
      {items.map((p, i) => {
        const external = p.href.startsWith('http')
        const Tag = p.href ? 'a' : 'div'
        return (
          <Tag key={p.name} className="idx-row reveal" {...(p.href ? { href: p.href } : {})}
             {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
            <span className="idx-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="idx-main">
              <span className="idx-name">{p.name}</span>
              <span className="idx-desc">{p.desc}</span>
            </span>
            <span className="idx-meta">
              <span>{p.building ? <span className="idx-tag-building">Building</span> : p.year}</span>
              {p.href && <span className="idx-arrow">↗</span>}
            </span>
          </Tag>
        )
      })}
    </div>
  )
}

export default function Work() {
  return (
    <>
      <section className="section wrap" id="work">
        <div className="section-head reveal"><h2>experience</h2></div>
        <Index items={EXPERIENCE} />
      </section>
      <section className="section wrap" id="projects">
        <div className="section-head reveal"><h2>projects</h2></div>
        <Index items={PROJECTS} />
      </section>
    </>
  )
}
