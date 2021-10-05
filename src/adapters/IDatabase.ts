interface IMongoDBOptions {
  type: 'mongodb'
  database: string
  port: number
  username: string
  password: string
}

export interface IDatabaseOptions {
  mongodb: IMongoDBOptions
}
