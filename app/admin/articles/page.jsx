
// // app/admin/articles/page.jsx
// // ✅ Updated for ImageKit — images are stored as full absolute URLs

// "use client";

// import { useState, useEffect } from "react";
// import {
//   FiPlus, FiEdit2, FiTrash2, FiEye, FiCalendar, FiClock, FiSave,
//   FiX, FiHash, FiImage, FiFileText, FiAlignLeft, FiUpload, FiTrash,
//   FiAlertCircle, FiSearch,
// } from "react-icons/fi";
// import { articlesAdminAPI, categoriesAdminAPI, authorsAdminAPI } from "@/services/adminAPI";
// import ConfirmDialog from "@/components/admin/ConfirmDialog";
// import Link from "next/link";

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
//     <div className="flex items-start gap-3 bg-red-950/60 border border-red-500/40 text-red-300 px-4 py-3 rounded-xl text-sm mt-3">
//       <FiAlertCircle size={15} className="shrink-0 mt-0.5" />
//       <span className="flex-1">{message}</span>
//       <button type="button" onClick={onClose} className="shrink-0 hover:text-red-200 cursor-pointer"><FiX size={13} /></button>
//     </div>
//   );
// }

// function Section({ icon, title, children }) {
//   return (
//     <div className="space-y-4">
//       <h3 className="text-[#F5C645] font-semibold flex items-center gap-2 text-sm uppercase tracking-wider">{icon}{title}</h3>
//       {children}
//     </div>
//   );
// }

// function Field({ label, required, error, children }) {
//   return (
//     <div>
//       <label className="block text-gray-300 mb-1.5 text-sm">
//         {label}{required && <span className="text-red-400 ml-0.5">*</span>}
//       </label>
//       {children}
//       {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
//     </div>
//   );
// }

// function ContentBlock({ block, index, total, onUpdate, onRemove, onMove, onImagePick, onImageClear, errors }) {
//   const tagColor = {
//     paragraph:  'bg-blue-900/40 text-blue-400 border-blue-700/40',
//     subheading: 'bg-purple-900/40 text-purple-400 border-purple-700/40',
//     fullquote:  'bg-green-900/40 text-green-400 border-green-700/40',
//     image:      'bg-orange-900/40 text-orange-400 border-orange-700/40',
//   };
//   const inp = 'w-full bg-black/50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors';
//   const errorInp = 'border-red-500 focus:border-red-500';
//   const blockError = errors?.[index];

//   return (
//     <div className="rounded-xl border border-gray-800 overflow-hidden bg-[#111]">
//       <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-gray-800 bg-gray-900/60">
//         <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${tagColor[block.type]}`}>{block.type}</span>
//         <div className="flex items-center gap-1">
//           <button type="button" onClick={() => onMove(index, -1)} disabled={index === 0}
//             className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-white disabled:opacity-20 cursor-pointer text-xs">▲</button>
//           <button type="button" onClick={() => onMove(index, 1)} disabled={index === total - 1}
//             className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-white disabled:opacity-20 cursor-pointer text-xs">▼</button>
//           <button type="button" onClick={() => onRemove(index)}
//             className="w-6 h-6 flex items-center justify-center text-red-400 hover:text-red-300 cursor-pointer ml-1"><FiTrash size={13} /></button>
//         </div>
//       </div>
//       <div className="p-3 sm:p-4 space-y-2">
//         {block.type === 'paragraph' && (
//           <>
//             <textarea value={block.text} onChange={(e) => onUpdate(index, 'text', e.target.value)}
//               placeholder="Enter paragraph text…" rows={3} className={`${inp} ${blockError?.text ? errorInp : ''}`} />
//             {blockError?.text && <p className="text-red-400 text-xs mt-1">{blockError.text}</p>}
//           </>
//         )}
//         {block.type === 'subheading' && (
//           <>
//             <input type="text" value={block.text} onChange={(e) => onUpdate(index, 'text', e.target.value)}
//               placeholder="Enter subheading…" className={`${inp} ${blockError?.text ? errorInp : ''}`} />
//             {blockError?.text && <p className="text-red-400 text-xs mt-1">{blockError.text}</p>}
//           </>
//         )}
//         {block.type === 'pullquote' && (
//           <>
//             <textarea value={block.text} onChange={(e) => onUpdate(index, 'text', e.target.value)}
//               placeholder="Quote text…" rows={2} className={`${inp} ${blockError?.text ? errorInp : ''}`} />
//             {blockError?.text && <p className="text-red-400 text-xs mt-1">{blockError.text}</p>}
//             <input type="text" value={block.attribution} onChange={(e) => onUpdate(index, 'attribution', e.target.value)}
//               placeholder="Attribution (optional)" className={inp} />
//           </>
//         )}
//         {block.type === 'image' && (
//           <div className="space-y-2">
//             <p className="text-gray-500 text-xs">Only .webp · Under 100 KB · Uploaded to ImageKit CDN</p>
//             <div className="flex items-center gap-3">
//               <label className="flex-1 cursor-pointer">
//                 <div className={`border-2 border-dashed rounded-lg p-3 text-center transition-all bg-black/30 ${blockError?.src ? 'border-red-500' : 'border-gray-700 hover:border-[#F5C645]'}`}>
//                   <FiUpload className="mx-auto text-gray-500 mb-1" size={16} />
//                   <span className="text-gray-500 text-xs">{block.imagePreview ? 'Replace image' : 'Upload .webp image'}</span>
//                 </div>
//                 <input type="file" accept=".webp,image/webp"
//                   onChange={(e) => { if (e.target.files[0]) onImagePick(index, e.target.files[0]); e.target.value = ''; }}
//                   className="hidden" />
//               </label>
//               {block.imagePreview && (
//                 <div className="relative shrink-0">
//                   <img src={block.imagePreview} alt="preview" className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover" />
//                   <button type="button" onClick={() => onImageClear(index)}
//                     className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600">
//                     <FiX size={10} />
//                   </button>
//                 </div>
//               )}
//             </div>
//             {blockError?.src && <p className="text-red-400 text-xs">{blockError.src}</p>}
//             <input type="text" value={block.alt} onChange={(e) => onUpdate(index, 'alt', e.target.value)} placeholder="Alt text (SEO)" className={inp} />
//             <input type="text" value={block.caption} onChange={(e) => onUpdate(index, 'caption', e.target.value)} placeholder="Caption (optional)" className={inp} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// const EMPTY_FORM = {
//   title: '', slug: '', metaTitle: '', metaDescription: '', excerpt: '',
//   category: '', newsType: 'news', type: 'normal',
//   date: new Date().toISOString().split('T')[0],
//   readTime: '', isPublished: true, imageAlt: '', keywords: '', tags: '', author: '',
// };

// export default function ArticlesPage() {
//   const [articles, setArticles]       = useState([]);
//   const [filtered, setFiltered]       = useState([]);
//   const [search, setSearch]           = useState("");
//   const [categories, setCategories]   = useState([]);
//   const [authors, setAuthors]         = useState([]);
//   const [loading, setLoading]         = useState(true);
//   const [showModal, setShowModal]     = useState(false);
//   const [editingArticle, setEditingArticle] = useState(null);
//   const [selectedCat, setSelectedCat] = useState('');
//   const [contentBlocks, setContentBlocks] = useState([]);
//   const [formData, setFormData]       = useState(EMPTY_FORM);
//   const [formErrors, setFormErrors]   = useState({});
//   const [mainImgFile, setMainImgFile] = useState(null);
//   const [mainImgPreview, setMainImgPreview] = useState('');
//   const [imageToast, setImageToast]   = useState('');
//   const [saving, setSaving]           = useState(false);
//   const [confirm, setConfirm]         = useState({ open: false, id: null, title: '' });
//   const [contentErrors, setContentErrors] = useState({});
//   const [selectedCategoryName, setSelectedCategoryName] = useState('');

//   useEffect(() => { loadAll(); }, []);

//   useEffect(() => {
//     const q = search.toLowerCase();
//     setFiltered(
//       q
//         ? articles.filter(
//             (a) =>
//               a.title?.toLowerCase().includes(q) ||
//               a.excerpt?.toLowerCase().includes(q) ||
//               a.category?.name?.toLowerCase().includes(q) ||
//               a.author?.name?.toLowerCase().includes(q) ||
//               a.slug?.toLowerCase().includes(q)
//           )
//         : articles
//     );
//   }, [search, articles]);

