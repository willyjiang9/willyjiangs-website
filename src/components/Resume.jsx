import Magnetic from './Magnetic'

const RESUME_PDF = '/Willy_Jiang_Resume.pdf'

export default function Resume() {
  return (
    <section className="section wrap resume" id="resume">
      <div className="resume-row reveal">
        <div className="resume-copy">
          <h2>resume</h2>
          <p>1 page · pdf</p>
        </div>
        <div className="resume-bar">
          <Magnetic className="btn btn-solid" href={RESUME_PDF} download="Willy_Jiang_Resume.pdf">
            download pdf ↓
          </Magnetic>
          <a className="btn btn-ghost" href={RESUME_PDF} target="_blank" rel="noopener">
            open in new tab ↗
          </a>
        </div>
      </div>
    </section>
  )
}
