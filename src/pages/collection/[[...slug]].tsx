import { PortableText } from '@portabletext/react'
import type { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType,InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'

import ArticleGrid from '~/components/BlogGrid'
import Container from '~/components/Container'
import SectionHeroModule from '~/components/HeroSection'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { type CollectionPage, collectionSlugQuery, getAllPostByRef, getCollectionPageBySlug, getPostByCollectionName } from '~/lib/sanity.collection.queries'
import { urlForImage } from '~/lib/sanity.image'
import { getNavItems, getPost } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { formatDate } from '~/utils'


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

    console.log(post, "blogPost")

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
                sideBarTitle = {props.collection.title}
            >

                {
                    props.blogPostArticle ? (
                        <>

                            <section className="post">
                                {props.blogPostArticle.mainImage ? (
                                    <Image
                                        className="post__cover"
                                        src={urlForImage(props.blogPostArticle.mainImage).url() || ""}
                                        height={231}
                                        width={367}
                                        alt=""
                                    />
                                ) : (
                                    <div className="post__cover--none" />
                                )}
                                <div className="post__container">
                                    <p className="post__excerpt">{props.blogPostArticle.description}</p>
                                    <h1 className="post__title">{props.blogPostArticle.title}</h1>
                                    <p className="post__date">{formatDate(props.blogPostArticle._createdAt)}</p>
                                    <div className="post__content">
                                        <PortableText value={props.blogPostArticle.body} />
                                    </div>
                                </div>
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
