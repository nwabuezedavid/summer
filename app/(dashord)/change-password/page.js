"use client";

import { changePassword } from "@/action/tablelog";
import { useState } from "react";
 

export default function ChangePasswordPage() {
  const [message, setMessage] = useState(null);

  async function onSubmit(formData) {
    const res = await changePassword(formData);
    setMessage(res);
  }

  return (
    <div className="max-w-xl mx-auto bg-[#062f44] border border-white/10 rounded-xl p-6 text-white">
      <h2 className="text-sm font-semibold mb-6 border-b border-white/10 pb-3">
        Change Password
      </h2>

      {message?.error && (
        <Alert type="error" text={message.error} />
      )}

      {message?.success && (
        <Alert type="success" text={message.success} />
      )}

      <form action={onSubmit} className="space-y-4">
        <Input
          label="Current Password"
          name="currentPassword"
          type="password"
        />

        <Input
          label="New Password"
          name="newPassword"
          type="password"
        />

        <Input
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
        />

        <button
          type="submit"
          className="mt-4 px-8 py-3 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-600 to-orange-500 hover:opacity-90 transition"
        >
          UPDATE PASSWORD →
        </button>
      </form>
    </div>
  );
}

/* ---------------- UI HELPERS ---------------- */

function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-slate-300">{label}</label>
      <input
        {...props}
        required
        className="bg-[#041f2e] border border-white/20 rounded px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
      />
    </div>
  );
}

function Alert({ type, text }) {
  return (
    <div
      className={`mb-4 px-4 py-3 rounded text-xs border ${
        type === "success"
          ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
          : "bg-red-500/10 border-red-500 text-red-400"
      }`}
    >
      {text}
    </div>
  );
}
