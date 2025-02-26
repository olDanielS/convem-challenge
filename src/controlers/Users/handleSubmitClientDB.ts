import {dynamoDB} from '../../config/dynamodb';

export default async function handleSubmitClientDB(data:any){

 const payload = {
  id: data.id,
  cpfCnpj: data.cpfCnpj,
  dateCreated: data.dateCreated,
  email: data.email,
  name: data.name,
  personType: data.personType
 }

 const params = {
  TableName: 'Clients',
  Item: payload,
};

try {
  const createdTransaction =  await dynamoDB.put(params).promise();
  console.log(createdTransaction)
} catch (error) {
  throw new Error("Sorry, we could not save this information. ")
}
}