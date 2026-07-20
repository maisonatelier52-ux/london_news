

// app/admin/dashboard/page.jsx
"use client";

import { useState, useEffect } from "react";
import {
  FiFolder, FiFileText, FiUsers, FiActivity,
  FiTrendingUp, FiClock, FiTrash2,
} from "react-icons/fi";
import { dashboardAdminAPI } from "@/services/adminAPI";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    categoriesCount: 0,
    articlesCount: 0,
    authorsCount: 0,
    recentActivities: [],
  });
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    try {
      const res = await dashboardAdminAPI.getStats();
      setStats(res.data);
    } catch (err) {
      console.error('Stats error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearActivities = async () => {
    setClearing(true);
    try {
      await dashboardAdminAPI.clearActivities();
      setStats((prev) => ({ ...prev, recentActivities: [] }));
    } catch (err) {
      console.error('Clear activities error:', err);
    } finally {
      setClearing(false);
      setShowClearConfirm(false);
    }
  };

  const statCards = [
    { title: 'Total Categories', value: stats.categoriesCount, icon: FiFolder,   color: 'from-yellow-500 to-orange-500', href: '/admin/categories' },
    { title: 'Total Articles',   value: stats.articlesCount,   icon: FiFileText, color: 'from-blue-500 to-cyan-500', href: '/admin/articles'    },
    { title: 'Total Authors',    value: stats.authorsCount,    icon: FiUsers,    color: 'from-green-500 to-emerald-500', href: '/admin/authors' },
  ];

  // ✅ Updated formatDate function with AM/PM display
  const formatDate = (d) => {
    const date = new Date(d);
    const formattedDate = date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
    
    const formattedTime = date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    
    return `${formattedDate} · ${formattedTime}`;
  };

  const actionColor = (action) => {
    const a = action.toLowerCase();
    if (a.includes('created')) return 'text-green-400';
    if (a.includes('deleted')) return 'text-red-400';
    if (a.includes('updated')) return 'text-blue-400';
    return 'text-gray-400';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F5C645]" />
      </div>
    );
  }

  return (
    <div>
      <ConfirmDialog
        isOpen={showClearConfirm}
        title="Clear Activity Log"
        message="Are you sure you want to clear all recent activity? This cannot be undone."
        onConfirm={handleClearActivities}
        onCancel={() => setShowClearConfirm(false)}
        confirmText={clearing ? 'Clearing…' : 'Clear All'}
        danger
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back to your admin panel</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map(({ title, value, icon: Icon, color, href }) => (
          <Link href={href} title={`admin ${title} page`}>
             <div key={title}
            className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl p-6 hover:border-[#F5C645]/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
                <Icon size={24} className="text-white" />
              </div>
              <FiTrendingUp className="text-green-500" size={20} />
            </div>
            <h3 className="text-gray-400 text-sm uppercase tracking-wide">{title}</h3>
            <p className="text-white text-3xl font-bold mt-2">{value}</p>
          </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FiActivity className="text-[#F5C645]" size={24} />
            <h2 className="text-white text-xl font-semibold">Recent Activity</h2>
            <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">
              {stats.recentActivities.length}
            </span>
          </div>

          {stats.recentActivities.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-400 border border-red-400/30 rounded-lg hover:bg-red-400/10 transition-all cursor-pointer"
            >
              <FiTrash2 size={14} />
              Clear All
            </button>
          )}
        </div>

        {stats.recentActivities.length > 0 ? (
          <div className="divide-y divide-gray-800">
            {stats.recentActivities.map((activity, i) => (
              <div key={i} className="flex items-start justify-between py-3 gap-4">
                <div className="flex items-start gap-3">
                  <FiClock size={14} className="text-gray-600 mt-0.5 shrink-0" />
                  <div>
                    <p className={`text-sm font-medium ${actionColor(activity.action)}`}>
                      {activity.action}
                    </p>
                    <p className="text-white text-sm mt-0.5">{activity.title}</p>
                  </div>
                </div>
                <p className="text-gray-500 text-xs whitespace-nowrap shrink-0 mt-1">
                  {formatDate(activity.createdAt)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-10">No recent activities yet.</p>
        )}
      </div>
    </div>
  );
}