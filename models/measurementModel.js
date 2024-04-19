import { mongoose } from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    abbrevation: {
      type: String,
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('SalesOrder', orderSchema)

export default Order
