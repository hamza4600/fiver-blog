import type { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import BlogContentSection from '~/components/BlogContent'
import ArticleGrid from '~/components/BlogGrid'
import Container from '~/components/Container'
import SectionHeroModule from '~/components/HeroSection'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { type CollectionPage, getAllPostByRef, getCollectionPageBySlug } from '~/lib/sanity.collection.queries'
import { urlForImage } from '~/lib/sanity.image'
import { getNavItems, getPost } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'


type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
interface Query {
    [key: string]: string
}

export const getServerSideProps: GetStaticProps<
    SharedPageProps & {
        collection: CollectionPage
        blogPost: any[]
        navItems: any[]
        parentSlug: string
        blogPostArticle?: any | null
    },
    Query
> = async ({ draftMode = false, params = {} }) => {
    const client = getClient(draftMode ? { token: readToken } : undefined)
    // if one slug is passed
    if (params.slug.length === 1) {
        const collection = await getCollectionPageBySlug(client, params.slug[0])
        const navItems = await getNavItems(client)

        let blogs_ref = [];
        if (collection.post && collection.post.length > 0) {
            collection.post.map((item) => {
                blogs_ref.push(item._ref)
            })
        }

        const blogPost = await getAllPostByRef(client, blogs_ref)

        if (!collection) {
            return {
                notFound: true,
            }
        }

        return {
            props: {
                draftMode,
                token: draftMode ? readToken : '',
                collection,
                blogPost,
                navItems,
                parentSlug: params.slug[0]
            },
        }
    }
    if (params.slug.length === 2) {
        const collection = await getCollectionPageBySlug(client, params.slug[0])
        const navItems = await getNavItems(client)
        // blog post data
        const blogPostArticle = await getPost(client, params.slug[1])

        let blogs_ref = [];
        if (collection.post && collection.post.length > 0) {
            collection.post.map((item) => {
                blogs_ref.push(item._ref)
            })
        }

        const blogPost = await getAllPostByRef(client, blogs_ref)

        if (!collection) {
            return {
                notFound: true,
            }
        }

        return {
            props: {
                draftMode,
                token: draftMode ? readToken : '',
                collection,
                blogPost,
                navItems,
                parentSlug: params.slug[0],
                blogPostArticle
            },
        }
    }
}

export default function ProjectSlugRoute(
    props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
    //   const [post] = useLiveQuery(props.post, postBySlugQuery, {
    //     slug: props.post.slug.current,
    //   })
    const post = props.blogPost
    const collection = props.collection

    // sidebar array
    const sideBarItems = post.map((item) => {
        return {
            title: item.title,
            slug: item.slug,
            _id: item._id,
        }
    })

    return (
        <>
            <Head>
                <title>{collection.title}</title>
            </Head>
            <Container
                navItems={props.navItems}
                sideBarItems={sideBarItems}
                parentSlug={props.parentSlug}
                sideBarTitle={props.collection.title}
            >

                {
                    props.blogPostArticle ? (
                        <>
                            <section className="post">
                                <SectionHeroModule
                                    title={props.blogPostArticle.title}
                                    subtitle={props.blogPostArticle.description}
                                    image={urlForImage(props.blogPostArticle.mainImage).url() || ""}
                                />
                                <BlogContentSection
                                    content={props.blogPostArticle.body}
                                />
                            </section>
                        </>
                    ) : (
                        <>
                            <SectionHeroModule
                                title={collection.title}
                                subtitle={collection.description}
                                image={urlForImage(collection.headerImage).url() || ""}
                            />
                            <ArticleGrid
                                articles={post}
                                parentSlug={props.parentSlug}
                            />
                        </>
                    )
                }
            </Container>
        </>
    )
}

// export const getStaticPaths = async () => {
//     const client = getClient()
//     const slugs = await client.fetch(collectionSlugQuery)
//     console.log(slugs, "SLUGS5555")
//     return {
//         paths: slugs?.map(({ slug }) => `/collection/${slug}`) || [],
//         fallback: 'blocking',
//     }
// }
