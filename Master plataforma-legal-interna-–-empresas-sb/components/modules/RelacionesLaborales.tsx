import React from 'react';
import { Briefcase, FileText, AlertTriangle, Download, Users } from 'lucide-react';
import { UserRole, CollectiveAgreement } from '../../types';

interface RelacionesLaboralesProps {
  userRole: UserRole;
}

const MOCK_AGREEMENTS: CollectiveAgreement[] = [
  { id: 'AGR001', unionName: 'Sindicato N°1 de Trabajadores SB', effectiveDate: '2023-01-01', expirationDate: '2024-12-31', documentUrl: '#' },
  { id: 'AGR002', unionName: 'Sindicato de Profesionales y Técnicos', effectiveDate: '2022-09-01', expirationDate: '2024-08-31', documentUrl: '#' },
  { id: 'AGR003', unionName: 'Sindicato Interempresa Logística', effectiveDate: '2024-03-15', expirationDate: '2026-03-14', documentUrl: '#' },
];

const KEY_DOCUMENTS = [
    { id: 'DOC01', name: 'Reglamento Interno de Orden, Higiene y Seguridad', url: '#' },
    { id: 'DOC02', name: 'Modelo Contrato de Trabajo Plazo Fijo', url: '#' },
    { id: 'DOC03', name: 'Modelo Contrato de Trabajo Indefinido', url: '#' },
    { id: 'DOC04', name: 'Política de Teletrabajo', url: '#' },
]

const RelacionesLaborales: React.FC<RelacionesLaboralesProps> = ({ userRole }) => {
  const isWithin90Days = (dateString: string) => {
    const expirationDate = new Date(dateString);
    const today = new Date();
    const diffTime = expirationDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 90 && diffDays > 0;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-sb-blue mb-4 flex items-center"><Users className="mr-2" /> Convenios Colectivos Vigentes</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-sb-gray">
                <tr>
                  <th scope="col" className="px-6 py-3">Sindicato</th>
                  <th scope="col" className="px-6 py-3">Vencimiento</th>
                  <th scope="col" className="px-6 py-3 text-center">Estado</th>
                  <th scope="col" className="px-6 py-3 text-center">Documento</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_AGREEMENTS.map(agreement => (
                  <tr key={agreement.id} className="bg-white border-b hover:bg-gray-50">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {agreement.unionName}
                    </th>
                    <td className="px-6 py-4">{agreement.expirationDate}</td>
                    <td className="px-6 py-4 text-center">
                      {isWithin90Days(agreement.expirationDate) ? (
                        <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          <AlertTriangle className="w-3 h-3 mr-1.5" />
                          Próximo a vencer
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Vigente
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <a href={agreement.documentUrl} target="_blank" rel="noopener noreferrer" className="text-sb-blue hover:underline">
                        <Download size={18} className="inline-block" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-sb-blue mb-4 flex items-center"><FileText className="mr-2" /> Documentos Clave</h3>
          <ul className="space-y-3">
            {KEY_DOCUMENTS.map(doc => (
                <li key={doc.id}>
                    <a href={doc.url} className="flex items-center p-3 text-sm text-gray-700 bg-sb-gray rounded-lg hover:bg-gray-200 transition-colors">
                        <Download size={16} className="mr-3 text-sb-blue shrink-0" />
                        <span className="flex-1">{doc.name}</span>
                    </a>
                </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RelacionesLaborales;
