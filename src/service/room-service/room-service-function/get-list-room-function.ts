import { RoomRepository } from '@/src/repository/room-repository/room-repository'
import { CommonListResult, CommonResponse } from 'common-abstract-fares-system'
import mongoose from 'mongoose'
import { NextApiRequest } from 'next'
import { PrivateRoomRes } from '../room-private-res'
import { PublicRoomRes } from '../room-public-res'

export const getListRoomsFunc = async (
  req: NextApiRequest,
  repository: RoomRepository,
  getPageAndSize: (req: {
    query: {
      page: number
      size: number
    }
  }) => {
    page: number
    size: number
  },
  pipeline: mongoose.PipelineStage[],
  isAuth?: boolean
): Promise<CommonResponse<CommonListResult<PublicRoomRes | PrivateRoomRes> | string>> => {
  const { page, size } = getPageAndSize(req as any)
  const result = await repository.find(page, size, pipeline)
  if (!result.result) {
    return {
      status: 500,
      message: 'sv err',
      success: false,
      result: '',
    }
  }
  if (isAuth) {
    return {
      status: 200,
      message: 'ok',
      success: true,
      result: {
        ...result.result,
        data: result.result.data.map((item) => {
          return {
            ...item,
            _id: item._id.toString(),
            productId: item.productId.toString(),
            active: item.active,
          }
        }),
      },
    }
  }
  return {
    status: 200,
    message: 'ok',
    success: true,
    result: {
      ...result.result,
      data: result.result.data.map((item) => {
        return {
          ...item,
          _id: item._id.toString(),
          productId: item.productId.toString(),
          active: undefined,
        }
      }),
    },
  }
}
