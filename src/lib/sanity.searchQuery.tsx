import sanityClient from '@sanity/client'
import groq from 'groq'

const getAllDataQuery = groq`
*[(_type == "post" && defined(slug.current)) || (_type == "collectionPage" && defined(slug.current))]{
  _id, 
  title,
  slug,
  description,
  _type
}
`
const client = sanityClient({
  projectId: 'kjbi67ln',
  dataset: 'blog-dev',
  useCdn: true,
})

export const getAllData = () => {
  const data = client.fetch(getAllDataQuery)
  return data
}
