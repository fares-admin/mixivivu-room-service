import { IS_NUMBER, ObjectValidator } from 'common-abstract-fares-system'
import { IS_FEATURE } from './custom-validation/IS_FEATURE'
import { IS_PRODUCT_ID } from './custom-validation/IS_PRODUCT_ID'
import { IS_TITLE } from './custom-validation/IS_TITLE'

export class RoomReq {
  productId: string = ''

  title: string = ''

  size: number = 0

  maxPersons: number = 0

  price: number = 0

  salePrices: number = 0

  features: string[] = []
}

export const RoomValidatorSchema: ObjectValidator<RoomReq> = {
  productId: IS_PRODUCT_ID,
  title: IS_TITLE,
  size: IS_NUMBER,
  maxPersons: IS_NUMBER,
  price: IS_NUMBER,
  features: IS_FEATURE,
}

export type RoomReqError = Record<keyof RoomReq, string>
