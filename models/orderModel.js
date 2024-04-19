import { mongoose } from 'mongoose'

const salesOrdersSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      trim: true,
    },
    Unit: {
      type: Number,
      minlength: 3, 
      maxlength: 20,
      trim: true,
    },
    DishQty: {
      type: Array,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('SalesOrders', salesOrdersSchema)

export default Order
