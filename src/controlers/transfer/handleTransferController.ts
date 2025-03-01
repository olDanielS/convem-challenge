import { Request, Response } from "express";
import axios from "axios";
import handleSendtoDB from "./handleSendtoDB";
import { optionsAxiosWithdrawal } from "../../services/axiosconfig";

class HandleTransferController{
  async execute(req:Request,res:Response) {
    try {
      const { value, pixAddressKey } = req.body;

      if (!value || !pixAddressKey) {
        return res.status(400).json({ error: "Valor e chave Pix são obrigatórios." });
      }

      // Configuração do payload
      const payload = {
        ...optionsAxiosWithdrawal,
        data: {
          value,
          operationType: "PIX",
          pixAddressKey,
        },
      };

      console.log("Enviando solicitação para Asaas:");

      await axios.request(payload).then(async (transaction) => { 
        console.log("=-=-= PROCESSANDO SAQUE");
        await handleSendtoDB(transaction.data);  
        return res.json(transaction.data);  
      })
        .catch(err => {
          console.error("Erro na transação:", err.response?.data || err.message);
          return res.status(400).json({ error: err.response?.data || "Erro ao processar a requisição" });
        });


    } catch (error: any) {
      console.error("Erro na API do Asaas:", error.response?.data || error.message);
      return res.status(error.response?.status || 500).json({
        error: error.response?.data || "Erro interno do servidor",
      });
    }
  }
}

export {HandleTransferController};

