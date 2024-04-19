import { mongoose } from 'mongoose'

const dishSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      default: 'Name',
      trim: true,
    },
    Description: {
      type: String,
      trim: true,
    },
    Image: {
      type: String,
      unique: true,
    },
    Video: {
      type: String,
      unique: true,
    },
    Ingredients: {
      type: Array,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
)

const Dishes = mongoose.model('Dishes', dishSchema)

export default Dishes
