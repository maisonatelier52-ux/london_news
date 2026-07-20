// app/admin/footer/page.jsx (FIXED - WITH WORKING IMAGE PREVIEW)
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiSave, FiAlertCircle, FiCheckCircle, FiX, FiUpload, FiTrash,
  FiInstagram, FiFacebook, FiLinkedin, FiSend, FiRefreshCw,
} from "react-icons/fi";
import { FaXTwitter, FaReddit } from "react-icons/fa6";
import { SiSubstack, SiMedium } from "react-icons/si";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const SOCIAL_PLATFORMS = [
  { key: "instagram", icon: FiInstagram, placeholder: "https://instagram.com/..." },
  { key: "facebook", icon: FiFacebook, placeholder: "https://facebook.com/..." },
  { key: "twitter", icon: FaXTwitter, placeholder: "https://twitter.com/..." },
  { key: "linkedin", icon: FiLinkedin, placeholder: "https://linkedin.com/..." },
  { key: "reddit", icon: FaReddit, placeholder: "https://reddit.com/..." },
  { key: "telegram", icon: FiSend, placeholder: "https://t.me/..." },
  { key: "medium", icon: SiMedium, placeholder: "https://medium.com/..." },
  { key: "substack", icon: SiSubstack, placeholder: "https://substack.com/..." },
];

