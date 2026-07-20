
// app/admin/mood-survey/page.jsx
"use client";

import { useState, useEffect } from "react";
import {
  FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiAlertCircle,
  FiSmile, FiRefreshCw, FiBarChart2,
} from "react-icons/fi";
import { moodSurveyAdminAPI } from "@/services/adminAPI";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

const DEFAULT_OPTIONS = [
  { key: "happy", label: "Happy", votes: 0 },
  { key: "sad", label: "Sad", votes: 0 },
  { key: "okay", label: "Can't complain", votes: 0 },
];

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

export default function MoodSurveyPage() {
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [confirm, setConfirm] = useState({ open: false, key: null });
  const [optionError, setOptionError] = useState("");

  const [headline, setHeadline] = useState("London is okay right now");
  const [updatedText, setUpdatedText] = useState("Updated 32 minutes ago");
  const [surveyTitle, setSurveyTitle] = useState("London's Mood Right Now");
  const [surveyButtonLabel, setSurveyButtonLabel] = useState("Take Part in Our Daily Survey");
  const [surveySuccessText, setSurveySuccessText] = useState("Thanks for sharing your mood!");
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [newOptionLabel, setNewOptionLabel] = useState("");
  const [touched, setTouched] = useState({
    headline: false,
    updatedText: false,
    surveyTitle: false,
    surveyButtonLabel: false,
    surveySuccessText: false,
  });

  useEffect(() => {
    loadSurvey();
  }, []);

  async function loadSurvey() {
    try {
      setLoading(true);
      const res = await moodSurveyAdminAPI.getToday();
      const s = res.data;
      setSurvey(s);
      setHeadline(s.headline || "");
      setUpdatedText(s.updatedText || "");
      setSurveyTitle(s.surveyTitle || "");
      setSurveyButtonLabel(s.surveyButtonLabel || "");
      setSurveySuccessText(s.surveySuccessText || "");
      setOptions(s.options || DEFAULT_OPTIONS);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const validate = () => {
    const errors = {};
    if (!headline.trim()) errors.headline = "Mood headline is required";
    if (!updatedText.trim()) errors.updatedText = "Updated text is required";
    if (!surveyTitle.trim()) errors.surveyTitle = "Survey title is required";
    if (!surveyButtonLabel.trim()) errors.surveyButtonLabel = "Survey button label is required";
    if (!surveySuccessText.trim()) errors.surveySuccessText = "Success message is required";
    if (options.length < 2) errors.options = "At least 2 survey options are required";
    return errors;
  };

  async function handleSave() {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setError(Object.values(errors)[0]);
      setTouched({
        headline: true,
        updatedText: true,
        surveyTitle: true,
        surveyButtonLabel: true,
        surveySuccessText: true,
      });
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await moodSurveyAdminAPI.create({
        date: todayStr(),
        headline: headline.trim(),
        updatedText: updatedText.trim(),
        surveyTitle: surveyTitle.trim(),
        surveyButtonLabel: surveyButtonLabel.trim(),
        surveySuccessText: surveySuccessText.trim(),
        options: options.map(o => ({
          key: o.key || o.label.toLowerCase().replace(/\s+/g, "_"),
          label: o.label.trim(),
          votes: o.votes || 0,
        })),
      });
      setSurvey(res.data);
      setSuccess("Mood survey saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save survey.");
    } finally {
      setSaving(false);
    }
  }

  function addOption() {
    setOptionError("");
    const trimmedLabel = newOptionLabel.trim();
    if (!trimmedLabel) {
      setOptionError("Option label is required");
      return;
    }
    const isDuplicate = options.some(opt =>
      opt.label.toLowerCase() === trimmedLabel.toLowerCase() ||
      opt.key === trimmedLabel.toLowerCase().replace(/\s+/g, "_")
    );
    if (isDuplicate) {
      setOptionError(`Option "${trimmedLabel}" already exists`);
      return;
    }
    setOptions([
      ...options,
      { key: trimmedLabel.toLowerCase().replace(/\s+/g, "_"), label: trimmedLabel, votes: 0 },
    ]);
    setNewOptionLabel("");
    if (options.length >= 1) setError("");
  }

  function removeOption(key) {
    setOptions(options.filter(o => o.key !== key));
    setConfirm({ open: false, key: null });
    if (options.length <= 2) setError("At least 2 survey options are required");
    else setError("");
  }

  function updateOptionLabel(key, newLabel) {
    const trimmedLabel = newLabel.trim();
    if (!trimmedLabel) return;
    const isDuplicate = options.some(o =>
      o.key !== key &&
      (o.label.toLowerCase() === trimmedLabel.toLowerCase() ||
        o.key === trimmedLabel.toLowerCase().replace(/\s+/g, "_"))
    );
    if (isDuplicate) {
      setOptionError(`Option "${trimmedLabel}" already exists`);
      return;
    }
    setOptions(options.map(o =>
      o.key === key ? { ...o, label: trimmedLabel, key: trimmedLabel.toLowerCase().replace(/\s+/g, "_") } : o
    ));
    setOptionError("");
  }

  const handleFieldBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const totalVotes = options.reduce((sum, o) => sum + (o.votes || 0), 0);
  const validationErrors = touched ? validate() : {};

  const inp = "w-full bg-gray-900 border rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#F5C645]" />
      </div>
    );
  }

  return (
    <div>
      <ConfirmDialog
        isOpen={confirm.open}
        title="Remove Option"
        message={`Remove the "${options.find(o => o.key === confirm.key)?.label}" option?`}
        onConfirm={() => removeOption(confirm.key)}
        onCancel={() => setConfirm({ open: false, key: null })}
        confirmText="Remove"
      />

      {/* Header — FIX: title and buttons each take full width on mobile */}
      <div className="flex flex-col gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Mood Survey</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Control today's mood survey shown on the homepage, category, and article pages.
          </p>
        </div>
        {/* FIX: buttons stretch full-width on mobile */}
        <div className="flex flex-col xs:flex-row sm:flex-row gap-2">
          <button
            onClick={loadSurvey}
            className="flex items-center justify-center gap-2 px-3 py-2.5 border border-gray-700 text-gray-400 rounded-lg hover:text-white hover:border-gray-500 transition-all cursor-pointer text-sm w-full sm:w-auto"
          >
            <FiRefreshCw size={14} /> Refresh
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 transition-all cursor-pointer font-medium text-sm disabled:opacity-50 w-full sm:w-auto"
          >
            <FiSave size={16} />
            {saving ? "Saving..." : "Save Survey"}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm mb-6">
          <FiAlertCircle size={15} />{error}
        </div>
      )}
      {success && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg text-sm mb-6">
          {success}
        </div>
      )}

      {/* FIX: single column on mobile, two columns on lg+ */}
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Main form */}
        <div className="space-y-6">
          {/* Text settings */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl p-5 sm:p-6">
            <h2 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
              <FiSmile className="text-[#F5C645]" /> Display Text
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1.5 text-sm">
                  Mood Headline <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={e => setHeadline(e.target.value)}
                  onBlur={() => handleFieldBlur("headline")}
                  className={`${inp} ${validationErrors.headline && touched.headline ? "border-red-500" : "border-gray-700"}`}
                  placeholder="London is okay right now"
                />
                {validationErrors.headline && touched.headline && (
                  <p className="text-red-400 text-xs mt-1">{validationErrors.headline}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">Shown as a big heading on the homepage</p>
              </div>

              <div>
                <label className="block text-gray-300 mb-1.5 text-sm">
                  Updated Text <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={updatedText}
                  onChange={e => setUpdatedText(e.target.value)}
                  onBlur={() => handleFieldBlur("updatedText")}
                  className={`${inp} ${validationErrors.updatedText && touched.updatedText ? "border-red-500" : "border-gray-700"}`}
                  placeholder="Updated 32 minutes ago"
                />
                {validationErrors.updatedText && touched.updatedText && (
                  <p className="text-red-400 text-xs mt-1">{validationErrors.updatedText}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-1.5 text-sm">
                  Survey Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={surveyTitle}
                  onChange={e => setSurveyTitle(e.target.value)}
                  onBlur={() => handleFieldBlur("surveyTitle")}
                  className={`${inp} ${validationErrors.surveyTitle && touched.surveyTitle ? "border-red-500" : "border-gray-700"}`}
                  placeholder="London's Mood Right Now"
                />
                {validationErrors.surveyTitle && touched.surveyTitle && (
                  <p className="text-red-400 text-xs mt-1">{validationErrors.surveyTitle}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-1.5 text-sm">
                  Survey Button Label <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={surveyButtonLabel}
                  onChange={e => setSurveyButtonLabel(e.target.value)}
                  onBlur={() => handleFieldBlur("surveyButtonLabel")}
                  className={`${inp} ${validationErrors.surveyButtonLabel && touched.surveyButtonLabel ? "border-red-500" : "border-gray-700"}`}
                  placeholder="Take Part in Our Daily Survey"
                />
                {validationErrors.surveyButtonLabel && touched.surveyButtonLabel && (
                  <p className="text-red-400 text-xs mt-1">{validationErrors.surveyButtonLabel}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-1.5 text-sm">
                  Success Message <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={surveySuccessText}
                  onChange={e => setSurveySuccessText(e.target.value)}
                  onBlur={() => handleFieldBlur("surveySuccessText")}
                  className={`${inp} ${validationErrors.surveySuccessText && touched.surveySuccessText ? "border-red-500" : "border-gray-700"}`}
                  placeholder="Thanks for sharing your mood!"
                />
                {validationErrors.surveySuccessText && touched.surveySuccessText && (
                  <p className="text-red-400 text-xs mt-1">{validationErrors.surveySuccessText}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">Shown after a user votes</p>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl p-5 sm:p-6">
            <h2 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
              <FiBarChart2 className="text-[#F5C645]" /> Survey Options <span className="text-red-400 text-sm">*</span>
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              These are the voting options users see in the survey widget.{" "}
              {options.length < 2 && (
                <span className="text-red-400 text-xs mt-2 block">Minimum 2 options required.</span>
              )}
            </p>

            {optionError && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm mb-4">
                <FiAlertCircle size={14} />{optionError}
              </div>
            )}

            <div className="space-y-3 mb-4">
              {options.map((option, i) => (
                <div key={option.key} className="flex items-center gap-2 sm:gap-3 bg-gray-900/60 border border-gray-800 rounded-xl px-3 sm:px-4 py-3">
                  <span className="text-gray-500 text-xs w-4 shrink-0">{i + 1}</span>
                  <input
                    type="text"
                    value={option.label}
                    onChange={e => updateOptionLabel(option.key, e.target.value)}
                    className="flex-1 bg-transparent text-white text-sm focus:outline-none min-w-0"
                    placeholder="Option label"
                  />
                  {/* FIX: hide vote count text on very small screens, show on sm+ */}
                  <div className="hidden xs:flex sm:flex items-center gap-2 sm:gap-3 text-xs text-gray-500 shrink-0">
                    <span>{option.votes || 0} votes</span>
                    {totalVotes > 0 && (
                      <span className="text-[#F5C645]">
                        {Math.round(((option.votes || 0) / totalVotes) * 100)}%
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setConfirm({ open: true, key: option.key })}
                    disabled={options.length <= 1}
                    className="text-red-400 hover:text-red-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shrink-0"
                    title={options.length <= 1 ? "Cannot remove last option" : "Remove option"}
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add option */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newOptionLabel}
                onChange={e => { setNewOptionLabel(e.target.value); setOptionError(""); }}
                onKeyDown={e => e.key === "Enter" && addOption()}
                placeholder="Add new option..."
                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors min-w-0"
              />
              <button
                onClick={addOption}
                disabled={!newOptionLabel.trim()}
                className="flex items-center gap-1 px-3 sm:px-4 py-2 bg-[#F5C645]/20 text-[#F5C645] border border-[#F5C645]/30 rounded-lg text-sm hover:bg-[#F5C645]/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
              >
                <FiPlus size={14} /> <span className="hidden xs:inline sm:inline">Add</span>
              </button>
            </div>

            {validationErrors.options && options.length < 2 && (
              <p className="text-red-400 text-xs mt-2">{validationErrors.options}</p>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl p-5 sm:p-6 lg:sticky lg:top-6">
            <h2 className="text-white font-semibold mb-4">Live Preview</h2>
            <div className="bg-black rounded-xl p-5 space-y-4">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">{surveyTitle || "Survey Title"}</p>
                <p className="text-gray-600 text-xs">{updatedText || "Updated text"}</p>
                <h3 className="text-white text-xl font-semibold mt-2 leading-tight">{headline || "Headline"}</h3>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {options.map(o => (
                  <div key={o.key} className="bg-white/5 rounded-lg p-2.5 text-center">
                    <div className="text-white text-sm font-semibold">
                      {totalVotes > 0 ? `${Math.round(((o.votes || 0) / totalVotes) * 100)}%` : "0%"}
                    </div>
                    <div className="text-gray-500 text-xs mt-0.5 truncate">{o.label || "Option"}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-2">{surveyTitle || "Survey Title"}</p>
                <div className="space-y-1.5">
                  {options.map(o => (
                    <div key={o.key} className="bg-white/10 rounded px-3 py-1.5 text-white text-xs">
                      {o.label || "Option"}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-gray-500 text-xs italic">{surveySuccessText || "Success message"}</p>
            </div>

            <div className="mt-4 p-3 bg-[#F5C645]/5 border border-[#F5C645]/20 rounded-lg">
              <p className="text-[#F5C645] text-xs font-semibold mb-1">Today's Stats</p>
              <p className="text-gray-400 text-xs">Total votes: <span className="text-white">{totalVotes}</span></p>
              <p className="text-gray-400 text-xs">Date: <span className="text-white">{todayStr()}</span></p>
              <p className="text-gray-400 text-xs">
                Options count: <span className="text-white">{options.length}</span>{" "}
                <span className="text-red-400">(minimum 2)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}