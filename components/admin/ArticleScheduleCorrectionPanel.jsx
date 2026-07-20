//
// Renders inside the article edit modal in
// app/admin/(protected)/articles/page.jsx, only once an article has been
// saved at least once (i.e. it has an _id + previewToken from the backend).
// Lets an editor set scheduledPublishAt / scheduledUnpublishAt (via
// PATCH /articles/:id/schedule), open the live preview link, and add
// correction notes (via POST /articles/:id/correction).

"use client";

import { useState } from "react";
import { FiClock, FiEye, FiAlertCircle, FiPlus, FiCheckCircle } from "react-icons/fi";
import { articlesAdminAPI } from "@/services/adminAPI";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://london-news-two.vercel.app";

function toLocalInputValue(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function ArticleScheduleCorrectionPanel({ article, onUpdated }) {
  const [publishAt, setPublishAt] = useState(toLocalInputValue(article.scheduledPublishAt));
  const [unpublishAt, setUnpublishAt] = useState(toLocalInputValue(article.scheduledUnpublishAt));
  const [savingSchedule, setSavingSchedule] = useState(false);
  const [scheduleMsg, setScheduleMsg] = useState("");
  const [scheduleErr, setScheduleErr] = useState("");

  const [correctionText, setCorrectionText] = useState("");
  const [savingCorrection, setSavingCorrection] = useState(false);
  const [correctionErr, setCorrectionErr] = useState("");
  const [notes, setNotes] = useState(article.correctionNotes || []);

  const previewUrl = article.previewToken ? `${SITE_URL}/preview/articles/${article.previewToken}` : null;

  async function saveSchedule() {
    setSavingSchedule(true);
    setScheduleErr("");
    setScheduleMsg("");
    try {
      const res = await articlesAdminAPI.schedule(article._id, {
        scheduledPublishAt: publishAt ? new Date(publishAt).toISOString() : null,
        scheduledUnpublishAt: unpublishAt ? new Date(unpublishAt).toISOString() : null,
      });
      setScheduleMsg("Schedule saved.");
      setTimeout(() => setScheduleMsg(""), 3000);
      onUpdated?.(res.data);
    } catch (err) {
      setScheduleErr(err.response?.data?.message || "Failed to save schedule.");
    } finally {
      setSavingSchedule(false);
    }
  }

  async function addCorrection() {
    if (!correctionText.trim()) return;
    setSavingCorrection(true);
    setCorrectionErr("");
    try {
      const res = await articlesAdminAPI.addCorrection(article._id, correctionText.trim());
      setNotes(res.data.correctionNotes || []);
      setCorrectionText("");
      onUpdated?.(res.data);
    } catch (err) {
      setCorrectionErr(err.response?.data?.message || "Failed to add correction note.");
    } finally {
      setSavingCorrection(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* ── Scheduling ── */}
      <div>
        <p className="text-[#F5C645] font-semibold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
          <FiClock size={14} /> Scheduling
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-1.5 text-sm">Schedule publish</label>
            <input
              type="datetime-local"
              value={publishAt}
              onChange={(e) => setPublishAt(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F5C645]"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1.5 text-sm">Schedule unpublish</label>
            <input
              type="datetime-local"
              value={unpublishAt}
              onChange={(e) => setUnpublishAt(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F5C645]"
            />
          </div>
        </div>
        <p className="text-gray-500 text-xs mt-2">
          Saving here only stores the date. Going live/coming down happens on the next run of the
          cron job hitting <code>/api/jobs/process-article-schedule</code>.
        </p>
        <div className="flex items-center gap-3 mt-3 flex-wrap">
          <button
            type="button"
            onClick={saveSchedule}
            disabled={savingSchedule}
            className="px-4 py-2 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 transition-all cursor-pointer font-medium text-sm disabled:opacity-50"
          >
            {savingSchedule ? "Saving…" : "Save schedule"}
          </button>
          {previewUrl ? (
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-blue-400/30 text-blue-400 rounded-lg hover:bg-blue-400/10 transition-all text-sm"
            >
              <FiEye size={14} /> Preview
            </a>
          ) : (
            <span className="text-gray-600 text-xs">
              No preview token yet — save the article once more to generate one.
            </span>
          )}
        </div>
        {scheduleMsg && (
          <p className="flex items-center gap-1.5 text-green-400 text-xs mt-2"><FiCheckCircle size={12} />{scheduleMsg}</p>
        )}
        {scheduleErr && (
          <p className="flex items-center gap-1.5 text-red-400 text-xs mt-2"><FiAlertCircle size={12} />{scheduleErr}</p>
        )}
      </div>

      {/* ── Correction notes ── */}
      <div>
        <p className="text-[#F5C645] font-semibold text-sm uppercase tracking-wider mb-3">Correction notes</p>
        {notes.length === 0 ? (
          <p className="text-gray-500 text-xs mb-3">No corrections logged for this article.</p>
        ) : (
          <ul className="space-y-2 mb-3">
            {notes.map((n) => (
              <li key={n._id || n.createdAt} className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3">
                <p className="text-gray-300 text-sm">{n.text}</p>
                <p className="text-gray-600 text-xs mt-1">{new Date(n.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            value={correctionText}
            onChange={(e) => setCorrectionText(e.target.value)}
            placeholder="Describe the correction…"
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F5C645]"
          />
          <button
            type="button"
            onClick={addCorrection}
            disabled={savingCorrection || !correctionText.trim()}
            className="flex items-center gap-2 px-4 py-2.5 border border-[#F5C645]/40 text-[#F5C645] rounded-lg hover:bg-[#F5C645]/10 transition-all cursor-pointer text-sm disabled:opacity-50"
          >
            <FiPlus size={14} /> Add
          </button>
        </div>
        {correctionErr && (
          <p className="flex items-center gap-1.5 text-red-400 text-xs mt-2"><FiAlertCircle size={12} />{correctionErr}</p>
        )}
      </div>
    </div>
  );
}

