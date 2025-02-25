import {v4 as uuidv4} from 'uuid';
import {dynamoDB} from '../config/dynamodb';

import {QrCodeProps} from '../utils/interfaceQPcode'

export default async function handleSubmitQrcode({id, allowsMultiplePayments, encodedImage, expirationDate,externalReference,payload}:QrCodeProps){
 const items =  {
  id, 
  allowsMultiplePayments,
  encodedImage, 
  expirationDate,
  externalReference,
  payload
 }
 const params = {
  TableName: 'QrcodeTransactions',
  Item: items,
};

try {
  console.log("saved")
  const createdTransaction =  await dynamoDB.put(params).promise();
  console.log(createdTransaction)
} catch (error) {
  throw new Error("Sorry, we could not save this information. ")
}
}