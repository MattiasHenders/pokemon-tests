/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getDailyTest = /* GraphQL */ `query GetDailyTest($id: ID!) {
  getDailyTest(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetDailyTestQueryVariables,
  APITypes.GetDailyTestQuery
>;
export const getUserAcheivements = /* GraphQL */ `query GetUserAcheivements($id: ID!) {
  getUserAcheivements(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetUserAcheivementsQueryVariables,
  APITypes.GetUserAcheivementsQuery
>;
export const getUserStats = /* GraphQL */ `query GetUserStats($id: ID!) {
  getUserStats(id: $id) {
    createdAt
    id
    points
    pokemonCaught
    updatedAt
    userId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserStatsQueryVariables,
  APITypes.GetUserStatsQuery
>;
export const getUserTests = /* GraphQL */ `query GetUserTests($id: ID!) {
  getUserTests(id: $id) {
    createdAt
    easyAnswer
    hardAnswer
    id
    impossibleAnswer
    mediumAnswer
    testId
    updatedAt
    userId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserTestsQueryVariables,
  APITypes.GetUserTestsQuery
>;
export const listDailyTests = /* GraphQL */ `query ListDailyTests(
  $filter: ModelDailyTestFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listDailyTests(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      id
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListDailyTestsQueryVariables,
  APITypes.ListDailyTestsQuery
>;
export const listUserAcheivements = /* GraphQL */ `query ListUserAcheivements(
  $filter: ModelUserAcheivementsFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listUserAcheivements(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      description
      id
      image
      name
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserAcheivementsQueryVariables,
  APITypes.ListUserAcheivementsQuery
>;
export const listUserStats = /* GraphQL */ `query ListUserStats(
  $filter: ModelUserStatsFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listUserStats(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      id
      points
      pokemonCaught
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserStatsQueryVariables,
  APITypes.ListUserStatsQuery
>;
export const listUserTests = /* GraphQL */ `query ListUserTests(
  $filter: ModelUserTestsFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listUserTests(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      easyAnswer
      hardAnswer
      id
      impossibleAnswer
      mediumAnswer
      testId
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserTestsQueryVariables,
  APITypes.ListUserTestsQuery
>;
