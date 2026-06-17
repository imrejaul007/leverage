import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly fromEmail: string;
  private readonly isConfigured: boolean;

  constructor(private configService: ConfigService) {
    this.fromEmail = this.configService.get<string>('EMAIL_FROM') || 'noreply@leverage.one';

    const smtpHost = this.configService.get<string>('SMTP_HOST');
    this.isConfigured = !!smtpHost;

    if (!this.isConfigured) {
      this.logger.warn('Email service not configured - emails will be logged only');
      this.logger.warn('Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS to enable email sending');
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    const { to, subject, html, text } = options;

    if (!this.isConfigured) {
      this.logger.log(`[EMAIL] To: ${to}`);
      this.logger.log(`[EMAIL] Subject: ${subject}`);
      this.logger.log(`[EMAIL] Body: ${text || 'HTML email (not logged)'}`);
      return true;
    }

    try {
      const nodemailer = await import('nodemailer');

      const transporter = nodemailer.createTransport({
        host: this.configService.get<string>('SMTP_HOST'),
        port: this.configService.get<number>('SMTP_PORT') || 587,
        secure: this.configService.get<boolean>('SMTP_SECURE') || false,
        auth: {
          user: this.configService.get<string>('SMTP_USER'),
          pass: this.configService.get<string>('SMTP_PASS'),
        },
      });

      await transporter.sendMail({
        from: this.fromEmail,
        to,
        subject,
        html,
        text,
      });

      this.logger.log(`Email sent to ${to}: ${subject}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}:`, error);
      return false;
    }
  }

  async sendOTP(email: string, otp: string): Promise<boolean> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #154230 0%, #1a5a3a 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">LEVERAGE</h1>
        </div>
        <div style="padding: 40px 30px; background: #f7f5f1;">
          <h2 style="color: #101111; margin: 0 0 20px;">Your Verification Code</h2>
          <p style="color: #4A4A4A; margin: 0 0 30px;">Enter this code to verify your email address:</p>
          <div style="background: #154230; color: white; font-size: 32px; font-weight: bold;
                      text-align: center; padding: 20px; border-radius: 12px; letter-spacing: 8px;">
            ${otp}
          </div>
          <p style="color: #4A4A4A; margin: 30px 0 0; font-size: 14px;">
            This code expires in 10 minutes. If you didn't request this, please ignore this email.
          </p>
        </div>
      </div>
    `;

    return this.sendEmail({
      to: email,
      subject: 'LEVERAGE - Your Verification Code',
      html,
      text: `Your verification code is: ${otp}. This code expires in 10 minutes.`,
    });
  }

  async sendPasswordReset(email: string, resetToken: string): Promise<boolean> {
    const resetUrl = `${this.configService.get<string>('APP_URL') || 'https://leverge.one'}/reset-password?token=${resetToken}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #154230 0%, #1a5a3a 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">LEVERAGE</h1>
        </div>
        <div style="padding: 40px 30px; background: #f7f5f1;">
          <h2 style="color: #101111; margin: 0 0 20px;">Reset Your Password</h2>
          <p style="color: #4A4A4A; margin: 0 0 30px;">
            Click the button below to reset your password. This link expires in 1 hour.
          </p>
          <a href="${resetUrl}" style="display: inline-block; background: #154230; color: white;
             padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            Reset Password
          </a>
          <p style="color: #4A4A4A; margin: 30px 0 0; font-size: 14px;">
            If you didn't request this, please ignore this email.
          </p>
        </div>
      </div>
    `;

    return this.sendEmail({
      to: email,
      subject: 'LEVERAGE - Reset Your Password',
      html,
      text: `Reset your password here: ${resetUrl}`,
    });
  }

  async sendWelcomeEmail(email: string, firstName: string): Promise<boolean> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #154230 0%, #1a5a3a 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">LEVERAGE</h1>
        </div>
        <div style="padding: 40px 30px; background: #f7f5f1;">
          <h2 style="color: #101111; margin: 0 0 20px;">Welcome to LEVERAGE, ${firstName}!</h2>
          <p style="color: #4A4A4A; margin: 0 0 30px;">
            Your account has been created successfully. Start exploring the world's most powerful
            global trade platform.
          </p>
          <a href="${this.configService.get<string>('APP_URL') || 'https://leverge.one'}/dashboard"
             style="display: inline-block; background: #154230; color: white;
             padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            Go to Dashboard
          </a>
        </div>
      </div>
    `;

    return this.sendEmail({
      to: email,
      subject: 'Welcome to LEVERAGE - Your Global Trade Platform',
      html,
      text: `Welcome ${firstName}! Your LEVERAGE account is ready. Go to your dashboard to start trading globally.`,
    });
  }
}
