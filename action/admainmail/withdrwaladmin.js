import { baseEmail } from "./base";

export function withdrawalEmail({
  username,
  amount,
  method,
  wallet,
  status,
  txId,
}) {
  return baseEmail({
    title: `Withdrawal ${status}`,
    username,
    content: `
      <p>Your withdrawal request has been updated.</p>

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
          <td><b>Method:</b></td>
          <td>${method}</td>
        </tr>
        <tr>
          <td><b>Wallet Address:</b></td>
          <td>${wallet}</td>
        </tr>
        <tr>
          <td><b>Status:</b></td>
          <td style="font-weight:bold;">${status}</td>
        </tr>
      </table>

      ${
        status === "PENDING"
          ? `<p style="margin-top:15px;">
               Your withdrawal is being processed by our finance team.
             </p>`
          : status === "APPROVED"
          ? `<p style="margin-top:15px;color:green;">
               Your withdrawal has been successfully sent to your wallet.
             </p>`
          : `<p style="margin-top:15px;color:red;">
               Your withdrawal request was rejected. Please contact support.
             </p>`
      }
    `,
  });
}
