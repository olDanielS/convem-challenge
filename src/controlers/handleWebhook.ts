import {Request, Response} from 'express';
import {writeFile} from 'fs/promises'

class handleWebhook {
  async execute(req:Request, res: Response){
    const body = req.body

    console.log(body)
    await writeFile('./log.json', JSON.stringify(body))
    switch (body.event) {
      case 'PAYMENT_CREATED':
        this.createPayment(body.payment);
        res.status(200).json({"Message": "created"})
        break;
      case 'PAYMENT_RECEIVED':
        this.receivePayment(body.payment)
        res.status(200).json({"Message": "received"})
        break;
      // ... trate outos eventos
      default:
        console.log(`Este evento não é aceito ${body.event}`);
    }

  }
  async createPayment(payment:any) {
    console.log(payment)
  }
  async receivePayment(payment:any) {
    console.log(payment)
  }
}

export {handleWebhook};