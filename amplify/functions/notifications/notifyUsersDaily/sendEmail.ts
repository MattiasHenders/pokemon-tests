import { env } from '$amplify/env/notify-users-daily'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import body from './emailBody'

const sesClient = new SESClient({ region: env.AWS_REGION })

export default async ({ recipientEmail }: { recipientEmail: string }) => {
  const subject = "Reminder to Play Today's PokeTest!"

  const command = new SendEmailCommand({
    Source: 'no-reply@poketests.com',
    Destination: {
      ToAddresses: [recipientEmail],
    },
    Message: {
      Body: {
        Html: { Data: body, Charset: 'UTF-8' },
      },
      Subject: { Data: subject, Charset: 'UTF-8' },
    },
  })

  try {
    const result = await sesClient.send(command)
    console.log(`Email sent to ${recipientEmail}: ${result.MessageId}`)
  } catch (error) {
    console.error(`Error sending email to ${recipientEmail}: ${error}`)
    throw new Error(`Failed to send email to ${recipientEmail}`, {
      cause: error,
    })
  }
}
