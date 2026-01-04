import { emailLayout } from "./base";

export function withdrawalEmail({ username, amount, method, status, txId }) {
  return emailLayout({
    title: "Withdrawal Request Update",
    body: `
      <p>Hello <strong>${username}</strong>,</p>
      <p>Your withdrawal request has been <strong>${status}</strong>.</p>

      <table style="width:100%;font-size:14px;margin-top:16px;">
        <tr><td>Amount:</td><td><strong>${amount} USD</strong></td></tr>
        <tr><td>Method:</td><td>${method}</td></tr>
        <tr><td>Transaction ID:</td><td>${txId}</td></tr>
        <tr><td>Status:</td><td><strong>${status}</strong></td></tr>
      </table>

      <p style="margin-top:16px;">
        Please allow processing time depending on your selected network.
      </p>
    `,
  });
}
