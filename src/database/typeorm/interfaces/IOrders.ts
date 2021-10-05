import { IItems } from './IItems'
import { IOrganizations } from './IOrganizations'

export interface IOrders {
  orderId: string
  customer: IOrganizations
  item: IItems[]
  createdAt: Date
  updatedAt: Date
}
