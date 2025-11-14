'use client';

import { useState } from 'react';
import { TrendingUp, Tag, Users, Link as LinkIcon, BarChart, Plus, Edit, Trash2, Copy } from 'lucide-react';

interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  uses: number;
  maxUses: number;
  expiresAt: string;
  isActive: boolean;
}

interface Campaign {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  conversions: number;
  revenue: number;
  status: 'ativa' | 'pausada' | 'finalizada';
}

export default function MarketingPage() {
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);

  const [coupons] = useState<Coupon[]>([
    { id: '1', code: 'BEMVINDA50', discount: 50, type: 'percentage', uses: 45, maxUses: 100, expiresAt: '2024-02-28', isActive: true },
    { id: '2', code: 'BLACKFRIDAY', discount: 100, type: 'fixed', uses: 89, maxUses: 200, expiresAt: '2024-01-31', isActive: true },
    { id: '3', code: 'PRIMEIRACOMPRA', discount: 30, type: 'percentage', uses: 156, maxUses: 500, expiresAt: '2024-12-31', isActive: true }
  ]);

  const [campaigns] = useState<Campaign[]>([
    { id: '1', name: 'Black Friday 2024', description: 'Campanha especial de fim de ano', startDate: '2024-01-15', endDate: '2024-01-31', conversions: 89, revenue: 26433.00, status: 'ativa' },
    { id: '2', name: 'Lançamento Módulo 3', description: 'Divulgação do novo módulo', startDate: '2024-01-10', endDate: '2024-01-20', conversions: 45, revenue: 13365.00, status: 'finalizada' }
  ]);

  const abandonedCheckouts = [
    { id: '1', userName: 'Paula Costa', userEmail: 'paula@email.com', amount: 297.00, abandonedAt: '2024-01-20 14:30' },
    { id: '2', userName: 'Ricardo Lima', userEmail: 'ricardo@email.com', amount: 297.00, abandonedAt: '2024-01-20 10:15' },
    { id: '3', userName: 'Fernanda Souza', userEmail: 'fernanda@email.com', amount: 297.00, abandonedAt: '2024-01-19 16:45' }
  ];

  const trackingLinks = [
    { id: '1', name: 'Instagram Bio', url: 'https://seusite.com?ref=instagram', clicks: 1245, conversions: 89 },
    { id: '2', name: 'Email Marketing', url: 'https://seusite.com?ref=email', clicks: 856, conversions: 67 },
    { id: '3', name: 'TikTok Link', url: 'https://seusite.com?ref=tiktok', clicks: 2134, conversions: 156 }
  ];

  const copyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Cupom "${code}" copiado!`);
  };

  const copyTrackingLink = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('Link copiado!');
  };

  const sendRecoveryMessage = (email: string) => {
    alert(`Mensagem de recuperação enviada para ${email}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Ferramentas de Marketing</h1>
        <p className="text-slate-600 mt-1">Gerencie cupons, campanhas e conversões</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Cupons Ativos</p>
              <h3 className="text-3xl font-bold text-purple-600 mt-1">{coupons.filter(c => c.isActive).length}</h3>
            </div>
            <Tag className="w-12 h-12 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Campanhas Ativas</p>
              <h3 className="text-3xl font-bold text-blue-600 mt-1">{campaigns.filter(c => c.status === 'ativa').length}</h3>
            </div>
            <TrendingUp className="w-12 h-12 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Carrinhos Abandonados</p>
              <h3 className="text-3xl font-bold text-orange-600 mt-1">{abandonedCheckouts.length}</h3>
            </div>
            <Users className="w-12 h-12 text-orange-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Links Rastreados</p>
              <h3 className="text-3xl font-bold text-green-600 mt-1">{trackingLinks.length}</h3>
            </div>
            <LinkIcon className="w-12 h-12 text-green-500" />
          </div>
        </div>
      </div>

      {/* Coupons Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900">Cupons de Desconto</h3>
          <button
            onClick={() => setShowCouponModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Criar Cupom
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coupons.map((coupon) => (
            <div key={coupon.id} className="border-2 border-dashed border-purple-300 rounded-lg p-4 bg-purple-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="text-lg font-bold text-purple-900">{coupon.code}</code>
                    <button
                      onClick={() => copyCouponCode(coupon.code)}
                      className="p-1 text-purple-600 hover:bg-purple-100 rounded transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-2xl font-bold text-purple-700">
                    {coupon.type === 'percentage' ? `${coupon.discount}% OFF` : `R$ ${coupon.discount} OFF`}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-2 text-sm text-purple-800">
                <div className="flex justify-between">
                  <span>Usos:</span>
                  <span className="font-semibold">{coupon.uses} / {coupon.maxUses}</span>
                </div>
                <div className="flex justify-between">
                  <span>Expira em:</span>
                  <span className="font-semibold">{coupon.expiresAt}</span>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${(coupon.uses / coupon.maxUses) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campaigns Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900">Campanhas de Marketing</h3>
          <button
            onClick={() => setShowCampaignModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Criar Campanha
          </button>
        </div>

        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-lg">{campaign.name}</h4>
                  <p className="text-sm text-slate-600">{campaign.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  campaign.status === 'ativa' ? 'bg-green-100 text-green-700' :
                  campaign.status === 'pausada' ? 'bg-orange-100 text-orange-700' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {campaign.status.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-slate-600">Início</p>
                  <p className="font-semibold text-slate-900">{campaign.startDate}</p>
                </div>
                <div>
                  <p className="text-slate-600">Fim</p>
                  <p className="font-semibold text-slate-900">{campaign.endDate}</p>
                </div>
                <div>
                  <p className="text-slate-600">Conversões</p>
                  <p className="font-semibold text-green-600">{campaign.conversions}</p>
                </div>
                <div>
                  <p className="text-slate-600">Receita</p>
                  <p className="font-semibold text-blue-600">R$ {campaign.revenue.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Abandoned Checkouts */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Carrinhos Abandonados</h3>
        <div className="space-y-3">
          {abandonedCheckouts.map((checkout) => (
            <div key={checkout.id} className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-slate-900">{checkout.userName}</p>
                <p className="text-sm text-slate-600">{checkout.userEmail}</p>
                <p className="text-xs text-slate-500 mt-1">Abandonado em: {checkout.abandonedAt}</p>
              </div>
              <div className="text-right mr-4">
                <p className="font-bold text-slate-900">R$ {checkout.amount.toFixed(2)}</p>
              </div>
              <button
                onClick={() => sendRecoveryMessage(checkout.userEmail)}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
              >
                Enviar Recuperação
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tracking Links */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900">Links de Rastreamento</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all">
            <Plus className="w-5 h-5" />
            Criar Link
          </button>
        </div>

        <div className="space-y-3">
          {trackingLinks.map((link) => (
            <div key={link.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-slate-900">{link.name}</p>
                  <button
                    onClick={() => copyTrackingLink(link.url)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <code className="text-sm text-slate-600">{link.url}</code>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <p className="text-slate-600">Cliques</p>
                  <p className="font-bold text-blue-600">{link.clicks}</p>
                </div>
                <div className="text-center">
                  <p className="text-slate-600">Conversões</p>
                  <p className="font-bold text-green-600">{link.conversions}</p>
                </div>
                <div className="text-center">
                  <p className="text-slate-600">Taxa</p>
                  <p className="font-bold text-purple-600">{((link.conversions / link.clicks) * 100).toFixed(1)}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
