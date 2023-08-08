class EmailServiceMock {
  async send ({ dest, message }) {
    console.log(`[email.service.js] - ${dest}: ${message}`)
    return { dest, message }
  }
}

export { EmailServiceMock }
