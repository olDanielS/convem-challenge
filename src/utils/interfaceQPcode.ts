export interface QrCodeProps{
  id: string,
  billingType:string,
  customer:string,
  dateCreated:string,
  dueDate:string,
  encodedImage:string,
  payload:string,
  status:string,
  
}
export interface WithdrawalProps{
  id:string,
  object: string,
  value: number,
  dateCreated:string,
  operationType:string,
  scheduleDate:string,
  status:string,
  
}