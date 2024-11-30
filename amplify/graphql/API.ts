/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type DailyTest = {
  __typename: "DailyTest",
  createdAt: string,
  easyQuestion?: PokemonQuestion | null,
  hardQuestion?: PokemonQuestion | null,
  id: string,
  impossibleQuestion?: PokemonQuestion | null,
  mediumQuestion?: PokemonQuestion | null,
  updatedAt: string,
};

export type PokemonQuestion = {
  __typename: "PokemonQuestion",
  difficulty?: PokemonQuestionDifficulty | null,
  pokemonToGuess?: string | null,
  question?: string | null,
  validPokemon?: Array< string | null > | null,
};

export enum PokemonQuestionDifficulty {
  easy = "easy",
  error = "error",
  hard = "hard",
  impossible = "impossible",
  medium = "medium",
}


export type UserAcheivements = {
  __typename: "UserAcheivements",
  acheivementId?: string | null,
  completed?: boolean | null,
  createdAt: string,
  id: string,
  progress?: number | null,
  total?: number | null,
  updatedAt: string,
  userId?: string | null,
};

export type UserFeedback = {
  __typename: "UserFeedback",
  createdAt: string,
  feedback?: string | null,
  id: string,
  updatedAt: string,
  userId?: string | null,
};

export type UserStats = {
  __typename: "UserStats",
  createdAt: string,
  id: string,
  points?: number | null,
  pokemonCaught?: Array< string | null > | null,
  updatedAt: string,
};

export type UserTests = {
  __typename: "UserTests",
  createdAt: string,
  easyAnswer?: string | null,
  hardAnswer?: string | null,
  id: string,
  impossibleAnswer?: string | null,
  mediumAnswer?: string | null,
  points?: number | null,
  testId?: string | null,
  updatedAt: string,
  userId?: string | null,
};

