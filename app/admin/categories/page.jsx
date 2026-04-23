
// // app/admin/categories/page.jsx
// "use client";

// import { useState, useEffect } from "react";
// import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiAlertCircle } from "react-icons/fi";
// import { categoriesAdminAPI } from "@/services/adminAPI";
// import ConfirmDialog from "@/components/admin/ConfirmDialog";

// export default function CategoriesPage() {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [formData, setFormData] = useState({ name: "", slug: "" });
//   const [formErrors, setFormErrors] = useState({});
//   const [saving, setSaving] = useState(false);
//   const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null, name: "" });

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await categoriesAdminAPI.getAll();
//       setCategories(response.data);
//     } catch (err) {
//       setError("Failed to connect to the server. Please make sure the backend is running on port 5000.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const validate = () => {
//     const errors = {};
//     if (!formData.name.trim()) errors.name = "Category name is required.";
//     if (!formData.slug.trim()) errors.slug = "Slug is required.";
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setSaving(true);
//     try {
//       if (editingCategory) {
//         await categoriesAdminAPI.update(editingCategory._id, formData);
//       } else {
//         await categoriesAdminAPI.create(formData);
//       }
//       await fetchCategories();
//       closeModal();
//     } catch (err) {
//       setFormErrors({ api: err.response?.data?.message || "Failed to save category." });
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDeleteConfirm = (category) => {
//     setConfirmDialog({ open: true, id: category._id, name: category.name });
//   };

//   const handleDeleteExecute = async () => {
//     try {
//       await categoriesAdminAPI.delete(confirmDialog.id);
//       await fetchCategories();
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to delete category.");
//     } finally {
//       setConfirmDialog({ open: false, id: null, name: "" });
//     }
//   };

//   const openModal = (category = null) => {
//     if (category) {
//       setEditingCategory(category);
//       setFormData({ name: category.name, slug: category.slug });
//     } else {
//       setEditingCategory(null);
//       setFormData({ name: "", slug: "" });
//     }
//     setFormErrors({});
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setEditingCategory(null);
//     setFormData({ name: "", slug: "" });
//     setFormErrors({});
//   };

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center h-96">
//         <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8 text-center max-w-md">
//           <FiAlertCircle className="text-red-500 text-5xl mx-auto mb-4" />
//           <h2 className="text-white text-xl font-semibold mb-2">Connection Error</h2>
//           <p className="text-gray-400 mb-4">{error}</p>
//           <button
//             onClick={fetchCategories}
//             className="px-4 py-2 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 cursor-pointer"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <ConfirmDialog
//         isOpen={confirmDialog.open}
//         title="Delete Category"
//         message={`Are you sure you want to delete "${confirmDialog.name}"? This will also permanently delete all articles in this category. This action cannot be undone.`}
//         onConfirm={handleDeleteExecute}
//         onCancel={() => setConfirmDialog({ open: false, id: null, name: "" })}
//         confirmText="Delete"
//       />

//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-white">Categories</h1>
//           <p className="text-gray-400 mt-1">Manage your news categories</p>
//         </div>
//         <button
//           onClick={() => openModal()}
//           className="flex items-center gap-2 px-4 py-2 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 transition-all duration-200 cursor-pointer"
//         >
//           <FiPlus size={18} />
//           <span>Add Category</span>
//         </button>
//       </div>

//       {loading ? (
//         <div className="flex justify-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F5C645]" />
//         </div>
//       ) : categories.length === 0 ? (
//         <div className="text-center py-12 bg-gray-900/50 rounded-2xl">
//           <p className="text-gray-400">No categories yet. Click "Add Category" to create one.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {categories.map((category) => (
//             <div
//               key={category._id}
//               className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl p-6 hover:border-[#F5C645]/40 transition-all duration-300"
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h3 className="text-white text-xl font-semibold">{category.name}</h3>
//                   <p className="text-gray-500 text-sm mt-1">/{category.slug}</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => openModal(category)}
//                     className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all cursor-pointer"
//                   >
//                     <FiEdit2 size={18} />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteConfirm(category)}
//                     className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all cursor-pointer"
//                   >
//                     <FiTrash2 size={18} />
//                   </button>
//                 </div>
//               </div>
//               <div className="pt-4 border-t border-gray-800">
//                 <p className="text-gray-500 text-sm">
//                   Created: {new Date(category.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
//           <div className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl max-w-md w-full">
//             <div className="flex justify-between items-center p-6 border-b border-gray-800">
//               <h2 className="text-white text-xl font-semibold">
//                 {editingCategory ? "Edit Category" : "Add Category"}
//               </h2>
//               <button onClick={closeModal} className="text-gray-400 hover:text-white cursor-pointer">
//                 <FiX size={24} />
//               </button>
//             </div>
//             <form onSubmit={handleSubmit} className="p-6 space-y-4">
//               {formErrors.api && (
//                 <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
//                   {formErrors.api}
//                 </div>
//               )}
//               <div>
//                 <label className="block text-gray-300 mb-2 text-sm">
//                   Category Name <span className="text-red-400">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => {
//                     const name = e.target.value;
//                     setFormData({
//                       ...formData,
//                       name,
//                       slug: name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
//                     });
//                     if (formErrors.name) setFormErrors((p) => ({ ...p, name: "" }));
//                   }}
//                   className={`w-full bg-gray-900 border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#F5C645] transition-colors ${
//                     formErrors.name ? "border-red-500" : "border-gray-700"
//                   }`}
//                   placeholder="e.g. Technology"
//                 />
//                 {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
//               </div>

//               <div>
//                 <label className="block text-gray-300 mb-2 text-sm">
//                   Slug <span className="text-red-400">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.slug}
//                   onChange={(e) => {
//                     setFormData({ ...formData, slug: e.target.value });
//                     if (formErrors.slug) setFormErrors((p) => ({ ...p, slug: "" }));
//                   }}
//                   className={`w-full bg-gray-900 border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#F5C645] transition-colors ${
//                     formErrors.slug ? "border-red-500" : "border-gray-700"
//                   }`}
//                   placeholder="e.g. technology"
//                 />
//                 {formErrors.slug && <p className="text-red-400 text-xs mt-1">{formErrors.slug}</p>}
//               </div>

//               <div className="flex gap-3 pt-2">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   disabled={saving}
//                   className="flex-1 px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-all cursor-pointer"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={saving}
//                   className="flex-1 px-4 py-2 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 transition-all disabled:opacity-50 cursor-pointer font-semibold"
//                 >
//                   <FiSave size={16} className="inline mr-2" />
//                   {saving ? "Saving..." : editingCategory ? "Update" : "Save"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// app/admin/categories/page.jsx
"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiAlertCircle, FiSearch } from "react-icons/fi";
import { categoriesAdminAPI } from "@/services/adminAPI";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered]     = useState([]);
  const [search, setSearch]         = useState("");
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [showModal, setShowModal]   = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData]     = useState({ name: "", slug: "" });
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving]         = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null, name: "" });

  useEffect(() => { fetchCategories(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      q ? categories.filter((c) => c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)) : categories
    );
  }, [search, categories]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await categoriesAdminAPI.getAll();
      setCategories(response.data);
    } catch (err) {
      setError("Failed to connect to the server. Please make sure the backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Category name is required.";
    if (!formData.slug.trim()) errors.slug = "Slug is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      if (editingCategory) {
        await categoriesAdminAPI.update(editingCategory._id, formData);
      } else {
        await categoriesAdminAPI.create(formData);
      }
      await fetchCategories();
      closeModal();
    } catch (err) {
      setFormErrors({ api: err.response?.data?.message || "Failed to save category." });
    } finally {
      setSaving(false);
    }
  };

  const openModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, slug: category.slug });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", slug: "" });
    }
    setFormErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: "", slug: "" });
    setFormErrors({});
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 px-4">
        <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-6 sm:p-8 text-center max-w-md w-full">
          <FiAlertCircle className="text-red-500 text-4xl sm:text-5xl mx-auto mb-4" />
          <h2 className="text-white text-lg sm:text-xl font-semibold mb-2">Connection Error</h2>
          <p className="text-gray-400 mb-4 text-sm">{error}</p>
          <button onClick={fetchCategories} className="px-4 py-2 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 cursor-pointer text-sm font-medium">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ConfirmDialog
        isOpen={confirmDialog.open}
        title="Delete Category"
        message={`Are you sure you want to delete "${confirmDialog.name}"? This will also permanently delete all articles in this category. This action cannot be undone.`}
        onConfirm={async () => {
          try {
            await categoriesAdminAPI.delete(confirmDialog.id);
            await fetchCategories();
          } catch (err) {
            alert(err.response?.data?.message || "Failed to delete category.");
          } finally {
            setConfirmDialog({ open: false, id: null, name: "" });
          }
        }}
        onCancel={() => setConfirmDialog({ open: false, id: null, name: "" })}
        confirmText="Delete"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Categories</h1>
          <p className="text-gray-400 mt-1 text-sm">Manage your news categories</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 transition-all cursor-pointer font-medium text-sm w-full sm:w-auto"
        >
          <FiPlus size={18} />
          <span>Add Category</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search categories by name or slug…"
          className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-9 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white cursor-pointer">
            <FiX size={14} />
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#F5C645]" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 bg-gray-900/50 rounded-2xl">
          <p className="text-gray-400 text-sm">
            {search ? `No categories match "${search}".` : 'No categories yet. Click "Add Category" to create one.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((category) => (
            <div
              key={category._id}
              className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl p-5 sm:p-6 hover:border-[#F5C645]/40 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-white text-lg sm:text-xl font-semibold truncate">{category.name}</h3>
                  <p className="text-gray-500 text-sm mt-1 truncate">/{category.slug}</p>
                </div>
                <div className="flex gap-2 ml-2 shrink-0">
                  <button onClick={() => openModal(category)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all cursor-pointer">
                    <FiEdit2 size={17} />
                  </button>
                  <button onClick={() => setConfirmDialog({ open: true, id: category._id, name: category.name })} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all cursor-pointer">
                    <FiTrash2 size={17} />
                  </button>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-800">
                <p className="text-gray-500 text-xs">
                  Created: {new Date(category.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl w-full max-w-md">
            <div className="flex justify-between items-center p-5 sm:p-6 border-b border-gray-800">
              <h2 className="text-white text-lg sm:text-xl font-semibold">
                {editingCategory ? "Edit Category" : "Add Category"}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white cursor-pointer p-1">
                <FiX size={22} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
              {formErrors.api && (
                <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                  <FiAlertCircle size={15} className="shrink-0 mt-0.5" />
                  <span>{formErrors.api}</span>
                </div>
              )}
              <div>
                <label className="block text-gray-300 mb-2 text-sm">
                  Category Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setFormData({ ...formData, name, slug: name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") });
                    if (formErrors.name) setFormErrors((p) => ({ ...p, name: "" }));
                    if (formErrors.api) setFormErrors((p) => ({ ...p, api: "" }));
                  }}
                  className={`w-full bg-gray-900 border rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors ${formErrors.name ? "border-red-500" : "border-gray-700"}`}
                  placeholder="e.g. Technology"
                />
                {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm">
                  Slug <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => {
                    setFormData({ ...formData, slug: e.target.value });
                    if (formErrors.slug) setFormErrors((p) => ({ ...p, slug: "" }));
                    if (formErrors.api) setFormErrors((p) => ({ ...p, api: "" }));
                  }}
                  className={`w-full bg-gray-900 border rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors ${formErrors.slug ? "border-red-500" : "border-gray-700"}`}
                  placeholder="e.g. technology"
                />
                {formErrors.slug && <p className="text-red-400 text-xs mt-1">{formErrors.slug}</p>}
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} disabled={saving} className="flex-1 px-4 py-2.5 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-all cursor-pointer text-sm">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="flex-1 px-4 py-2.5 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 transition-all disabled:opacity-50 cursor-pointer font-semibold text-sm flex items-center justify-center gap-2">
                  <FiSave size={15} />
                  {saving ? "Saving..." : editingCategory ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}