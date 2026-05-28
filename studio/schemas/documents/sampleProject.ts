import { format } from "date-fns";

export default {
  name: "sampleProject",
  title: "Sample project",
  type: "document",
  fields: [
    {
      title: "Hidden",
      name: "hidden",
      type: "boolean",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Some frontend will require a slug to be set to be able to show the project",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "publishedAt",
      title: "Published at",
      description: "You can use this field to schedule projects where you show them",
      type: "datetime",
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "simplePortableText",
    },
    {
      name: "members",
      title: "Members",
      type: "array",
      of: [{ type: "projectMember" }],
    },
    {
      name: "startedAt",
      title: "Started at",
      type: "datetime",
    },
    {
      name: "endedAt",
      title: "Ended at",
      type: "datetime",
    },
    {
      name: "previewImage",
      title: "Preview image",
      type: "figure",
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "figure",
    },
    {
      name: "secondaryImage",
      title: "Secondary image",
      description:
        "Optional second image shown in the right column on the project detail page, stacked below the main image.",
      type: "figure",
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    },
    {
      name: "tryout",
      title: "Tryout",
      type: "tryout",
    },
    {
      name: "body",
      title: "Body",
      type: "projectPortableText",
    },
    {
      name: "relatedProjects",
      title: "Related projects",
      type: "array",
      of: [{ type: "reference", to: { type: "sampleProject" } }],
    },
  ],
  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
      slug: "slug",
      media: "previewImage",
      tryoutEnabled: "tryout.enabled",
    },
    prepare({ title = "No title", publishedAt, slug = {}, media, tryoutEnabled }) {
      const dateSegment = format(publishedAt, "YYYY/MM");
      const path = `/${dateSegment}/${slug.current}/`;
      const subtitle = publishedAt ? path : "Missing publishing date";
      return {
        title: tryoutEnabled ? `${title} · Try it` : title,
        media,
        subtitle,
      };
    },
  },
};
