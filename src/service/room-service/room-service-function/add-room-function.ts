import { CommonResponse, validate } from 'common-abstract-fares-system'
import { RoomReq, RoomReqError, RoomValidatorSchema } from '../room-req'

import { Room } from '@/src/repository/room-repository/room-entity'
import { RoomRepository } from '@/src/repository/room-repository/room-repository'
import mongoose from 'mongoose'

export const addNewRoomFunction = async (
  req: RoomReq,
  repository: RoomRepository
): Promise<CommonResponse<RoomReqError | string>> => {
  const validateRes = await validate(req, RoomValidatorSchema)
  if (validateRes.isError) {
    return {
      success: false,
      result: validateRes.error,
      message: 'invalidRequest',
      status: 400,
    }
  }
  const entity: Room = {
    ...new Room(),
    ...req,
    productId: new mongoose.Types.ObjectId(req.productId),
    features: req.features.filter((item) => item.length > 0),
  }
  const { error } = await repository.insert([{ ...entity }])
  if (error) {
    return {
      status: 500,
      message: error || '',
      result: '',
      success: false,
    }
  }
  const { result } = await repository.findOne('title', req.title)
  return {
    status: 200,
    message: 'ok',
    result: result?._id.toString() || '',
    success: true,
  }
}
