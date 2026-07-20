"use client";

import { useState, useEffect } from "react";
import {
  FiCheckCircle, FiXCircle, FiStar, FiAlertCircle, FiMail, FiPhone, FiTag,
} from "react-icons/fi";
import { classifiedsAdminAPI } from "@/services/adminAPI";

const STATUS_TABS = [
  { value: "pending", label: "Pending" },
  { value: "published", label: "Published" },
  { value: "rejected", label: "Rejected" },
];

const STATUS_BADGE = {
  pending: "bg-yellow-500/20 text-yellow-400",
  published: "bg-green-500/20 text-green-400",
  rejected: "bg-red-500/20 text-red-400",
};

export default function ClassifiedsDeskPage() {
  const [status, setStatus] = useState("pending");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  useEffect(() => { fetchItems(); }, [status]);

  async function fetchItems() {
    try {
      setLoading(true);
      setError("");
      const res = await classifiedsAdminAPI.getAll(status);
      setItems(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load listings.");
    } finally {
      setLoading(false);
    }
  }

  async function moderate(id, data) {
    setBusyId(id);
    try {
      await classifiedsAdminAPI.moderate(id, data);
      setItems((prev) => prev.filter((item) => item._id !== id || status === "published"));
      // Refresh so counts/state stay accurate across tabs
      await fetchItems();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update listing.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Classifieds</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Review, approve, reject, and feature listings submitted at /classifieds/submit.
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm mb-6">
          <FiAlertCircle size={15} />{error}
        </div>
      )}

      <div className="flex gap-2 mb-6">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatus(tab.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              status === tab.value
                ? "bg-[#F5C645] text-black"
                : "border border-gray-700 text-gray-400 hover:text-white hover:border-[#F5C645]/40"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#F5C645]" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 bg-gray-900/40 rounded-2xl">
          <FiTag className="text-gray-600 text-4xl mx-auto mb-3" />
          <p className="text-gray-400 text-sm">No {status} listings.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl p-5 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-white text-lg font-semibold">{item.title}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${STATUS_BADGE[item.status]}`}>
                      {item.status}
                    </span>
                    {item.isFeatured && (
                      <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F5C645]/20 text-[#F5C645] uppercase tracking-wide">
                        <FiStar size={10} /> Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide">{item.category.replace("-", " ")}</p>
                  {item.price && <p className="text-[#F5C645] text-sm font-semibold mt-1">{item.price}</p>}
                  <p className="text-gray-400 text-sm mt-2 line-clamp-2">{item.description}</p>
                  <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5"><FiMail size={12} />{item.contactEmail}</span>
                    {item.contactPhone && <span className="flex items-center gap-1.5"><FiPhone size={12} />{item.contactPhone}</span>}
                  </div>
                </div>

                <div className="flex flex-row sm:flex-col gap-2 shrink-0">
                  {item.status !== "published" && (
                    <button
                      disabled={busyId === item._id}
                      onClick={() => moderate(item._id, { status: "published" })}
                      className="flex items-center gap-1.5 px-3 py-2 border border-green-400/30 text-green-400 rounded-lg hover:bg-green-400/10 transition-all text-xs cursor-pointer disabled:opacity-50"
                    >
                      <FiCheckCircle size={13} /> Approve
                    </button>
                  )}
                  {item.status !== "rejected" && (
                    <button
                      disabled={busyId === item._id}
                      onClick={() => moderate(item._id, { status: "rejected" })}
                      className="flex items-center gap-1.5 px-3 py-2 border border-red-400/30 text-red-400 rounded-lg hover:bg-red-400/10 transition-all text-xs cursor-pointer disabled:opacity-50"
                    >
                      <FiXCircle size={13} /> Reject
                    </button>
                  )}
                  {item.status === "published" && (
                    <button
                      disabled={busyId === item._id}
                      onClick={() => moderate(item._id, { isFeatured: !item.isFeatured })}
                      className="flex items-center gap-1.5 px-3 py-2 border border-[#F5C645]/30 text-[#F5C645] rounded-lg hover:bg-[#F5C645]/10 transition-all text-xs cursor-pointer disabled:opacity-50"
                    >
                      <FiStar size={13} /> {item.isFeatured ? "Unfeature" : "Feature"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

