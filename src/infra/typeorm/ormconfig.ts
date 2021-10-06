import { config } from '@src/infra/config'
import path from 'path'

const { mongodb } = config.database

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
