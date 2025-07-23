import React from 'react';
import { Landmark, Calendar, FileText, Lock, Unlock } from 'lucide-react';
import { UserRole, CorporateDocument } from '../../types';

interface GobiernoCorporativoProps {
  userRole: UserRole;
}

const MOCK_DOCS: CorporateDocument[] = [
    { id: 'ACTA-2024-07', name: 'Acta de Directorio - Julio 2024', type: 'Acta de Directorio', date: '2024-07-15', accessRoles: [UserRole.AbogadoSenior, UserRole.LegalAssistant] },
    { id: 'POL-001', name: 'Política de Conflicto de Intereses', type: 'Política', date: '2024-01-10', accessRoles: [UserRole.AbogadoSenior, UserRole.LegalAssistant, UserRole.ComplianceOfficer, UserRole.RRHHLegal] },
    { id: 'AGENDA-2024-08', name: 'Agenda Reunión Directorio - Agosto 2024', type: 'Agenda', date: '2024-07-25', accessRoles: [UserRole.AbogadoSenior, UserRole.LegalAssistant] },
    { id: 'ACTA-2024-06', name: 'Acta de Directorio - Junio 2024', type: 'Acta de Directorio', date: '2024-06-18', accessRoles: [UserRole.AbogadoSenior, UserRole.LegalAssistant] },
];

const MOCK_MEETINGS = [
    { id: 'MEET-08', date: '12 de Agosto, 2024', time: '09:00 AM', title: 'Reunión Ordinaria de Directorio' },
    { id: 'MEET-09', date: '09 de Septiembre, 2024', time: '09:00 AM', title: 'Reunión Ordinaria de Directorio' },
]

const GobiernoCorporativo: React.FC<GobiernoCorporativoProps> = ({ userRole }) => {
  const hasAccess = (doc: CorporateDocument) => doc.accessRoles.includes(userRole);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-sb-blue mb-4 flex items-center"><FileText className="mr-2" /> Portal de Documentos</h3>
            <div className="space-y-3">
                {MOCK_DOCS.map(doc => (
                    <div key={doc.id} className={`p-4 rounded-lg flex items-center justify-between transition-all ${hasAccess(doc) ? 'bg-white border' : 'bg-gray-100 border'}`}>
                        <div>
                            <p className="font-bold text-sb-dark">{doc.name}</p>
                            <p className="text-sm text-gray-500">{doc.type} - {doc.date}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            {hasAccess(doc) ? (
                                <>
                                    <Unlock size={16} className="text-sb-green" />
                                    <button className="text-sm font-medium text-sb-blue hover:underline">Descargar</button>
                                </>
                            ) : (
                                <>
                                    <Lock size={16} className="text-sb-red" />
                                    <span className="text-sm font-medium text-gray-500">Restringido</span>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
      <div className="lg:col-span-2">
        <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
            <h3 className="text-lg font-bold text-sb-blue mb-4 flex items-center"><Calendar className="mr-2" /> Próximas Sesiones del Directorio</h3>
            <div className="space-y-4">
                {MOCK_MEETINGS.map(meeting => (
                    <div key={meeting.id} className="p-4 bg-sb-gray rounded-lg">
                        <p className="font-semibold text-sb-dark">{meeting.title}</p>
                        <p className="text-sm text-gray-600">{meeting.date} - {meeting.time}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default GobiernoCorporativo;
