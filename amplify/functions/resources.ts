import testFunctions from './tests/resources'
import backFillFunctions from './backfills/resources'
import notificationFunctions from './notifications/resources'

export default {
  // Test Functions
  ...testFunctions,

  // Backfill Functions
  ...backFillFunctions,

  // Notification Functions
  ...notificationFunctions,
}
