'use client';

import { useState } from 'react';
import { MessageSquare, Search, Filter, Clock, CheckCircle, XCircle, Send } from 'lucide-react';

interface Ticket {
  id: string;
  userName: string;
  userEmail: string;
  subject: string;
  status: 'aberto' | 'respondido' | 'resolvido';
  priority: 'baixa' | 'media' | 'alta';
  createdAt: string;
  lastUpdate: string;
  messages: Message[];
}

interface Message {
  id: string;
  sender: 'user' | 'admin';
  content: string;
  timestamp: string;
}

export default function SuportePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  const [tickets] = useState<Ticket[]>([
    {
      id: '1',
      userName: 'Ana Silva',
      userEmail: 'ana@email.com',
      subject: 'Não consigo acessar o módulo 3',
      status: 'aberto',
      priority: 'alta',
      createdAt: '2024-01-20 14:30',
      lastUpdate: '2024-01-20 14:30',
      messages: [
        { id: '1', sender: 'user', content: 'Olá, estou tentando acessar o módulo 3 mas aparece como bloqueado mesmo tendo pago.', timestamp: '2024-01-20 14:30' }
      ]
    },
    {
      id: '2',
      userName: 'Carlos Santos',
      userEmail: 'carlos@email.com',
      subject: 'Dúvida sobre certificado',
      status: 'respondido',
      priority: 'media',
      createdAt: '2024-01-19 10:15',
      lastUpdate: '2024-01-19 15:20',
      messages: [
        { id: '1', sender: 'user', content: 'Como faço para receber meu certificado?', timestamp: '2024-01-19 10:15' },
        { id: '2', sender: 'admin', content: 'Olá Carlos! O certificado é liberado automaticamente após completar 100% do curso.', timestamp: '2024-01-19 15:20' }
      ]
    },
    {
      id: '3',
      userName: 'Maria Oliveira',
      userEmail: 'maria@email.com',
      subject: 'Problema com pagamento',
      status: 'resolvido',
      priority: 'alta',
      createdAt: '2024-01-18 09:00',
      lastUpdate: '2024-01-18 16:45',
      messages: [
        { id: '1', sender: 'user', content: 'Fiz o pagamento mas ainda não foi aprovado.', timestamp: '2024-01-18 09:00' },
        { id: '2', sender: 'admin', content: 'Olá Maria! Vou verificar seu pagamento agora.', timestamp: '2024-01-18 10:30' },
        { id: '3', sender: 'admin', content: 'Pagamento aprovado! Seu acesso já está liberado.', timestamp: '2024-01-18 16:45' },
        { id: '4', sender: 'user', content: 'Muito obrigada! Já consegui acessar.', timestamp: '2024-01-18 17:00' }
      ]
    }
  ]);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'todos' || ticket.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aberto': return 'bg-orange-100 text-orange-700';
      case 'respondido': return 'bg-blue-100 text-blue-700';
      case 'resolvido': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'bg-red-100 text-red-700';
      case 'media': return 'bg-yellow-100 text-yellow-700';
      case 'baixa': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const handleSendReply = () => {
    if (replyMessage.trim() && selectedTicket) {
      alert(`Resposta enviada: ${replyMessage}`);
      setReplyMessage('');
    }
  };

  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === 'aberto').length;
  const respondedTickets = tickets.filter(t => t.status === 'respondido').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolvido').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Central de Suporte</h1>
        <p className="text-slate-600 mt-1">Gerencie tickets e atenda seus clientes</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Total de Tickets</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{totalTickets}</h3>
            </div>
            <MessageSquare className="w-12 h-12 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Tickets Abertos</p>
              <h3 className="text-3xl font-bold text-orange-600 mt-1">{openTickets}</h3>
            </div>
            <Clock className="w-12 h-12 text-orange-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Respondidos</p>
              <h3 className="text-3xl font-bold text-blue-600 mt-1">{respondedTickets}</h3>
            </div>
            <MessageSquare className="w-12 h-12 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Resolvidos</p>
              <h3 className="text-3xl font-bold text-green-600 mt-1">{resolvedTickets}</h3>
            </div>
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nome ou assunto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todos">Todos</option>
              <option value="aberto">Abertos</option>
              <option value="respondido">Respondidos</option>
              <option value="resolvido">Resolvidos</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900">Lista de Tickets</h3>
          </div>
          <div className="divide-y divide-slate-200 max-h-[600px] overflow-y-auto">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                  selectedTicket?.id === ticket.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">{ticket.subject}</h4>
                    <p className="text-sm text-slate-600">{ticket.userName}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                    {ticket.status.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-500">{ticket.lastUpdate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {selectedTicket ? (
            <>
              <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <h3 className="font-semibold">{selectedTicket.subject}</h3>
                <p className="text-sm text-blue-100">{selectedTicket.userName} • {selectedTicket.userEmail}</p>
              </div>
              <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
                {selectedTicket.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'admin'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'admin' ? 'text-blue-100' : 'text-slate-500'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-slate-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Digite sua resposta..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendReply()}
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendReply}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                    Marcar como Resolvido
                  </button>
                  <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                    Fechar Ticket
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full p-8 text-center">
              <div>
                <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">Selecione um ticket para visualizar</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
