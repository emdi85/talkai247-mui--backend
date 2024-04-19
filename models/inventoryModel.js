import { mongoose } from 'mongoose'

const inventorySchema = mongoose.Schema(
  {
    Ingredient: {
      type: String,
      default: 'Name',
      trim: true,
    },
    Qty: {
      type: Number,
      trim: true,
    },
    StorageLocation: {
      type: String,
      unique: true,
    }
  },
  {
    timestamps: true,
  }
)

const Inventory = mongoose.model('Inventory', inventorySchema)

export default Inventory
