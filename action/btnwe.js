'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-6 py-2 rounded-full text-xs font-semibold transition flex items-center justify-center gap-2
        ${
          pending
            ? 'bg-slate-600 cursor-not-allowed'
            : 'bg-pink-600 hover:bg-pink-500'
        }`}
    >
      {pending && (
        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      )}

      {pending ? 'Saving...' : 'SAVE CHANGES'}
    </button>
  );
}
