interface IMongoDBOptions {
  type: 'mongodb'
  url: string
  host: string
  port: number
  database: string
  username: string
  password: string
}

export interface IDatabaseOptions {
  mongodb: IMongoDBOptions
}
