import { CommonRepository } from 'common-abstract-fares-system'
import { Room, RoomSchema } from './room-entity'

export class RoomRepository extends CommonRepository<Room> {
  constructor() {
    super(RoomSchema, 'rooms')
  }
}
