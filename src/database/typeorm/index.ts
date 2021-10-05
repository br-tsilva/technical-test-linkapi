import { Connection, createConnection } from 'typeorm'
import databaseProperties from '@src/config/database.config'
import path from 'path'

export default async (): Promise<Connection> => {
  const { mongodb } = databaseProperties

  return createConnection({
    ...mongodb,
    entities: [path.resolve(__dirname, 'models', '**', '*.ts')],
    migrations: [path.resolve(__dirname, 'migrations', '**', '*.ts')],
    cli: {
      entitiesDir: path.resolve(__dirname, 'models'),
      migrationsDir: path.resolve(__dirname, 'migrations'),
    },
  })
}
