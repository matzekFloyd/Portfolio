import S from '@sanity/desk-tool/structure-builder'
import MdSettings from 'react-icons/lib/md/settings'

const hiddenDocTypes = listItem =>
  !['about', 'home', 'projects', 'contact', 'category', 'person', 'sampleProject', 'siteSettings'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        )
        .icon(MdSettings),
      S.listItem()
        .title('Sample projects')
        .schemaType('sampleProject')
        .child(S.documentTypeList('sampleProject').title('Sample projects')),
      S.listItem()
        .title('People')
        .schemaType('person')
        .child(S.documentTypeList('person').title('People')),
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
      S.listItem()
        .title('About Me')
        .child(
          S.editor()
            .id('about')
            .schemaType('about')
            .documentId('singleton-about')
        ),
      S.listItem()
        .title('Contact')
        .child(
          S.editor()
            .id('contact')
            .schemaType('contact')
            .documentId('singleton-contact')
        ),
      S.listItem()
        .title('Home')
        .child(
          S.editor()
            .id('home')
            .schemaType('home')
            .documentId('singleton-home')
        ),
      S.listItem()
        .title('Projects')
        .child(
          S.editor()
            .id('projects')
            .schemaType('projects')
            .documentId('singleton-projects')
        ),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
