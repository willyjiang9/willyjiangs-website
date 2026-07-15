const PROJECTS = [
  { name: 'The Boeing Company', desc: 'Global Aerospace & Aviation | BCA 767 Program Management Intern', year: '2026', href: 'https://www.boeing.com/', building: false },
  { name: 'Expeditors',  desc: 'Global Freight Forwarding | Customs Brokerage Intern', year: '2025', href: 'https://www.expeditors.com/', building: false },
  { name: 'Relish',  desc: 'Marketing & Analytics Startup | Marketing & Management Intern', year: '2024', href: 'https://tryrelish.com/', building: false },
  { name: 'Grandview Builder',   desc: 'Residential Contracting | Project Manager', year: '2024', href: 'https://grandviewbuilder.com/', building: false },
  { name: "r'courses", desc: 'Course reviews for UC Riverside', year: '2026', href: 'https://rcourses.org', building: false },
  { name: 'memoiv', desc: 'Multi-user journaling app', year: '2026', href: 'https://memoiv.com', building: false },
  
]

export default function Work() {
  return (
    <section className="section wrap" id="work">
      <div className="section-head reveal"><span className="num">00</span><h2>selected work</h2></div>
      <div className="idx">
        {PROJECTS.map((p, i) => {
          const external = p.href.startsWith('http')
          return (
            <a key={p.name} className="idx-row reveal" href={p.href}
               {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
              <span className="idx-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="idx-main">
                <span className="idx-name">{p.name}</span>
                <span className="idx-desc">{p.desc}</span>
              </span>
              <span className="idx-meta">
                <span>{p.building ? <span className="idx-tag-building">Building</span> : p.year}</span>
                <span className="idx-arrow">↗</span>
              </span>
            </a>
          )
        })}
      </div>
    </section>
  )
}
