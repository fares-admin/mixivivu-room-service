import {
  CommonListResult,
  CommonResponse,
  generateServiceToken,
} from 'common-abstract-fares-system'

import { RoomRepository } from '@/src/repository/room-repository/room-repository'
import axios from 'axios'
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

  const responseList = await Promise.all(
    result.result.data.map(async (item) => {
      const internalToken = generateServiceToken({ serviceName: process.env.SERVICE_NAME || '' })
      const internalImage = await axios.get(
        `${
          process.env.IMAGE_SERVICE_URL
        }/api/images/get-list?belongIds=${item._id.toString()}&ServiceToken=${internalToken}`
      )
      if (internalImage.status === 200 && internalImage.data.success) {
        const result = internalImage.data.result as CommonListResult<any>
        if (result.data.length > 0) {
          return {
            ...item,
            _id: item._id.toString(),
            productId: item.productId.toString(),
            thumbnail: result.data[0].link,
            catalog: result.data.filter((item, index) => index > 0).map((item) => item.link),
          }
        }
      }

      return {
        ...item,
        _id: item._id.toString(),
        productId: item.productId.toString(),
        thumbnail: '',
        catalog: [],
      }
    })
  )

  if (isAuth) {
    return {
      status: 200,
      message: 'ok',
      success: true,
      result: {
        ...result.result,
        data: responseList,
      },
    }
  }
  return {
    status: 200,
    message: 'ok',
    success: true,
    result: {
      ...result.result,
      data: responseList.map((item) => {
        return {
          ...item,
          active: undefined,
        }
      }),
    },
  }
}
