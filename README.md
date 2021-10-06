# Teste Técnico - LinkAPI

## Integração Pipedrive e Bling

##### Requisitos:

- Criar contas testes nas plataformas Pipedrive e Bling.
- Criar uma integração entre as plataformas Pipedrive e Bling (A integração deve buscar as oportunidades com status igual a ganho no Pipedrive, depois inseri-las como pedido no Bling).
- Criar banco de dados Mongo, existem serviços como MongoDB Atlas para criar de graça.
- Criar uma collection no banco de dados MongoDB agregando as oportunidades inseridas no Bling por dia e valor total.
- Criar endpoint para trazer os dados consolidados da collection do MongoDB.

##### Tecnologias

- Typescript
- TypeORM/MongoDB Driver
- Express
- NodeJS

##### Outras Bibliotecas

- Axios
- Cors
- Dotenv
- Eslint - Airbnb Typescript
- Prettier
- Husky
- Lint-Staged
- Git-Commit-Msg-Lint

##### Dependências

- Yarn
- NodeJS (O projeto foi desenvolvido na versão v16.9.0)

##### Instruções

Para executar este projeto em sua máquina, siga os passos abaixo:

- Faça o clone deste repositório.
- Certifique-se de possuir o NodeJS instalado em sua máquina.
- Abra o projeto com um `Editor de Texto`. Recomendado: `VSCode`.
- Abra o console do editor de texto e execute o comando `npm install yarn` para instalar o gerenciador de pacotes Yarn através do NPM do NodeJS.
- Crie o arquivo `.env` na raiz do projeto, em seguida copie tudo o que estiver dentro do arquivo `.env.example`, cole em `.env` e configure preenchendo os dados.
- Execute o comando `yarn build` para o Typescript compilar-se a Javascript, para modo `produção`. Uma pasta nomeada `dist` será criada na raiz do projeto. `ATENÇÃO`, sempre que executar este comando, certifique-se de que a pasta `dist` esteja deletada, afim de evitar conflitos.
- Execute o comando `yarn start` para ligar o servidor. O serviço será escutado na porta definida no arquivo `.env` em `SERVER_PORT`, caso este não esteja informado, a porta padrão será a `3000`.
- Para executar o servidor em modo `desenvolvimento` com Typescript, execute o comando `yarn start:dev`.

##### Sobre `.env`

Sane suas dúvidas sobre as propriedades do arquivo em tópico
| Propriedade | Descrição |
| - | - |
| SERVER_PORT | Porta em que o servidor deverá ser executado. Padrão `3000`|
| ------ | ------ |
| MONGO_HOST | Endereço da conexão Mongo |
| MONGO_PORT | Porta em que o serviço Mongo está sendo executado. Recomendado: `27017` |
| MONGO_NAME | Nome do banco de dados Mongo |
| MONGO_USERNAME | Usuário de autentição para conexão Mongo |
| MONGO_PASSWORD | Senha de autentição para conexão Mongo |
| ------ | ------ |
| PIPEDRIVE_COMPANY_NAME | Nome da empresa criada no Pipedrive |
| PIPEDRIVE_API_TOKEN | Token de acesso ao [Pipedrive API](https://developers.pipedrive.com/docs/api/v1) |
| ------ | ------ |
| BLING_API_HOST | Endpoint do Bling API. Recomendado: `https://bling.com.br/Api` |
| BLING_API_TOKEN | Token de acesso ao [Bling API](https://ajuda.bling.com.br/hc/pt-br/categories/360002186394-API-para-Desenvolvedores) |

##### Capturas de tela

Negócios criados e definidos com status `Ganho`
![pipedrive](https://github.com/devtsv/technical-test-linkapi/blob/master/assets/screenshot-pipedrive.png 'pipedrive')

Negócios criados como pedidos, utilizando somente dados necessários.
![bling](https://github.com/devtsv/technical-test-linkapi/blob/master/assets/screenshot-bling.png 'bling')

Coleção contento o `valor total` dos pedidos inseridos no Bling, agregados pela `data`
![mongoatlas](https://github.com/devtsv/technical-test-linkapi/blob/master/assets/screenshot-mongoatlas.png 'mongoatlas')

##### Rotas

É totalmente possível executar estas rotas utilizando o `Postman` ou `INSOMNIA`.
Recomendado: `INSOMNIA`, pela simplicidade e poderosa funcionalidade.
As rotas criadas no `INSOMNIA` estão dentro do repositório, em um arquivo `JSON`.
`ATENÇÃO`, ao você definir uma porta no arquivo `.env` do servidor, certifique-se que a variável de ambiente `host` no `INSOMNIA` possui a mesma porta configurada no servidor.
Método | Endereço |
| - | - |
| GET | / |
| GET | /deals/:status (all_not_deleted, deleted, lost, open, won) |
| GET | /bling/orders |
| POST | /bling/wonDeals |
