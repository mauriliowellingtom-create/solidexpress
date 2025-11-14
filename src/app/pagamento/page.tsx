"use client";

import { useState } from "react";
import { Copy, Check, Upload, Clock, CheckCircle, XCircle, ArrowLeft, Shield, Zap, Lock } from "lucide-react";
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

export default function PagamentoPage() {
  const [copied, setCopied] = useState(false);
  const [proofImage, setProofImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Chave PIX - SUBSTITUA PELA SUA CHAVE REAL
  const pixKey = "suachavepix@recargapay.com.br";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !phone || !proofImage) {
      alert("Por favor, preencha todos os campos e envie o comprovante!");
      return;
    }

    // Salvar no localStorage (simula banco de dados)
    const payment: Payment = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      proofImage,
      status: "pending",
      date: new Date().toISOString()
    };

    const existingPayments = JSON.parse(localStorage.getItem("payments") || "[]");
    localStorage.setItem("payments", JSON.stringify([...existingPayments, payment]));

    setSubmitted(true);
    
    // Reset form
    setTimeout(() => {
      setName("");
      setEmail("");
      setPhone("");
      setProofImage(null);
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-pink-500/20">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-500/30 rounded-full px-6 py-2 mb-6">
            <span className="text-pink-400 text-sm font-bold flex items-center gap-2 justify-center">
              <Zap className="w-4 h-4" />
              Pagamento Rápido e Seguro
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            Finalize seu pagamento
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
              e aproveite todos os benefícios!
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Sua compra está quase concluída, não pare agora!
          </p>
        </div>

        {/* Badges de Confiança */}
        <div className="grid grid-cols-3 gap-4 mb-8 sm:mb-12">
          <div className="bg-gradient-to-br from-gray-800 to-black border border-pink-500/20 rounded-xl p-4 text-center">
            <Zap className="w-8 h-8 text-pink-400 mx-auto mb-2" />
            <p className="text-xs sm:text-sm text-gray-300 font-semibold">Liberação Imediata</p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-black border border-pink-500/20 rounded-xl p-4 text-center">
            <Shield className="w-8 h-8 text-pink-400 mx-auto mb-2" />
            <p className="text-xs sm:text-sm text-gray-300 font-semibold">100% Seguro</p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-black border border-pink-500/20 rounded-xl p-4 text-center">
            <Lock className="w-8 h-8 text-pink-400 mx-auto mb-2" />
            <p className="text-xs sm:text-sm text-gray-300 font-semibold">Garantido</p>
          </div>
        </div>

        {/* Valor */}
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-8 text-center mb-8 shadow-2xl shadow-pink-500/50">
          <p className="text-pink-100 text-lg mb-2">Valor do Curso</p>
          <p className="text-6xl font-black text-white mb-2">R$ 497</p>
          <p className="text-pink-100">ou 12x de R$ 49,70</p>
        </div>

        {/* Área PIX */}
        <div className="bg-gradient-to-br from-gray-800 to-black border border-pink-500/30 rounded-3xl p-6 sm:p-8 mb-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-3 rounded-xl">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Pague via PIX</h2>
              <p className="text-pink-400 text-sm font-semibold">Liberação rápida e automática!</p>
            </div>
          </div>

          {/* QR Code */}
          <div className="bg-white rounded-2xl p-6 mb-6 text-center">
            <p className="text-gray-900 font-bold mb-4">Escaneie e pague em segundos!</p>
            <div className="bg-gray-100 w-64 h-64 mx-auto rounded-xl flex items-center justify-center mb-4">
              {/* QR Code gerado dinamicamente - aqui usamos placeholder */}
              <div className="text-center">
                <div className="w-48 h-48 bg-gradient-to-br from-pink-200 to-rose-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-700 text-sm font-semibold px-4">
                    QR Code PIX<br/>
                    <span className="text-xs">(Escaneie com seu app)</span>
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">Use o app do seu banco para escanear</p>
          </div>

          {/* Chave PIX */}
          <div className="bg-black/50 border border-pink-500/20 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-3 text-center">Ou copie a chave PIX:</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 bg-gray-900 border border-pink-500/30 rounded-lg px-4 py-3 text-white font-mono text-sm break-all">
                {pixKey}
              </div>
              <button
                onClick={handleCopyPix}
                className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-6 py-3 rounded-lg font-bold hover:from-pink-600 hover:to-rose-700 transition-all shadow-lg hover:scale-105 flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copiar Chave
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mensagem de Urgência */}
        <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/30 rounded-2xl p-6 mb-8 text-center">
          <p className="text-pink-400 font-bold text-lg mb-2">⚡ Pagamento via PIX: liberação imediata!</p>
          <p className="text-gray-400">Garantia de segurança e rapidez.</p>
        </div>

        {/* Formulário de Comprovante */}
        <div className="bg-gradient-to-br from-gray-800 to-black border border-pink-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-3 rounded-xl">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Envie seu comprovante aqui</h2>
              <p className="text-pink-400 text-sm font-semibold">Nossa equipe libera rapidinho!</p>
            </div>
          </div>

          {submitted ? (
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Comprovante Enviado!</h3>
              <p className="text-gray-300 mb-4">
                Nossa equipe está analisando seu pagamento.<br/>
                Você receberá o acesso em breve!
              </p>
              <p className="text-green-400 font-semibold">✨ Liberação em até 10 minutos</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome */}
              <div>
                <label className="block text-white font-semibold mb-2">Nome Completo *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-900 border border-pink-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
                  placeholder="Seu nome completo"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-white font-semibold mb-2">E-mail *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-900 border border-pink-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-white font-semibold mb-2">Telefone/WhatsApp *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-gray-900 border border-pink-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
                  placeholder="(00) 00000-0000"
                  required
                />
              </div>

              {/* Upload Comprovante */}
              <div>
                <label className="block text-white font-semibold mb-2">Comprovante de Pagamento *</label>
                <div className="border-2 border-dashed border-pink-500/30 rounded-xl p-8 text-center hover:border-pink-500/50 transition-colors">
                  {proofImage ? (
                    <div className="space-y-4">
                      <img src={proofImage} alt="Comprovante" className="max-h-64 mx-auto rounded-lg" />
                      <button
                        type="button"
                        onClick={() => setProofImage(null)}
                        className="text-pink-400 hover:text-pink-300 text-sm font-semibold"
                      >
                        Trocar imagem
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <Upload className="w-12 h-12 text-pink-400 mx-auto mb-3" />
                      <p className="text-white font-semibold mb-1">Clique para enviar</p>
                      <p className="text-gray-400 text-sm">JPEG ou PNG (máx. 5MB)</p>
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={handleImageUpload}
                        className="hidden"
                        required
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Botão Submit */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-5 rounded-xl font-black text-xl hover:from-pink-600 hover:to-rose-700 transition-all shadow-2xl shadow-pink-500/50 hover:scale-105 flex items-center justify-center gap-3"
              >
                <CheckCircle className="w-6 h-6" />
                Enviar Comprovante
              </button>

              <p className="text-center text-gray-400 text-sm">
                Ao enviar, você concorda com nossos termos de uso
              </p>
            </form>
          )}
        </div>

        {/* Link para Admin */}
        <div className="mt-8 text-center">
          <Link 
            href="/admin-pagamentos"
            className="text-gray-500 hover:text-pink-400 text-sm transition-colors"
          >
            Área Administrativa
          </Link>
        </div>
      </div>
    </div>
  );
}
