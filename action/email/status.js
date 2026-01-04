import { emailLayout } from "./base";

export function statusEmail({ username, title, message }) {
  return emailLayout({
    title,
    body: `
      <p>Hello <strong>${username}</strong>,</p>
      <p>${message}</p>
    `,
  });
}
