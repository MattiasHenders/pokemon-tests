import type { V6Client } from '@aws-amplify/api-graphql'
import { Schema } from '../../../../data/resource'
import { updateUserAcheivements } from '../../../../graphql/mutations'

export default async (
  client: V6Client<Schema>,
  userAcheivements: Schema['UserAcheivements']['type'][]
) => {
  const milestoneAchievementsToUpdate = userAcheivements.filter(
    (acheivement) =>
      acheivement.acheivementId?.startsWith('milestone') &&
      !acheivement.completed
  )

  for (const milestoneAchievement of milestoneAchievementsToUpdate) {
    const milestoneAchievementId = milestoneAchievement.id

    if (!milestoneAchievementId) {
      continue
    }

    const newProgress = (milestoneAchievement.progress || 0) + 1

    await client.graphql({
      query: updateUserAcheivements,
      variables: {
        input: {
          id: milestoneAchievementId,
          completed: newProgress === milestoneAchievement.total,
          progress: newProgress,
        },
      },
    })
  }
}
