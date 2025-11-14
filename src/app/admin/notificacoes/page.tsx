'use client';

import { useState } from 'react';
import { Bell, Send, Users, User, Calendar, AlertCircle } from 'lucide-react';

export default function NotificacoesPage() {
  const [notificationType, setNotificationType] = useState<'todos' | 'individual'>('todos');
  const [selectedUser, setSelectedUser] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'normal' | 'urgente'>('normal');
  const [scheduleDate, setScheduleDate] = useState('');

  const users = [
    { id: '1', name: 'Ana Silva', email: 'ana@email.com' },
    { id: '2', name: 'Carlos Santos', email: 'carlos@email.com' },
    { id: '3', name: 'Maria Oliveira', email: 'maria@email.com' }
  ];

  const [sentNotifications] = useState([
    {
      id: '1',
      type: 'todos',
      message: 'Novo módulo disponível! Confira agora.',
      sentAt: '2024-01-20 14:30',
      recipients: 245,
      priority: 'normal'
    },
    {
      id: '2',
      type: 'individual',
      message: 'Seu pagamento foi aprovado!',
      sentAt: '2024-01-20 10:15',
      recipients: 1,
      priority: 'urgente'
    },
    {
      id: '3',
      type: 'todos',
      message: 'Manutenção programada para amanhã às 2h.',
      sentAt: '2024-01-19 16:45',
      recipients: 245,
      priority: 'urgente'
    }
  ]);

  const handleSendNotification = () => {
    if (!message.trim()) {
      alert('Digite uma mensagem!');
      return;
    }

    if (notificationType === 'individual' && !selectedUser) {
      alert('Selecione um usuário!');
      return;
    }

    alert(`Notificação ${scheduleDate ? 'agendada' : 'enviada'} com sucesso!`);
    setMessage('');
    setScheduleDate('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Sistema de Notificações</h1>
        <p className="text-slate-600 mt-1">Envie mensagens para seus usuários</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Send Notification */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Enviar Notificação</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Envio</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setNotificationType('todos')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                    notificationType === 'todos'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  Todos os Usuários
                </button>
                <button
                  onClick={() => setNotificationType('individual')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                    notificationType === 'individual'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <User className="w-5 h-5" />
                  Usuário Específico
                </button>
              </div>
            </div>

            {notificationType === 'individual' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Selecionar Usuário</label>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Escolha um usuário...</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Mensagem</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setMessageType('normal')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                    messageType === 'normal'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  Normal
                </button>
                <button
                  onClick={() => setMessageType('urgente')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                    messageType === 'urgente'
                      ? 'border-red-600 bg-red-50 text-red-700'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <AlertCircle className="w-5 h-5" />
                  Urgente
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Mensagem</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem aqui..."
                rows={5}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-slate-500 mt-1">{message.length} caracteres</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Agendar Envio (Opcional)
              </label>
              <input
                type="datetime-local"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleSendNotification}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
            >
              <Send className="w-5 h-5" />
              {scheduleDate ? 'Agendar Notificação' : 'Enviar Agora'}
            </button>
          </div>
        </div>

        {/* Quick Templates */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Mensagens Rápidas</h3>

          <div className="space-y-3">
            <button
              onClick={() => setMessage('Seu pagamento foi aprovado! Acesso liberado.')}
              className="w-full text-left p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
            >
              <p className="font-medium text-green-900">✓ Pagamento Aprovado</p>
              <p className="text-sm text-green-700 mt-1">Notificar aprovação de pagamento</p>
            </button>

            <button
              onClick={() => setMessage('Seu pagamento está pendente. Por favor, envie o comprovante.')}
              className="w-full text-left p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <p className="font-medium text-orange-900">⏱ Pagamento Pendente</p>
              <p className="text-sm text-orange-700 mt-1">Lembrar sobre pagamento</p>
            </button>

            <button
              onClick={() => setMessage('Novo módulo disponível! Confira agora o conteúdo exclusivo.')}
              className="w-full text-left p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <p className="font-medium text-blue-900">🎓 Novo Conteúdo</p>
              <p className="text-sm text-blue-700 mt-1">Avisar sobre novo módulo</p>
            </button>

            <button
              onClick={() => setMessage('Atualização importante do sistema. Verifique as novidades!')}
              className="w-full text-left p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <p className="font-medium text-purple-900">🔔 Atualização</p>
              <p className="text-sm text-purple-700 mt-1">Informar sobre atualizações</p>
            </button>

            <button
              onClick={() => setMessage('URGENTE: Manutenção programada. O sistema ficará indisponível temporariamente.')}
              className="w-full text-left p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
            >
              <p className="font-medium text-red-900">⚠️ Manutenção</p>
              <p className="text-sm text-red-700 mt-1">Avisar sobre manutenção</p>
            </button>
          </div>
        </div>
      </div>

      {/* Sent Notifications History */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Histórico de Notificações</h3>

        <div className="space-y-3">
          {sentNotifications.map((notification) => (
            <div key={notification.id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
              <div className={`p-2 rounded-lg ${
                notification.priority === 'urgente' ? 'bg-red-100' : 'bg-blue-100'
              }`}>
                {notification.priority === 'urgente' ? (
                  <AlertCircle className="w-6 h-6 text-red-600" />
                ) : (
                  <Bell className="w-6 h-6 text-blue-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium text-slate-900">{notification.message}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    notification.priority === 'urgente'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {notification.priority.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {notification.sentAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {notification.recipients} {notification.recipients === 1 ? 'destinatário' : 'destinatários'}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    notification.type === 'todos'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {notification.type === 'todos' ? 'Todos' : 'Individual'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
