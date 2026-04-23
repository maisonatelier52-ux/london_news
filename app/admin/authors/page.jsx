

// // app/admin/authors/page.jsx
// // ✅ Updated for ImageKit — images are stored as full absolute URLs, no localhost prefix needed

// "use client";

// import { useState, useEffect } from "react";
// import {
//   FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiTwitter, FiGlobe,
//   FiUser, FiMapPin, FiAlertCircle, FiSearch,
// } from "react-icons/fi";
// import { FaQuora, FaRedditAlien, FaMedium } from "react-icons/fa";
// import { authorsAdminAPI, categoriesAdminAPI } from "@/services/adminAPI";
// import ConfirmDialog from "@/components/admin/ConfirmDialog";

// const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// /** ImageKit URLs are already absolute; legacy paths get the base URL prepended */
// const resolveImg = (src) => {
//   if (!src) return "";
//   if (src.startsWith("http")) return src;
//   return `${API_BASE.replace("/api", "")}${src}`;
// };

// function ImageToast({ message, onClose }) {
//   if (!message) return null;
//   return (
//     <div className="flex items-start gap-3 bg-red-950/60 border border-red-500/40 text-red-300 px-4 py-3 rounded-xl text-sm mt-2">
//       <FiAlertCircle size={15} className="shrink-0 mt-0.5" />
//       <span className="flex-1">{message}</span>
//       <button type="button" onClick={onClose} className="shrink-0 hover:text-red-200 cursor-pointer"><FiX size={13} /></button>
//     </div>
//   );
// }

// const EMPTY_FORM = {
//   name: '', gender: 'Male', country: '', bio: '',
//   websiteLink: '', email: '', category: '',
//   social: { twitter: '', quora: '', reddit: '', medium: '' },
// };

// export default function AuthorsPage() {
//   const [authors, setAuthors]           = useState([]);
//   const [filtered, setFiltered]         = useState([]);
//   const [search, setSearch]             = useState("");
//   const [categories, setCategories]     = useState([]);
//   const [loading, setLoading]           = useState(true);
//   const [showModal, setShowModal]       = useState(false);
//   const [editingAuthor, setEditingAuthor] = useState(null);
//   const [imageFile, setImageFile]       = useState(null);
//   const [imagePreview, setImagePreview] = useState('');
//   const [imageToast, setImageToast]     = useState('');
//   const [formData, setFormData]         = useState(EMPTY_FORM);
//   const [formErrors, setFormErrors]     = useState({});
//   const [saving, setSaving]             = useState(false);
//   const [confirm, setConfirm]           = useState({ open: false, id: null, name: '' });

//   useEffect(() => { fetchAuthors(); fetchCategories(); }, []);

//   useEffect(() => {
//     const q = search.toLowerCase();
//     setFiltered(
//       q
//         ? authors.filter(
//             (a) =>
//               a.name.toLowerCase().includes(q) ||
//               a.country?.toLowerCase().includes(q) ||
//               a.category?.name?.toLowerCase().includes(q)
//           )
//         : authors
//     );
//   }, [search, authors]);

//   async function fetchAuthors() {
//     try { const r = await authorsAdminAPI.getAll(); setAuthors(r.data); }
//     catch (e) { console.error(e); }
//     finally { setLoading(false); }
//   }
//   async function fetchCategories() {
//     try { const r = await categoriesAdminAPI.getAll(); setCategories(r.data); }
//     catch (e) { console.error(e); }
//   }

//   function validate() {
//     const e = {};
//     if (!formData.name.trim())    e.name     = 'Name is required.';
//     if (!formData.category)       e.category = 'Category is required.';
//     if (!formData.country.trim()) e.country  = 'Country is required.';
//     if (!formData.bio.trim())     e.bio      = 'Bio is required.';
//     if (!formData.email.trim()) {
//       e.email = 'Email is required.';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       e.email = 'Invalid email address.';
//     }
//     if (formData.websiteLink && !/^https?:\/\/.+/.test(formData.websiteLink)) {
//       e.websiteLink = 'Must start with http:// or https://';
//     }
//     ['twitter', 'quora', 'reddit', 'medium'].forEach((f) => {
//       const v = formData.social[f];
//       if (v && !/^https?:\/\/.+/.test(v)) e[`social_${f}`] = 'Must start with http:// or https://';
//     });
//     setFormErrors(e);
//     return Object.keys(e).length === 0;
//   }

