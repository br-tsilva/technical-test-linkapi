import databaseProperties from '@src/config/database.config'
import path from 'path'

const { mongodb } = databaseProperties

export default {
  ...mongodb,
  synchronize: false,
  logging: false,
  entities: [path.resolve(__dirname, 'models', '**', '*.{js,ts}')],
  migrations: [path.resolve(__dirname, 'migrations', '**', '*.{js,ts}')],
  cli: {
    entitiesDir: path.resolve(__dirname, 'models'),
    migrationsDir: path.resolve(__dirname, 'migrations'),
  },
}
