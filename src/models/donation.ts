import { Document, Model, model, models, Schema } from 'mongoose'

export interface IDonation extends Document {
  name: string
  contact_number: string
  secondary_contact_number?: string
  blood_group: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  district: string
  upozilla: string
  address?: string
}

export type DonationModel = Model<IDonation, Record<string, unknown>>

const DonationSchema: Schema = new Schema<IDonation, DonationModel>(
  {
    name: { type: String, required: true },
    contact_number: { type: String, required: true },
    secondary_contact_number: String,
    blood_group: { type: String, required: true },
    district: { type: String, required: true },
    upozilla: { type: String, required: true },
    address: String,
  },
  { timestamps: true, toJSON: { virtuals: true }, versionKey: false }
)

export const Donation = models.Donation || model<IDonation>('Donation', DonationSchema)
