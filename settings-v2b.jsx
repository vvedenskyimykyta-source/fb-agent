// settings-v2b.jsx — FB Agent Settings v2 with new model:
// 6 sections, soft-lock, skip-for-now, Required/Recommended badges, autosave.
// Reuses primitives from settings-v2.jsx (window.SettingsV2Helpers... — accessed via window.* below).

const { Icons } = window;

/* ---------- Sidebar with Settings active ---------- */
function SidebarV2b() {
  const items = [
    { icon: Icons.Grid, label: 'Task Board' },
    { icon: Icons.Box, label: 'Products' },
    { icon: Icons.Doc, label: 'Release Notes' },
    { icon: Icons.Chat, label: 'General Chat' },
    { icon: Icons.Robot, label: 'FB Agent', badge: 'NEW' },
  ];
  const bottom = [
    { icon: Icons.Bulb, label: 'Feature Request' },
    { icon: Icons.Moon, label: 'Dark mode' },
  ];
  return (
    <aside className="af-sidebar">
      <div className="af-logo">
        <span className="af-logo-text">AdFactory</span>
        <span className="af-logo-fb">
          <span className="af-logo-fb-dot">f</span>
          FB
          <Icons.ChevronDown size={10}/>
        </span>
      </div>
      {items.map((it) => (
        <button key={it.label} className="af-nav-item">
          <span className="af-nav-ico"><it.icon size={16}/></span>
          <span style={{ flex: 1 }}>{it.label}</span>
          {it.badge && <span style={{
            fontSize: 9, fontWeight: 700, padding: '2px 5px',
            background: 'var(--af-blue-soft)', color: 'var(--af-blue)',
            borderRadius: 3, letterSpacing: '0.04em',
          }}>{it.badge}</span>}
        </button>
      ))}
      <div className="af-nav-section-label">Admin</div>
      <button className="af-nav-item active">
        <span className="af-nav-ico"><Icons.Sliders size={16}/></span>
        <span>Settings</span>
      </button>
      <div className="af-sidebar-bottom">
        {bottom.map((it) => (
          <button key={it.label} className="af-nav-item">
            <span className="af-nav-ico"><it.icon size={16}/></span>
            <span>{it.label}</span>
          </button>
        ))}
        <button className="af-nav-item">
          <span className="af-nav-ico"><Icons.ChevronRight size={16} style={{ transform: 'rotate(180deg)' }}/></span>
          <span>Collapse</span>
        </button>
      </div>
    </aside>
  );
}

/* ---------- Header ---------- */
function HeaderV2b({ statuses, metaConnected }) {
  // statuses values: 'done' | 'idle' | 'skipped'
  const sectionsOrder = ['meta', 'links', 'deeplinks', 'templates', 'rules', 'notifs'];
  const reqSet = new Set(['meta']); // only Meta is required; rest are recommended
  const total = sectionsOrder.length;
  const done = sectionsOrder.filter((k) => statuses[k] === 'done').length;
  const skipped = sectionsOrder.filter((k) => statuses[k] === 'skipped').length;

  return (
    <header className="s2-header">
      <div>
        <div className="s2-header-crumb">
          <span>Admin</span>
          <Icons.ChevronRight size={11}/>
          <span>FB Agent</span>
          <Icons.ChevronRight size={11}/>
          <span style={{ color: 'var(--af-text)', fontWeight: 600 }}>Settings</span>
        </div>
        <h1 className="s2-header-title">Facebook Agent Settings</h1>
        <p className="s2-header-sub">
          Setup once, the agent handles the rest. Most teams configure all sections in 10–30 minutes.
        </p>
      </div>
      <div className="s2-header-actions">
        <span className="s2-progress-seg">
          <span className="s2-progress-seg-bar">
            {sectionsOrder.map((k) => {
              const st = statuses[k];
              const cls = st === 'done' ? 'done'
                : st === 'skipped' ? 'skip'
                : reqSet.has(k) ? 'todo-req'
                : '';
              return <i key={k} className={cls}/>;
            })}
          </span>
          <span className="s2-progress-seg-text">
            <span><b>{done}</b> of {total} configured</span>
            {skipped > 0 && <><span className="dot"/> <span>{skipped} skipped</span></>}
          </span>
        </span>
        <button className="s2-go-agent" disabled={!metaConnected}>
          Go to FB Agent <Icons.ChevronRight size={13}/>
        </button>
      </div>
    </header>
  );
}

