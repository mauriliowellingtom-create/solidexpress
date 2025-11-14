'use client';

import { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Clock,
  Eye,
  Download,
  Calendar,
  DollarSign
} from 'lucide-react';

interface Payment {
  id: string;
  userName: string;
  userEmail: string;
  amount: number;
  date: string;
  status: 'aprovado' | 'pendente' | 'recusado';
  receipt: string;
}

export default function PagamentosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);

  // Mock data
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      userName: 'Ana Silva',
      userEmail: 'ana@email.com',
      amount: 297.00,
      date: '2024-01-20 14:30',
      status: 'pendente',
      receipt: 'https://via.placeholder.com/600x800/4F46E5/FFFFFF?text=Comprovante+PIX'
    },
    {
      id: '2',
      userName: 'Carlos Santos',
      userEmail: 'carlos@email.com',
      amount: 297.00,
      date: '2024-01-20 10:15',
      status: 'aprovado',
      receipt: 'https://via.placeholder.com/600x800/10B981/FFFFFF?text=Comprovante+PIX'
    },
    {
      id: '3',
      userName: 'Maria Oliveira',
      userEmail: 'maria@email.com',
      amount: 297.00,
      date: '2024-01-19 16:45',
      status: 'aprovado',
      receipt: 'https://via.placeholder.com/600x800/10B981/FFFFFF?text=Comprovante+PIX'
    },
    {
      id: '4',
      userName: 'João Pedro',
      userEmail: 'joao@email.com',
      amount: 297.00,
      date: '2024-01-19 09:20',
      status: 'recusado',
      receipt: 'https://via.placeholder.com/600x800/EF4444/FFFFFF?text=Comprovante+Inválido'
    }
  ]);

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'todos' || payment.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aprovado': return 'bg-green-100 text-green-700';
      case 'pendente': return 'bg-orange-100 text-orange-700';
      case 'recusado': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'aprovado': return <CheckCircle className="w-5 h-5" />;
      case 'pendente': return <Clock className="w-5 h-5" />;
      case 'recusado': return <XCircle className="w-5 h-5" />;
    }
  };

  const handleApprove = (id: string) => {
    setPayments(payments.map(p => 
      p.id === id ? { ...p, status: 'aprovado' as const } : p
    ));
  };

  const handleReject = (id: string) => {
    setPayments(payments.map(p => 
      p.id === id ? { ...p, status: 'recusado' as const } : p
    ));
  };

  const exportToExcel = () => {
    alert('Exportando para Excel... (funcionalidade a ser implementada)');
  };

  const totalApproved = payments.filter(p => p.status === 'aprovado').length;
  const totalPending = payments.filter(p => p.status === 'pendente').length;
  const totalRejected = payments.filter(p => p.status === 'recusado').length;
  const totalAmount = payments
    .filter(p => p.status === 'aprovado')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Controle de Pagamentos</h1>
          <p className="text-slate-600 mt-1">Gerencie todos os pagamentos recebidos</p>
        </div>
        <button
          onClick={exportToExcel}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
        >
          <Download className="w-5 h-5" />
          Exportar Excel
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Total Aprovado</p>
              <h3 className="text-2xl font-bold text-green-600 mt-1">R$ {totalAmount.toFixed(2)}</h3>
            </div>
            <DollarSign className="w-12 h-12 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Aprovados</p>
              <h3 className="text-3xl font-bold text-green-600 mt-1">{totalApproved}</h3>
            </div>
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Pendentes</p>
              <h3 className="text-3xl font-bold text-orange-600 mt-1">{totalPending}</h3>
            </div>
            <Clock className="w-12 h-12 text-orange-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Recusados</p>
              <h3 className="text-3xl font-bold text-red-600 mt-1">{totalRejected}</h3>
            </div>
            <XCircle className="w-12 h-12 text-red-500" />
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
              placeholder="Buscar por nome ou email..."
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
              <option value="aprovado">Aprovados</option>
              <option value="pendente">Pendentes</option>
              <option value="recusado">Recusados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Cliente</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Valor</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Data</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Comprovante</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-900">{payment.userName}</p>
                      <p className="text-sm text-slate-500">{payment.userEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">R$ {payment.amount.toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4" />
                      {payment.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        {payment.status.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedReceipt(payment.receipt)}
                      className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                      Ver
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {payment.status === 'pendente' && (
                        <>
                          <button
                            onClick={() => handleApprove(payment.id)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                          >
                            Aprovar
                          </button>
                          <button
                            onClick={() => handleReject(payment.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                          >
                            Recusar
                          </button>
                        </>
                      )}
                      {payment.status === 'aprovado' && (
                        <span className="text-sm text-green-600 font-medium">✓ Aprovado</span>
                      )}
                      {payment.status === 'recusado' && (
                        <span className="text-sm text-red-600 font-medium">✗ Recusado</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt Modal */}
      {selectedReceipt && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedReceipt(null)}
        >
          <div className="relative max-w-2xl w-full">
            <button
              onClick={() => setSelectedReceipt(null)}
              className="absolute -top-12 right-0 text-white hover:text-slate-300 transition-colors"
            >
              <XCircle className="w-8 h-8" />
            </button>
            <img
              src={selectedReceipt}
              alt="Comprovante"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
