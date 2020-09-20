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
