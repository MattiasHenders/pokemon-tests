import { defineBackend } from '@aws-amplify/backend'
import { auth } from './auth/resource'
import { data } from './data/resource'
import functions from './functions/resources'

defineBackend({
  auth,
  data,
  ...functions,
})
