"use server";

import prisma from "@/action/db";
import { getSession } from "@/lib/session";

export async function getNotifications() {
  const session = await getSession();
  if (!session) return [];

  const notifications = await prisma.notification.findMany({
    where: { userId: session.id },
    orderBy: { createdAt: "desc" },
  });

  // ✅ serialize Date
  return notifications.map((n) => ({
    ...n,
    createdAt: n.createdAt.toISOString(),
  }));
}

export async function markNotificationRead(id) {
  const session = await getSession();
  if (!session) return;

  await prisma.notification.update({
    where: { id },
    data: { isRead: true },
  });
}

export async function markAllNotificationsRead() {
  const session = await getSession();
  if (!session) return;

  await prisma.notification.updateMany({
    where: { userId: session.id, isRead: false },
    data: { isRead: true },
  });
}
