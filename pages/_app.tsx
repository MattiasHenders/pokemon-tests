import React, { useEffect } from 'react'
import '@/styles/app.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import Navbar from '@/src/components/common/Navbar'
import { Amplify } from 'aws-amplify'
import outputs from '@/amplify_outputs.json'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

Amplify.configure(outputs, { ssr: true })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Authenticator.Provider>
        <Navbar />
        <Component {...pageProps} />
      </Authenticator.Provider>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
