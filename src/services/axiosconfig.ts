//==-=-=- REFATORAR NOMES DOS OBJETOS=-=-=--= 



export const optionsAxiosConfig = {
  method: 'POST',
  url: process.env.URL,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    access_token: process.env.ACCESS_TOKEN
  },
};
export const optionsAxiosUsers = {
  method: 'POST',
  url: process.env.URL_CLIENT,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    access_token: process.env.ACCESS_TOKEN
  },
};
export const optionsAxiosWithdrawal = {
  method: 'POST',
  url: process.env.URL_WITHDRAWAL,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    access_token: process.env.ACCESS_TOKEN
  },
};


