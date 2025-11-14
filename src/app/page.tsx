"use client";

import { useState } from "react";
import { Truck, Package, Warehouse, Zap, Shield, Clock, MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Menu, X, Star, CheckCircle, TrendingUp, Users, CreditCard, QrCode, FileText, Search, DollarSign, AlertCircle, CheckCircle2, XCircle } from "lucide-react";

// Tipos para o sistema
interface QuoteForm {
  name: string;
  email: string;
  cargoType: string;
  city: string;
  weight: string;
}

interface TrackingData {
  code: string;
  status: "pending" | "in_transit" | "delivered" | "cancelled";
  location: string;
  lastUpdate: string;
}

interface Payment {
  id: string;
  amount: number;
  method: string;
  status: string;
  date: string;
}

export default function SolidExpressPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  
  // Estados do formulário de orçamento
  const [quoteForm, setQuoteForm] = useState<QuoteForm>({
    name: "",
    email: "",
    cargoType: "",
    city: "",
    weight: ""
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  // Estados de pagamento
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "pix" | "boleto">("credit");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [pixCode, setPixCode] = useState("");

  // Estados de rastreamento
  const [trackingCode, setTrackingCode] = useState("");
  const [trackingResult, setTrackingResult] = useState<TrackingData | null>(null);

  // Dados simulados para admin
  const [adminOrders] = useState([
    { id: "SE001", client: "João Silva", service: "Carga Rápida", status: "Em trânsito", value: 850 },
    { id: "SE002", client: "Maria Santos", service: "Logística Integrada", status: "Entregue", value: 1200 },
    { id: "SE003", client: "Pedro Costa", service: "Entrega Expressa", status: "Pendente", value: 450 }
  ]);

  const [adminPayments] = useState<Payment[]>([
    { id: "PAY001", amount: 850, method: "PIX", status: "Confirmado", date: "2024-01-15" },
    { id: "PAY002", amount: 1200, method: "Cartão", status: "Confirmado", date: "2024-01-14" },
    { id: "PAY003", amount: 450, method: "Boleto", status: "Pendente", date: "2024-01-13" }
  ]);

  // Dados simulados de rastreamento
  const trackingDatabase: { [key: string]: TrackingData } = {
    "SE12345": {
      code: "SE12345",
      status: "in_transit",
      location: "Centro de Distribuição - São Paulo",
      lastUpdate: "15/01/2024 14:30"
    },
    "SE67890": {
      code: "SE67890",
      status: "delivered",
      location: "Entregue - Rio de Janeiro",
      lastUpdate: "14/01/2024 10:15"
    },
    "SE11111": {
      code: "SE11111",
      status: "pending",
      location: "Aguardando coleta - Belo Horizonte",
      lastUpdate: "16/01/2024 08:00"
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  // Função para calcular orçamento
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de cálculo de frete
    const basePrice = 200;
    const weightFactor = parseFloat(quoteForm.weight) * 5;
    const cityFactor = quoteForm.city.length * 2; // Simulação simples
    const cargoFactor = quoteForm.cargoType === "fragil" ? 100 : 50;
    
    const totalPrice = basePrice + weightFactor + cityFactor + cargoFactor;
    setCalculatedPrice(totalPrice);
    setQuoteSubmitted(true);

    // Simular envio de email
    console.log("Email automático enviado para:", quoteForm.email);
    console.log("Orçamento calculado:", totalPrice);
  };

  // Função para processar pagamento
  const handlePayment = () => {
    setPaymentProcessing(true);
    
    // Simular processamento
    setTimeout(() => {
      if (paymentMethod === "pix") {
        // Gerar código PIX simulado
        const code = `00020126580014BR.GOV.BCB.PIX0136${Math.random().toString(36).substring(7)}52040000530398654${calculatedPrice?.toFixed(2)}5802BR5913SOLID EXPRESS6009SAO PAULO62070503***6304`;
        setPixCode(code);
      }
      
      setPaymentProcessing(false);
      setPaymentSuccess(true);
      
      // Simular envio de recibo
      console.log("Recibo enviado para:", quoteForm.email);
    }, 2000);
  };

  // Função para rastrear entrega
  const handleTracking = () => {
    const result = trackingDatabase[trackingCode.toUpperCase()];
    setTrackingResult(result || null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "text-yellow-600 bg-yellow-100";
      case "in_transit": return "text-blue-600 bg-blue-100";
      case "delivered": return "text-green-600 bg-green-100";
      case "cancelled": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Aguardando Coleta";
      case "in_transit": return "Em Trânsito";
      case "delivered": return "Entregue";
      case "cancelled": return "Cancelado";
      default: return "Desconhecido";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Fixo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A1628] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2 rounded-lg">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Solid Express</h1>
                <p className="text-xs text-blue-300">Logística Inteligente</p>
              </div>
            </div>

            {/* Menu Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection("inicio")} className="text-gray-300 hover:text-white transition-colors">
                Início
              </button>
              <button onClick={() => scrollToSection("sobre")} className="text-gray-300 hover:text-white transition-colors">
                Sobre Nós
              </button>
              <button onClick={() => scrollToSection("servicos")} className="text-gray-300 hover:text-white transition-colors">
                Serviços
              </button>
              <button onClick={() => scrollToSection("parcerias")} className="text-gray-300 hover:text-white transition-colors">
                Parcerias
              </button>
              <button onClick={() => scrollToSection("contato")} className="text-gray-300 hover:text-white transition-colors">
                Contato
              </button>
              <button 
                onClick={() => setShowQuoteModal(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Solicite um Orçamento
              </button>
            </nav>

            {/* Menu Mobile Toggle */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Menu Mobile */}
          {menuOpen && (
            <div className="md:hidden py-4 border-t border-gray-700">
              <nav className="flex flex-col gap-4">
                <button onClick={() => scrollToSection("inicio")} className="text-gray-300 hover:text-white transition-colors text-left">
                  Início
                </button>
                <button onClick={() => scrollToSection("sobre")} className="text-gray-300 hover:text-white transition-colors text-left">
                  Sobre Nós
                </button>
                <button onClick={() => scrollToSection("servicos")} className="text-gray-300 hover:text-white transition-colors text-left">
                  Serviços
                </button>
                <button onClick={() => scrollToSection("parcerias")} className="text-gray-300 hover:text-white transition-colors text-left">
                  Parcerias
                </button>
                <button onClick={() => scrollToSection("contato")} className="text-gray-300 hover:text-white transition-colors text-left">
                  Contato
                </button>
                <button 
                  onClick={() => setShowQuoteModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all"
                >
                  Solicite um Orçamento
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Banner Principal */}
      <section id="inicio" className="relative pt-20 min-h-screen flex items-center bg-gradient-to-br from-[#0A1628] via-[#1a2942] to-[#0A1628]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-2">
                <span className="text-blue-300 text-sm font-semibold">🚀 Líder em Logística Nacional</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Solid Express — <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Velocidade, Segurança e Confiança</span> em Cada Entrega
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                A entrega que move o seu negócio. Soluções completas em transporte e logística com tecnologia de rastreio em tempo real.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setShowQuoteModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-2xl hover:shadow-blue-500/50 hover:scale-105"
                >
                  Solicitar Orçamento Grátis
                </button>
                <button 
                  onClick={() => setShowTrackingModal(true)}
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Rastrear Entrega
                </button>
              </div>

              {/* Métodos de Pagamento */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <p className="text-blue-300 text-sm font-semibold mb-3">💳 Pague com segurança, de onde estiver</p>
                <p className="text-gray-400 text-xs mb-4">Aceitamos Pix, cartão e boleto</p>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-white/10 px-3 py-2 rounded-lg flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-gray-300">Visa</span>
                  </div>
                  <div className="bg-white/10 px-3 py-2 rounded-lg flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-gray-300">Mastercard</span>
                  </div>
                  <div className="bg-white/10 px-3 py-2 rounded-lg flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-gray-300">PIX</span>
                  </div>
                  <div className="bg-white/10 px-3 py-2 rounded-lg flex items-center gap-2">
                    <FileText className="w-4 h-4 text-orange-400" />
                    <span className="text-xs text-gray-300">Boleto</span>
                  </div>
                  <div className="bg-white/10 px-3 py-2 rounded-lg flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-gray-300">PayPal</span>
                  </div>
                  <div className="bg-white/10 px-3 py-2 rounded-lg flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs text-gray-300">Mercado Pago</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">15+</div>
                  <div className="text-sm text-gray-400">Anos de Experiência</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">50k+</div>
                  <div className="text-sm text-gray-400">Entregas Realizadas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">98%</div>
                  <div className="text-sm text-gray-400">Satisfação</div>
                </div>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur-3xl opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&h=600&fit=crop" 
                alt="Caminhões modernos Solid Express"
                className="relative rounded-3xl shadow-2xl border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Nós */}
      <section id="sobre" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Sobre a Solid Express
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Inovação e Excelência em <span className="text-blue-600">Logística</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Solid Express: velocidade que você confia. Sua carga, nossa prioridade.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                A <strong>Solid Express</strong> é uma empresa de transporte inovadora que revoluciona o mercado de logística brasileiro. Com foco absoluto em <strong>pontualidade</strong>, <strong>transparência</strong> e <strong>tecnologia de rastreio em tempo real</strong>, oferecemos soluções completas para empresas que não podem parar.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Nossa missão é conectar o Brasil com eficiência máxima, garantindo que cada entrega seja realizada com segurança, agilidade e total rastreabilidade. Investimos constantemente em tecnologia e capacitação para oferecer o melhor serviço do mercado.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Segurança Total</h3>
                    <p className="text-sm text-gray-600">Rastreamento 24/7 e seguro completo</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Pontualidade</h3>
                    <p className="text-sm text-gray-600">98% de entregas no prazo</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Cobertura Nacional</h3>
                    <p className="text-sm text-gray-600">Atendemos todo o Brasil</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <Zap className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Tecnologia</h3>
                    <p className="text-sm text-gray-600">Rastreio em tempo real</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl blur-2xl opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=600&fit=crop" 
                alt="Equipe Solid Express"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Nossos Serviços
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Soluções Completas em <span className="text-blue-600">Logística</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos serviços especializados para atender todas as necessidades do seu negócio
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Serviço 1 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Transporte de Cargas Rápidas</h3>
              <p className="text-gray-600 mb-4">
                Entregas expressas com prazos reduzidos para cargas urgentes. Velocidade sem comprometer a segurança.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Entrega em 24-48h
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Rastreamento em tempo real
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Seguro incluso
                </li>
              </ul>
            </div>

            {/* Serviço 2 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Logística Integrada</h3>
              <p className="text-gray-600 mb-4">
                Gestão completa da cadeia de suprimentos com soluções personalizadas para sua empresa.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Planejamento estratégico
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Otimização de rotas
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Redução de custos
                </li>
              </ul>
            </div>

            {/* Serviço 3 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Warehouse className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Armazenamento e Distribuição</h3>
              <p className="text-gray-600 mb-4">
                Centros de distribuição estratégicos com gestão inteligente de estoque e expedição.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Armazéns climatizados
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Gestão de inventário
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Picking e packing
                </li>
              </ul>
            </div>

            {/* Serviço 4 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Entregas Expressas Urbanas</h3>
              <p className="text-gray-600 mb-4">
                Last mile delivery com agilidade para e-commerce e varejo nas principais capitais.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Entrega no mesmo dia
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Agendamento flexível
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Notificações em tempo real
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Parcerias */}
      <section id="parcerias" className="py-20 bg-gradient-to-br from-[#0A1628] to-[#1a2942]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-600/20 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Parcerias Estratégicas
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Crescendo com <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Parceiros de Confiança</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Colaborações estratégicas que ampliam nossa capacidade e fortalecem nossa presença nacional
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-600 to-cyan-500 w-16 h-16 rounded-xl flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Mega Flex</h3>
                    <p className="text-blue-300">Parceiro Estratégico</p>
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-4">
                  Nossa parceria com a <strong className="text-white">Mega Flex</strong> representa um marco estratégico na expansão da Solid Express. Juntos, combinamos expertise em logística e tecnologia para oferecer soluções ainda mais robustas e abrangentes.
                </p>
                
                <p className="text-gray-300 leading-relaxed">
                  Esta colaboração nos permite ampliar nossa cobertura geográfica, otimizar rotas e oferecer prazos de entrega ainda mais competitivos, consolidando nossa posição como líder em logística nacional.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">200+</div>
                  <div className="text-sm text-gray-400">Parceiros Ativos</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">27</div>
                  <div className="text-sm text-gray-400">Estados Cobertos</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur-3xl opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop" 
                alt="Parceria estratégica"
                className="relative rounded-2xl shadow-2xl border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Depoimentos
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              O Que Nossos <span className="text-blue-600">Clientes Dizem</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A confiança de quem já escolheu a Solid Express
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Depoimento 1 */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "A Solid Express transformou nossa operação logística. Entregas pontuais, rastreamento preciso e atendimento excepcional. Recomendo fortemente!"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" 
                  alt="Cliente"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-gray-900">Carlos Mendes</div>
                  <div className="text-sm text-gray-600">CEO, TechStore Brasil</div>
                </div>
              </div>
            </div>

            {/* Depoimento 2 */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Parceria de anos com a Solid Express. Nunca tivemos problemas, sempre cumprem os prazos e a comunicação é impecável. São nossos parceiros de confiança."
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" 
                  alt="Cliente"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-gray-900">Mariana Silva</div>
                  <div className="text-sm text-gray-600">Diretora, Fashion Group</div>
                </div>
              </div>
            </div>

            {/* Depoimento 3 */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Eficiência e profissionalismo definem a Solid Express. Nossos clientes elogiam a rapidez das entregas. Melhor decisão que tomamos foi contratar vocês!"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" 
                  alt="Cliente"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-gray-900">Roberto Alves</div>
                  <div className="text-sm text-gray-600">Gerente, Distribuidora Nacional</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Pronto para Transformar Sua Logística?
          </h2>
          <p className="text-xl text-blue-100 mb-4">
            Solicite um orçamento gratuito e descubra como a Solid Express pode impulsionar seu negócio
          </p>
          <p className="text-sm text-blue-200 mb-8">
            ✅ Rápido, seguro e garantido com a Solid Express
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/5511980000000?text=Olá!%20Quero%20saber%20mais%20sobre%20os%20serviços%20da%20Solid%20Express." 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:scale-105"
            >
              Falar com Especialista Agora
            </a>
            <button
              onClick={() => setShowAdminPanel(true)}
              className="inline-block bg-blue-800 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-blue-900 transition-all shadow-2xl hover:scale-105"
            >
              Painel Administrativo
            </button>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Entre em Contato
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Fale com a <span className="text-blue-600">Solid Express</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estamos prontos para atender você
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Telefone</h3>
              <p className="text-gray-600 mb-2">(11) 3000-0000</p>
              <p className="text-gray-600">(11) 98000-0000</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">E-mail</h3>
              <p className="text-gray-600 mb-2">solidexpress.com@gmail.com</p>
              <p className="text-gray-600">comercial@solidexpress.com.br</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Endereço</h3>
              <p className="text-gray-600 mb-2">Av. Logística, 1000</p>
              <p className="text-gray-600">São Paulo - SP, 01000-000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A1628] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2 rounded-lg">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Solid Express</h3>
                  <p className="text-xs text-blue-300">Logística Inteligente</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Velocidade, segurança e confiança em cada entrega. Sua carga, nossa prioridade.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => scrollToSection("inicio")} className="hover:text-white transition-colors">Início</button></li>
                <li><button onClick={() => scrollToSection("sobre")} className="hover:text-white transition-colors">Sobre Nós</button></li>
                <li><button onClick={() => scrollToSection("servicos")} className="hover:text-white transition-colors">Serviços</button></li>
                <li><button onClick={() => scrollToSection("parcerias")} className="hover:text-white transition-colors">Parcerias</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Serviços</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Transporte de Cargas</li>
                <li className="hover:text-white transition-colors cursor-pointer">Logística Integrada</li>
                <li className="hover:text-white transition-colors cursor-pointer">Armazenamento</li>
                <li className="hover:text-white transition-colors cursor-pointer">Entregas Expressas</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Redes Sociais</h4>
              <div className="flex gap-4">
                <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Solid Express. Todos os direitos reservados. | CNPJ: 00.000.000/0001-00</p>
          </div>
        </div>
      </footer>

      {/* Botão WhatsApp Fixo */}
      <a 
        href="https://wa.me/5511980000000?text=Olá!%20Quero%20saber%20mais%20sobre%20os%20serviços%20da%20Solid%20Express." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-50 flex items-center gap-2"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Modal de Orçamento */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-gray-900">Solicitar Orçamento</h3>
                <button 
                  onClick={() => {
                    setShowQuoteModal(false);
                    setQuoteSubmitted(false);
                    setCalculatedPrice(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {!quoteSubmitted ? (
                <form onSubmit={handleQuoteSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
                    <input
                      type="text"
                      required
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail</label>
                    <input
                      type="email"
                      required
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Carga</label>
                    <select
                      required
                      value={quoteForm.cargoType}
                      onChange={(e) => setQuoteForm({...quoteForm, cargoType: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Selecione...</option>
                      <option value="normal">Carga Normal</option>
                      <option value="fragil">Carga Frágil</option>
                      <option value="perecivel">Carga Perecível</option>
                      <option value="pesada">Carga Pesada</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cidade de Destino</label>
                    <input
                      type="text"
                      required
                      value={quoteForm.city}
                      onChange={(e) => setQuoteForm({...quoteForm, city: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: São Paulo - SP"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Peso Estimado (kg)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={quoteForm.weight}
                      onChange={(e) => setQuoteForm({...quoteForm, weight: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: 50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
                  >
                    Calcular Orçamento
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                      <div>
                        <h4 className="text-xl font-bold text-green-900">Orçamento Calculado!</h4>
                        <p className="text-sm text-green-700">Confirmação enviada para {quoteForm.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-8">
                    <div className="text-center mb-6">
                      <p className="text-sm text-gray-600 mb-2">Valor Total da Entrega</p>
                      <p className="text-5xl font-bold text-blue-600">R$ {calculatedPrice?.toFixed(2)}</p>
                    </div>

                    <div className="space-y-3 text-sm text-gray-700 mb-6">
                      <div className="flex justify-between">
                        <span>Cliente:</span>
                        <span className="font-semibold">{quoteForm.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tipo de Carga:</span>
                        <span className="font-semibold">{quoteForm.cargoType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Destino:</span>
                        <span className="font-semibold">{quoteForm.city}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Peso:</span>
                        <span className="font-semibold">{quoteForm.weight} kg</span>
                      </div>
                    </div>

                    <div className="border-t border-blue-200 pt-4 mb-6">
                      <p className="text-xs text-gray-600 text-center">
                        💳 Pague com segurança, de onde estiver<br/>
                        ✅ Aceitamos Pix, cartão e boleto
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setShowQuoteModal(false);
                        setShowPaymentModal(true);
                      }}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-5 h-5" />
                      Confirmar Pagamento
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Pagamento */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-gray-900">Pagamento Seguro</h3>
                <button 
                  onClick={() => {
                    setShowPaymentModal(false);
                    setPaymentSuccess(false);
                    setPaymentProcessing(false);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {!paymentSuccess ? (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                    <p className="text-sm text-gray-600 mb-2">Valor a Pagar</p>
                    <p className="text-4xl font-bold text-blue-600">R$ {calculatedPrice?.toFixed(2)}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-4">Escolha o Método de Pagamento</label>
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        onClick={() => setPaymentMethod("credit")}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          paymentMethod === "credit" 
                            ? "border-blue-600 bg-blue-50" 
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <CreditCard className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                        <p className="text-sm font-semibold">Cartão</p>
                      </button>

                      <button
                        onClick={() => setPaymentMethod("pix")}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          paymentMethod === "pix" 
                            ? "border-green-600 bg-green-50" 
                            : "border-gray-200 hover:border-green-300"
                        }`}
                      >
                        <QrCode className="w-8 h-8 mx-auto mb-2 text-green-600" />
                        <p className="text-sm font-semibold">PIX</p>
                      </button>

                      <button
                        onClick={() => setPaymentMethod("boleto")}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          paymentMethod === "boleto" 
                            ? "border-orange-600 bg-orange-50" 
                            : "border-gray-200 hover:border-orange-300"
                        }`}
                      >
                        <FileText className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                        <p className="text-sm font-semibold">Boleto</p>
                      </button>
                    </div>
                  </div>

                  {paymentMethod === "credit" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Número do Cartão</label>
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Validade</label>
                          <input
                            type="text"
                            placeholder="MM/AA"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                          <input
                            type="text"
                            placeholder="000"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "pix" && pixCode && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                      <QrCode className="w-32 h-32 mx-auto mb-4 text-gray-400" />
                      <p className="text-sm text-gray-600 mb-2">Escaneie o QR Code ou copie o código PIX</p>
                      <div className="bg-white p-3 rounded border border-gray-300 text-xs break-all">
                        {pixCode}
                      </div>
                    </div>
                  )}

                  {paymentMethod === "boleto" && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <FileText className="w-16 h-16 mx-auto mb-4 text-orange-600" />
                      <p className="text-center text-sm text-gray-700 mb-4">
                        O boleto será gerado após a confirmação e enviado para seu e-mail
                      </p>
                      <p className="text-center text-xs text-gray-600">
                        Prazo de compensação: 1-3 dias úteis
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handlePayment}
                    disabled={paymentProcessing}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {paymentProcessing ? "Processando..." : "Confirmar Pagamento"}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Shield className="w-4 h-4" />
                    <span>Pagamento 100% seguro e criptografado</span>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-8">
                    <CheckCircle2 className="w-20 h-20 mx-auto mb-4 text-green-600" />
                    <h4 className="text-2xl font-bold text-green-900 mb-2">Pagamento Confirmado!</h4>
                    <p className="text-gray-700 mb-4">
                      Seu pagamento de <strong>R$ {calculatedPrice?.toFixed(2)}</strong> foi processado com sucesso.
                    </p>
                    <p className="text-sm text-gray-600">
                      Recibo enviado para: <strong>{quoteForm.email}</strong>
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <p className="text-sm text-gray-700 mb-4">
                      🚚 Sua entrega está sendo processada!<br/>
                      Você receberá o código de rastreamento em breve.
                    </p>
                    <button
                      onClick={() => {
                        setShowPaymentModal(false);
                        setShowTrackingModal(true);
                      }}
                      className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2 mx-auto"
                    >
                      <Search className="w-4 h-4" />
                      Rastrear Entrega
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Rastreamento */}
      {showTrackingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-gray-900">Rastrear Entrega</h3>
                <button 
                  onClick={() => {
                    setShowTrackingModal(false);
                    setTrackingResult(null);
                    setTrackingCode("");
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Código de Rastreamento</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={trackingCode}
                      onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                      placeholder="Ex: SE12345"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleTracking}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
                    >
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Códigos de exemplo: SE12345, SE67890, SE11111
                  </p>
                </div>

                {trackingResult && (
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-sm text-gray-600">Código de Rastreamento</p>
                        <p className="text-2xl font-bold text-gray-900">{trackingResult.code}</p>
                      </div>
                      <div className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(trackingResult.status)}`}>
                        {getStatusText(trackingResult.status)}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Localização Atual</p>
                          <p className="text-gray-700">{trackingResult.location}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Última Atualização</p>
                          <p className="text-gray-700">{trackingResult.lastUpdate}</p>
                        </div>
                      </div>
                    </div>

                    {trackingResult.status === "delivered" && (
                      <div className="mt-6 bg-green-100 border border-green-300 rounded-lg p-4 flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                        <p className="text-sm text-green-800 font-semibold">
                          Entrega realizada com sucesso!
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {trackingCode && !trackingResult && trackingCode.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-center gap-3">
                    <XCircle className="w-6 h-6 text-red-600" />
                    <div>
                      <p className="text-sm font-semibold text-red-900">Código não encontrado</p>
                      <p className="text-xs text-red-700">Verifique se o código está correto ou tente novamente mais tarde.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Painel Administrativo */}
      {showAdminPanel && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-gray-900">Painel Administrativo</h3>
                <button 
                  onClick={() => setShowAdminPanel(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Alertas */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900">Nova Solicitação</p>
                    <p className="text-xs text-blue-700">1 novo orçamento aguardando aprovação</p>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="text-sm font-semibold text-green-900">Pagamento Confirmado</p>
                    <p className="text-xs text-green-700">2 pagamentos recebidos hoje</p>
                  </div>
                </div>
              </div>

              {/* Pedidos */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Pedidos Recentes</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Cliente</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Serviço</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Valor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {adminOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.id}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{order.client}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{order.service}</td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === "Entregue" ? "bg-green-100 text-green-700" :
                              order.status === "Em trânsito" ? "bg-blue-100 text-blue-700" :
                              "bg-yellow-100 text-yellow-700"
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900">R$ {order.value.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagamentos */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Pagamentos Realizados</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Valor</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Método</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Data</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {adminPayments.map((payment) => (
                        <tr key={payment.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{payment.id}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900">R$ {payment.amount.toFixed(2)}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{payment.method}</td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              payment.status === "Confirmado" ? "bg-green-100 text-green-700" :
                              "bg-yellow-100 text-yellow-700"
                            }`}>
                              {payment.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">{payment.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
