'use client';
import { useState } from 'react';

const initialNotifications = [
  {
    id: 1,
    title: 'Deposit Successful',
    message: 'Your deposit of $400 has been successfully credited.',
    time: 'Jan 12, 2025 • 09:15 AM',
    read: false,
  },
  {
    id: 2,
    title: 'Withdrawal Pending',
    message: 'Your withdrawal request is currently under review.',
    time: 'Jan 11, 2025 • 06:40 PM',
    read: false,
  },
  {
    id: 3,
    title: 'Ticket Replied',
    message: 'Support replied to your ticket: Unable to withdraw funds.',
    time: 'Jan 10, 2025 • 11:40 AM',
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-[#062f44] border border-white/10 rounded-xl p-6 text-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-3">
          <h2 className="text-sm font-semibold">Notifications</h2>

          <button
            onClick={markAllAsRead}
            className="px-4 py-1.5 rounded text-xs font-semibold bg-slate-700 hover:bg-slate-600 transition"
          >
            MARK ALL AS READ
          </button>
        </div>

        {/* List */}
        <div className="space-y-3">
          {notifications.length === 0 && (
            <p className="text-center text-slate-400 py-8">
              No notifications available
            </p>
          )}

          {notifications.map((n) => (
            <NotificationItem
              key={n.id}
              notification={n}
              onRead={() => markAsRead(n.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function NotificationItem({ notification, onRead }) {
  return (
    <div
      className={`flex gap-4 p-4 rounded-lg border transition cursor-pointer ${
        notification.read
          ? 'bg-[#041f2e] border-white/10'
          : 'bg-indigo-500/10 border-indigo-500/30'
      }`}
      onClick={onRead}
    >
      {/* Icon */}
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
          notification.read
            ? 'bg-slate-600 text-white'
            : 'bg-indigo-500 text-white'
        }`}
      >
        🔔
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-sm font-semibold">
          {notification.title}
        </p>
        <p className="text-xs text-slate-300 mt-1">
          {notification.message}
        </p>
        <p className="text-[11px] text-slate-400 mt-1">
          {notification.time}
        </p>
      </div>

      {!notification.read && (
        <span className="w-2 h-2 mt-2 rounded-full bg-indigo-500" />
      )}
    </div>
  );
}
