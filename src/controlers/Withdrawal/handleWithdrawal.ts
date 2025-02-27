import { Request, Response } from "express";
import axios from "axios";
import handleSendtoDB from "./handleSendtoDB";
import { optionsAxiosWithdrawal } from "../../services/axiosconfig";

class HandleWithdrawal{
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

      console.log("Enviando solicitação para Asaas:", payload);

      // Chamar API do Asaas
      const transaction = await axios.request(payload);

      console.log("Cash out realizado com sucesso:", transaction.data);

      // Enviar transação para o DynamoDB
      await handleSendtoDB(transaction.data);

      return res.json({
        message: "Cash out solicitado com sucesso",
        transaction: transaction.data,
      });

    } catch (error: any) {
      console.error("Erro na API do Asaas:", error.response?.data || error.message);

      return res.status(error.response?.status || 500).json({
        error: error.response?.data || "Erro interno do servidor",
      });
    }
  }
}

export {HandleWithdrawal};

