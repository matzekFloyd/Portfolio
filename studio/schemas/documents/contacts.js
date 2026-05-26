export default {
  name: 'contacts',
  type: 'document',
  title: 'Contacts',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'URL',
      name: 'url',
      type: 'string'
    },
    {
      title: 'Open in new tab',
      name: 'openInNewTab',
      type: 'boolean',
      initialValue: false,
      description:
        'For web and social links: open in a new tab when on, same tab when off. Email links always use the same window.'
    },
    {
      title: 'E-Mail?',
      name: 'isEmail',
      type: 'boolean'
    },
    {
      title: 'Social Media?',
      name: 'isSocialMedia',
      type: 'boolean',
    }
  ]
}
