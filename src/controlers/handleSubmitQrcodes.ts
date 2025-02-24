import {v4 as uuidv4} from 'uuid';
import {dynamoDB, TABLE_NAME} from '../config/dynamodb';

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
  TableName: TABLE_NAME,
  Item: items,
};

try {
  console.log("saved")
  return await dynamoDB.put(params).promise();
} catch (error) {
  throw new Error("Sorry, we could not save this information. ")
}
}