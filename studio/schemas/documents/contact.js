export default {
  name: 'contact',
  type: 'document',
  title: 'Contact',
  // eslint-disable-next-line standard/array-bracket-even-spacing
  __experimental_actions: [/* 'create', */ 'update', /* 'delete', */ 'publish'],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string'
    }
  ]
}
