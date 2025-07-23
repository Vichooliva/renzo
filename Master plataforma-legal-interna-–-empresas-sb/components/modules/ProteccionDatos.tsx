import React, { useState } from 'react';
import { DatabaseZap, ShieldAlert, UserCheck, Plus } from 'lucide-react';
import { UserRole, PrivacyRequest, PrivacyRequestStatus } from '../../types';

interface ProteccionDatosProps {
  userRole: UserRole;
}

const MOCK_REQUESTS: PrivacyRequest[] = [
    { id: 'ARCO-001', type: 'ARCO', subject: 'Ana Fuentes', requestDate: '2024-07-20', dueDate: '2024-08-10', status: PrivacyRequestStatus.Pendiente },
    { id: 'INC-001', type: 'Incidente', subject: 'Acceso no autorizado a BD', requestDate: '2024-07-15', dueDate: 'N/A', status: PrivacyRequestStatus.Completado },
    { id: 'ARCO-002', type: 'ARCO', subject: 'Carlos Diaz', requestDate: '2024-06-01', dueDate: '2024-06-21', status: PrivacyRequestStatus.Vencido },
    { id: 'ARCO-003', type: 'ARCO', subject: 'Laura Pausini', requestDate: '2024-07-22', dueDate: '2024-08-12', status: PrivacyRequestStatus.Pendiente },
];

type Tab = 'incidentes' | 'solicitudes';

const ProteccionDatos: React.FC<ProteccionDatosProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState<Tab>('solicitudes');
  const canManage = userRole === UserRole.AbogadoSenior || userRole === UserRole.ComplianceOfficer;

  const getStatusBadge = (status: PrivacyRequestStatus) => {
    switch (status) {
      case PrivacyRequestStatus.Pendiente:
        return 'bg-blue-100 text-blue-800';
      case PrivacyRequestStatus.Completado:
        return 'bg-green-100 text-green-800';
      case PrivacyRequestStatus.Vencido:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs: { id: Tab; name: string; icon: React.ReactNode }[] = [
    { id: 'solicitudes', name: 'Solicitudes ARCO', icon: <UserCheck size={18} /> },
    { id: 'incidentes', name: 'Panel de Incidentes', icon: <ShieldAlert size={18} /> },
  ];

  const filteredRequests = MOCK_REQUESTS.filter(r => 
    activeTab === 'solicitudes' ? r.type === 'ARCO' : r.type === 'Incidente'
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
            <div>
                <h3 className="text-xl font-bold text-sb-blue flex items-center"><DatabaseZap className="mr-2" /> Protección de Datos y Privacidad</h3>
                <p className="text-sm text-gray-500">Gestión de incidentes, bitácora ARCO y consentimientos.</p>
            </div>
            {canManage && (
                <button className="bg-sb-blue hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center transition-colors">
                    <Plus size={20} className="mr-2" />
                    Registrar Solicitud/Incidente
                </button>
            )}
        </div>

        <div className="mb-6">
            <div className="flex space-x-1 border border-gray-200 rounded-lg p-1 w-fit bg-gray-50">
            {tabs.map(tab => (
                <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                    ? 'bg-white text-sb-blue shadow'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
                >
                {tab.icon}
                <span>{tab.name}</span>
                </button>
            ))}
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-gray-700 uppercase bg-sb-gray">
                <tr>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Asunto / Titular</th>
                    <th scope="col" className="px-6 py-3">Fecha Solicitud</th>
                    <th scope="col" className="px-6 py-3">Fecha Vencimiento</th>
                    <th scope="col" className="px-6 py-3 text-center">Estado</th>
                </tr>
                </thead>
                <tbody>
                {filteredRequests.map(req => (
                    <tr key={req.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-xs">{req.id}</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900">{req.subject}</th>
                    <td className="px-6 py-4">{req.requestDate}</td>
                    <td className="px-6 py-4">{req.dueDate}</td>
                    <td className="px-6 py-4 text-center">
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadge(req.status)}`}>
                        {req.status}
                        </span>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {filteredRequests.length === 0 && <p className="text-center p-8 text-gray-500">No hay registros para mostrar.</p>}
        </div>
    </div>
  );
};

export default ProteccionDatos;
