
import React from 'react';
import { X } from 'lucide-react';
import { Module, ModuleId } from '../types';

interface SidebarProps {
  modules: Module[];
  activeModuleId: ModuleId;
  setActiveModuleId: (id: ModuleId) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ modules, activeModuleId, setActiveModuleId, isSidebarOpen, setSidebarOpen }) => {
  const handleItemClick = (id: ModuleId) => {
    setActiveModuleId(id);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };
  
  const sidebarContent = (
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-between border-b border-blue-500/30">
          <h1 className="text-2xl font-bold text-white">SB Legal</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-300 hover:text-white">
              <X size={24} />
          </button>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {modules.map(({ id, name, Icon }) => (
            <button
              key={id}
              onClick={() => handleItemClick(id)}
              className={`w-full flex items-center p-3 rounded-lg transition-colors text-left ${
                activeModuleId === id
                  ? 'bg-blue-500/40 text-white'
                  : 'text-gray-300 hover:bg-blue-500/20 hover:text-white'
              }`}
            >
              <Icon className="mr-3 shrink-0" size={22} />
              <span className="text-sm font-medium">{name}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-blue-500/30 text-xs text-gray-400">
            <p>Versión 1.0.0</p>
            <p>&copy; 2024 Empresas SB</p>
        </div>
      </div>
  );

  return (
    <>
        <div className={`fixed inset-y-0 left-0 bg-sb-blue w-72 z-30 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:w-72 lg:shrink-0`}>
          {sidebarContent}
        </div>
        {isSidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-20 lg:hidden"></div>}
    </>
  );
};

export default Sidebar;
