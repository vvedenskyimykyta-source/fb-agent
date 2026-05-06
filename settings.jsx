// Settings.jsx — Facebook Agent settings page (5 sections + states)
const { Icons, Sidebar } = window;

// ───── Shared bits ─────
function StatusBadge({ kind = 'gray', children, dot }) {
  return (
    <span className={`af-status-badge ${kind}`}>
      {dot && <span className="dot"/>}
      {children}
    </span>
  );
}

function SectionShell({ num, title, sub, status, children, state = 'idle', right }) {
  // state: 'idle' | 'active' | 'complete' | 'disabled'
  return (
    <section className={`af-set-section ${state === 'disabled' ? 'disabled' : ''} ${state === 'complete' ? 'complete' : ''} ${state === 'active' ? 'active' : ''}`}>
      <div className="af-set-section-head">
        <span className="af-set-step-num">{state === 'complete' ? <Icons.Check size={14}/> : num}</span>
        <div className="af-set-section-titles">
          <h3 className="af-set-section-title">{title}</h3>
          {sub && <p className="af-set-section-sub">{sub}</p>}
        </div>
        <div className="af-set-section-status">
          {status}
          {right}
        </div>
      </div>
      <div className="af-set-section-body">{children}</div>
    </section>
  );
}

// Locked stub for sections gated behind earlier setup steps
function DisabledStub({ num, title, sub }) {
  return (
    <section className="af-set-section disabled" style={{ pointerEvents: 'none' }}>
      <div className="af-set-section-head" style={{ borderBottom: 'none', paddingBottom: 18 }}>
        <span className="af-set-step-num">{num}</span>
        <div className="af-set-section-titles">
          <h3 className="af-set-section-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {title}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--af-text-muted)' }}>
              <rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
            </svg>
          </h3>
          <p className="af-set-section-sub">{sub}</p>
        </div>
        <span className="af-status-badge gray" style={{ alignSelf: 'center' }}>Complete previous step</span>
      </div>
    </section>
  );
}

