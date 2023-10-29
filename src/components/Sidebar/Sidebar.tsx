import { usePathname } from 'next/navigation'
import React, { FC, useEffect, useRef } from 'react'

import useWindos from '~/hooks/useWindos'

import ListItem from './ListItem'
import {
  BackgroundOverlay,
  CloeButton,
  ClosBox,
  CloseMenu,
  Container,
  Sidebar,
  SideBarInner,
  Title,
  UL,
} from './style'

type SideBarProps = {
  children?: React.ReactNode
  title: string
  listArray?: any[]
  parentSlug?: string
  showSideMenu?: boolean
  closeSideMenu?: () => void
  navItemList?: any[]
  isCollection?: boolean
  subDropdown?: any[]
}

const SideBar: FC<SideBarProps> = ({
  children,
  title,
  listArray,
  parentSlug,
  showSideMenu,
  closeSideMenu,
  navItemList,
  isCollection,
  subDropdown,
}) => {
  const { width } = useWindos()
  const isTablet = width < 1024
  const ref = useRef(null)

  const pathname = usePathname()
  const parts = pathname.split('/')
  const slug = parts[parts.length - 1]

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

  const activeItem1 = navItemList?.find((item) => {
    return item.slug.current === pathname.split('/')[2]
  })

  return (
    <>
      {isTablet && showSideMenu && (
        <BackgroundOverlay onClick={closeSideMenu} id="backgroundOverlay" />
      )}
      <Sidebar
        className={isTablet && showSideMenu ? 'show' : ''}
        ref={ref}
        id="sidebar11"
        showMenu={showSideMenu}
        aeria-label="sidebar"
        aeria-hidden={isTablet && !showSideMenu}
        aeria-expanded={isTablet && showSideMenu}
      >
        <SideBarInner>
          {isTablet && (
            <ClosBox>
              <CloeButton className="btn btn-icon" onClick={closeSideMenu}>
                <CloseMenu />
              </CloeButton>
            </ClosBox>
          )}
          <Container>
            {/* show all titles and blogs in side bar have two variations  one for mobile and one for the desktop */}
            {!isTablet && (
              <>
                {title && (
                  <Title>
                    <h2>{title}</h2>
                  </Title>
                )}
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
              </>
            )}
            {(isTablet || isCollection) && (
              <>
                <UL
                  style={{
                    marginTop: `${isCollection ? '1rem' : '2.5rem'}`,
                    marginBottom: '1rem',
                    paddingLeft: '0',
                  }}
                >
                  {navItemList?.map((item, index) => (
                    <ListItem
                      key={item._id}
                      href={item?.slug?.current}
                      label={item.title}
                      isActived={activeItem1?._id === item._id}
                      parentSlug={''}
                      onClick={closeSideMenu}
                      subItems={subDropdown}
                      slug={slug}
                    />
                  ))}
                </UL>
              </>
            )}
          </Container>
          {children}
        </SideBarInner>
      </Sidebar>
    </>
  )
}

export default SideBar
