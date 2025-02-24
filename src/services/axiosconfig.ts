export const optionsAxiosConfig = {
  method: 'POST',
  url: process.env.URL,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    access_token: process.env.ACCESS_TOKEN
  },
  data: {addressKey: process.env.ADDRESS_KEY}
};

