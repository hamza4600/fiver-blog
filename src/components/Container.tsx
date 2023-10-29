'use client'
import { useState } from 'react'
import styled from 'styled-components'

import Navbar from './Navbar'
import SideBar from './Sidebar/Sidebar'

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidth};
  min-height: 100vh;
`

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
`

const LayoutWrapper = styled.div`
  display: flex;
`

const MainContent = styled.div`
  flex: 1;

  .main-cont {
    min-height: calc(100vh - 160px);
  }
`

type ContainerProps = {
  children?: React.ReactNode
  navItems: any[]
  sideBarItems?: any[]
  parentSlug?: string
  sideBarTitle?: string
  isCollection?: boolean
  subDropdown?: any[]
}

export default function Container({
  children,
  navItems,
  sideBarItems,
  parentSlug,
  sideBarTitle,
  isCollection,
  subDropdown,
}: ContainerProps) {
  const [showSideMenu, setShowSideMenu] = useState(false)

  const toggleSideMenu = () => {
    setShowSideMenu(!showSideMenu)
  }

  return (
    <ContainerWrapper>
      <Header className="header">
        <Navbar navItemList={navItems} toggleSideMenu={toggleSideMenu} />
      </Header>
      <LayoutWrapper>
        <SideBar
          title={sideBarTitle}
          listArray={sideBarItems || []}
          parentSlug={parentSlug}
          showSideMenu={showSideMenu}
          closeSideMenu={toggleSideMenu}
          navItemList={navItems}
          isCollection={isCollection}
          subDropdown={subDropdown}
        />
        <MainContent>
          <div className="main-cont">{children}</div>
        </MainContent>
      </LayoutWrapper>
    </ContainerWrapper>
  )
}
