import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styled from 'styled-components'

import { urlForImage } from '~/lib/sanity.image'

type HeroProps = {
  articles: any[]
  parentSlug: string
}

const Root = styled.section`
  display: flex;
  box-sizing: border-box;
  gap: 24px;
  flex-direction: column;
  justify-content: stretch;

  .grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 1.5rem;
    padding: 2rem;
  }
`
const BlogCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  grid-column: span 12;
  border-radius: 4px;
  overflow: hidden;

  background-color: ${({ theme }) => theme.blogCard.bgColor} !important;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.blogCard.boxShadow};
  }
`
const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 224px;
  border-radius: 4px;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  box-sizing: border-box;
  width: 100%;
  grid-column: span 12;
  overflow: hidden;
  padding: 1rem;

  h3 {
    text-transform: capitalize;
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.blogCard.h1Color} !important;
  }

  p {
    color: ${({ theme }) => theme.blogCard.desColor} !important;
    font-size: 14px;
    line-height: 1.5;
  }
`

type GridCardProps = {
  img: string
  title: string
  description: string
  slug: string
  collectionSlug: string
}

const GridCrad: FC<GridCardProps> = ({
  img,
  title,
  description,
  slug,
  collectionSlug,
}) => {
  return (
    <Link href={`/collection/${collectionSlug}/${slug}`}>
      <BlogCard className="grid-card">
        <ImgWrapper className="grid-card__img">
          <Image src={img} alt={title} width={367} height={231} />
        </ImgWrapper>
        <TextWrapper className="grid-card__content">
          <h3 className="grid-card__title">{title}</h3>
          <p className="grid-card__description">{description}</p>
        </TextWrapper>
      </BlogCard>
    </Link>
  )
}

const ArticleGrid: FC<HeroProps> = ({ articles, parentSlug }) => {
  console.log(articles, 'articles')
  return (
    <Root>
      <div className="grid">
        {articles.map((article, index) => (
          <GridCrad
            key={index}
            img={urlForImage(article.mainImage).url() || ''}
            title={article.title}
            description={article.description}
            slug={article.slug?.current || ''}
            collectionSlug={parentSlug}
          />
        ))}
      </div>
    </Root>
  )
}

export default ArticleGrid
