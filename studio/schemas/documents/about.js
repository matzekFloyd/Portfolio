export default {
  name: 'about',
  type: 'document',
  title: 'About Me',
  // eslint-disable-next-line standard/array-bracket-even-spacing
  __experimental_actions: [/* 'create', */ 'update', /* 'delete', */ 'publish'],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      name: 'aboutImage',
      title: 'About image',
      type: 'figure'
    },
    {
      name: 'bodyLeftCol',
      title: 'Body Left Column',
      type: 'aboutPortableText'
    },
    {
      name: 'bodyRightCol',
      title: 'Body Right Column',
      type: 'aboutPortableText'
    }
  ]
}
