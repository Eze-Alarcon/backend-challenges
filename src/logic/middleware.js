/* eslint space-before-function-paren: 0 */
import { ERRORS } from '../mocks/messages.js'

export function sanitise(x) {
  const num = parseInt(x)
  if (isNaN(num)) throw new Error(ERRORS.QUERY_NOT_NUMBER)
  return num
}

export function limitProducts(arr, queryLimit = 5, queryPage = 1) {
  const limit = parseInt(queryLimit)
  const page = parseInt(queryPage)

  let sliceArr = []
  if (page === 1) sliceArr = arr.splice(0, limit)
  if (page !== 1) sliceArr = arr.splice(limit * (page - 1), limit)
  return sliceArr
}
