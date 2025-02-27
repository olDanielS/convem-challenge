import { dynamoDB } from '../../config/dynamodb';
import { WithdrawalProps } from '../../utils/interfaceQPcode';

export default async function handleSendtoDB(data: any) {
  try {
  
  const payload: WithdrawalProps = {
    id: data.id,
    object:data.object,
    dateCreated: data.dateCreated,
    operationType: data.operationType,
    scheduleDate: data.scheduleDate,
    status: data.status,
    value:data.value
  };
  
    await dynamoDB.put({
          TableName: "WithdrawalTransaction",
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
