'use client';

import { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Lock, 
  Unlock,
  Eye,
  Mail,
  Phone,
  Calendar,
  Globe,
  Tag
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'novo' | 'ativo' | 'vip' | 'bloqueado';
  role: 'admin' | 'moderador' | 'usuario';
  tags: string[];
  createdAt: string;
  lastAccess: string;
  ip: string;
}

export default function UsuariosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Mock data
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'Ana Silva',
      email: 'ana@email.com',
      phone: '(11) 98765-4321',
      status: 'vip',
      role: 'usuario',
      tags: ['VIP', 'Premium'],
      createdAt: '2024-01-15',
      lastAccess: '2024-01-20 14:30',
      ip: '192.168.1.1'
    },
    {
      id: '2',
      name: 'Carlos Santos',
      email: 'carlos@email.com',
      phone: '(21) 99876-5432',
      status: 'ativo',
      role: 'usuario',
      tags: ['Ativo'],
      createdAt: '2024-01-18',
      lastAccess: '2024-01-20 10:15',
      ip: '192.168.1.2'
    },
    {
      id: '3',
      name: 'Maria Oliveira',
      email: 'maria@email.com',
      phone: '(31) 97654-3210',
      status: 'novo',
      role: 'usuario',
      tags: ['Novo'],
      createdAt: '2024-01-20',
      lastAccess: '2024-01-20 09:00',
      ip: '192.168.1.3'
    },
    {
      id: '4',
      name: 'João Admin',
      email: 'admin@email.com',
      phone: '(11) 91234-5678',
      status: 'ativo',
      role: 'admin',
      tags: ['Admin', 'VIP'],
      createdAt: '2024-01-01',
      lastAccess: '2024-01-20 15:45',
      ip: '192.168.1.4'
    }
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    
    const matchesFilter = filterStatus === 'todos' || user.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'vip': return 'bg-purple-100 text-purple-700';
      case 'ativo': return 'bg-green-100 text-green-700';
      case 'novo': return 'bg-blue-100 text-blue-700';
      case 'bloqueado': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700';
      case 'moderador': return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gerenciamento de Usuários</h1>
          <p className="text-slate-600 mt-1">Gerencie todos os usuários do sistema</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Criar Usuário
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Total de Usuários</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{users.length}</h3>
            </div>
            <Users className="w-12 h-12 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Usuários VIP</p>
              <h3 className="text-3xl font-bold text-purple-600 mt-1">
                {users.filter(u => u.status === 'vip').length}
              </h3>
            </div>
            <Tag className="w-12 h-12 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Usuários Ativos</p>
              <h3 className="text-3xl font-bold text-green-600 mt-1">
                {users.filter(u => u.status === 'ativo').length}
              </h3>
            </div>
            <Users className="w-12 h-12 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Novos Usuários</p>
              <h3 className="text-3xl font-bold text-blue-600 mt-1">
                {users.filter(u => u.status === 'novo').length}
              </h3>
            </div>
            <Users className="w-12 h-12 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nome, email ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todos">Todos</option>
              <option value="novo">Novos</option>
              <option value="ativo">Ativos</option>
              <option value="vip">VIP</option>
              <option value="bloqueado">Bloqueados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Usuário</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Contato</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Função</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Tags</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Cadastro</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{user.name}</p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone className="w-4 h-4" />
                        {user.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                      {user.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.role)}`}>
                      {user.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4" />
                        {user.createdAt}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Globe className="w-4 h-4" />
                        {user.ip}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Ver detalhes"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        title={user.status === 'bloqueado' ? 'Desbloquear' : 'Bloquear'}
                      >
                        {user.status === 'bloqueado' ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Deletar"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">Detalhes do Usuário</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{selectedUser.name}</h3>
                  <p className="text-slate-600">{selectedUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Telefone</p>
                  <p className="font-medium text-slate-900">{selectedUser.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedUser.status)}`}>
                    {selectedUser.status.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Função</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(selectedUser.role)}`}>
                    {selectedUser.role.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Data de Cadastro</p>
                  <p className="font-medium text-slate-900">{selectedUser.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Último Acesso</p>
                  <p className="font-medium text-slate-900">{selectedUser.lastAccess}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">IP Utilizado</p>
                  <p className="font-medium text-slate-900">{selectedUser.ip}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-600 mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Fechar
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
                Editar Usuário
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
