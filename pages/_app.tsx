import React, { useEffect } from 'react'
import '@/styles/app.css'
import type { AppProps } from 'next/app'
import Navbar from '@/src/components/common/Navbar'
import { Amplify } from 'aws-amplify'
import outputs from '@/amplify_outputs.json'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { identifyUser, PostHogProviderWrapper } from '@/utils/tracking'
import { Hub } from 'aws-amplify/utils'
import posthog from 'posthog-js'

Amplify.configure(outputs, { ssr: true })

Hub.listen('auth', ({ payload }) => {
  switch (payload.event) {
    case 'signedIn':
      identifyUser()
      break
    case 'signedOut':
      posthog.capture('user_logout')
      break
  }
})

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    identifyUser()
  }, [])

  return (
    <>
      <Authenticator.Provider>
        <PostHogProviderWrapper>
          <Navbar />
          <Component {...pageProps} />
        </PostHogProviderWrapper>
      </Authenticator.Provider>
    </>
  )
}
