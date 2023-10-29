import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import useSWR from 'swr'

import ArticleGrid from '~/components/BlogGrid'
import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getClientNavItems, getPosts, type Post } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const posts = await getPosts(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
    },
    revalidate: 60, // In seconds
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { posts } = props

  const fetcher = () => getClientNavItems()
  const { data } = useSWR('navitems', fetcher)

  return (
    <>
      <Head>
        <title>Home page</title>
      </Head>
      <Container navItems={data} isCollection={true}>
        <section>
          {posts.length ? (
            <ArticleGrid articles={posts} parentSlug={'server'} />
          ) : (
            <h1>There are no posts</h1>
          )}
        </section>
      </Container>
    </>
  )
}
