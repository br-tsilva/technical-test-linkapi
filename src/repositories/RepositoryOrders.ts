import { EntityRepository, Repository } from 'typeorm'
import Orders from '@src/database/typeorm/models/Orders'

@EntityRepository(Orders)
export default class RepositoryOrders extends Repository<Orders> {}
