export function baseEmail({ title, username, content }) {
  return `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:30px;">
    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:8px;overflow:hidden;">
      
      <div style="background:#062f44;color:#fff;padding:20px;text-align:center;">
        <h2>${title}</h2>
      </div>

      <div style="padding:25px;color:#333;">
        <p>Hello <strong>${username}</strong>,</p>
        ${content}
        <p style="margin-top:30px;">
          Regards,<br/>
          <strong>Admin Team</strong>
        </p>
      </div>

      <div style="background:#f1f1f1;padding:15px;text-align:center;font-size:12px;color:#777;">
        © ${new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </div>
  </div>
  `;
}
