import React, { useState, useMemo } from 'react';
import { Newspaper, Bookmark, Filter } from 'lucide-react';
import { UserRole, LegalArticle } from '../../types';

interface ActualidadJuridicaProps {
  userRole: UserRole;
}

const MOCK_ARTICLES: LegalArticle[] = [
    { id: 'ART01', title: 'Nueva normativa sobre jornada laboral de 40 horas entra en vigencia', source: 'Diario Oficial', date: '2024-07-28', snippet: 'El cuerpo legal que modifica el Código del Trabajo para reducir la jornada ordinaria ya es ley...', tags: ['Laboral', 'Regulatorio'], url: '#' },
    { id: 'ART02', title: 'SII emite circular sobre tributación de activos digitales', source: 'Biblioteca del Congreso', date: '2024-07-25', snippet: 'La nueva circular aclara el tratamiento fiscal para criptomonedas y otros activos digitales...', tags: ['Tributario'], url: '#' },
    { id: 'ART03', title: 'Corte Suprema establece nuevo criterio en materia de responsabilidad extracontractual', source: 'Prensa', date: '2024-07-22', snippet: 'En un fallo reciente, la Corte Suprema ha modificado su jurisprudencia sobre el nexo causal...', tags: ['Corporativo'], url: '#' },
    { id: 'ART04', title: 'Guía práctica para la implementación de la Ley de Delitos Económicos', source: 'Blog Legal Interno', date: '2024-07-20', snippet: 'Nuestro equipo de Compliance ha preparado un resumen con los puntos clave de la nueva ley...', tags: ['Corporativo', 'Regulatorio'], url: '#' },
    { id: 'ART05', title: 'Cambios en la ley del consumidor: Nuevas obligaciones para proveedores', source: 'Diario Oficial', date: '2024-07-18', snippet: 'Se publicaron modificaciones que amplían los derechos de los consumidores y las obligaciones...', tags: ['Regulatorio'], url: '#' },
];

type TagFilter = 'Todos' | 'Tributario' | 'Laboral' | 'Corporativo' | 'Regulatorio';

const ActualidadJuridica: React.FC<ActualidadJuridicaProps> = ({ userRole }) => {
    const [filter, setFilter] = useState<TagFilter>('Todos');
    const [saved, setSaved] = useState<Set<string>>(new Set());

    const toggleSave = (articleId: string) => {
        setSaved(prev => {
            const newSet = new Set(prev);
            if (newSet.has(articleId)) {
                newSet.delete(articleId);
            } else {
                newSet.add(articleId);
            }
            return newSet;
        });
    };

    const filteredArticles = useMemo(() => {
        if (filter === 'Todos') return MOCK_ARTICLES;
        return MOCK_ARTICLES.filter(a => a.tags.includes(filter));
    }, [filter]);

    const TAGS: TagFilter[] = ['Todos', 'Laboral', 'Tributario', 'Corporativo', 'Regulatorio'];

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-sb-blue flex items-center"><Newspaper className="mr-3"/> Actualidad Jurídica</h2>
                    <p className="text-gray-600 mt-1">Mantente al día con las últimas noticias y cambios normativos.</p>
                </div>
                <div className="flex items-center space-x-2 p-1 bg-sb-gray rounded-lg mt-4 md:mt-0">
                    {TAGS.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setFilter(tag)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === tag ? 'bg-white text-sb-blue shadow' : 'text-gray-600 hover:bg-gray-200'}`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {filteredArticles.map(article => (
                    <div key={article.id} className="bg-white p-6 rounded-lg shadow-md break-inside-avoid">
                        <p className="text-xs text-gray-500 mb-1">{article.source} - {article.date}</p>
                        <h4 className="font-bold text-lg text-sb-dark mb-2">{article.title}</h4>
                        <p className="text-sm text-gray-600 mb-4">{article.snippet}</p>
                        <div className="flex justify-between items-center">
                            <div className="flex space-x-2">
                                {article.tags.map(tag => (
                                    <span key={tag} className="text-xs font-semibold bg-sb-blue/10 text-sb-blue px-2 py-1 rounded-full">{tag}</span>
                                ))}
                            </div>
                            <button onClick={() => toggleSave(article.id)} className="text-gray-400 hover:text-sb-blue">
                                <Bookmark size={20} className={saved.has(article.id) ? 'fill-current text-sb-blue' : ''} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActualidadJuridica;
