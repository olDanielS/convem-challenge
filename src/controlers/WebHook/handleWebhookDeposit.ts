import { Request, Response } from 'express';
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";


const sqsClient = new SQSClient({
  region: process.env.AWS_REGION, 
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const queueUrl = process.env.URL_SQS_DEPOSIT;

class handleWebhookDeposit {
  async execute(req: Request, res: Response) {
    res.status(200).send('Recebido');

    try {
      const body = JSON.stringify(req.body);
      const command = new SendMessageCommand({
        QueueUrl: queueUrl,
        MessageBody: body,
        MessageGroupId: "convemWebhook"
      });


      await sqsClient.send(command).then(res => {
        console.log('Webhook enviado para a fila SQS:', res);
      });
    } catch (error) {
      console.error('Erro ao enviar webhook para SQS:', error);
    }
  }
}

export {handleWebhookDeposit}
