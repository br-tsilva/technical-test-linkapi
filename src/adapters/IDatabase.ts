interface IMongoOptions {
  type: 'mongodb'
  url: string
  host: string
  port: number
  database: string
  username: string
  password: string
  useUnifiedTopology: boolean
  writeConcern: {
    w: string
    wtimeout: number
    j: boolean
  }
}

interface IMySQLOptions {
  type: 'mysql'
  url: string
  host: string
  port: number
  database: string
  username: string
  password: string
}

export interface IDatabaseOptions {
  mongodb: IMongoOptions
  mysql: IMySQLOptions
}
