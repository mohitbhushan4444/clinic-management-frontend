import React from 'react';
import { Bell, Search } from 'lucide-react';

interface HeaderProps {
  user: any;
  activeTab: string;
}

const Header = ({ user, activeTab }: HeaderProps) => {
  const getPageTitle = (tab: string) => {
    const titles: { [key: string]: string } = {
      patients: 'Patient Management',
      consultations: 'Consultations',
      prescriptions: 'Digital Prescriptions',
      reports: 'Reports & Analytics',
    };
    return titles[tab] || 'Dashboard';
  };

  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {getPageTitle(activeTab)}
          </h1>
          <p className="text-gray-600">
            Welcome back, {user?.fullName}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search patients, prescriptions..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>

          {/* Notifications */}
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;