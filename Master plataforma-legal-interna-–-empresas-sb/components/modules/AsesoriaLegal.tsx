
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, HelpCircle } from 'lucide-react';
import { UserRole, ChatMessage } from '../../types';
import { askLegalQuestion } from '../../services/geminiService';

interface AsesoriaLegalProps {
  userRole: UserRole;
}

const AsesoriaLegal: React.FC<AsesoriaLegalProps> = ({ userRole }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: 'Hola, soy el asistente legal de Empresas SB. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const canAskQuestion = userRole !== UserRole.UsuarioGeneral;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !canAskQuestion) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiResponseText = await askLegalQuestion(input);
    const aiMessage: ChatMessage = { sender: 'ai', text: aiResponseText };
    
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      <div className="lg:col-span-2 flex flex-col bg-white rounded-lg shadow-md h-[calc(100vh-12rem)]">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-sb-blue flex items-center"><Sparkles className="mr-2 text-yellow-500" />Asistente Legal AI</h2>
        </div>
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-sb-blue text-white flex items-center justify-center shrink-0"><Sparkles size={18} /></div>}
              <div className={`max-w-xl p-4 rounded-xl text-white ${msg.sender === 'user' ? 'bg-gray-500' : 'bg-sb-blue'}`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
              {msg.sender === 'user' && <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center shrink-0"><User size={18} /></div>}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-sb-blue text-white flex items-center justify-center shrink-0"><Sparkles size={18} /></div>
              <div className="max-w-xl p-4 rounded-xl bg-sb-blue text-white">
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse delay-75"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse delay-150"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse delay-300"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>
        <form onSubmit={handleSubmit} className="p-4 border-t bg-gray-50 rounded-b-lg">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={canAskQuestion ? "Escribe tu consulta aquí..." : "Solo roles autorizados pueden hacer consultas."}
              disabled={isLoading || !canAskQuestion}
              className="w-full bg-white border border-gray-300 rounded-full py-3 pl-5 pr-14 focus:outline-none focus:ring-2 focus:ring-sb-blue/50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim() || !canAskQuestion}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-sb-blue text-white rounded-full p-2.5 disabled:bg-gray-400 hover:bg-blue-800 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-sb-blue mb-4 flex items-center"><HelpCircle className="mr-2" /> Preguntas Frecuentes Internas</h3>
            <div className="space-y-3 text-sm">
                <details className="p-3 bg-sb-gray rounded-md cursor-pointer">
                    <summary className="font-semibold">¿Cuál es el procedimiento para solicitar una firma digital?</summary>
                    <p className="mt-2 text-gray-600">Debes dirigirte al módulo de 'Gestión de Contratos', subir el documento y asignarlo al firmante correspondiente. Recibirás una notificación cuando esté firmado.</p>
                </details>
                <details className="p-3 bg-sb-gray rounded-md cursor-pointer">
                    <summary className="font-semibold">¿Cómo reporto un posible conflicto de interés?</summary>
                    <p className="mt-2 text-gray-600">Utiliza el canal de denuncias disponible en el módulo de 'Riesgos y Compliance'. Tu reporte puede ser anónimo.</p>
                </details>
                <details className="p-3 bg-sb-gray rounded-md cursor-pointer">
                    <summary className="font-semibold">¿Dónde encuentro las políticas de teletrabajo?</summary>
                    <p className="mt-2 text-gray-600">La política actualizada se encuentra en 'Relaciones Laborales' y también en 'Gestión Documental' bajo la carpeta 'Políticas Corporativas'.</p>
                </details>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AsesoriaLegal;
