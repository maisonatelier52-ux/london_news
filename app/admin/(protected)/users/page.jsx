// app/admin/(protected)/users/page.jsx
"use client";

import { useState, useEffect } from "react";
import {
  FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiUser, FiMail,
  FiAlertCircle, FiSearch, FiShield, FiCheckCircle, FiSlash,
} from "react-icons/fi";
import { usersAdminAPI } from "@/services/adminAPI";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

const EMPTY_FORM = { name: "", email: "", password: "", role: "Journalist" };

const ROLE_BADGE = {
  "Super Admin": "bg-red-500/15 text-red-400",
  JMHV: "bg-purple-500/15 text-purple-400",
  Editor: "bg-blue-500/15 text-blue-400",
  Journalist: "bg-green-500/15 text-green-400",
  "Guest Writer": "bg-gray-500/15 text-gray-400",
};

export default function UsersPage() {
  const [users, setUsers]         = useState([]);
  const [filtered, setFiltered]   = useState([]);
  const [search, setSearch]       = useState("");
  const [roles, setRoles]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData]   = useState(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving]       = useState(false);
  const [confirm, setConfirm]     = useState({ open: false, id: null, name: "" });

  useEffect(() => { loadAll(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      q
        ? users.filter(
            (u) =>
              u.name?.toLowerCase().includes(q) ||
              u.email?.toLowerCase().includes(q) ||
              u.role?.toLowerCase().includes(q)
          )
        : users
    );
  }, [search, users]);

  async function loadAll() {
    setLoading(true);
    await Promise.all([fetchUsers(), fetchRoles()]);
    setLoading(false);
  }

  async function fetchUsers() {
    try {
      const r = await usersAdminAPI.getAll();
      setUsers(r.data);
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchRoles() {
    try {
      const r = await usersAdminAPI.getRoles();
      setRoles(r.data);
    } catch (e) {
      // Fallback list, in case the /roles endpoint isn't reachable for some reason.
      setRoles(["Super Admin", "JMHV", "Editor", "Journalist", "Guest Writer"]);
    }
  }

  function validate() {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required.";
    if (!formData.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = "Invalid email address.";
    }
    if (!editingUser && !formData.password.trim()) {
      e.password = "Password is required.";
    } else if (formData.password && formData.password.length < 6) {
      e.password = "Password must be at least 6 characters.";
    }
    if (!formData.role) e.role = "Role is required.";
    setFormErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      if (editingUser) {
        const payload = { name: formData.name, role: formData.role };
        if (formData.password) payload.password = formData.password;
        await usersAdminAPI.update(editingUser._id, payload);
      } else {
        await usersAdminAPI.create(formData);
      }
      await fetchUsers();
      closeModal();
    } catch (err) {
      setFormErrors({ api: err.response?.data?.message || "Failed to save user." });
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(user) {
    try {
      await usersAdminAPI.update(user._id, { isActive: !user.isActive });
      await fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update user status.");
    }
  }

  function openModal(user = null) {
    if (user) {
      setEditingUser(user);
      setFormData({ name: user.name, email: user.email, password: "", role: user.role });
    } else {
      setEditingUser(null);
      setFormData(EMPTY_FORM);
    }
    setFormErrors({});
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingUser(null);
    setFormData(EMPTY_FORM);
    setFormErrors({});
  }

  const inpCls = (key) =>
    `w-full bg-gray-900 border rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors ${
      formErrors[key] ? "border-red-500" : "border-gray-700"
    }`;

  return (
    <div>
      <ConfirmDialog
        isOpen={confirm.open}
        title="Delete User"
        message={`Delete "${confirm.name}"? This cannot be undone.`}
        onConfirm={async () => {
          try {
            await usersAdminAPI.delete(confirm.id);
            await fetchUsers();
          } catch (err) {
            alert(err.response?.data?.message || "Failed to delete user.");
          } finally {
            setConfirm({ open: false, id: null, name: "" });
          }
        }}
        onCancel={() => setConfirm({ open: false, id: null, name: "" })}
        confirmText="Delete"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Users</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Manage newsroom accounts and roles — Super Admin only
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 transition-all cursor-pointer font-medium text-sm w-full sm:w-auto"
        >
          <FiPlus size={18} /> Add User
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users by name, email, or role…"
          className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-9 pr-10 py-2.5 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white cursor-pointer">
            <FiX size={14} />
          </button>
        )}
      </div>

      {/* User list */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#F5C645]" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-gray-900/40 rounded-2xl">
          <p className="text-gray-400 text-sm">
            {search ? `No users match "${search}".` : 'No users yet. Click "Add User" to create one.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((user) => (
            <div
              key={user._id}
              className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-xl p-4 sm:p-5 hover:border-[#F5C645]/40 transition-all flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="w-11 h-11 rounded-full bg-[#F5C645]/20 flex items-center justify-center shrink-0">
                <FiUser className="text-[#F5C645]" size={20} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-white font-semibold truncate">{user.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ROLE_BADGE[user.role] || "bg-gray-500/15 text-gray-400"}`}>
                    {user.role}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${user.isActive ? "bg-green-500/15 text-green-400" : "bg-gray-700/40 text-gray-400"}`}>
                    {user.isActive ? <FiCheckCircle size={10} /> : <FiSlash size={10} />}
                    {user.isActive ? "Active" : "Deactivated"}
                  </span>
                </div>
                <p className="text-gray-500 text-xs flex items-center gap-1 mt-1">
                  <FiMail size={11} /> {user.email}
                </p>
              </div>

              <div className="flex gap-1 shrink-0">
                <button
                  onClick={() => toggleActive(user)}
                  title={user.isActive ? "Deactivate" : "Activate"}
                  className={`p-2 rounded-lg cursor-pointer ${user.isActive ? "text-yellow-400 hover:bg-yellow-400/10" : "text-green-400 hover:bg-green-400/10"}`}
                >
                  {user.isActive ? <FiSlash size={16} /> : <FiCheckCircle size={16} />}
                </button>
                <button onClick={() => openModal(user)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg cursor-pointer">
                  <FiEdit2 size={16} />
                </button>
                <button
                  onClick={() => setConfirm({ open: true, id: user._id, name: user.name })}
                  className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg cursor-pointer"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ══════════════ MODAL ══════════════ */}
      {showModal && (
        <div className="fixed inset-0 bg-black/85 overflow-y-auto z-50 p-3 sm:p-4">
          <div className="max-w-md mx-auto my-4 sm:my-8">
            <div className="bg-[#0d0d0d] border border-[#F5C645]/20 rounded-2xl">
              <div className="flex justify-between items-center px-5 sm:px-6 py-4 border-b border-gray-800">
                <h2 className="text-white text-lg sm:text-xl font-semibold flex items-center gap-2">
                  <FiShield className="text-[#F5C645]" size={18} />
                  {editingUser ? "Edit User" : "Add User"}
                </h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-white cursor-pointer p-1">
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="px-5 sm:px-6 pb-6 pt-4 space-y-4">
                <div>
                  <label className="block text-gray-300 mb-1.5 text-sm">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => { setFormData((p) => ({ ...p, name: e.target.value })); setFormErrors((p) => ({ ...p, name: "" })); }}
                    className={inpCls("name")}
                    placeholder="Full name"
                  />
                  {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-1.5 text-sm">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled={!!editingUser}
                    onChange={(e) => { setFormData((p) => ({ ...p, email: e.target.value })); setFormErrors((p) => ({ ...p, email: "" })); }}
                    className={inpCls("email") + (editingUser ? " opacity-50 cursor-not-allowed" : "")}
                    placeholder="user@newsportal.com"
                  />
                  {editingUser && <p className="text-gray-500 text-xs mt-1">Email can't be changed once created.</p>}
                  {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-1.5 text-sm">
                    {editingUser ? "New Password (optional)" : "Password"} {!editingUser && <span className="text-red-400">*</span>}
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => { setFormData((p) => ({ ...p, password: e.target.value })); setFormErrors((p) => ({ ...p, password: "" })); }}
                    className={inpCls("password")}
                    placeholder={editingUser ? "Leave blank to keep current password" : "At least 6 characters"}
                  />
                  {formErrors.password && <p className="text-red-400 text-xs mt-1">{formErrors.password}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-1.5 text-sm">
                    Role <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => { setFormData((p) => ({ ...p, role: e.target.value })); setFormErrors((p) => ({ ...p, role: "" })); }}
                    className={inpCls("role") + " cursor-pointer"}
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  {formErrors.role && <p className="text-red-400 text-xs mt-1">{formErrors.role}</p>}
                </div>

                {formErrors.api && (
                  <div className="flex items-start gap-3 bg-red-950/60 border border-red-500/40 text-red-300 px-4 py-3 rounded-xl text-sm">
                    <FiAlertCircle size={15} className="shrink-0 mt-0.5" />{formErrors.api}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={closeModal} disabled={saving}
                    className="flex-1 py-2.5 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-all cursor-pointer text-sm">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving}
                    className="flex-1 py-2.5 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 transition-all font-semibold disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 text-sm">
                    <FiSave size={15} />
                    {saving ? "Saving…" : editingUser ? "Update User" : "Save User"}
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