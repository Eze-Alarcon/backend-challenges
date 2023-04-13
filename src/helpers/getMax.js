'use strict'

/* eslint space-before-function-paren: 0 */
// import { ERRORS } from '../mocks/messages.js'

// export function sanitise(x) {
//   const num = parseInt(Number(x))
//   if (isNaN(num)) throw new Error(ERRORS.QUERY_NOT_NUMBER.ERROR_CODE)
//   if (num === 0) return num + 1
//   return num
// }

export function getMax(arr) {
  if (Array.isArray(arr)) {
    if (arr.length === 0) return 0
    const nums = arr.map(item => item.id)
    return Math.max(...nums)
  }
}
