const nodemailer = require('nodemailer')

class EmailService {
  
  static createTransport () {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_CREDENTIAL_USER,
        pass: process.env.EMAIL_CREDENTIAL_PASS
      }
    })

    return transporter
  }

  async sendEmail (mailOptions) {
    try {
      const transporter = await EmailService.createTransport()

      const emailSend = await transporter.sendMail(mailOptions)

      return emailSend
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = EmailService
