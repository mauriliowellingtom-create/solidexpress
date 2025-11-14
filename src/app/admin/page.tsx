'use client';

import { useEffect, useState } from 'react';
import StatsCard from '@/components/admin/StatsCard';
import { getMockDashboardData } from '@/lib/admin-auth';
import { 
  Users, 
  CreditCard, 
  Clock, 
  DollarSign, 
  TrendingUp,
  CheckCircle,
  XCircle,
  Eye,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Carregar dados mockados
    setData(getMockDashboardData());
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  const { stats, dailySales, monthlySales, recentPayments, recentUsers } = data;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-600">Visão geral completa do seu negócio</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total de Usuários"
          value={stats.totalUsers.toLocaleString()}
          icon={Users}
          color="blue"
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Pagamentos Aprovados"
          value={stats.totalPaymentsApproved.toLocaleString()}
          icon={CheckCircle}
          color="green"
          trend={{ value: 8.3, isPositive: true }}
        />
        <StatsCard
          title="Pagamentos Pendentes"
          value={stats.totalPaymentsPending.toLocaleString()}
          icon={Clock}
          color="orange"
        />
        <StatsCard
          title="Ticket Médio"
          value={`R$ ${stats.averageTicket.toFixed(2)}`}
          icon={TrendingUp}
          color="purple"
          trend={{ value: 5.7, isPositive: true }}
        />
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-green-100">Recebido Hoje</p>
            <DollarSign className="w-6 h-6 text-green-100" />
          </div>
          <h3 className="text-3xl font-bold">R$ {stats.totalReceivedToday.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-blue-100">Recebido no Mês</p>
            <DollarSign className="w-6 h-6 text-blue-100" />
          </div>
          <h3 className="text-3xl font-bold">R$ {stats.totalReceivedMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-purple-100">Total Recebido</p>
            <DollarSign className="w-6 h-6 text-purple-100" />
          </div>
          <h3 className="text-3xl font-bold">R$ {stats.totalReceivedAll.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Vendas Diárias</h3>
          <div className="space-y-3">
            {dailySales.map((day, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-600 w-16">{day.date}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-8 relative overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full flex items-center justify-end pr-3"
                    style={{ width: `${(day.amount / 25000) * 100}%` }}
                  >
                    <span className="text-xs font-semibold text-white">
                      R$ {day.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
                <span className="text-sm text-slate-500 w-12">{day.count} vendas</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Sales Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Faturamento Mensal</h3>
          <div className="space-y-3">
            {monthlySales.map((month, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-600 w-12">{month.month}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-8 relative overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full flex items-center justify-end pr-3"
                    style={{ width: `${(month.amount / 350000) * 100}%` }}
                  >
                    <span className="text-xs font-semibold text-white">
                      R$ {(month.amount / 1000).toFixed(0)}k
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Payments */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Últimos Pagamentos</h3>
            <Link 
              href="/admin/pagamentos"
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{payment.userName}</p>
                  <p className="text-sm text-slate-500">{payment.userEmail}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">R$ {payment.amount.toFixed(2)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    payment.status === 'approved' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {payment.status === 'approved' ? 'Aprovado' : 'Pendente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Novos Usuários</h3>
            <Link 
              href="/admin/usuarios"
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{user.name}</p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  user.status === 'vip' 
                    ? 'bg-purple-100 text-purple-700' 
                    : user.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {user.status === 'vip' ? 'VIP' : user.status === 'active' ? 'Ativo' : 'Novo'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            href="/admin/usuarios"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 text-center transition-all"
          >
            <Users className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm font-medium">Gerenciar Usuários</p>
          </Link>
          <Link 
            href="/admin/pagamentos"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 text-center transition-all"
          >
            <CreditCard className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm font-medium">Ver Pagamentos</p>
          </Link>
          <Link 
            href="/admin/conteudos"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 text-center transition-all"
          >
            <Eye className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm font-medium">Gerenciar Conteúdo</p>
          </Link>
          <Link 
            href="/admin/relatorios"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 text-center transition-all"
          >
            <TrendingUp className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm font-medium">Ver Relatórios</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
