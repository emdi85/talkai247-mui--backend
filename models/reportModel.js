import { mongoose } from 'mongoose'

const reportSchema = mongoose.Schema(
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

const Report = mongoose.model('ReportLocation', reportSchema)

export default Report
