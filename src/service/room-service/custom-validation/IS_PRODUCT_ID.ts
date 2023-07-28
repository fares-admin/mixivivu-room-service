import axios from 'axios'
import { CommonResponse, generateServiceToken } from 'common-abstract-fares-system'
import { TValidateFunction } from 'common-abstract-fares-system/lib/validation-tool/type-validation'
import mongoose from 'mongoose'

export const IS_PRODUCT_ID: TValidateFunction = async <T extends object>(
  error: Record<keyof T, string>,
  value: any,
  key: keyof T
) => {
  if (!value || !mongoose.isValidObjectId(value)) {
    return {
      ...error,
      productId: 'productId invalid',
    }
  }
  const internalToken = generateServiceToken({ serviceName: process.env.SERVICE_NAME || '' })
  const callInternalProduct = await axios.get(
    `${process.env.PRODUCT_SERVICE_URL}/api/service/find-product?id=${value}&ServiceToken=${internalToken}`
  )
  if (callInternalProduct.status !== 200)
    return {
      ...error,
      productId: 'productId invalid',
    }
  const result = callInternalProduct.data as CommonResponse<any>
  if (!result.success) {
    return {
      ...error,
      productId: 'productId invalid',
    }
  }
  return { ...error, [key]: '' }
}
