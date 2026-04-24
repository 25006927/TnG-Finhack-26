import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Banknote,
  Truck,
  Receipt,
  ShieldCheck,
  BarChart3,
  Network,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/financing', label: 'Financing', icon: Banknote },
  { path: '/shipments', label: 'Shipments', icon: Truck },
  { path: '/transactions', label: 'Transactions', icon: Receipt },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/architecture', label: 'Architecture', icon: Network },
  { path: '/compliance', label: 'Compliance', icon: ShieldCheck },
  { path: '/assistant', label: 'AI Assistant', icon: MessageSquare },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { userProfile, logout } = useAuth();

  return (
    <aside
      className={`bg-sidebar text-white flex flex-col transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-tng-blue flex items-center justify-center">
              <Banknote className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight">TnG Trade</h1>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">FinHack 26</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-sidebar-hover transition-colors ml-auto"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-tng-blue text-white'
                    : 'text-gray-400 hover:text-white hover:bg-sidebar-hover'
                }`
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 flex flex-col gap-4">
        {/* User Profile & Sign Out */}
        <div className={`flex ${collapsed ? 'flex-col items-center' : 'items-center justify-between'} gap-3`}>
          {!collapsed && (
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-gray-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {userProfile?.companyName || 'SME User'}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {userProfile?.email || 'user@example.com'}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={logout}
            className={`p-2 rounded-lg text-gray-400 hover:text-white hover:bg-red-500/20 hover:text-red-400 transition-colors ${
              collapsed ? 'w-full flex justify-center' : ''
            }`}
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* System Status */}
        {!collapsed && (
          <div className="text-xs text-gray-500">
            <div className="flex items-center justify-between">
              <p>System Status</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-400">Operational</span>
              </div>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        )}
      </div>
    </aside>
  );
}
