"use client";

import { useState, useEffect } from "react";
import {
  FiMail, FiMessageSquare, FiTag, FiAlertCircle, FiArchive, FiEye,
} from "react-icons/fi";
import { audienceAdminAPI } from "@/services/adminAPI";

const TABS = [
  { value: "newsletter", label: "Newsletter Signups", icon: FiMail },
  { value: "contact", label: "Contact Submissions", icon: FiMessageSquare },
  { value: "classifieds", label: "Classifieds Enquiries", icon: FiTag },
];

const PAGE_SIZE = 20;

export default function AudienceDeskPage() {
  const [tab, setTab] = useState("newsletter");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { setPage(1); }, [tab]);
  useEffect(() => { fetchItems(); }, [tab, page]);

  async function fetchItems() {
    try {
      setLoading(true);
      setError("");
      const params = { page, limit: PAGE_SIZE };
      let res;
      if (tab === "newsletter") res = await audienceAdminAPI.getNewsletter(params);
      else if (tab === "contact") res = await audienceAdminAPI.getContact(params);
      else res = await audienceAdminAPI.getClassifiedsEnquiries(params);

      setItems(res.data.items || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load audience data.");
    } finally {
      setLoading(false);
    }
  }

  async function updateContactStatus(id, status) {
    try {
      await audienceAdminAPI.updateContactStatus(id, status);
      setItems((prev) => prev.map((c) => (c._id === id ? { ...c, status } : c)));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status.");
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Audience</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Newsletter signups, contact form messages, and classifieds enquiries in one place.
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm mb-6">
          <FiAlertCircle size={15} />{error}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                tab === t.value
                  ? "bg-[#F5C645] text-black"
                  : "border border-gray-700 text-gray-400 hover:text-white hover:border-[#F5C645]/40"
              }`}
            >
              <Icon size={14} /> {t.label}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#F5C645]" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 bg-gray-900/40 rounded-2xl">
          <p className="text-gray-400 text-sm">Nothing here yet.</p>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl overflow-hidden">
          {tab === "newsletter" && (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-gray-500 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3">Email</th>
                  <th className="text-left px-5 py-3">Source</th>
                  <th className="text-left px-5 py-3">Subscribed</th>
                </tr>
              </thead>
              <tbody>
                {items.map((s) => (
                  <tr key={s._id} className="border-b border-gray-900 last:border-0">
                    <td className="px-5 py-3 text-white">{s.email}</td>
                    <td className="px-5 py-3 text-gray-400">{s.source}</td>
                    <td className="px-5 py-3 text-gray-500">{new Date(s.subscribedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === "contact" && (
            <div className="divide-y divide-gray-900">
              {items.map((c) => (
                <div key={c._id} className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-white font-medium">{c.name}</span>
                      <span className="text-gray-500 text-xs">{c.email}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${
                        c.status === "new" ? "bg-yellow-500/20 text-yellow-400"
                          : c.status === "read" ? "bg-blue-500/20 text-blue-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}>
                        {c.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{c.message}</p>
                    <p className="text-gray-600 text-xs mt-2">{new Date(c.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {c.status !== "read" && (
                      <button
                        onClick={() => updateContactStatus(c._id, "read")}
                        className="flex items-center gap-1.5 px-3 py-2 border border-blue-400/30 text-blue-400 rounded-lg hover:bg-blue-400/10 transition-all text-xs cursor-pointer"
                      >
                        <FiEye size={13} /> Mark read
                      </button>
                    )}
                    {c.status !== "archived" && (
                      <button
                        onClick={() => updateContactStatus(c._id, "archived")}
                        className="flex items-center gap-1.5 px-3 py-2 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-800 transition-all text-xs cursor-pointer"
                      >
                        <FiArchive size={13} /> Archive
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "classifieds" && (
            <div className="divide-y divide-gray-900">
              {items.map((e) => (
                <div key={e._id} className="p-5">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-white font-medium">{e.name}</span>
                    <span className="text-gray-500 text-xs">{e.email}</span>
                    <span className="text-gray-500 text-xs">re: {e.classifiedId?.title || "listing"}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">{e.message}</p>
                  <p className="text-gray-600 text-xs mt-2">{new Date(e.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 border border-gray-700 text-gray-400 rounded-lg text-sm disabled:opacity-40 cursor-pointer"
          >
            Previous
          </button>
          <span className="text-gray-500 text-sm">Page {page} of {totalPages}</span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border border-gray-700 text-gray-400 rounded-lg text-sm disabled:opacity-40 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

