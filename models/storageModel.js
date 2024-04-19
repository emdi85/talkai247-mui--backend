import { mongoose } from 'mongoose'

const storageSchema = mongoose.Schema(
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

const Storage = mongoose.model('StorageLocation', storageSchema)

export default Storage
