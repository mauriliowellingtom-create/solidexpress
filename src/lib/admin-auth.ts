'use client';

import { useState } from 'react';

// Simulação de autenticação (substituir por autenticação real)
export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);

  const login = async (email: string, password: string) => {
    // Simulação - substituir por API real
    if (email === 'admin@solidexpress.com' && password === 'admin123') {
      const user = {
        id: '1',
        email,
        name: 'Administrador',
        role: 'admin',
        createdAt: new Date(),
      };
      setAdminUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('admin_token', 'mock_token_123');
      localStorage.setItem('admin_user', JSON.stringify(user));
      return { success: true };
    }
    return { success: false, error: 'Credenciais inválidas' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  };

  const checkAuth = () => {
    const token = localStorage.getItem('admin_token');
    const userStr = localStorage.getItem('admin_user');
    if (token && userStr) {
      setAdminUser(JSON.parse(userStr));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  return { isAuthenticated, adminUser, login, logout, checkAuth };
}

// Dados mockados para o dashboard
export const getMockDashboardData = () => {
  return {
    stats: {
      totalUsers: 1247,
      totalPaymentsApproved: 892,
      totalPaymentsPending: 43,
      totalReceivedToday: 15420.50,
      totalReceivedMonth: 287650.00,
      totalReceivedAll: 1456789.00,
      averageTicket: 322.50,
    },
    dailySales: [
      { date: '01/01', amount: 12500, count: 38 },
      { date: '02/01', amount: 15200, count: 45 },
      { date: '03/01', amount: 18900, count: 52 },
      { date: '04/01', amount: 14300, count: 41 },
      { date: '05/01', amount: 21500, count: 63 },
      { date: '06/01', amount: 19800, count: 58 },
      { date: '07/01', amount: 15420, count: 47 },
    ],
    monthlySales: [
      { month: 'Jan', amount: 245000 },
      { month: 'Fev', amount: 287000 },
      { month: 'Mar', amount: 312000 },
      { month: 'Abr', amount: 298000 },
      { month: 'Mai', amount: 335000 },
      { month: 'Jun', amount: 287650 },
    ],
    recentPayments: [
      { id: '1', userName: 'Maria Silva', userEmail: 'maria@email.com', amount: 497, date: new Date(), status: 'approved' as const },
      { id: '2', userName: 'João Santos', userEmail: 'joao@email.com', amount: 297, date: new Date(), status: 'pending' as const },
      { id: '3', userName: 'Ana Costa', userEmail: 'ana@email.com', amount: 497, date: new Date(), status: 'approved' as const },
      { id: '4', userName: 'Pedro Lima', userEmail: 'pedro@email.com', amount: 297, date: new Date(), status: 'approved' as const },
      { id: '5', userName: 'Carla Souza', userEmail: 'carla@email.com', amount: 497, date: new Date(), status: 'pending' as const },
      { id: '6', userName: 'Lucas Oliveira', userEmail: 'lucas@email.com', amount: 297, date: new Date(), status: 'approved' as const },
      { id: '7', userName: 'Juliana Rocha', userEmail: 'juliana@email.com', amount: 497, date: new Date(), status: 'approved' as const },
      { id: '8', userName: 'Rafael Alves', userEmail: 'rafael@email.com', amount: 297, date: new Date(), status: 'pending' as const },
      { id: '9', userName: 'Fernanda Dias', userEmail: 'fernanda@email.com', amount: 497, date: new Date(), status: 'approved' as const },
      { id: '10', userName: 'Bruno Martins', userEmail: 'bruno@email.com', amount: 297, date: new Date(), status: 'approved' as const },
    ],
    recentUsers: [
      { id: '1', name: 'Camila Ferreira', email: 'camila@email.com', createdAt: new Date(), status: 'new' as const },
      { id: '2', name: 'Rodrigo Mendes', email: 'rodrigo@email.com', createdAt: new Date(), status: 'active' as const },
      { id: '3', name: 'Patrícia Gomes', email: 'patricia@email.com', createdAt: new Date(), status: 'new' as const },
      { id: '4', name: 'Thiago Barbosa', email: 'thiago@email.com', createdAt: new Date(), status: 'vip' as const },
      { id: '5', name: 'Aline Cardoso', email: 'aline@email.com', createdAt: new Date(), status: 'new' as const },
      { id: '6', name: 'Marcelo Ribeiro', email: 'marcelo@email.com', createdAt: new Date(), status: 'active' as const },
      { id: '7', name: 'Beatriz Araújo', email: 'beatriz@email.com', createdAt: new Date(), status: 'new' as const },
      { id: '8', name: 'Gabriel Correia', email: 'gabriel@email.com', createdAt: new Date(), status: 'active' as const },
      { id: '9', name: 'Larissa Monteiro', email: 'larissa@email.com', createdAt: new Date(), status: 'vip' as const },
      { id: '10', name: 'Felipe Castro', email: 'felipe@email.com', createdAt: new Date(), status: 'new' as const },
    ],
  };
};
