import { useState } from 'react';
import { Play, Square, Settings, Plus, Download, Mic, Volume2 } from 'lucide-react';
import { invoke } from '@tauri-apps/api/core';

// Mock data for sounds
const MOCK_SOUNDS = [
  { id: 1, name: 'Bruh', duration: '0:02', category: 'Memes' },
  { id: 2, name: 'Vine Boom', duration: '0:03', category: 'Memes' },
  { id: 3, name: 'Spongebob Fail', duration: '0:05', category: 'Effects' },
  { id: 4, name: 'FBI Open Up', duration: '0:04', category: 'Voice' },
];

function App() {
  const [activeSound, setActiveSound] = useState<number | null>(null);

  return (
    <div className="h-screen w-full flex flex-col pt-8 p-4 gap-4">
      {/* Titlebar draggable area - Tauri handles window dragging here */}
      <div data-tauri-drag-region className="fixed top-0 left-0 right-0 h-8 flex items-center px-4 justify-between select-none z-50">
         <div className="text-xs font-semibold text-white/50 tracking-widest uppercase">Soundboard</div>
      </div>

      <header className="flex justify-between items-center mt-4">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
          Soundboard
        </h1>
        <div className="flex gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <Settings size={18} />
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus size={18} /> Add Sound
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6 flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="col-span-3 glass-panel p-4 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider">Categories</h2>
          <ul className="flex flex-col gap-1">
            <li className="px-3 py-2 rounded-lg bg-white/5 text-primary cursor-pointer font-medium">All Sounds</li>
            <li className="px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer text-text-muted transition-colors">Memes</li>
            <li className="px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer text-text-muted transition-colors">Effects</li>
            <li className="px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer text-text-muted transition-colors">Voice</li>
          </ul>
          
          <div className="mt-auto space-y-4">
            <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider">Audio Routing</h2>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-black/20 border border-white/5">
              <Volume2 size={18} className="text-primary" />
              <div className="flex-1">
                <div className="text-sm font-medium">Speakers</div>
                <div className="text-xs text-text-muted">Default Device</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-black/20 border border-white/5">
              <Mic size={18} className="text-green-400" />
              <div className="flex-1">
                <div className="text-sm font-medium">Mic Injection</div>
                <div className="text-xs text-text-muted">VB-Audio Cable</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-span-9 glass-panel p-6 flex flex-col overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">All Sounds</h2>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-colors w-64"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pr-2 pb-4">
            {MOCK_SOUNDS.map((sound) => (
              <div 
                key={sound.id}
                className="group p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 cursor-pointer flex flex-col gap-3"
                onClick={() => setActiveSound(sound.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="text-xs px-2 py-1 rounded-md bg-white/5 text-text-muted">
                    {sound.category}
                  </div>
                  <div className="text-xs text-text-muted">{sound.duration}</div>
                </div>
                
                <h3 className="font-medium text-lg mt-1">{sound.name}</h3>
                
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-xs text-text-muted bg-black/20 px-2 py-1 rounded border border-white/5">NUM {sound.id}</span>
                  <button className="w-8 h-8 rounded-full bg-primary/20 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-all group-hover:scale-110">
                    <Play size={14} fill="currentColor" />
                  </button>
                </div>
              </div>
            ))}
            
            {/* Import Button Card */}
            <div className="p-4 rounded-xl border border-dashed border-white/20 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 min-h-[140px]">
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                <Download size={20} />
              </div>
              <div className="text-sm font-medium text-center">Import via Link<br/><span className="text-xs text-text-muted font-normal">(YouTube / TikTok)</span></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
