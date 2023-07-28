import { Room } from '@/src/repository/room-repository/room-entity'
import { RoomRepository } from '@/src/repository/room-repository/room-repository'
import { CommonListResult, CommonResponse, CommonService } from 'common-abstract-fares-system'
import { NextApiRequest } from 'next'
import { PrivateRoomRes } from './room-private-res'
import { PublicRoomRes } from './room-public-res'
import { RoomReq, RoomReqError } from './room-req'
import { addNewRoomFunction } from './room-service-function/add-room-function'
import { deleteRoomFunction } from './room-service-function/delete-room-function'
import { findRoomInternalFunction } from './room-service-function/find-room-internal-function'
import { getListRoomsFunc } from './room-service-function/get-list-room-function'
import { updateRoomFunction } from './room-service-function/update-room-function'

export class RoomService extends CommonService<RoomRepository> {
  constructor() {
    super(new RoomRepository())
  }

  public async getListRooms(
    req: NextApiRequest,
    isAuth?: boolean
  ): Promise<CommonResponse<CommonListResult<PublicRoomRes | PrivateRoomRes> | string>> {
    return await getListRoomsFunc(
      req,
      this.repository,
      this.getPageAndSize,
      this.generatePipelineAggregate(req.query, new Room()),
      isAuth
    )
  }

  public async addNewRoom(req: RoomReq): Promise<CommonResponse<RoomReqError | string>> {
    return await addNewRoomFunction(req, this.repository)
  }

  public async updateRoom(
    req: RoomReq,
    id: string
  ): Promise<CommonResponse<RoomReqError | string>> {
    return await updateRoomFunction(req, id, this.repository)
  }

  public async deleteRoom(ids: string): Promise<CommonResponse<string>> {
    return await deleteRoomFunction(ids, this.repository)
  }

  public async getInternalRoom(
    id: string,
    serviceToken: string
  ): Promise<CommonResponse<Room | string>> {
    return await findRoomInternalFunction(serviceToken, this.repository, id)
  }
}
