import { Room } from '@/src/repository/room-repository/room-entity'
import { RoomRepository } from '@/src/repository/room-repository/room-repository'
import { CommonResponse, validateServiceToken } from 'common-abstract-fares-system'
import mongoose from 'mongoose'

export const findRoomInternalFunction = async (
  serviceToken: string,
  repository: RoomRepository,
  roomId: string
): Promise<CommonResponse<Room | string>> => {
  try {
    const { serviceName } = validateServiceToken(serviceToken.split(' ')[1])
    if (!serviceName) {
      return {
        status: 500,
        message: 'invalid token',
        success: false,
        result: '',
      }
    }
    const serviceAccess = process.env.ACCESS_SCOPE?.split(',')
    if (!serviceAccess?.includes(serviceName)) {
      return {
        status: 500,
        message: 'no access',
        success: false,
        result: '',
      }
    }
  } catch (err) {
    return {
      status: 500,
      message: String(err),
      success: false,
      result: '',
    }
  }
  try {
    const findRoom = await repository.findOne('_id', new mongoose.Types.ObjectId(roomId))
    if (findRoom.error) {
      return {
        status: 401,
        message: String(findRoom.error),
        success: false,
        result: '',
      }
    }
    if (!findRoom.result) {
      return {
        status: 401,
        message: 'invalid room',
        success: false,
        result: '',
      }
    }
    return {
      status: 200,
      success: true,
      message: 'valid',
      result: findRoom.result,
    }
  } catch (err) {
    return {
      status: 401,
      message: String(err),
      success: false,
      result: '',
    }
  }
}
