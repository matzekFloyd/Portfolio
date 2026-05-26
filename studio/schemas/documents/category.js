export default {
  name: 'category',
  type: 'document',
  title: 'Category',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'url',
      type: 'string',
      title: 'URL'
    },
    {
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
      description:
        'When the category appears as a link on a project page, open the URL in a new tab. Turn off to open in the same tab.'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    }
  ]
}