export type ModelDailyTestFilterInput = {
  and?: Array< ModelDailyTestFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelDailyTestFilterInput | null,
  or?: Array< ModelDailyTestFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelDailyTestConnection = {
  __typename: "ModelDailyTestConnection",
  items:  Array<DailyTest | null >,
  nextToken?: string | null,
};

export type ModelUserAcheivementsFilterInput = {
  acheivementId?: ModelStringInput | null,
  and?: Array< ModelUserAcheivementsFilterInput | null > | null,
  completed?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelUserAcheivementsFilterInput | null,
  or?: Array< ModelUserAcheivementsFilterInput | null > | null,
  progress?: ModelIntInput | null,
  total?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelIntInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelUserAcheivementsConnection = {
  __typename: "ModelUserAcheivementsConnection",
  items:  Array<UserAcheivements | null >,
  nextToken?: string | null,
};

export type ModelUserFeedbackFilterInput = {
  and?: Array< ModelUserFeedbackFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  feedback?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelUserFeedbackFilterInput | null,
  or?: Array< ModelUserFeedbackFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type ModelUserFeedbackConnection = {
  __typename: "ModelUserFeedbackConnection",
  items:  Array<UserFeedback | null >,
  nextToken?: string | null,
};

export type ModelUserStatsFilterInput = {
  and?: Array< ModelUserStatsFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelUserStatsFilterInput | null,
  or?: Array< ModelUserStatsFilterInput | null > | null,
  points?: ModelIntInput | null,
  pokemonCaught?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelUserStatsConnection = {
  __typename: "ModelUserStatsConnection",
  items:  Array<UserStats | null >,
  nextToken?: string | null,
};

export type ModelUserTestsFilterInput = {
  and?: Array< ModelUserTestsFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  easyAnswer?: ModelStringInput | null,
  hardAnswer?: ModelStringInput | null,
  id?: ModelIDInput | null,
  impossibleAnswer?: ModelStringInput | null,
  mediumAnswer?: ModelStringInput | null,
  not?: ModelUserTestsFilterInput | null,
  or?: Array< ModelUserTestsFilterInput | null > | null,
  points?: ModelIntInput | null,
  testId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type ModelUserTestsConnection = {
  __typename: "ModelUserTestsConnection",
  items:  Array<UserTests | null >,
  nextToken?: string | null,
};

export type ModelDailyTestConditionInput = {
  and?: Array< ModelDailyTestConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  not?: ModelDailyTestConditionInput | null,
  or?: Array< ModelDailyTestConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateDailyTestInput = {
  easyQuestion?: PokemonQuestionInput | null,
  hardQuestion?: PokemonQuestionInput | null,
  id?: string | null,
  impossibleQuestion?: PokemonQuestionInput | null,
  mediumQuestion?: PokemonQuestionInput | null,
};

export type PokemonQuestionInput = {
  difficulty?: PokemonQuestionDifficulty | null,
  pokemonToGuess?: string | null,
  question?: string | null,
  validPokemon?: Array< string | null > | null,
};

export type ModelUserAcheivementsConditionInput = {
  acheivementId?: ModelStringInput | null,
  and?: Array< ModelUserAcheivementsConditionInput | null > | null,
  completed?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  not?: ModelUserAcheivementsConditionInput | null,
  or?: Array< ModelUserAcheivementsConditionInput | null > | null,
  progress?: ModelIntInput | null,
  total?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type CreateUserAcheivementsInput = {
  acheivementId?: string | null,
  completed?: boolean | null,
  id?: string | null,
  progress?: number | null,
  total?: number | null,
  userId?: string | null,
};

export type ModelUserFeedbackConditionInput = {
  and?: Array< ModelUserFeedbackConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  feedback?: ModelStringInput | null,
  not?: ModelUserFeedbackConditionInput | null,
  or?: Array< ModelUserFeedbackConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type CreateUserFeedbackInput = {
  feedback?: string | null,
  id?: string | null,
  userId?: string | null,
};

export type ModelUserStatsConditionInput = {
  and?: Array< ModelUserStatsConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelStringInput | null,
  not?: ModelUserStatsConditionInput | null,
  or?: Array< ModelUserStatsConditionInput | null > | null,
  points?: ModelIntInput | null,
  pokemonCaught?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateUserStatsInput = {
  id?: string | null,
  points?: number | null,
  pokemonCaught?: Array< string | null > | null,
};

export type ModelUserTestsConditionInput = {
  and?: Array< ModelUserTestsConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  easyAnswer?: ModelStringInput | null,
  hardAnswer?: ModelStringInput | null,
  impossibleAnswer?: ModelStringInput | null,
  mediumAnswer?: ModelStringInput | null,
  not?: ModelUserTestsConditionInput | null,
  or?: Array< ModelUserTestsConditionInput | null > | null,
  points?: ModelIntInput | null,
  testId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type CreateUserTestsInput = {
  easyAnswer?: string | null,
  hardAnswer?: string | null,
  id?: string | null,
  impossibleAnswer?: string | null,
  mediumAnswer?: string | null,
  points?: number | null,
  testId?: string | null,
  userId?: string | null,
};

export type DeleteDailyTestInput = {
  id: string,
};

export type DeleteUserAcheivementsInput = {
  id: string,
};

export type DeleteUserFeedbackInput = {
  id: string,
};

export type DeleteUserStatsInput = {
  id: string,
};

export type DeleteUserTestsInput = {
  id: string,
};

export type UpdateDailyTestInput = {
  easyQuestion?: PokemonQuestionInput | null,
  hardQuestion?: PokemonQuestionInput | null,
  id: string,
  impossibleQuestion?: PokemonQuestionInput | null,
  mediumQuestion?: PokemonQuestionInput | null,
};

export type UpdateUserAcheivementsInput = {
  acheivementId?: string | null,
  completed?: boolean | null,
  id: string,
  progress?: number | null,
  total?: number | null,
  userId?: string | null,
};

export type UpdateUserFeedbackInput = {
  feedback?: string | null,
  id: string,
  userId?: string | null,
};

export type UpdateUserStatsInput = {
  id: string,
  points?: number | null,
  pokemonCaught?: Array< string | null > | null,
};

export type UpdateUserTestsInput = {
  easyAnswer?: string | null,
  hardAnswer?: string | null,
  id: string,
  impossibleAnswer?: string | null,
  mediumAnswer?: string | null,
  points?: number | null,
  testId?: string | null,
  userId?: string | null,
};

export type ModelSubscriptionDailyTestFilterInput = {
  and?: Array< ModelSubscriptionDailyTestFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionDailyTestFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionUserAcheivementsFilterInput = {
  acheivementId?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserAcheivementsFilterInput | null > | null,
  completed?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionUserAcheivementsFilterInput | null > | null,
  progress?: ModelSubscriptionIntInput | null,
  total?: ModelSubscriptionIntInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelStringInput | null,
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelSubscriptionIntInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionUserFeedbackFilterInput = {
  and?: Array< ModelSubscriptionUserFeedbackFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  feedback?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionUserFeedbackFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelStringInput | null,
};

export type ModelSubscriptionUserStatsFilterInput = {
  and?: Array< ModelSubscriptionUserStatsFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelStringInput | null,
  or?: Array< ModelSubscriptionUserStatsFilterInput | null > | null,
  points?: ModelSubscriptionIntInput | null,
  pokemonCaught?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionUserTestsFilterInput = {
  and?: Array< ModelSubscriptionUserTestsFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  easyAnswer?: ModelSubscriptionStringInput | null,
  hardAnswer?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  impossibleAnswer?: ModelSubscriptionStringInput | null,
  mediumAnswer?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionUserTestsFilterInput | null > | null,
  points?: ModelSubscriptionIntInput | null,
  testId?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelStringInput | null,
};

export type GetDailyTestQueryVariables = {
  id: string,
};

export type GetDailyTestQuery = {
  getDailyTest?:  {
    __typename: "DailyTest",
    createdAt: string,
    easyQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    hardQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    id: string,
    impossibleQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    mediumQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type GetUserAcheivementsQueryVariables = {
  id: string,
};

export type GetUserAcheivementsQuery = {
  getUserAcheivements?:  {
    __typename: "UserAcheivements",
    acheivementId?: string | null,
    completed?: boolean | null,
    createdAt: string,
    id: string,
    progress?: number | null,
    total?: number | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type GetUserFeedbackQueryVariables = {
  id: string,
};

export type GetUserFeedbackQuery = {
  getUserFeedback?:  {
    __typename: "UserFeedback",
    createdAt: string,
    feedback?: string | null,
    id: string,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type GetUserStatsQueryVariables = {
  id: string,
};

export type GetUserStatsQuery = {
  getUserStats?:  {
    __typename: "UserStats",
    createdAt: string,
    id: string,
    points?: number | null,
    pokemonCaught?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type GetUserTestsQueryVariables = {
  id: string,
};

export type GetUserTestsQuery = {
  getUserTests?:  {
    __typename: "UserTests",
    createdAt: string,
    easyAnswer?: string | null,
    hardAnswer?: string | null,
    id: string,
    impossibleAnswer?: string | null,
    mediumAnswer?: string | null,
    points?: number | null,
    testId?: string | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type ListDailyTestsQueryVariables = {
  filter?: ModelDailyTestFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListDailyTestsQuery = {
  listDailyTests?:  {
    __typename: "ModelDailyTestConnection",
    items:  Array< {
      __typename: "DailyTest",
      createdAt: string,
      id: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUserAcheivementsQueryVariables = {
  filter?: ModelUserAcheivementsFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUserAcheivementsQuery = {
  listUserAcheivements?:  {
    __typename: "ModelUserAcheivementsConnection",
    items:  Array< {
      __typename: "UserAcheivements",
      acheivementId?: string | null,
      completed?: boolean | null,
      createdAt: string,
      id: string,
      progress?: number | null,
      total?: number | null,
      updatedAt: string,
      userId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUserFeedbacksQueryVariables = {
  filter?: ModelUserFeedbackFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUserFeedbacksQuery = {
  listUserFeedbacks?:  {
    __typename: "ModelUserFeedbackConnection",
    items:  Array< {
      __typename: "UserFeedback",
      createdAt: string,
      feedback?: string | null,
      id: string,
      updatedAt: string,
      userId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUserStatsQueryVariables = {
  filter?: ModelUserStatsFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUserStatsQuery = {
  listUserStats?:  {
    __typename: "ModelUserStatsConnection",
    items:  Array< {
      __typename: "UserStats",
      createdAt: string,
      id: string,
      points?: number | null,
      pokemonCaught?: Array< string | null > | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUserTestsQueryVariables = {
  filter?: ModelUserTestsFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUserTestsQuery = {
  listUserTests?:  {
    __typename: "ModelUserTestsConnection",
    items:  Array< {
      __typename: "UserTests",
      createdAt: string,
      easyAnswer?: string | null,
      hardAnswer?: string | null,
      id: string,
      impossibleAnswer?: string | null,
      mediumAnswer?: string | null,
      points?: number | null,
      testId?: string | null,
      updatedAt: string,
      userId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateDailyTestMutationVariables = {
  condition?: ModelDailyTestConditionInput | null,
  input: CreateDailyTestInput,
};

export type CreateDailyTestMutation = {
  createDailyTest?:  {
    __typename: "DailyTest",
    createdAt: string,
    easyQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    hardQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    id: string,
    impossibleQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    mediumQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type CreateUserAcheivementsMutationVariables = {
  condition?: ModelUserAcheivementsConditionInput | null,
  input: CreateUserAcheivementsInput,
};

export type CreateUserAcheivementsMutation = {
  createUserAcheivements?:  {
    __typename: "UserAcheivements",
    acheivementId?: string | null,
    completed?: boolean | null,
    createdAt: string,
    id: string,
    progress?: number | null,
    total?: number | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type CreateUserFeedbackMutationVariables = {
  condition?: ModelUserFeedbackConditionInput | null,
  input: CreateUserFeedbackInput,
};

export type CreateUserFeedbackMutation = {
  createUserFeedback?:  {
    __typename: "UserFeedback",
    createdAt: string,
    feedback?: string | null,
    id: string,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type CreateUserStatsMutationVariables = {
  condition?: ModelUserStatsConditionInput | null,
  input: CreateUserStatsInput,
};

export type CreateUserStatsMutation = {
  createUserStats?:  {
    __typename: "UserStats",
    createdAt: string,
    id: string,
    points?: number | null,
    pokemonCaught?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type CreateUserTestsMutationVariables = {
  condition?: ModelUserTestsConditionInput | null,
  input: CreateUserTestsInput,
};

export type CreateUserTestsMutation = {
  createUserTests?:  {
    __typename: "UserTests",
    createdAt: string,
    easyAnswer?: string | null,
    hardAnswer?: string | null,
    id: string,
    impossibleAnswer?: string | null,
    mediumAnswer?: string | null,
    points?: number | null,
    testId?: string | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type DeleteDailyTestMutationVariables = {
  condition?: ModelDailyTestConditionInput | null,
  input: DeleteDailyTestInput,
};

export type DeleteDailyTestMutation = {
  deleteDailyTest?:  {
    __typename: "DailyTest",
    createdAt: string,
    easyQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    hardQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    id: string,
    impossibleQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    mediumQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeleteUserAcheivementsMutationVariables = {
  condition?: ModelUserAcheivementsConditionInput | null,
  input: DeleteUserAcheivementsInput,
};

export type DeleteUserAcheivementsMutation = {
  deleteUserAcheivements?:  {
    __typename: "UserAcheivements",
    acheivementId?: string | null,
    completed?: boolean | null,
    createdAt: string,
    id: string,
    progress?: number | null,
    total?: number | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type DeleteUserFeedbackMutationVariables = {
  condition?: ModelUserFeedbackConditionInput | null,
  input: DeleteUserFeedbackInput,
};

export type DeleteUserFeedbackMutation = {
  deleteUserFeedback?:  {
    __typename: "UserFeedback",
    createdAt: string,
    feedback?: string | null,
    id: string,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type DeleteUserStatsMutationVariables = {
  condition?: ModelUserStatsConditionInput | null,
  input: DeleteUserStatsInput,
};

export type DeleteUserStatsMutation = {
  deleteUserStats?:  {
    __typename: "UserStats",
    createdAt: string,
    id: string,
    points?: number | null,
    pokemonCaught?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type DeleteUserTestsMutationVariables = {
  condition?: ModelUserTestsConditionInput | null,
  input: DeleteUserTestsInput,
};

export type DeleteUserTestsMutation = {
  deleteUserTests?:  {
    __typename: "UserTests",
    createdAt: string,
    easyAnswer?: string | null,
    hardAnswer?: string | null,
    id: string,
    impossibleAnswer?: string | null,
    mediumAnswer?: string | null,
    points?: number | null,
    testId?: string | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type UpdateDailyTestMutationVariables = {
  condition?: ModelDailyTestConditionInput | null,
  input: UpdateDailyTestInput,
};

export type UpdateDailyTestMutation = {
  updateDailyTest?:  {
    __typename: "DailyTest",
    createdAt: string,
    easyQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    hardQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    id: string,
    impossibleQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    mediumQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdateUserAcheivementsMutationVariables = {
  condition?: ModelUserAcheivementsConditionInput | null,
  input: UpdateUserAcheivementsInput,
};

export type UpdateUserAcheivementsMutation = {
  updateUserAcheivements?:  {
    __typename: "UserAcheivements",
    acheivementId?: string | null,
    completed?: boolean | null,
    createdAt: string,
    id: string,
    progress?: number | null,
    total?: number | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type UpdateUserFeedbackMutationVariables = {
  condition?: ModelUserFeedbackConditionInput | null,
  input: UpdateUserFeedbackInput,
};

export type UpdateUserFeedbackMutation = {
  updateUserFeedback?:  {
    __typename: "UserFeedback",
    createdAt: string,
    feedback?: string | null,
    id: string,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type UpdateUserStatsMutationVariables = {
  condition?: ModelUserStatsConditionInput | null,
  input: UpdateUserStatsInput,
};

export type UpdateUserStatsMutation = {
  updateUserStats?:  {
    __typename: "UserStats",
    createdAt: string,
    id: string,
    points?: number | null,
    pokemonCaught?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type UpdateUserTestsMutationVariables = {
  condition?: ModelUserTestsConditionInput | null,
  input: UpdateUserTestsInput,
};

export type UpdateUserTestsMutation = {
  updateUserTests?:  {
    __typename: "UserTests",
    createdAt: string,
    easyAnswer?: string | null,
    hardAnswer?: string | null,
    id: string,
    impossibleAnswer?: string | null,
    mediumAnswer?: string | null,
    points?: number | null,
    testId?: string | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type OnCreateDailyTestSubscriptionVariables = {
  filter?: ModelSubscriptionDailyTestFilterInput | null,
};

export type OnCreateDailyTestSubscription = {
  onCreateDailyTest?:  {
    __typename: "DailyTest",
    createdAt: string,
    easyQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    hardQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    id: string,
    impossibleQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    mediumQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnCreateUserAcheivementsSubscriptionVariables = {
  filter?: ModelSubscriptionUserAcheivementsFilterInput | null,
  userId?: string | null,
};

export type OnCreateUserAcheivementsSubscription = {
  onCreateUserAcheivements?:  {
    __typename: "UserAcheivements",
    acheivementId?: string | null,
    completed?: boolean | null,
    createdAt: string,
    id: string,
    progress?: number | null,
    total?: number | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type OnCreateUserFeedbackSubscriptionVariables = {
  filter?: ModelSubscriptionUserFeedbackFilterInput | null,
  userId?: string | null,
};

export type OnCreateUserFeedbackSubscription = {
  onCreateUserFeedback?:  {
    __typename: "UserFeedback",
    createdAt: string,
    feedback?: string | null,
    id: string,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type OnCreateUserStatsSubscriptionVariables = {
  filter?: ModelSubscriptionUserStatsFilterInput | null,
  id?: string | null,
};

export type OnCreateUserStatsSubscription = {
  onCreateUserStats?:  {
    __typename: "UserStats",
    createdAt: string,
    id: string,
    points?: number | null,
    pokemonCaught?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type OnCreateUserTestsSubscriptionVariables = {
  filter?: ModelSubscriptionUserTestsFilterInput | null,
  userId?: string | null,
};

export type OnCreateUserTestsSubscription = {
  onCreateUserTests?:  {
    __typename: "UserTests",
    createdAt: string,
    easyAnswer?: string | null,
    hardAnswer?: string | null,
    id: string,
    impossibleAnswer?: string | null,
    mediumAnswer?: string | null,
    points?: number | null,
    testId?: string | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type OnDeleteDailyTestSubscriptionVariables = {
  filter?: ModelSubscriptionDailyTestFilterInput | null,
};

export type OnDeleteDailyTestSubscription = {
  onDeleteDailyTest?:  {
    __typename: "DailyTest",
    createdAt: string,
    easyQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    hardQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    id: string,
    impossibleQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    mediumQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserAcheivementsSubscriptionVariables = {
  filter?: ModelSubscriptionUserAcheivementsFilterInput | null,
  userId?: string | null,
};

export type OnDeleteUserAcheivementsSubscription = {
  onDeleteUserAcheivements?:  {
    __typename: "UserAcheivements",
    acheivementId?: string | null,
    completed?: boolean | null,
    createdAt: string,
    id: string,
    progress?: number | null,
    total?: number | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type OnDeleteUserFeedbackSubscriptionVariables = {
  filter?: ModelSubscriptionUserFeedbackFilterInput | null,
  userId?: string | null,
};

export type OnDeleteUserFeedbackSubscription = {
  onDeleteUserFeedback?:  {
    __typename: "UserFeedback",
    createdAt: string,
    feedback?: string | null,
    id: string,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type OnDeleteUserStatsSubscriptionVariables = {
  filter?: ModelSubscriptionUserStatsFilterInput | null,
  id?: string | null,
};

export type OnDeleteUserStatsSubscription = {
  onDeleteUserStats?:  {
    __typename: "UserStats",
    createdAt: string,
    id: string,
    points?: number | null,
    pokemonCaught?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserTestsSubscriptionVariables = {
  filter?: ModelSubscriptionUserTestsFilterInput | null,
  userId?: string | null,
};

export type OnDeleteUserTestsSubscription = {
  onDeleteUserTests?:  {
    __typename: "UserTests",
    createdAt: string,
    easyAnswer?: string | null,
    hardAnswer?: string | null,
    id: string,
    impossibleAnswer?: string | null,
    mediumAnswer?: string | null,
    points?: number | null,
    testId?: string | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type OnUpdateDailyTestSubscriptionVariables = {
  filter?: ModelSubscriptionDailyTestFilterInput | null,
};

export type OnUpdateDailyTestSubscription = {
  onUpdateDailyTest?:  {
    __typename: "DailyTest",
    createdAt: string,
    easyQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    hardQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    id: string,
    impossibleQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    mediumQuestion?:  {
      __typename: "PokemonQuestion",
      difficulty?: PokemonQuestionDifficulty | null,
      pokemonToGuess?: string | null,
      question?: string | null,
      validPokemon?: Array< string | null > | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserAcheivementsSubscriptionVariables = {
  filter?: ModelSubscriptionUserAcheivementsFilterInput | null,
  userId?: string | null,
};

export type OnUpdateUserAcheivementsSubscription = {
  onUpdateUserAcheivements?:  {
    __typename: "UserAcheivements",
    acheivementId?: string | null,
    completed?: boolean | null,
    createdAt: string,
    id: string,
    progress?: number | null,
    total?: number | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type OnUpdateUserFeedbackSubscriptionVariables = {
  filter?: ModelSubscriptionUserFeedbackFilterInput | null,
  userId?: string | null,
};

export type OnUpdateUserFeedbackSubscription = {
  onUpdateUserFeedback?:  {
    __typename: "UserFeedback",
    createdAt: string,
    feedback?: string | null,
    id: string,
    updatedAt: string,
    userId?: string | null,
  } | null,
};

export type OnUpdateUserStatsSubscriptionVariables = {
  filter?: ModelSubscriptionUserStatsFilterInput | null,
  id?: string | null,
};

export type OnUpdateUserStatsSubscription = {
  onUpdateUserStats?:  {
    __typename: "UserStats",
    createdAt: string,
    id: string,
    points?: number | null,
    pokemonCaught?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserTestsSubscriptionVariables = {
  filter?: ModelSubscriptionUserTestsFilterInput | null,
  userId?: string | null,
};

export type OnUpdateUserTestsSubscription = {
  onUpdateUserTests?:  {
    __typename: "UserTests",
    createdAt: string,
    easyAnswer?: string | null,
    hardAnswer?: string | null,
    id: string,
    impossibleAnswer?: string | null,
    mediumAnswer?: string | null,
    points?: number | null,
    testId?: string | null,
    updatedAt: string,
    userId?: string | null,
  } | null,
};