// ───── Section 1: Meta Business Account ─────
function Section1({ connected, accounts }) {
  if (!connected) {
    return (
      <SectionShell num={1} title="Connect your Meta Business Account"
        sub="Authorize AdFactory to manage campaigns on your behalf. We use OAuth — your Meta password is never stored."
        status={<StatusBadge dot kind="gray">Not connected</StatusBadge>}
        state="active">
        <div className="af-connect-cta">
          <span className="af-meta-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.5 2 2 6.5 2 12c0 5 3.7 9.1 8.4 9.9V14.9H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3V22c4.7-.7 8.4-4.9 8.4-9.9C22 6.5 17.5 2 12 2z" fill="white"/>
            </svg>
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>Meta Business Suite</div>
            <div style={{ fontSize: 12, color: 'var(--af-text-3)', marginTop: 2 }}>
              Sign in with Facebook · grant <code>ads_management</code>, <code>business_management</code>, <code>read_insights</code>
            </div>
          </div>
          <button className="af-btn primary lg">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 5 3.7 9.1 8.4 9.9V14.9H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3V22c4.7-.7 8.4-4.9 8.4-9.9C22 6.5 17.5 2 12 2z"/></svg>
            Connect Meta Business
          </button>
        </div>
        <div style={{ marginTop: 14, padding: 12, background: 'var(--af-blue-soft)', border: '1px solid #dbeafe', borderRadius: 8, display: 'flex', gap: 10 }}>
          <Icons.Info size={14} style={{ color: 'var(--af-blue)', marginTop: 2 }}/>
          <div style={{ fontSize: 12, color: '#1e40af', lineHeight: 1.5 }}>
            <strong>Why we need this:</strong> the agent reads your campaigns/adsets, creates new ones, syncs creatives, and toggles them on. You stay in control — every change is logged and reversible.
          </div>
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell num={1} title="Meta Business Account"
      sub="Talefy LLC · 6 ad accounts available · 2 connected to AdFactory"
      status={<StatusBadge dot kind="green">Connected</StatusBadge>}
      state="complete"
      right={<button className="af-btn sm ghost"><Icons.Refresh size={12}/> Refresh</button>}
    >
      <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="af-helper-text">Toggle which ad accounts the agent can use. Up to 10 per workspace.</span>
        <button className="af-btn sm"><Icons.Plus size={12}/> Add account</button>
      </div>
      {accounts.map((a) => (
        <div key={a.id} className="af-acct">
          <div className="af-acct-logo" style={{ background: a.color }}>{a.initials}</div>
          <div style={{ minWidth: 0 }}>
            <div className="af-acct-name">{a.name}</div>
            <div className="af-acct-meta">
              <span>{a.id}</span>
              <span className="sep">·</span>
              <span>{a.currency}</span>
              <span className="sep">·</span>
              <span>{a.tz}</span>
            </div>
          </div>
          <StatusBadge dot kind={a.status === 'Active' ? 'green' : a.status === 'Limited' ? 'amber' : 'gray'}>{a.status}</StatusBadge>
          <span style={{ fontSize: 11.5, color: 'var(--af-text-3)' }}>Spend: <strong style={{ color: 'var(--af-text)' }}>{a.spend}</strong></span>
          <span className={`af-toggle ${a.on ? 'on' : ''}`}/>
        </div>
      ))}
      <div style={{ marginTop: 12, fontSize: 11.5, color: 'var(--af-text-3)' }}>
        You can connect up to 15 business accounts or personal profiles per platform.
      </div>
    </SectionShell>
  );
}

// ───── Section 2: Pixel & events ─────
function Section2({ active = true, complete = false, disabled = false }) {
  if (disabled) return <DisabledStub num={2} title="Pixel & Conversion Events" sub="Choose which pixel the agent uses by default and which events to optimize for."/>;
  const [selected, setSelected] = React.useState('px_2611');
  const [events, setEvents] = React.useState({ Subscribe: true, Purchase: true, Lead: true, ViewContent: false, AddToCart: false, CompleteRegistration: false, InitiateCheckout: true });
  const [attr, setAttr] = React.useState('7d_1d');

  const pixels = [
    { id: 'px_2611', name: 'CheckMyMeal Pixel', code: '2611674264135259', status: 'Receiving events', last: '2 min ago', kind: 'green' },
    { id: 'px_8821', name: 'Talefy Web Pixel', code: '8821334559002115', status: 'Receiving events', last: '14 min ago', kind: 'green' },
    { id: 'px_4490', name: 'Quiz Funnel Test', code: '4490112266887301', status: 'No events in 7d', last: '8 days ago', kind: 'amber' },
  ];

  return (
    <SectionShell num={2} title="Pixel & Conversion Events"
      sub="Choose which pixel the agent uses by default and which events to optimize for."
      status={complete ? <StatusBadge dot kind="green">Configured</StatusBadge> : <StatusBadge dot kind="gray">Setup needed</StatusBadge>}
      state={complete ? 'complete' : (active ? 'active' : 'idle')}
    >
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--af-text-2)', marginBottom: 8 }}>Default pixel</div>
      <div className="af-pixel-list">
        {pixels.map(p => (
          <div key={p.id} className={`af-pixel ${selected === p.id ? 'selected' : ''}`} onClick={() => setSelected(p.id)}>
            <span className="af-pixel-radio"/>
            <div>
              <div className="af-pixel-name">{p.name}</div>
              <div className="af-pixel-id">{p.code}</div>
            </div>
            <StatusBadge dot kind={p.kind}>{p.status}</StatusBadge>
            <span style={{ fontSize: 11, color: 'var(--af-text-3)' }}>Last: {p.last}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 18, fontSize: 12, fontWeight: 600, color: 'var(--af-text-2)', marginBottom: 4 }}>
        Standard conversion events <span style={{ fontWeight: 400, color: 'var(--af-text-3)' }}>· tick the ones you want the agent to optimize for</span>
      </div>
      <div className="af-events-grid">
        {Object.entries({ Subscribe: 'Subscribe', Purchase: 'Purchase', AddToCart: 'Add to Cart', Lead: 'Lead', CompleteRegistration: 'Complete Registration', ViewContent: 'View Content', InitiateCheckout: 'Initiate Checkout' }).map(([k, label]) => (
          <div key={k} className={`af-event ${events[k] ? 'checked' : ''}`} onClick={() => setEvents(e => ({ ...e, [k]: !e[k] }))}>
            <span className="af-event-check">{events[k] && <Icons.Check size={10}/>}</span>
            {label}
          </div>
        ))}
        <button className="af-event" style={{ borderStyle: 'dashed', justifyContent: 'center', color: 'var(--af-text-3)' }}>
          <Icons.Plus size={12}/> Custom conversion
        </button>
      </div>

      <div style={{ marginTop: 18, fontSize: 12, fontWeight: 600, color: 'var(--af-text-2)' }}>Attribution window</div>
      <div className="af-radio-row">
        {[
          { id: '1d', label: '1d click' },
          { id: '7d', label: '7d click' },
          { id: '7d_1d', label: '7d click + 1d view', def: true },
          { id: '28d_1d', label: '28d click + 1d view' },
        ].map(o => (
          <button key={o.id} className={`af-radio-pill ${attr === o.id ? 'active' : ''}`} onClick={() => setAttr(o.id)}>
            <span className="dot"/>
            {o.label}
            {o.def && <span style={{ fontSize: 9.5, color: 'var(--af-text-3)', fontWeight: 600, letterSpacing: '0.04em' }}>DEFAULT</span>}
          </button>
        ))}
      </div>
    </SectionShell>
  );
}

// ───── Section 3: Deep links ─────
function DeeplinkField({ label, req, value, mono, hint }) {
  return (
    <div className="af-field-stack">
      <label>
        <span>{label} {req && <span className="req">*</span>}</span>
        {hint && <span style={{ fontSize: 10.5, color: 'var(--af-text-muted)', fontWeight: 400 }}>{hint}</span>}
      </label>
      <input className={`af-input ${mono ? 'mono' : ''}`} defaultValue={value}/>
    </div>
  );
}

function Section3({ active = true, complete = false, hasApp = true, disabled = false }) {
  if (disabled) return <DisabledStub num={3} title="Mobile App Deep Links" sub="Skip if your business is web-only. Required for App Install and App Engagement campaigns."/>;
  const [enabled, setEnabled] = React.useState(hasApp);
  const [thirdParty, setThirdParty] = React.useState(false);

  return (
    <SectionShell num={3} title="Mobile App Deep Links"
      sub="Skip if your business is web-only. Required for App Install and App Engagement campaigns."
      status={complete ? <StatusBadge dot kind="green">Configured</StatusBadge> : enabled ? <StatusBadge dot kind="amber">Action needed</StatusBadge> : <StatusBadge dot kind="gray">Skipped</StatusBadge>}
      state={complete ? 'complete' : (active ? 'active' : 'idle')}
      right={!complete && <button className="af-skip-link">Skip for now</button>}
    >
      <label className="af-checkbox" style={{ fontSize: 13, fontWeight: 500 }}>
        <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)}/>
        I have a mobile app (enable deep linking setup)
      </label>

      {enabled && !thirdParty && (
        <div className="af-deeplink-cols">
          {/* iOS */}
          <div className="af-deeplink-col">
            <div className="af-deeplink-col-head">
              <div className="af-deeplink-col-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 12.5c0-2.6 2.13-3.86 2.23-3.92-1.22-1.78-3.11-2.02-3.79-2.05-1.61-.16-3.15.95-3.97.95-.83 0-2.09-.93-3.44-.9-1.77.03-3.4 1.03-4.31 2.6-1.84 3.19-.47 7.92 1.32 10.51.87 1.27 1.91 2.69 3.27 2.64 1.32-.05 1.81-.85 3.4-.85s2.04.85 3.43.82c1.42-.02 2.31-1.28 3.18-2.56 1-1.46 1.41-2.88 1.43-2.95-.03-.01-2.74-1.05-2.77-4.16M14.45 4.97c.72-.88 1.21-2.1 1.07-3.31-1.04.04-2.31.69-3.06 1.56-.66.78-1.25 2.02-1.09 3.21 1.16.09 2.36-.59 3.08-1.46"/></svg>
                iOS
              </div>
              <StatusBadge dot kind="amber">SDK: Not detected</StatusBadge>
            </div>
            <div className="af-deeplink-fields">
              <DeeplinkField label="App Store ID" req value="6443234567" mono/>
              <DeeplinkField label="Bundle ID" req value="com.checkmymeal.app" mono/>
              <DeeplinkField label="URL Scheme" value="checkmymeal://" mono hint="e.g. myapp://"/>
              <DeeplinkField label="Universal Link Domain" value="go.checkmymeal.ai" mono hint="recommended"/>
              <DeeplinkField label="Default landing path" value="/funnel/checkmymeal" mono/>
              <label className="af-checkbox"><input type="checkbox" defaultChecked/> Enable deferred deep linking</label>
              <button className="af-btn sm" style={{ alignSelf: 'flex-start' }}>
                <Icons.CheckCircle size={12}/> Verify SDK integration
              </button>
            </div>
          </div>
          {/* Android */}
          <div className="af-deeplink-col">
            <div className="af-deeplink-col-head">
              <div className="af-deeplink-col-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 00-.83.22l-1.88 3.24a11.43 11.43 0 00-8.94 0L5.65 5.67a.643.643 0 00-.87-.2c-.28.18-.37.54-.22.83L6.4 9.48A10.78 10.78 0 001 18h22a10.78 10.78 0 00-5.4-8.52M7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5m10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5"/></svg>
                Android
              </div>
              <StatusBadge dot kind="green">SDK: Connected</StatusBadge>
            </div>
            <div className="af-deeplink-fields">
              <DeeplinkField label="Package Name" req value="com.checkmymeal.app" mono/>
              <DeeplinkField label="URL Scheme" value="checkmymeal://" mono/>
              <DeeplinkField label="App Links Domain" value="go.checkmymeal.ai" mono hint="same as iOS Universal Link"/>
              <DeeplinkField label="Activity Class Name" value="com.checkmymeal.app.MainActivity" mono/>
              <DeeplinkField label="Default landing path" value="/funnel/checkmymeal" mono/>
              <label className="af-checkbox"><input type="checkbox" defaultChecked/> Enable deferred deep linking</label>
              <button className="af-btn sm" style={{ alignSelf: 'flex-start' }}>
                <Icons.CheckCircle size={12}/> Verify SDK integration
              </button>
            </div>
          </div>
        </div>
      )}

      {enabled && (
        <div style={{ marginTop: 16, padding: 14, border: '1px solid var(--af-border)', borderRadius: 8, background: 'var(--af-bg-soft)' }}>
          <label className="af-checkbox" style={{ fontSize: 12.5, fontWeight: 500 }}>
            <input type="checkbox" checked={thirdParty} onChange={(e) => setThirdParty(e.target.checked)}/>
            Use a third-party deep link provider <span style={{ color: 'var(--af-text-3)', fontWeight: 400 }}>(Branch, Adjust, URLgenius)</span>
          </label>
          {thirdParty && (
            <div style={{ marginTop: 10 }}>
              <DeeplinkField label="Universal link" req value="https://checkmymeal.adj.st/funnel/quiz" mono hint="we'll route Meta clicks through this URL"/>
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <button className={`af-radio-pill active`}><span className="dot"/> Adjust</button>
                <button className="af-radio-pill"><span className="dot"/> Branch</button>
                <button className="af-radio-pill"><span className="dot"/> URLgenius</button>
                <button className="af-radio-pill"><span className="dot"/> Other</button>
              </div>
            </div>
          )}
        </div>
      )}
    </SectionShell>
  );
}

