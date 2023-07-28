import mongoose from 'mongoose'

export class Room {
  _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()

  productId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()

  title: string = ''

  size: number = 0

  maxPersons: number = 0

  price: number = 0

  salePrices: number = 0

  features: string[] = []

  active: boolean = true
}

export const RoomSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  productId: mongoose.Types.ObjectId,
  title: String,
  size: Number,
  maxPersons: Number,
  price: Number,
  salePrices: Number,
  features: Array<String>,
  active: Boolean,
})
