import {PortableText} from '@portabletext/react'
import {urlFor} from './sanity'

function extractYouTubeId(url = '') {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&]+)/,
    /(?:youtu\.be\/)([^?&/]+)/,
    /(?:youtube\.com\/embed\/)([^?&/]+)/
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match?.[1]) return match[1]
  }
  return null
}

const components = {
  types: {
    figure: ({value}) => {
      const imageUrl = value ? urlFor(value).width(1400).fit('max').url() : null
      if (!imageUrl) return null
      return (
        <figure className="portableFigure">
          <img src={imageUrl} alt={value?.alt || ''} loading="lazy" />
          {value?.caption ? <figcaption>{value.caption}</figcaption> : null}
        </figure>
      )
    },
    youtube: ({value}) => {
      const id = extractYouTubeId(value?.url || '')
      if (!id) return null
      return (
        <div className="portableYoutube">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )
    }
  }
}

export function PortableTextContent({value}) {
  if (!value) return null
  return <PortableText value={value} components={components} />
}

export function blocksToText(blocks) {
  if (!Array.isArray(blocks)) return ''
  return blocks
    .filter((block) => block._type === 'block' && Array.isArray(block.children))
    .map((block) => block.children.map((child) => child.text).join(''))
    .join(' ')
}
