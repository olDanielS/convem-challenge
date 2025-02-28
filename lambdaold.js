import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

// Cria o cliente do DynamoDB usando a região definida nas variáveis de ambiente
const client = new DynamoDBClient({ region: process.env.AWS_REGION });

export const handler = async (event) => {
  console.log("Evento recebido:", JSON.stringify(event, null, 2));

  let paymentId = null;
  let newStatus = null;

  // Tenta extrair dados do evento
  try {
    if (event?.Records && event.Records.length > 0) {
      const body = event.Records[0]?.body;

      if (body) {
        const data = JSON.parse(body);
        paymentId = data?.transfer?.id;
        newStatus = data?.transfer?.status;
      }
    }
  }  catch (error) {
    console.log("Erro ao processar evento ou JSON:", error.message);
  }

  // Verifica se os dados necessários estão presentes
  if (!paymentId || !newStatus) {
    console.log("Dados ausentes. Não será possível atualizar o item.");
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Dados ausentes, não foi possível processar." }),
    };
  }

  console.log("ID do Payment:", paymentId);
  console.log("Novo Status:", newStatus);

  // Define os parâmetros para atualizar o item na tabela do DynamoDB
  const params = {
    TableName: process.env.DYNAMO_TABLE_NAME, // Nome da tabela, definido nas variáveis de ambiente
    Key: {
      id: { S: paymentId } // Chave primária baseada no paymentId
    },
    // Exemplo: atualizando o atributo "status" para o novo status
    UpdateExpression: "SET #status = :newStatus",
    ExpressionAttributeNames: {
      "#status": "status"
    },
    ExpressionAttributeValues: {
      ":newStatus": { S: newStatus }
    },
    ReturnValues: "ALL_NEW" // Retorna os atributos do item após a atualização
  };

  try {
    const result = await client.send(new UpdateItemCommand(params));
    console.log("Item atualizado com sucesso:", result);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Item atualizado com sucesso",
        updatedItem: result.Attributes,
      }),
    };
  } catch (error) {
    console.log("Erro ao atualizar item:", error.message);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Erro ao atualizar item",
      }),
    };
  }
};
