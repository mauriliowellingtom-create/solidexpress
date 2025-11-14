"use client";

import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, ArrowLeft, User, Mail, Phone, Calendar, Image as ImageIcon, Shield, Trash2 } from "lucide-react";
import Link from "next/link";

interface Payment {
  id: string;
  name: string;
  email: string;
  phone: string;
  proofImage: string;
  status: "pending" | "approved" | "rejected";
  date: string;
}

export default function AdminPagamentosPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  // Senha de acesso - MUDE PARA UMA SENHA SEGURA
  const ADMIN_PASSWORD = "admin123";

  useEffect(() => {
    if (authenticated) {
      loadPayments();
    }
  }, [authenticated]);

  const loadPayments = () => {
    const stored = localStorage.getItem("payments");
    if (stored) {
      setPayments(JSON.parse(stored));
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Senha incorreta!");
    }
  };

  const updatePaymentStatus = (id: string, status: "approved" | "rejected") => {
    const updated = payments.map(p => 
      p.id === id ? { ...p, status } : p
    );
    setPayments(updated);
    localStorage.setItem("payments", JSON.stringify(updated));
    setSelectedPayment(null);
  };

  const deletePayment = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este pagamento?")) {
      const updated = payments.filter(p => p.id !== id);
      setPayments(updated);
      localStorage.setItem("payments", JSON.stringify(updated));
      setSelectedPayment(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-bold border border-yellow-500/30">
            <Clock className="w-4 h-4" />
            Pendente
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-bold border border-green-500/30">
            <CheckCircle className="w-4 h-4" />
            Aprovado
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm font-bold border border-red-500/30">
            <XCircle className="w-4 h-4" />
            Recusado
          </span>
        );
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-800 to-black border border-pink-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2">Área Administrativa</h1>
            <p className="text-gray-400">Acesso restrito</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">Senha de Acesso</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-900 border border-pink-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
                placeholder="Digite a senha"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-4 rounded-xl font-bold text-lg hover:from-pink-600 hover:to-rose-700 transition-all shadow-lg hover:scale-105"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/pagamento" className="text-gray-400 hover:text-pink-400 text-sm transition-colors">
              Voltar para Pagamento
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-pink-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/pagamento" className="inline-flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>
          <button
            onClick={() => setAuthenticated(false)}
            className="text-gray-400 hover:text-pink-400 text-sm transition-colors"
          >
            Sair
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Título */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">Painel Administrativo</h1>
          <p className="text-gray-400">Gerencie os pagamentos recebidos</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-black border border-yellow-500/30 rounded-2xl p-6">
            <Clock className="w-8 h-8 text-yellow-400 mb-3" />
            <p className="text-3xl font-black text-white mb-1">
              {payments.filter(p => p.status === "pending").length}
            </p>
            <p className="text-gray-400 text-sm">Pendentes</p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-black border border-green-500/30 rounded-2xl p-6">
            <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
            <p className="text-3xl font-black text-white mb-1">
              {payments.filter(p => p.status === "approved").length}
            </p>
            <p className="text-gray-400 text-sm">Aprovados</p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-black border border-red-500/30 rounded-2xl p-6">
            <XCircle className="w-8 h-8 text-red-400 mb-3" />
            <p className="text-3xl font-black text-white mb-1">
              {payments.filter(p => p.status === "rejected").length}
            </p>
            <p className="text-gray-400 text-sm">Recusados</p>
          </div>
        </div>

        {/* Lista de Pagamentos */}
        {payments.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-800 to-black border border-pink-500/20 rounded-2xl p-12 text-center">
            <p className="text-gray-400 text-lg">Nenhum pagamento recebido ainda</p>
          </div>
        ) : (
          <div className="space-y-4">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="bg-gradient-to-br from-gray-800 to-black border border-pink-500/20 rounded-2xl p-6 hover:border-pink-500/40 transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <h3 className="text-xl font-bold text-white">{payment.name}</h3>
                      {getStatusBadge(payment.status)}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Mail className="w-4 h-4 text-pink-400" />
                        {payment.email}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Phone className="w-4 h-4 text-pink-400" />
                        {payment.phone}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-4 h-4 text-pink-400" />
                        {new Date(payment.date).toLocaleString("pt-BR")}
                      </div>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex flex-col gap-3 lg:w-48">
                    <button
                      onClick={() => setSelectedPayment(payment)}
                      className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-4 py-2 rounded-lg font-bold hover:from-pink-600 hover:to-rose-700 transition-all flex items-center justify-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4" />
                      Ver Comprovante
                    </button>

                    {payment.status === "pending" && (
                      <>
                        <button
                          onClick={() => updatePaymentStatus(payment.id, "approved")}
                          className="bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-2 rounded-lg font-bold hover:bg-green-500/30 transition-all flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Aprovar
                        </button>
                        <button
                          onClick={() => updatePaymentStatus(payment.id, "rejected")}
                          className="bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg font-bold hover:bg-red-500/30 transition-all flex items-center justify-center gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          Recusar
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => deletePayment(payment.id)}
                      className="bg-gray-700/50 text-gray-400 border border-gray-600/30 px-4 py-2 rounded-lg font-bold hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Comprovante */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-pink-500/30 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Comprovante de Pagamento</h3>
                <button
                  onClick={() => setSelectedPayment(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Info do Cliente */}
              <div className="bg-black/50 border border-pink-500/20 rounded-2xl p-6 mb-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Nome</p>
                    <p className="text-white font-semibold">{selectedPayment.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">E-mail</p>
                    <p className="text-white font-semibold">{selectedPayment.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Telefone</p>
                    <p className="text-white font-semibold">{selectedPayment.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Data</p>
                    <p className="text-white font-semibold">
                      {new Date(selectedPayment.date).toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Imagem do Comprovante */}
              <div className="bg-white rounded-2xl p-4 mb-6">
                <img
                  src={selectedPayment.proofImage}
                  alt="Comprovante"
                  className="w-full h-auto rounded-lg"
                />
              </div>

              {/* Ações */}
              {selectedPayment.status === "pending" && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => updatePaymentStatus(selectedPayment.id, "approved")}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Liberar Acesso
                  </button>
                  <button
                    onClick={() => updatePaymentStatus(selectedPayment.id, "rejected")}
                    className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white px-6 py-4 rounded-xl font-bold hover:from-red-600 hover:to-rose-700 transition-all flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Recusar Pagamento
                  </button>
                </div>
              )}

              {selectedPayment.status !== "pending" && (
                <div className="text-center">
                  {getStatusBadge(selectedPayment.status)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
