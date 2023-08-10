// Libraries
import { createTransport } from 'nodemailer'

// Config
import { EMAIL_CONFIG } from '../config/email.config.js'

// Models
import { CustomError } from '../models/error.model.js'

// Utils
import { EMAIL_ERROR } from '../utils/errors.messages.js'

class EmailService {
  #clienteNodemailer
  constructor (config) {
    this.#clienteNodemailer = createTransport(config)
  }

  #passwordTemplate (message) {
    return `<button><a></a>${message}</a></button>
    <p>If the button doesn't work, here is the link: <span style="color: blue;">${message}</span></p>`
  }

  #deleteAccount (message) {
    return `<p>Hi ${message}</p>
    <br/>
    <p>Your account was deleted due to inactivity</p>
    `
  }

  #deleteProduct (message) {
    return `<p>Hi</p>
    <br/>
    <p>Your Product (${message}) was deleted</p>
    `
  }

  async send ({ dest, message, emailType }) {
    let template
    if (emailType === 'recovery') this.template = this.#passwordTemplate(message)
    if (emailType === 'delete') this.template = this.#deleteAccount(message)
    if (emailType === 'productDeleted') this.template = this.#deleteProduct(message)

    const mailOptions = {
      from: 'Servidor Node.js',
      to: dest,
      subject: 'Mail de prueba desde Node.js',
      html: template
    }
    try {
      const info = await this.#clienteNodemailer.sendMail(mailOptions)
      return info
    } catch (error) {
      throw new CustomError(EMAIL_ERROR.EMAIL_NOT_SEND)
    }
  }
}

const emailService = new EmailService(EMAIL_CONFIG)
export { emailService }
