import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { CssBaseline, ThemeProvider } from '@mui/material'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { lightTheme } from '../themes'
import { SWRConfig } from 'swr'
import { AuthProvider, CartProvider, UiProvider } from '../context'

export default function App({
  Component,
  pageProps: { session, ...pageProps},
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <PayPalScriptProvider options={{ 'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT || '' }}>
        <SWRConfig
          value={{
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
          }}
        >
            <AuthProvider>
              <CartProvider>
                <UiProvider>
                  <ThemeProvider theme={lightTheme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                  </ThemeProvider>
                </UiProvider>
              </CartProvider>
            </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  )
}
