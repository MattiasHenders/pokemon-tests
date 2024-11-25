/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateDailyTest = /* GraphQL */ `subscription OnCreateDailyTest($filter: ModelSubscriptionDailyTestFilterInput) {
  onCreateDailyTest(filter: $filter) {
    createdAt
    easyQuestion {
      difficulty
      pokemonToGuess
      question
      validPokemon
      __typename
    }
    hardQuestion {
      difficulty
      pokemonToGuess
      question
      validPokemon
      __typename
    }
    id
    impossibleQuestion {
      difficulty
      pokemonToGuess
      question
      validPokemon
      __typename
    }
    mediumQuestion {
      difficulty
      pokemonToGuess
      question
      validPokemon
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateDailyTestSubscriptionVariables,
  APITypes.OnCreateDailyTestSubscription
>;
export const onCreateUserAcheivements = /* GraphQL */ `subscription OnCreateUserAcheivements(
  $filter: ModelSubscriptionUserAcheivementsFilterInput
  $userId: String
) {
  onCreateUserAcheivements(filter: $filter, userId: $userId) {
    createdAt
    description
    id
    image
    name
    updatedAt
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserAcheivementsSubscriptionVariables,
  APITypes.OnCreateUserAcheivementsSubscription
>;
export const onCreateUserStats = /* GraphQL */ `subscription OnCreateUserStats(
  $filter: ModelSubscriptionUserStatsFilterInput
  $id: String
) {
  onCreateUserStats(filter: $filter, id: $id) {
    createdAt
    id
    points
    pokemonCaught
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserStatsSubscriptionVariables,
  APITypes.OnCreateUserStatsSubscription
>;
export const onCreateUserTests = /* GraphQL */ `subscription OnCreateUserTests(
  $filter: ModelSubscriptionUserTestsFilterInput
  $userId: String
) {
  onCreateUserTests(filter: $filter, userId: $userId) {
    createdAt
    easyAnswer
    hardAnswer
    id
    impossibleAnswer
    mediumAnswer
    points
    testId
    updatedAt
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserTestsSubscriptionVariables,
  APITypes.OnCreateUserTestsSubscription
>;
export const onDeleteDailyTest = /* GraphQL */ `subscription OnDeleteDailyTest($filter: ModelSubscriptionDailyTestFilterInput) {
  onDeleteDailyTest(filter: $filter) {
    createdAt
    easyQuestion {
      difficulty
      pokemonToGuess
      question
      validPokemon
      __typename
    }
    hardQuestion {
      difficulty
      pokemonToGuess
      question
      validPokemon
      __typename
    }
    id
    impossibleQuestion {
      difficulty
      pokemonToGuess
      question
      validPokemon
      __typename
    }
    mediumQuestion {
      difficulty
      pokemonToGuess
      question
      validPokemon
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteDailyTestSubscriptionVariables,
  APITypes.OnDeleteDailyTestSubscription
>;
export const onDeleteUserAcheivements = /* GraphQL */ `subscription OnDeleteUserAcheivements(
  $filter: ModelSubscriptionUserAcheivementsFilterInput
  $userId: String
) {
  onDeleteUserAcheivements(filter: $filter, userId: $userId) {
    createdAt
    description
    id
    image
    name
    updatedAt
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserAcheivementsSubscriptionVariables,
  APITypes.OnDeleteUserAcheivementsSubscription
>;
export const onDeleteUserStats = /* GraphQL */ `subscription OnDeleteUserStats(
  $filter: ModelSubscriptionUserStatsFilterInput
  $id: String
) {
  onDeleteUserStats(filter: $filter, id: $id) {
    createdAt
    id
    points
    pokemonCaught
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserStatsSubscriptionVariables,
  APITypes.OnDeleteUserStatsSubscription
>;
export const onDeleteUserTests = /* GraphQL */ `subscription OnDeleteUserTests(
  $filter: ModelSubscriptionUserTestsFilterInput
  $userId: String
) {
  onDeleteUserTests(filter: $filter, userId: $userId) {
    createdAt
    easyAnswer
    hardAnswer
    id
    impossibleAnswer
    mediumAnswer
    points
    testId
    updatedAt
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserTestsSubscriptionVariables,
  APITypes.OnDeleteUserTestsSubscription
>;
export const onUpdateDailyTest = /* GraphQL */ `subscription OnUpdateDailyTest($filter: ModelSubscriptionDailyTestFilterInput) {
  onUpdateDailyTest(filter: $filter) {
    createdAt
    easyQuestion {
      difficulty
      pokemonToGuess
      question
      validPokemon
      __typename
    }
    hardQuestion {
      difficulty
      pokemonToGuess
      question
      validPokemon
      __typename
    }
    id
    impossibleQuestion {
      difficulty
      pokemonToGuess
      question
      validPokemon
      __typename
    }
    mediumQuestion {
      difficulty
      pokemonToGuess
      question
      validPokemon
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateDailyTestSubscriptionVariables,
  APITypes.OnUpdateDailyTestSubscription
>;
export const onUpdateUserAcheivements = /* GraphQL */ `subscription OnUpdateUserAcheivements(
  $filter: ModelSubscriptionUserAcheivementsFilterInput
  $userId: String
) {
  onUpdateUserAcheivements(filter: $filter, userId: $userId) {
    createdAt
    description
    id
    image
    name
    updatedAt
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserAcheivementsSubscriptionVariables,
  APITypes.OnUpdateUserAcheivementsSubscription
>;
export const onUpdateUserStats = /* GraphQL */ `subscription OnUpdateUserStats(
  $filter: ModelSubscriptionUserStatsFilterInput
  $id: String
) {
  onUpdateUserStats(filter: $filter, id: $id) {
    createdAt
    id
    points
    pokemonCaught
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserStatsSubscriptionVariables,
  APITypes.OnUpdateUserStatsSubscription
>;
export const onUpdateUserTests = /* GraphQL */ `subscription OnUpdateUserTests(
  $filter: ModelSubscriptionUserTestsFilterInput
  $userId: String
) {
  onUpdateUserTests(filter: $filter, userId: $userId) {
    createdAt
    easyAnswer
    hardAnswer
    id
    impossibleAnswer
    mediumAnswer
    points
    testId
    updatedAt
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserTestsSubscriptionVariables,
  APITypes.OnUpdateUserTestsSubscription
>;
