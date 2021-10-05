import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'

interface IOrganizations {
  orgId: string
  name: string
  contactPerson: string
}

interface IItems {
  itemId: string
  description: string
  currency: string
  value: number
}

@Entity('orders')
export default class Orders {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  orderId: string

  @Column()
  customer: IOrganizations

  @Column()
  items: IItems[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
