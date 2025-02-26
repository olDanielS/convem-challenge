import { Request, Response } from "express";
import axios from "axios";
import { optionsAxiosConfig } from "../../services/axiosconfig";
import handleSubmitQrcodesDB from "./handleSubmitQrcodesDB";

class handleGenerateQrCode{
  async execute(req:Request, res:Response){
  const {customer, value, dueDate} = req.body;

  if(!customer || !value || !dueDate){
      res.status(400).json({error: "Sorry, arguments insufficients."})
      return
  }

  const payload = {
    ...optionsAxiosConfig,
    data: {
      customer,
      billingType: process.env.BILLING_TYPE,
      value,
      dueDate
    }
  }

   await axios.request(payload).then(transaction => {
    console.log("=-=-= CHARGE")
    handleSubmitQrcodesDB(transaction.data) //Send this qrCode to DynamoDB
    res.json(transaction.data)
      return

    }).catch(err => {
      res.status(400).send(err);
      return
    })
  }

  async decode(req:Request, res:Response){
    
  }

}
export{handleGenerateQrCode}