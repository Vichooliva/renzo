
import React from 'react';
import { Scale, FileText, User, CalendarDays } from 'lucide-react';
import { UserRole, LegalCase, TimelineEvent } from '../../types';

const MOCK_CASE: LegalCase = {
  id: 'L-2024-15A',
  name: 'Demanda Laboral - Juan Pérez vs. SB',
  status: 'En etapa probatoria',
  timeline: [
    { id: 1, date: '2024-03-01', title: 'Recepción de Demanda', description: 'Notificación formal de la demanda.', responsible: 'R. Soto' },
    { id: 2, date: '2024-03-15', title: 'Contestación de Demanda', description: 'Presentación de escrito de contestación.', responsible: 'R. Soto' },
    { id: 3, date: '2024-05-20', title: 'Audiencia Preparatoria', description: 'Fijación de hechos a probar y ofrecimiento de prueba.', responsible: 'L. Vega' },
    { id: 4, date: '2024-07-10', title: 'Audiencia de Juicio (1/2)', description: 'Rendición de prueba testimonial.', responsible: 'L. Vega' },
    { id: 5, date: '2024-08-05', title: 'Audiencia de Juicio (2/2)', description: 'Próxima audiencia para prueba documental y pericial.', responsible: 'L. Vega' },
  ],
};

interface DefensaLegalProps {
  userRole: UserRole;
}

const TimelineItem: React.FC<{ event: TimelineEvent; isLast: boolean }> = ({ event, isLast }) => (
  <div className="relative flex items-start">
    <div className="flex flex-col items-center mr-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sb-blue text-white flex items-center justify-center z-10">
        <CalendarDays size={16} />
      </div>
      {!isLast && <div className="w-px h-full bg-gray-300"></div>}
    </div>
    <div className="pb-8 flex-1">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <p className="text-sm font-semibold text-gray-500">{event.date}</p>
        <h4 className="font-bold text-sb-dark mt-1">{event.title}</h4>
        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
        <div className="text-xs text-sb-blue font-semibold mt-2 flex items-center">
          <User size={12} className="mr-1.5" /> Responsable: {event.responsible}
        </div>
      </div>
    </div>
  </div>
);

const DefensaLegal: React.FC<DefensaLegalProps> = ({ userRole }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h3 className="text-xl font-bold text-sb-blue mb-4">Cronograma Procesal del Caso</h3>
        <div className="relative">
          {MOCK_CASE.timeline.map((event, index) => (
            <TimelineItem key={event.id} event={event} isLast={index === MOCK_CASE.timeline.length - 1} />
          ))}
        </div>
      </div>
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
          <h3 className="text-lg font-bold text-sb-blue mb-4 flex items-center"><Scale className="mr-2" /> Ficha del Caso</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold">Nombre del Caso:</p>
              <p>{MOCK_CASE.name}</p>
            </div>
            <div>
              <p className="font-semibold">ID del Caso:</p>
              <p className="font-mono text-xs">{MOCK_CASE.id}</p>
            </div>
            <div>
              <p className="font-semibold">Estado Actual:</p>
              <span className="bg-yellow-100 text-yellow-800 font-medium px-2 py-1 rounded-full text-xs">{MOCK_CASE.status}</span>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="font-semibold text-sb-dark mb-2">Documentos Asociados</h4>
            <div className="space-y-2">
              <a href="#" className="flex items-center text-sb-blue hover:underline text-sm"><FileText size={16} className="mr-2 shrink-0" /> Demanda_JPerez.pdf</a>
              <a href="#" className="flex items-center text-sb-blue hover:underline text-sm"><FileText size={16} className="mr-2 shrink-0" /> Contestacion_SB.pdf</a>
              <a href="#" className="flex items-center text-sb-blue hover:underline text-sm"><FileText size={16} className="mr-2 shrink-0" /> Acta_Audiencia_Preparatoria.pdf</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefensaLegal;
