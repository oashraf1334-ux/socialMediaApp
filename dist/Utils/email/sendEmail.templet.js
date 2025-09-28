"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmEmailTemplet = void 0;
const confirmEmailTemplet = (code, username) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Email Verification</title>
</head>
<body style="margin:0;padding:0;background:#f2f6fa;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 18px rgba(11,87,208,0.12);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(90deg,#0b57d0,#4f8cff);padding:20px;text-align:center;color:#fff;">
              <h1 style="margin:0;font-size:20px;font-weight:700;">Confirm your email</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 32px;text-align:center;color:#222;">
              <p style="margin:0 0 18px;font-size:15px;">
                Hello <strong>{${username}}</strong>, here is your password (OTP):
              </p>

              <!-- OTP Box -->
              <div style="display:inline-block;padding:14px 24px;border-radius:10px;background:linear-gradient(180deg,#f8fafc,#eef4ff);box-shadow:0 4px 10px rgba(11,87,208,0.08);margin:12px 0;">
                <span style="font-size:28px;letter-spacing:6px;font-weight:800;color:#0b57d0;">{${code}}</span>
              </div>

              <p style="margin:6px 0 0;font-size:13px;color:#999;">
                If you didn’t request this code, please ignore this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
exports.confirmEmailTemplet = confirmEmailTemplet;
