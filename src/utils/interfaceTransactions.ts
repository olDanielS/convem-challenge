export interface DepositProps{
  id: string,
  object: string,
  billingType:string,
  customer:string,
  dateCreated:string,
  dueDate:string,
  encodedImage:string,
  value: number,
  payload:string,
  status:string,
  
}
export interface TransferProps{
  id:string,
  object: string,
  customer: string,
  value: number,
  dateCreated:string,
  operationType:string,
  scheduleDate:string,
  status:string,
  
}

export interface QueryParams {
  tableName?: string;
  startKey?: string;
}