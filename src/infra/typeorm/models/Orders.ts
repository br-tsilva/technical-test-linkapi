import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity('orders')
export default class Orders {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  date: string

  @Column()
  totalValue: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