//   function handleImageChange(e) {
//     const f = e.target.files[0]; if (!f) return;
//     if (f.type !== 'image/webp') { setImageToast('Only .webp images are allowed.'); e.target.value = ''; return; }
//     setImageToast('');
//     setImageFile(f);
//     const r = new FileReader();
//     r.onloadend = () => setImagePreview(r.result);
//     r.readAsDataURL(f);
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!validate()) return;
//     setSaving(true);
//     try {
//       const fd = new FormData();
//       fd.append('data', JSON.stringify(formData));
//       if (imageFile) fd.append('profileImage', imageFile);
//       if (editingAuthor) {
//         await authorsAdminAPI.update(editingAuthor._id, fd);
//       } else {
//         await authorsAdminAPI.create(fd);
//       }
//       await fetchAuthors();
//       closeModal();
//     } catch (err) {
//       setFormErrors({ api: err.response?.data?.message || 'Failed to save author.' });
//     } finally {
//       setSaving(false);
//     }
//   }

//   function openModal(author = null) {
//     if (author) {
//       setEditingAuthor(author);
//       setFormData({
//         name:        author.name || '',
//         gender:      author.gender || 'Male',
//         country:     author.country || '',
//         bio:         author.bio || '',
//         websiteLink: author.websiteLink || '',
//         email:       author.email || '',
//         category:    author.category?._id || author.category || '',
//         social:      author.social || { twitter: '', quora: '', reddit: '', medium: '' },
//       });
//       // ImageKit URLs are already absolute — use resolveImg for both legacy and new
//       setImagePreview(author.profileImage ? resolveImg(author.profileImage) : '');
//     } else {
//       setEditingAuthor(null);
//       setFormData(EMPTY_FORM);
//       setImagePreview('');
//       setImageFile(null);
//     }
//     setFormErrors({});
//     setImageToast('');
//     setShowModal(true);
//   }

//   function closeModal() {
//     setShowModal(false);
//     setEditingAuthor(null);
//     setImageFile(null);
//     setImagePreview('');
//     setFormErrors({});
//     setImageToast('');
//   }

//   function setSocial(key, val) {
//     setFormData((p) => ({ ...p, social: { ...p.social, [key]: val } }));
//     if (formErrors[`social_${key}`]) setFormErrors((p) => ({ ...p, [`social_${key}`]: '' }));
//   }

//   function f(key) {
//     return {
//       value: formData[key],
//       onChange: (e) => {
//         setFormData((p) => ({ ...p, [key]: e.target.value }));
//         if (formErrors[key]) setFormErrors((p) => ({ ...p, [key]: '' }));
//         if (formErrors.api) setFormErrors((p) => ({ ...p, api: '' }));
//       },
//     };
//   }

//   const inpCls = (key) =>
//     `w-full bg-gray-900 border rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors ${
//       formErrors[key] ? 'border-red-500' : 'border-gray-700'
//     }`;

//   return (
//     <div>
//       <ConfirmDialog
//         isOpen={confirm.open}
//         title="Delete Author"
//         message={`Delete "${confirm.name}"? This cannot be undone.`}
//         onConfirm={async () => {
//           try { await authorsAdminAPI.delete(confirm.id); await fetchAuthors(); }
//           catch (err) { alert(err.response?.data?.message || 'Failed to delete author.'); }
//           finally { setConfirm({ open: false, id: null, name: '' }); }
//         }}
//         onCancel={() => setConfirm({ open: false, id: null, name: '' })}
//         confirmText="Delete"
//       />

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-white">Authors</h1>
//           <p className="text-gray-400 mt-1 text-sm">Manage your authors and contributors</p>
//         </div>
//         <button
//           onClick={() => openModal()}
//           className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 transition-all cursor-pointer font-medium text-sm w-full sm:w-auto"
//         >
//           <FiPlus size={18} /> Add Author
//         </button>
//       </div>

