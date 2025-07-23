import React from 'react';
import { HardHat } from 'lucide-react';
import { UserRole } from '../../types';

interface PlaceholderModuleProps {
  userRole: UserRole;
}

const PlaceholderModule = ({ userRole }: PlaceholderModuleProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center bg-white p-10 rounded-lg shadow-md">
      <HardHat className="text-yellow-500 mb-4" size={64} />
      <h2 className="text-2xl font-bold text-sb-blue">Módulo en Construcción</h2>
      <p className="text-gray-600 mt-2 max-w-md">
        Estamos trabajando para traerte la mejor experiencia en este módulo.
        Pronto estará disponible con todas sus funcionalidades.
      </p>
    </div>
  );
};

export default PlaceholderModule;