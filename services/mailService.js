const nodemailer = require('nodemailer');
require('dotenv').config();

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail', // Replace with another email service if needed
      auth: {
        user: process.env.EMAIL_USER, // Sender's email
        pass: process.env.EMAIL_PASSWORD, // App Password or email password
      },
    });
  }

  // Method to send username and password
  async sendCredentials(to, username, password) {
    console.log(to, username, password);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to, to,
      subject: 'Timelog Management Account Credentials',
      text: `Hello, your account has been created.\n\nUsername: ${username}\nPassword: ${password}`,
      html: `
        <h3>Your Account Credentials</h3>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p>Please use this credentials for login your account.</p>
      `,
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', result);
      return result;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}

module.exports = new EmailService();
