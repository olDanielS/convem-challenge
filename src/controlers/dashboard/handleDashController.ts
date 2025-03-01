import {Request, Response} from 'express';
import { dynamoDB } from '../../config/dynamodb';
import { QueryParams } from '../../utils/interfaceTransactions';

class HandleDashController {
  async execute(req:Request, res:Response){
    const { tableName, startKey }: QueryParams = req.query;
   
    if (!tableName) {
      return res.status(400).json({ error: 'Nome da tabela é obrigatório' });
    }
  
    const params: AWS.DynamoDB.DocumentClient.ScanInput = {
      TableName: tableName,
      Limit: 6, // Número de itens por página
    };
  
    if (startKey) {
      try {
        params.ExclusiveStartKey = JSON.parse(decodeURIComponent(startKey));
      } catch (error) {
        return res.status(400).json({ error: 'Chave de paginação inválida' });
      }
    }
  
    try {
      const result = await dynamoDB.scan(params).promise();
      
      res.json({
        items: result.Items || [],
        lastEvaluatedKey: result.LastEvaluatedKey ? encodeURIComponent(JSON.stringify(result.LastEvaluatedKey)) : null,
      });
    } catch (error) {
      console.error('Erro ao buscar dados do DynamoDB:', error);
      res.status(500).json({ error: 'Erro ao acessar o banco de dados' });
    }
  }
}
export {HandleDashController};