//
// Renders inside the article edit modal in
// app/admin/(protected)/articles/page.jsx, alongside
// ArticleScheduleCorrectionPanel, once an article has been saved at least
// once (i.e. it has an _id). Lists the article's revisionHistory (see
// models/Article.js — a snapshot is taken automatically on every
// PUT /articles/:id) and lets an editor restore an older one via
// POST /articles/:id/revisions/:revisionId/restore.

"use client";

import { useEffect, useState } from "react";
import { FiRotateCcw, FiAlertCircle, FiCheckCircle, FiClock } from "react-icons/fi";
import { articlesAdminAPI } from "@/services/adminAPI";

export default function ArticleRevisionHistoryPanel({ article, onUpdated }) {
  const [revisions, setRevisions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [restoringId, setRestoringId] = useState(null);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    articlesAdminAPI
      .getRevisions(article._id)
      .then((res) => {
        if (!cancelled) setRevisions(res.data.revisions || []);
      })
      .catch(() => {
        if (!cancelled) setErr("Failed to load revision history.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [article._id]);

  async function restore(revisionId) {
    setRestoringId(revisionId);
    setErr("");
    setMsg("");
    try {
      const res = await articlesAdminAPI.restoreRevision(article._id, revisionId);
      setMsg("Reverted to that revision. The current version was saved to history too.");
      onUpdated?.(res.data);
      const refreshed = await articlesAdminAPI.getRevisions(article._id);
      setRevisions(refreshed.data.revisions || []);
      setTimeout(() => setMsg(""), 4000);
    } catch (e) {
      setErr(e.response?.data?.message || "Failed to restore that revision.");
    } finally {
      setRestoringId(null);
    }
  }

  return (
    <div>
      <p className="text-[#F5C645] font-semibold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
        <FiClock size={14} /> Revision history
      </p>

      {loading ? (
        <p className="text-gray-500 text-xs">Loading revisions…</p>
      ) : !revisions || revisions.length === 0 ? (
        <p className="text-gray-500 text-xs">
          No earlier revisions yet — one is saved automatically every time you update this article.
        </p>
      ) : (
        <ul className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {revisions.map((rev) => (
            <li
              key={rev._id}
              className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 flex items-start justify-between gap-3"
            >
              <div className="min-w-0">
                <p className="text-gray-200 text-sm truncate">{rev.title}</p>
                <p className="text-gray-600 text-xs mt-1">
                  {new Date(rev.savedAt).toLocaleString()}
                  {rev.editedBy?.name ? ` · ${rev.editedBy.name}` : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={() => restore(rev._id)}
                disabled={restoringId === rev._id}
                className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 border border-[#F5C645]/40 text-[#F5C645] rounded-lg hover:bg-[#F5C645]/10 transition-all cursor-pointer text-xs disabled:opacity-50"
              >
                <FiRotateCcw size={12} />
                {restoringId === rev._id ? "Restoring…" : "Restore"}
              </button>
            </li>
          ))}
        </ul>
      )}

      {msg && (
        <p className="flex items-center gap-1.5 text-green-400 text-xs mt-3">
          <FiCheckCircle size={12} />
          {msg}
        </p>
      )}
      {err && (
        <p className="flex items-center gap-1.5 text-red-400 text-xs mt-3">
          <FiAlertCircle size={12} />
          {err}
        </p>
      )}
    </div>
  );
}
