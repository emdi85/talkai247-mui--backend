import bcrypt from 'bcryptjs'
import { mongoose } from 'mongoose'
import validator from 'validator'

const typeSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
)

const Type = mongoose.model('Type', typeSchema)

export default Type
