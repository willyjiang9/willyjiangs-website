const FACTS = [
  ['recent', 'program management intern @ Boeing'], ['undergrad', 'b.a. business-economics @ ucr (2022-2025)'], ['post-grad', 'mba of oscm @ ucr (2025-2027)'],['based', 'riverside, ca'],
  ['roots', 'hayward, ca'], ['speaks', 'english · 中文'], 
]
export default function About() {
  return (
    <section className="section wrap" id="about">
      <div className="section-head reveal"><span className="num">01</span><h2>about</h2></div>
      <div className="about-grid">
        <div className="about-side reveal">
          {FACTS.map(([k, v]) => <div className="row" key={k}><span className="k">{k}</span><span>{v}</span></div>)}
        </div>
        <div className="about-lead reveal">
          <p>i’m always looking for my next challenge. i enjoy building, experimenting with new ideas, and being inspired by cool people doing cool things. i’m especially interested in technology, startups, and the way new products can solve real problems and change how people live and work.</p>
          <p>outside of work, i’m a hobby-hopper. the three things keeping me busiest right now are golf, basketball, and music, but i’m always picking up something new. i’ve also been lifting weights for about four years. my current best lifts are a 370 lb bench, 470 lb squat, and 585 lb deadlift.</p>
          <p>i love trying new foods, finding new places to eat, traveling when i get the chance, and meeting people with completely different interests and backgrounds. whether it’s talking about tech, business, a random side project, or where to find the best food, i’m always open to a good conversation.</p>
          <p>i’m always looking to learn from interesting people, work on ambitious ideas, and make new connections, so feel free to shoot me a message.</p>
        </div>
      </div>
    </section>
  )
}
