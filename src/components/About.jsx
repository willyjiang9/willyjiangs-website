const FACTS = [
  ['now', 'program management intern @ Boeing'], ['undergrad', 'b.a. business-economics @ ucr (2022-2025)'], ['post-grad', 'mba of oscm @ ucr (2025-2027)'],['based', 'riverside, ca'],
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
          <p>i am always looking for my next challenge. i enjoy building and being inspired by cool people doing cool things.</p>
          <p>i'm a hobby-hoppper. the top 3 things keeping me busy are golf, basketball and music. i've also been lifting weights for about four years now. currently i bench 370lbs, squat 465lbs and deadlift 575lbs.</p> 
          <p>i love trying new foods and eating out. always looking to make new connections, so shoot me a message.</p>
        </div>
      </div>
    </section>
  )
}
