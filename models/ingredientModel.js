import { mongoose } from 'mongoose'

const ingredientSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      default: 'Name',
      trim: true,
    },
    Unit: {
      type: Array,
      trim: true,
    },
    Storage: {
      type: Array,
      trim: true,
    },
    Type: {
      type: Array,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

const Ingredients = mongoose.model('Ingredients', ingredientSchema)

export default Ingredients