export default function FooterPage() {
  const [footer, setFooter] = useState(null);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [backgroundPreview, setBackgroundPreview] = useState("");
  const [imageError, setImageError] = useState("");
  const [activeColumn, setActiveColumn] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState("");
  const [duplicateError, setDuplicateError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    await Promise.all([loadFooter(), loadPages()]);
    setLoading(false);
  }

  async function loadFooter() {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/footer`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });
      if (res.ok) {
        const data = await res.json();
        setFooter(data);
        // Set preview from existing image if it exists
        if (data.backgroundImage) {
          let previewUrl = data.backgroundImage;
          if (!previewUrl.startsWith('http')) {
            previewUrl = `${API_BASE.replace('/api', '')}${previewUrl}`;
          }
          console.log("Setting preview from existing image:", previewUrl);
          setBackgroundPreview(previewUrl);
        } else {
          setBackgroundPreview("");
        }
      } else {
        setError("Failed to load footer settings.");
      }
    } catch (err) {
      console.error("Error loading footer:", err);
      setError("Failed to load footer settings.");
    }
  }

  async function loadPages() {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/pages?publishedOnly=true`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        const publishedPages = data.filter(page => page.isPublished !== false);
        setPages(publishedPages);
      } else {
        setPages([]);
      }
    } catch (err) {
      console.error("Error loading pages:", err);
      setPages([]);
    }
  }

  function validateFooter() {
    const errors = {};
    
    if (!footer.siteDescription || footer.siteDescription.trim() === "") {
      errors.siteDescription = "Site description is required";
    } else if (footer.siteDescription.length < 10) {
      errors.siteDescription = "Site description must be at least 10 characters";
    }
    
    if (!footer.copyrightText || footer.copyrightText.trim() === "") {
      errors.copyrightText = "Copyright text is required";
    } else if (footer.copyrightText.length < 5) {
      errors.copyrightText = "Copyright text must be at least 5 characters";
    }
    
    const columns = ["column1", "column2", "column3"];
    columns.forEach(column => {
      const title = footer[`${column}Title`];
      const links = footer[`${column}Links`] || [];
      
      if (!title || title.trim() === "") {
        errors[`${column}Title`] = "Column title cannot be empty";
      }
      
      if (links.length === 0) {
        errors[`${column}Links`] = `Add at least one link to this column`;
      }
    });
    
    if (!footer.newsletterTitle || footer.newsletterTitle.trim() === "") {
      errors.newsletterTitle = "Newsletter title is required";
    }
    
    if (!footer.newsletterDescription || footer.newsletterDescription.trim() === "") {
      errors.newsletterDescription = "Newsletter description is required";
    } else if (footer.newsletterDescription.length < 15) {
      errors.newsletterDescription = "Newsletter description must be at least 15 characters";
    }
    
    if (!footer.newsletterButtonText || footer.newsletterButtonText.trim() === "") {
      errors.newsletterButtonText = "Newsletter button text is required";
    }
    
    return errors;
  }

  async function handleSave() {
    const errors = validateFooter();
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(`field-${firstErrorField}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setValidationErrors({});
    setSaving(true);
    setError("");
    setSuccess("");
    setImageError("");
    
    try {
      const token = localStorage.getItem("adminToken");
      const fd = new FormData();
      
      const footerData = { ...footer };
      
      if (backgroundFile) {
        delete footerData.backgroundImage;
      }
      
      fd.append("data", JSON.stringify(footerData));
      
      if (backgroundFile) {
        fd.append("profileImage", backgroundFile);
      }
      
      const res = await fetch(`${API_BASE}/footer`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: fd
      });
      
      if (res.ok) {
        const result = await res.json();
        setSuccess("Footer settings saved successfully!");
        
        setFooter(result);
        
        if (backgroundFile && result.backgroundImage) {
          let previewUrl = result.backgroundImage;
          if (!previewUrl.startsWith('http')) {
            previewUrl = `${API_BASE.replace('/api', '')}${previewUrl}`;
          }
          setBackgroundPreview(previewUrl);
          setBackgroundFile(null);
        }
        
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Failed to save footer.");
      }
    } catch (err) {
      console.error("Save error:", err);
      setError(err.message || "Failed to save footer.");
    } finally {
      setSaving(false);
    }
  }

  function handleBackgroundImage(e) {
    const f = e.target.files[0];
    if (!f) return;
    
    setImageError("");
    setError("");
    
    if (f.type !== "image/webp") {
      setImageError("Only .webp format is allowed. Please upload a WebP image.");
      e.target.value = "";
      return;
    }
    
    const maxSize = 100 * 1024;
    if (f.size > maxSize) {
      const fileSizeKB = (f.size / 1024).toFixed(2);
      setImageError(`Image size (${fileSizeKB} KB) exceeds the 100 KB limit. Please compress your image and try again.`);
      e.target.value = "";
      return;
    }
    
    setBackgroundFile(f);
    
    // Create preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log("Preview created:", reader.result);
      setBackgroundPreview(reader.result);
    };
    reader.readAsDataURL(f);
  }

  function removeBackgroundImage() {
    setBackgroundFile(null);
    setBackgroundPreview("");
    setFooter(prev => ({ ...prev, backgroundImage: "" }));
    setImageError("");
  }

  function updateFooter(field, value) {
    setFooter(prev => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }

  function updateSocial(key, value) {
    setFooter(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [key]: value }
    }));
  }

  function getUsedPagesAcrossAllColumns() {
    const usedPages = new Set();
    const columns = ["column1", "column2", "column3"];
    columns.forEach(column => {
      const links = footer?.[`${column}Links`] || [];
      links.forEach(link => {
        if (link.pageId) usedPages.add(link.pageId);
        if (link.slug) usedPages.add(link.slug);
      });
    });
    return usedPages;
  }

  function getAvailablePages(column) {
    const usedPagesAcrossAll = getUsedPagesAcrossAllColumns();
    return pages.filter(page => !usedPagesAcrossAll.has(page._id) && !usedPagesAcrossAll.has(page.slug));
  }

  function handlePageSelect(column, pageId) {
    const selectedPage = pages.find(p => p._id === pageId);
    if (!selectedPage) return;
    
    const usedPages = getUsedPagesAcrossAllColumns();
    if (usedPages.has(selectedPage._id) || usedPages.has(selectedPage.slug)) {
      setDuplicateError(`"${selectedPage.title}" is already added to another column. Each page can only be used once across all columns.`);
      setSelectedPageId("");
      return;
    }
    
    setDuplicateError("");
    setSelectedPageId(pageId);
  }

  function addLink(column) {
    if (!selectedPageId) {
      setDuplicateError("Please select a page from the dropdown.");
      return;
    }
    
    const selectedPage = pages.find(p => p._id === selectedPageId);
    if (!selectedPage) {
      setDuplicateError("Selected page not found.");
      return;
    }
    
    const usedPages = getUsedPagesAcrossAllColumns();
    if (usedPages.has(selectedPage._id) || usedPages.has(selectedPage.slug)) {
      setDuplicateError(`"${selectedPage.title}" is already used in another column. Each page can only appear once.`);
      return;
    }
    
    const newLink = {
      title: selectedPage.title,
      slug: selectedPage.slug,
      pageId: selectedPage._id,
    };
    
    setFooter(prev => ({
      ...prev,
      [`${column}Links`]: [...(prev?.[`${column}Links`] || []), newLink]
    }));
    
    if (validationErrors[`${column}Links`]) {
      setValidationErrors(prev => ({ ...prev, [`${column}Links`]: undefined }));
    }
    
    setSelectedPageId("");
    setDuplicateError("");
    setActiveColumn(null);
  }

  function removeLink(column, index) {
    setFooter(prev => ({
      ...prev,
      [`${column}Links`]: prev[`${column}Links`].filter((_, i) => i !== index)
    }));
    
    const newLinks = footer[`${column}Links`].filter((_, i) => i !== index);
    if (newLinks.length === 0) {
      setValidationErrors(prev => ({ 
        ...prev, 
        [`${column}Links`]: `Add at least one link to this column` 
      }));
    }
  }

  const inp = "w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors";
  const inpError = "w-full bg-gray-900 border border-red-500 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500 transition-colors";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#F5C645]" />
      </div>
    );
  }

  if (!footer) return null;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Footer Settings</h1>
          <p className="text-gray-400 mt-1 text-sm">Control the footer appearance, links, and social media</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => loadData()}
            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-700 text-gray-400 rounded-lg hover:border-[#F5C645] hover:text-[#F5C645] transition-all cursor-pointer text-sm"
          >
            <FiRefreshCw size={16} /> Refresh
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 transition-all cursor-pointer font-medium text-sm disabled:opacity-50"
          >
            <FiSave size={18} /> {saving ? "Saving..." : "Save Footer"}
          </button>
        </div>
      </div>

       {/* INSTRUCTION BOX - ADD THIS HERE */}
      <div className="mb-6 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <span className="text-blue-400">📌</span>
          <span className="text-gray-400">Add pages to footer columns:</span>
          <span className="text-gray-500">1. Create page in</span>
          <Link href="/admin/pages" className="text-[#F5C645] hover:underline">Pages</Link>
          <span className="text-gray-500">2. Click "+ Add Link" below</span>
          <span className="text-gray-500">3. Select page from dropdown</span>
          <span className="text-yellow-500/70 text-xs">⚠️ Each page can be used only once</span>
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

      {Object.keys(validationErrors).length > 0 && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-red-400 mb-2">
            <FiAlertCircle size={18} />
            <span className="font-medium">Please fix the following errors before saving:</span>
          </div>
          <ul className="list-disc list-inside text-red-400 text-sm space-y-1">
            {Object.entries(validationErrors).map(([field, error]) => (
              <li key={field}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-6">
        {/* Brand Section */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl p-6" id="field-siteDescription">
          <h2 className="text-white font-semibold text-lg mb-5">Brand & Description</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1.5 text-sm">
                Site Description <span className="text-red-400">*</span>
              </label>
              <textarea
                value={footer.siteDescription || ""}
                onChange={e => updateFooter("siteDescription", e.target.value)}
                rows={2}
                className={validationErrors.siteDescription ? inpError : inp}
                placeholder="Independent coverage of London politics, business, culture..."
              />
              {validationErrors.siteDescription && (
                <p className="text-red-400 text-xs mt-1">{validationErrors.siteDescription}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1.5 text-sm">Background Image</label>
              <p className="text-gray-500 text-xs mb-2">Only .webp · Under 100 KB</p>
              
              {imageError && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm mb-3">
                  <FiAlertCircle size={14} />
                  <span>{imageError}</span>
                </div>
              )}
              
              <div className="flex items-center gap-4 flex-wrap">
                <label className="flex-1 cursor-pointer min-w-[200px]">
                  <div className={`border-2 border-dashed rounded-xl p-4 text-center transition-all bg-black/20 ${imageError ? 'border-red-500' : 'border-gray-700 hover:border-[#F5C645]'}`}>
                    <FiUpload className="mx-auto text-gray-500 mb-2" size={20} />
                    <p className="text-gray-400 text-sm">{backgroundPreview ? "Replace image" : "Upload background image"}</p>
                    <p className="text-gray-500 text-xs mt-1">Max 100 KB · WebP only</p>
                  </div>
                  <input 
                    type="file" 
                    accept=".webp,image/webp" 
                    onChange={handleBackgroundImage} 
                    className="hidden" 
                  />
                </label>
                
                {(backgroundPreview || footer?.backgroundImage) && (
                  <button
                    type="button"
                    onClick={removeBackgroundImage}
                    className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <FiTrash size={16} />
                    Remove Image
                  </button>
                )}
              </div>
              
              {/* Image Preview - This will now show correctly */}
              {backgroundPreview && (
                <div className="mt-4 p-3 bg-gray-900/60 rounded-lg border border-gray-700">
                  <p className="text-gray-400 text-xs mb-2">Image Preview:</p>
                  <div className="flex justify-center">
                    <img 
                      src={backgroundPreview} 
                      alt="Footer background preview" 
                      className="max-w-full max-h-48 rounded-lg object-contain border border-gray-700"
                      onError={(e) => {
                        console.error("Preview image failed to load:", backgroundPreview);
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <p className="text-gray-500 text-xs mt-2 text-center">Preview of your footer background image</p>
                </div>
              )}
              
              {/* No Image Message */}
              {!backgroundPreview && !footer?.backgroundImage && (
                <div className="mt-4 p-4 bg-gray-900/40 rounded-lg border border-dashed border-gray-700 text-center">
                  <p className="text-gray-500 text-sm">No background image selected</p>
                  <p className="text-gray-600 text-xs mt-1">Footer will have black background</p>
                </div>
              )}
              
              {/* Show existing image info when no preview but image exists in DB */}
              {!backgroundPreview && footer?.backgroundImage && (
                <div className="mt-4 p-3 bg-gray-900/60 rounded-lg border border-gray-700">
                  <p className="text-gray-400 text-xs mb-2">Current Image:</p>
                  <div className="flex justify-center">
                    <img 
                      src={`${API_BASE.replace('/api', '')}${footer.backgroundImage}`}
                      alt="Current footer background" 
                      className="max-w-full max-h-48 rounded-lg object-contain border border-gray-700"
                      onLoad={() => {
                        console.log("Existing image loaded");
                        setBackgroundPreview(`${API_BASE.replace('/api', '')}${footer.backgroundImage}`);
                      }}
                      onError={(e) => {
                        console.error("Existing image failed to load");
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1.5 text-sm">
                Copyright Text <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={footer.copyrightText || ""}
                onChange={e => updateFooter("copyrightText", e.target.value)}
                className={validationErrors.copyrightText ? inpError : inp}
                placeholder="© 2026 London News. All Rights Reserved."
              />
              {validationErrors.copyrightText && (
                <p className="text-red-400 text-xs mt-1">{validationErrors.copyrightText}</p>
              )}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl p-6">
          <h2 className="text-white font-semibold text-lg mb-5">Social Media Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SOCIAL_PLATFORMS.map(({ key, icon: Icon, placeholder }) => (
              <div key={key}>
                <label className="block text-gray-300 mb-1.5 text-sm flex items-center gap-2">
                  <Icon size={14} className="text-[#F5C645]" /> {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type="url"
                  value={footer.socialLinks?.[key] || ""}
                  onChange={e => updateSocial(key, e.target.value)}
                  className={inp}
                  placeholder={placeholder}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Link Columns */}
        {[
          { column: "column1", defaultTitle: "Newsroom" },
          { column: "column2", defaultTitle: "Standards" },
          { column: "column3", defaultTitle: "Legal" }
        ].map(({ column, defaultTitle }) => {
          const title = footer[`${column}Title`] || defaultTitle;
          const links = footer[`${column}Links`] || [];
          const availablePages = getAvailablePages(column);
          
          return (
            <div key={column} className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl p-6" id={`field-${column}Title`}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex-1">
                  <label className="block text-gray-300 mb-1.5 text-sm">
                    Column Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => updateFooter(`${column}Title`, e.target.value)}
                    className={`${validationErrors[`${column}Title`] ? inpError : inp} w-64`}
                  />
                  {validationErrors[`${column}Title`] && (
                    <p className="text-red-400 text-xs mt-1">{validationErrors[`${column}Title`]}</p>
                  )}
                </div>
              </div>
              
              <div className={`space-y-2 ${validationErrors[`${column}Links`] ? 'border border-red-500 rounded-lg p-3' : ''}`}>
                {links.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">No links in this column yet. Click "Add Link" to add pages.</p>
                ) : (
                  links.map((link, linkIdx) => (
                    <div key={linkIdx} className="flex items-center gap-3 bg-gray-900/60 rounded-lg px-4 py-2">
                      <div className="flex-1">
                        <p className="text-white text-sm">{link.title}</p>
                        <p className="text-gray-500 text-xs">/{link.slug}</p>
                      </div>
                      <button
                        onClick={() => removeLink(column, linkIdx)}
                        className="p-1.5 text-red-400 hover:bg-red-400/10 rounded cursor-pointer"
                        title="Remove link"
                      >
                        <FiTrash size={14} />
                      </button>
                    </div>
                  ))
                )}
                {validationErrors[`${column}Links`] && (
                  <p className="text-red-400 text-xs mt-2">{validationErrors[`${column}Links`]}</p>
                )}
              </div>
              
              {activeColumn === column ? (
                <div className="mt-4 p-4 bg-gray-900/80 rounded-xl border border-gray-700">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-gray-300 mb-1.5 text-sm">Select Page</label>
                      <select
                        value={selectedPageId}
                        onChange={(e) => handlePageSelect(column, e.target.value)}
                        className={`${inp} cursor-pointer`}
                      >
                        <option value="">-- Select a page --</option>
                        {availablePages.map(page => (
                          <option key={page._id} value={page._id}>
                            {page.title} (/{page.slug})
                          </option>
                        ))}
                      </select>
                      {availablePages.length === 0 && pages.length > 0 && (
                        <p className="text-yellow-500 text-xs mt-1">All available pages have been added across columns.</p>
                      )}
                      {pages.length === 0 && (
                        <p className="text-yellow-500 text-xs mt-1">
                          No pages found. 
                          <Link href="/admin/pages" className="text-[#F5C645] underline ml-1">Create a page</Link> first.
                        </p>
                      )}
                    </div>
                    
                    {duplicateError && (
                      <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/50 text-red-400 px-3 py-2 rounded-lg text-sm">
                        <FiAlertCircle size={14} />{duplicateError}
                      </div>
                    )}
                    
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => addLink(column)}
                        disabled={!selectedPageId}
                        className="flex-1 px-3 py-2 bg-[#F5C645] text-black rounded-lg text-sm font-medium disabled:opacity-50 cursor-pointer"
                      >
                        Add Link
                      </button>
                      <button
                        onClick={() => {
                          setActiveColumn(null);
                          setSelectedPageId("");
                          setDuplicateError("");
                        }}
                        className="px-3 py-2 border border-gray-700 text-gray-400 rounded-lg text-sm hover:bg-gray-800 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setActiveColumn(column);
                    setSelectedPageId("");
                    setDuplicateError("");
                  }}
                  className="mt-3 text-sm text-[#F5C645] hover:underline cursor-pointer"
                >
                  + Add Link
                </button>
              )}
            </div>
          );
        })}

        {/* Newsletter Section */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl p-6">
          <h2 className="text-white font-semibold text-lg mb-5">Newsletter Section</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-1.5 text-sm">
                Newsletter Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={footer.newsletterTitle || ""}
                onChange={e => updateFooter("newsletterTitle", e.target.value)}
                className={validationErrors.newsletterTitle ? inpError : inp}
                placeholder="Stay Ahead of London"
              />
              {validationErrors.newsletterTitle && (
                <p className="text-red-400 text-xs mt-1">{validationErrors.newsletterTitle}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-300 mb-1.5 text-sm">
                Button Text <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={footer.newsletterButtonText || ""}
                onChange={e => updateFooter("newsletterButtonText", e.target.value)}
                className={validationErrors.newsletterButtonText ? inpError : inp}
                placeholder="Subscribe"
              />
              {validationErrors.newsletterButtonText && (
                <p className="text-red-400 text-xs mt-1">{validationErrors.newsletterButtonText}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-gray-300 mb-1.5 text-sm">
                Newsletter Description <span className="text-red-400">*</span>
              </label>
              <textarea
                value={footer.newsletterDescription || ""}
                onChange={e => updateFooter("newsletterDescription", e.target.value)}
                rows={2}
                className={validationErrors.newsletterDescription ? inpError : inp}
                placeholder="Get the latest London news delivered directly to your inbox."
              />
              {validationErrors.newsletterDescription && (
                <p className="text-red-400 text-xs mt-1">{validationErrors.newsletterDescription}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}