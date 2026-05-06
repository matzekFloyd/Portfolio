import {PortableText} from '@portabletext/react'

export function PortableTextContent({value}) {
  if (!value) return null
  return <PortableText value={value} />
}

export function blocksToText(blocks) {
  if (!Array.isArray(blocks)) return ''
  return blocks
    .filter((block) => block._type === 'block' && Array.isArray(block.children))
    .map((block) => block.children.map((child) => child.text).join(''))
    .join(' ')
}
