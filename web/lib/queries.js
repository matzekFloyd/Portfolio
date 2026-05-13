export const siteSettingsQuery = `*[_type == "siteSettings" && _id in ["siteSettings", "drafts.siteSettings"]][0]{
  title,
  subtitle,
  description,
  keywords,
  portrait
}`

export const latestProjectsQuery = `*[_type == "sampleProject" && hidden != true && defined(slug.current)]
  | order(coalesce(publishedAt, _createdAt) desc)[0...6]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  previewImage
}`

export const projectsQuery = `*[_type == "sampleProject" && hidden != true && defined(slug.current)]
  | order(coalesce(publishedAt, _createdAt) desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  previewImage
}`

export const projectSlugsQuery = `*[_type == "sampleProject" && hidden != true && defined(slug.current)]{
  "slug": slug.current
}`

export const projectBySlugQuery = `*[_type == "sampleProject" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  body,
  excerpt,
  mainImage,
  previewImage,
  tryout,
  "categories": categories[]->{
    _id,
    title,
    url
  }
}`

export const projectAvailabilityBySlugQuery = `*[_type == "sampleProject" && hidden != true && slug.current == $slug][0]{
  _id
}`

export const tryoutSlugsQuery = `*[_type == "sampleProject" && hidden != true && defined(slug.current) && tryout.enabled == true && defined(tryout.url)]{
  "slug": slug.current
}`

export const projectTryoutBySlugQuery = `*[_type == "sampleProject" && hidden != true && slug.current == $slug && tryout.enabled == true && defined(tryout.url)][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  tryout
}`

export const aboutQuery = `*[_type == "about" && _id in ["singleton-about", "drafts.singleton-about"]][0]{
  title,
  bodyLeftCol,
  bodyRightCol
}`

export const contactQuery = `*[_type == "contact" && _id in ["singleton-contact", "drafts.singleton-contact"]][0]{
  title,
  body,
  "contacts": contacts[]->{
    _id,
    title,
    url,
    isEmail,
    isSocialMedia
  }
}`

export const impressumQuery = `*[_type == "impressum" && _id in ["singleton-impressum", "drafts.singleton-impressum"]][0]{
  title,
  owner,
  addressLineOne,
  addressLineTwo,
  contact,
  body
}`
