import mongoose, { Mongoose } from 'mongoose'
import databaseProperties from '@src/config/database.config'

const { mongodb } = databaseProperties

export default (): Promise<Mongoose> => mongoose.connect(mongodb.url)
