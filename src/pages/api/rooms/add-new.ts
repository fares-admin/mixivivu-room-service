import { InternalAuthService } from '@/src/service/internal-auth-service/internal-auth-service'
import { RoomService } from '@/src/service/room-service/room-service'
import { wrapperEndpoint } from 'common-abstract-fares-system'
import { NextApiRequest, NextApiResponse } from 'next'

/*
    @ericchen:

    put your explanation here
*/

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '30mb',
    },
  },
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const service = new RoomService()
  const internalService = new InternalAuthService()
  const authResult = await internalService.authUserToken(req.headers.authorization || '')
  if (!authResult.success) {
    res.status(200).json(authResult)
  } else {
    const result = await wrapperEndpoint(req, 'POST', service.addNewRoom(req.body))
    res.status(200).json(result)
  }
}
