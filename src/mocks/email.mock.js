// Libraries
import { createTransport } from 'nodemailer'

import { USER, PASS } from '../config/config.js'

console.log(USER, PASS)

const clienteNodemailer = createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: USER,
    pass: PASS
  }
})

const TEST_MAIL = 'alarcon.ezequiel26@gmail.com'

const mailOptions = {
  from: 'Servidor Node.js',
  to: TEST_MAIL,
  subject: 'Mail de prueba desde Node.js',
  html: '<h1 style="color: blue;">Contenido de prueba con archivo adjunto desde <span style="color: green;">Node.js con Nodemailer</span></h1>'
}

try {
  const info = await clienteNodemailer.sendMail(mailOptions)
  console.log(info)
} catch (error) {
  console.log(error)
}
