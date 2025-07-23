
import React from 'react';
import { ShieldAlert, Calendar, Flag, Link as LinkIcon, AlertTriangle, FileText } from 'lucide-react';
import { UserRole } from '../../types';

interface RiesgosComplianceProps {
  userRole: UserRole;
}

const TrafficLight: React.FC<{ level: 'low' | 'medium' | 'high' }> = ({ level }) => {
  const colorMap = {
    low: 'bg-sb-green',
    medium: 'bg-yellow-400',
    high: 'bg-sb-red',
  };
  const textMap = {
    low: 'Bajo',
    medium: 'Medio',
    high: 'Alto',
  };
  return (
    <div className="flex items-center space-x-2">
      <span className={`w-3 h-3 rounded-full ${colorMap[level]}`}></span>
      <span className="font-medium capitalize">{textMap[level]}</span>
    </div>
  );
};

const RiesgosCompliance: React.FC<RiesgosComplianceProps> = ({ userRole }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-sb-blue mb-4 flex items-center"><AlertTriangle className="mr-2"/> Panel de Alertas y Riesgos</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border">
            <div>
              <p className="font-semibold">Cumplimiento Normativa SOX</p>
              <p className="text-sm text-gray-500">Próxima auditoría: 30/08/2024</p>
            </div>
            <TrafficLight level="low" />
          </div>
          <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg border border-yellow-300">
            <div>
              <p className="font-semibold">Política de Protección de Datos</p>
              <p className="text-sm text-gray-500">Revisión pendiente</p>
            </div>
            <TrafficLight level="medium" />
          </div>
          <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg border border-red-300">
            <div>
              <p className="font-semibold">Vencimiento Poderes Legales</p>
              <p className="text-sm text-gray-500">Varios apoderados con poderes por expirar</p>
            </div>
            <TrafficLight level="high" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-sb-blue mb-4 flex items-center"><Calendar className="mr-2" /> Calendario de Cumplimiento</h3>
        <div className="text-center text-gray-500 p-8 border-2 border-dashed rounded-lg">
          <Calendar size={48} className="mx-auto text-gray-300" />
          <p className="mt-4">Vista de calendario de auditorías y vencimientos legales se mostrará aquí.</p>
        </div>
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-sb-blue mb-4 flex items-center"><LinkIcon className="mr-2" /> Accesos Directos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="bg-sb-gray hover:bg-gray-200 p-4 rounded-lg text-left transition-colors">
            <ShieldAlert className="text-sb-blue mb-2" />
            <p className="font-semibold">Matriz de Riesgos</p>
            <p className="text-sm text-gray-600">Ver y editar la matriz de riesgos corporativa.</p>
          </button>
          <button className="bg-sb-gray hover:bg-gray-200 p-4 rounded-lg text-left transition-colors">
            <Flag className="text-sb-blue mb-2" />
            <p className="font-semibold">Canal de Denuncias</p>
            <p className="text-sm text-gray-600">Acceder al portal para realizar denuncias.</p>
          </button>
          <button className="bg-sb-gray hover:bg-gray-200 p-4 rounded-lg text-left transition-colors">
            <FileText className="text-sb-blue mb-2" />
            <p className="font-semibold">Políticas Internas</p>
            <p className="text-sm text-gray-600">Consultar el repositorio de políticas vigentes.</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiesgosCompliance;