// ───── Section 4: Workspaces ─────
function Section4({ active = true, complete = false, onAdd, disabled = false }) {
  if (disabled) return <DisabledStub num={4} title="Workspaces" sub="Each workspace is a separate environment for a brand, client, or product."/>;
  const workspaces = [
    { name: 'Talefy · Quiz 3 · 21+ Sub', sub: 'CheckMyMeal Quiz funnel · US/CA', acct: 'Talefy Creo Test', pixel: 'CheckMyMeal Pixel', web: true, ios: true, android: true, members: 4, color: '#6366f1' },
    { name: 'Talefy · App Install · iOS', sub: 'CheckMyMeal app onboarding', acct: 'Talefy Creo Test', pixel: 'CheckMyMeal Pixel', web: false, ios: true, android: false, members: 3, color: '#10b981' },
    { name: 'Talefy · EU Expansion', sub: 'DACH + UK · Quiz 4', acct: 'Talefy EU LTD', pixel: 'Talefy Web Pixel', web: true, ios: false, android: false, members: 2, color: '#f59e0b' },
  ];

  return (
    <SectionShell num={4} title="Workspaces"
      sub="Each workspace is a separate environment for a brand, client, or product. The selector in the FB Agent topbar pulls from this list."
      status={complete ? <StatusBadge dot kind="green">{workspaces.length} active</StatusBadge> : <StatusBadge dot kind="gray">No workspaces</StatusBadge>}
      state={complete ? 'complete' : (active ? 'active' : 'idle')}
      right={<button className="af-btn sm primary" onClick={onAdd}><Icons.Plus size={12}/> New Workspace</button>}
    >
      <table className="af-table">
        <thead>
          <tr>
            <th>Workspace</th>
            <th>Ad Account</th>
            <th>Pixel</th>
            <th>Platforms</th>
            <th>Members</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {workspaces.map(w => (
            <tr key={w.name}>
              <td>
                <div className="af-member-row">
                  <span className="af-member-avatar" style={{ background: w.color, borderRadius: 6, width: 26, height: 26 }}>
                    <Icons.Layers size={13}/>
                  </span>
                  <div>
                    <div className="ws-name">{w.name}</div>
                    <div className="ws-sub">{w.sub}</div>
                  </div>
                </div>
              </td>
              <td><span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{w.acct}</span></td>
              <td><span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{w.pixel}</span></td>
              <td>
                <div style={{ display: 'flex', gap: 4 }}>
                  {w.web && <span className="af-status-badge gray"><Icons.Globe size={10}/> Web</span>}
                  {w.ios && <span className="af-status-badge gray">iOS</span>}
                  {w.android && <span className="af-status-badge gray">Android</span>}
                </div>
              </td>
              <td><span style={{ fontWeight: 600 }}>{w.members}</span></td>
              <td style={{ textAlign: 'right' }}>
                <button className="af-btn sm ghost"><Icons.Edit size={12}/></button>
                <button className="af-btn sm ghost"><Icons.Dots size={12}/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionShell>
  );
}

// ───── Section 5: Team ─────
function Section5({ active = true, complete = false, onInvite, disabled = false }) {
  if (disabled) return <DisabledStub num={5} title="Team & Permissions" sub="Three roles: Admin, User, Client. Invite teammates and clients here."/>;
  const members = [
    { name: 'Kostia Zhushman', email: 'kostia@talefy.io', role: 'Admin', ws: 'All workspaces', invited: 'Mar 12, 2026', status: 'Active', color: '#6366f1' },
    { name: 'Misha Pavlov', email: 'misha@talefy.io', role: 'Admin', ws: 'All workspaces', invited: 'Mar 14, 2026', status: 'Active', color: '#ec4899' },
    { name: 'Anna Velichko', email: 'anna@talefy.io', role: 'User', ws: 'Quiz 3 · 21+ Sub, EU Expansion', invited: 'Apr 02, 2026', status: 'Active', color: '#10b981' },
    { name: 'Daniel R.', email: 'daniel@talefy.io', role: 'User', ws: 'App Install · iOS', invited: 'Apr 18, 2026', status: 'Active', color: '#f59e0b' },
    { name: 'Marketing Lead', email: 'lead@checkmymeal.com', role: 'Client', ws: '—', invited: 'Apr 22, 2026', status: 'Pending invite', color: '#9ca3af' },
  ];

  return (
    <SectionShell num={5} title="Team & Permissions"
      sub="Three roles: Admin (full access), User (assigned workspaces), Client (email reports only, no platform access)."
      status={complete ? <StatusBadge dot kind="green">{members.filter(m => m.status === 'Active').length} active · 1 pending</StatusBadge> : <StatusBadge dot kind="gray">Just you</StatusBadge>}
      state={complete ? 'complete' : (active ? 'active' : 'idle')}
      right={<button className="af-btn sm primary" onClick={onInvite}><Icons.Plus size={12}/> Invite Member</button>}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 14 }}>
        {[
          { label: 'Admin', icon: Icons.Bolt, color: '#7c3aed', bg: '#f5f3ff', desc: 'Full access · billing · integrations · team' },
          { label: 'User', icon: Icons.Users, color: '#2563eb', bg: '#eff6ff', desc: 'Assigned workspaces only · no billing/integrations' },
          { label: 'Client', icon: Icons.Eye, color: '#6b7280', bg: '#f3f4f6', desc: 'Email reports only · no platform access' },
        ].map(r => (
          <div key={r.label} style={{ padding: 12, border: '1px solid var(--af-border)', borderRadius: 8, background: 'var(--af-bg)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ width: 28, height: 28, borderRadius: 7, background: r.bg, color: r.color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <r.icon size={14}/>
            </span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 12.5 }}>{r.label}</div>
              <div style={{ fontSize: 11, color: 'var(--af-text-3)', marginTop: 2, lineHeight: 1.4 }}>{r.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <table className="af-table">
        <thead>
          <tr>
            <th>Member</th>
            <th>Role</th>
            <th>Workspaces</th>
            <th>Invited</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {members.map(m => (
            <tr key={m.email}>
              <td>
                <div className="af-member-row">
                  <span className="af-member-avatar" style={{ background: m.color }}>{m.name.split(' ').map(s => s[0]).join('').slice(0,2)}</span>
                  <div>
                    <div className="ws-name">{m.name}</div>
                    <div className="ws-sub">{m.email}</div>
                  </div>
                </div>
              </td>
              <td>
                <span className={`af-tag ${m.role === 'Admin' ? 'blue' : m.role === 'User' ? 'gray' : 'gray'}`}>{m.role}</span>
              </td>
              <td><span style={{ fontSize: 11.5, color: 'var(--af-text-2)' }}>{m.ws}</span></td>
              <td><span style={{ fontSize: 11.5, color: 'var(--af-text-3)' }}>{m.invited}</span></td>
              <td>
                <StatusBadge dot kind={m.status === 'Active' ? 'green' : 'amber'}>{m.status}</StatusBadge>
              </td>
              <td style={{ textAlign: 'right' }}>
                {m.status === 'Pending invite'
                  ? <button className="af-btn sm">Resend</button>
                  : <button className="af-btn sm ghost"><Icons.Dots size={12}/></button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionShell>
  );
}

// ───── Coming soon strip ─────
function ComingSoon() {
  const items = [
    { icon: Icons.Bulb, title: 'Notifications', sub: 'Slack & email alerts on campaign status, budget caps, anomalies.' },
    { icon: Icons.Wallet, title: 'Billing', sub: 'Balance, invoices, payment methods. Linked to AdFactory billing.' },
    { icon: Icons.Code, title: 'API Access', sub: 'Programmatic control of FB Agent for in-house systems.' },
    { icon: Icons.History, title: 'Audit Log', sub: 'Full history of who changed what — settings, campaigns, members.' },
  ];
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--af-text-2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
        Coming soon
      </div>
      <div className="af-coming-grid">
        {items.map(i => (
          <div key={i.title} className="af-coming">
            <div className="af-coming-icon"><i.icon size={16}/></div>
            <div className="af-coming-title">{i.title} <span className="af-coming-tag">Soon</span></div>
            <div className="af-coming-sub">{i.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ───── Modals ─────
function NewWorkspaceModal({ onCancel, onCreate }) {
  return (
    <div className="af-modal-overlay" onClick={onCancel}>
      <div className="af-modal" style={{ width: 560 }} onClick={(e) => e.stopPropagation()}>
        <div className="af-modal-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#eff6ff', color: 'var(--af-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icons.Layers size={18}/>
            </div>
            <div style={{ flex: 1 }}>
              <h3 className="af-modal-title">New Workspace</h3>
              <p className="af-modal-sub">A workspace isolates one brand, client, or product line.</p>
            </div>
            <button className="af-icon-btn" onClick={onCancel}><Icons.X size={16}/></button>
          </div>
        </div>
        <div className="af-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="af-field-stack">
            <label style={{ fontSize: 12, color: 'var(--af-text-2)', fontWeight: 500, marginBottom: 4 }}>Workspace name <span style={{ color: 'var(--af-red)' }}>*</span></label>
            <input className="af-input" placeholder="e.g. Talefy · Quiz 5 · LATAM" autoFocus/>
          </div>
          <div className="af-field-stack">
            <label style={{ fontSize: 12, color: 'var(--af-text-2)', fontWeight: 500, marginBottom: 4 }}>Ad Account</label>
            <select className="af-select"><option>Talefy Creo Test (act_107615...)</option><option>Talefy EU LTD (act_993322...)</option></select>
          </div>
          <div className="af-field-stack">
            <label style={{ fontSize: 12, color: 'var(--af-text-2)', fontWeight: 500, marginBottom: 4 }}>Default Pixel</label>
            <select className="af-select"><option>CheckMyMeal Pixel · 2611...</option><option>Talefy Web Pixel · 8821...</option></select>
          </div>
          <div className="af-field-stack">
            <label style={{ fontSize: 12, color: 'var(--af-text-2)', fontWeight: 500, marginBottom: 4 }}>Platforms</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <label className="af-checkbox"><input type="checkbox" defaultChecked/> Web</label>
              <label className="af-checkbox"><input type="checkbox"/> iOS</label>
              <label className="af-checkbox"><input type="checkbox"/> Android</label>
            </div>
          </div>
          <div className="af-field-stack">
            <label style={{ fontSize: 12, color: 'var(--af-text-2)', fontWeight: 500, marginBottom: 4 }}>Initial members</label>
            <input className="af-input" placeholder="Type emails, comma-separated…"/>
            <span className="af-helper-text" style={{ marginTop: 4 }}>You can also add members later from Section 5.</span>
          </div>
        </div>
        <div className="af-modal-foot">
          <span className="af-helper-text">Workspace will be empty · ready for first campaign.</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="af-btn" onClick={onCancel}>Cancel</button>
            <button className="af-btn primary" onClick={onCreate}>Create workspace</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InviteMemberModal({ onCancel, onInvite }) {
  const [role, setRole] = React.useState('User');
  return (
    <div className="af-modal-overlay" onClick={onCancel}>
      <div className="af-modal" style={{ width: 540 }} onClick={(e) => e.stopPropagation()}>
        <div className="af-modal-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icons.Users size={18}/>
            </div>
            <div style={{ flex: 1 }}>
              <h3 className="af-modal-title">Invite Member</h3>
              <p className="af-modal-sub">They'll get an email with a magic link.</p>
            </div>
            <button className="af-icon-btn" onClick={onCancel}><Icons.X size={16}/></button>
          </div>
        </div>
        <div className="af-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="af-field-stack">
            <label style={{ fontSize: 12, color: 'var(--af-text-2)', fontWeight: 500, marginBottom: 4 }}>Email <span style={{ color: 'var(--af-red)' }}>*</span></label>
            <input className="af-input" placeholder="teammate@company.com" autoFocus/>
          </div>
          <div className="af-field-stack">
            <label style={{ fontSize: 12, color: 'var(--af-text-2)', fontWeight: 500, marginBottom: 4 }}>Role</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { id: 'Admin', label: 'Admin', desc: 'Full access · can invite members and see billing' },
                { id: 'User', label: 'User', desc: 'Assigned workspaces only · no billing/integrations' },
                { id: 'Client', label: 'Client', desc: 'Email reports only · no platform access' },
              ].map(r => (
                <label key={r.id} className={`af-pixel ${role === r.id ? 'selected' : ''}`} style={{ cursor: 'pointer', padding: '10px 12px' }} onClick={() => setRole(r.id)}>
                  <span className="af-pixel-radio"/>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 12.5 }}>{r.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--af-text-3)', marginTop: 2 }}>{r.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
          {role === 'User' && (
            <div className="af-field-stack">
              <label style={{ fontSize: 12, color: 'var(--af-text-2)', fontWeight: 500, marginBottom: 4 }}>Workspaces (multi-select)</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['Quiz 3 · 21+ Sub', 'App Install · iOS', 'EU Expansion'].map(ws => (
                  <label key={ws} className="af-radio-pill"><span className="dot"/>{ws}</label>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="af-modal-foot">
          <label className="af-checkbox"><input type="checkbox" defaultChecked/> Send welcome message</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="af-btn" onClick={onCancel}>Cancel</button>
            <button className="af-btn primary" onClick={onInvite}>Send invite</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ───── Settings page main ─────
function SettingsPage({ scenario = 'configured', initialModal = null }) {
  // scenario: 'wizard' (first visit) | 'mid' (sec 1-2 done) | 'configured' (all done) | 'complete' (5/5)
  const [modal, setModal] = React.useState(initialModal);

  let s1, s2, s3, s4, s5, progress, progressLabel;
  if (scenario === 'wizard') {
    s1 = { connected: false }; s2 = { disabled: true }; s3 = { disabled: true }; s4 = { disabled: true }; s5 = { disabled: true };
    progress = 0; progressLabel = 'Step 1 of 5: connect your ad account';
  } else if (scenario === 'mid') {
    s1 = { connected: true }; s2 = { active: true, complete: false }; s3 = { disabled: true }; s4 = { disabled: true }; s5 = { disabled: true };
    progress = 20; progressLabel = 'Step 2 of 5: configure pixel';
  } else if (scenario === 'configured' || scenario === 'complete') {
    s1 = { connected: true };
    s2 = { active: true, complete: true };
    s3 = { active: true, complete: scenario === 'complete' };
    s4 = { active: true, complete: true };
    s5 = { active: true, complete: true };
    progress = scenario === 'complete' ? 100 : 80;
    progressLabel = scenario === 'complete' ? '5 of 5 complete · ready to launch' : 'Step 4 of 5: deep links pending';
  }

  const accounts = [
    { id: 'act_1076155977092925', initials: 'TC', color: 'linear-gradient(135deg,#6366f1,#8b5cf6)', name: 'Talefy Creo Test', currency: 'USD', tz: 'GMT-5 · America/New_York', status: 'Active', spend: '$48,219', on: true },
    { id: 'act_9933221148775520', initials: 'TE', color: 'linear-gradient(135deg,#10b981,#059669)', name: 'Talefy EU LTD', currency: 'EUR', tz: 'GMT+1 · Europe/Berlin', status: 'Active', spend: '€12,440', on: true },
    { id: 'act_5577880022114433', initials: 'CM', color: 'linear-gradient(135deg,#f59e0b,#d97706)', name: 'CheckMyMeal Direct', currency: 'USD', tz: 'GMT-5 · America/New_York', status: 'Limited', spend: '$2,108', on: false },
    { id: 'act_3344112266887700', initials: 'CL', color: 'linear-gradient(135deg,#9ca3af,#6b7280)', name: 'CheckMyMeal Legacy', currency: 'USD', tz: 'GMT-5 · America/New_York', status: 'Inactive', spend: '$0', on: false },
  ];

  const tocItems = [
    { num: 1, label: 'Meta Business Account', state: scenario === 'wizard' ? 'active' : 'complete' },
    { num: 2, label: 'Pixel & Events', state: scenario === 'wizard' ? 'disabled' : scenario === 'mid' ? 'active' : 'complete' },
    { num: 3, label: 'Mobile Deep Links', state: scenario === 'wizard' || scenario === 'mid' ? 'disabled' : scenario === 'complete' ? 'complete' : 'active' },
    { num: 4, label: 'Workspaces', state: scenario === 'wizard' || scenario === 'mid' ? 'disabled' : 'complete' },
    { num: 5, label: 'Team & Permissions', state: scenario === 'wizard' || scenario === 'mid' ? 'disabled' : 'complete' },
  ];

  return (
    <div className="af-settings">
      <Sidebar/>
      <main className="af-settings-main">
        <header className="af-settings-header">
          <div>
            <div className="af-settings-crumbs">
              Settings <Icons.ChevronRight size={11}/> <strong>Facebook Agent</strong>
            </div>
            <h1 className="af-settings-title">Facebook Agent — Settings</h1>
            <p className="af-settings-sub">One-time setup before your first AI-driven campaign.</p>
          </div>
          <div className="af-settings-progress">
            <div>
              <div className="af-settings-progress-text">{progressLabel}</div>
              <div className="af-settings-progress-bar" style={{ marginTop: 6 }}>
                <div className={`af-settings-progress-fill ${progress === 100 ? 'complete' : ''}`} style={{ width: `${progress}%` }}/>
              </div>
            </div>
            <button className="af-btn primary" disabled={scenario === 'wizard'}>
              <Icons.Save size={13}/> Save changes
            </button>
            <span className="af-balance">
              <Icons.Coin size={13}/> $50.00 left
            </span>
            <div className="af-avatar">K<span className="af-avatar-badge">5</span></div>
          </div>
        </header>

        <div className="af-settings-layout">
          <nav className="af-settings-toc">
            <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--af-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 10px 8px' }}>
              Setup steps
            </div>
            {tocItems.map(t => (
              <button key={t.num} className={`af-toc-item ${t.state === 'active' ? 'active' : ''} ${t.state === 'complete' ? 'complete' : ''} ${t.state === 'disabled' ? 'disabled' : ''}`}>
                <span className="af-toc-num">{t.state === 'complete' ? <Icons.Check size={11}/> : t.num}</span>
                <span style={{ flex: 1 }}>{t.label}</span>
              </button>
            ))}
            <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--af-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '20px 10px 8px' }}>
              Coming soon
            </div>
            {['Notifications', 'Billing', 'API Access', 'Audit Log'].map(t => (
              <button key={t} className="af-toc-item disabled">
                <span className="af-toc-num">·</span>
                <span style={{ flex: 1 }}>{t}</span>
                <span className="af-coming-tag">Soon</span>
              </button>
            ))}
          </nav>

          <div className="af-settings-content">
            <Section1 connected={s1.connected} accounts={accounts}/>
            <Section2 active={s2.active} complete={s2.complete} disabled={s2.disabled}/>
            <Section3 active={s3.active} complete={s3.complete} disabled={s3.disabled}/>
            <Section4 active={s4.active} complete={s4.complete} disabled={s4.disabled} onAdd={() => setModal('workspace')}/>
            <Section5 active={s5.active} complete={s5.complete} disabled={s5.disabled} onInvite={() => setModal('invite')}/>
            <ComingSoon/>
          </div>
        </div>

        {modal === 'workspace' && <NewWorkspaceModal onCancel={() => setModal(null)} onCreate={() => setModal(null)}/>}
        {modal === 'invite' && <InviteMemberModal onCancel={() => setModal(null)} onInvite={() => setModal(null)}/>}
      </main>
    </div>
  );
}

window.SettingsPage = SettingsPage;
