import { RoomRepository } from '@/src/repository/room-repository/room-repository'
import { CommonResponse, validate } from 'common-abstract-fares-system'
import mongoose from 'mongoose'
import { RoomReq, RoomReqError, RoomValidatorSchema } from '../room-req'

export const updateRoomFunction = async (
  req: RoomReq,
  id: string,
  repository: RoomRepository
): Promise<CommonResponse<RoomReqError | string>> => {
  if (!id || !mongoose.isValidObjectId(id)) {
    return {
      success: false,
      message: 'invalid room id',
      status: 400,
      result: '',
    }
  }
  const findRoom = await repository.findOne('_id', new mongoose.Types.ObjectId(id))
  if (!findRoom.result) {
    return {
      success: false,
      message: 'not found room',
      result: '',
      status: 404,
    }
  }
  const validateRes = await validate(req, RoomValidatorSchema, { id })
  if (validateRes.isError) {
    return {
      success: false,
      result: validateRes.error,
      message: 'invalidRequest',
      status: 400,
    }
  }
  const { error } = await repository.update([
    {
      ...findRoom.result,
      ...req,
      productId: new mongoose.Types.ObjectId(req.productId),
      features: req.features.filter((item) => item.length > 0),
    },
  ])
  if (error) {
    return {
      status: 500,
      message: error || '',
      result: '',
      success: false,
    }
  }
  return {
    status: 200,
    message: 'ok',
    result: '',
    success: true,
  }
}
