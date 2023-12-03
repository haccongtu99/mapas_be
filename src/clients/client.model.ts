import { Schema, model } from 'mongoose'
import { IClient } from './client.interface'

const ClientsSchema = new Schema<IClient>(
  {
    thumb: {
      type: String
    },
    colorThumb: {
      type: String
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    country: {
      type: String
    },
    contact: {
      type: String
    },
    email: {
      type: String
    },
    link: {
      type: String
    }
  },
  {
    collection: 'clients',
    timestamps: true
  }
)

const ClientModel = model<IClient>('Clients', ClientsSchema)

export default ClientModel
