Desafio Convem

> OBJETIVO 

Realizar a integração com a API de Pix do Asaas para depósitos e saques.

Escolha uma tecnologia que não tenha tanta prática entre NodeJS c/ Typescript, GoLang ou Rust.


> CASH IN (depósitos)

Faça uma API para gerar o QR Code Pix 
e salve as informações num banco de dados AWS DynamoDB.
-=-=-=- OK

Faça uma API para receber a notificação webhook de cash in enviada pelo Asaas. Essa api deve simplesmente receber o webhook e enviar o payload para uma AWS SQS (fila), usando SDK da AWS.

Suba também uma função AWS Lambda conectada nessa SQS que pegue cada mensagem e atualize o QR Code Pix no AWS DynamoDB.

Crie um script de teste para criar 100 QR Codes (em qualquer linguagem)


> CASH OUT (saques)

Faça uma API para solicitar um cash out e salve as informações num banco de dados AWS DynamoDB.

Faça uma API para receber a notificação de webhook de cash out. Essa api deve simplesmente receber o webhook e enviar o payload para uma AWS SQS (fila), usando SDK da AWS.

Suba também uma função AWS Lambda conectada nessa SQS que pegue cada mensagem e atualize o QR Code Pix no AWS DynamoDB.

Crie um script de teste para criar 100 solicitações de cash out (em qualquer linguagem).


> FRONT

Crie uma tela simples usando uma das seguintes tecnologias (Vite ou Next.Js) que exiba essas transações salvas no DynamoDB, a partir de uma rota GET.

Caso queira, você pode usar alguma biblioteca de componentes (ex: Mui, Tailwind, Bootstrap).


> DISCUSSÃO

Escreva seus pensamentos sobre como controlar o saldo do cliente, quais desafios teria, estratégias para evitar perda financeira, quais pontos de atenção e o que mais queira falar sobre o tema.


> ORIENTAÇÕES

Você pode usar tudo que for possível para acelerar sua entrega.

Você pode (e deve) fazer quantas perguntas quiser.

O importante não é o quanto você sabe e sim o quão rápido consegue aprender, qual sua atitude frente aos problemas e qual seu comportamento junto ao cliente (eu).

O prazo para entrega é dia 03/03 as 9h, segunda-feira.

Não esqueça de cancelar a AWS depois do desafio, para não ter custos no cartão, após o período gratuito.

Abs!