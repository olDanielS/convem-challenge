import { Request, Response } from "express";
import axios from "axios";
import { optionsAxiosConfig } from "../../services/axiosconfig.ts";
import handleSubmitDepositDB from "./handleSubmitDepositDB.ts";

class HandleDepositController {
  async execute(req: Request, res: Response) {
    try {

      const { customer, value, dueDate } = req.body;

      if (!customer || !value || !dueDate) {
        res.status(400).json({ error: "Sorry, arguments insufficients." })
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
      await axios.request(payload).then(async (transaction) => { 
        console.log("=-=-= PROCESSANDO DEPOSITO");
        await handleSubmitDepositDB(transaction.data);  
        return res.json(transaction.data);  
      })
        .catch(err => {
          console.error("Erro na transação:", err.response?.data || err.message);
          return res.status(400).json({ error: err.response?.data || "Erro ao processar a requisição" });
        });


    } catch (error: any) {
      return res.status(error.response?.status || 500).json({
        error: error.response?.data || "Erro interno do servidor",
      });
    }

  }
}
export { HandleDepositController }