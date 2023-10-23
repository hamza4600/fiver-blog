import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { FC } from 'react'
import styled from 'styled-components'

type SideBarProps = {
  children?: React.ReactNode
  title: string
  listArray?: any[]
  parentSlug?: string
}

const Sidebar = styled.div`
  color: ${(props) => props.theme.sideBar.color};
  background-color: ${(props) => props.theme.sideBar.background};
  border-inline-end: 1px solid ${(props) => props.theme.sideBar.border};
  overflow-y: auto; /* Enable scrolling within the sidebar */
  position: fixed;
  top: 56px;
  min-width: 300px;
  max-width: 300px;
  height: 100%;
  z-index: 1;
`

const SideBarInner = styled.div`
  padding-block: 1rem;
  position: relative;
`

const Container = styled.div``

const Title = styled.div`
  padding-top: 2rem;
  padding-bottom: 0.75rem;
  -webkit-padding-start: 2rem;

  h2 {
    font-size: 14px;
    font-weight: 500;
  }
`

type LinkProps = {
  isActived?: boolean
}

const Li = styled.li<LinkProps>`
  position: relative;
  display: flex;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  text-transform: capitalize;

  background-color: ${(props) =>
    props.isActived ? props.theme.sideBar.activeBackground : 'transparent'};

  a {
    color: ${(props) =>
      props.isActived
        ? props.theme.sideBar.activeColor
        : props.theme.sideBar.color};
    padding-inline-start: 2rem;
    text-decoration: none;
    min-height: 2rem;
    font-size: 13px;
    line-height: 2rem;
    width: -webkit-fill-available;

    box-shadow: ${(props) =>
      props.isActived
        ? 'inset 4px 0px 0px var(--ds-border-selected, #0c66e4)'
        : 'none'};
  }

  &:hover {
    background-color: ${(props) =>
      props.isActived
        ? props.theme.sideBar.activeBackground
        : props.theme.sideBar.hoverBackground};
  }
`
type ListItemProps = {
  children?: React.ReactNode
  href: string
  label: string
  isActived?: boolean
  parentSlug?: string
}

const ListItem: FC<ListItemProps> = ({
  href,
  label,
  isActived,
  parentSlug,
}) => (
  <Li
    key={`${href}${label}`}
    aria-label={label}
    aria-current={isActived}
    isActived={isActived}
  >
    <Link href={`/collection/${parentSlug}/${href}`} title={label}>
      {label}
    </Link>
  </Li>
)

const SideBar: FC<SideBarProps> = ({
  children,
  title,
  listArray,
  parentSlug,
}) => {
  const pathname = usePathname()

  const activeItem = listArray?.find((item) => {
    return item.slug.current === pathname.split('/')[3]
  })

  return (
    <Sidebar>
      <SideBarInner>
        <Container>
          <Title>
            <h2>{title}</h2>
          </Title>
          <ul>
            {listArray?.map((item, index) => (
              <ListItem
                key={item._id}
                href={item?.slug?.current}
                label={item.title}
                isActived={activeItem?._id === item._id}
                parentSlug={parentSlug}
              />
            ))}
          </ul>
        </Container>
        {children}
      </SideBarInner>
    </Sidebar>
  )
}

export default SideBar
