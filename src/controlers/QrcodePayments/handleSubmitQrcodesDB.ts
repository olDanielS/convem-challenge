import { dynamoDB } from '../../config/dynamodb';
import axios from 'axios';
import { QrCodeProps } from '../../utils/interfaceQPcode';

export default async function handleSubmitQrcodesDB(data: any) {
  try {
    const chargeID = data.id;

    if (!chargeID) {
      throw new Error("O campo 'id' é obrigatório no objeto de dados.");
    }

    // Configuração da requisição para obter o QR Code
    const collecBillingQrcode = {
      method: 'POST',
      url: `https://api-sandbox.asaas.com/v3/payments/${chargeID}/pixQrCode`,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        access_token: process.env.ACCESS_TOKEN
      },
    };

    
    const response = await axios.request(collecBillingQrcode);
  
    const {payload, encodedImage} = response.data;
  
    const newData: QrCodeProps = {
      id: chargeID,
      customer: data.custumer, 
      billingType: data.billingType,
      dateCreated: data.dateCreated,
      dueDate: data.dueDate,
      encodedImage,
      payload, 
      status:data.status,
      
    }

    const payloadData = {
      ...newData, 
      
    };
    const params = {
      TableName: 'QrcodeTransactions',
      Item: payloadData
    };

    await dynamoDB.put(params).promise();
    console.log("SAVED ON DB");

  } catch (error) {
    console.error("Erro ao salvar os dados:", error);
    throw new Error("Sorry, we could not save this information.");
  }
}
