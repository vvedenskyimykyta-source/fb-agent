// Chat.jsx — left chat column (history, chips, composer)
const { Icons } = window;

function Chat({ messages, chips, onSendChip, onSend, processing }) {
  const streamRef = React.useRef(null);
  const [draft, setDraft] = React.useState('');
  React.useEffect(() => {
    if (streamRef.current) streamRef.current.scrollTop = streamRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="af-chat">
      <div className="af-chat-header">
        <div className="af-chat-title">
          <span className="af-chat-title-icon"><Icons.Sparkle size={13}/></span>
          FB Agent
          <span className="af-tag blue" style={{ marginLeft: 4 }}>Sonnet 4.5</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button className="af-icon-btn" title="Новая сессия"><Icons.Plus size={14}/></button>
          <button className="af-icon-btn" title="Очистить"><Icons.Refresh size={14}/></button>
        </div>
      </div>

      <div className="af-chat-stream" ref={streamRef}>
        {messages.map((m, i) => <ChatMessage key={i} m={m}/>)}
        {processing && (
          <div className="af-msg agent tool" style={{ alignSelf: 'flex-start' }}>
            <span className="af-tool-ico">
              <Icons.Sparkle size={11}/>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {processing}
              <span className="af-mini-bars">
                <span style={{ height: 5, animation: 'af-fade 1s 0s infinite' }}/>
                <span style={{ height: 8, animation: 'af-fade 1s 0.2s infinite' }}/>
                <span style={{ height: 4, animation: 'af-fade 1s 0.4s infinite' }}/>
                <span style={{ height: 7, animation: 'af-fade 1s 0.6s infinite' }}/>
              </span>
            </span>
          </div>
        )}
      </div>

      <div className="af-chips">
        {chips.map((c, i) => {
          if (c.type === 'group') {
            return (
              <div key={i} className="af-chip-group">
                {c.options.map((o, j) => (
                  <button
                    key={j}
                    className={`af-chip-seg ${o.active ? 'active' : ''}`}
                    onClick={() => onSendChip(c, o)}
                  >{o.label}</button>
                ))}
              </div>
            );
          }
          return (
            <button
              key={i}
              className={`af-chip ${c.active ? 'active' : ''}`}
              onClick={() => onSendChip(c)}
            >
              {c.icon && <c.icon size={12}/>}
              {c.label}
              {c.caret && <Icons.ChevronDown size={10}/>}
            </button>
          );
        })}
      </div>

      <div className="af-composer">
        <div className="af-composer-box">
          <textarea
            placeholder="Опиши задачу или используй чипы выше…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (draft.trim()) { onSend(draft); setDraft(''); }
              }
            }}
          />
          <div className="af-composer-actions">
            <button className="af-icon-btn" title="Прикрепить"><Icons.Image size={15}/></button>
            <button className="af-icon-btn" title="Шаблоны"><Icons.Save size={15}/></button>
            <button
              className="af-icon-btn send"
              disabled={!draft.trim()}
              onClick={() => { if (draft.trim()) { onSend(draft); setDraft(''); } }}
            >
              <Icons.Send size={14}/>
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span className="af-helper-text">⏎ — отправить · ⇧⏎ — новая строка</span>
          <span className="af-helper-text">Подключено: <strong style={{ color: 'var(--af-text-2)' }}>Talefy Creo Test</strong></span>
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ m }) {
  if (m.role === 'user') {
    return <div className="af-msg user">{m.text}</div>;
  }
  if (m.kind === 'tool') {
    return (
      <div className={`af-msg agent tool ${m.success ? 'success' : ''}`}>
        <span className="af-tool-ico">
          {m.success ? <Icons.Check size={11}/> : <Icons.Sparkle size={11}/>}
        </span>
        <span>{m.text}</span>
        {m.meta && <span style={{ marginLeft: 'auto', fontSize: 10.5, color: 'var(--af-text-muted)' }}>{m.meta}</span>}
      </div>
    );
  }
  if (m.kind === 'reference') {
    return (
      <div className="af-msg agent" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--af-border)', background: 'var(--af-bg-soft)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icons.Pin size={13}/>
          <span style={{ fontSize: 11.5, fontWeight: 600 }}>Референсный адсет</span>
          <span className="af-tag gray" style={{ marginLeft: 'auto' }}>Talefy Creo Test</span>
        </div>
        <div style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--af-text-2)' }}>
          {m.name}
        </div>
      </div>
    );
  }
  if (m.kind === 'card') {
    return (
      <div className="af-msg agent">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <Icons.Sparkle size={12} style={{ color: 'var(--af-blue)' }}/>
          <strong>{m.title}</strong>
        </div>
        <div style={{ color: 'var(--af-text-2)' }}>{m.text}</div>
        {m.actions && (
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            {m.actions.map((a, i) => (
              <button key={i} className="af-btn sm">{a}</button>
            ))}
          </div>
        )}
      </div>
    );
  }
  return <div className="af-msg agent">{m.text}</div>;
}

window.Chat = Chat;
