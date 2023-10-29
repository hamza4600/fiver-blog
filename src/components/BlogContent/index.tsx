'use client'

import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { FC, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { generateId } from '~/hooks/generateId'
import useWindos from '~/hooks/useWindos'
import { urlForImage } from '~/lib/sanity.image'

import AsideBar from './Asidebar'

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`

const BlogContainer = styled.div`
  flex: 1;
  padding: 20px;
  max-width: 860px;
  position: relative;
  padding: 32px 80px 40px;

  color: ${({ theme }) => theme.blogSection.textColor} !important;

  p {
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 10px;
    font-weight: 300;
  }

  strong {
    font-weight: 500;
  }

  h2,
  h1 {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  h1 {
    font-size: 25px;
  }

  ul,
  ol {
    list-style: disc;
    margin-left: 30px;

    li {
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 10px;
      font-weight: 300 !important;
    }
  }

  a {
    color: #0c66e4;
    cursor: pointer;
    font-size: 14px;
    line-height: 1.5;

    &:hover {
      text-decoration: underline !important;
    }
  }

  @media (max-width: 1024px) {
    padding: 32px 24px 40px;
  }

  @media (max-width: 768px) {
    padding: 32px 16px 40px;
    max-width: 100%;
  }
`

const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 224px;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`

const CustomImage: FC<any> = ({ value }) => {
  return (
    <ImgWrapper>
      <Image
        src={urlForImage(value).url() || ''}
        alt=""
        width={769}
        height={224}
      />
    </ImgWrapper>
  )
}

const myPortableTextComponents = {
  types: {
    image: ({ value }) => {
      return <CustomImage value={value} />
    },
  },
}

type BlogContentProps = {
  content: any
}

const BlogContentSection: FC<BlogContentProps> = ({ content }) => {
  const [h2Tags, setH2Tags] = useState([])
  const ref = useRef(null)
  const { width } = useWindos()
  const isMobile = width < 768

  useEffect(() => {
    if (ref.current) {
      const h2Tags: NodeListOf<HTMLHeadingElement> =
        ref.current.querySelectorAll('h2')

      // Create an array of objects with id and title
      const h2TagsData = Array.from(h2Tags)
        .map((h2) => {
          const title = h2.textContent || ''
          if (title.trim()) {
            return {
              id: generateId(title),
              title: title,
            }
          }
          return null // Skip empty titles
        })
        .filter(Boolean)

      // Set the array of h2 tags data in state
      setH2Tags(h2TagsData)

      // Give id to h2 tags directly
      h2Tags.forEach((h2) => {
        const title = h2.textContent || ''
        if (title.trim()) {
          h2.setAttribute('id', generateId(title))
        }
      })
    }
  }, [])

  return (
    <Root>
      <BlogContainer ref={ref} className="blog-content">
        <PortableText value={content} components={myPortableTextComponents} />
      </BlogContainer>
      {!isMobile && (
        <AsideBar title="Table of Contents" contentArray={h2Tags} />
      )}
    </Root>
  )
}

export default BlogContentSection
