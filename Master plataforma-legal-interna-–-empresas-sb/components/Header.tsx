
import React from 'react';
import { Search, Bell, UserCircle, Menu } from 'lucide-react';
import { UserRole } from '../types';
import { USER_ROLES } from '../constants';

interface HeaderProps {
  moduleName: string;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ moduleName, activeRole, setActiveRole, toggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm flex items-center justify-between p-4 z-10 shrink-0">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-gray-600 lg:hidden mr-4">
          <Menu size={24} />
        </button>
        <h1 className="text-xl md:text-2xl font-semibold text-sb-blue">{moduleName}</h1>
      </div>
      <div className="flex items-center space-x-4 md:space-x-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscador inteligente..."
            className="bg-sb-gray border border-gray-200 rounded-full py-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-sb-blue/50"
          />
        </div>

        <select
            value={activeRole}
            onChange={(e) => setActiveRole(e.target.value as UserRole)}
            className="bg-sb-gray border border-gray-200 rounded-md p-2 text-sm font-medium text-sb-dark focus:outline-none focus:ring-2 focus:ring-sb-blue/50"
        >
            {USER_ROLES.map(role => (
                <option key={role} value={role}>{role}</option>
            ))}
        </select>
        
        <button className="text-gray-500 hover:text-sb-blue">
          <Bell size={24} />
        </button>
        <button className="text-gray-500 hover:text-sb-blue">
          <UserCircle size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
