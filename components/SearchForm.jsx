"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchForm({ initialQuery = "" }) {
  const [value, setValue] = useState(initialQuery);
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(value.trim())}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search stories…"
        className="flex-1 px-4 py-3 bg-white border border-black/20 rounded-none focus:outline-none focus:border-[#F5C645] text-black text-sm transition-colors"
        autoFocus
      />
      <button
        type="submit"
        className="px-6 py-3 bg-black text-white text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-[#F5C645] hover:text-black transition-all duration-300"
      >
        Search
      </button>
    </form>
  );
}


