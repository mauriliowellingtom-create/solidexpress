'use client';

import { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Video, 
  FileText, 
  Upload,
  Eye,
  Lock,
  Unlock,
  GripVertical,
  BarChart
} from 'lucide-react';

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
  isLocked: boolean;
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'text';
  duration?: string;
  views: number;
  order: number;
}

export default function ConteudosPage() {
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  // Mock data
  const [modules, setModules] = useState<Module[]>([
    {
      id: '1',
      title: 'Módulo 1 — Mentalidade da Mulher Viral',
      description: 'Como quebrar o medo de aparecer e construir autoridade',
      order: 1,
      isLocked: false,
      lessons: [
        { id: '1-1', title: 'Como quebrar o medo de aparecer', type: 'video', duration: '15:30', views: 245, order: 1 },
        { id: '1-2', title: 'Construindo sua marca pessoal', type: 'video', duration: '20:15', views: 198, order: 2 },
        { id: '1-3', title: 'Exercícios práticos', type: 'pdf', views: 156, order: 3 }
      ]
    },
    {
      id: '2',
      title: 'Módulo 2 — Domínio do TikTok e Instagram',
      description: 'Algoritmo revelado e estratégias de crescimento',
      order: 2,
      isLocked: false,
      lessons: [
        { id: '2-1', title: 'Algoritmo revelado', type: 'video', duration: '25:45', views: 312, order: 1 },
        { id: '2-2', title: 'Melhores horários para postar', type: 'video', duration: '12:20', views: 267, order: 2 },
        { id: '2-3', title: 'Guia de tendências', type: 'pdf', views: 189, order: 3 }
      ]
    },
    {
      id: '3',
      title: 'Módulo 3 — Conteúdo que Vende',
      description: 'Gatilhos mentais e copywriting irresistível',
      order: 3,
      isLocked: true,
      lessons: [
        { id: '3-1', title: 'Gatilhos mentais femininos', type: 'video', duration: '18:30', views: 0, order: 1 },
        { id: '3-2', title: 'Estrutura de vídeos virais', type: 'video', duration: '22:15', views: 0, order: 2 }
      ]
    }
  ]);

  const totalModules = modules.length;
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const totalViews = modules.reduce((sum, m) => 
    sum + m.lessons.reduce((lessonSum, l) => lessonSum + l.views, 0), 0
  );
  const mostWatchedLesson = modules
    .flatMap(m => m.lessons)
    .sort((a, b) => b.views - a.views)[0];

  const toggleModuleLock = (moduleId: string) => {
    setModules(modules.map(m => 
      m.id === moduleId ? { ...m, isLocked: !m.isLocked } : m
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gerenciar Conteúdos</h1>
          <p className="text-slate-600 mt-1">Organize módulos, aulas e materiais do curso</p>
        </div>
        <button
          onClick={() => setShowModuleModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Criar Módulo
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Total de Módulos</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{totalModules}</h3>
            </div>
            <BookOpen className="w-12 h-12 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Total de Aulas</p>
              <h3 className="text-3xl font-bold text-purple-600 mt-1">{totalLessons}</h3>
            </div>
            <Video className="w-12 h-12 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Total de Visualizações</p>
              <h3 className="text-3xl font-bold text-green-600 mt-1">{totalViews}</h3>
            </div>
            <Eye className="w-12 h-12 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Aula Mais Assistida</p>
              <h3 className="text-lg font-bold text-orange-600 mt-1">{mostWatchedLesson?.views || 0} views</h3>
            </div>
            <BarChart className="w-12 h-12 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {modules.map((module) => (
          <div key={module.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Module Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <GripVertical className="w-6 h-6 text-white/70 cursor-move" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                    <p className="text-blue-100">{module.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className="flex items-center gap-1">
                        <Video className="w-4 h-4" />
                        {module.lessons.length} aulas
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {module.lessons.reduce((sum, l) => sum + l.views, 0)} visualizações
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleModuleLock(module.id)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title={module.isLocked ? 'Desbloquear' : 'Bloquear'}
                  >
                    {module.isLocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                  </button>
                  <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Lessons List */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-slate-900">Aulas do Módulo</h4>
                <button
                  onClick={() => {
                    setSelectedModule(module.id);
                    setShowLessonModal(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Aula
                </button>
              </div>

              <div className="space-y-2">
                {module.lessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <GripVertical className="w-5 h-5 text-slate-400 cursor-move" />
                    
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white">
                      {lesson.type === 'video' && <Video className="w-5 h-5 text-blue-600" />}
                      {lesson.type === 'pdf' && <FileText className="w-5 h-5 text-red-600" />}
                      {lesson.type === 'text' && <FileText className="w-5 h-5 text-slate-600" />}
                    </div>

                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{lesson.title}</p>
                      <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                        {lesson.duration && <span>{lesson.duration}</span>}
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {lesson.views} visualizações
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Module Modal */}
      {showModuleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">Criar Novo Módulo</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Título do Módulo</label>
                <input
                  type="text"
                  placeholder="Ex: Módulo 1 — Introdução"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Descrição</label>
                <textarea
                  placeholder="Descreva o conteúdo do módulo..."
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setShowModuleModal(false)}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
                Criar Módulo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Lesson Modal */}
      {showLessonModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">Adicionar Nova Aula</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Título da Aula</label>
                <input
                  type="text"
                  placeholder="Ex: Introdução ao módulo"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Conteúdo</label>
                <select className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="video">Vídeo</option>
                  <option value="pdf">PDF</option>
                  <option value="text">Texto</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Upload de Arquivo</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-600">Clique para fazer upload ou arraste o arquivo aqui</p>
                  <p className="text-sm text-slate-500 mt-1">Vídeos, PDFs ou imagens</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setShowLessonModal(false)}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
                Adicionar Aula
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
