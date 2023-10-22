'use client'

import { ThemeProvider } from 'styled-components'

import Them, { GlobalStyle } from '.'
import { useTheme } from './themeContext'

const MainThemeProvider = ({ children }) => {
  const { theme } = useTheme()
  return (
    <>
      <ThemeProvider theme={theme === 'light' ? Them.light : Them.dark}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </>
  )
}

export default MainThemeProvider
