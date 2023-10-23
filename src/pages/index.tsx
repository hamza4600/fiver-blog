import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

// import { useLiveQuery } from 'next-sanity/preview'
import Card from '~/components/Card'
import Container from '~/components/Container'
import Welcome from '~/components/Welcome'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getNavItems, getPosts, type Post } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[]
    navItems: any[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const posts = await getPosts(client)
  const navItems = await getNavItems(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
      navItems,
    },
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  // const [posts] = useLiveQuery<Post[]>(props.posts, postsQuery)
  const posts = props.posts
  const { navItems } = props
  // console.log(navItems)
  return (
    <>
      <Head>
        <title>Home page</title>
      </Head>
      <Container navItems={navItems}>
        {/* navbar  */}
        <section>
          {posts.length ? (
            posts.map((post) => <Card key={post._id} post={post} />)
          ) : (
            <Welcome />
          )}
        </section>
      </Container>
    </>
  )
}
