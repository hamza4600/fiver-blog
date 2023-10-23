import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

import { NavItems, type Post } from './sanity.queries'

// get post on base of reference from sanity
export const postByCollectionNameQuery = groq`*[_type == "post" && 
  _id == $id][0]`

export async function getPostByCollectionName(
  client: SanityClient,
  id: string,
): Promise<Post[]> {
  return await client.fetch(postByCollectionNameQuery, {
    id,
  })
}

export const getAllPostByRef = (
  client: SanityClient,
  arry: string[],
): Promise<Post[][]> => {
  // on bases of array of reference get all post
  const data = arry.map((item) => {
    return client.fetch(postByCollectionNameQuery, {
      id: item,
    })
  })
  return Promise.all(data)
}

// get all  collection page from sanity
export const collectionPageQuery = groq`*[_type == "collectionPage"]`

export async function getCollectionPage(
  client: SanityClient,
): Promise<CollectionPage[]> {
  return await client.fetch(collectionPageQuery)
}

// get collection on based on collection name
export const collectionPageByCollectionNameQuery = groq`*[_type == "collectionPage" && slug.current == $slug][0]`

export async function getCollectionPageBySlug(
  client: SanityClient,
  slug: string,
): Promise<CollectionPage> {
  return await client.fetch(collectionPageByCollectionNameQuery, {
    slug,
  })
}

export interface CollectionPage {
  _type: 'collectionPage'
  _id: string
  _createdAt: string
  title?: string
  description?: string
  slug: Slug
  collection: NavItems
  headerImage?: ImageAsset
  post: Post[]
}

export const collectionSlugQuery = groq`
*[_type == "collectionPage" && defined(slug.current)][].slug.current
`
