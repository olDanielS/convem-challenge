import { Request, Response } from "express";
import axios from "axios";
import { optionsAxiosConfig } from "../../services/axiosconfig.ts";
import handleSubmitDepositDB from "./handleSubmitDepositDB.ts";

class HandleDepositController{
  async execute(req:Request, res:Response){
    try {

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
      console.log(payload)
      
      await axios.request(payload).then(transaction => {
        console.log("=-=-= PROCESSANDO DEPOSITO")
        handleSubmitDepositDB(transaction.data) //Send this qrCode to DynamoDB
        res.json(transaction.data)
        return
        
      }).catch(err => {
        res.status(400).send(err);
        return
      })
    } catch (error: any) {
      console.error("Erro na API do Asaas:", error.response?.data || error.message);

      return res.status(error.response?.status || 500).json({
        error: error.response?.data || "Erro interno do servidor",
      });
    } 
    
  }
  }
  export{HandleDepositController}