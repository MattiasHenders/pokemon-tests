/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createDailyTest = /* GraphQL */ `mutation CreateDailyTest(
  $condition: ModelDailyTestConditionInput
  $input: CreateDailyTestInput!
) {
  createDailyTest(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateDailyTestMutationVariables,
  APITypes.CreateDailyTestMutation
>;
export const createUserAcheivements = /* GraphQL */ `mutation CreateUserAcheivements(
  $condition: ModelUserAcheivementsConditionInput
  $input: CreateUserAcheivementsInput!
) {
  createUserAcheivements(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateUserAcheivementsMutationVariables,
  APITypes.CreateUserAcheivementsMutation
>;
export const createUserStats = /* GraphQL */ `mutation CreateUserStats(
  $condition: ModelUserStatsConditionInput
  $input: CreateUserStatsInput!
) {
  createUserStats(condition: $condition, input: $input) {
    createdAt
    id
    points
    pokemonCaught
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserStatsMutationVariables,
  APITypes.CreateUserStatsMutation
>;
export const createUserTests = /* GraphQL */ `mutation CreateUserTests(
  $condition: ModelUserTestsConditionInput
  $input: CreateUserTestsInput!
) {
  createUserTests(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateUserTestsMutationVariables,
  APITypes.CreateUserTestsMutation
>;
export const deleteDailyTest = /* GraphQL */ `mutation DeleteDailyTest(
  $condition: ModelDailyTestConditionInput
  $input: DeleteDailyTestInput!
) {
  deleteDailyTest(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteDailyTestMutationVariables,
  APITypes.DeleteDailyTestMutation
>;
export const deleteUserAcheivements = /* GraphQL */ `mutation DeleteUserAcheivements(
  $condition: ModelUserAcheivementsConditionInput
  $input: DeleteUserAcheivementsInput!
) {
  deleteUserAcheivements(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteUserAcheivementsMutationVariables,
  APITypes.DeleteUserAcheivementsMutation
>;
export const deleteUserStats = /* GraphQL */ `mutation DeleteUserStats(
  $condition: ModelUserStatsConditionInput
  $input: DeleteUserStatsInput!
) {
  deleteUserStats(condition: $condition, input: $input) {
    createdAt
    id
    points
    pokemonCaught
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserStatsMutationVariables,
  APITypes.DeleteUserStatsMutation
>;
export const deleteUserTests = /* GraphQL */ `mutation DeleteUserTests(
  $condition: ModelUserTestsConditionInput
  $input: DeleteUserTestsInput!
) {
  deleteUserTests(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteUserTestsMutationVariables,
  APITypes.DeleteUserTestsMutation
>;
export const updateDailyTest = /* GraphQL */ `mutation UpdateDailyTest(
  $condition: ModelDailyTestConditionInput
  $input: UpdateDailyTestInput!
) {
  updateDailyTest(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateDailyTestMutationVariables,
  APITypes.UpdateDailyTestMutation
>;
export const updateUserAcheivements = /* GraphQL */ `mutation UpdateUserAcheivements(
  $condition: ModelUserAcheivementsConditionInput
  $input: UpdateUserAcheivementsInput!
) {
  updateUserAcheivements(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateUserAcheivementsMutationVariables,
  APITypes.UpdateUserAcheivementsMutation
>;
export const updateUserStats = /* GraphQL */ `mutation UpdateUserStats(
  $condition: ModelUserStatsConditionInput
  $input: UpdateUserStatsInput!
) {
  updateUserStats(condition: $condition, input: $input) {
    createdAt
    id
    points
    pokemonCaught
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserStatsMutationVariables,
  APITypes.UpdateUserStatsMutation
>;
export const updateUserTests = /* GraphQL */ `mutation UpdateUserTests(
  $condition: ModelUserTestsConditionInput
  $input: UpdateUserTestsInput!
) {
  updateUserTests(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateUserTestsMutationVariables,
  APITypes.UpdateUserTestsMutation
>;
