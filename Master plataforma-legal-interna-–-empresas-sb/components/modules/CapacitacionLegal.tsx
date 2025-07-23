import React, { useState } from 'react';
import { GraduationCap, PlayCircle, CheckCircle, BookOpen } from 'lucide-react';
import { UserRole, Course } from '../../types';

interface CapacitacionLegalProps {
  userRole: UserRole;
}

const MOCK_COURSES: Course[] = [
    { 
        id: 'C01', title: 'Inducción a la Ley de Protección de Datos (Ley 19.628)', 
        description: 'Conoce los fundamentos de la ley de protección de datos personales y cómo aplicarla en tu día a día.',
        thumbnail: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        tags: ['Compliance', 'Datos Personales'],
        lessons: [
            { id: 'L1', title: 'Principios Generales', duration: '20 min', completed: true },
            { id: 'L2', title: 'Derechos ARCO', duration: '25 min', completed: false },
            { id: 'L3', title: 'Transferencia de Datos', duration: '15 min', completed: false },
        ]
    },
    { 
        id: 'C02', title: 'Prevención de Lavado de Activos (Ley 19.913)', 
        description: 'Curso obligatorio para entender las responsabilidades en la prevención de lavado de activos y financiamiento del terrorismo.',
        thumbnail: 'https://images.unsplash.com/photo-1610986602538-43e57398d5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        tags: ['Compliance', 'Financiero'],
        lessons: []
    },
];

const CourseCard: React.FC<{ course: Course, onSelect: () => void }> = ({ course, onSelect }) => {
    const totalLessons = course.lessons.length;
    const completedLessons = course.lessons.filter(l => l.completed).length;
    const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
    
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
            <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
            <div className="p-6">
                <div className="flex space-x-2 mb-2">
                    {course.tags.map(tag => (
                        <span key={tag} className="text-xs font-semibold bg-sb-blue/10 text-sb-blue px-2 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
                <h4 className="font-bold text-lg text-sb-dark mb-2 h-14">{course.title}</h4>
                <p className="text-sm text-gray-600 h-16">{course.description}</p>
                {totalLessons > 0 && (
                     <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                            <span>Progreso</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-sb-green h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                )}
                <button onClick={onSelect} className="mt-6 w-full bg-sb-blue text-white font-bold py-2 px-4 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors">
                    <BookOpen size={18} className="mr-2" />
                    {progress > 0 ? 'Continuar Curso' : 'Iniciar Curso'}
                </button>
            </div>
        </div>
    );
};

const CapacitacionLegal: React.FC<CapacitacionLegalProps> = ({ userRole }) => {
  // En una app real, aquí habría un estado para el curso seleccionado para mostrar un detalle/modal.
  const handleSelectCourse = (courseId: string) => {
      alert(`Iniciando curso: ${courseId}`);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-sb-blue flex items-center"><GraduationCap className="mr-3" /> Catálogo de Cursos</h2>
        <p className="text-gray-600 mt-1">Fórmate en temas legales clave para la corporación.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_COURSES.map(course => (
          <CourseCard key={course.id} course={course} onSelect={() => handleSelectCourse(course.id)} />
        ))}
      </div>
    </div>
  );
};

export default CapacitacionLegal;
