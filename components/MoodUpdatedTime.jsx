// components/MoodUpdatedTime.jsx

"use client";

import { useEffect, useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function MoodUpdatedTime({
  title = "London’s Mood Right Now",
  className = "",
}) {
  const [updatedAt, setUpdatedAt] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/public/mood`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.updatedAt) {
          setUpdatedAt(data.updatedAt);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={className}>
      <p className="text-[13px] sm:text-[15px] font-bold uppercase text-black whitespace-nowrap">
        {title}
      </p>

      <p className="text-[11px] sm:text-[12px] font-normal uppercase text-gray-700 mt-1">
        {updatedAt || "Loading..."}
      </p>
    </div>
  );
}