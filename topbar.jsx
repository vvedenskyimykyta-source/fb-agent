// TopBar.jsx — title, agent status, launch button, balance, avatar
const { Icons } = window;

function StatusPill({ status }) {
  // status: { phase: 'idle'|'drafting'|'ready'|'launching'|'launched', step, total, label }
  if (!status || status.phase === 'idle') {
    return (
      <span className="af-status is-idle">
        <span className="af-status-dot"/>
        <span className="af-status-text">Агент готов · ожидает запроса</span>
      </span>
    );
  }
  if (status.phase === 'launched') {
    return (
      <span className="af-status is-success is-active">
        <span className="af-status-dot"/>
        <Icons.CheckCircle size={13}/>
        <span className="af-status-text"><strong>{status.label}</strong></span>
      </span>
    );
  }
  return (
    <span className="af-status is-active">
      <span className="af-status-dot"/>
      <span className="af-status-step">Шаг {status.step} из {status.total}</span>
      <span className="af-status-text">· {status.label}</span>
      <span className="af-status-progress">
        {Array.from({ length: status.total }).map((_, i) => (
          <span key={i} className={`af-status-tick ${i < status.step - 1 ? 'done' : i === status.step - 1 ? 'active' : ''}`}/>
        ))}
      </span>
    </span>
  );
}

function TopBar({ status, sessionName, canLaunch, onLaunch, launched, onReset }) {
  return (
    <header className="af-topbar">
      <div className="af-topbar-left">
        <div className="af-breadcrumb">
          <Icons.Robot size={15}/>
          <span>FB Agent</span>
          <Icons.ChevronRight size={12}/>
          <strong>{sessionName}</strong>
        </div>
        <StatusPill status={status}/>
      </div>
      <div className="af-topbar-right">
        <button className="af-btn ghost sm">
          <Icons.History size={14}/> История
        </button>
        <button className="af-btn ghost sm" onClick={onReset} title="Сбросить демо">
          <Icons.Refresh size={14}/>
        </button>
        {launched ? (
          <button className="af-btn success">
            <Icons.CheckCircle size={14}/> Запущено
          </button>
        ) : (
          <button
            className="af-btn primary"
            disabled={!canLaunch}
            onClick={onLaunch}
          >
            <Icons.Bolt size={14}/> Запустить
          </button>
        )}
        <div style={{ width: 1, height: 22, background: 'var(--af-border)', margin: '0 4px' }}/>
        <span className="af-balance">
          <Icons.Coin size={13}/> $50.00 left
        </span>
        <div className="af-avatar">
          K
          <span className="af-avatar-badge">5</span>
        </div>
      </div>
    </header>
  );
}

window.TopBar = TopBar;
