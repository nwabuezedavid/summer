import { baseEmail } from "./base";

export function transactionEmail({
  username,
  type,
  amount,
  status,
  method,
  txId,
}) {
  return baseEmail({
    title: `${type} ${status}`,
    username,
    content: `
      <p>Your <strong>${type.toLowerCase()}</strong> transaction has been updated.</p>

      <table style="width:100%;margin-top:15px;border-collapse:collapse;">
        <tr><td><b>Transaction ID:</b></td><td>${txId}</td></tr>
        <tr><td><b>Amount:</b></td><td>$${amount}</td></tr>
        <tr><td><b>Method:</b></td><td>${method}</td></tr>
        <tr><td><b>Status:</b></td><td>${status}</td></tr>
      </table>

      <p style="margin-top:15px;">
        If you did not initiate this action, please contact support immediately.
      </p>
    `,
  });
}
