import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('MAIL_HOST'),
      port: this.config.get('MAIL_PORT'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.config.get('MAIL_USER'),
        pass: this.config.get('MAIL_PASS'),
      },
    });
  }

  async sendOtpEmail(to: string, otp: string) {
    const mailOptions = {
      from: `"${this.config.get('MAIL_FROM')}" <${this.config.get('MAIL_USER')}>`,
      to,
      subject: 'Mã xác nhận thay đổi mật khẩu (OTP)',
      text: `Mã OTP của bạn là: ${otp}. Mã này có thời hạn trong 5 phút.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #333;">Xác nhận thay đổi mật khẩu</h2>
          <p>Bạn đã yêu cầu cấp lại mật khẩu cho tài khoản ứng dụng Quản lý Thiết bị.</p>
          <p>Mã OTP của bạn là:</p>
          <div style="font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px; background: #f9f9f9; text-align: center; border-radius: 5px; margin: 20px 0;">
            ${otp}
          </div>
          <p>Mã này có thời hạn trong <strong>5 phút</strong>. Nếu bạn không yêu cầu thay đổi này, vui lòng bỏ qua email này.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #777;">Đây là email tự động, vui lòng không trả lời.</p>
        </div>
      `,
    };

    try {
      console.log(`[TEST] OTP for ${to}: ${otp}`);
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error('Error sending email:', error);
      // We don't throw error here to avoid breaking the flow if mail server is down in dev
      // but in production we might want to handle this.
    }
  }
}
