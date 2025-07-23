
import React, { useState, useMemo } from 'react';
import { FileText, Plus, Search, ChevronsUpDown } from 'lucide-react';
import { UserRole, Contract, ContractStatus } from '../../types';

const MOCK_CONTRACTS: Contract[] = [
  { id: 'C001', name: 'Contrato de Arrendamiento Oficinas', type: 'Arrendamiento', area: 'Inmobiliaria', date: '2024-07-15', status: ContractStatus.Revision },
  { id: 'C002', name: 'Acuerdo de Servicios TI', type: 'Servicios', area: 'Tecnología', date: '2024-07-20', status: ContractStatus.Borrador },
  { id: 'C003', name: 'Contrato Proveedor Logístico', type: 'Proveedor', area: 'Operaciones', date: '2024-06-10', status: ContractStatus.Firmado },
  { id: 'C004', name: 'Acuerdo de Confidencialidad (NDA)', type: 'Confidencialidad', area: 'Innovación', date: '2024-07-01', status: ContractStatus.Revision },
  { id: 'C005', name: 'Contrato Marco de Publicidad', type: 'Marketing', area: 'Comercial', date: '2023-12-05', status: ContractStatus.Archivado },
  { id: 'C006', name: 'Contrato de Mantenimiento', type: 'Servicios', area: 'Operaciones', date: '2024-07-18', status: ContractStatus.Borrador },
];

const STATUS_ORDER: ContractStatus[] = [ContractStatus.Borrador, ContractStatus.Revision, ContractStatus.Firmado, ContractStatus.Archivado];

interface GestionContratosProps {
  userRole: UserRole;
}

const ContractCard: React.FC<{ contract: Contract }> = ({ contract }) => (
  <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 mb-3 cursor-pointer hover:shadow-lg transition-shadow">
    <h4 className="font-bold text-sb-dark text-sm">{contract.name}</h4>
    <p className="text-xs text-gray-500 mt-1">{contract.type} / {contract.area}</p>
    <div className="text-xs text-gray-400 mt-2">ID: {contract.id}</div>
    <div className="text-xs text-gray-400">Fecha: {contract.date}</div>
  </div>
);

const GestionContratos: React.FC<GestionContratosProps> = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const canUpload = userRole === UserRole.AbogadoSenior || userRole === UserRole.LegalAssistant;

  const filteredContracts = useMemo(() => 
    MOCK_CONTRACTS.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]
  );

  const columns = useMemo(() => {
    const grouped = filteredContracts.reduce((acc, contract) => {
      (acc[contract.status] = acc[contract.status] || []).push(contract);
      return acc;
    }, {} as Record<ContractStatus, Contract[]>);

    return STATUS_ORDER.map(status => ({
      status,
      contracts: grouped[status] || [],
    }));
  }, [filteredContracts]);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-sb-blue/50"
          />
        </div>
        {canUpload && (
          <button className="mt-4 md:mt-0 w-full md:w-auto bg-sb-blue hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center transition-colors">
            <Plus size={20} className="mr-2" />
            Subir Contrato
          </button>
        )}
      </div>

      <div className="flex overflow-x-auto space-x-4 pb-4">
        {columns.map(({ status, contracts }) => (
          <div key={status} className="bg-sb-gray rounded-lg w-80 flex-shrink-0">
            <div className="p-4 border-b border-gray-300 sticky top-0 bg-sb-gray">
              <h3 className="font-bold text-sb-blue flex justify-between items-center">
                <span>{status}</span>
                <span className="text-sm font-normal bg-gray-300 text-sb-dark rounded-full px-2 py-0.5">{contracts.length}</span>
              </h3>
            </div>
            <div className="p-2 h-[calc(100vh-22rem)] overflow-y-auto">
              {contracts.length > 0 ? (
                contracts.map(contract => <ContractCard key={contract.id} contract={contract} />)
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">No hay contratos en este estado.</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestionContratos;
