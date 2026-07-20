"use client";

import { useState, useEffect } from "react";
import {
  FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiAlertCircle,
  FiSearch, FiUpload, FiTrash, FiEye, FiEyeOff, FiFolder, FiTag,
} from "react-icons/fi";
import { categoriesAdminAPI } from "@/services/adminAPI";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const resolveImg = (src) => {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  return `${API_BASE.replace("/api", "")}${src}`;
};

function ImageToast({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="flex items-start gap-3 bg-red-950/60 border border-red-500/40 text-red-300 px-4 py-3 rounded-xl text-sm mt-2">
      <FiAlertCircle size={15} className="shrink-0 mt-0.5" />
      <span className="flex-1">{message}</span>
      <button type="button" onClick={onClose} className="shrink-0 hover:text-red-200 cursor-pointer"><FiX size={13} /></button>
    </div>
  );
}

const EMPTY_FORM = {
  type: "desk",
  parent: "",
  name: "",
  slug: "",
  legacySlug: "",
  description: "",
  position: 99,
  isVisible: true,
  showInTopNav: true,
  seoTitle: "",
  seoDescription: "",
  bannerImageAlt: "",
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all"); // all | desk | topic
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [bannerImageFile, setBannerImageFile] = useState(null);
  const [bannerImagePreview, setBannerImagePreview] = useState("");
  const [imageToast, setImageToast] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null, name: "" });

  useEffect(() => { fetchCategories(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    let list = categories;
    if (typeFilter !== "all") list = list.filter((c) => (c.type || "desk") === typeFilter);
    if (q) list = list.filter((c) => c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q) || (c.legacySlug || "").toLowerCase().includes(q));
    setFiltered(list);
  }, [search, typeFilter, categories]);

  const desks = categories.filter((c) => (c.type || "desk") === "desk");
  const deskName = (id) => desks.find((d) => d._id === id)?.name || "—";

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await categoriesAdminAPI.getAll();
      setCategories(res.data);
    } catch {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleBannerImage = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.type !== "image/webp") { setImageToast("Only .webp format is allowed."); e.target.value = ""; return; }
    if (f.size > 100 * 1024) { setImageToast("Image must be under 100 KB."); e.target.value = ""; return; }
    setBannerImageFile(f);
    const r = new FileReader();
    r.onloadend = () => setBannerImagePreview(r.result);
    r.readAsDataURL(f);
    setImageToast("");
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.slug.trim()) errors.slug = "Slug is required.";
    if (!formData.description.trim()) errors.description = "Description is required.";
    if (formData.type === "topic" && !formData.parent) errors.parent = "Select a parent desk.";
    if (!formData.bannerImageAlt.trim()) errors.bannerImageAlt = "Banner image alt text is required.";
    if (!formData.seoTitle.trim()) errors.seoTitle = "SEO title is required.";
    if (!formData.seoDescription.trim()) errors.seoDescription = "SEO description is required.";
    if (!editingCategory && !bannerImageFile) errors.bannerImage = "Banner image is required.";
    if (editingCategory && !bannerImagePreview && !bannerImageFile) errors.bannerImage = "Banner image is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      const fd = new FormData();
      const submitData = {
        type: formData.type,
        parent: formData.type === "topic" ? formData.parent : null,
        name: formData.name,
        slug: formData.slug,
        legacySlug: formData.legacySlug,
        description: formData.description,
        position: formData.position,
        isVisible: formData.isVisible,
        showInTopNav: formData.showInTopNav,
        seoTitle: formData.seoTitle,
        seoDescription: formData.seoDescription,
        bannerImageAlt: formData.bannerImageAlt,
      };
      if (editingCategory && bannerImagePreview && !bannerImageFile) {
        submitData.existingBannerImage = editingCategory.bannerImage || "";
      }
      fd.append("data", JSON.stringify(submitData));
      if (bannerImageFile) fd.append("profileImage", bannerImageFile);

      if (editingCategory) {
        await categoriesAdminAPI.update(editingCategory._id, fd);
      } else {
        await categoriesAdminAPI.create(fd);
      }
      await fetchCategories();
      closeModal();
    } catch (err) {
      setFormErrors({ api: err.response?.data?.message || "Failed to save category." });
    } finally {
      setSaving(false);
    }
  };

  const openModal = (category = null, presetType = "desk") => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        type: category.type || "desk",
        parent: category.parent || "",
        name: category.name,
        slug: category.slug,
        legacySlug: category.legacySlug || "",
        description: category.description || "",
        position: category.position ?? 99,
        isVisible: category.isVisible !== false,
        showInTopNav: category.showInTopNav !== false,
        seoTitle: category.seoTitle || "",
        seoDescription: category.seoDescription || "",
        bannerImageAlt: category.bannerImageAlt || "",
      });
      setBannerImagePreview(category.bannerImage ? resolveImg(category.bannerImage) : "");
      setBannerImageFile(null);
    } else {
      setEditingCategory(null);
      setFormData({ ...EMPTY_FORM, type: presetType });
      setBannerImagePreview("");
      setBannerImageFile(null);
    }
    setFormErrors({});
    setImageToast("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData(EMPTY_FORM);
    setBannerImagePreview("");
    setBannerImageFile(null);
    setFormErrors({});
    setImageToast("");
  };

  const inpCls = (key) =>
    `w-full bg-gray-900 border rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors ${formErrors[key] ? "border-red-500" : "border-gray-700"}`;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 px-4">
        <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8 text-center max-w-md w-full">
          <FiAlertCircle className="text-red-500 text-5xl mx-auto mb-4" />
          <h2 className="text-white text-xl font-semibold mb-2">Connection Error</h2>
          <p className="text-gray-400 mb-4 text-sm">{error}</p>
          <button onClick={fetchCategories} className="px-4 py-2 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 cursor-pointer text-sm font-medium">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ConfirmDialog
        isOpen={confirmDialog.open}
        title="Delete Category"
        message={`Are you sure you want to delete "${confirmDialog.name}"? This will also permanently delete its child topics and all articles in it.`}
        onConfirm={async () => {
          try { await categoriesAdminAPI.delete(confirmDialog.id); await fetchCategories(); }
          catch (err) { alert(err.response?.data?.message || "Failed to delete."); }
          finally { setConfirmDialog({ open: false, id: null, name: "" }); }
        }}
        onCancel={() => setConfirmDialog({ open: false, id: null, name: "" })}
        confirmText="Delete"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Categories</h1>
          <p className="text-gray-400 mt-1 text-sm">Manage desks, their child topics, visibility, and SEO</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button onClick={() => openModal(null, "desk")} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 transition-all cursor-pointer font-medium text-sm">
            <FiFolder size={16} /><span>Add Desk</span>
          </button>
          <button onClick={() => openModal(null, "topic")} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-[#F5C645]/40 text-[#F5C645] rounded-lg hover:bg-[#F5C645]/10 transition-all cursor-pointer font-medium text-sm">
            <FiTag size={16} /><span>Add Topic</span>
          </button>
        </div>
      </div>

      {/* Search + type filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or slug…"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-9 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white cursor-pointer"><FiX size={14} /></button>}
        </div>
        <div className="flex gap-2">
          {["all", "desk", "topic"].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium capitalize transition-all cursor-pointer ${
                typeFilter === t ? "bg-[#F5C645] text-black" : "border border-gray-700 text-gray-400 hover:text-white"
              }`}
            >
              {t === "all" ? "All" : `${t}s`}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#F5C645]" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 bg-gray-900/50 rounded-2xl">
          <p className="text-gray-400 text-sm">{search ? `No categories match "${search}".` : "No categories yet. Add a desk to get started."}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map(category => {
            const bannerSrc = category.bannerImage ? resolveImg(category.bannerImage) : null;
            const isTopic = (category.type || "desk") === "topic";
            return (
              <div key={category._id} className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl overflow-hidden hover:border-[#F5C645]/40 transition-all duration-300">
                {bannerSrc ? (
                  <div className="h-32 overflow-hidden relative">
                    <img src={bannerSrc} alt={category.bannerImageAlt || category.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                ) : (
                  <div className="h-10" />
                )}
                <div className="p-5 sm:p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide flex items-center gap-1 ${
                          isTopic ? "bg-blue-500/20 text-blue-400" : "bg-[#F5C645]/20 text-[#F5C645]"
                        }`}>
                          {isTopic ? <FiTag size={9} /> : <FiFolder size={9} />} {isTopic ? "Topic" : "Desk"}
                        </span>
                        <h3 className="text-white text-lg sm:text-xl font-semibold truncate">{category.name}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${category.isVisible !== false ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                          {category.isVisible !== false ? "Visible" : "Hidden"}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm truncate">
                        /{category.slug}
                        {category.legacySlug && (
                          <span className="text-[#F5C645]"> · legacy: /{category.legacySlug}</span>
                        )}
                      </p>
                      {isTopic && <p className="text-gray-500 text-xs mt-1">under <span className="text-gray-300">{deskName(category.parent)}</span></p>}
                      {category.description && <p className="text-gray-600 text-xs mt-1 line-clamp-2">{category.description}</p>}
                    </div>
                    <div className="flex gap-2 ml-2 shrink-0">
                      <button onClick={() => openModal(category)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all cursor-pointer"><FiEdit2 size={17} /></button>
                      <button onClick={() => setConfirmDialog({ open: true, id: category._id, name: category.name })} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all cursor-pointer"><FiTrash2 size={17} /></button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-800">
                    <span className="text-gray-500 text-xs">Position: {category.position ?? 99}</span>
                    {category.showInTopNav !== false && <span className="text-[#F5C645] text-xs">• In Nav</span>}
                    {category.seoTitle && <span className="text-blue-400 text-xs">• Has SEO</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 overflow-y-auto z-50 p-3 sm:p-4">
          <div className="max-w-2xl mx-auto my-4 sm:my-8">
            <div className="bg-[#0d0d0d] border border-[#F5C645]/20 rounded-2xl">
              <div className="flex justify-between items-center px-5 sm:px-6 py-4 border-b border-gray-800 sticky top-0 bg-[#0d0d0d]/95 backdrop-blur rounded-t-2xl z-10">
                <h2 className="text-white text-lg sm:text-xl font-semibold">
                  {editingCategory ? `Edit ${formData.type === "topic" ? "Topic" : "Desk"}` : `Add ${formData.type === "topic" ? "Topic" : "Desk"}`}
                </h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-white cursor-pointer p-1"><FiX size={22} /></button>
              </div>

              <form onSubmit={handleSubmit} className="px-5 sm:px-6 pb-6 pt-4 space-y-5">
                {formErrors.api && (
                  <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                    <FiAlertCircle size={15} className="shrink-0 mt-0.5" /><span>{formErrors.api}</span>
                  </div>
                )}

                {/* Type toggle */}
                <div>
                  <p className="text-[#F5C645] font-semibold text-sm uppercase tracking-wider mb-3">Type</p>
                  <div className="flex gap-3">
                    <label className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-all ${formData.type === "desk" ? "border-[#F5C645] bg-[#F5C645]/10" : "border-gray-700"}`}>
                      <input
                        type="radio"
                        checked={formData.type === "desk"}
                        onChange={() => setFormData((p) => ({ ...p, type: "desk", parent: "" }))}
                        className="w-4 h-4"
                      />
                      <FiFolder size={15} className="text-[#F5C645]" />
                      <span className="text-white text-sm">Desk <span className="text-gray-500">(top-level)</span></span>
                    </label>
                    <label className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-all ${formData.type === "topic" ? "border-[#F5C645] bg-[#F5C645]/10" : "border-gray-700"}`}>
                      <input
                        type="radio"
                        checked={formData.type === "topic"}
                        onChange={() => setFormData((p) => ({ ...p, type: "topic" }))}
                        className="w-4 h-4"
                      />
                      <FiTag size={15} className="text-blue-400" />
                      <span className="text-white text-sm">Topic <span className="text-gray-500">(child of a desk)</span></span>
                    </label>
                  </div>
                  {formData.type === "topic" && (
                    <div className="mt-3">
                      <label className="block text-gray-300 mb-1.5 text-sm">Parent Desk <span className="text-red-400">*</span></label>
                      <select
                        value={formData.parent}
                        onChange={(e) => { setFormData((p) => ({ ...p, parent: e.target.value })); if (formErrors.parent) setFormErrors((p) => ({ ...p, parent: "" })); }}
                        className={`${inpCls("parent")} appearance-none cursor-pointer`}
                      >
                        <option value="">Select a desk…</option>
                        {desks.filter((d) => !editingCategory || d._id !== editingCategory._id).map((d) => (
                          <option key={d._id} value={d._id}>{d.name}</option>
                        ))}
                      </select>
                      {formErrors.parent && <p className="text-red-400 text-xs mt-1">{formErrors.parent}</p>}
                    </div>
                  )}
                </div>

                {/* Basic */}
                <div>
                  <p className="text-[#F5C645] font-semibold text-sm uppercase tracking-wider mb-3">Basic Info</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-1.5 text-sm">Name <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => {
                          const name = e.target.value;
                          setFormData(p => ({ ...p, name, slug: name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") }));
                          if (formErrors.name) setFormErrors(p => ({ ...p, name: "" }));
                        }}
                        className={inpCls("name")}
                        placeholder={formData.type === "topic" ? "e.g. City Hall" : "e.g. Politics"}
                      />
                      {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-1.5 text-sm">Slug <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={e => { setFormData(p => ({ ...p, slug: e.target.value })); if (formErrors.slug) setFormErrors(p => ({ ...p, slug: "" })); }}
                        className={inpCls("slug")}
                        placeholder="e.g. city-hall"
                      />
                      {formErrors.slug && <p className="text-red-400 text-xs mt-1">{formErrors.slug}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-gray-300 mb-1.5 text-sm">
                        Legacy URL alias <span className="text-gray-500">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.legacySlug}
                        onChange={e => { setFormData(p => ({ ...p, legacySlug: e.target.value })); if (formErrors.legacySlug) setFormErrors(p => ({ ...p, legacySlug: "" })); }}
                        className={inpCls("legacySlug")}
                        placeholder="e.g. entertainment, local-news, crime, weather"
                      />
                      <p className="text-gray-500 text-xs mt-1">
                        If this {formData.type === "topic" ? "topic" : "desk"} also needs to answer at an older public URL
                        with a different name (e.g. the Culture desk at /entertainment, or the Crime & Courts topic at
                        /crime), set that old path segment here. Leave blank if the slug above already matches the
                        legacy URL.
                      </p>
                      {formErrors.legacySlug && <p className="text-red-400 text-xs mt-1">{formErrors.legacySlug}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-gray-300 mb-1.5 text-sm">Description <span className="text-red-400">*</span></label>
                      <textarea
                        value={formData.description}
                        onChange={e => { setFormData(p => ({ ...p, description: e.target.value })); if (formErrors.description) setFormErrors(p => ({ ...p, description: "" })); }}
                        rows={2}
                        className={inpCls("description")}
                        placeholder="Short description…"
                      />
                      {formErrors.description && <p className="text-red-400 text-xs mt-1">{formErrors.description}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-1.5 text-sm">Position (ordering) <span className="text-red-400">*</span></label>
                      <input
                        type="number"
                        value={formData.position}
                        onChange={e => setFormData(p => ({ ...p, position: parseInt(e.target.value) || 99 }))}
                        className={inpCls("position")}
                        placeholder="99"
                        min="0"
                      />
                      <p className="text-gray-500 text-xs mt-1">Lower number = higher in nav (must be unique)</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-300 text-sm mb-2">Visibility</p>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.isVisible}
                          onChange={e => setFormData(p => ({ ...p, isVisible: e.target.checked }))}
                          className="w-4 h-4 rounded"
                        />
                        <span className="text-gray-300 text-sm flex items-center gap-2">
                          {formData.isVisible ? <FiEye size={14} className="text-green-400" /> : <FiEyeOff size={14} className="text-red-400" />}
                          {formData.isVisible ? "Visible on public site" : "Hidden from public site"}
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.showInTopNav}
                          onChange={e => setFormData(p => ({ ...p, showInTopNav: e.target.checked }))}
                          className="w-4 h-4 rounded"
                        />
                        <span className="text-gray-300 text-sm">Show in top navigation</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Banner Image */}
                <div>
                  <p className="text-[#F5C645] font-semibold text-sm uppercase tracking-wider mb-3">Banner Image <span className="text-red-400">*</span></p>
                  <p className="text-gray-500 text-xs mb-2">Only .webp · Under 100 KB · Uploaded to ImageKit CDN</p>
                  <div className="flex items-center gap-4">
                    <label className="flex-1 cursor-pointer">
                      <div className={`border-2 border-dashed ${formErrors.bannerImage ? 'border-red-500' : 'border-gray-700'} hover:border-[#F5C645] rounded-lg p-3 text-center transition-all bg-black/30`}>
                        <FiUpload className="mx-auto text-gray-500 mb-1" size={16} />
                        <span className="text-gray-500 text-xs">{bannerImagePreview ? "Replace image" : "Upload .webp image"}</span>
                      </div>
                      <input type="file" accept=".webp,image/webp" onChange={handleBannerImage} className="hidden" />
                    </label>
                    {bannerImagePreview && (
                      <div className="relative shrink-0">
                        <img src={bannerImagePreview} alt="preview" className="w-20 h-16 rounded-lg object-cover" />
                        <button type="button" onClick={() => { setBannerImageFile(null); setBannerImagePreview(""); if (formErrors.bannerImage) setFormErrors(p => ({ ...p, bannerImage: "" })); }} className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600">
                          <FiTrash size={10} />
                        </button>
                      </div>
                    )}
                  </div>
                  {formErrors.bannerImage && <p className="text-red-400 text-xs mt-1">{formErrors.bannerImage}</p>}
                  <ImageToast message={imageToast} onClose={() => setImageToast("")} />
                  <div className="mt-3">
                    <label className="block text-gray-300 mb-1.5 text-sm">Banner Image Alt Text <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      value={formData.bannerImageAlt}
                      onChange={e => { setFormData(p => ({ ...p, bannerImageAlt: e.target.value })); if (formErrors.bannerImageAlt) setFormErrors(p => ({ ...p, bannerImageAlt: "" })); }}
                      className={inpCls("bannerImageAlt")}
                      placeholder="Describe the banner image for accessibility"
                    />
                    {formErrors.bannerImageAlt && <p className="text-red-400 text-xs mt-1">{formErrors.bannerImageAlt}</p>}
                  </div>
                </div>

                {/* SEO */}
                <div>
                  <p className="text-[#F5C645] font-semibold text-sm uppercase tracking-wider mb-3">SEO Settings</p>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-gray-300 mb-1.5 text-sm">SEO Title <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        value={formData.seoTitle}
                        onChange={e => { setFormData(p => ({ ...p, seoTitle: e.target.value })); if (formErrors.seoTitle) setFormErrors(p => ({ ...p, seoTitle: "" })); }}
                        className={inpCls("seoTitle")}
                        placeholder="Custom SEO title (overrides default)"
                      />
                      {formErrors.seoTitle && <p className="text-red-400 text-xs mt-1">{formErrors.seoTitle}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-1.5 text-sm">SEO Description <span className="text-red-400">*</span></label>
                      <textarea
                        value={formData.seoDescription}
                        onChange={e => { setFormData(p => ({ ...p, seoDescription: e.target.value })); if (formErrors.seoDescription) setFormErrors(p => ({ ...p, seoDescription: "" })); }}
                        rows={2}
                        className={inpCls("seoDescription")}
                        placeholder="Custom SEO description for this page"
                      />
                      {formErrors.seoDescription && <p className="text-red-400 text-xs mt-1">{formErrors.seoDescription}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={closeModal} disabled={saving} className="flex-1 px-4 py-2.5 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-all cursor-pointer text-sm">Cancel</button>
                  <button type="submit" disabled={saving} className="flex-1 px-4 py-2.5 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 transition-all disabled:opacity-50 cursor-pointer font-semibold text-sm flex items-center justify-center gap-2">
                    <FiSave size={15} />{saving ? "Saving..." : editingCategory ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

