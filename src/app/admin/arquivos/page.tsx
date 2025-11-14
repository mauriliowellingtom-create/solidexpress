'use client';

import { useState } from 'react';
import { FolderOpen, Upload, File, Image, Video, FileText, Trash2, Download, Search, Plus, FolderPlus } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'video' | 'other';
  size: string;
  uploadedAt: string;
  folder: string;
}

export default function ArquivosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('todos');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);

  const folders = ['Todos', 'Vídeos', 'PDFs', 'Imagens', 'Outros'];

  const [files] = useState<FileItem[]>([
    { id: '1', name: 'Aula 1 - Introdução.mp4', type: 'video', size: '125 MB', uploadedAt: '2024-01-20', folder: 'Vídeos' },
    { id: '2', name: 'Material de Apoio.pdf', type: 'pdf', size: '2.5 MB', uploadedAt: '2024-01-20', folder: 'PDFs' },
    { id: '3', name: 'Banner Curso.png', type: 'image', size: '850 KB', uploadedAt: '2024-01-19', folder: 'Imagens' },
    { id: '4', name: 'Certificado Template.pdf', type: 'pdf', size: '1.2 MB', uploadedAt: '2024-01-19', folder: 'PDFs' },
    { id: '5', name: 'Aula 2 - Estratégias.mp4', type: 'video', size: '98 MB', uploadedAt: '2024-01-18', folder: 'Vídeos' }
  ]);

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder = selectedFolder === 'todos' || file.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-8 h-8 text-purple-600" />;
      case 'pdf': return <FileText className="w-8 h-8 text-red-600" />;
      case 'image': return <Image className="w-8 h-8 text-blue-600" />;
      default: return <File className="w-8 h-8 text-slate-600" />;
    }
  };

  const totalFiles = files.length;
  const totalVideos = files.filter(f => f.type === 'video').length;
  const totalPDFs = files.filter(f => f.type === 'pdf').length;
  const totalImages = files.filter(f => f.type === 'image').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Sistema de Arquivos</h1>
          <p className="text-slate-600 mt-1">Gerencie todos os seus arquivos</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowFolderModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-all duration-200"
          >
            <FolderPlus className="w-5 h-5" />
            Nova Pasta
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
          >
            <Upload className="w-5 h-5" />
            Upload
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Total de Arquivos</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{totalFiles}</h3>
            </div>
            <File className="w-12 h-12 text-slate-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Vídeos</p>
              <h3 className="text-3xl font-bold text-purple-600 mt-1">{totalVideos}</h3>
            </div>
            <Video className="w-12 h-12 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">PDFs</p>
              <h3 className="text-3xl font-bold text-red-600 mt-1">{totalPDFs}</h3>
            </div>
            <FileText className="w-12 h-12 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Imagens</p>
              <h3 className="text-3xl font-bold text-blue-600 mt-1">{totalImages}</h3>
            </div>
            <Image className="w-12 h-12 text-blue-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar arquivos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-slate-400" />
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {folders.map((folder) => (
                <option key={folder} value={folder.toLowerCase()}>
                  {folder}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFiles.map((file) => (
          <div key={file.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-slate-50 rounded-lg">
                {getFileIcon(file.type)}
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Download className="w-5 h-5" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <h4 className="font-medium text-slate-900 mb-2 truncate">{file.name}</h4>
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>{file.size}</span>
              <span>{file.uploadedAt}</span>
            </div>
            <div className="mt-3">
              <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                {file.folder}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">Upload de Arquivos</h2>
            </div>
            <div className="p-6">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <p className="text-lg text-slate-700 mb-2">Arraste arquivos aqui ou clique para selecionar</p>
                <p className="text-sm text-slate-500">Suporta: Vídeos, PDFs, Imagens (máx. 500MB)</p>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Pasta de Destino</label>
                <select className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  {folders.filter(f => f !== 'Todos').map((folder) => (
                    <option key={folder} value={folder}>
                      {folder}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
                Fazer Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Folder Modal */}
      {showFolderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">Criar Nova Pasta</h2>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Nome da Pasta</label>
              <input
                type="text"
                placeholder="Ex: Materiais Extras"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setShowFolderModal(false)}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
                Criar Pasta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
