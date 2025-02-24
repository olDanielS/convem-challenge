import { Request, Response } from "express";
import axios from "axios";
import { optionsAxiosConfig } from "../services/axiosconfig";
import handleSubmitQrcode from "./handleSubmitQrcodes";

class handleGenerateQrCode{
  async execute(req:Request, res:Response){

   await axios.request(optionsAxiosConfig).then(qrCodeResponse => {
      handleSubmitQrcode(qrCodeResponse.data) //Send this qrCode to DynamoDB
      res.json(qrCodeResponse.data)

    }).catch(err => {
      res.status(400).send(err);
    })
  }
}
export{handleGenerateQrCode}