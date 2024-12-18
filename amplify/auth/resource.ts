import { defineAuth } from '@aws-amplify/backend'
import { postConfirmation } from './postConfirmation/resource'
import { notifyUsersDaily } from '../functions/notifications/notifyUsersDaily/resource'

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  triggers: {
    postConfirmation,
  },
  access: (allow) => [allow.resource(notifyUsersDaily).to(['manageUsers'])],
})
