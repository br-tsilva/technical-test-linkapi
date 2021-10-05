import mongoose from 'mongoose'

const Orders = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    customer: {
      name: { type: String, required: true },
      contactPerson: { type: String, required: true },
    },
    item: {
      itemId: { type: String, required: true, unique: true },
      description: { type: String, required: true },
      currency: { type: String, required: true },
      value: { type: Number, required: true },
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
)

export default mongoose.model('orders', Orders)
