import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'

@Entity('orders')
export default class Orders {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  dealId: string

  @Column()
  dealName: string

  @Column()
  contactPerson: string

  @Column()
  currency: string

  @Column()
  value: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
