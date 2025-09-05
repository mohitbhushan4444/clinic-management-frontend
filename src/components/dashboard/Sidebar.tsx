import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Settings } from 'lucide-react';

interface SidebarProps {
  tabs: Array<{ id: string; name: string; icon: React.ComponentType<any> }>;
  activeTab: string;
  onTabChange: (tab: string) => void;
  user: any;
}

const Sidebar = ({ tabs, activeTab, onTabChange, user }: SidebarProps) => {
  const { logout } = useAuth();

  return (
    <div className="bg-white w-64 shadow-lg flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-gray-800">Clinic Management</h1>
        <p className="text-sm text-gray-600">Homoeopathic Care</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{tab.name}</span>
            </button>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t">
        <div className="mb-4">
          <p className="font-medium text-gray-800">{user?.fullName}</p>
          <p className="text-sm text-gray-600">{user?.role}</p>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
        
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings size={16} />
            <span className="text-sm">Settings</span>
          </button>
          
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;