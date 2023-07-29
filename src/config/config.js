// Libraries
import * as dotenv from 'dotenv'

dotenv.config({
  path: 'src/config/.env'
})

const URL_DB = process.env.NODE_ENV === 'production'
  ? process.env.URL_DB
  : process.env.URL_DB_TEST

const SALT = process.env.SALT

const COOKIE_NAME = 'jwt_authorization'

const COOKIE_SECRET = process.env.COOKIE_SECRET

const SECRET_PASSWORD_JWT = process.env.JWT_SECRET

// ===== github login =====

const GH_CLIENT_ID = process.env.CLIENT_ID_GITHUB

const GH_CLIENT_SECRET = process.env.CLIENT_GITHUB_SECRET

const GH_CB_URL = 'http://localhost:8080/api/sessions/githubcallback'

export {
  COOKIE_SECRET,
  GH_CB_URL,
  GH_CLIENT_ID,
  GH_CLIENT_SECRET,
  SALT,
  SECRET_PASSWORD_JWT,
  URL_DB,
  COOKIE_NAME
}
