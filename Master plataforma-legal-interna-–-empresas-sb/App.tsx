
import React, { useState, useMemo } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { MODULES } from './constants';
import { UserRole, ModuleId } from './types';

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState<ModuleId>(ModuleId.Asesoria);
  const [activeRole, setActiveRole] = useState<UserRole>(UserRole.AbogadoSenior);
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const availableModules = useMemo(() => {
    return MODULES.filter(module => module.allowedRoles.includes(activeRole));
  }, [activeRole]);
  
  const activeModule = useMemo(() => {
    const foundModule = availableModules.find(m => m.id === activeModuleId);
    if (foundModule) {
      return foundModule;
    }
    // If current module not allowed, default to first available module
    if (availableModules.length > 0) {
      setActiveModuleId(availableModules[0].id);
      return availableModules[0];
    }
    return null;
  }, [activeModuleId, availableModules]);

  const ActiveComponent = activeModule?.component;

  return (
    <div className="flex h-screen bg-sb-gray text-sb-dark font-sans">
      <Sidebar
        modules={availableModules}
        activeModuleId={activeModuleId}
        setActiveModuleId={setActiveModuleId}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          moduleName={activeModule?.name || 'Bienvenido'}
          activeRole={activeRole}
          setActiveRole={setActiveRole}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
          {ActiveComponent ? <ActiveComponent userRole={activeRole} /> : 
            <div className="text-center p-10">
              <h2 className="text-2xl font-bold">No tienes acceso a ningún módulo.</h2>
              <p>Por favor, contacta al administrador.</p>
            </div>
          }
        </main>
      </div>
    </div>
  );
}
