export const structure = (S) => {
  const hiddenDocTypes = (listItem) =>
    !['about', 'contact', 'impressum', 'category', 'person', 'sampleProject', 'siteSettings'].includes(listItem.getId())

  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Projects')
        .schemaType('sampleProject')
        .child(S.documentTypeList('sampleProject').title('Projects')),
      S.listItem()
        .title('People')
        .schemaType('person')
        .child(S.documentTypeList('person').title('People')),
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
      S.listItem()
        .title('About')
        .child(S.document().schemaType('about').documentId('singleton-about')),
      S.listItem()
        .title('Contact')
        .child(S.document().schemaType('contact').documentId('singleton-contact')),
      S.listItem()
        .title('Impressum')
        .child(S.document().schemaType('impressum').documentId('singleton-impressum')),
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
}
