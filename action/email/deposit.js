import { emailLayout } from "./base";

export function depositEmail({ username, amount, method, status, txId }) {
  return emailLayout({
    title: "Deposit Notification",
    body: `
      <p>Hello <strong>${username}</strong>,</p>
      <p>Your deposit request has been <strong>${status}</strong>.</p>

      <table style="width:100%;font-size:14px;margin-top:16px;">
        <tr><td>Amount:</td><td><strong>${amount} USD</strong></td></tr>
        <tr><td>Method:</td><td>${method}</td></tr>
        <tr><td>Transaction ID:</td><td>${txId || 'TX93829'}</td></tr>
        <tr><td>Status:</td><td><strong>${status}</strong></td></tr>
      </table>

      <p style="margin-top:16px;">
        Funds will reflect in your wallet once approved.
      </p>
    `,
  });
}
