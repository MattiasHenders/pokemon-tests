import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

const schema = a.schema({
  // Types
  PokemonQuestion: a.customType({
    pokemonToGuess: a.string(),
    question: a.string(),
    difficulty: a.enum(['easy', 'medium', 'hard', 'impossible', 'error']),
    validPokemon: a.string().array(),
  }),

  // Models
  DailyTest: a
    .model({
      id: a.id(),
      easyQuestion: a.ref('PokemonQuestion'),
      mediumQuestion: a.ref('PokemonQuestion'),
      hardQuestion: a.ref('PokemonQuestion'),
      impossibleQuestion: a.ref('PokemonQuestion'),
    })
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.authenticated().to(['read']),
    ]),

  UserTests: a
    .model({
      id: a.id(),
      userId: a.string(),
      testId: a.string(),
      easyAnswer: a.string(),
      mediumAnswer: a.string(),
      hardAnswer: a.string(),
      impossibleAnswer: a.string(),
    })
    .authorization((allow) => [
      allow.ownerDefinedIn('userId').to(['create', 'read', 'update']),
    ]),

  // Functions
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
})
