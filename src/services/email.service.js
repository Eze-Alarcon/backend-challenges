// Libraries
import { createTransport } from 'nodemailer'

// Config
import { EMAIL_CONFIG } from '../config/email.config.js'

// Models
import { CustomError } from '../models/error.model.js'

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

  async send ({ dest, message, emailType }) {
    let template
    if (emailType === 'recovery') this.#passwordTemplate(message)
    if (emailType === 'delete') this.#deleteAccount(message)

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

// TODO: Delete this 👇

class EmailServiceMock {
  async send ({ dest, message }) {
    console.log(`[email.service.js] - ${dest}: ${message}`)
    return { dest, message }
  }
}

export let emailService
if (process.env.NODE_ENV === 'production') {
  emailService = new EmailService(EMAIL_CONFIG)
} else {
  emailService = new EmailServiceMock()
}
