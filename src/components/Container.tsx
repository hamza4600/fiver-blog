'use client'
import styled from 'styled-components'

import Navbar from './Navbar'
import SideBar from './Sidebar'

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidth};
  min-height: 100vh;
`

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`

const LayoutWrapper = styled.div`
  display: flex;
  overflow: hidden; /* Prevent scroll on the entire layout */
`

const MainContent = styled.div`
  flex: 1; /* Take up remaining space */
  padding: 20px;
  overflow-y: auto; /* Enable scrolling in the main content */
  padding-left: 300px; /* Same width as the sidebar + left padding */
`

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
`

type ContainerProps = {
  children?: React.ReactNode
  navItems: any[]
  sideBarItems?: any[]
  parentSlug?: string
  sideBarTitle?: string
}

export default function Container({
  children,
  navItems,
  sideBarItems,
  parentSlug,
  sideBarTitle,
}: ContainerProps) {
  return (
    <ContainerWrapper>
      <Header className="header">
        <Navbar navItemList={navItems} />
      </Header>
      <LayoutWrapper>
        <SideBar
          title={sideBarTitle}
          listArray={sideBarItems || []}
          parentSlug={parentSlug}
        />
        <MainContent>{children}</MainContent>
        <Footer className="footer">
          <p className="footer__text">
            Made with{' '}
            <svg
              datasanity-icon="heart-filled"
              width="1em"
              height="1em"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 16C15.8 17.3235 12.5 20.5 12.5 20.5C12.5 20.5 9.2 17.3235 8 16C5.2 12.9118 4.5 11.7059 4.5 9.5C4.5 7.29412 6.1 5.5 8.5 5.5C10.5 5.5 11.7 6.82353 12.5 8.14706C13.3 6.82353 14.5 5.5 16.5 5.5C18.9 5.5 20.5 7.29412 20.5 9.5C20.5 11.7059 19.8 12.9118 17 16Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.2"
              ></path>
            </svg>{' '}
            at Sanity
          </p>
        </Footer>
      </LayoutWrapper>
    </ContainerWrapper>
  )
}
