import { Connection, createConnection } from 'typeorm'
import ormconfig from './ormconfig'

export default async (): Promise<Connection> => createConnection(ormconfig)
