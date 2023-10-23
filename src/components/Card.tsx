import Image from 'next/image'
import styled from 'styled-components'

import { urlForImage } from '~/lib/sanity.image'
import { type Post } from '~/lib/sanity.queries'
import { formatDate } from '~/utils'

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 5px;
  border: 1px solid #eaeaea;
  padding: 1rem;
`

export default function Card({ post }: { post: Post }) {
  return (
    <CardWrapper className="card">
      {post.mainImage ? (
        <Image
          className="card__cover"
          src={urlForImage(post.mainImage).width(500).height(300).url()}
          height={300}
          width={500}
          alt=""
        />
      ) : (
        <div className="card__cover--none" />
      )}
      <div className="card__container">
        <h3 className="card__title">
          <a className="card__link" href={`/post/${post.slug.current}`}>
            {post.title}
          </a>
        </h3>
        <p className="card__excerpt">{post.excerpt}</p>
        <p className="card__date">{formatDate(post._createdAt)}</p>
      </div>
    </CardWrapper>
  )
}
