export function emailLayout({ title, body, footer }) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin:0;background:#0b2537;font-family:Arial,sans-serif;color:#ffffff;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <table width="600" style="background:#062f44;border-radius:10px;padding:24px;">
              <tr>
                <td>
                  <h2 style="color:#ffffff;margin-bottom:10px;">${title}</h2>
                  ${body}
                  <hr style="border:0;border-top:1px solid rgba(255,255,255,.1);margin:24px 0;" />
                  <p style="font-size:12px;color:#b6c2cc;">
                    ${footer || "If you did not initiate this action, please contact support immediately."}
                  </p>
                </td>
              </tr>
            </table>
            <p style="font-size:11px;color:#8fa3b5;margin-top:12px;">
              © ${new Date().getFullYear()} Your Company. All rights reserved.
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}