//   async function loadAll() {
//     setLoading(true);
//     await Promise.all([fetchArticles(''), fetchCategories(), fetchAuthors()]);
//     setLoading(false);
//   }

//   async function fetchArticles(catId) {
//     try { const r = await articlesAdminAPI.getAll(catId); setArticles(r.data); }
//     catch (e) { console.error(e); }
//   }
//   async function fetchCategories() {
//     try { const r = await categoriesAdminAPI.getAll(); setCategories(r.data); }
//     catch (e) { console.error(e); }
//   }
//   async function fetchAuthors() {
//     try { const r = await authorsAdminAPI.getAll(); setAuthors(r.data); }
//     catch (e) { console.error(e); }
//   }

//   function getAuthorByCategory(categoryId) {
//     if (!categoryId) return '';
//     const selectedCategory = categories.find((cat) => cat._id === categoryId);
//     if (!selectedCategory) return '';
//     setSelectedCategoryName(selectedCategory.name);
//     const matchedAuthor = authors.find((author) => {
//       if (!author.category) return false;
//       const authorCategory =
//         typeof author.category === 'string'
//           ? author.category
//           : author.category?.name || author.category?._id || '';
//       return authorCategory.toLowerCase() === selectedCategory.name.toLowerCase();
//     });
//     return matchedAuthor ? matchedAuthor._id : '';
//   }

//   function handleCategoryChange(categoryId) {
//     setFormData((prev) => ({ ...prev, category: categoryId }));
//     setFormErrors((prev) => ({ ...prev, category: '' }));
//     const autoAuthorId = getAuthorByCategory(categoryId);
//     setFormData((prev) => ({ ...prev, category: categoryId, author: autoAuthorId || '' }));
//   }

//   function getAuthorName() {
//     if (!formData.author) return '';
//     const author = authors.find((a) => a._id === formData.author);
//     return author ? author.name : '';
//   }

//   function checkImage(file) {
//     if (file.type !== 'image/webp') return 'Only .webp format is allowed.';
//     return null;
//   }

//   function handleMainImg(e) {
//     const f = e.target.files[0]; if (!f) return;
//     const err = checkImage(f);
//     if (err) { setImageToast(err); e.target.value = ''; return; }
//     setMainImgFile(f);
//     const r = new FileReader();
//     r.onloadend = () => setMainImgPreview(r.result);
//     r.readAsDataURL(f);
//     if (formErrors.mainImage) setFormErrors((prev) => ({ ...prev, mainImage: '' }));
//   }

//   function addBlock(type) {
//     const b = { type };
//     if (type === 'paragraph' || type === 'subheading') b.text = '';
//     if (type === 'pullquote') { b.text = ''; b.attribution = ''; }
//     if (type === 'image') { b.src = ''; b.imageFile = null; b.imagePreview = ''; b.alt = ''; b.caption = ''; }
//     setContentBlocks((p) => [...p, b]);
//     if (formErrors.content) setFormErrors((prev) => ({ ...prev, content: '' }));
//   }

//   function updateBlock(i, key, val) {
//     setContentBlocks((p) => p.map((b, idx) => idx === i ? { ...b, [key]: val } : b));
//     if (contentErrors[i]?.[key]) setContentErrors((prev) => ({ ...prev, [i]: { ...prev[i], [key]: '' } }));
//     if (formErrors.content) setFormErrors((prev) => ({ ...prev, content: '' }));
//   }

//   function pickBlockImage(i, file) {
//     const err = checkImage(file);
//     if (err) { setImageToast(err); return; }
//     const r = new FileReader();
//     r.onloadend = () => {
//       setContentBlocks((p) => p.map((b, idx) => idx === i ? { ...b, imageFile: file, imagePreview: r.result, src: '__NEW_UPLOAD__' } : b));
//       if (contentErrors[i]?.src) setContentErrors((prev) => ({ ...prev, [i]: { ...prev[i], src: '' } }));
//     };
//     r.readAsDataURL(file);
//   }

//   function clearBlockImage(i) {
//     setContentBlocks((p) => p.map((b, idx) => idx === i ? { ...b, imageFile: null, imagePreview: '', src: '' } : b));
//   }

//   function removeBlock(i) {
//     setContentBlocks((p) => p.filter((_, idx) => idx !== i));
//     setContentErrors((prev) => {
//       const n = { ...prev };
//       delete n[i];
//       const re = {};
//       Object.keys(n).forEach((k) => { const nk = parseInt(k) > i ? parseInt(k) - 1 : parseInt(k); re[nk] = n[k]; });
//       return re;
//     });
//     if (formErrors.content) setFormErrors((prev) => ({ ...prev, content: '' }));
//   }

//   function moveBlock(i, dir) {
//     const arr = [...contentBlocks];
//     const to = i + dir;
//     if (to < 0 || to >= arr.length) return;
//     [arr[i], arr[to]] = [arr[to], arr[i]];
//     setContentBlocks(arr);
//     const re = {};
//     Object.keys(contentErrors).forEach((k) => {
//       const idx = parseInt(k);
//       if (idx === i) re[to] = contentErrors[i];
//       else if (idx === to) re[i] = contentErrors[to];
//       else re[idx] = contentErrors[idx];
//     });
//     setContentErrors(re);
//   }

//   function validateContentBlocks() {
//     const errors = {};
//     let hasValidParagraph = false;
//     contentBlocks.forEach((block, idx) => {
//       const blockErr = {};
//       if (block.type === 'paragraph') {
//         if (!block.text?.trim()) blockErr.text = 'Paragraph text is required.';
//         else hasValidParagraph = true;
//       }
//       if (block.type === 'subheading' && !block.text?.trim()) blockErr.text = 'Subheading text is required.';
//       if (block.type === 'pullquote' && !block.text?.trim()) blockErr.text = 'Quote text is required.';
//       if (block.type === 'image' && !block.src && !block.imageFile) blockErr.src = 'Image is required for image block.';
//       if (Object.keys(blockErr).length > 0) errors[idx] = blockErr;
//     });
//     setContentErrors(errors);
//     return { hasValidParagraph, blockErrors: errors };
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const { hasValidParagraph, blockErrors } = validateContentBlocks();
//     const ge = {};
//     if (!formData.title.trim())           ge.title           = 'Title is required.';
//     if (!formData.slug.trim())            ge.slug            = 'Slug is required.';
//     if (!formData.category)              ge.category         = 'Category is required.';
//     if (!formData.excerpt.trim())         ge.excerpt         = 'Excerpt is required.';
//     if (!formData.readTime.trim())        ge.readTime        = 'Read time is required.';
//     if (!formData.metaTitle.trim())       ge.metaTitle       = 'Meta title is required.';
//     if (!formData.metaDescription.trim()) ge.metaDescription = 'Meta description is required.';
//     if (!formData.imageAlt.trim())        ge.imageAlt        = 'ImageAlt is required.';
//     if (!formData.keywords.trim())        ge.keywords        = 'Keywords are required.';
//     if (!formData.tags.trim())            ge.tags            = 'Tags are required.';
//     if (!editingArticle && !mainImgFile)  ge.mainImage       = 'Featured image is required.';
//     if (!formData.author && formData.category) {
//       const sc = categories.find((cat) => cat._id === formData.category);
//       if (sc) ge.author = `Author is required for ${sc.name} category.`;
//     }
//     if (contentBlocks.length === 0) {
//       ge.content = 'Please add at least one content block (paragraph required).';
//     } else if (!hasValidParagraph) {
//       ge.content = 'At least one paragraph block with text is required.';
//     }
//     setFormErrors(ge);
//     if (Object.keys(ge).length > 0 || Object.keys(blockErrors).length > 0) {
//       const firstError = document.querySelector('.border-red-500, .text-red-400');
//       if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       return;
//     }
//     setSaving(true);
//     try {
//       const cleanContent = contentBlocks.map(({ imageFile, imagePreview, ...rest }) => rest);
//       const articleData = {
//         ...formData,
//         content: cleanContent,
//         keywords: formData.keywords.split(',').map((k) => k.trim()).filter(Boolean),
//         tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
//       };
//       if (!articleData.author) delete articleData.author;
//       const fd = new FormData();
//       fd.append('data', JSON.stringify(articleData));
//       if (mainImgFile) fd.append('mainImage', mainImgFile);
//       contentBlocks.forEach((b) => { if (b.type === 'image' && b.imageFile) fd.append('contentImages', b.imageFile); });
//       if (editingArticle) {
//         await articlesAdminAPI.update(editingArticle._id, fd);
//       } else {
//         await articlesAdminAPI.create(fd);
//       }
//       await fetchArticles(selectedCat);
//       closeModal();
//     } catch (err) {
//       setFormErrors({ api: err.response?.data?.message || 'Error saving article. Please try again.' });
//     } finally {
//       setSaving(false);
//     }
//   }

