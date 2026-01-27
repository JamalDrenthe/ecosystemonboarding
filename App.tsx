import React, { useState } from 'react';
import MindMap from './components/MindMap';
import Sidebar from './components/Sidebar';
import { Company, LayoutMode, SystemType } from './types';
import { getSystemData, getSystemTitle } from './data';
import { Menu, Info, Atom, Grid, Orbit, Search, Briefcase, Users, UserPlus, Target } from 'lucide-react';

const App: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<LayoutMode>('orbit');
  const [currentSystem, setCurrentSystem] = useState<SystemType>('sales');
  const [searchQuery, setSearchQuery] = useState('');

  const currentData = getSystemData(currentSystem);
  const missionCount = currentData.length;

  const handleNodeClick = (company: Company | null) => {
    setSelectedCompany(company);
    setIsSidebarOpen(true);
  };

  const switchSystem = (system: SystemType) => {
    setCurrentSystem(system);
    setSelectedCompany(null);
  };

  return (
    <div className="w-full h-screen flex relative overflow-hidden bg-[#0a0f1c]">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0f1c] to-black opacity-80 pointer-events-none"></div>
      
      {/* Sidebar - Mobile Responsive Overlay or Desktop Side Panel */}
      <div 
        className={`
            fixed inset-y-0 right-0 z-30 w-full sm:w-[420px] 
            transform transition-transform duration-500 cubic-bezier(0.25, 1, 0.5, 1)
            ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
            shadow-[0_0_50px_rgba(0,0,0,0.5)] border-l border-white/10
        `}
      >
        <Sidebar 
            companies={currentData}
            selectedCompany={selectedCompany} 
            onClose={() => setIsSidebarOpen(false)} 
            onSelect={handleNodeClick}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 h-full relative z-10">
        {/* Toggle Button for Sidebar when closed */}
        {!isSidebarOpen && (
            <button 
                onClick={() => setIsSidebarOpen(true)}
                className="absolute top-6 right-6 z-20 p-3 bg-white/5 backdrop-blur-md text-slate-200 rounded-full hover:bg-white/10 hover:text-white border border-white/10 transition-all shadow-lg group"
            >
                <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
        )}
        
        {/* Header Overlay */}
        <div className="absolute top-6 left-8 z-20 flex flex-col gap-5 max-w-sm">
            <div className="select-none">
                <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 backdrop-blur-sm">
                        <Atom className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
                        {getSystemTitle(currentSystem)}
                    </h1>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                    <p className="text-slate-400 text-sm ml-1 font-light tracking-wide">
                        Corporate Structure & Venture Network
                    </p>
                </div>
                
                {/* Missie Teller */}
                <div className="mt-4 flex items-center gap-3">
                    <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-lg backdrop-blur-sm shadow-[0_0_20px_rgba(16,185,129,0.1)] group hover:bg-emerald-500/10 transition-colors cursor-default">
                        <div className="p-1.5 bg-emerald-500/20 rounded-full animate-pulse">
                            <Target className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-emerald-500/70 uppercase tracking-widest leading-none mb-0.5">Actieve Missies</span>
                            <span className="text-lg font-mono font-bold text-white leading-none">{missionCount}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* System Navigation Tabs */}
            <div className="flex bg-white/5 backdrop-blur-md border border-white/10 p-1 rounded-xl w-full">
                <button 
                    onClick={() => switchSystem('sales')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${currentSystem === 'sales' ? 'bg-emerald-500/20 text-emerald-400 shadow-sm ring-1 ring-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                    <Briefcase className="w-3.5 h-3.5" />
                    SalesOps
                </button>
                <button 
                    onClick={() => switchSystem('onboarding')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${currentSystem === 'onboarding' ? 'bg-emerald-500/20 text-emerald-400 shadow-sm ring-1 ring-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                    <UserPlus className="w-3.5 h-3.5" />
                    Onboarding
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search in ${getSystemTitle(currentSystem)}...`}
                    className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-xl leading-5 bg-white/5 text-slate-200 placeholder-slate-500 focus:outline-none focus:bg-white/10 focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 sm:text-sm backdrop-blur-md transition-all"
                />
            </div>

            {/* View Controller */}
            <div className="inline-flex p-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl w-fit">
                <button 
                    onClick={() => setViewMode('orbit')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === 'orbit' ? 'bg-emerald-500/20 text-emerald-400 shadow-sm ring-1 ring-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                    <Orbit className="w-3.5 h-3.5" />
                    Orbit
                </button>
                <button 
                    onClick={() => setViewMode('galaxy')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === 'galaxy' ? 'bg-emerald-500/20 text-emerald-400 shadow-sm ring-1 ring-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                    <Atom className="w-3.5 h-3.5" />
                    Galaxy
                </button>
                <button 
                    onClick={() => setViewMode('matrix')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === 'matrix' ? 'bg-emerald-500/20 text-emerald-400 shadow-sm ring-1 ring-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                    <Grid className="w-3.5 h-3.5" />
                    Matrix
                </button>
            </div>
        </div>

        {/* Visualization */}
        <MindMap 
            data={currentData}
            onNodeClick={handleNodeClick} 
            selectedId={selectedCompany?.id || null} 
            viewMode={viewMode}
            searchQuery={searchQuery}
        />
        
        {/* Instructions Overlay */}
        <div className="absolute bottom-6 left-8 z-20 pointer-events-none opacity-50 hidden md:block">
            <div className="flex items-center gap-3 text-xs text-slate-400 uppercase tracking-widest font-semibold bg-black/20 px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm">
                <Info className="w-3 h-3 text-emerald-500" />
                <span>Interactive Force Layout</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default App;