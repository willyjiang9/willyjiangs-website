import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import Magnetic from './Magnetic'

const RESUME_PDF = '/Willy_Jiang_Resume.pdf'
const RESUME_PREVIEW = '/resume-preview.png'

export default function Resume() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(!!reduce)

  return (
    <section className="section wrap" id="resume">
      <div className="section-head reveal">
        <span className="num">02</span>
        <h2>resume</h2>
      </div>

      <div className="resume-bar reveal">
        <Magnetic className="btn btn-solid" href={RESUME_PDF} download="Willy_Jiang_Resume.pdf">
          download pdf ↓
        </Magnetic>
        <a className="btn btn-ghost" href={RESUME_PDF} target="_blank" rel="noopener">
          open in new tab ↗
        </a>
      </div>

      <div className={`resume-stage${open ? ' is-open' : ''}${reduce ? ' is-reduce' : ''}`}>
        <button
          type="button"
          className="file-folder"
          aria-expanded={open}
          aria-controls="resume-sheet"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="file-tab">resume</span>
          <span className="file-face">
            <span className="file-name">Willy Jiang</span>
            <span className="file-meta">1 page · pdf</span>
            <span className="file-cue">{open ? 'close ←' : 'open →'}</span>
          </span>
        </button>

        <div className="file-panel" id="resume-sheet">
          <div className="file-panel-inner">
            <a
              className="file-sheet"
              href={RESUME_PDF}
              target="_blank"
              rel="noopener"
              aria-label="Open Willy Jiang resume PDF"
              tabIndex={open ? 0 : -1}
              onClick={(e) => { if (!open) e.preventDefault() }}
            >
              <img
                src={RESUME_PREVIEW}
                alt="Willy Jiang resume"
                width={1530}
                height={1980}
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
