import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { getCurrentUser } from 'aws-amplify/auth'

if (typeof window !== 'undefined') {
  // checks that we are client-side
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'always', // or 'always' to create profiles for anonymous users as well
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug() // debug mode in development
    },
  })
}

export const identifyUser = async () => {
  try {
    const user = await getCurrentUser()
    posthog.identify(user.userId, { email: user.signInDetails?.loginId })
  } catch (error) {
  } finally {
  }
}

export const PostHogProviderWrapper = ({ children }: any) => {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