//       {/* Search */}
//       <div className="relative mb-6">
//         <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search authors by name, country, or category…"
//           className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-9 pr-10 py-2.5 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors"
//         />
//         {search && (
//           <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white cursor-pointer">
//             <FiX size={14} />
//           </button>
//         )}
//       </div>

//       {search && (
//         <p className="text-gray-500 text-xs mb-4">
//           {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{search}"
//         </p>
//       )}

//       {/* Author cards */}
//       {loading ? (
//         <div className="flex justify-center py-16">
//           <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#F5C645]" />
//         </div>
//       ) : filtered.length === 0 ? (
//         <div className="text-center py-16 bg-gray-900/40 rounded-2xl">
//           <p className="text-gray-400 text-sm">
//             {search ? `No authors match "${search}".` : 'No authors yet. Click "Add Author" to create one.'}
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//           {filtered.map((author) => {
//             const avatarSrc = resolveImg(author.profileImage);
//             return (
//               <div key={author._id}
//                 className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl p-5 sm:p-6 hover:border-[#F5C645]/40 transition-all duration-300">
//                 <div className="flex items-start gap-3 mb-4">
//                   {avatarSrc ? (
//                     <img
//                       src={avatarSrc}
//                       alt={author.name}
//                       className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shrink-0"
//                     />
//                   ) : (
//                     <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F5C645]/20 flex items-center justify-center shrink-0">
//                       <FiUser className="text-[#F5C645]" size={20} />
//                     </div>
//                   )}
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-white text-base sm:text-lg font-semibold truncate">{author.name}</h3>
//                     <p className="text-[#F5C645] text-xs mt-0.5">{author.category?.name}</p>
//                     <p className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
//                       <FiMapPin size={10} />{author.country || 'Unknown'}
//                     </p>
//                   </div>
//                   <div className="flex gap-1 shrink-0">
//                     <button onClick={() => openModal(author)} className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded-lg cursor-pointer"><FiEdit2 size={16} /></button>
//                     <button onClick={() => setConfirm({ open: true, id: author._id, name: author.name })}
//                       className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg cursor-pointer"><FiTrash2 size={16} /></button>
//                   </div>
//                 </div>
//                 <p className="text-gray-400 text-sm line-clamp-3 mb-4">{author.bio}</p>
//                 <div className="flex gap-3 pt-3 border-t border-gray-800">
//                   {author.social?.twitter && <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#F5C645]"><FiTwitter size={14} /></a>}
//                   {author.social?.medium  && <a href={author.social.medium}  target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#F5C645]"><FaMedium size={14} /></a>}
//                   {author.social?.quora   && <a href={author.social.quora}   target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#F5C645]"><FaQuora size={14} /></a>}
//                   {author.social?.reddit  && <a href={author.social.reddit}  target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#F5C645]"><FaRedditAlien size={14} /></a>}
//                   {author.websiteLink     && <a href={author.websiteLink}    target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#F5C645]"><FiGlobe size={14} /></a>}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* ══════════════════════ MODAL ══════════════════════ */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/85 overflow-y-auto z-50 p-3 sm:p-4">
//           <div className="max-w-2xl mx-auto my-4 sm:my-8">
//             <div className="bg-[#0d0d0d] border border-[#F5C645]/20 rounded-2xl">
//               <div className="flex justify-between items-center px-5 sm:px-6 py-4 border-b border-gray-800 sticky top-0 bg-[#0d0d0d]/95 backdrop-blur rounded-t-2xl z-10">
//                 <h2 className="text-white text-lg sm:text-xl font-semibold">{editingAuthor ? 'Edit Author' : 'Add Author'}</h2>
//                 <button onClick={closeModal} className="text-gray-400 hover:text-white cursor-pointer p-1"><FiX size={20} /></button>
//               </div>

