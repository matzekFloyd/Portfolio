import about from "@studio/schemas/documents/about";
import category from "@studio/schemas/documents/category";
import contact from "@studio/schemas/documents/contact";
import impressum from "@studio/schemas/documents/impressum";
import person from "@studio/schemas/documents/person";
import sampleProject from "@studio/schemas/documents/sampleProject";
import siteSettings from "@studio/schemas/documents/siteSettings";
import youtube from "@studio/schemas/documents/youtube";
import aboutPortableText from "@studio/schemas/objects/aboutPortableText";
import bioPortableText from "@studio/schemas/objects/bioPortableText";
import contactPortableText from "@studio/schemas/objects/contactPortableText";
import figure from "@studio/schemas/objects/figure";
import impressumPortableText from "@studio/schemas/objects/impressumPortableText";
import projectMember from "@studio/schemas/objects/projectMember";
import projectPortableText from "@studio/schemas/objects/projectPortableText";
import simplePortableText from "@studio/schemas/objects/simplePortableText";
import tryout from "@studio/schemas/objects/tryout";

export const schemaTypes = [
  bioPortableText,
  aboutPortableText,
  contactPortableText,
  impressumPortableText,
  figure,
  projectMember,
  projectPortableText,
  simplePortableText,
  tryout,
  category,
  impressum,
  person,
  sampleProject,
  siteSettings,
  about,
  contact,
  youtube,
];
