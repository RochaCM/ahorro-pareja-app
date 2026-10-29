import React, { useState } from 'react';
import { 
  Users, User, Plus, Award, Calendar, CheckCircle2, Circle, 
  Share2, Copy, Sparkles, Dices, ChevronRight, 
  TrendingUp, Wallet, Check, X
} from 'lucide-react';

export default function App() {
  const [plans, setPlans] = useState([
    {
      id: 'plan-1',
      title: 'Ahorro Juntos 18K',
      targetAmount: 18300,
      frequency: 'semanal',
      totalPeriods: 60,
      isGroup: true,
      partnerName: 'Mi Novia 💕',
      inviteCode: 'LOVE18K',
      createdAt: '2025-01-15',
      steps: Array.from({ length: 60 }, (_, i) => {
        const num = i + 1;
        const amount = num * 10;
        let isPaid = num <= 4;
        let assignedTo = null;
        if (num === 1) assignedTo = 'Yo';
        if (num === 2) assignedTo = 'Mi Novia 💕';
        if (num === 3) assignedTo = 'Yo';
        if (num === 4) assignedTo = 'Mi Novia 💕';

        return {
          period: num,
          amount: amount,
          isPaid: isPaid,
          paidBy: assignedTo,
          assignedTo: assignedTo,
          assignedDate: isPaid ? '2025-02-01' : null
        };
      })
    }
  ]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPlanId, setSelectedPlanId] = useState('plan-1');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showRouletteModal, setShowRouletteModal] = useState(false);
  const [notification, setNotification] = useState(null);

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const selectedPlan = plans.find(p => p.id === selectedPlanId) || plans[0];

  const calculateSaved = (plan) => {
    if (!plan) return 0;
    return plan.steps
      .filter(s => s.isPaid)
      .reduce((sum, s) => sum + s.amount, 0);
  };

  const openPlanDetail = (id) => {
    setSelectedPlanId(id);
    setActiveTab('detail');
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 font-sans pb-12">
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-[#48E5C2] text-[#0B132B] px-5 py-3 rounded-xl shadow-2xl font-bold flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          {notification}
        </div>
      )}

      <header className="border-b border-slate-800 bg-[#1C2541]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#48E5C2] to-[#00F5D4] flex items-center justify-center shadow-lg">
              <Wallet className="w-6 h-6 text-[#0B132B]" />
            </div>
            <h1 className="font-extrabold text-lg text-white">
              Ahorro<span className="text-[#48E5C2]">Pro</span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setActiveTab('join')} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#48E5C2]" /> Unirme
            </button>
            <button onClick={() => setActiveTab('create')} className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-[#48E5C2] text-[#0B132B] flex items-center gap-1.5">
              <Plus className="w-4 h-4 stroke-[3]" /> Nuevo Plan
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-[#1C2541] rounded-3xl p-6 border border-slate-700 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <span className="px-3 py-1 rounded-full bg-[#48E5C2]/10 text-[#48E5C2] text-xs font-bold">Tus Metas Activas</span>
                <h2 className="text-2xl font-black text-white mt-2">Mis Planes de Ahorro</h2>
                <p className="text-slate-300 text-sm mt-1">Ahorra en pareja o individual con retos progresivos dinámicos.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {plans.map(plan => {
                const saved = calculateSaved(plan);
                const progress = (saved / plan.targetAmount) * 100;
                return (
                  <div key={plan.id} onClick={() => openPlanDetail(plan.id)} className="bg-[#1C2541] hover:border-[#48E5C2] border border-slate-700 rounded-2xl p-5 cursor-pointer transition shadow-lg">
                    <div className="flex justify-between mb-3">
                      <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold">Plan Pareja</span>
                      <span className="text-xs text-slate-400 uppercase">{plan.frequency}</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-1">{plan.title}</h4>
                    <p className="text-2xl font-black text-[#48E5C2] mb-4">${saved.toLocaleString()} <span className="text-sm text-slate-400">/ ${plan.targetAmount.toLocaleString()}</span></p>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-[#48E5C2] h-full" style={{ width: `${Math.min(progress, 100)}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'detail' && selectedPlan && (
          <div className="space-y-6">
            <button onClick={() => setActiveTab('dashboard')} className="text-xs font-bold text-slate-400 hover:text-[#48E5C2]">← Volver</button>
            <div className="bg-[#1C2541] border border-slate-700 rounded-3xl p-6 shadow-xl flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-white">{selectedPlan.title}</h2>
                <p className="text-xs text-slate-300 mt-1">Pareja: {selectedPlan.partnerName}</p>
              </div>
              <button onClick={() => setShowRouletteModal(true)} className="px-5 py-2.5 rounded-xl bg-[#FFD166] text-[#0B132B] font-extrabold text-xs flex items-center gap-2 shadow-lg">
                <Dices className="w-4 h-4" /> ¡Girar Ruleta!
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {selectedPlan.steps.map(step => (
                <div key={step.period} className={`rounded-2xl p-3 border ${step.isPaid ? 'bg-slate-900 border-emerald-500/40' : 'bg-[#1C2541] border-slate-700'}`}>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#48E5C2]">#{step.period}</span>
                    {step.isPaid ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Circle className="w-4 h-4 text-slate-500" />}
                  </div>
                  <p className="text-lg font-black text-white my-2">${step.amount}</p>
                  <span className="text-[10px] text-slate-400">{step.isPaid ? `Pagado por ${step.paidBy}` : (step.assignedTo ? `Asignado: ${step.assignedTo}` : 'Libre')}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {showRouletteModal && (
        <div className="fixed inset-0 z-50 bg-[#0B132B]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1C2541] border border-slate-700 rounded-3xl p-6 max-w-md w-full text-center relative">
            <button onClick={() => setShowRouletteModal(false)} className="absolute top-4 right-4 text-slate-400"><X /></button>
            <Dices className="w-10 h-10 text-[#FFD166] mx-auto mb-3 animate-bounce" />
            <h3 className="text-xl font-black text-white">¡Día de la Suerte!</h3>
            <div className="bg-[#0B132B] border border-[#FFD166]/40 rounded-2xl p-6 my-4">
              <span className="text-xs text-[#FFD166] font-bold">NÚMERO SORPRESA</span>
              <p className="text-3xl font-black text-white my-1">#12</p>
              <p className="text-xl font-black text-[#48E5C2]">$120</p>
            </div>
            <button onClick={() => { notify('¡Número asignado con éxito!'); setShowRouletteModal(false); }} className="w-full py-3 rounded-xl bg-[#48E5C2] text-[#0B132B] font-extrabold text-sm">
              Aceptar y Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
