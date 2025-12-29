 

export default function page() {
  return (
    <div className="w-full bg-[#062f44] max-sm:pb-[190px] overflow-auto !h-full text-white p-6 rounded-xl border border-white/10 ">
      {/* Header */}
      <h2 className="text-sm font-semibold mb-6 border-b border-white/10 pb-3">
        Profile Settings
      </h2>

      {/* Avatar Upload */}
      <div className="mb-6">
        <label className="text-xs text-slate-300 mb-2 block">Avatar:</label>
        <div className="w-64 h-32 border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 transition">
          <i className="fa fa-cloud-upload text-xl text-slate-400 mb-2" />
          <span className="text-xs text-slate-300">Upload Avatar</span>
          <input type="file" className="hidden" />
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="First Name" placeholder="Last Name" />
        <Input label="Last Name" placeholder="Last Name" />

        <Input label="Username" placeholder="Nigeria" />
        <Select label="Gender" options={['male', 'female']} />

        <Input label="Date of Birth" type="date" />
        <Input label="Email Address" placeholder="example@gmail.com" />

        <Input label="Phone" placeholder="+234" />
        <Input label="Country" placeholder="us***" />

        <Input label="City" placeholder="City" />
        <Input label="Zip" placeholder="Zip" />

        <Input label="Address" placeholder="Address" className="md:col-span-2" />
        <Input
          label="Joining Date"
          placeholder="Thu, Dec 25, 2025 5:15 PM"
          disabled
        />
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <button className="px-6 py-2 rounded-full bg-pink-600 hover:bg-pink-500 text-xs font-semibold transition">
          SAVE CHANGES
        </button>
      </div>
    </div>
  );
}

function Input({ label, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-xs text-slate-300">{label}</label>
      <input
        {...props}
        className="bg-[#041f2e] border border-white/20 rounded px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
      />
    </div>
  );
}

function Select({ label, options }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-slate-300">{label}</label>
      <select className="bg-[#041f2e] border border-white/20 rounded px-3 py-2 text-sm text-white outline-none focus:border-indigo-500">
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
