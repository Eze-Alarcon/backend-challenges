/* eslint space-before-function-paren: 0 */
import crypto from 'crypto'

export function createID() {
  return crypto.randomUUID()
}

function codeFactory() {
  let id = 0
  return () => ++id
}

export const genCode = codeFactory()
