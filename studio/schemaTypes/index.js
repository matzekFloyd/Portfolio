import category from '../schemas/documents/category'
import person from '../schemas/documents/person'
import sampleProject from '../schemas/documents/sampleProject'
import siteSettings from '../schemas/documents/siteSettings'
import about from '../schemas/documents/about'
import contact from '../schemas/documents/contact'
import youtube from '../schemas/documents/youtube'
import contacts from '../schemas/documents/contacts'
import impressum from '../schemas/documents/impressum'
import dashboardNote from '../schemas/documents/dashboardNote'

import bioPortableText from '../schemas/objects/bioPortableText'
import figure from '../schemas/objects/figure'
import projectMember from '../schemas/objects/projectMember'
import projectPortableText from '../schemas/objects/projectPortableText'
import simplePortableText from '../schemas/objects/simplePortableText'
import aboutPortableText from '../schemas/objects/aboutPortableText'
import contactPortableText from '../schemas/objects/contactPortableText'
import impressumPortableText from '../schemas/objects/impressumPortableText'

export const schemaTypes = [
  bioPortableText,
  aboutPortableText,
  contactPortableText,
  impressumPortableText,
  figure,
  projectMember,
  projectPortableText,
  simplePortableText,
  category,
  contacts,
  impressum,
  person,
  sampleProject,
  siteSettings,
  about,
  contact,
  youtube,
  dashboardNote
]
