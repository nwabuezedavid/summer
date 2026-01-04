"use client";

import { useEffect, useState } from "react";
import { getNotifications, markAllNotificationsRead, markNotificationRead } from "./notifications";

 
export default function NotificationList() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getNotifications();
    console.log(data);
    
    setNotifications(data);
  }

  async function markOne(id) {
    await markNotificationRead(id);
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      )
    );
  }

  async function markAll() {
    await markAllNotificationsRead();
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true }))
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold">Notifications</h2>

        <button
          onClick={markAll}
          className="px-4 py-1.5 rounded text-xs bg-slate-700 hover:bg-slate-600"
        >
          MARK ALL AS READ
        </button>
      </div>

      {notifications.length === 0 && (
        <p className="text-center text-slate-400 py-8">
          No notifications available
        </p>
      )}

      {notifications.map((n) => (
        <NotificationItem
          key={n.id}
          notification={n}
          onRead={() => markOne(n.id)}
        />
      ))}
    </div>
  );
}


function NotificationItem({ notification, onRead }) {
  return (
    <div
      onClick={onRead}
      className={`flex gap-4 p-4 rounded-lg border cursor-pointer transition ${
        notification.isRead
          ? "bg-[#041f2e] border-white/10"
          : "bg-indigo-500/10 border-indigo-500/30"
      }`}
    >
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm ${
          notification.isRead
            ? "bg-slate-600"
            : "bg-indigo-500"
        }`}
      >
        🔔
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold">
          {notification.title}
        </p>
        <p className="text-xs text-slate-300 mt-1">
          {notification.message}
        </p>
        <p className="text-[11px] text-slate-400 mt-1">
          {new Date(notification.createdAt).toLocaleString()}
        </p>
      </div>

      {!notification.isRead && (
        <span className="w-2 h-2 mt-2 rounded-full bg-indigo-500" />
      )}
    </div>
  );
}
