'use client';

import { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, Users, DollarSign, BarChart } from 'lucide-react';

export default function RelatoriosPage() {
  const [reportType, setReportType] = useState('vendas');
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-01-31');

  const salesReport = {
    totalSales: 89,
    totalRevenue: 26433.00,
    averageTicket: 297.00,
    topDay: '2024-01-20',
    topDaySales: 15
  };

  const usersReport = {
    newUsers: 45,
    activeUsers: 198,
    vipUsers: 23,
    totalUsers: 245
  };

  const financialReport = {
    totalReceived: 142560.00,
    pending: 2970.00,
    approved: 139590.00,
    rejected: 891.00
  };

  const exportReport = (format: 'pdf' | 'excel') => {
    alert(`Exportando relatório em ${format.toUpperCase()}...`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Relatórios Inteligentes</h1>
        <p className="text-slate-600 mt-1">Análises detalhadas do seu negócio</p>
      </div>

      {/* Report Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Gerar Relatório</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Relatório</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="vendas">Vendas</option>
              <option value="usuarios">Usuários</option>
              <option value="financeiro">Financeiro</option>
              <option value="completo">Completo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Data Início</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Data Fim</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-end gap-2">
            <button
              onClick={() => exportReport('pdf')}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Download className="w-5 h-5" />
              PDF
            </button>
            <button
              onClick={() => exportReport('excel')}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-5 h-5" />
              Excel
            </button>
          </div>
        </div>
      </div>

      {/* Sales Report */}
      {(reportType === 'vendas' || reportType === 'completo') && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">Relatório de Vendas</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
              <p className="text-blue-100 text-sm mb-1">Total de Vendas</p>
              <h4 className="text-3xl font-bold">{salesReport.totalSales}</h4>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
              <p className="text-green-100 text-sm mb-1">Receita Total</p>
              <h4 className="text-3xl font-bold">R$ {salesReport.totalRevenue.toFixed(2)}</h4>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
              <p className="text-purple-100 text-sm mb-1">Ticket Médio</p>
              <h4 className="text-3xl font-bold">R$ {salesReport.averageTicket.toFixed(2)}</h4>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-2">Melhor Dia de Vendas</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-slate-900">{salesReport.topDay}</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">{salesReport.topDaySales} vendas</span>
            </div>
          </div>
        </div>
      )}

      {/* Users Report */}
      {(reportType === 'usuarios' || reportType === 'completo') && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-bold text-slate-900">Relatório de Usuários</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-blue-600">
              <p className="text-slate-600 text-sm mb-1">Novos Usuários</p>
              <h4 className="text-3xl font-bold text-slate-900">{usersReport.newUsers}</h4>
              <p className="text-sm text-green-600 mt-2">↑ +12.5% vs período anterior</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-green-600">
              <p className="text-slate-600 text-sm mb-1">Usuários Ativos</p>
              <h4 className="text-3xl font-bold text-slate-900">{usersReport.activeUsers}</h4>
              <p className="text-sm text-green-600 mt-2">↑ +8.3% vs período anterior</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-purple-600">
              <p className="text-slate-600 text-sm mb-1">Usuários VIP</p>
              <h4 className="text-3xl font-bold text-slate-900">{usersReport.vipUsers}</h4>
              <p className="text-sm text-green-600 mt-2">↑ +15.7% vs período anterior</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-orange-600">
              <p className="text-slate-600 text-sm mb-1">Total de Usuários</p>
              <h4 className="text-3xl font-bold text-slate-900">{usersReport.totalUsers}</h4>
              <p className="text-sm text-green-600 mt-2">↑ +10.2% vs período anterior</p>
            </div>
          </div>

          <div className="mt-6 bg-slate-50 rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 mb-3">Crescimento de Usuários</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600 w-24">Novos</span>
                <div className="flex-1 bg-slate-200 rounded-full h-6">
                  <div className="bg-blue-600 h-6 rounded-full flex items-center justify-end pr-2" style={{ width: '18%' }}>
                    <span className="text-xs text-white font-semibold">18%</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600 w-24">Ativos</span>
                <div className="flex-1 bg-slate-200 rounded-full h-6">
                  <div className="bg-green-600 h-6 rounded-full flex items-center justify-end pr-2" style={{ width: '81%' }}>
                    <span className="text-xs text-white font-semibold">81%</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600 w-24">VIP</span>
                <div className="flex-1 bg-slate-200 rounded-full h-6">
                  <div className="bg-purple-600 h-6 rounded-full flex items-center justify-end pr-2" style={{ width: '9%' }}>
                    <span className="text-xs text-white font-semibold">9%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Financial Report */}
      {(reportType === 'financeiro' || reportType === 'completo') && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-bold text-slate-900">Relatório Financeiro</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg p-6 text-white">
              <p className="text-green-100 text-sm mb-1">Total Recebido</p>
              <h4 className="text-4xl font-bold mb-2">R$ {financialReport.totalReceived.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h4>
              <p className="text-sm text-green-100">100% do período</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
              <p className="text-blue-100 text-sm mb-1">Pagamentos Aprovados</p>
              <h4 className="text-4xl font-bold mb-2">R$ {financialReport.approved.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h4>
              <p className="text-sm text-blue-100">97.9% do total</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-700 mb-1">Pagamentos Pendentes</p>
                  <h5 className="text-2xl font-bold text-orange-900">R$ {financialReport.pending.toFixed(2)}</h5>
                </div>
                <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                  <BarChart className="w-6 h-6 text-orange-700" />
                </div>
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-700 mb-1">Pagamentos Recusados</p>
                  <h5 className="text-2xl font-bold text-red-900">R$ {financialReport.rejected.toFixed(2)}</h5>
                </div>
                <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
                  <BarChart className="w-6 h-6 text-red-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Options */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Exportar Relatório Completo</h3>
            <p className="text-blue-100">Baixe todos os dados em formato PDF ou Excel</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => exportReport('pdf')}
              className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              <FileText className="w-5 h-5" />
              Exportar PDF
            </button>
            <button
              onClick={() => exportReport('excel')}
              className="flex items-center gap-2 px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors font-semibold"
            >
              <Download className="w-5 h-5" />
              Exportar Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