//               <form onSubmit={handleSubmit} className="px-5 sm:px-6 pb-6 pt-4 space-y-5 max-h-[80vh] overflow-y-auto">
//                 {formErrors.api && (
//                   <div className="flex items-start gap-3 bg-red-950/60 border border-red-500/40 text-red-300 px-4 py-3 rounded-xl text-sm">
//                     <FiAlertCircle size={15} className="shrink-0 mt-0.5" />{formErrors.api}
//                   </div>
//                 )}

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-gray-300 mb-1.5 text-sm">Name <span className="text-red-400">*</span></label>
//                     <input type="text" {...f('name')} className={inpCls('name')} placeholder="Full name" />
//                     {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
//                   </div>
//                   <div>
//                     <label className="block text-gray-300 mb-1.5 text-sm">Gender</label>
//                     <select {...f('gender')} className={inpCls('gender') + ' cursor-pointer'}>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-gray-300 mb-1.5 text-sm">Country <span className="text-red-400">*</span></label>
//                     <input type="text" {...f('country')} className={inpCls('country')} placeholder="e.g. United Kingdom" />
//                     {formErrors.country && <p className="text-red-400 text-xs mt-1">{formErrors.country}</p>}
//                   </div>
//                   <div>
//                     <label className="block text-gray-300 mb-1.5 text-sm">Email <span className="text-red-400">*</span></label>
//                     <input type="email" {...f('email')} className={inpCls('email')} placeholder="author@example.com" />
//                     {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
//                   </div>
//                   <div>
//                     <label className="block text-gray-300 mb-1.5 text-sm">Category <span className="text-red-400">*</span></label>
//                     <select value={formData.category}
//                       onChange={(e) => { setFormData((p) => ({ ...p, category: e.target.value })); setFormErrors((p) => ({ ...p, category: '' })); }}
//                       className={inpCls('category') + ' cursor-pointer'}>
//                       <option value="">Select Category</option>
//                       {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
//                     </select>
//                     {formErrors.category && <p className="text-red-400 text-xs mt-1">{formErrors.category}</p>}
//                   </div>
//                   <div>
//                     <label className="block text-gray-300 mb-1.5 text-sm">Website URL</label>
//                     <input type="url" {...f('websiteLink')} placeholder="https://example.com" className={inpCls('websiteLink')} />
//                     {formErrors.websiteLink && <p className="text-red-400 text-xs mt-1">{formErrors.websiteLink}</p>}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-gray-300 mb-1.5 text-sm">Bio <span className="text-red-400">*</span></label>
//                   <textarea {...f('bio')} rows={4} className={inpCls('bio')} placeholder="Short author biography…" />
//                   {formErrors.bio && <p className="text-red-400 text-xs mt-1">{formErrors.bio}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-gray-300 mb-1.5 text-sm">Profile Image</label>
//                   <p className="text-gray-500 text-xs mb-2">Only .webp format · Under 100 KB · Uploaded to ImageKit CDN</p>
//                   <input type="file" accept=".webp,image/webp" onChange={handleImageChange}
//                     className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645] file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-[#F5C645] file:text-black hover:file:bg-[#F5C645]/90 file:cursor-pointer cursor-pointer" />
//                   {imagePreview && <img src={imagePreview} alt="preview" className="mt-3 h-16 w-16 rounded-full object-cover" />}
//                   <ImageToast message={imageToast} onClose={() => setImageToast('')} />
//                 </div>

//                 <div>
//                   <p className="text-[#F5C645] font-semibold text-sm uppercase tracking-wider mb-3">Social Links</p>
//                   <div className="space-y-3">
//                     {[
//                       { key: 'twitter', icon: <FiTwitter size={15} />, ph: 'https://x.com/...' },
//                       { key: 'quora',   icon: <FaQuora size={15} />,   ph: 'https://quora.com/...' },
//                       { key: 'reddit',  icon: <FaRedditAlien size={15} />, ph: 'https://reddit.com/...' },
//                       { key: 'medium',  icon: <FaMedium size={15} />,  ph: 'https://medium.com/...' },
//                     ].map(({ key, icon, ph }) => (
//                       <div key={key}>
//                         <div className="flex items-center gap-3">
//                           <span className="text-gray-500 shrink-0">{icon}</span>
//                           <input type="url" value={formData.social[key]}
//                             onChange={(e) => setSocial(key, e.target.value)}
//                             placeholder={ph}
//                             className={`flex-1 bg-gray-900 border rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors ${formErrors[`social_${key}`] ? 'border-red-500' : 'border-gray-700'}`} />
//                         </div>
//                         {formErrors[`social_${key}`] && <p className="text-red-400 text-xs mt-1 ml-6">{formErrors[`social_${key}`]}</p>}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="flex gap-3 pt-2">
//                   <button type="button" onClick={closeModal} disabled={saving}
//                     className="flex-1 py-2.5 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-all cursor-pointer text-sm">
//                     Cancel
//                   </button>
//                   <button type="submit" disabled={saving}
//                     className="flex-1 py-2.5 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 transition-all font-semibold disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 text-sm">
//                     <FiSave size={15} />
//                     {saving ? 'Saving…' : editingAuthor ? 'Update Author' : 'Save Author'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// app/admin/authors/page.jsx
"use client";

