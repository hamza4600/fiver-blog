"use client";

import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

const AsideWrapper = styled.aside`
  min-width: 11.5rem;
  position: sticky;
  top: 60px;
  height: 100%;

  nav {
    padding-inline: 0.75rem;
    margin-block-start: 2rem;
    padding-block: 0.25rem;

    right: 0;
    z-index: 1000;
    background-color: transparent;
    border-inline-start: 1px solid ${(props) => props.theme.AsideBar.border};
  }
`

const InssideWrapper = styled.nav`
  h3 {
    font-size: 13px;
    font-weight: 500;
    color: ${(props) => props.theme.AsideBar.textColor};
    line-height: 1.5;
  }
  ul {
    margin-top: 8px;
  }
`
type AsideBarProps = {
  title: string
  contentArray: { title: string; id: string }[]
}

type LiProps = {
  isActive?: string
}

const Li = styled.li<LiProps>`
  position: relative;

  a {
    line-height: 1.5;
    font-size: 12px;
    font-weight: 400;
    color: ${(props) =>
    props.isActive === 'true'
      ? props.theme.AsideBar.activeColor
      : props.theme.AsideBar.textColor} !important;
  }

  &::before {
    content: '';
    width: 1px;
    height: calc(100% + 8px);
    position: absolute;
    left: -13px;
    top: -5px;
    background-color: ${(props) =>
    props.isActive === 'true'
      ? props.theme.AsideBar.activeColor
      : 'transparent'};
  }

  // hover effect
  &:hover {
    // a {
    //   color: ${(props) => props.theme.AsideBar.activeColor} !important;
    // }
    // &::before {
    //   background-color: ${(props) => props.theme.AsideBar.activeColor};
    // }
    background-color: rgba(0, 0, 0, 0.05);
  }
`
const AsideBar: FC<AsideBarProps> = ({ title, contentArray }) => {

  const [active, setActive] = useState('')
  console.log(active, "active==")
  useEffect(() => {
    if (contentArray.length > 0) {
      setActive(contentArray[0].id)
    }
  }, [contentArray])

  // update active link when scroll to other section
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollPos = window.pageYOffset
  //     const sections = document.querySelectorAll('h2')

  //     sections.forEach((section, index) => {
  //       const sectionTop = section.offsetTop
  //       const sectionHeight = section.clientHeight
  //       if (
  //         currentScrollPos >= sectionTop - sectionHeight * 0.25 &&
  //         currentScrollPos < sectionTop + sectionHeight * 0.75
  //       ) {
  //         setActive(`${section.id}`)
  //       }
  //     })
  //   }
  //   window.addEventListener('scroll', handleScroll)
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [])

  const handleClicked = (id: string) => {
    setActive(id)
    console.log(id, "id==")
  }

  return (
    <AsideWrapper>
      <InssideWrapper>
        <h3 className="aside-title">Contents</h3>
        <ul>
          {contentArray.map((item, index) => (
            <Li
              key={index + item.id}
              isActive={active === item.id ? 'true' : 'false'}
              onClick={(event) => {
                event.stopPropagation();
                handleClicked(item.id);
              }}
              aeria-current={active === item.id ? 'true' : 'false'}
            >
              <a
                href={`#${item.id}`} title={item.title}>
                {item.title}
              </a>
            </Li>
          ))}
        </ul>
      </InssideWrapper>
    </AsideWrapper>
  )
}

export default AsideBar
