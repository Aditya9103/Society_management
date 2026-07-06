import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut, Zap, LayoutDashboard, Users, MessageSquare, Search, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../utils/cn';
import { logout, selectCurrentUser } from '../store/slices/authSlice';
import { useLogoutMutation } from '../store/api/authApi';
import { useGetLeadsQuery, useUpdateLeadStatusMutation } from '../store/api/leadsApi';
import { useGetContactMessagesQuery } from '../store/api/contactApi';

export default function LeadsDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  
  const [activeTab, setActiveTab] = useState('leads'); // leads, messages
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: leadsData, isLoading: leadsLoading } = useGetLeadsQuery(
    statusFilter !== 'all' ? { status: statusFilter } : undefined
  );
  
  const { data: msgData, isLoading: msgLoading } = useGetContactMessagesQuery();
  const [updateLeadStatus] = useUpdateLeadStatusMutation();
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
    lost: 'bg-bg-subtle text-tx-secondary border-bd-subtle',
    replied: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    closed: 'bg-bg-subtle text-tx-secondary border-bd-subtle'
  };

  return (
    <div className="min-h-screen bg-bg-app flex font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--ink)] text-white flex flex-col fixed inset-y-0 left-0 z-10">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--brass)] flex items-center justify-center">
            <Zap size={16} className="text-white fill-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">Parapet Admin</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('leads')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm",
              activeTab === 'leads' ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
            )}
          >
            <Users size={18} /> Demo Requests
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm",
              activeTab === 'messages' ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
            )}
          >
            <MessageSquare size={18} /> Contact Messages
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
            <h1 className="text-2xl font-bold text-tx-primary flex items-center gap-2">
              <LayoutDashboard size={24} className="text-[var(--brass)]" /> 
              {activeTab === 'leads' ? 'Demo Requests (Leads)' : 'Contact Messages'}
            </h1>
            <p className="text-tx-muted text-sm mt-1">Manage and track your incoming requests.</p>
          </div>
          
          <div className="flex items-center gap-4">
            {activeTab === 'leads' && (
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-bd-subtle rounded-lg text-sm font-medium text-tx-secondary font-medium bg-bg-surface outline-none focus:border-[var(--brass)]"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
              </select>
            )}
          </div>
        </header>

        {activeTab === 'leads' && (
          <div className="bg-bg-surface border border-bd-subtle rounded-2xl shadow-sm overflow-hidden">
            {leadsLoading ? (
              <div className="p-12 text-center text-tx-muted">Loading leads...</div>
            ) : leadsData?.data?.length === 0 ? (
              <div className="p-12 text-center text-tx-muted font-medium">No leads found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-bg-app border-b border-bd-subtle">
                      <th className="px-6 py-4 text-xs font-bold text-tx-muted uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-tx-muted uppercase tracking-wider">Society & Contact</th>
                      <th className="px-6 py-4 text-xs font-bold text-tx-muted uppercase tracking-wider">Units</th>
                      <th className="px-6 py-4 text-xs font-bold text-tx-muted uppercase tracking-wider">Source</th>
                      <th className="px-6 py-4 text-xs font-bold text-tx-muted uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leadsData?.data?.map((lead) => (
                      <tr key={lead._id} className="hover:bg-bg-app/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-tx-secondary font-medium">
                          {format(new Date(lead.createdAt), 'MMM d, yyyy')}
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-tx-primary">{lead.societyName}</p>
                          <p className="text-sm text-tx-muted">{lead.name} • {lead.workEmail}</p>
                          {lead.phone && <p className="text-xs text-tx-muted mt-0.5">{lead.phone}</p>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-tx-secondary font-medium">
                          {lead.unitCount || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 bg-bg-subtle text-tx-secondary rounded text-xs font-medium uppercase tracking-wide">
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
          <div className="bg-bg-surface border border-bd-subtle rounded-2xl shadow-sm overflow-hidden">
            {msgLoading ? (
              <div className="p-12 text-center text-tx-muted">Loading messages...</div>
            ) : msgData?.data?.length === 0 ? (
              <div className="p-12 text-center text-tx-muted font-medium">No messages found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-bg-app border-b border-bd-subtle">
                      <th className="px-6 py-4 text-xs font-bold text-tx-muted uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-tx-muted uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 text-xs font-bold text-tx-muted uppercase tracking-wider">Message</th>
                      <th className="px-6 py-4 text-xs font-bold text-tx-muted uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {msgData?.data?.map((msg) => (
                      <tr key={msg._id} className="hover:bg-bg-app/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-tx-secondary font-medium align-top">
                          {format(new Date(msg.createdAt), 'MMM d, yyyy')}
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm font-bold text-tx-primary">{msg.name}</p>
                          <p className="text-sm text-tx-muted">{msg.email}</p>
                          {msg.phone && <p className="text-xs text-tx-muted mt-0.5">{msg.phone}</p>}
                        </td>
                        <td className="px-6 py-4 max-w-md">
                          <p className="text-sm text-tx-secondary leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap align-top">
                          <span className={cn("text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border", statusColors[msg.status] || statusColors.new)}>
                            {msg.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
