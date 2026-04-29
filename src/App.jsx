import { useAge } from './hooks/useAge';
import { useGitHubRepos } from './hooks/useGitHubRepos';
import { useTerminal } from './hooks/useTerminal';
import { Header } from './components/Header';
import { IdentityCard } from './components/IdentityCard';
import { TerminalWindow } from './components/TerminalWindow';
import { ProjectList } from './components/ProjectList';
import { ContributionGraph } from './components/ContributionGraph';
import { Footer } from './components/Footer';
import { CRTOverlay } from './components/CRTOverlay';
import { MatrixBackground } from './components/MatrixBackground';
import { GITHUB_USERNAME, ACCENT_COLOR } from './config';

/**
 * App — El Orquestador.
 *
 * Este componente ya no hace NADA por sí solo.
 * No calcula datos, no hace fetch, no procesa comandos.
 * Solo conecta hooks con componentes — datos con vista.
 *
 * Leé esto como si fuera el índice de un libro:
 * te dice QUÉ existe y CÓMO se conecta, pero el "cómo funciona"
 * está en cada capítulo (hook/componente) por separado.
 */
const App = () => {
  const age = useAge('1996-01-26');
  const { repos: projects, loading } = useGitHubRepos(GITHUB_USERNAME);
  const { history, command, setCommand, handleCommand } = useTerminal({
    age,
    projectCount: projects.length,
  });

  return (
    <div
      className="min-h-screen bg-black font-mono p-4 md:p-8 flex flex-col items-center relative overflow-hidden"
      style={{ color: ACCENT_COLOR }}
    >
      <Header accentColor={ACCENT_COLOR} />

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {/* Sidebar */}
        <IdentityCard age={age} accentColor={ACCENT_COLOR} />

        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          <TerminalWindow
            history={history}
            command={command}
            onCommandChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleCommand}
            accentColor={ACCENT_COLOR}
          />

          <ProjectList projects={projects} loading={loading} accentColor={ACCENT_COLOR} />

          <ContributionGraph />
        </div>
      </div>

      <Footer accentColor={ACCENT_COLOR} />

      <MatrixBackground />
      <CRTOverlay />
    </div>
  );
};

export default App;
