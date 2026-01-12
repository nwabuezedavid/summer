import { baseEmail } from "./base";

export function depositEmail({
  username,
  amount,
  method,
  status,
  txId,
}) {
  return baseEmail({
    title: `Deposit ${status}`,
    username,
    content: `
      <p>Your deposit request has been updated.</p>

      <table style="width:100%;margin-top:15px;border-collapse:collapse;">
        <tr>
          <td><b>Transaction ID:</b></td>
          <td>${txId}</td>
        </tr>
        <tr>
          <td><b>Amount:</b></td>
          <td>$${amount}</td>
        </tr>
        <tr>
          <td><b>Payment Method:</b></td>
          <td>${method}</td>
        </tr>
        <tr>
          <td><b>Status:</b></td>
          <td style="font-weight:bold;">${status}</td>
        </tr>
      </table>

      ${
        status === "PENDING"
          ? `<p style="margin-top:15px;">
               Your deposit is currently under review and will be credited once confirmed.
             </p>`
          : status === "APPROVED"
          ? `<p style="margin-top:15px;color:green;">
               Your deposit has been successfully credited to your account.
             </p>`
          : `<p style="margin-top:15px;color:red;">
               Your deposit was rejected. Please contact support for more details.
             </p>`
      }
    `,
  });
}
