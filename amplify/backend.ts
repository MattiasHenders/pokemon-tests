import { defineBackend } from '@aws-amplify/backend'
import { auth } from './auth/resource'
import { data } from './data/resource'
import functions from './functions/resources'
import { Stack } from 'aws-cdk-lib'
import { Policy, PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam'
import { EventSourceMapping, StartingPosition } from 'aws-cdk-lib/aws-lambda'
import * as iam from 'aws-cdk-lib/aws-iam'

const backend = defineBackend({
  auth,
  data,
  ...functions,
})

const userTestsTable = backend.data.resources.tables['UserTests']

const policy = new Policy(
  Stack.of(userTestsTable),
  'MyDynamoDBFunctionStreamingPolicy',
  {
    statements: [
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: [
          'dynamodb:DescribeStream',
          'dynamodb:GetRecords',
          'dynamodb:GetShardIterator',
          'dynamodb:ListStreams',
        ],
        resources: ['*'],
      }),
    ],
  }
)

backend.streamTestUpdates.resources.lambda.role?.attachInlinePolicy(policy)

const mapping = new EventSourceMapping(
  Stack.of(userTestsTable),
  'MyDynamoDBFunctionTodoEventStreamMapping',
  {
    target: backend.streamTestUpdates.resources.lambda,
    eventSourceArn: userTestsTable.tableStreamArn,
    startingPosition: StartingPosition.LATEST,
  }
)

mapping.node.addDependency(policy)

const notifyUsersDailyFunction = backend.notifyUsersDaily.resources.lambda
notifyUsersDailyFunction.role?.attachInlinePolicy(
  new iam.Policy(backend.auth.resources.userPool, 'AllowListUsers', {
    statements: [
      new iam.PolicyStatement({
        actions: ['cognito-idp:ListUsers'],
        resources: [backend.auth.resources.userPool.userPoolArn],
      }),
    ],
  })
)

notifyUsersDailyFunction.addToRolePolicy(
  new PolicyStatement({
    actions: ['ses:SendEmail', 'ses:SendRawEmail'],
    resources: ['*'],
  })
)
