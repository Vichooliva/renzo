import React, { useState } from 'react';
import { Handshake, Building, Mail, Phone, History } from 'lucide-react';
import { UserRole, Institution, InstitutionalInteraction } from '../../types';

interface RelacionesInstitucionalesProps {
  userRole: UserRole;
}

const MOCK_DATA: Institution[] = [
    {
        id: 'INS01', name: 'Servicio de Impuestos Internos (SII)', contactPerson: 'Jefatura Regional', contactEmail: 'contacto.rm@sii.cl',
        interactions: [
            { id: 'INT01_1', date: '2024-07-05', type: 'Oficio Recibido', summary: 'Solicitud de información sobre declaración de renta.' },
            { id: 'INT01_2', date: '2024-07-20', type: 'Oficio Enviado', summary: 'Respuesta a solicitud de información.' },
        ]
    },
    {
        id: 'INS02', name: 'Municipalidad de Santiago', contactPerson: 'Dirección de Obras', contactEmail: 'dobras@munistgo.cl',
        interactions: [
            { id: 'INT02_1', date: '2024-06-15', type: 'Reunión', summary: 'Presentación de proyecto de nueva sucursal.' },
        ]
    },
    {
        id: 'INS03', name: 'Superintendencia de Salud', contactPerson: 'Fiscalía', contactEmail: 'fiscalia@supersalud.gob.cl',
        interactions: []
    }
];

const RelacionesInstitucionales: React.FC<RelacionesInstitucionalesProps> = ({ userRole }) => {
    const [selectedInstitution, setSelectedInstitution] = useState<Institution>(MOCK_DATA[0]);

    return (
        <div className="flex h-full bg-white rounded-lg shadow-md overflow-hidden">
            <div className="w-1/3 border-r border-gray-200">
                <div className="p-4 border-b">
                    <h3 className="text-lg font-bold text-sb-blue flex items-center"><Building className="mr-2"/> Instituciones</h3>
                </div>
                <nav className="p-2">
                    {MOCK_DATA.map(inst => (
                        <button
                            key={inst.id}
                            onClick={() => setSelectedInstitution(inst)}
                            className={`w-full text-left p-3 rounded-lg flex items-center transition-colors ${selectedInstitution.id === inst.id ? 'bg-sb-blue text-white' : 'hover:bg-sb-gray'}`}
                        >
                            <Building size={18} className="mr-3 shrink-0"/>
                            <span className="text-sm font-medium">{inst.name}</span>
                        </button>
                    ))}
                </nav>
            </div>
            <div className="w-2/3 flex flex-col">
                {selectedInstitution ? (
                    <>
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-sb-blue">{selectedInstitution.name}</h2>
                            <div className="flex items-center space-x-6 mt-2 text-sm text-gray-600">
                                <div className="flex items-center"><Mail size={14} className="mr-2"/>{selectedInstitution.contactEmail}</div>
                                <div className="flex items-center"><Phone size={14} className="mr-2"/>{selectedInstitution.contactPerson}</div>
                            </div>
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto">
                            <h4 className="text-md font-bold text-sb-dark mb-4 flex items-center"><History className="mr-2"/>Historial de Interacciones</h4>
                             {selectedInstitution.interactions.length > 0 ? (
                                <div className="space-y-4">
                                    {selectedInstitution.interactions.map(inter => (
                                        <div key={inter.id} className="p-4 bg-sb-gray rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <p className="font-semibold text-sb-dark">{inter.type}</p>
                                                <p className="text-sm text-gray-500">{inter.date}</p>
                                            </div>
                                            <p className="mt-2 text-sm text-gray-700">{inter.summary}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 pt-8">No hay interacciones registradas.</p>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        <p>Selecciona una institución para ver los detalles.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RelacionesInstitucionales;
