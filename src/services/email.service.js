// Libraries
import { createTransport } from 'nodemailer'

// Config
import { EMAIL_CONFIG } from '../config/email.config.js'

class EmailService {
  #clienteNodemailer
  constructor (config) {
    this.#clienteNodemailer = createTransport(config)
  }

  async send (dest, message) {
    const mailOptions = {
      from: 'Servidor Node.js',
      to: dest,
      subject: 'Mail de prueba desde Node.js',
      html: `<p style="color: blue;">${message}</p>`
    }
    try {
      const info = await this.#clienteNodemailer.sendMail(mailOptions)
      console.log(info)
      return info
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

// TODO: Delete this 👇

class EmailServiceMock {
  async send (destinatario, mensaje) {
    console.log(`${destinatario}:  ${mensaje}`)
    return { destinatario, mensaje }
  }
}

export let emailService
if (process.env.NODE_ENV === 'PROD') {
  emailService = new EmailService(EMAIL_CONFIG)
} else {
  emailService = new EmailServiceMock()
}
