/** Shared fields for Portable Text `link` annotations (inline URLs in rich text). */
export const portableTextLinkFields = [
  {
    title: 'URL',
    name: 'href',
    type: 'url'
  },
  {
    title: 'Open in new tab',
    name: 'openInNewTab',
    type: 'boolean',
    initialValue: false,
    description:
      'When enabled, the link opens in a new browser tab (with safe rel attributes). Leave off to open in the same tab.'
  }
]
