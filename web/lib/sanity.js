import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'aartfjgc',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-11-01',
  useCdn: true
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source) {
  if (!source) return null
  return builder.image(source)
}
