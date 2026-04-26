import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Terminal, Cpu, Mail, User, Code, ExternalLink, ChevronRight, Monitor, Loader2 } from 'lucide-react';
import { FaGithub, FaXTwitter } from 'react-icons/fa6';

const App = () => {
  const [command, setCommand] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const accentColor = "#00FF41"; 
  
  const [history, setHistory] = useState([
    { type: 'system', content: 'Iniciando sistema... OK' },
    { type: 'system', content: 'Conexión establecida con gateway: LogicalReality' },
    { type: 'system', content: 'Sincronizando con GitHub API... ESPERE' }
  ]);

  // Calcula la edad automáticamente (26/01/1996)
  const age = useMemo(() => {
    const birthDate = new Date('1996-01-26');
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    return calculatedAge;
  }, []);

  // Fetch de repositorios reales de GitHub
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/LogicalReality/repos?sort=updated&per_page=6');
        const data = await response.json();
        
        if (Array.isArray(data)) {
          const formattedRepos = data.map(repo => ({
            name: repo.name,
            lang: repo.language || 'Plain Text',
            stars: repo.stargazers_count,
            desc: repo.description || 'Sin descripción disponible.',
            url: repo.html_url
          }));
          setProjects(formattedRepos);
          setHistory(prev => [...prev, { type: 'system', content: 'Repositorios sincronizados con éxito [OK]' }]);
        }
      } catch (error) {
        setHistory(prev => [...prev, { type: 'system', content: 'Error: Fallo en la sincronización de repositorios.' }]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = command.toLowerCase().trim();
      let response = '';

      switch (cmd) {
        case 'help':
          response = 'Comandos: whoami, projects, contact, clear, github';
          break;
        case 'whoami':
          response = `User: LogicalReality | Age: ${age} | Status: Coding & PC Lover.`;
          break;
        case 'projects':
          response = `Mostrando ${projects.length} repositorios activos desde GitHub.`;
          break;
        case 'contact':
          response = 'X (Twitter): @carlos26ch01 | Signal: LogicalReality.enc';
          break;
        case 'github':
          response = 'Redirigiendo a https://github.com/LogicalReality ...';
          window.open('https://github.com/LogicalReality', '_blank');
          break;
        case 'clear':
          setHistory([]);
          setCommand('');
          return;
        default:
          response = `Error: '${cmd}' no es un comando interno.`;
      }

      setHistory([...history, { type: 'user', content: `> ${command}` }, { type: 'system', content: response }]);
      setCommand('');
    }
  };

  return (
    <div className="min-h-screen bg-black font-mono p-4 md:p-8 flex flex-col items-center relative overflow-hidden" style={{ color: accentColor }}>
      {/* Estilos para el efecto de tubo de TV antiguo */}
      <style>
        {`
          @keyframes crt-roll {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(200%); }
          }
          .animate-crt-roll {
            animation: crt-roll 4s linear infinite;
          }
        `}
      </style>

      {/* Header Estilo BIOS */}
      <div className="w-full max-w-4xl border-b pb-4 mb-8 flex justify-between items-center relative z-10" style={{ borderColor: `${accentColor}33` }}>
        <div>
          <h1 className="text-2xl font-bold tracking-tighter uppercase italic opacity-90">Logical_Reality_OS_v2.6</h1>
          <p className="text-[10px] opacity-60">CPU_TEMP: 42°C // MEM: 16GB // DISK: OK</p>
        </div>
        <div className="flex gap-4">
          <a href="https://github.com/LogicalReality" target="_blank" rel="noreferrer" title="GitHub">
            <FaGithub className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          </a>
          {/* Sustitución del botón de correo por enlace a X */}
          <a href="https://x.com/carlos26ch01" target="_blank" rel="noreferrer" title="X (Twitter)">
            <FaXTwitter className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          </a>
        </div>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        
        {/* Sidebar: Perfil */}
        <div className="space-y-6">
          {/* Foto de Perfil Destacada con Efecto Fallout */}
          <div className="border-2 p-1 inline-block transition-all duration-500 shadow-[0_0_30px_rgba(0,255,65,0.4)] hover:shadow-[0_0_50px_rgba(0,255,65,0.6)]" style={{ borderColor: accentColor }}>
            <div className="w-48 h-48 bg-zinc-900 flex items-center justify-center relative overflow-hidden group">
              <img 
                src="https://github.com/LogicalReality.png" 
                alt="LogicalReality GitHub Avatar" 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 scale-105 group-hover:scale-100"
              />
              
              {/* Barra horizontal descendente (Efecto Fallout/CRT) */}
              <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-transparent via-[#00FF4144] to-transparent pointer-events-none animate-crt-roll opacity-40"></div>

              {/* Overlay de escaneo estático */}
              <div className="absolute inset-0 pointer-events-none opacity-30 bg-[linear-gradient(rgba(0,255,65,0.1)_1px,transparent_1px)] bg-[size:100%_4px]"></div>
              
              {/* Brillo en los bordes al hacer hover */}
              <div className="absolute inset-0 pointer-events-none border-4 border-transparent group-hover:border-[#00FF4122] transition-all"></div>
            </div>
          </div>
          
          <div className="space-y-2 p-4 rounded border" style={{ backgroundColor: `${accentColor}08`, borderColor: `${accentColor}33` }}>
            <h2 className="text-xl text-white underline underline-offset-8 mb-4 tracking-widest text-center md:text-left">IDENTIDAD</h2>
            <p className="text-sm uppercase tracking-tighter">USER: <span style={{ color: '#fff' }}>LogicalReality</span></p>
            <p className="text-sm uppercase tracking-tighter">LOC: <span style={{ color: '#fff' }}>Barcelona, VZLA</span></p>
            <p className="text-sm uppercase tracking-tighter">LVL: <span style={{ color: '#fff' }}>{age} | Code & PC Lover</span></p>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Terminal */}
          <div className="bg-zinc-900 rounded-lg overflow-hidden border shadow-[0_0_25px_rgba(0,255,65,0.15)]" style={{ borderColor: accentColor }}>
            <div className="bg-zinc-800 p-2 flex gap-2 border-b border-zinc-700">
              <div className="w-3 h-3 rounded-full bg-red-900/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-900/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-900/50"></div>
              <span className="text-[10px] text-zinc-500 ml-2 tracking-widest">SSH: LOGICAL@REALITY</span>
            </div>
            <div className="h-64 overflow-y-auto p-4 text-sm leading-relaxed scrollbar-hide">
              {history.map((log, i) => (
                <div key={i} className={log.type === 'user' ? 'text-white font-bold' : 'opacity-90'}>
                  {log.content}
                </div>
              ))}
              <div className="flex items-center mt-1">
                <span className="mr-2 font-bold" style={{ color: accentColor }}>$</span>
                <input
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={handleCommand}
                  className="bg-transparent border-none outline-none flex-grow text-white"
                  autoFocus
                />
              </div>
            </div>
          </div>

          {/* Repositorios Dinámicos */}
          <div>
            <h2 className="text-xl mb-4 flex items-center gap-2 border-l-4 pl-3 uppercase tracking-tighter" style={{ borderColor: accentColor }}>
               REPOSITORIOS_ACTIVOS
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {loading ? (
                <div className="flex items-center justify-center py-8 opacity-40">
                  <Loader2 className="w-6 h-6 animate-spin mr-2" />
                  <span>Sincronizando con GitHub...</span>
                </div>
              ) : (
                projects.map((p, i) => (
                  <a 
                    key={i} 
                    href={p.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="border p-4 hover:bg-[#00FF4111] transition-all group cursor-pointer block" 
                    style={{ borderColor: `${accentColor}33` }}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold group-hover:text-white italic tracking-tight" style={{ color: accentColor }}>/{p.name}</h3>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm opacity-70 my-2 text-zinc-300 line-clamp-2">{p.desc}</p>
                    <div className="flex gap-4 text-[10px] font-bold uppercase tracking-tighter opacity-60">
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div> 
                        {p.lang}
                      </span>
                      <span>★ {p.stars}</span>
                    </div>
                  </a>
                ))
              )}
            </div>
          </div>

          {/* Activity Graph (SIMULADO) */}
          <div className="pt-4">
            <h2 className="text-[10px] mb-3 uppercase tracking-[0.2em] opacity-40 italic">System_Contribution_Log (Simulated)</h2>
            <div className="flex flex-wrap gap-1">
              {[...Array(56)].map((_, i) => {
                const intensities = ['bg-[#00FF4111]', 'bg-[#00FF4133]', 'bg-[#00FF4166]', 'bg-[#00FF41]'];
                const level = Math.floor(Math.sin(i * 0.5) * 2 + 2); 
                return (
                  <div 
                    key={i} 
                    className={`w-3 h-3 rounded-sm ${intensities[level] || intensities[0]}`}
                    title="Simulated Contribution Data"
                  ></div>
                );
              })}
            </div>
            <p className="text-[9px] mt-2 opacity-30 italic">Nota: Los datos del calendario real requieren API GraphQL o proxy externo.</p>
          </div>

        </div>
      </div>

      {/* Footer actualizado: Solo 2026 y más resaltado */}
      <footer className="mt-16 text-xs uppercase tracking-[0.3em] border-t pt-6 w-full max-w-4xl text-center relative z-10 font-bold shadow-[0_-10px_20px_-10px_rgba(0,255,65,0.1)]" style={{ borderColor: `${accentColor}66`, color: accentColor }}>
        © 2026
      </footer>

      {/* Efecto de Scanline y CRT global */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(0,255,65,0.02),rgba(0,255,65,0.01),rgba(0,255,65,0.02))] bg-[size:100%_3px,2px_100%] z-50"></div>
    </div>
  );
};

export default App;