//   function openModal(article = null) {
//     if (article) {
//       setEditingArticle(article);
//       setFormData({
//         title:           article.title || '',
//         slug:            article.slug || '',
//         metaTitle:       article.metaTitle || '',
//         metaDescription: article.metaDescription || '',
//         excerpt:         article.excerpt || '',
//         category:        article.category?._id || article.category || '',
//         newsType:        article.newsType || 'news',
//         type:            article.type || 'normal',
//         date:            article.date ? new Date(article.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
//         readTime:        article.readTime || '',
//         isPublished:     article.isPublished ?? true,
//         imageAlt:        article.imageAlt || '',
//         keywords:        (article.keywords || []).join(', '),
//         tags:            (article.tags || []).join(', '),
//         author:          article.author?._id || article.author || '',
//       });
//       setContentBlocks(
//         (article.content || []).map((b) =>
//           b.type === 'image'
//             ? { ...b, imageFile: null, imagePreview: b.src ? resolveImg(b.src) : '' }
//             : { ...b }
//         )
//       );
//       // ImageKit URLs are already absolute
//       setMainImgPreview(article.image ? resolveImg(article.image) : '');
//       setMainImgFile(null);
//       const sc = categories.find((cat) => cat._id === (article.category?._id || article.category));
//       if (sc) setSelectedCategoryName(sc.name);
//     } else {
//       setEditingArticle(null);
//       setFormData(EMPTY_FORM);
//       setContentBlocks([]);
//       setMainImgPreview('');
//       setMainImgFile(null);
//       setSelectedCategoryName('');
//     }
//     setFormErrors({});
//     setContentErrors({});
//     setImageToast('');
//     setShowModal(true);
//   }

//   function closeModal() {
//     setShowModal(false);
//     setEditingArticle(null);
//     setContentBlocks([]);
//     setMainImgFile(null);
//     setMainImgPreview('');
//     setFormErrors({});
//     setContentErrors({});
//     setImageToast('');
//     setSaving(false);
//     setSelectedCategoryName('');
//   }

//   function filterCategory(catId) {
//     setSelectedCat(catId);
//     setSearch('');
//     setLoading(true);
//     fetchArticles(catId).then(() => setLoading(false));
//   }

//   const inp = (key) => ({
//     value: formData[key],
//     onChange: (e) => {
//       setFormData((p) => ({ ...p, [key]: e.target.value }));
//       if (formErrors[key]) setFormErrors((p) => ({ ...p, [key]: '' }));
//       if (formErrors.api) setFormErrors((p) => ({ ...p, api: '' }));
//     },
//   });

//   const inpCls = (key) =>
//     `w-full bg-gray-900 border rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors ${formErrors[key] ? 'border-red-500' : 'border-gray-700'}`;

//   return (
//     <div>
//       <ConfirmDialog
//         isOpen={confirm.open}
//         title="Delete Article"
//         message={`Delete "${confirm.title}"? This cannot be undone.`}
//         onConfirm={async () => {
//           try { await articlesAdminAPI.delete(confirm.id); await fetchArticles(selectedCat); }
//           catch (err) { alert(err.response?.data?.message || 'Failed to delete article.'); }
//           finally { setConfirm({ open: false, id: null, title: '' }); }
//         }}
//         onCancel={() => setConfirm({ open: false, id: null, title: '' })}
//         confirmText="Delete"
//       />

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-white">Articles</h1>
//           <p className="text-gray-400 mt-1 text-sm">Manage your news articles</p>
//         </div>
//         <button onClick={() => openModal()}
//           className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 transition-all cursor-pointer font-medium text-sm w-full sm:w-auto">
//           <FiPlus size={18} /> Add Article
//         </button>
//       </div>

//       {/* Category tabs */}
//       <div className="flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
//         {[{ _id: '', name: 'All' }, ...categories].map((c) => (
//           <button key={c._id} onClick={() => filterCategory(c._id)}
//             className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${selectedCat === c._id ? 'bg-[#F5C645] text-black font-semibold' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
//             {c.name}
//           </button>
//         ))}
//       </div>

//       {/* Search */}
//       <div className="relative mb-4">
//         <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search articles by title, slug, author, or category…"
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

