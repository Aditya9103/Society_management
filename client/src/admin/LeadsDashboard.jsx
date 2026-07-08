import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut, Zap, LayoutDashboard, Users, MessageSquare, Search, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../utils/cn';
import { logout, selectCurrentUser } from '../store/slices/authSlice';
import { useLogoutMutation } from '../store/api/authApi';
import { useGetLeadsQuery, useUpdateLeadStatusMutation } from '../store/api/leadsApi';
import { useGetContactMessagesQuery, useUpdateContactMessageStatusMutation } from '../store/api/contactApi';
import BlogManager from './components/BlogManager';
import { PenTool } from 'lucide-react';

export default function LeadsDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const [activeTab, setActiveTab] = useState(() => {
    return sessionStorage.getItem('admin_active_tab') || 'leads';
  }); // leads, messages, blogs

  useEffect(() => {
    sessionStorage.setItem('admin_active_tab', activeTab);
  }, [activeTab]);

  const [statusFilter, setStatusFilter] = useState('all');

  const { data: leadsData, isLoading: leadsLoading } = useGetLeadsQuery(
    statusFilter !== 'all' ? { status: statusFilter } : undefined
  );

  const { data: msgData, isLoading: msgLoading } = useGetContactMessagesQuery(
    statusFilter !== 'all' ? { status: statusFilter } : undefined
  );
  const [updateLeadStatus] = useUpdateLeadStatusMutation();
  const [updateContactMessageStatus] = useUpdateContactMessageStatusMutation();
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } catch (e) {
      console.error('Logout failed', e);
    } finally {
      dispatch(logout());
      navigate('/admin/login');
    }
  };

  const statusColors = {
    new: 'bg-blue-100 text-blue-700 border-blue-200',
    contacted: 'bg-amber-100 text-amber-700 border-amber-200',
    converted: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    lost: 'bg-[var(--surface-light-alt)] text-[var(--text-on-light-muted)] border-[var(--line-on-light)]',
    replied: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    closed: 'bg-[var(--surface-light-alt)] text-[var(--text-on-light-muted)] border-[var(--line-on-light)]'
  };

  return (
    <div className="min-h-screen bg-[var(--surface-light)] flex font-sans">

      {/* Sidebar */}
      <aside className="w-64 bg-[var(--surface-dark)] text-white flex flex-col fixed inset-y-0 left-0 z-10">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--brass-400)] flex items-center justify-center">
            <Zap size={16} className="text-[var(--navy-950)] fill-[var(--navy-950)]" />
          </div>
          <span className="font-bold text-lg tracking-tight">Parapet Admin</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => { setActiveTab('leads'); setStatusFilter('all'); }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm",
              activeTab === 'leads' ? "bg-[var(--brass-400)] text-[var(--navy-950)] shadow-sm" : "text-white/70 hover:bg-white/5 hover:text-white"
            )}
          >
            <Users size={18} /> Demo Requests
          </button>
          <button
            onClick={() => { setActiveTab('messages'); setStatusFilter('all'); }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm",
              activeTab === 'messages' ? "bg-[var(--brass-400)] text-[var(--navy-950)] shadow-sm" : "text-white/70 hover:bg-white/5 hover:text-white"
            )}
          >
            <MessageSquare size={18} /> Contact Messages
          </button>
          <button
            onClick={() => { setActiveTab('blogs'); setStatusFilter('all'); }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm",
              activeTab === 'blogs' ? "bg-[var(--brass-400)] text-[var(--navy-950)] shadow-sm" : "text-white/70 hover:bg-white/5 hover:text-white"
            )}
          >
            <PenTool size={18} /> Blog Posts
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold uppercase">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <p className="text-sm font-medium leading-none mb-1">{user?.name || 'Admin'}</p>
              <p className="text-xs text-white/50">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-medium"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">

        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-on-light)] flex items-center gap-2">
              <LayoutDashboard size={24} className="text-[var(--brass-400)]" />
              {activeTab === 'leads' ? 'Demo Requests ' : activeTab === 'messages' ? 'Contact Messages' : 'Blog Management'}
            </h1>
            <p className="text-[var(--text-on-light-faint)] text-sm mt-1">
              {activeTab === 'blogs' ? 'Create, edit, and publish blog articles.' : 'Manage and track your incoming requests.'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {activeTab === 'leads' ? (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-[var(--line-on-light)] rounded-lg text-sm font-medium text-[var(--text-on-light-muted)] font-medium bg-white outline-none focus:border-[var(--brass)]"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
              </select>
            ) : activeTab === 'messages' ? (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-[var(--line-on-light)] rounded-lg text-sm font-medium text-[var(--text-on-light-muted)] font-medium bg-white outline-none focus:border-[var(--brass)]"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="replied">Replied</option>
                <option value="closed">Closed</option>
              </select>
            ) : null}
          </div>
        </header>

        {activeTab === 'leads' && (
          <div className="bg-white border border-[var(--line-on-light)] rounded-2xl shadow-sm overflow-hidden">
            {leadsLoading ? (
              <div className="p-12 text-center text-[var(--text-on-light-faint)]">Loading leads...</div>
            ) : leadsData?.data?.length === 0 ? (
              <div className="p-12 text-center text-[var(--text-on-light-faint)] font-medium">No leads found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[var(--surface-light)] border-b border-[var(--line-on-light)]">
                      <th className="px-6 py-4 text-xs font-bold text-[var(--text-on-light-faint)] uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-[var(--text-on-light-faint)] uppercase tracking-wider">Society & Contact</th>
                      <th className="px-6 py-4 text-xs font-bold text-[var(--text-on-light-faint)] uppercase tracking-wider">Units</th>
                      <th className="px-6 py-4 text-xs font-bold text-[var(--text-on-light-faint)] uppercase tracking-wider">Source</th>
                      <th className="px-6 py-4 text-xs font-bold text-[var(--text-on-light-faint)] uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leadsData?.data?.map((lead) => (
                      <tr key={lead._id} className="hover:bg-[var(--surface-light)]/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-on-light-muted)] font-medium">
                          {format(new Date(lead.createdAt), 'MMM d, yyyy')}
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-[var(--text-on-light)]">{lead.societyName}</p>
                          <p className="text-sm text-[var(--text-on-light-faint)]">{lead.name} • {lead.workEmail}</p>
                          {lead.phone && <p className="text-xs text-[var(--text-on-light-faint)] mt-0.5">{lead.phone}</p>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-on-light-muted)] font-medium">
                          {lead.unitCount || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 bg-[var(--surface-light-alt)] text-[var(--text-on-light-muted)] rounded text-xs font-medium uppercase tracking-wide">
                            {lead.source}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus({ id: lead._id, status: e.target.value })}
                            className={cn(
                              "text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border outline-none cursor-pointer appearance-none",
                              statusColors[lead.status] || statusColors.new
                            )}
                          >
                            <option value="new">NEW</option>
                            <option value="contacted">CONTACTED</option>
                            <option value="converted">CONVERTED</option>
                            <option value="lost">LOST</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-white border border-[var(--line-on-light)] rounded-2xl shadow-sm overflow-hidden">
            {msgLoading ? (
              <div className="p-12 text-center text-[var(--text-on-light-faint)]">Loading messages...</div>
            ) : msgData?.data?.length === 0 ? (
              <div className="p-12 text-center text-[var(--text-on-light-faint)] font-medium">No messages found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[var(--surface-light)] border-b border-[var(--line-on-light)]">
                      <th className="px-6 py-4 text-xs font-bold text-[var(--text-on-light-faint)] uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-[var(--text-on-light-faint)] uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 text-xs font-bold text-[var(--text-on-light-faint)] uppercase tracking-wider">Message</th>
                      <th className="px-6 py-4 text-xs font-bold text-[var(--text-on-light-faint)] uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {msgData?.data?.map((msg) => (
                      <tr key={msg._id} className="hover:bg-[var(--surface-light)]/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-on-light-muted)] font-medium align-top">
                          {format(new Date(msg.createdAt), 'MMM d, yyyy')}
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm font-bold text-[var(--text-on-light)]">{msg.name}</p>
                          <p className="text-sm text-[var(--text-on-light-faint)]">{msg.email}</p>
                          {msg.phone && <p className="text-xs text-[var(--text-on-light-faint)] mt-0.5">{msg.phone}</p>}
                        </td>
                        <td className="px-6 py-4 max-w-md">
                          <p className="text-sm text-[var(--text-on-light-muted)] leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap align-top">
                          <select
                            value={msg.status}
                            onChange={(e) => updateContactMessageStatus({ id: msg._id, status: e.target.value })}
                            className={cn(
                              "text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border outline-none cursor-pointer appearance-none",
                              statusColors[msg.status] || statusColors.new
                            )}
                          >
                            <option value="new">NEW</option>
                            <option value="replied">REPLIED</option>
                            <option value="closed">CLOSED</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'blogs' && (
          <BlogManager />
        )}

      </main>
    </div>
  );
}
