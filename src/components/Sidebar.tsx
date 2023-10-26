import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { FC, useEffect, useRef } from 'react'
import styled from 'styled-components'

import useWindos from '~/hooks/useWindos'

type SideBarProps = {
  children?: React.ReactNode
  title: string
  listArray?: any[]
  parentSlug?: string
  showSideMenu?: boolean
  closeSideMenu?: () => void
}

type StyleProps = {
  showMenu?: boolean
}

const Sidebar = styled.div<StyleProps>`
  color: ${(props) => props.theme.sideBar.color};
  background-color: ${(props) => props.theme.sideBar.background};
  border-inline-end: 1px solid ${(props) => props.theme.sideBar.border};
  overflow-y: auto; /* Enable scrolling within the sidebar */

  position: sticky;
  top: 56px;
  min-width: 300px;
  max-width: 300px;
  height: 100%;
  z-index: 1;
  flex-shrink: 0;
  height: calc(100vh - 56px);

  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100vh;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    ${(props) =>
    props.showMenu &&
    `
      transform: translateX(0);
    `}
  }
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

const BackgroundOverlay = styled.div`

  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.navbar.modalOverlay};

`;
const CloseMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M15.185 7.4l-3.184 3.185-3.186-3.186a.507.507 0 00-.712.003l-.7.701a.496.496 0 00-.004.712l3.185 3.184L7.4 15.185a.507.507 0 00.004.712l.7.7c.206.207.516.2.712.004l3.186-3.185 3.184 3.185a.507.507 0 00.712-.004l.701-.7a.496.496 0 00.003-.712l-3.186-3.186 3.186-3.184a.507.507 0 00-.003-.712l-.7-.7a.508.508 0 00-.36-.153.5.5 0 00-.353.15z" fill="currentColor" fill-rule="evenodd"></path></svg>
)

const CloeButton = styled.button`

  
  background-color: transparent;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 5px;

  svg {
    width: 24px;
    height: 24px;
    color: ${(props) => props.theme.searchModule.iconColor} !important;
  }

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.navbar.hoverBackground};

  }
`;

const ClosBox = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0rem;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  background-color: ${(props) => props.theme.sideBar.closeBox};

`;
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
  showSideMenu,
  closeSideMenu,
}) => {

  const { width } = useWindos()
  const isTablet = width < 1024;
  const ref = useRef(null)

  const pathname = usePathname()

  // if click outside of sidebar, close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (isTablet && showSideMenu) {
          closeSideMenu()
        }
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [closeSideMenu, isTablet, ref, showSideMenu])

  // also scroll lock when sidebar is open
  useEffect(() => {
    if (isTablet && showSideMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isTablet, showSideMenu])

  const activeItem = listArray?.find((item) => {
    return item.slug.current === pathname.split('/')[3]
  })

  return (
    <>
      {isTablet && showSideMenu && <BackgroundOverlay
        onClick={closeSideMenu}
        id="backgroundOverlay"

      />}
      <Sidebar
        className={isTablet && showSideMenu ? 'show' : ''}
        ref={ref}
        id="sidebar11"
        showMenu={showSideMenu}
        aeria-label="sidebar"
        aeria-hidden={isTablet && !showSideMenu}
        aeria-expanded={isTablet && showSideMenu}
      >
        {/* overlay  */}
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
          {
            isTablet &&
            <ClosBox>
              <CloeButton
                className="btn btn-icon"
                onClick={closeSideMenu}
              >
                <CloseMenu />
              </CloeButton>
            </ClosBox>
          }
        </SideBarInner>
      </Sidebar>
    </>
  )
}

export default SideBar
