import NotificationList from "@/action/not";

 

 

export default function NotificationsPage() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-[#062f44] border border-white/10 rounded-xl p-6 text-white">
        <NotificationList />
      </div>
    </div>
  );
}
