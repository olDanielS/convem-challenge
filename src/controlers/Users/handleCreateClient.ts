import { Request, Response } from 'express';
import axios from "axios";
import { optionsAxiosUsers } from "../../services/axiosconfig";
import handleSubmitClientDB from './handleSubmitClientDB';

class handleCreateClient{
  async execute(req: Request, res: Response) {
    const { name, cpfCnpj, email } = req.body;
    
    if (!name || !cpfCnpj || !email) {
      res.status(400).json({Error: "Sory, arguments insufficients."})
      return
    }
    const payload = {
      ...optionsAxiosUsers,
      data: {
        name, 
        cpfCnpj, 
        email
      }
    }
    await axios.request(payload).then(response => {
      handleSubmitClientDB(response.data) //Send this user to DynamoDB
      console.log(response.data)
      res.json(response.data)
      
    }).catch(err => {
      res.status(400).send(err);
    })
      }
}

export {handleCreateClient};