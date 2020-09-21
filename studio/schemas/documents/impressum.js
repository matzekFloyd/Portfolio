export default {
  name: 'impressum',
  type: 'document',
  title: 'Impressum',
  // eslint-disable-next-line standard/array-bracket-even-spacing
  __experimental_actions: [ /* 'create' , */ 'update', /* 'delete', */ 'publish'],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'impressumPortableText'
    },
    {
      title: 'Owner',
      name: 'owner',
      type: 'string'
    },
    {
      title: 'Address Line 1',
      name: 'addressLineOne',
      type: 'string'
    },
    {
      title: 'Address Line 2',
      name: 'addressLineTwo',
      type: 'string'
    },
    {
      title: 'Contact',
      name: 'contact',
      type: 'string'
    }
  ]
}
