import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = null;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail', // Or replace with 'Yahoo', 'Hotmail', etc.
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // App-specific password
      },
    });
  }

  async sendEmail({
    to,
    subject,
    text,
  }: {
    to: string;
    subject: string;
    text: string;
  }) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_USER, // Sender address
        to,
        subject,
        text,
      });
    } catch (error) {
      throw error;
    }
  }
}
