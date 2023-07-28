import { InternalAuthService } from '@/src/service/internal-auth-service/internal-auth-service'
import { RoomService } from '@/src/service/room-service/room-service'
import { wrapperEndpoint } from 'common-abstract-fares-system'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const service = new RoomService()
  const internalService = new InternalAuthService()
  const authResult = await internalService.authUserToken(req.headers.authorization || '')
  if (!authResult.success) {
    res.status(200).json(authResult)
  } else {
    const result = await wrapperEndpoint(req, 'DELETE', service.deleteRoom(req.query.ids as string))
    res.status(200).json(result)
  }
}
