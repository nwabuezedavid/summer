"use server";

import prisma from "@/action/db";
import { updateProfile } from "@/action/profile";
import { getSession } from "@/lib/session";
 import  SubmitButton  from "@/action/btnwe"

 
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();
  
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.id },
  });

  return (
    <div className="w-full bg-[#062f44] overflow-auto h-full text-white p-6 rounded-xl border border-white/10">
      <h2 className="text-sm font-semibold mb-6 border-b border-white/10 pb-3">
        Profile Settings
      </h2>

      <form action={updateProfile} className="space-y-6">

        {/* Avatar */}
        <div>
          <label className="text-xs text-slate-300 mb-2 block">
            Avatar
          </label>

          <div className="flex items-center gap-4">
            {user.avatar && (
              <Image
                src={user.avatar}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
            )}

            <label className="w-48 h-24 border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 transition">
              <i className="fa fa-cloud-upload text-xl text-slate-400 mb-1" />
              <span className="text-xs text-slate-300">
                Upload Avatar
              </span>
              <input type="file" name="avatar" className="hidden" />
            </label>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Full Name"  name="fullName" defaultValue={user.fullName ?? ""} />
          <Input label="Username"  name="username" defaultValue={user.username} />
          <Input label="Email"  name="email" defaultValue={user.email} />
          <Input label="Phone"  name="phone" defaultValue={user.phone ?? ""} />
          <Input label="Country"  name="country" defaultValue={user.country ?? ""} />
          <Input label="Address"  name="address" defaultValue={user.address ?? ""} />
        </div>

       <SubmitButton />
      </form>
    </div>
  );
}

/* ---------------- UI COMPONENT ---------------- */

function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-slate-300">{label}</label>
      <input
        {...props}
        className="bg-[#041f2e] border border-white/20 rounded px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
      />
    </div>
  );
}
