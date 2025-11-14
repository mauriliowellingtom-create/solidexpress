'use client';

import { useState } from 'react';
import { Settings, Save, Upload, Users, Shield, Bell, Palette, FileText } from 'lucide-react';

export default function ConfiguracoesPage() {
  const [appName, setAppName] = useState('Mulher Viral Academy');
  const [appDescription, setAppDescription] = useState('Curso completo para viralizar nas redes sociais');
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [secondaryColor, setSecondaryColor] = useState('#8B5CF6');
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [paymentNotifications, setPaymentNotifications] = useState(true);

  const [privacyPolicy, setPrivacyPolicy] = useState('Sua privacidade é importante para nós...');
  const [termsOfUse, setTermsOfUse] = useState('Ao usar nosso serviço, você concorda...');

  const handleSaveSettings = () => {
    alert('Configurações salvas com sucesso!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Configurações do Sistema</h1>
        <p className="text-slate-600 mt-1">Personalize e gerencie seu aplicativo</p>
      </div>

      {/* App Settings */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-bold text-slate-900">Informações do App</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Nome do Aplicativo</label>
            <input
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Descrição</label>
            <textarea
              value={appDescription}
              onChange={(e) => setAppDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Logo do App</label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600">Clique para fazer upload</p>
                <p className="text-xs text-slate-500">PNG ou JPG (máx. 2MB)</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Favicon</label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600">Clique para fazer upload</p>
                <p className="text-xs text-slate-500">ICO ou PNG (32x32)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Palette className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-bold text-slate-900">Personalização Visual</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Cor Primária</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-16 h-16 rounded-lg border-2 border-slate-200 cursor-pointer"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Cor Secundária</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="w-16 h-16 rounded-lg border-2 border-slate-200 cursor-pointer"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-600 mb-3">Preview das Cores</p>
          <div className="flex gap-3">
            <button
              style={{ backgroundColor: primaryColor }}
              className="px-6 py-3 text-white rounded-lg font-semibold"
            >
              Botão Primário
            </button>
            <button
              style={{ backgroundColor: secondaryColor }}
              className="px-6 py-3 text-white rounded-lg font-semibold"
            >
              Botão Secundário
            </button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="w-6 h-6 text-orange-600" />
          <h3 className="text-lg font-bold text-slate-900">Notificações</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <p className="font-medium text-slate-900">Notificações por Email</p>
              <p className="text-sm text-slate-600">Receba alertas importantes por email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <p className="font-medium text-slate-900">Notificações Push</p>
              <p className="text-sm text-slate-600">Alertas em tempo real no navegador</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={pushNotifications}
                onChange={(e) => setPushNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <p className="font-medium text-slate-900">Alertas de Pagamento</p>
              <p className="text-sm text-slate-600">Notificar quando receber novos pagamentos</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={paymentNotifications}
                onChange={(e) => setPaymentNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Legal Settings */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="w-6 h-6 text-green-600" />
          <h3 className="text-lg font-bold text-slate-900">Termos e Políticas</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Política de Privacidade</label>
            <textarea
              value={privacyPolicy}
              onChange={(e) => setPrivacyPolicy(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Termos de Uso</label>
            <textarea
              value={termsOfUse}
              onChange={(e) => setTermsOfUse(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Admin Management */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-6 h-6 text-red-600" />
          <h3 className="text-lg font-bold text-slate-900">Gerenciar Administradores</h3>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <p className="font-medium text-slate-900">Admin Principal</p>
                <p className="text-sm text-slate-600">admin@email.com</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
              SUPER ADMIN
            </span>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-dashed border-slate-300 text-slate-600 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all">
          <Users className="w-5 h-5" />
          Adicionar Novo Administrador
        </button>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveSettings}
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-lg font-semibold"
        >
          <Save className="w-6 h-6" />
          Salvar Todas as Configurações
        </button>
      </div>
    </div>
  );
}
