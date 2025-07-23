import React, { useState, useMemo } from 'react';
import { FolderSearch, Folder, File, ChevronRight, Upload, FolderPlus } from 'lucide-react';
import { UserRole, FileNode } from '../../types';

interface GestionDocumentalProps {
  userRole: UserRole;
}

const MOCK_FILESYSTEM: FileNode = {
  id: 'root', name: 'Raíz', type: 'folder', modified: '2024-07-01', children: [
    { id: 'f1', name: 'Contratos', type: 'folder', modified: '2024-07-20', children: [
      { id: 'f1-1', name: 'Proveedores', type: 'folder', modified: '2024-07-21', children: [
        { id: 'f1-1-1', name: 'Proveedor_TI.pdf', type: 'file', modified: '2024-07-21', size: '2.5 MB' }
      ]},
      { id: 'f1-2', name: 'Arrendamientos.pdf', type: 'file', modified: '2024-07-18', size: '1.2 MB' },
    ]},
    { id: 'f2', name: 'Litigios', type: 'folder', modified: '2024-05-10', children: [] },
    { id: 'f3', name: 'Políticas Corporativas', type: 'folder', modified: '2024-06-30', children: [
      { id: 'f3-1', name: 'Politica_Privacidad.pdf', type: 'file', modified: '2024-06-29', size: '800 KB' }
    ]},
    { id: 'f4', name: 'Reporte_Anual_2023.docx', type: 'file', modified: '2024-02-15', size: '15 MB' },
  ]
};

const GestionDocumental: React.FC<GestionDocumentalProps> = ({ userRole }) => {
  const [path, setPath] = useState<string[]>(['root']);
  const canManage = userRole === UserRole.AbogadoSenior || userRole === UserRole.LegalAssistant;

  const { currentFolder, breadcrumbs } = useMemo(() => {
    let current: FileNode = MOCK_FILESYSTEM;
    const crumbs = [{ id: 'root', name: 'Raíz' }];
    for (let i = 1; i < path.length; i++) {
      const segment = path[i];
      const nextFolder = current.children?.find(child => child.id === segment);
      if (nextFolder && nextFolder.type === 'folder') {
        current = nextFolder;
        crumbs.push({ id: nextFolder.id, name: nextFolder.name });
      } else {
        break;
      }
    }
    return { currentFolder: current, breadcrumbs: crumbs };
  }, [path]);

  const navigateTo = (newPath: string[]) => setPath(newPath);
  const handleCrumbClick = (index: number) => navigateTo(path.slice(0, index + 1));
  const handleFolderClick = (folderId: string) => navigateTo([...path, folderId]);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <nav className="flex items-center text-sm font-medium text-gray-500" aria-label="Breadcrumb">
              {breadcrumbs.map((crumb, index) => (
                  <div key={crumb.id} className="flex items-center">
                  <button onClick={() => handleCrumbClick(index)} className="hover:text-sb-blue">
                      {crumb.name}
                  </button>
                  {index < breadcrumbs.length - 1 && <ChevronRight size={16} className="mx-2" />}
                  </div>
              ))}
          </nav>
          {canManage && (
              <div className="flex space-x-2 mt-4 md:mt-0">
                  <button className="bg-gray-200 hover:bg-gray-300 text-sb-dark font-bold py-2 px-4 rounded-full flex items-center justify-center transition-colors">
                      <FolderPlus size={20} className="mr-2" />
                      Nueva Carpeta
                  </button>
                  <button className="bg-sb-blue hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center transition-colors">
                      <Upload size={20} className="mr-2" />
                      Carga Masiva
                  </button>
              </div>
          )}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <table className="w-full text-left">
          <thead className="border-b-2 border-gray-200">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">Nombre</th>
              <th className="p-4 text-sm font-semibold text-gray-600 hidden md:table-cell">Modificado</th>
              <th className="p-4 text-sm font-semibold text-gray-600 hidden md:table-cell">Tamaño</th>
            </tr>
          </thead>
          <tbody>
            {currentFolder.children?.map(item => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-sb-gray">
                <td className="p-4">
                  {item.type === 'folder' ? (
                    <button onClick={() => handleFolderClick(item.id)} className="flex items-center font-medium text-sb-blue hover:underline">
                      <Folder size={20} className="mr-3" /> {item.name}
                    </button>
                  ) : (
                    <div className="flex items-center text-gray-800">
                      <File size={20} className="mr-3 text-gray-500" /> {item.name}
                    </div>
                  )}
                </td>
                <td className="p-4 text-sm text-gray-500 hidden md:table-cell">{item.modified}</td>
                <td className="p-4 text-sm text-gray-500 hidden md:table-cell">{item.size || '---'}</td>
              </tr>
            ))}
            {(!currentFolder.children || currentFolder.children.length === 0) && (
              <tr>
                <td colSpan={3} className="text-center p-8 text-gray-500">Esta carpeta está vacía.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionDocumental;
