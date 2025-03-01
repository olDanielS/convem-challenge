import { dynamoDB } from '../../config/dynamodb';
import { TransferProps } from '../../utils/interfaceTransactions';

export default async function handleSendtoDB(data: any) {
  try {
  
  const payload: TransferProps = {
    id: data.id,
    object:data.object,
    customer:data.customer,
    dateCreated: data.dateCreated,
    operationType: data.operationType,
    scheduleDate: data.scheduleDate,
    status: data.status,
    value:data.value
  };
  
    await dynamoDB.put({
          TableName: "TransferTrasaction",
          Item: {
            ...payload
          },
        })
        .promise();     
  }
  catch(err){
    return err
  }
}
