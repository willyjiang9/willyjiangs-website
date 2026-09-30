import { resolveSrc } from '../lib/posts'

function isSpecial(line) {
  return /^(#{1,3} |[-*] |\d+\. |> )/.test(line) || /^!\[[^\]]*\]\([^)]+\)\s*$/.test(line)
}

function parseBlocks(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  const blocks = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) {
      i += 1
      continue
    }

    if (line.startsWith('### ')) {
      blocks.push({ type: 'h3', text: line.slice(4) })
      i += 1
      continue
    }
    if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.slice(3) })
      i += 1
      continue
    }
    if (line.startsWith('# ')) {
      blocks.push({ type: 'h1', text: line.slice(2) })
      i += 1
      continue
    }

    if (line.startsWith('> ')) {
      const quote = []
      while (i < lines.length && lines[i].startsWith('> ')) {
        quote.push(lines[i].slice(2))
        i += 1
      }
      blocks.push({ type: 'quote', text: quote.join(' ') })
      continue
    }

    if (/^[-*] /.test(line)) {
      const items = []
      while (i < lines.length && /^[-*] /.test(lines[i])) {
        items.push(lines[i].slice(2))
        i += 1
      }
      blocks.push({ type: 'ul', items })
      continue
    }

    if (/^\d+\. /.test(line)) {
      const items = []
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ''))
        i += 1
      }
      blocks.push({ type: 'ol', items })
      continue
    }

    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/)
    if (image) {
      blocks.push({ type: 'img', alt: image[1], src: image[2] })
      i += 1
      continue
    }

    const para = []
    while (i < lines.length && lines[i].trim() && !isSpecial(lines[i])) {
      para.push(lines[i].trim())
      i += 1
    }
    blocks.push({ type: 'p', text: para.join(' ') })
  }

  return blocks
}

function inline(text, slug, keyPrefix) {
  const re = /!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g
  const nodes = []
  let last = 0
  let match
  let n = 0

  while ((match = re.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index))
    const key = `${keyPrefix}-${n}`
    n += 1
    if (match[1] != null && match[2]) {
      nodes.push(<img key={key} src={resolveSrc(slug, match[2])} alt={match[1]} />)
    } else if (match[3] != null && match[4]) {
      const href = match[4]
      const external = /^https?:/.test(href)
      nodes.push(
        <a key={key} href={href} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
          {match[3]}
        </a>,
      )
    } else if (match[5] != null) {
      nodes.push(<strong key={key}>{match[5]}</strong>)
    } else if (match[6] != null) {
      nodes.push(<em key={key}>{match[6]}</em>)
    } else if (match[7] != null) {
      nodes.push(<code key={key}>{match[7]}</code>)
    }
    last = match.index + match[0].length
  }

  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

export default function Markdown({ slug, source }) {
  const blocks = parseBlocks(source)
  return (
    <div className="note-body">
      {blocks.map((block, i) => {
        const key = `${block.type}-${i}`
        if (block.type === 'h1') return <h2 key={key}>{inline(block.text, slug, key)}</h2>
        if (block.type === 'h2') return <h2 key={key}>{inline(block.text, slug, key)}</h2>
        if (block.type === 'h3') return <h3 key={key}>{inline(block.text, slug, key)}</h3>
        if (block.type === 'quote') return <blockquote key={key}>{inline(block.text, slug, key)}</blockquote>
        if (block.type === 'ul') {
          return (
            <ul key={key}>
              {block.items.map((item, j) => <li key={j}>{inline(item, slug, `${key}-${j}`)}</li>)}
            </ul>
          )
        }
        if (block.type === 'ol') {
          return (
            <ol key={key}>
              {block.items.map((item, j) => <li key={j}>{inline(item, slug, `${key}-${j}`)}</li>)}
            </ol>
          )
        }
        if (block.type === 'img') {
          return (
            <figure key={key}>
              <img src={resolveSrc(slug, block.src)} alt={block.alt} />
              {block.alt ? <figcaption>{block.alt}</figcaption> : null}
            </figure>
          )
        }
        return <p key={key}>{inline(block.text, slug, key)}</p>
      })}
    </div>
  )
}
