import { BlockElementIcon, FolderIcon } from "@sanity/icons";

export const structure = (S) => {
  const hiddenDocTypes = (listItem) =>
    ![
      "about",
      "category",
      "contact",
      "impressum",
      "person",
      "sampleProject",
      "siteSettings",
    ].includes(listItem.getId());

  return S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home")
        .icon(FolderIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Projects")
        .icon(FolderIcon)
        .schemaType("sampleProject")
        .child(S.documentTypeList("sampleProject").title("Projects")),
      S.listItem()
        .title("About")
        .icon(FolderIcon)
        .child(S.document().schemaType("about").documentId("singleton-about")),
      S.listItem()
        .title("Contact")
        .icon(FolderIcon)
        .child(S.document().schemaType("contact").documentId("singleton-contact")),
      S.listItem()
        .title("Impressum")
        .icon(FolderIcon)
        .child(S.document().schemaType("impressum").documentId("singleton-impressum")),
      S.divider(),
      S.listItem()
        .title("Categories")
        .icon(BlockElementIcon)
        .schemaType("category")
        .child(S.documentTypeList("category").title("Categories")),
      S.listItem()
        .title("People")
        .icon(BlockElementIcon)
        .schemaType("person")
        .child(S.documentTypeList("person").title("People")),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ]);
};
