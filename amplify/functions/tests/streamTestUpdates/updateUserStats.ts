import type { DynamoDBRecord } from 'aws-lambda'
import type { V6Client } from '@aws-amplify/api-graphql'
import { Schema } from '../../../data/resource'
import { updateUserStats } from '../../../graphql/mutations'
import { getUserStats } from '../../../graphql/queries'

const getPokemonToAdd = (dailyTest: any) => {
  const pokemonToAdd = []
  if (dailyTest['easyAnswer']?.S) {
    pokemonToAdd.push(dailyTest['easyAnswer']?.S)
  }
  if (dailyTest['mediumAnswer']?.S) {
    pokemonToAdd.push(dailyTest['mediumAnswer']?.S)
  }
  if (dailyTest['hardAnswer']?.S) {
    pokemonToAdd.push(dailyTest['hardAnswer']?.S)
  }
  if (dailyTest['impossibleAnswer']?.S) {
    pokemonToAdd.push(dailyTest['impossibleAnswer']?.S)
  }
  return pokemonToAdd
}

export default async (client: V6Client<Schema>, record: DynamoDBRecord) => {
  if (record.eventName === 'INSERT' || record.eventName === 'MODIFY') {
    // Get the new daily test
    const dailyTest = record.dynamodb?.NewImage
    if (!dailyTest) return

    // Get the details to add into the User Stats
    const userId = dailyTest['userId']
    if (!userId || !userId?.S) return

    // Get the previous stats
    const { data: previousUserStatsQuery } = await client.graphql({
      query: getUserStats,
      variables: {
        id: userId.S.split(':')[0],
      },
    })

    if (!previousUserStatsQuery?.getUserStats) return
    const previousUserStats = previousUserStatsQuery?.getUserStats

    // Calculate points
    let points = 0
    if (record.eventName === 'INSERT') {
      // If insert, add points directly
      if (!dailyTest['points']?.N) return

      points =
        (previousUserStats?.points || 0) + parseInt(dailyTest['points'].N)
    } else {
      // If modify, calculate how many points to add
      const pastDailyTest = record.dynamodb?.OldImage
      if (
        !pastDailyTest ||
        !pastDailyTest['points']?.N ||
        !dailyTest['points']?.N
      )
        return
      points =
        (previousUserStats?.points || 0) +
        (parseInt(dailyTest['points'].N) - parseInt(pastDailyTest['points'].N))
    }

    // Calculate pokemon caught
    const pokemonToAdd = getPokemonToAdd(dailyTest)
    const pokemonCaught = new Set(
      previousUserStats?.pokemonCaught
        ?.map((p) => p?.toString())
        .filter((p) => p !== undefined) ?? []
    )

    // Add pokemon
    for (const pokemon of pokemonToAdd) {
      if (pokemonCaught.has(pokemon)) continue
      pokemonCaught.add(pokemon)
    }

    // Update User Stats
    await client.graphql({
      query: updateUserStats,
      variables: {
        input: {
          id: userId.S.split(':')[0],
          points: points,
          pokemonCaught: Array.from(pokemonCaught),
        },
      },
    })
  }
}