/* ---------- Jump nav (6 items) ---------- */
function JumpNavV2b({ statuses, activeId }) {
  const items = [
    { id: 'meta',      n: 1, label: 'Meta Connection' },
    { id: 'links',     n: 2, label: 'Web Links' },
    { id: 'deeplinks', n: 3, label: 'Deep Links' },
    { id: 'templates', n: 4, label: 'Campaign Templates' },
    { id: 'rules',     n: 5, label: 'Automation Rules' },
    { id: 'notifs',    n: 6, label: 'Notifications' },
  ];
  return (
    <nav className="s2-jumpnav">
      <div className="s2-jumpnav-label">Sections</div>
      {items.map((it) => {
        const st = statuses[it.id];
        const cls = [
          st === 'done' ? 'done' : '',
          activeId === it.id ? 'active' : '',
        ].filter(Boolean).join(' ');
        return (
          <a key={it.id} href={`#${it.id}`} className={cls}>
            <span className="s2-jump-num">
              {st === 'done' ? <Icons.Check size={11}/>
                : st === 'skipped' ? '–'
                : it.n}
            </span>
            <span>{it.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

/* ---------- Section shell with required/recommended/skip ---------- */
function SectionV2b({
  id, n, title, desc, status, required, locked,
  showSkip, onSkip, onUnskip, actions, children, savedFlash,
}) {
  const isSkipped = status === 'skipped';
  const cls = [
    's2-section',
    status === 'done' ? 'done' : '',
    locked ? 'locked' : '',
    isSkipped ? 'skipped' : '',
  ].filter(Boolean).join(' ');

  return (
    <section id={id} className={cls}>
      <div className="s2-section-head">
        <div className="s2-section-num">
          {status === 'done' ? <Icons.Check size={14}/>
            : isSkipped ? <Icons.ChevronRight size={13} style={{ transform: 'rotate(45deg)' }}/>
            : n}
        </div>
        <div>
          <h2 className="s2-section-title">
            {title}
            {required
              ? <span className="s2-req-badge required">Required</span>
              : <span className="s2-req-badge recommended">Recommended</span>}
            {status === 'done' && <span className="s2-status-pill done">Configured</span>}
            {status === 'idle' && required && !locked && <span className="s2-status-pill required-todo">Action needed</span>}
            {status === 'idle' && !required && !locked && <span className="s2-status-pill idle">Not configured</span>}
            {isSkipped && <span className="s2-status-pill skipped">Skipped, can configure later</span>}
            {locked && <span className="s2-status-pill idle"><Icons.Info size={11}/> Locked</span>}
            {savedFlash && <span className="s2-saved-flash"><Icons.Check size={10}/> Saved</span>}
          </h2>
          <p className="s2-section-desc">{desc}</p>
        </div>
        <div className="s2-section-actions">
          {actions}
          {showSkip && !isSkipped && status !== 'done' && (
            <button className="s2-skip-btn" onClick={onSkip}>Skip for now</button>
          )}
          {isSkipped && (
            <button className="af-btn sm" onClick={onUnskip}>Configure now</button>
          )}
        </div>
      </div>
      {!isSkipped && <div className="s2-section-content">{children}</div>}
    </section>
  );
}

/* ---------- Tailored locked notes ---------- */
function TailoredLock({ icon, text }) {
  return (
    <div className="s2-locked-note tailored">
      <span className="s2-locked-note-icon">{icon}</span>
      <div>
        <div style={{ fontWeight: 600, color: 'var(--af-text)' }}>Needs Meta Connection</div>
        <div style={{ color: 'var(--af-text-2)', marginTop: 2 }}>{text}</div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */
function SettingsV2bPage({ scenario, openBM, initialModal, focusSection }) {
  const fresh = scenario === 'fresh';
  const skippedDemo = scenario === 'skipped-demo';

  const initialStatuses = (() => {
    if (fresh) return { meta: 'idle', links: 'idle', deeplinks: 'idle', templates: 'idle', rules: 'idle', notifs: 'idle' };
    if (skippedDemo) return { meta: 'done', links: 'done', deeplinks: 'done', templates: 'done', rules: 'done', notifs: 'skipped' };
    return { meta: 'done', links: 'done', deeplinks: 'done', templates: 'done', rules: 'done', notifs: 'done' };
  })();

  const [statuses, setStatuses] = React.useState(initialStatuses);
  const [modal, setModal] = React.useState(initialModal || null);
  const [savedFlashId, setSavedFlashId] = React.useState(null);

  const metaConnected = statuses.meta === 'done';
  const skip = (id) => setStatuses((s) => ({ ...s, [id]: 'skipped' }));
  const unskip = (id) => setStatuses((s) => ({ ...s, [id]: 'idle' }));
  const flash = (id) => {
    setSavedFlashId(id);
    setTimeout(() => setSavedFlashId(null), 1400);
  };

  return (
    <div className="s2-app">
      <SidebarV2b/>
      <div className="s2-main">
        <HeaderV2b statuses={statuses} metaConnected={metaConnected}/>
        <div className="s2-body">
          <JumpNavV2b statuses={statuses} activeId={focusSection || 'meta'}/>
          <div className="s2-content">

            {/* 1 · Meta — REQUIRED, never skippable */}
            <SectionV2b
              id="meta" n={1}
              title="Meta Business Manager"
              desc="Connect Facebook so the agent can read your ad accounts, Pages, Pixels and Apps."
              required={true}
              status={statuses.meta}
            >
              {metaConnected
                ? <window.MetaSectionConnected openBM={openBM}/>
                : <window.MetaSectionFresh/>}
            </SectionV2b>

            {/* 2 · Web Links — never locked */}
            <SectionV2b
              id="links" n={2}
              title="Web links"
              desc="Saved destination URLs for web campaigns. Skip retyping the URL every launch."
              required={false}
              status={statuses.links}
              showSkip={true}
              onSkip={() => skip('links')}
              onUnskip={() => unskip('links')}
              actions={statuses.links !== 'skipped' && (
                <button className="af-btn sm primary"><Icons.Plus size={12}/> Add link</button>
              )}
            >
              <window.LinksSection filled={statuses.links === 'done'}/>
            </SectionV2b>

            {/* 3 · Deep Links — NEW, never locked */}
            <SectionV2b
              id="deeplinks" n={3}
              title="Deep links"
              desc="Saved deep links for App campaigns. Open specific screens inside your app instead of just launching it."
              required={false}
              status={statuses.deeplinks}
              showSkip={true}
              onSkip={() => skip('deeplinks')}
              onUnskip={() => unskip('deeplinks')}
              actions={statuses.deeplinks !== 'skipped' && (
                <button className="af-btn sm primary" onClick={() => setModal('deeplink')}>
                  <Icons.Plus size={12}/> Add deep link
                </button>
              )}
            >
              <window.DeepLinksSection
                filled={statuses.deeplinks === 'done'}
                hasApps={metaConnected}
                onAdd={() => setModal('deeplink')}
              />
            </SectionV2b>

            {/* 4 · Templates — locked w/ tailored copy until Meta */}
            <SectionV2b
              id="templates" n={4}
              title="Campaign templates"
              desc="Pre-filled launch presets: budget, geo, audience, placements, conversion event."
              required={false}
              status={statuses.templates}
              locked={!metaConnected}
              showSkip={metaConnected}
              onSkip={() => skip('templates')}
              onUnskip={() => unskip('templates')}
              actions={metaConnected && statuses.templates !== 'skipped' && (
                <button className="af-btn sm primary" onClick={() => setModal('template')}>
                  <Icons.Plus size={12}/> New template
                </button>
              )}
            >
              {!metaConnected ? (
                <TailoredLock
                  icon={<Icons.Layers size={14}/>}
                  text="Templates use ad accounts and pixels from your Business Manager — connect Meta first."
                />
              ) : (
                <window.TemplatesSection filled={statuses.templates === 'done'} onNew={() => setModal('template')}/>
              )}
            </SectionV2b>

            {/* 5 · Rules — locked until Meta + needs ad account */}
            <SectionV2b
              id="rules" n={5}
              title="Automation rules"
              desc="Run in the background on every active campaign. Pause, start or change budget when conditions match."
              required={false}
              status={statuses.rules}
              locked={!metaConnected}
              showSkip={metaConnected}
              onSkip={() => skip('rules')}
              onUnskip={() => unskip('rules')}
              actions={metaConnected && statuses.rules !== 'skipped' && (
                <>
                  <button className="af-btn sm">
                    <Icons.Bolt size={12}/> Browse strategies <Icons.ChevronDown size={11}/>
                  </button>
                  <button className="af-btn sm primary" onClick={() => setModal('rule')}>
                    <Icons.Plus size={12}/> Create rule
                  </button>
                </>
              )}
            >
              {!metaConnected ? (
                <TailoredLock
                  icon={<Icons.Bolt size={14}/>}
                  text="Rules need at least one active ad account from Meta to evaluate against."
                />
              ) : (
                <window.RulesTable onCreate={() => setModal('rule')}/>
              )}
            </SectionV2b>

            {/* 6 · Notifications — locked until Meta */}
            <SectionV2b
              id="notifs" n={6}
              title="Notifications"
              desc="Where the agent should send updates about campaign launches and triggered rules."
              required={false}
              status={statuses.notifs}
              locked={!metaConnected}
              showSkip={metaConnected}
              onSkip={() => skip('notifs')}
              onUnskip={() => unskip('notifs')}
              savedFlash={savedFlashId === 'notifs'}
            >
              {!metaConnected ? (
                <TailoredLock
                  icon={<Icons.Send size={14}/>}
                  text="The agent needs a connected workspace to know what to monitor and notify you about."
                />
              ) : (
                <window.NotificationsSection filled={statuses.notifs === 'done'}/>
              )}
            </SectionV2b>

          </div>
        </div>
      </div>

      {modal === 'template'  && <window.NewTemplateModal onClose={() => setModal(null)}/>}
      {modal === 'rule'      && <window.CreateRuleModal onClose={() => setModal(null)}/>}
      {modal === 'deeplink'  && <window.AddDeepLinkModal onClose={() => setModal(null)}/>}
    </div>
  );
}

window.SettingsV2bPage = SettingsV2bPage;
