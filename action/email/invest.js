import { emailLayout } from "./base";

export function investmentEmail({
  username,
  plan,
  amount,
  profitPercent,
  duration,
  startDate,
  endDate,
}) {
  return emailLayout({
    title: "Investment Activated",
    body: `
      <p>Hello <strong>${username}</strong>,</p>
      <p>Your investment has been successfully activated.</p>

      <table style="width:100%;font-size:14px;margin-top:16px;">
        <tr><td>Plan:</td><td><strong>${plan}</strong></td></tr>
        <tr><td>Amount:</td><td>${amount} USD</td></tr>
        <tr><td>Return:</td><td>${profitPercent}%</td></tr>
        <tr><td>Duration:</td><td>${duration} days</td></tr>
        <tr><td>Start Date:</td><td>${startDate}</td></tr>
        <tr><td>End Date:</td><td>${endDate}</td></tr>
      </table>

      <p style="margin-top:16px;">
        You can track this investment in your dashboard.
      </p>
    `,
  });
}
