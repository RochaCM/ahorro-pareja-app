import React, { useState } from 'https://esm.sh/react@18';
import { createRoot } from 'https://esm.sh/react-dom@18/client';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [plans] = useState([
    {
      id: 'plan-1',
      title: 'Ahorro Juntos 18K',
      targetAmount: 18300,
      frequency: 'semanal',
      partnerName: 'Mi Novia 💕',
      steps: Array.from({ length: 60 }, (_, i) => ({
        period: i + 1,
        amount: (i + 1) * 10,
        isPaid: i < 4,
        paidBy: i < 0 ? null : (i % 2 === 0 ? 'Yo' : 'Mi Novia 💕')
      }))
    }
  ]);

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 p-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex justify-between items-center bg-[#1C2541] p-5 rounded-2xl border border-slate-700 shadow-xl">
          <div>
            <h1 className="text-2xl font-black text-white">Ahorro<span className="text-[#48E5C2]">Pro</span></h1>
            <p className="text-xs text-slate-300">Meta en Pareja & Ruleta de la Suerte</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#48E5C2]/20 text-[#48E5C2] text-xs font-bold">Activo</span>
        </header>

        <div className="bg-[#1C2541] p-6 rounded-3xl border border-slate-700 shadow-2xl space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Plan de Ahorro Juntos 18K</h2>
            <span className="text-xs text-[#FFD166] font-bold uppercase">Semanal</span>
          </div>
          <p className="text-3xl font-black text-[#48E5C2]">$4,300 <span className="text-sm font-normal text-slate-400">/ $18,300</span></p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            {plans[0].steps.slice(0, 8).map(step => (
              <div key={step.period} className={`p-3 rounded-xl border ${step.isPaid ? 'bg-slate-900/60 border-emerald-500/40' : 'bg-[#0B132B] border-slate-700'}`}>
                <span className="text-xs font-bold text-[#48E5C2]">#{step.period}</span>
                <p className="text-lg font-black text-white my-1">${step.amount}</p>
                <span className="text-[10px] text-slate-400">{step.isPaid ? `Pagado (${step.paidBy})` : 'Pendiente'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Renderizado automático para que la app corra al instante en la web
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
