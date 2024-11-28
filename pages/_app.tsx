import React, { useEffect, useState } from 'react'
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
import handleAddLastGame from '@/services/handleAddLastGame'
import { useDailyTestStore } from '@/src/stores/daily'
import { SnackbarProvider } from 'notistack'

Amplify.configure(outputs, { ssr: true })

export default function App({ Component, pageProps }: AppProps) {
  const [triggerUserTestCreateOnSignin, setTriggerUserTestCreateOnSignin] =
    useState(false)
  const { lastDailyGame } = useDailyTestStore()

  useEffect(() => {
    identifyUser()
  }, [])

  useEffect(() => {
    if (triggerUserTestCreateOnSignin) {
      const handleAddLastGameOnSignin = async () => {
        await handleAddLastGame(lastDailyGame)
      }

      handleAddLastGameOnSignin()
    }
  }, [triggerUserTestCreateOnSignin])

  // Auth listener
  Hub.listen('auth', ({ payload }) => {
    switch (payload.event) {
      case 'signedIn':
        identifyUser()
        setTriggerUserTestCreateOnSignin(true)
        break
      case 'signedOut':
        posthog.capture('user_logout')
        window.location.reload()
        break
    }
  })

  return (
    <>
      <Authenticator.Provider>
        <PostHogProviderWrapper>
          <SnackbarProvider maxSnack={3}>
            <Navbar />
            <Component {...pageProps} />
          </SnackbarProvider>
        </PostHogProviderWrapper>
      </Authenticator.Provider>
    </>
  )
}
