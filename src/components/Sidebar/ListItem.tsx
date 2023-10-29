import Link from 'next/link'
import { FC } from 'react'
import styled from 'styled-components'

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
  onClick?: () => void
  subItems?: any[]
  slug?: string
}

const ListItem: FC<ListItemProps> = ({
  href,
  label,
  isActived,
  parentSlug,
  onClick,
  subItems,
  slug,
}) => (
  <>
    <Li
      key={`${href}${label}`}
      aria-label={label}
      aria-current={isActived}
      isActived={href === slug}
    >
      <Link
        href={`/collection/${parentSlug}/${href}`}
        title={label}
        onClick={onClick}
      >
        {label}
      </Link>
    </Li>
    {subItems &&
      subItems.length > 0 &&
      isActived &&
      subItems.map((item) => (
        <Li
          key={`${item.slug.current}${item.title}`}
          aria-label={item.title}
          aria-current={isActived}
          isActived={item.slug.current === slug}
        >
          <Link
            href={`/collection/${parentSlug}/${href}/${item.slug.current}`}
            title={item.title}
            onClick={onClick}
            style={{
              paddingLeft: '3.5rem',
            }}
          >
            {item.title}
          </Link>
        </Li>
      ))}
  </>
)

export default ListItem
