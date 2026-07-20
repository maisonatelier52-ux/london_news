"use client";

import { useState, useEffect } from "react";
import {
  FiPlus, FiEdit2, FiTrash2, FiAlertCircle,
  FiCheckCircle, FiLayout, FiClock,
} from "react-icons/fi";
import { homepageAdminAPI } from "@/services/adminAPI";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import Link from "next/link";

const STATUS_BADGE = {
  draft: "bg-gray-500/20 text-gray-400",
  published: "bg-green-500/20 text-green-400",
  scheduled: "bg-blue-500/20 text-blue-400",
};

export default function HomepageListPage() {
  const [homepages, setHomepages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [confirm, setConfirm] = useState({ open: false, id: null, title: "" });

  useEffect(() => { fetchHomepages(); }, []);

  async function fetchHomepages() {
    try {
      setLoading(true);
      const res = await homepageAdminAPI.getAll();
      setHomepages(res.data);
    } catch {
      setError("Failed to load homepages.");
    } finally {
      setLoading(false);
    }
  }

  async function createHomepage() {
    if (!newTitle.trim()) {
      setError("Homepage title is required.");
      return;
    }

    setCreating(true);
    setError("");
    try {
      const res = await homepageAdminAPI.create({
        title: newTitle.trim(),
        slug: newTitle.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      });
      setHomepages(prev => [res.data, ...prev]);
      setNewTitle("");
      setSuccess("Homepage created! Click Edit to configure it.");
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create homepage.");
    } finally {
      setCreating(false);
    }
  }

  async function activateHomepage(id) {
    setError("");
    try {
      await homepageAdminAPI.activate(id);
      await fetchHomepages();
      setSuccess("Homepage activated and set as live!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to activate.");
    }
  }

  async function deleteHomepage(id) {
    try {
      await homepageAdminAPI.delete(id);
      setHomepages(prev => prev.filter(h => h._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete.");
    } finally {
      setConfirm({ open: false, id: null, title: "" });
    }
  }

  // Group by slug so version history reads as one card per "site", not one
  // card per historical row.
  const grouped = homepages.reduce((acc, hp) => {
    const key = hp.slug || hp._id;
    acc[key] = acc[key] || [];
    acc[key].push(hp);
    return acc;
  }, {});

  return (
    <div>
      <ConfirmDialog
        isOpen={confirm.open}
        title="Delete Homepage"
        message={`Delete "${confirm.title}"? This cannot be undone.`}
        onConfirm={() => deleteHomepage(confirm.id)}
        onCancel={() => setConfirm({ open: false, id: null, title: "" })}
        confirmText="Delete"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Homepage Manager</h1>
          <p className="text-gray-400 mt-1 text-sm">Create, version, and schedule homepage layouts. Only one homepage can be live across the whole site at a time.</p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm mb-6">
          <FiAlertCircle size={15} />{error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg text-sm mb-6">
          <FiCheckCircle size={15} />{success}
        </div>
      )}

      <div className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl p-6 mb-8">
        <h2 className="text-white font-semibold mb-4 flex items-center gap-2"><FiPlus className="text-[#F5C645]" /> Create New Homepage</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => e.key === "Enter" && createHomepage()}
            placeholder="Homepage title (e.g. Main Homepage, Summer Edition...)"
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors"
          />
          <button
            onClick={createHomepage}
            disabled={creating || !newTitle.trim()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 transition-all cursor-pointer font-medium text-sm disabled:opacity-50">
            <FiPlus size={16} />{creating ? "Creating..." : "Create"}
          </button>
        </div>
        <p className="text-gray-500 text-xs mt-2">
          Reusing an existing title's slug creates a new draft <em>version</em> in that slug's history instead of a disconnected duplicate.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#F5C645]" /></div>
      ) : homepages.length === 0 ? (
        <div className="text-center py-16 bg-gray-900/40 rounded-2xl">
          <FiLayout className="text-gray-600 text-4xl mx-auto mb-3" />
          <p className="text-gray-400 text-sm">No homepages yet. Create one above.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([slug, versions]) => (
            <div key={slug}>
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-3">/{slug} · {versions.length} version{versions.length === 1 ? "" : "s"}</p>
              <div className="space-y-4">
                {versions.sort((a, b) => (b.version || 1) - (a.version || 1)).map(hp => (
                  <div key={hp._id} className={`bg-gradient-to-br from-gray-900 to-black border rounded-2xl p-5 sm:p-6 transition-all ${hp.isActive ? "border-[#F5C645]/50" : "border-[#F5C645]/20 hover:border-[#F5C645]/30"}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-white text-lg font-semibold">{hp.title}</h3>
                          <span className="text-gray-500 text-xs">v{hp.version || 1}</span>
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${STATUS_BADGE[hp.status || "draft"]}`}>
                            {hp.status || "draft"}
                          </span>
                          {hp.isActive && (
                            <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-green-500/20 text-green-400">
                              <FiCheckCircle size={11} /> LIVE
                            </span>
                          )}
                        </div>
                        {hp.status === "scheduled" && hp.scheduledPublishAt && (
                          <p className="flex items-center gap-1.5 text-blue-400 text-xs mt-1.5">
                            <FiClock size={12} /> Publishes {new Date(hp.scheduledPublishAt).toLocaleString()}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-600">
                          <span>{hp.sections?.length || 0} sections</span>
                          <span>Updated {new Date(hp.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/admin/homepage/${hp._id}`}
                          className="flex items-center gap-2 px-4 py-2 border border-blue-400/30 text-blue-400 rounded-lg hover:bg-blue-400/10 transition-all text-sm"
                        >
                          <FiEdit2 size={14} /> Edit Layout
                        </Link>
                        {!hp.isActive ? (
                          <>
                            <button
                              onClick={() => activateHomepage(hp._id)}
                              className="flex items-center gap-2 px-4 py-2 border border-green-400/30 text-green-400 rounded-lg hover:bg-green-400/10 transition-all text-sm cursor-pointer"
                            >
                              <FiCheckCircle size={14} /> Publish Now
                            </button>
                            <button
                              onClick={() => setConfirm({ open: true, id: hp._id, title: hp.title })}
                              className="flex items-center gap-1.5 px-3 py-2 border border-red-400/30 text-red-400 rounded-lg hover:bg-red-400/10 transition-all text-sm cursor-pointer"
                            >
                              <FiTrash2 size={14} />
                            </button>
                          </>
                        ) : (
                          // Still shown even though this row is already live — re-running
                          // /activate is harmless (idempotent) and is the way out if the
                          // data ever ends up with more than one row marked live at once.
                          <button
                            onClick={() => activateHomepage(hp._id)}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-500/10 hover:text-gray-300 transition-all text-sm cursor-pointer"
                            title="Re-confirms this as the only live homepage, deactivating any others."
                          >
                            <FiCheckCircle size={14} /> Re-publish
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

