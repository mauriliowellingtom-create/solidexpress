'use client';

import { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Users,
  Award
} from 'lucide-react';

export default function FinanceiroPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('mes');

  // Mock data
  const stats = {
    today: 1485.00,
    week: 8910.00,
    month: 35640.00,
    total: 142560.00,
    growth: {
      daily: 12.5,
      weekly: 8.3,
      monthly: 15.7
    }
  };

  const topPayers = [
    { id: 1, name: 'Ana Silva', email: 'ana@email.com', total: 2970.00, payments: 10 },
    { id: 2, name: 'Carlos Santos', email: 'carlos@email.com', total: 2376.00, payments: 8 },
    { id: 3, name: 'Maria Oliveira', email: 'maria@email.com', total: 1782.00, payments: 6 },
    { id: 4, name: 'João Pedro', email: 'joao@email.com', total: 1485.00, payments: 5 },
    { id: 5, name: 'Paula Costa', email: 'paula@email.com', total: 1188.00, payments: 4 }
  ];

  const dailyRevenue = [
    { date: '15/01', amount: 1485.00 },
    { date: '16/01', amount: 2970.00 },
    { date: '17/01', amount: 1782.00 },
    { date: '18/01', amount: 2376.00 },
    { date: '19/01', amount: 1188.00 },
    { date: '20/01', amount: 2673.00 }
  ];

  const weeklyRevenue = [
    { week: 'Sem 1', amount: 8910.00 },
    { week: 'Sem 2', amount: 12474.00 },
    { week: 'Sem 3', amount: 9801.00 },
    { week: 'Sem 4', amount: 14256.00 }
  ];

  const monthlyRevenue = [
    { month: 'Set', amount: 28512.00 },
    { month: 'Out', amount: 32076.00 },
    { month: 'Nov', amount: 35640.00 },
    { month: 'Dez', amount: 42768.00 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Financeiro Completo</h1>
        <p className="text-slate-600 mt-1">Acompanhe toda a performance financeira</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-green-100">Recebido Hoje</p>
            <DollarSign className="w-6 h-6 text-green-100" />
          </div>
          <h3 className="text-3xl font-bold mb-2">R$ {stats.today.toFixed(2)}</h3>
          <div className="flex items-center gap-1 text-sm text-green-100">
            <TrendingUp className="w-4 h-4" />
            <span>+{stats.growth.daily}% vs ontem</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-blue-100">Recebido na Semana</p>
            <DollarSign className="w-6 h-6 text-blue-100" />
          </div>
          <h3 className="text-3xl font-bold mb-2">R$ {stats.week.toFixed(2)}</h3>
          <div className="flex items-center gap-1 text-sm text-blue-100">
            <TrendingUp className="w-4 h-4" />
            <span>+{stats.growth.weekly}% vs semana passada</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-purple-100">Recebido no Mês</p>
            <DollarSign className="w-6 h-6 text-purple-100" />
          </div>
          <h3 className="text-3xl font-bold mb-2">R$ {stats.month.toFixed(2)}</h3>
          <div className="flex items-center gap-1 text-sm text-purple-100">
            <TrendingUp className="w-4 h-4" />
            <span>+{stats.growth.monthly}% vs mês passado</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-orange-100">Total Recebido</p>
            <DollarSign className="w-6 h-6 text-orange-100" />
          </div>
          <h3 className="text-3xl font-bold mb-2">R$ {stats.total.toFixed(2)}</h3>
          <div className="flex items-center gap-1 text-sm text-orange-100">
            <TrendingUp className="w-4 h-4" />
            <span>Crescimento constante</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Period */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Desempenho Financeiro</h3>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="dia">Por Dia</option>
              <option value="semana">Por Semana</option>
              <option value="mes">Por Mês</option>
            </select>
          </div>

          <div className="space-y-4">
            {selectedPeriod === 'dia' && dailyRevenue.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-600 w-16">{item.date}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-10 relative overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full flex items-center justify-end pr-3"
                    style={{ width: `${(item.amount / 3000) * 100}%` }}
                  >
                    <span className="text-sm font-semibold text-white">
                      R$ {item.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {selectedPeriod === 'semana' && weeklyRevenue.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-600 w-16">{item.week}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-10 relative overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full flex items-center justify-end pr-3"
                    style={{ width: `${(item.amount / 15000) * 100}%` }}
                  >
                    <span className="text-sm font-semibold text-white">
                      R$ {item.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {selectedPeriod === 'mes' && monthlyRevenue.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-600 w-16">{item.month}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-10 relative overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full flex items-center justify-end pr-3"
                    style={{ width: `${(item.amount / 45000) * 100}%` }}
                  >
                    <span className="text-sm font-semibold text-white">
                      R$ {(item.amount / 1000).toFixed(1)}k
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Payers */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-6 h-6 text-yellow-500" />
            <h3 className="text-lg font-bold text-slate-900">Top Clientes Pagadores</h3>
          </div>

          <div className="space-y-4">
            {topPayers.map((payer, index) => (
              <div key={payer.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold text-lg">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{payer.name}</p>
                  <p className="text-sm text-slate-500">{payer.email}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">R$ {payer.total.toFixed(2)}</p>
                  <p className="text-sm text-slate-500">{payer.payments} pagamentos</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-slate-900">Crescimento Diário</h4>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-green-600">+{stats.growth.daily}%</span>
            <span className="text-sm text-slate-500">vs ontem</span>
          </div>
          <p className="text-sm text-slate-600 mt-2">Desempenho acima da média</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-slate-900">Crescimento Semanal</h4>
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-blue-600">+{stats.growth.weekly}%</span>
            <span className="text-sm text-slate-500">vs semana passada</span>
          </div>
          <p className="text-sm text-slate-600 mt-2">Crescimento consistente</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-slate-900">Crescimento Mensal</h4>
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-purple-600">+{stats.growth.monthly}%</span>
            <span className="text-sm text-slate-500">vs mês passado</span>
          </div>
          <p className="text-sm text-slate-600 mt-2">Excelente performance</p>
        </div>
      </div>
    </div>
  );
}
