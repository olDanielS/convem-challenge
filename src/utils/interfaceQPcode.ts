export interface QrCodeProps{
  id: string,
  encodedImage: string,
  payload: string,
  allowsMultiplePayments: boolean | any,
  expirationDate: any,
  externalReference: any
}