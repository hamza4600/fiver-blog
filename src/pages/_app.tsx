import '../theme/style.css'

import type { AppProps } from 'next/app'
import { lazy } from 'react'

import MainThemeProvider from '~/theme/provider'
import { ThemeProvider } from '~/theme/themeContext'
export interface SharedPageProps {
  draftMode: boolean
  token: string
}

const PreviewProvider = lazy(() => import('~/components/PreviewProvider'))

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  return (
    <>
      {draftMode ? (
        <PreviewProvider token={token}>
          <ThemeProvider>
            <MainThemeProvider>
              <Component {...pageProps} />
            </MainThemeProvider>
          </ThemeProvider>
        </PreviewProvider>
      ) : (
        <ThemeProvider>
          <MainThemeProvider>
            <Component {...pageProps} />
          </MainThemeProvider>
        </ThemeProvider>
      )}
    </>
  )
}
