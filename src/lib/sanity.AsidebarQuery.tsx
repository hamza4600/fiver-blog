import sanityClient from '@sanity/client'
import groq from 'groq'

// export const getSideBarQuery = groq`
// [{
//     "collections": *[_type == "post"],
//     "navItems": *[_type == "collectionPage"]
//   }] |
//     {
//       "posts": collections[] | {
//         "_type": _type,
//         "title": title,
//         "slug": slug.current,
//         "contentType": _type,
//         "_ref" : _id
//       },
//       "collection": navItems[] | {
//         "_type": _type,
//         "title": title,
//         "slug": slug.current,
//         "contentType": _type,
//         "post": post[]
//       }
//     }
// `

export const getSideBarQuery = groq`

  *[_type == "collectionPage"] {
    "title": title,
    "slug": slug.current,
    "contentType": _type,
    "post": post[]->{
      "title": title,
      "slug": slug.current,
      "contentType": _type,
      "_ref" : _id
    }
  }

`

// get collec
const client = sanityClient({
  projectId: 'kjbi67ln',
  dataset: 'blog-dev',
  useCdn: true,
})

export const getSideBarData = () => {
  const data = client.fetch(getSideBarQuery)
  return data
}