import { useState, useEffect } from "react";
import {
  FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiTwitter, FiGlobe,
  FiUser, FiMapPin, FiAlertCircle, FiSearch, FiLink,
} from "react-icons/fi";
import { FaQuora, FaRedditAlien, FaMedium } from "react-icons/fa";
import { authorsAdminAPI, categoriesAdminAPI } from "@/services/adminAPI";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const resolveImg = (src) => {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  return `${API_BASE.replace("/api", "")}${src}`;
};

function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function ImageToast({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="flex items-start gap-3 bg-red-950/60 border border-red-500/40 text-red-300 px-4 py-3 rounded-xl text-sm mt-2">
      <FiAlertCircle size={15} className="shrink-0 mt-0.5" />
      <span className="flex-1">{message}</span>
      <button type="button" onClick={onClose} className="shrink-0 hover:text-red-200 cursor-pointer">
        <FiX size={13} />
      </button>
    </div>
  );
}

const EMPTY_FORM = {
  name: "", slug: "", gender: "Male", country: "", bio: "",
  websiteLink: "", email: "", category: "",
  social: { twitter: "", quora: "", reddit: "", medium: "" },
};

export default function AuthorsPage() {
  const [authors, setAuthors]           = useState([]);
  const [filtered, setFiltered]         = useState([]);
  const [search, setSearch]             = useState("");
  const [categories, setCategories]     = useState([]);
  const [loading, setLoading]           = useState(true);
  const [showModal, setShowModal]       = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [imageFile, setImageFile]       = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageToast, setImageToast]     = useState("");
  const [formData, setFormData]         = useState(EMPTY_FORM);
  const [formErrors, setFormErrors]     = useState({});
  const [saving, setSaving]             = useState(false);
  const [confirm, setConfirm]           = useState({ open: false, id: null, name: "" });
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  useEffect(() => { fetchAuthors(); fetchCategories(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      q
        ? authors.filter(
            (a) =>
              a.name.toLowerCase().includes(q) ||
              a.country?.toLowerCase().includes(q) ||
              a.category?.name?.toLowerCase().includes(q)
          )
        : authors
    );
  }, [search, authors]);

  async function fetchAuthors() {
    try { const r = await authorsAdminAPI.getAll(); setAuthors(r.data); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  async function fetchCategories() {
    try { const r = await categoriesAdminAPI.getAll(); setCategories(r.data); }
    catch (e) { console.error(e); }
  }

  function handleNameChange(value) {
    const updated = { ...formData, name: value };
    if (!slugManuallyEdited) {
      updated.slug = generateSlug(value);
    }
    setFormData(updated);
    if (formErrors.name) setFormErrors((p) => ({ ...p, name: "" }));
    if (formErrors.api)  setFormErrors((p) => ({ ...p, api: "" }));
  }

  function handleSlugChange(value) {
    setSlugManuallyEdited(true);
    setFormData((p) => ({ ...p, slug: value.toLowerCase().replace(/[^a-z0-9-]/g, "") }));
    if (formErrors.slug) setFormErrors((p) => ({ ...p, slug: "" }));
  }

  function validate() {
    const e = {};
    if (!formData.name.trim())    e.name     = "Name is required.";
    if (!formData.slug.trim())    e.slug     = "Slug is required.";
    if (!formData.category)       e.category = "Category is required.";
    if (!formData.country.trim()) e.country  = "Country is required.";
    if (!formData.bio.trim())     e.bio      = "Bio is required.";
    if (!formData.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = "Invalid email address.";
    }
    if (formData.websiteLink && !/^https?:\/\/.+/.test(formData.websiteLink))
      e.websiteLink = "Must start with http:// or https://";
    ["twitter", "quora", "reddit", "medium"].forEach((f) => {
      const v = formData.social[f];
      if (v && !/^https?:\/\/.+/.test(v)) e[`social_${f}`] = "Must start with http:// or https://";
    });
    setFormErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleImageChange(e) {
    const f = e.target.files[0]; if (!f) return;
    if (f.type !== "image/webp") { setImageToast("Only .webp images are allowed."); e.target.value = ""; return; }
    setImageToast("");
    setImageFile(f);
    const r = new FileReader();
    r.onloadend = () => setImagePreview(r.result);
    r.readAsDataURL(f);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("data", JSON.stringify(formData));
      if (imageFile) fd.append("profileImage", imageFile);
      if (editingAuthor) {
        await authorsAdminAPI.update(editingAuthor._id, fd);
      } else {
        await authorsAdminAPI.create(fd);
      }
      await fetchAuthors();
      closeModal();
    } catch (err) {
      setFormErrors({ api: err.response?.data?.message || "Failed to save author." });
    } finally {
      setSaving(false);
    }
  }

  function openModal(author = null) {
    if (author) {
      setEditingAuthor(author);
      setFormData({
        name:        author.name || "",
        slug:        author.slug || generateSlug(author.name || ""),
        gender:      author.gender || "Male",
        country:     author.country || "",
        bio:         author.bio || "",
        websiteLink: author.websiteLink || "",
        email:       author.email || "",
        category:    author.category?._id || author.category || "",
        social:      author.social || { twitter: "", quora: "", reddit: "", medium: "" },
      });
      setSlugManuallyEdited(true); // don't auto-overwrite slug when editing
      setImagePreview(author.profileImage ? resolveImg(author.profileImage) : "");
    } else {
      setEditingAuthor(null);
      setFormData(EMPTY_FORM);
      setImagePreview("");
      setImageFile(null);
      setSlugManuallyEdited(false);
    }
    setFormErrors({});
    setImageToast("");
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingAuthor(null);
    setImageFile(null);
    setImagePreview("");
    setFormErrors({});
    setImageToast("");
    setSlugManuallyEdited(false);
  }

  function setSocial(key, val) {
    setFormData((p) => ({ ...p, social: { ...p.social, [key]: val } }));
    if (formErrors[`social_${key}`]) setFormErrors((p) => ({ ...p, [`social_${key}`]: "" }));
  }

  const inpCls = (key) =>
    `w-full bg-gray-900 border rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors ${
      formErrors[key] ? "border-red-500" : "border-gray-700"
    }`;

  return (
    <div>
      <ConfirmDialog
        isOpen={confirm.open}
        title="Delete Author"
        message={`Delete "${confirm.name}"? This cannot be undone.`}
        onConfirm={async () => {
          try { await authorsAdminAPI.delete(confirm.id); await fetchAuthors(); }
          catch (err) { alert(err.response?.data?.message || "Failed to delete author."); }
          finally { setConfirm({ open: false, id: null, name: "" }); }
        }}
        onCancel={() => setConfirm({ open: false, id: null, name: "" })}
        confirmText="Delete"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Authors</h1>
          <p className="text-gray-400 mt-1 text-sm">Manage your authors and contributors</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 transition-all cursor-pointer font-medium text-sm w-full sm:w-auto"
        >
          <FiPlus size={18} /> Add Author
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search authors by name, country, or category…"
          className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-9 pr-10 py-2.5 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white cursor-pointer">
            <FiX size={14} />
          </button>
        )}
      </div>

      {search && (
        <p className="text-gray-500 text-xs mb-4">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{search}"
        </p>
      )}

      {/* Author cards */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#F5C645]" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-gray-900/40 rounded-2xl">
          <p className="text-gray-400 text-sm">
            {search ? `No authors match "${search}".` : 'No authors yet. Click "Add Author" to create one.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((author) => {
            const avatarSrc = resolveImg(author.profileImage);
            return (
              <div key={author._id}
                className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl p-5 sm:p-6 hover:border-[#F5C645]/40 transition-all duration-300">
                <div className="flex items-start gap-3 mb-4">
                  {avatarSrc ? (
                    <img src={avatarSrc} alt={author.name} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F5C645]/20 flex items-center justify-center shrink-0">
                      <FiUser className="text-[#F5C645]" size={20} />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-base sm:text-lg font-semibold truncate">{author.name}</h3>
                    <p className="text-[#F5C645] text-xs mt-0.5">{author.category?.name}</p>
                    <p className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                      <FiMapPin size={10} />{author.country || "Unknown"}
                    </p>
                    {/* {author.slug && (
                      <p className="text-gray-600 text-xs flex items-center gap-1 mt-0.5">
                        <FiLink size={10} />/authors/{author.slug}
                      </p>
                    )} */}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => openModal(author)} className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded-lg cursor-pointer"><FiEdit2 size={16} /></button>
                    <button onClick={() => setConfirm({ open: true, id: author._id, name: author.name })}
                      className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg cursor-pointer"><FiTrash2 size={16} /></button>
                  </div>
                </div>
                <p className="text-gray-400 text-sm line-clamp-3 mb-4">{author.bio}</p>
                <div className="flex gap-3 pt-3 border-t border-gray-800">
                  {author.social?.twitter && <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#F5C645]"><FiTwitter size={14} /></a>}
                  {author.social?.medium  && <a href={author.social.medium}  target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#F5C645]"><FaMedium size={14} /></a>}
                  {author.social?.quora   && <a href={author.social.quora}   target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#F5C645]"><FaQuora size={14} /></a>}
                  {author.social?.reddit  && <a href={author.social.reddit}  target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#F5C645]"><FaRedditAlien size={14} /></a>}
                  {author.websiteLink     && <a href={author.websiteLink}    target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#F5C645]"><FiGlobe size={14} /></a>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ══════════════════════ MODAL ══════════════════════ */}
      {showModal && (
        <div className="fixed inset-0 bg-black/85 overflow-y-auto z-50 p-3 sm:p-4">
          <div className="max-w-2xl mx-auto my-4 sm:my-8">
            <div className="bg-[#0d0d0d] border border-[#F5C645]/20 rounded-2xl">
              <div className="flex justify-between items-center px-5 sm:px-6 py-4 border-b border-gray-800 sticky top-0 bg-[#0d0d0d]/95 backdrop-blur rounded-t-2xl z-10">
                <h2 className="text-white text-lg sm:text-xl font-semibold">{editingAuthor ? "Edit Author" : "Add Author"}</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-white cursor-pointer p-1"><FiX size={20} /></button>
              </div>

              <form onSubmit={handleSubmit} className="px-5 sm:px-6 pb-6 pt-4 space-y-5 max-h-[80vh] overflow-y-auto">
                {formErrors.api && (
                  <div className="flex items-start gap-3 bg-red-950/60 border border-red-500/40 text-red-300 px-4 py-3 rounded-xl text-sm">
                    <FiAlertCircle size={15} className="shrink-0 mt-0.5" />{formErrors.api}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-gray-300 mb-1.5 text-sm">Name <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      className={inpCls("name")}
                      placeholder="Full name"
                    />
                    {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-gray-300 mb-1.5 text-sm">
                      Slug <span className="text-red-400">*</span>
                      <span className="text-gray-500 text-xs ml-1">(auto-generated)</span>
                    </label>
                    <div className="relative">
                      <FiLink size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => handleSlugChange(e.target.value)}
                        className={`${inpCls("slug")} pl-8`}
                        placeholder="author-slug"
                      />
                    </div>
                    {formErrors.slug && <p className="text-red-400 text-xs mt-1">{formErrors.slug}</p>}
                    {formData.slug && (
                      <p className="text-gray-600 text-xs mt-1">/authors/{formData.slug}</p>
                    )}
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-gray-300 mb-1.5 text-sm">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData((p) => ({ ...p, gender: e.target.value }))}
                      className={inpCls("gender") + " cursor-pointer"}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-gray-300 mb-1.5 text-sm">Country <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => { setFormData((p) => ({ ...p, country: e.target.value })); setFormErrors((p) => ({ ...p, country: "" })); }}
                      className={inpCls("country")}
                      placeholder="e.g. United Kingdom"
                    />
                    {formErrors.country && <p className="text-red-400 text-xs mt-1">{formErrors.country}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-300 mb-1.5 text-sm">Email <span className="text-red-400">*</span></label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => { setFormData((p) => ({ ...p, email: e.target.value })); setFormErrors((p) => ({ ...p, email: "" })); }}
                      className={inpCls("email")}
                      placeholder="author@example.com"
                    />
                    {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-gray-300 mb-1.5 text-sm">Category <span className="text-red-400">*</span></label>
                    <select
                      value={formData.category}
                      onChange={(e) => { setFormData((p) => ({ ...p, category: e.target.value })); setFormErrors((p) => ({ ...p, category: "" })); }}
                      className={inpCls("category") + " cursor-pointer"}
                    >
                      <option value="">Select Category</option>
                      {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                    {formErrors.category && <p className="text-red-400 text-xs mt-1">{formErrors.category}</p>}
                  </div>

                  {/* Website */}
                  <div className="sm:col-span-2">
                    <label className="block text-gray-300 mb-1.5 text-sm">Website URL</label>
                    <input
                      type="url"
                      value={formData.websiteLink}
                      onChange={(e) => { setFormData((p) => ({ ...p, websiteLink: e.target.value })); setFormErrors((p) => ({ ...p, websiteLink: "" })); }}
                      placeholder="https://example.com"
                      className={inpCls("websiteLink")}
                    />
                    {formErrors.websiteLink && <p className="text-red-400 text-xs mt-1">{formErrors.websiteLink}</p>}
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-gray-300 mb-1.5 text-sm">Bio <span className="text-red-400">*</span></label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => { setFormData((p) => ({ ...p, bio: e.target.value })); setFormErrors((p) => ({ ...p, bio: "" })); }}
                    rows={4}
                    className={inpCls("bio")}
                    placeholder="Short author biography…"
                  />
                  {formErrors.bio && <p className="text-red-400 text-xs mt-1">{formErrors.bio}</p>}
                </div>

                {/* Profile Image */}
                <div>
                  <label className="block text-gray-300 mb-1.5 text-sm">Profile Image</label>
                  <p className="text-gray-500 text-xs mb-2">Only .webp format · Under 100 KB · Uploaded to ImageKit CDN</p>
                  <input
                    type="file"
                    accept=".webp,image/webp"
                    onChange={handleImageChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645] file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-[#F5C645] file:text-black hover:file:bg-[#F5C645]/90 file:cursor-pointer cursor-pointer"
                  />
                  {imagePreview && <img src={imagePreview} alt="preview" className="mt-3 h-16 w-16 rounded-full object-cover" />}
                  <ImageToast message={imageToast} onClose={() => setImageToast("")} />
                </div>

                {/* Social Links */}
                <div>
                  <p className="text-[#F5C645] font-semibold text-sm uppercase tracking-wider mb-3">Social Links</p>
                  <div className="space-y-3">
                    {[
                      { key: "twitter", icon: <FiTwitter size={15} />, ph: "https://x.com/..." },
                      { key: "quora",   icon: <FaQuora size={15} />,   ph: "https://quora.com/..." },
                      { key: "reddit",  icon: <FaRedditAlien size={15} />, ph: "https://reddit.com/..." },
                      { key: "medium",  icon: <FaMedium size={15} />,  ph: "https://medium.com/..." },
                    ].map(({ key, icon, ph }) => (
                      <div key={key}>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500 shrink-0">{icon}</span>
                          <input
                            type="url"
                            value={formData.social[key]}
                            onChange={(e) => setSocial(key, e.target.value)}
                            placeholder={ph}
                            className={`flex-1 bg-gray-900 border rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors ${formErrors[`social_${key}`] ? "border-red-500" : "border-gray-700"}`}
                          />
                        </div>
                        {formErrors[`social_${key}`] && <p className="text-red-400 text-xs mt-1 ml-6">{formErrors[`social_${key}`]}</p>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={closeModal} disabled={saving}
                    className="flex-1 py-2.5 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-all cursor-pointer text-sm">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving}
                    className="flex-1 py-2.5 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 transition-all font-semibold disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 text-sm">
                    <FiSave size={15} />
                    {saving ? "Saving…" : editingAuthor ? "Update Author" : "Save Author"}
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