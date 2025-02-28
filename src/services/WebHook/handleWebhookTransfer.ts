import { Request, Response } from 'express';
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";


const sqsClient:SQSClient = new SQSClient({
  region: process.env.AWS_REGION as string, 
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});
const queueUrl = process.env.URL_SQS_TRANSFER;

class HandleWebhookTransfer {
  async execute(req: Request, res: Response) {
    res.status(200).send('Recebido');

    try {
      const body = JSON.stringify(req.body);
      const command = new SendMessageCommand({
        QueueUrl: queueUrl,
        MessageBody: body,
        MessageGroupId: "convemWebhookTransfer"
      });


      await sqsClient.send(command).then(res => {
        console.log('Webhook enviado para a fila SQS:', res);
      });
    } catch (error) {
      console.error('Erro ao enviar webhook para SQS:', error);
    }
  }
}

export {HandleWebhookTransfer}
