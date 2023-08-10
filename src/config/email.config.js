const PROD_EMAIL_CONFIG = {
  service: 'gmail',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
}

const EMAIL_CONFIG = PROD_EMAIL_CONFIG

export { EMAIL_CONFIG }
