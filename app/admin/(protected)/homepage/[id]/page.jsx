// app/admin/homepage/[id]/page.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FiPlus, FiTrash2, FiX, FiSave, FiAlertCircle,
  FiCheckCircle, FiArrowUp, FiArrowDown, FiSearch,
  FiImage, FiLayout, FiChevronDown, FiChevronUp, FiClock,
} from "react-icons/fi";
import { homepageAdminAPI } from "@/services/adminAPI";
import HomepageVersionSchedulePanel from "@/components/admin/HomepageVersionSchedulePanel";
import Link from "next/link";

const SECTION_TYPES = [
  { value: "featured", label: "Featured (Hero)", desc: "Large hero section with featured article" },
  { value: "headline", label: "Headline (Black BG)", desc: "Dark background headline section" },
  { value: "overlay", label: "Overlay (Image BG)", desc: "Full-width image with text overlay" },
  { value: "overlay_tall", label: "Overlay Tall", desc: "Taller image overlay section" },
  { value: "list", label: "Article List", desc: "Grid of article cards" },
  { value: "good_news", label: "First, the Good News", desc: "1 lead item + up to 5 secondary items — add exactly 6 slots" },
];

function ArticlePickerModal({ onSelect, onClose, searchFn }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function doSearch() {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await searchFn(query);
      setResults(Array.isArray(res.data) ? res.data : []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-[#0d0d0d] border border-[#F5C645]/20 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[90vh] flex flex-col">
        {/* Modal header */}
        <div className="flex justify-between items-center px-4 sm:px-5 py-4 border-b border-gray-800 shrink-0">
          <h3 className="text-white font-semibold text-sm sm:text-base">Select Article</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white cursor-pointer p-1 -mr-1"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-4 sm:p-5 flex-1 overflow-hidden flex flex-col">
          {/* Search bar */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && doSearch()}
              placeholder="Search articles..."
              className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 sm:px-4 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors min-w-0"
            />
            <button
              onClick={doSearch}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-[#F5C645] text-black rounded-lg text-sm font-medium cursor-pointer disabled:opacity-50 shrink-0"
            >
              <FiSearch size={14} />
              <span className="hidden xs:inline">{loading ? "..." : "Search"}</span>
              {loading && <span className="xs:hidden">...</span>}
            </button>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto space-y-2 -mx-1 px-1">
            {results.map(article => (
              <button
                key={article._id || article.id}
                onClick={() => { onSelect(article); onClose(); }}
                className="w-full text-left bg-gray-900 hover:bg-gray-800 active:bg-gray-700 border border-gray-800 hover:border-gray-600 rounded-xl px-3 sm:px-4 py-3 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  {article.image && (
                    <img src={article.image} alt="" className="w-10 h-8 sm:w-12 sm:h-10 object-cover rounded shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-white text-xs sm:text-sm font-medium line-clamp-2">{article.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5 truncate">/{article.slug} · {article.category?.name || article.category}</p>
                  </div>
                </div>
              </button>
            ))}
            {!loading && results.length === 0 && query && (
              <p className="text-gray-500 text-sm text-center py-6">No articles found. Try a different search.</p>
            )}
            {!query && (
              <p className="text-gray-600 text-sm text-center py-6">Type a search query and press Search.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SlotEditor({ slot, sectionType, onUpdate, onRemove, searchFn }) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-3 sm:p-4">
      {showPicker && (
        <ArticlePickerModal
          searchFn={searchFn}
          onSelect={article => onUpdate({ ...slot, articleId: article._id || article.id, _article: article })}
          onClose={() => setShowPicker(false)}
        />
      )}

      {/* Article preview + actions */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          {slot._article || slot.articleId ? (
            <div className="flex items-center gap-2 sm:gap-3">
              {slot._article?.image && (
                <img src={slot._article.image} alt="" className="w-12 h-9 sm:w-14 sm:h-10 object-cover rounded shrink-0" />
              )}
              <div className="min-w-0">
                <p className="text-white text-xs sm:text-sm font-medium line-clamp-2">{slot._article?.title || "Article ID: " + slot.articleId}</p>
                <p className="text-gray-500 text-xs mt-0.5 truncate">/{slot._article?.slug || ""}</p>
              </div>
            </div>
          ) : (
            <p className="text-red-400 text-xs sm:text-sm italic">⚠️ No article selected — Required</p>
          )}
        </div>

        <div className="flex gap-1.5 shrink-0">
          <button
            onClick={() => setShowPicker(true)}
            className="text-xs px-2 sm:px-3 py-1.5 bg-[#F5C645]/20 text-[#F5C645] border border-[#F5C645]/30 rounded-lg hover:bg-[#F5C645]/30 active:bg-[#F5C645]/40 transition-all cursor-pointer whitespace-nowrap"
          >
            {slot.articleId ? "Change" : "Select"}
          </button>
          <button
            onClick={onRemove}
            className="p-1.5 text-red-400 hover:bg-red-400/10 active:bg-red-400/20 rounded-lg cursor-pointer"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      </div>

      {/* Override fields */}
      <div className="grid grid-cols-1 gap-2">
        <div>
          <label className="block text-gray-600 mb-1 text-xs">Title Override <span className="text-gray-700">(Optional)</span></label>
          <input
            type="text"
            value={slot.titleOverride || ""}
            onChange={e => onUpdate({ ...slot, titleOverride: e.target.value })}
            className="w-full bg-black border border-gray-800 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-[#F5C645] transition-colors"
            placeholder="Leave empty to use article title"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1 text-xs">Kicker Override <span className="text-gray-700">(Optional)</span></label>
          <input
            type="text"
            value={slot.kickerOverride || ""}
            onChange={e => onUpdate({ ...slot, kickerOverride: e.target.value })}
            className="w-full bg-black border border-gray-800 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-[#F5C645] transition-colors"
            placeholder="Leave empty to use category"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1 text-xs">Excerpt Override <span className="text-gray-700">(Optional)</span></label>
          <input
            type="text"
            value={slot.excerptOverride || ""}
            onChange={e => onUpdate({ ...slot, excerptOverride: e.target.value })}
            className="w-full bg-black border border-gray-800 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-[#F5C645] transition-colors"
            placeholder="Leave empty to use article excerpt"
          />
        </div>
      </div>
    </div>
  );
}

function SectionEditor({ section, index, total, onChange, onRemove, onMove, searchFn, validationErrors }) {
  const [collapsed, setCollapsed] = useState(false);
  const hasValidSlot = section.slots && section.slots.some(slot => slot.articleId);

  function addSlot() {
    onChange({ ...section, slots: [...(section.slots || []), { articleId: null, titleOverride: "", excerptOverride: "", kickerOverride: "" }] });
  }

  function updateSlot(i, updated) {
    const slots = [...(section.slots || [])];
    slots[i] = updated;
    onChange({ ...section, slots });
  }

  function removeSlot(i) {
    onChange({ ...section, slots: (section.slots || []).filter((_, idx) => idx !== i) });
  }

  const typeInfo = SECTION_TYPES.find(t => t.value === section.type) || SECTION_TYPES[2];

  return (
    <div className={`bg-gradient-to-br from-gray-900 to-black border rounded-2xl overflow-hidden ${!hasValidSlot && validationErrors ? 'border-red-500' : 'border-[#F5C645]/20'}`}>
      {/* Section header */}
      <div className="flex items-start sm:items-center justify-between px-3 sm:px-5 py-3 sm:py-4 border-b border-gray-800/50 gap-2">
        <div className="flex items-start sm:items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <span className="text-[#F5C645] text-xs font-bold uppercase tracking-widest shrink-0 mt-0.5 sm:mt-0">#{index + 1}</span>
          <div className="min-w-0 flex-1">
            {/* Type select + title on same line for mobile */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <select
                value={section.type}
                onChange={e => onChange({ ...section, type: e.target.value })}
                className="bg-gray-800 border border-gray-700 rounded text-white text-xs px-2 py-1 focus:outline-none focus:border-[#F5C645] cursor-pointer max-w-[140px] sm:max-w-none"
              >
                {SECTION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              <input
                type="text"
                value={section.title || ""}
                onChange={e => onChange({ ...section, title: e.target.value })}
                placeholder="Section title (optional)"
                className="bg-transparent text-gray-400 text-xs focus:outline-none focus:text-white border-b border-transparent focus:border-gray-600 px-1 py-0.5 transition-colors min-w-0 w-28 sm:w-36"
              />
            </div>
            <p className="text-gray-600 text-xs mt-1">{typeInfo.desc} · {section.slots?.length || 0} slot(s)</p>
            {!hasValidSlot && validationErrors && (
              <p className="text-red-400 text-xs mt-1">⚠️ At least one article required</p>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-0.5 shrink-0">
          <button
            onClick={() => onMove(-1)}
            disabled={index === 0}
            className="p-1.5 text-gray-500 hover:text-white disabled:opacity-20 cursor-pointer touch-manipulation"
          >
            <FiArrowUp size={13} />
          </button>
          <button
            onClick={() => onMove(1)}
            disabled={index === total - 1}
            className="p-1.5 text-gray-500 hover:text-white disabled:opacity-20 cursor-pointer touch-manipulation"
          >
            <FiArrowDown size={13} />
          </button>
          <button
            onClick={() => setCollapsed(c => !c)}
            className="p-1.5 text-gray-500 hover:text-white cursor-pointer ml-0.5 touch-manipulation"
          >
            {collapsed ? <FiChevronDown size={14} /> : <FiChevronUp size={14} />}
          </button>
          <button
            onClick={onRemove}
            className="p-1.5 text-red-400 hover:bg-red-400/10 rounded cursor-pointer ml-0.5 touch-manipulation"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="p-3 sm:p-5 space-y-3">
          {(section.slots || []).map((slot, i) => (
            <SlotEditor
              key={i}
              slot={slot}
              sectionType={section.type}
              searchFn={searchFn}
              onUpdate={updated => updateSlot(i, updated)}
              onRemove={() => removeSlot(i)}
            />
          ))}
          <button
            onClick={addSlot}
            className="w-full py-3 border border-dashed border-gray-700 hover:border-[#F5C645]/50 active:border-[#F5C645]/70 text-gray-500 hover:text-[#F5C645] rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-2 touch-manipulation"
          >
            <FiPlus size={14} /> Add Article Slot
          </button>
        </div>
      )}
    </div>
  );
}

export default function HomepageEditorPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [homepage, setHomepage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activating, setActivating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [sections, setSections] = useState([]);
  const [newSectionType, setNewSectionType] = useState("overlay");
  const [showGuide, setShowGuide] = useState(false);
  const [touched, setTouched] = useState({
    title: false,
    slug: false,
    seoTitle: false,
    seoDescription: false,
  });

  useEffect(() => {
    if (id) loadHomepage();
  }, [id]);

  async function loadHomepage() {
    try {
      setLoading(true);
      const res = await homepageAdminAPI.getById(id);
      const hp = res.data;
      setHomepage(hp);
      setTitle(hp.title || "");
      setSlug(hp.slug || "");
      setSeoTitle(hp.seoTitle || "");
      setSeoDescription(hp.seoDescription || "");
      const hydrated = (hp.sections || []).map(sec => ({
        ...sec,
        slots: (sec.slots || []).map(slot => ({
          ...slot,
          _article: slot.article || null,
        })),
      }));
      setSections(hydrated);
    } catch {
      setError("Failed to load homepage.");
    } finally {
      setLoading(false);
    }
  }

  const validate = () => {
    const errors = {};
    if (!title.trim()) errors.title = "Homepage title is required";
    if (!slug.trim()) errors.slug = "Slug is required";
    if (!seoTitle.trim()) errors.seoTitle = "SEO title is required";
    if (!seoDescription.trim()) errors.seoDescription = "SEO description is required";
    if (sections.length === 0) {
      errors.sections = "At least one section is required";
    } else {
      const emptySections = sections.filter(sec =>
        !sec.slots || !sec.slots.some(slot => slot.articleId)
      );
      if (emptySections.length > 0) {
        errors.sections = `Section "${emptySections[0].title || (sections.indexOf(emptySections[0]) + 1)}" must have at least one article assigned`;
      }
    }
    return errors;
  };

  const handleFieldBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  function addSection() {
    setSections(prev => [
      ...prev,
      {
        key: `section_${Date.now()}`,
        type: newSectionType,
        title: "",
        limit: 3,
        order: prev.length,
        slots: [],
      },
    ]);
    setValidationErrors({});
  }

  function updateSection(index, updated) {
    setSections(prev => prev.map((s, i) => i === index ? updated : s));
    setValidationErrors({});
  }

  function removeSection(index) {
    setSections(prev => prev.filter((_, i) => i !== index));
    setValidationErrors({});
  }

  function moveSection(index, dir) {
    const to = index + dir;
    if (to < 0 || to >= sections.length) return;
    const next = [...sections];
    [next[index], next[to]] = [next[to], next[index]];
    setSections(next.map((s, i) => ({ ...s, order: i })));
    setValidationErrors({});
  }

  async function handleSave() {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setError(Object.values(errors)[0]);
      setTouched({ title: true, slug: true, seoTitle: true, seoDescription: true });
      return;
    }
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const cleanSections = sections.map((sec, i) => ({
        key: sec.key || `section_${i}`,
        type: sec.type,
        title: sec.title || "",
        limit: sec.limit || 3,
        order: i,
        slots: (sec.slots || []).map(slot => ({
          articleId: slot.articleId || null,
          titleOverride: slot.titleOverride || "",
          excerptOverride: slot.excerptOverride || "",
          kickerOverride: slot.kickerOverride || "",
        })),
      }));
      await homepageAdminAPI.update(id, { title, slug, seoTitle, seoDescription, sections: cleanSections });
      setSuccess("Homepage saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  async function handleActivate() {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setError(Object.values(errors)[0]);
      setTouched({ title: true, slug: true, seoTitle: true, seoDescription: true });
      return;
    }
    setActivating(true);
    setError("");
    try {
      await homepageAdminAPI.activate(id);
      setHomepage(prev => ({ ...prev, isActive: true }));
      setSuccess("Homepage is now LIVE!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to activate.");
    } finally {
      setActivating(false);
    }
  }

  const inp = "w-full bg-gray-900 border rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors";
  const errors = validate();
  const showErrors = touched.title || touched.slug || touched.seoTitle || touched.seoDescription;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#F5C645]" />
      </div>
    );
  }

  return (
    <div className="pb-8">
      {/* ── Header ── */}
      <div className="mb-6 sm:mb-8">
        {/* Back link */}
        <Link href="/admin/homepage" className="text-gray-500 hover:text-white text-xs sm:text-sm transition-colors inline-flex items-center gap-1 mb-2">
          ← All Homepages
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          {/* Title + badge */}
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight truncate">
              {title || "Homepage Editor"}
            </h1>
            {homepage?.isActive && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-green-500/20 text-green-400 mt-1.5">
                <FiCheckCircle size={11} /> CURRENTLY LIVE
              </span>
            )}
          </div>

          {/* Action buttons — full width on mobile */}
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={handleActivate}
              disabled={activating || homepage?.isActive}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 border border-green-400/30 text-green-400 rounded-lg hover:bg-green-400/10 active:bg-green-400/20 transition-all cursor-pointer text-xs sm:text-sm disabled:opacity-50 disabled:cursor-default"
            >
              <FiCheckCircle size={14} />
              <span>{activating ? "Activating..." : homepage?.isActive ? "Already Live" : "Set Live"}</span>
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 active:bg-[#F5C645]/80 transition-all cursor-pointer font-medium text-xs sm:text-sm disabled:opacity-50"
            >
              <FiSave size={14} />
              <span>{saving ? "Saving..." : "Save"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/50 text-red-400 px-3 sm:px-4 py-3 rounded-lg text-xs sm:text-sm mb-4 sm:mb-6">
          <FiAlertCircle size={15} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-3 sm:px-4 py-3 rounded-lg text-xs sm:text-sm mb-4 sm:mb-6">
          <FiCheckCircle size={15} className="shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Main layout */}
      <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
        {/* ── Left column ── */}
        <div className="space-y-6 min-w-0">

          {/* Homepage Settings card */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl p-4 sm:p-6">
            <h2 className="text-white font-semibold text-sm sm:text-base mb-4 sm:mb-5 flex items-center gap-2">
              <FiLayout className="text-[#F5C645] shrink-0" /> Homepage Settings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-gray-300 mb-1.5 text-xs sm:text-sm">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  onBlur={() => handleFieldBlur("title")}
                  className={`${inp} ${errors.title && touched.title ? "border-red-500" : "border-gray-700"}`}
                  placeholder="Homepage title"
                />
                {errors.title && touched.title && (
                  <p className="text-red-400 text-xs mt-1">{errors.title}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-1.5 text-xs sm:text-sm">
                  Slug <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={e => setSlug(e.target.value)}
                  onBlur={() => handleFieldBlur("slug")}
                  className={`${inp} ${errors.slug && touched.slug ? "border-red-500" : "border-gray-700"}`}
                  placeholder="homepage-slug"
                />
                {errors.slug && touched.slug && (
                  <p className="text-red-400 text-xs mt-1">{errors.slug}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-gray-300 mb-1.5 text-xs sm:text-sm">
                  SEO Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={e => setSeoTitle(e.target.value)}
                  onBlur={() => handleFieldBlur("seoTitle")}
                  className={`${inp} ${errors.seoTitle && touched.seoTitle ? "border-red-500" : "border-gray-700"}`}
                  placeholder="SEO title"
                />
                {errors.seoTitle && touched.seoTitle && (
                  <p className="text-red-400 text-xs mt-1">{errors.seoTitle}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-gray-300 mb-1.5 text-xs sm:text-sm">
                  SEO Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={seoDescription}
                  onChange={e => setSeoDescription(e.target.value)}
                  onBlur={() => handleFieldBlur("seoDescription")}
                  rows={2}
                  className={`${inp} resize-none ${errors.seoDescription && touched.seoDescription ? "border-red-500" : "border-gray-700"}`}
                  placeholder="SEO description"
                />
                {errors.seoDescription && touched.seoDescription && (
                  <p className="text-red-400 text-xs mt-1">{errors.seoDescription}</p>
                )}
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-3 sm:space-y-4">
            {/* Sections toolbar */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-white font-semibold text-sm sm:text-base">
                Sections ({sections.length}) <span className="text-red-400 text-sm">*</span>
              </h2>
              <div className="flex items-center gap-2">
                <select
                  value={newSectionType}
                  onChange={e => setNewSectionType(e.target.value)}
                  className="flex-1 sm:flex-none bg-gray-900 border border-gray-700 rounded-lg px-2 sm:px-3 py-2 text-white text-xs sm:text-sm focus:outline-none focus:border-[#F5C645] cursor-pointer"
                >
                  {SECTION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
                <button
                  onClick={addSection}
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-[#F5C645]/20 text-[#F5C645] border border-[#F5C645]/30 rounded-lg text-xs sm:text-sm hover:bg-[#F5C645]/30 active:bg-[#F5C645]/40 transition-all cursor-pointer whitespace-nowrap"
                >
                  <FiPlus size={13} /> Add Section
                </button>
              </div>
            </div>

            {errors.sections && showErrors && (
              <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/50 text-red-400 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm">
                <FiAlertCircle size={14} className="mt-0.5 shrink-0" />
                <span>{errors.sections}</span>
              </div>
            )}

            {sections.length === 0 ? (
              <div className="text-center py-10 sm:py-12 border border-dashed border-gray-700 rounded-2xl px-4">
                <FiLayout className="text-gray-600 text-3xl mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No sections yet. Add sections to build the homepage layout.</p>
                <p className="text-red-400 text-xs mt-2">At least one section is required</p>
              </div>
            ) : (
              sections.map((section, index) => (
                <SectionEditor
                  key={section.key || index}
                  section={section}
                  index={index}
                  total={sections.length}
                  searchFn={homepageAdminAPI.searchArticles}
                  onChange={updated => updateSection(index, updated)}
                  onRemove={() => removeSection(index)}
                  onMove={dir => moveSection(index, dir)}
                  validationErrors={Object.keys(errors).length > 0}
                />
              ))
            )}
          </div>

          {/* Version history + scheduled publishing */}
          {homepage && (
            <div className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl p-4 sm:p-6">
              <h2 className="text-white font-semibold text-sm sm:text-base mb-4 sm:mb-5 flex items-center gap-2">
                <FiClock className="text-[#F5C645] shrink-0" /> Version History & Scheduling
              </h2>
              <HomepageVersionSchedulePanel homepage={homepage} onRestored={loadHomepage} />
            </div>
          )}
        </div>

        {/* ── Right sidebar ── */}
        {/* Mobile: collapsible guide; Desktop: sticky sidebar */}
        <div className="xl:sticky xl:top-6 xl:self-start space-y-4">

          {/* Mobile toggle */}
          <button
            onClick={() => setShowGuide(g => !g)}
            className="xl:hidden w-full flex items-center justify-between px-4 py-3 bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl text-white text-sm font-semibold"
          >
            <span>Section Types Guide & Requirements</span>
            {showGuide ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
          </button>

          <div className={`space-y-4 ${showGuide ? "block" : "hidden"} xl:block`}>
            {/* Section Types Guide */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Section Types Guide</h3>
              <div className="space-y-2 sm:space-y-3">
                {SECTION_TYPES.map(t => (
                  <div key={t.value} className="border border-gray-800 rounded-xl p-2.5 sm:p-3">
                    <p className="text-[#F5C645] text-xs font-semibold uppercase tracking-wide">{t.label}</p>
                    <p className="text-gray-500 text-xs mt-1">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3 text-sm sm:text-base">Requirements</h3>
              <ul className="space-y-2 text-xs">
                {[
                  "Title is required",
                  "Slug is required",
                  "SEO Title is required",
                  "SEO Description is required",
                  "At least 1 section required",
                  "Each section needs at least 1 article",
                ].map(req => (
                  <li key={req} className="flex items-start gap-1.5">
                    <span className="text-red-400 mt-0.5">•</span>
                    <span className="text-gray-400">{req}</span>
                  </li>
                ))}
                <li className="flex items-start gap-1.5">
                  <span className="text-gray-600 mt-0.5">•</span>
                  <span className="text-gray-500">Override fields are optional</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}