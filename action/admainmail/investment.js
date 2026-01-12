import { baseEmail } from "./base";

export function investmentEmail({
  username,
  plan,
  amount,
  profit,
  duration,
  status,
}) {
  return baseEmail({
    title: `Investment ${status}`,
    username,
    content: `
      <p>Your investment has been <strong>${status.toLowerCase()}</strong>.</p>

      <table style="width:100%;margin-top:15px;border-collapse:collapse;">
        <tr><td><b>Plan:</b></td><td>${plan}</td></tr>
        <tr><td><b>Amount:</b></td><td>$${amount}</td></tr>
        <tr><td><b>Expected Profit:</b></td><td>$${profit}</td></tr>
        <tr><td><b>Duration:</b></td><td>${duration} days</td></tr>
      </table>

      <p style="margin-top:15px;">
        Thank you for investing with us.
      </p>
    `,
  });
}
