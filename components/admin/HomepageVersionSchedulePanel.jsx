//
// Drop-in panel for the homepage editor (app/admin/(protected)/homepage/[id]/page.jsx).
// Covers task 5.6: version history list with restore, a Schedule publish
// control, and a Preview link (using the homepage's previewToken).
//
// USAGE — inside your existing homepage detail page, once `homepage` (the
// current doc from GET /api/admin-homepage/:id) is loaded:
//
//   import HomepageVersionSchedulePanel from "@/components/admin/HomepageVersionSchedulePanel";
//   ...
//   <HomepageVersionSchedulePanel
//     homepage={homepage}
//     onRestored={() => fetchHomepage()}   // re-fetch after a restore/schedule
//   />

"use client";

import { useState, useEffect } from "react";
import {
  FiClock, FiEye, FiRotateCcw, FiAlertCircle, FiCheckCircle, FiLayers,
} from "react-icons/fi";
import { homepageAdminAPI } from "@/services/adminAPI";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://london-news-two.vercel.app";

function toLocalInputValue(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const STATUS_BADGE = {
  draft: "bg-gray-500/20 text-gray-400",
  published: "bg-green-500/20 text-green-400",
  scheduled: "bg-blue-500/20 text-blue-400",
};

export default function HomepageVersionSchedulePanel({ homepage, onRestored }) {
  const [versions, setVersions] = useState([]);
  const [loadingVersions, setLoadingVersions] = useState(true);
  const [publishAt, setPublishAt] = useState(toLocalInputValue(homepage.scheduledPublishAt));
  const [savingSchedule, setSavingSchedule] = useState(false);
  const [scheduleMsg, setScheduleMsg] = useState("");
  const [error, setError] = useState("");
  const [restoringId, setRestoringId] = useState(null);

  useEffect(() => { fetchVersions(); }, [homepage.slug]);

  async function fetchVersions() {
    try {
      setLoadingVersions(true);
      const res = await homepageAdminAPI.getVersions(homepage.slug);
      setVersions(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load version history.");
    } finally {
      setLoadingVersions(false);
    }
  }

  async function saveSchedule() {
    if (!publishAt) {
      setError("Pick a date/time to schedule.");
      return;
    }
    setSavingSchedule(true);
    setError("");
    try {
      await homepageAdminAPI.schedule(homepage._id, new Date(publishAt).toISOString());
      setScheduleMsg("Scheduled.");
      setTimeout(() => setScheduleMsg(""), 3000);
      await fetchVersions();
      onRestored?.();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to schedule.");
    } finally {
      setSavingSchedule(false);
    }
  }

  async function restore(id) {
    setRestoringId(id);
    setError("");
    try {
      await homepageAdminAPI.restore(id);
      await fetchVersions();
      onRestored?.();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to restore version.");
    } finally {
      setRestoringId(null);
    }
  }

  const previewUrl = homepage.previewToken ? `${SITE_URL}/preview/homepage/${homepage.previewToken}` : null;

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
          <FiAlertCircle size={15} />{error}
        </div>
      )}

      {/* ── Schedule publish ── */}
      <div>
        <p className="text-[#F5C645] font-semibold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
          <FiClock size={14} /> Schedule publish
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="datetime-local"
            value={publishAt}
            onChange={(e) => setPublishAt(e.target.value)}
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F5C645]"
          />
          <button
            type="button"
            onClick={saveSchedule}
            disabled={savingSchedule}
            className="px-5 py-2.5 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 transition-all cursor-pointer font-medium text-sm disabled:opacity-50"
          >
            {savingSchedule ? "Scheduling…" : "Schedule"}
          </button>
          {previewUrl && (
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-2.5 border border-blue-400/30 text-blue-400 rounded-lg hover:bg-blue-400/10 transition-all text-sm"
            >
              <FiEye size={14} /> Preview
            </a>
          )}
        </div>
        {scheduleMsg && (
          <p className="flex items-center gap-1.5 text-green-400 text-xs mt-2"><FiCheckCircle size={12} />{scheduleMsg}</p>
        )}
      </div>

      {/* ── Version history ── */}
      <div>
        <p className="text-[#F5C645] font-semibold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
          <FiLayers size={14} /> Version history
        </p>
        {loadingVersions ? (
          <div className="flex justify-center py-6"><div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#F5C645]" /></div>
        ) : versions.length === 0 ? (
          <p className="text-gray-500 text-xs">No other versions yet.</p>
        ) : (
          <ul className="space-y-2">
            {versions.map((v) => (
              <li
                key={v._id}
                className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg border ${
                  v._id === homepage._id ? "border-[#F5C645]/50 bg-[#F5C645]/5" : "border-gray-800 bg-gray-900"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-medium">v{v.version}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${STATUS_BADGE[v.status || "draft"]}`}>
                      {v.status || "draft"}
                    </span>
                    {v.isActive && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">LIVE</span>}
                  </div>
                  <p className="text-gray-500 text-xs mt-1">Updated {new Date(v.updatedAt).toLocaleString()}</p>
                </div>
                {!v.isActive && (
                  <button
                    type="button"
                    onClick={() => restore(v._id)}
                    disabled={restoringId === v._id}
                    className="flex items-center gap-1.5 px-3 py-2 border border-green-400/30 text-green-400 rounded-lg hover:bg-green-400/10 transition-all text-xs cursor-pointer disabled:opacity-50 shrink-0"
                  >
                    <FiRotateCcw size={12} /> {restoringId === v._id ? "Restoring…" : "Restore"}
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