//       {/* Article list */}
//       {loading ? (
//         <div className="flex justify-center py-16"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#F5C645]" /></div>
//       ) : filtered.length === 0 ? (
//         <div className="text-center py-16 bg-gray-900/40 rounded-2xl">
//           <p className="text-gray-400 text-sm">{search ? `No articles match "${search}".` : 'No articles found.'}</p>
//         </div>
//       ) : (
//         <div className="space-y-3 sm:space-y-4">
//           {filtered.map((article) => {
//             const thumbSrc = resolveImg(article.image);
//             return (
//               <div key={article._id}
//                 className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-[#F5C645]/40 transition-all">
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   {thumbSrc && (
//                     <div className="sm:w-36 lg:w-44 h-28 sm:h-24 lg:h-28 rounded-lg sm:rounded-xl overflow-hidden shrink-0">
//                       <img src={thumbSrc} alt={article.title} className="w-full h-full object-cover" />
//                     </div>
//                   )}
//                   <div className="flex-1 min-w-0">
//                     <div className="flex justify-between items-start gap-3">
//                       <div className="flex-1 min-w-0">
//                         <div className="flex flex-wrap gap-2 mb-2">
//                           <span className="text-xs px-2 py-0.5 bg-[#F5C645]/20 text-[#F5C645] rounded-full">{article.category?.name}</span>
//                           <span className={`text-xs px-2 py-0.5 rounded-full ${article.isPublished ? 'bg-green-500/15 text-green-400' : 'bg-gray-700/40 text-gray-400'}`}>
//                             {article.isPublished ? 'Published' : 'Draft'}
//                           </span>
//                         </div>
//                         <h3 className="text-white text-base sm:text-lg font-semibold mb-1 line-clamp-2">{article.title}</h3>
//                         <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 hidden sm:block">{article.excerpt}</p>
//                         <div className="flex flex-wrap gap-3 mt-2 text-gray-500 text-xs">
//                           <span className="flex items-center gap-1"><FiCalendar size={10} />{new Date(article.date).toLocaleDateString()}</span>
//                           <span className="flex items-center gap-1"><FiClock size={10} />{article.readTime}</span>
//                         </div>
//                       </div>
//                       <div className="flex gap-1 shrink-0">
//                         <Link href={`/${article.category?.slug || article.category}/${article.slug}`} target="_blank">
//                           <button className="p-1.5 sm:p-2 text-green-400 hover:bg-green-400/10 rounded-lg cursor-pointer"><FiEye size={15} /></button>
//                         </Link>
//                         <button onClick={() => openModal(article)} className="p-1.5 sm:p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg cursor-pointer"><FiEdit2 size={15} /></button>
//                         <button onClick={() => setConfirm({ open: true, id: article._id, title: article.title })}
//                           className="p-1.5 sm:p-2 text-red-400 hover:bg-red-400/10 rounded-lg cursor-pointer"><FiTrash2 size={15} /></button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* ══════════════ MODAL ══════════════ */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/85 overflow-y-auto z-50 p-2 sm:p-4">
//           <div className="max-w-4xl mx-auto my-4 sm:my-8">
//             <div className="bg-[#0d0d0d] border border-[#F5C645]/20 rounded-2xl">
//               <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-800 sticky top-0 bg-[#0d0d0d]/95 backdrop-blur rounded-t-2xl z-10">
//                 <h2 className="text-white text-lg sm:text-xl font-semibold">{editingArticle ? 'Edit Article' : 'Add Article'}</h2>
//                 <button onClick={closeModal} className="text-gray-400 hover:text-white cursor-pointer p-1"><FiX size={20} /></button>
//               </div>

//               <form onSubmit={handleSubmit} className="px-4 sm:px-6 pb-6 pt-4 space-y-6 sm:space-y-8">

//                 {/* Basic Info */}
//                 <Section icon={<FiFileText size={16} />} title="Basic Information">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <Field label="Title" required error={formErrors.title}>
//                       <input type="text" className={inpCls('title')} value={formData.title}
//                         onChange={(e) => {
//                           const v = e.target.value;
//                           setFormData((p) => ({ ...p, title: v, slug: v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }));
//                           if (formErrors.title) setFormErrors((p) => ({ ...p, title: '' }));
//                           if (formErrors.api) setFormErrors((p) => ({ ...p, api: '' }));
//                         }}
//                         placeholder="Article headline" />
//                     </Field>
//                     <Field label="Slug" required error={formErrors.slug}>
//                       <input type="text" {...inp('slug')} className={inpCls('slug')} />
//                     </Field>
//                     <Field label="Category" required error={formErrors.category}>
//                       <select className={inpCls('category') + ' cursor-pointer'} value={formData.category}
//                         onChange={(e) => handleCategoryChange(e.target.value)}>
//                         <option value="">Select Category</option>
//                         {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
//                       </select>
//                     </Field>
//                     <Field label="Author" required error={formErrors.author}>
//                       <div className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm min-h-[38px] flex items-center">
//                         {getAuthorName() || (formData.category ? 'No author found for this category' : 'Select a category first')}
//                       </div>
//                       {formData.category && !getAuthorName() && (
//                         <p className="text-yellow-500 text-xs mt-1">No author assigned to {selectedCategoryName} category. Please add an author with this category.</p>
//                       )}
//                     </Field>
//                     <Field label="News Type">
//                       <select {...inp('newsType')} className={inpCls('newsType') + ' cursor-pointer'}>
//                         <option value="news">News</option>
//                         <option value="client news">Client News</option>
//                         <option value="featured">Featured</option>
//                         <option value="opinion">Opinion</option>
//                       </select>
//                     </Field>
//                     <Field label="Article Type">
//                       <select {...inp('type')} className={inpCls('type') + ' cursor-pointer'}>
//                         <option value="normal">Normal</option>
//                         <option value="featured">Featured</option>
//                         <option value="breaking">Breaking</option>
//                         <option value="exclusive">Exclusive</option>
//                       </select>
//                     </Field>
//                     <Field label="Date">
//                       <input type="date" {...inp('date')} className={inpCls('date') + ' cursor-pointer'} />
//                     </Field>
//                     <Field label="Read Time" required error={formErrors.readTime}>
//                       <input type="text" {...inp('readTime')} placeholder="e.g. 5 Min Read" className={inpCls('readTime')} />
//                     </Field>
//                     <Field label="Status">
//                       <select value={String(formData.isPublished)}
//                         onChange={(e) => setFormData((p) => ({ ...p, isPublished: e.target.value === 'true' }))}
//                         className={inpCls('isPublished') + ' cursor-pointer'}>
//                         <option value="true">Published</option>
//                         <option value="false">Draft</option>
//                       </select>
//                     </Field>
//                   </div>
//                 </Section>

//                 {/* SEO */}
//                 <Section icon={<FiHash size={16} />} title="SEO">
//                   <div className="space-y-4">
//                     <Field label="Meta Title" required error={formErrors.metaTitle}>
//                       <input type="text" {...inp('metaTitle')} className={inpCls('metaTitle')} />
//                     </Field>
//                     <Field label="Meta Description" required error={formErrors.metaDescription}>
//                       <textarea {...inp('metaDescription')} rows={2} className={inpCls('metaDescription')} />
//                     </Field>
//                     <Field label="Excerpt" required error={formErrors.excerpt}>
//                       <textarea value={formData.excerpt} rows={3} className={inpCls('excerpt')}
//                         onChange={(e) => { setFormData((p) => ({ ...p, excerpt: e.target.value })); setFormErrors((p) => ({ ...p, excerpt: '' })); }} />
//                     </Field>
//                   </div>
//                 </Section>

//                 {/* Featured Image */}
//                 <Section icon={<FiImage size={16} />} title="Featured Image">
//                   <p className="text-gray-500 text-xs -mt-2">Only .webp · Under 100 KB · Uploaded to ImageKit CDN</p>
//                   <div className="flex items-center gap-4">
//                     <label className="flex-1 cursor-pointer">
//                       <div className={`border-2 border-dashed rounded-xl p-4 text-center transition-all bg-black/20 ${formErrors.mainImage ? 'border-red-500' : 'border-gray-700 hover:border-[#F5C645]'}`}>
//                         <FiUpload className="mx-auto text-gray-500 mb-2" size={20} />
//                         <p className="text-gray-400 text-sm">Click to upload .webp (under 100 KB)</p>
//                       </div>
//                       <input type="file" accept=".webp,image/webp" onChange={handleMainImg} className="hidden" />
//                     </label>
//                     {mainImgPreview && (
//                       <div className="relative shrink-0">
//                         <img src={mainImgPreview} alt="preview" className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover" />
//                         <button type="button" onClick={() => { setMainImgFile(null); setMainImgPreview(''); }}
//                           className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600">
//                           <FiTrash size={11} />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                   {formErrors.mainImage && <p className="text-red-400 text-xs mt-1">{formErrors.mainImage}</p>}
//                   <Field label="Image Alt Text" required error={formErrors.imageAlt}>
//                     <input type="text" {...inp('imageAlt')} className={inpCls('imageAlt')} />
//                   </Field>
//                 </Section>

//                 {/* Keywords & Tags */}
//                 <Section icon={<FiHash size={16} />} title="Keywords & Tags">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <Field label="Keywords (comma separated)" required error={formErrors.keywords}>
//                       <input type="text" {...inp('keywords')} placeholder="keyword1, keyword2" className={inpCls('keywords')} />
//                     </Field>
//                     <Field label="Tags (comma separated)" required error={formErrors.tags}>
//                       <input type="text" {...inp('tags')} placeholder="tag1, tag2" className={inpCls('tags')} />
//                     </Field>
//                   </div>
//                 </Section>

//                 {/* Content Blocks */}
//                 <Section icon={<FiAlignLeft size={16} />} title="Content">
//                   {/* <div className="flex gap-2 flex-wrap">
//                     {[
//                       { type: 'paragraph',  cls: 'bg-blue-700 hover:bg-blue-600' },
//                       { type: 'subheading', cls: 'bg-purple-700 hover:bg-purple-600' },
//                       { type: 'pullquote',  cls: 'bg-green-700 hover:bg-green-600' },
//                       { type: 'image',      cls: 'bg-orange-700 hover:bg-orange-600' },
//                     ].map(({ type, cls }) => (
//                       <button key={type} type="button" onClick={() => addBlock(type)}
//                         className={`${cls} text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium cursor-pointer transition-all`}>
//                         + {type.charAt(0).toUpperCase() + type.slice(1)}
//                       </button>
//                     ))}
//                   </div> */}
//                   {formErrors.content && (
//                     <div className="flex items-center gap-2 bg-red-950/40 border border-red-500/40 text-red-400 px-3 py-2 rounded-lg text-sm">
//                       <FiAlertCircle size={14} />{formErrors.content}
//                     </div>
//                   )}
//                   <div className="space-y-3 mt-3">
//                     {contentBlocks.length === 0 ? (
//                       <div className={`text-center py-8 border border-dashed rounded-xl ${formErrors.content ? 'border-red-500 bg-red-950/10' : 'border-gray-800'}`}>
//                         <p className="text-gray-600 text-sm">No content blocks yet — use the buttons above to add content.</p>
//                         {formErrors.content && <p className="text-red-400 text-xs mt-2">{formErrors.content}</p>}
//                       </div>
//                     ) : (
//                       contentBlocks.map((block, i) => (
//                         <ContentBlock key={i} block={block} index={i} total={contentBlocks.length}
//                           onUpdate={updateBlock} onRemove={removeBlock} onMove={moveBlock}
//                           onImagePick={pickBlockImage} onImageClear={clearBlockImage} errors={contentErrors} />
//                       ))
//                     )}
//                   </div>
//                   <ImageToast message={imageToast} onClose={() => setImageToast('')} />

//                     <div className="flex gap-2 flex-wrap">
//                     {[
//                       { type: 'paragraph',  cls: 'bg-blue-700 hover:bg-blue-600' },
//                       { type: 'subheading', cls: 'bg-purple-700 hover:bg-purple-600' },
//                       { type: 'fullquote',  cls: 'bg-green-700 hover:bg-green-600' },
//                       { type: 'image',      cls: 'bg-orange-700 hover:bg-orange-600' },
//                     ].map(({ type, cls }) => (
//                       <button key={type} type="button" onClick={() => addBlock(type)}
//                         className={`${cls} text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium cursor-pointer transition-all`}>
//                         + {type.charAt(0).toUpperCase() + type.slice(1)}
//                       </button>
//                     ))}
//                   </div>
//                 </Section>

//                  {formErrors.api && (
//                   <div className="flex items-start gap-3 bg-red-950/60 border border-red-500/40 text-red-300 px-4 py-3 rounded-xl text-sm">
//                     <FiAlertCircle size={15} className="shrink-0 mt-0.5" />{formErrors.api}
//                   </div>
//                 )}

//                 {/* Sticky footer */}
//                 <div className="flex gap-3 sticky bottom-0 bg-[#0d0d0d]/95 backdrop-blur py-4 -mx-4 sm:-mx-6 px-4 sm:px-6 border-t border-gray-800 rounded-b-2xl">
//                   <button type="button" onClick={closeModal} disabled={saving}
//                     className="flex-1 py-2.5 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-all cursor-pointer text-sm">
//                     Cancel
//                   </button>
//                   <button type="submit" disabled={saving}
//                     className="flex-1 py-2.5 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 transition-all font-semibold disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 text-sm">
//                     <FiSave size={15} />
//                     {saving ? 'Saving…' : editingArticle ? 'Update Article' : 'Save Article'}
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

// app/admin/articles/page.jsx
// ✅ Updated for ImageKit — images are stored as full absolute URLs

"use client";

import { useState, useEffect } from "react";
import {
  FiPlus, FiEdit2, FiTrash2, FiEye, FiCalendar, FiClock, FiSave,
  FiX, FiHash, FiImage, FiFileText, FiAlignLeft, FiUpload, FiTrash,
  FiAlertCircle, FiSearch,
} from "react-icons/fi";
import { articlesAdminAPI, categoriesAdminAPI, authorsAdminAPI } from "@/services/adminAPI";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/** ImageKit URLs are already absolute; legacy paths get the base URL prepended */
const resolveImg = (src) => {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  return `${API_BASE.replace("/api", "")}${src}`;
};

function ImageToast({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="flex items-start gap-3 bg-red-950/60 border border-red-500/40 text-red-300 px-4 py-3 rounded-xl text-sm mt-3">
      <FiAlertCircle size={15} className="shrink-0 mt-0.5" />
      <span className="flex-1">{message}</span>
      <button type="button" onClick={onClose} className="shrink-0 hover:text-red-200 cursor-pointer"><FiX size={13} /></button>
    </div>
  );
}

function Section({ icon, title, children }) {
  return (
    <div className="space-y-4">
      <h3 className="text-[#F5C645] font-semibold flex items-center gap-2 text-sm uppercase tracking-wider">{icon}{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-gray-300 mb-1.5 text-sm">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

function ContentBlock({ block, index, total, onUpdate, onRemove, onMove, onImagePick, onImageClear, errors }) {
  const tagColor = {
    paragraph:  'bg-blue-900/40 text-blue-400 border-blue-700/40',
    subheading: 'bg-purple-900/40 text-purple-400 border-purple-700/40',
    pullquote:  'bg-green-900/40 text-green-400 border-green-700/40',
    image:      'bg-orange-900/40 text-orange-400 border-orange-700/40',
  };
  const inp = 'w-full bg-black/50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors';
  const errorInp = 'border-red-500 focus:border-red-500';
  const blockError = errors?.[index];

  return (
    <div className="rounded-xl border border-gray-800 overflow-hidden bg-[#111]">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-gray-800 bg-gray-900/60">
        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${tagColor[block.type]}`}>{block.type}</span>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => onMove(index, -1)} disabled={index === 0}
            className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-white disabled:opacity-20 cursor-pointer text-xs">▲</button>
          <button type="button" onClick={() => onMove(index, 1)} disabled={index === total - 1}
            className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-white disabled:opacity-20 cursor-pointer text-xs">▼</button>
          <button type="button" onClick={() => onRemove(index)}
            className="w-6 h-6 flex items-center justify-center text-red-400 hover:text-red-300 cursor-pointer ml-1"><FiTrash size={13} /></button>
        </div>
      </div>
      <div className="p-3 sm:p-4 space-y-2">
        {block.type === 'paragraph' && (
          <>
            <textarea value={block.text} onChange={(e) => onUpdate(index, 'text', e.target.value)}
              placeholder="Enter paragraph text…" rows={3} className={`${inp} ${blockError?.text ? errorInp : ''}`} />
            {blockError?.text && <p className="text-red-400 text-xs mt-1">{blockError.text}</p>}
          </>
        )}
        {block.type === 'subheading' && (
          <>
            <input type="text" value={block.text} onChange={(e) => onUpdate(index, 'text', e.target.value)}
              placeholder="Enter subheading…" className={`${inp} ${blockError?.text ? errorInp : ''}`} />
            {blockError?.text && <p className="text-red-400 text-xs mt-1">{blockError.text}</p>}
          </>
        )}
        {block.type === 'pullquote' && (
          <>
            <textarea value={block.text} onChange={(e) => onUpdate(index, 'text', e.target.value)}
              placeholder="Quote text…" rows={2} className={`${inp} ${blockError?.text ? errorInp : ''}`} />
            {blockError?.text && <p className="text-red-400 text-xs mt-1">{blockError.text}</p>}
            <input type="text" value={block.attribution} onChange={(e) => onUpdate(index, 'attribution', e.target.value)}
              placeholder="Attribution (optional)" className={inp} />
          </>
        )}
        {block.type === 'image' && (
          <div className="space-y-2">
            <p className="text-gray-500 text-xs">Only .webp · Under 100 KB · Uploaded to ImageKit CDN</p>
            <div className="flex items-center gap-3">
              <label className="flex-1 cursor-pointer">
                <div className={`border-2 border-dashed rounded-lg p-3 text-center transition-all bg-black/30 ${blockError?.src ? 'border-red-500' : 'border-gray-700 hover:border-[#F5C645]'}`}>
                  <FiUpload className="mx-auto text-gray-500 mb-1" size={16} />
                  <span className="text-gray-500 text-xs">{block.imagePreview ? 'Replace image' : 'Upload .webp image'}</span>
                </div>
                <input type="file" accept=".webp,image/webp"
                  onChange={(e) => { if (e.target.files[0]) onImagePick(index, e.target.files[0]); e.target.value = ''; }}
                  className="hidden" />
              </label>
              {block.imagePreview && (
                <div className="relative shrink-0">
                  <img src={block.imagePreview} alt="preview" className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover" />
                  <button type="button" onClick={() => onImageClear(index)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600">
                    <FiX size={10} />
                  </button>
                </div>
              )}
            </div>
            {blockError?.src && <p className="text-red-400 text-xs">{blockError.src}</p>}
            <input type="text" value={block.alt} onChange={(e) => onUpdate(index, 'alt', e.target.value)} placeholder="Alt text (SEO)" className={inp} />
            <input type="text" value={block.caption} onChange={(e) => onUpdate(index, 'caption', e.target.value)} placeholder="Caption (optional)" className={inp} />
          </div>
        )}
      </div>
    </div>
  );
}

const EMPTY_FORM = {
  title: '', slug: '', metaTitle: '', metaDescription: '', excerpt: '',
  category: '', newsType: 'news', type: 'normal',
  date: new Date().toISOString().split('T')[0],
  readTime: '', isPublished: true, imageAlt: '', keywords: '', tags: '', author: '',
};

export default function ArticlesPage() {
  const [articles, setArticles]       = useState([]);
  const [filtered, setFiltered]       = useState([]);
  const [search, setSearch]           = useState("");
  const [categories, setCategories]   = useState([]);
  const [authors, setAuthors]         = useState([]);
  const [loading, setLoading]         = useState(true);
  const [showModal, setShowModal]     = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [selectedCat, setSelectedCat] = useState('');
  const [contentBlocks, setContentBlocks] = useState([]);
  const [formData, setFormData]       = useState(EMPTY_FORM);
  const [formErrors, setFormErrors]   = useState({});
  const [mainImgFile, setMainImgFile] = useState(null);
  const [mainImgPreview, setMainImgPreview] = useState('');
  const [imageToast, setImageToast]   = useState('');
  const [saving, setSaving]           = useState(false);
  const [confirm, setConfirm]         = useState({ open: false, id: null, title: '' });
  const [contentErrors, setContentErrors] = useState({});
  const [selectedCategoryName, setSelectedCategoryName] = useState('');

  useEffect(() => { loadAll(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      q
        ? articles.filter(
            (a) =>
              a.title?.toLowerCase().includes(q) ||
              a.excerpt?.toLowerCase().includes(q) ||
              a.category?.name?.toLowerCase().includes(q) ||
              a.author?.name?.toLowerCase().includes(q) ||
              a.slug?.toLowerCase().includes(q)
          )
        : articles
    );
  }, [search, articles]);

  async function loadAll() {
    setLoading(true);
    await Promise.all([fetchArticles(''), fetchCategories(), fetchAuthors()]);
    setLoading(false);
  }

  async function fetchArticles(catId) {
    try { const r = await articlesAdminAPI.getAll(catId); setArticles(r.data); }
    catch (e) { console.error(e); }
  }
  async function fetchCategories() {
    try { const r = await categoriesAdminAPI.getAll(); setCategories(r.data); }
    catch (e) { console.error(e); }
  }
  async function fetchAuthors() {
    try { const r = await authorsAdminAPI.getAll(); setAuthors(r.data); }
    catch (e) { console.error(e); }
  }

  // ✅ Helper function to validate slug format
  function isValidSlug(slug) {
    // Slug must contain only lowercase letters and hyphens
    // Must start and end with a letter, no consecutive hyphens
    const slugRegex = /^[a-z]+(-[a-z]+)*$/;
    return slugRegex.test(slug);
  }

  // ✅ Helper function to count words in excerpt
  function countWords(text) {
    if (!text || typeof text !== 'string') return 0;
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  function getAuthorByCategory(categoryId) {
    if (!categoryId) return '';
    const selectedCategory = categories.find((cat) => cat._id === categoryId);
    if (!selectedCategory) return '';
    setSelectedCategoryName(selectedCategory.name);
    const matchedAuthor = authors.find((author) => {
      if (!author.category) return false;
      const authorCategory =
        typeof author.category === 'string'
          ? author.category
          : author.category?.name || author.category?._id || '';
      return authorCategory.toLowerCase() === selectedCategory.name.toLowerCase();
    });
    return matchedAuthor ? matchedAuthor._id : '';
  }

  function handleCategoryChange(categoryId) {
    setFormData((prev) => ({ ...prev, category: categoryId }));
    setFormErrors((prev) => ({ ...prev, category: '' }));
    const autoAuthorId = getAuthorByCategory(categoryId);
    setFormData((prev) => ({ ...prev, category: categoryId, author: autoAuthorId || '' }));
  }

  function getAuthorName() {
    if (!formData.author) return '';
    const author = authors.find((a) => a._id === formData.author);
    return author ? author.name : '';
  }

  function checkImage(file) {
    if (file.type !== 'image/webp') return 'Only .webp format is allowed.';
    return null;
  }

  function handleMainImg(e) {
    const f = e.target.files[0]; if (!f) return;
    const err = checkImage(f);
    if (err) { setImageToast(err); e.target.value = ''; return; }
    setMainImgFile(f);
    const r = new FileReader();
    r.onloadend = () => setMainImgPreview(r.result);
    r.readAsDataURL(f);
    if (formErrors.mainImage) setFormErrors((prev) => ({ ...prev, mainImage: '' }));
  }

  function addBlock(type) {
    const b = { type };
    if (type === 'paragraph' || type === 'subheading') b.text = '';
    if (type === 'pullquote') { b.text = ''; b.attribution = ''; }
    if (type === 'image') { b.src = ''; b.imageFile = null; b.imagePreview = ''; b.alt = ''; b.caption = ''; }
    setContentBlocks((p) => [...p, b]);
    if (formErrors.content) setFormErrors((prev) => ({ ...prev, content: '' }));
  }

  function updateBlock(i, key, val) {
    setContentBlocks((p) => p.map((b, idx) => idx === i ? { ...b, [key]: val } : b));
    if (contentErrors[i]?.[key]) setContentErrors((prev) => ({ ...prev, [i]: { ...prev[i], [key]: '' } }));
    if (formErrors.content) setFormErrors((prev) => ({ ...prev, content: '' }));
  }

  function pickBlockImage(i, file) {
    const err = checkImage(file);
    if (err) { setImageToast(err); return; }
    const r = new FileReader();
    r.onloadend = () => {
      setContentBlocks((p) => p.map((b, idx) => idx === i ? { ...b, imageFile: file, imagePreview: r.result, src: '__NEW_UPLOAD__' } : b));
      if (contentErrors[i]?.src) setContentErrors((prev) => ({ ...prev, [i]: { ...prev[i], src: '' } }));
    };
    r.readAsDataURL(file);
  }

  function clearBlockImage(i) {
    setContentBlocks((p) => p.map((b, idx) => idx === i ? { ...b, imageFile: null, imagePreview: '', src: '' } : b));
  }

  function removeBlock(i) {
    setContentBlocks((p) => p.filter((_, idx) => idx !== i));
    setContentErrors((prev) => {
      const n = { ...prev };
      delete n[i];
      const re = {};
      Object.keys(n).forEach((k) => { const nk = parseInt(k) > i ? parseInt(k) - 1 : parseInt(k); re[nk] = n[k]; });
      return re;
    });
    if (formErrors.content) setFormErrors((prev) => ({ ...prev, content: '' }));
  }

  function moveBlock(i, dir) {
    const arr = [...contentBlocks];
    const to = i + dir;
    if (to < 0 || to >= arr.length) return;
    [arr[i], arr[to]] = [arr[to], arr[i]];
    setContentBlocks(arr);
    const re = {};
    Object.keys(contentErrors).forEach((k) => {
      const idx = parseInt(k);
      if (idx === i) re[to] = contentErrors[i];
      else if (idx === to) re[i] = contentErrors[to];
      else re[idx] = contentErrors[idx];
    });
    setContentErrors(re);
  }

  function validateContentBlocks() {
    const errors = {};
    let hasValidParagraph = false;
    contentBlocks.forEach((block, idx) => {
      const blockErr = {};
      if (block.type === 'paragraph') {
        if (!block.text?.trim()) blockErr.text = 'Paragraph text is required.';
        else hasValidParagraph = true;
      }
      if (block.type === 'subheading' && !block.text?.trim()) blockErr.text = 'Subheading text is required.';
      if (block.type === 'pullquote' && !block.text?.trim()) blockErr.text = 'Quote text is required.';
      if (block.type === 'image' && !block.src && !block.imageFile) blockErr.src = 'Image is required for image block.';
      if (Object.keys(blockErr).length > 0) errors[idx] = blockErr;
    });
    setContentErrors(errors);
    return { hasValidParagraph, blockErrors: errors };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { hasValidParagraph, blockErrors } = validateContentBlocks();
    const ge = {};
    
    if (!formData.title.trim())           ge.title           = 'Title is required.';
    
    // ✅ Slug validation
    if (!formData.slug.trim())            ge.slug            = 'Slug is required.';
    else if (!isValidSlug(formData.slug)) ge.slug            = 'Slug must contain only lowercase letters and hyphens (e.g., "my-article-title"). No numbers or special characters allowed.';
    
    if (!formData.category)              ge.category         = 'Category is required.';
    
    // ✅ Excerpt validation - minimum 20 words
    if (!formData.excerpt.trim())         ge.excerpt         = 'Excerpt is required.';
    else if (countWords(formData.excerpt) < 20) ge.excerpt   = `Excerpt must contain at least 20 words. Currently ${countWords(formData.excerpt)} word(s).`;
    
    if (!formData.readTime.trim())        ge.readTime        = 'Read time is required.';
    if (!formData.metaTitle.trim())       ge.metaTitle       = 'Meta title is required.';
    if (!formData.metaDescription.trim()) ge.metaDescription = 'Meta description is required.';
    if (!formData.imageAlt.trim())        ge.imageAlt        = 'ImageAlt is required.';
    if (!formData.keywords.trim())        ge.keywords        = 'Keywords are required.';
    if (!formData.tags.trim())            ge.tags            = 'Tags are required.';
    if (!editingArticle && !mainImgFile)  ge.mainImage       = 'Featured image is required.';
    if (!formData.author && formData.category) {
      const sc = categories.find((cat) => cat._id === formData.category);
      if (sc) ge.author = `Author is required for ${sc.name} category.`;
    }
    if (contentBlocks.length === 0) {
      ge.content = 'Please add at least one content block (paragraph required).';
    } else if (!hasValidParagraph) {
      ge.content = 'At least one paragraph block with text is required.';
    }
    
    setFormErrors(ge);
    if (Object.keys(ge).length > 0 || Object.keys(blockErrors).length > 0) {
      const firstError = document.querySelector('.border-red-500, .text-red-400');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    setSaving(true);
    try {
      const cleanContent = contentBlocks.map(({ imageFile, imagePreview, ...rest }) => rest);
      const articleData = {
        ...formData,
        content: cleanContent,
        keywords: formData.keywords.split(',').map((k) => k.trim()).filter(Boolean),
        tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      };
      if (!articleData.author) delete articleData.author;
      const fd = new FormData();
      fd.append('data', JSON.stringify(articleData));
      if (mainImgFile) fd.append('mainImage', mainImgFile);
      contentBlocks.forEach((b) => { if (b.type === 'image' && b.imageFile) fd.append('contentImages', b.imageFile); });
      if (editingArticle) {
        await articlesAdminAPI.update(editingArticle._id, fd);
      } else {
        await articlesAdminAPI.create(fd);
      }
      await fetchArticles(selectedCat);
      closeModal();
    } catch (err) {
      setFormErrors({ api: err.response?.data?.message || 'Error saving article. Please try again.' });
    } finally {
      setSaving(false);
    }
  }

  function openModal(article = null) {
    if (article) {
      setEditingArticle(article);
      setFormData({
        title:           article.title || '',
        slug:            article.slug || '',
        metaTitle:       article.metaTitle || '',
        metaDescription: article.metaDescription || '',
        excerpt:         article.excerpt || '',
        category:        article.category?._id || article.category || '',
        newsType:        article.newsType || 'news',
        type:            article.type || 'normal',
        date:            article.date ? new Date(article.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        readTime:        article.readTime || '',
        isPublished:     article.isPublished ?? true,
        imageAlt:        article.imageAlt || '',
        keywords:        (article.keywords || []).join(', '),
        tags:            (article.tags || []).join(', '),
        author:          article.author?._id || article.author || '',
      });
      setContentBlocks(
        (article.content || []).map((b) =>
          b.type === 'image'
            ? { ...b, imageFile: null, imagePreview: b.src ? resolveImg(b.src) : '' }
            : { ...b }
        )
      );
      // ImageKit URLs are already absolute
      setMainImgPreview(article.image ? resolveImg(article.image) : '');
      setMainImgFile(null);
      const sc = categories.find((cat) => cat._id === (article.category?._id || article.category));
      if (sc) setSelectedCategoryName(sc.name);
    } else {
      setEditingArticle(null);
      setFormData(EMPTY_FORM);
      setContentBlocks([]);
      setMainImgPreview('');
      setMainImgFile(null);
      setSelectedCategoryName('');
    }
    setFormErrors({});
    setContentErrors({});
    setImageToast('');
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingArticle(null);
    setContentBlocks([]);
    setMainImgFile(null);
    setMainImgPreview('');
    setFormErrors({});
    setContentErrors({});
    setImageToast('');
    setSaving(false);
    setSelectedCategoryName('');
  }

  function filterCategory(catId) {
    setSelectedCat(catId);
    setSearch('');
    setLoading(true);
    fetchArticles(catId).then(() => setLoading(false));
  }

  const inp = (key) => ({
    value: formData[key],
    onChange: (e) => {
      setFormData((p) => ({ ...p, [key]: e.target.value }));
      if (formErrors[key]) setFormErrors((p) => ({ ...p, [key]: '' }));
      if (formErrors.api) setFormErrors((p) => ({ ...p, api: '' }));
    },
  });

  const inpCls = (key) =>
    `w-full bg-gray-900 border rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors ${formErrors[key] ? 'border-red-500' : 'border-gray-700'}`;

  return (
    <div>
      <ConfirmDialog
        isOpen={confirm.open}
        title="Delete Article"
        message={`Delete "${confirm.title}"? This cannot be undone.`}
        onConfirm={async () => {
          try { await articlesAdminAPI.delete(confirm.id); await fetchArticles(selectedCat); }
          catch (err) { alert(err.response?.data?.message || 'Failed to delete article.'); }
          finally { setConfirm({ open: false, id: null, title: '' }); }
        }}
        onCancel={() => setConfirm({ open: false, id: null, title: '' })}
        confirmText="Delete"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Articles</h1>
          <p className="text-gray-400 mt-1 text-sm">Manage your news articles</p>
        </div>
        <button onClick={() => openModal()}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 transition-all cursor-pointer font-medium text-sm w-full sm:w-auto">
          <FiPlus size={18} /> Add Article
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
        {[{ _id: '', name: 'All' }, ...categories].map((c) => (
          <button key={c._id} onClick={() => filterCategory(c._id)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${selectedCat === c._id ? 'bg-[#F5C645] text-black font-semibold' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
            {c.name}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles by title, slug, author, or category…"
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
          {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{search}"
        </p>
      )}

      {/* Article list */}
      {loading ? (
        <div className="flex justify-center py-16"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#F5C645]" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-gray-900/40 rounded-2xl">
          <p className="text-gray-400 text-sm">{search ? `No articles match "${search}".` : 'No articles found.'}</p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {filtered.map((article) => {
            const thumbSrc = resolveImg(article.image);
            return (
              <div key={article._id}
                className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-[#F5C645]/40 transition-all">
                <div className="flex flex-col sm:flex-row gap-4">
                  {thumbSrc && (
                    <div className="sm:w-36 lg:w-44 h-28 sm:h-24 lg:h-28 rounded-lg sm:rounded-xl overflow-hidden shrink-0">
                      <img src={thumbSrc} alt={article.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="text-xs px-2 py-0.5 bg-[#F5C645]/20 text-[#F5C645] rounded-full">{article.category?.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${article.isPublished ? 'bg-green-500/15 text-green-400' : 'bg-gray-700/40 text-gray-400'}`}>
                            {article.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        <h3 className="text-white text-base sm:text-lg font-semibold mb-1 line-clamp-2">{article.title}</h3>
                        <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 hidden sm:block">{article.excerpt}</p>
                        <div className="flex flex-wrap gap-3 mt-2 text-gray-500 text-xs">
                          <span className="flex items-center gap-1"><FiCalendar size={10} />{new Date(article.date).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1"><FiClock size={10} />{article.readTime}</span>
                        </div>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <Link href={`/${article.category?.slug || article.category}/${article.slug}`} target="_blank">
                          <button className="p-1.5 sm:p-2 text-green-400 hover:bg-green-400/10 rounded-lg cursor-pointer"><FiEye size={15} /></button>
                        </Link>
                        <button onClick={() => openModal(article)} className="p-1.5 sm:p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg cursor-pointer"><FiEdit2 size={15} /></button>
                        <button onClick={() => setConfirm({ open: true, id: article._id, title: article.title })}
                          className="p-1.5 sm:p-2 text-red-400 hover:bg-red-400/10 rounded-lg cursor-pointer"><FiTrash2 size={15} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ══════════════ MODAL ══════════════ */}
      {showModal && (
        <div className="fixed inset-0 bg-black/85 overflow-y-auto z-50 p-2 sm:p-4">
          <div className="max-w-4xl mx-auto my-4 sm:my-8">
            <div className="bg-[#0d0d0d] border border-[#F5C645]/20 rounded-2xl">
              <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-800 sticky top-0 bg-[#0d0d0d]/95 backdrop-blur rounded-t-2xl z-10">
                <h2 className="text-white text-lg sm:text-xl font-semibold">{editingArticle ? 'Edit Article' : 'Add Article'}</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-white cursor-pointer p-1"><FiX size={20} /></button>
              </div>

              <form onSubmit={handleSubmit} className="px-4 sm:px-6 pb-6 pt-4 space-y-6 sm:space-y-8">

                {/* Basic Info */}
                <Section icon={<FiFileText size={16} />} title="Basic Information">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Title" required error={formErrors.title}>
                      <input type="text" className={inpCls('title')} value={formData.title}
                        onChange={(e) => {
                          const v = e.target.value;
                          setFormData((p) => ({ ...p, title: v, slug: v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }));
                          if (formErrors.title) setFormErrors((p) => ({ ...p, title: '' }));
                          if (formErrors.api) setFormErrors((p) => ({ ...p, api: '' }));
                        }}
                        placeholder="Article headline" />
                    </Field>
                    <Field label="Slug" required error={formErrors.slug}>
                      <input type="text" {...inp('slug')} className={inpCls('slug')} placeholder="my-article-title" />
                      <p className="text-gray-500 text-xs mt-1">Only lowercase letters and hyphens (e.g., "my-article-title")</p>
                    </Field>
                    <Field label="Category" required error={formErrors.category}>
                      <select className={inpCls('category') + ' cursor-pointer'} value={formData.category}
                        onChange={(e) => handleCategoryChange(e.target.value)}>
                        <option value="">Select Category</option>
                        {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                      </select>
                    </Field>
                    <Field label="Author" required error={formErrors.author}>
                      <div className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm min-h-[38px] flex items-center">
                        {getAuthorName() || (formData.category ? 'No author found for this category' : 'Select a category first')}
                      </div>
                      {formData.category && !getAuthorName() && (
                        <p className="text-yellow-500 text-xs mt-1">No author assigned to {selectedCategoryName} category. Please add an author with this category.</p>
                      )}
                    </Field>
                    <Field label="News Type">
                      <select {...inp('newsType')} className={inpCls('newsType') + ' cursor-pointer'}>
                        <option value="news">News</option>
                        <option value="client news">Client News</option>
                        <option value="featured">Featured</option>
                        <option value="opinion">Opinion</option>
                      </select>
                    </Field>
                    <Field label="Article Type">
                      <select {...inp('type')} className={inpCls('type') + ' cursor-pointer'}>
                        <option value="normal">Normal</option>
                        <option value="featured">Featured</option>
                        <option value="breaking">Breaking</option>
                        <option value="exclusive">Exclusive</option>
                      </select>
                    </Field>
                    <Field label="Date">
                      <input type="date" {...inp('date')} className={inpCls('date') + ' cursor-pointer'} />
                    </Field>
                    <Field label="Read Time" required error={formErrors.readTime}>
                      <input type="text" {...inp('readTime')} placeholder="e.g. 5 Min Read" className={inpCls('readTime')} />
                    </Field>
                    <Field label="Status">
                      <select value={String(formData.isPublished)}
                        onChange={(e) => setFormData((p) => ({ ...p, isPublished: e.target.value === 'true' }))}
                        className={inpCls('isPublished') + ' cursor-pointer'}>
                        <option value="true">Published</option>
                        <option value="false">Draft</option>
                      </select>
                    </Field>
                  </div>
                </Section>

                {/* SEO */}
                <Section icon={<FiHash size={16} />} title="SEO">
                  <div className="space-y-4">
                    <Field label="Meta Title" required error={formErrors.metaTitle}>
                      <input type="text" {...inp('metaTitle')} className={inpCls('metaTitle')} />
                    </Field>
                    <Field label="Meta Description" required error={formErrors.metaDescription}>
                      <textarea {...inp('metaDescription')} rows={2} className={inpCls('metaDescription')} />
                    </Field>
                    <Field label="Excerpt" required error={formErrors.excerpt}>
                      <textarea value={formData.excerpt} rows={3} className={inpCls('excerpt')}
                        onChange={(e) => { 
                          setFormData((p) => ({ ...p, excerpt: e.target.value })); 
                          setFormErrors((p) => ({ ...p, excerpt: '' })); 
                        }} 
                        placeholder="Minimum 20 words required for excerpt" />
                      {formData.excerpt && (
                        <p className={`text-xs mt-1 ${countWords(formData.excerpt) >= 20 ? 'text-green-500' : 'text-yellow-500'}`}>
                          Word count: {countWords(formData.excerpt)} / 20 minimum
                        </p>
                      )}
                    </Field>
                  </div>
                </Section>

                {/* Featured Image */}
                <Section icon={<FiImage size={16} />} title="Featured Image">
                  <p className="text-gray-500 text-xs -mt-2">Only .webp · Under 100 KB · Uploaded to ImageKit CDN</p>
                  <div className="flex items-center gap-4">
                    <label className="flex-1 cursor-pointer">
                      <div className={`border-2 border-dashed rounded-xl p-4 text-center transition-all bg-black/20 ${formErrors.mainImage ? 'border-red-500' : 'border-gray-700 hover:border-[#F5C645]'}`}>
                        <FiUpload className="mx-auto text-gray-500 mb-2" size={20} />
                        <p className="text-gray-400 text-sm">Click to upload .webp (under 100 KB)</p>
                      </div>
                      <input type="file" accept=".webp,image/webp" onChange={handleMainImg} className="hidden" />
                    </label>
                    {mainImgPreview && (
                      <div className="relative shrink-0">
                        <img src={mainImgPreview} alt="preview" className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover" />
                        <button type="button" onClick={() => { setMainImgFile(null); setMainImgPreview(''); }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600">
                          <FiTrash size={11} />
                        </button>
                      </div>
                    )}
                  </div>
                  {formErrors.mainImage && <p className="text-red-400 text-xs mt-1">{formErrors.mainImage}</p>}
                  <Field label="Image Alt Text" required error={formErrors.imageAlt}>
                    <input type="text" {...inp('imageAlt')} className={inpCls('imageAlt')} />
                  </Field>
                </Section>

                {/* Keywords & Tags */}
                <Section icon={<FiHash size={16} />} title="Keywords & Tags">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Keywords (comma separated)" required error={formErrors.keywords}>
                      <input type="text" {...inp('keywords')} placeholder="keyword1, keyword2" className={inpCls('keywords')} />
                    </Field>
                    <Field label="Tags (comma separated)" required error={formErrors.tags}>
                      <input type="text" {...inp('tags')} placeholder="tag1, tag2" className={inpCls('tags')} />
                    </Field>
                  </div>
                </Section>

                {/* Content Blocks */}
                <Section icon={<FiAlignLeft size={16} />} title="Content">
                  {formErrors.content && (
                    <div className="flex items-center gap-2 bg-red-950/40 border border-red-500/40 text-red-400 px-3 py-2 rounded-lg text-sm">
                      <FiAlertCircle size={14} />{formErrors.content}
                    </div>
                  )}
                  <div className="space-y-3 mt-3">
                    {contentBlocks.length === 0 ? (
                      <div className={`text-center py-8 border border-dashed rounded-xl ${formErrors.content ? 'border-red-500 bg-red-950/10' : 'border-gray-800'}`}>
                        <p className="text-gray-600 text-sm">No content blocks yet — use the buttons above to add content.</p>
                        {formErrors.content && <p className="text-red-400 text-xs mt-2">{formErrors.content}</p>}
                      </div>
                    ) : (
                      contentBlocks.map((block, i) => (
                        <ContentBlock key={i} block={block} index={i} total={contentBlocks.length}
                          onUpdate={updateBlock} onRemove={removeBlock} onMove={moveBlock}
                          onImagePick={pickBlockImage} onImageClear={clearBlockImage} errors={contentErrors} />
                      ))
                    )}
                  </div>
                  <ImageToast message={imageToast} onClose={() => setImageToast('')} />

                    <div className="flex gap-2 flex-wrap">
                    {[
                      { type: 'paragraph',  cls: 'bg-blue-700 hover:bg-blue-600' },
                      { type: 'subheading', cls: 'bg-purple-700 hover:bg-purple-600' },
                      { type: 'pullquote',  cls: 'bg-green-700 hover:bg-green-600' },
                      { type: 'image',      cls: 'bg-orange-700 hover:bg-orange-600' },
                    ].map(({ type, cls }) => (
                      <button key={type} type="button" onClick={() => addBlock(type)}
                        className={`${cls} text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium cursor-pointer transition-all`}>
                        + {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </Section>

                 {formErrors.api && (
                  <div className="flex items-start gap-3 bg-red-950/60 border border-red-500/40 text-red-300 px-4 py-3 rounded-xl text-sm">
                    <FiAlertCircle size={15} className="shrink-0 mt-0.5" />{formErrors.api}
                  </div>
                )}

                {/* Sticky footer */}
                <div className="flex gap-3 sticky bottom-0 bg-[#0d0d0d]/95 backdrop-blur py-4 -mx-4 sm:-mx-6 px-4 sm:px-6 border-t border-gray-800 rounded-b-2xl">
                  <button type="button" onClick={closeModal} disabled={saving}
                    className="flex-1 py-2.5 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-all cursor-pointer text-sm">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving}
                    className="flex-1 py-2.5 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 transition-all font-semibold disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 text-sm">
                    <FiSave size={15} />
                    {saving ? 'Saving…' : editingArticle ? 'Update Article' : 'Save Article'}
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