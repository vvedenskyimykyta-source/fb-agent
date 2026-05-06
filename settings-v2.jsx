// settings-v2.jsx — FB Agent Settings page (5 sections)
const { Icons, Sidebar } = window;

// Sidebar variant where "Settings" is the active item, FB Agent inactive
function SidebarSettings() {
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

/* ─────────────────────────── Page header ─────────────────────────── */
function PageHeader({ done, total }) {
  const isComplete = done >= total;
  const pct = (done / total) * 100;
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
          One-time setup so the agent can launch and manage Meta Ads campaigns on your behalf.
          About 15&nbsp;min to fill in.
        </p>
      </div>
      <div className="s2-header-actions">
        <span className={`s2-progress-pill ${isComplete ? 'complete' : ''}`}>
          {isComplete ? <Icons.Check size={13}/> : null}
          <span>{isComplete ? 'All set' : 'Setup progress'}</span>
          <div className="s2-progress-bar"><span style={{ width: `${pct}%` }}/></div>
          <span className="s2-progress-count">{done} / {total}</span>
        </span>
        <button className="af-btn">Discard</button>
        <button className="af-btn primary">
          <Icons.Save size={14}/> Save changes
        </button>
      </div>
    </header>
  );
}

/* ─────────────────────────── Jump nav ─────────────────────────── */
function JumpNav({ statuses, activeId, lockedAfter }) {
  const items = [
    { id: 'meta', n: 1, label: 'Meta Connection' },
    { id: 'links', n: 2, label: 'Web Links' },
    { id: 'templates', n: 3, label: 'Campaign Templates' },
    { id: 'rules', n: 4, label: 'Automation Rules' },
    { id: 'notifs', n: 5, label: 'Notifications' },
  ];
  return (
    <nav className="s2-jumpnav">
      <div className="s2-jumpnav-label">Sections</div>
      {items.map((it) => {
        const cls = [
          statuses[it.id] === 'done' ? 'done' : '',
          activeId === it.id ? 'active' : '',
          lockedAfter && it.n > lockedAfter ? 'locked' : '',
        ].filter(Boolean).join(' ');
        return (
          <a key={it.id} href={`#${it.id}`} className={cls}>
            <span className="s2-jump-num">
              {statuses[it.id] === 'done' ? <Icons.Check size={11}/> : it.n}
            </span>
            <span>{it.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

/* ─────────────────────────── Section shell ─────────────────────────── */
function Section({ id, n, title, desc, status, locked, actions, children }) {
  const cls = [
    's2-section',
    status === 'done' ? 'done' : '',
    locked ? 'locked' : '',
  ].filter(Boolean).join(' ');
  return (
    <section id={id} className={cls}>
      <div className="s2-section-head">
        <div className="s2-section-num">{status === 'done' ? <Icons.Check size={14}/> : n}</div>
        <div>
          <h2 className="s2-section-title">
            {title}
            {status === 'done' && <span className="s2-status-pill done">Configured</span>}
            {status === 'idle' && !locked && <span className="s2-status-pill idle">Not configured</span>}
            {locked && <span className="s2-status-pill idle"><Icons.Info size={11}/> Locked</span>}
          </h2>
          <p className="s2-section-desc">{desc}</p>
        </div>
        <div className="s2-section-actions">{actions}</div>
      </div>
      <div className="s2-section-content">{children}</div>
    </section>
  );
}

function LockedNote() {
  return (
    <div className="s2-locked-note">
      <span className="s2-locked-note-icon"><Icons.Info size={14}/></span>
      <div>
        <div style={{ fontWeight: 600, color: 'var(--af-text)' }}>Connect Meta first</div>
        <div style={{ color: 'var(--af-text-3)', marginTop: 2 }}>
          This section needs ad accounts, pages, pixels and apps from a connected Business Manager.
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Section 1 · Meta ─────────────────────── */
function MetaSectionFresh() {
  return (
    <div>
      <div className="s2-meta-cta">
        <div>
          <h3 className="s2-meta-cta-title">Connect Meta Business Manager</h3>
          <p className="s2-meta-cta-text">
            We'll open Facebook in a popup so you can pick which Business Manager to grant access to.
            After that, your ad accounts, Pages, Pixels and Apps populate automatically — no copy-paste of IDs.
          </p>
          <div className="s2-connect-hint">
            <Icons.Info size={12}/> The agent only acts on items you explicitly toggle on below.
          </div>
        </div>
        <button className="s2-connect-btn">
          <span className="fb-glyph">f</span>
          Continue with Facebook
        </button>
      </div>
    </div>
  );
}

function MetaSectionConnected({ openBM }) {
  return (
    <div>
      <div className="s2-profile-strip">
        <div className="s2-profile-avatar">DK</div>
        <div style={{ flex: 1 }}>
          <div className="s2-profile-name">Daria Kovaleva</div>
          <div className="s2-profile-meta">
            <span>daria.k@iceberg.com</span>
            <span className="dot"/>
            <span>Connected 12 May, 14:22</span>
            <span className="dot"/>
            <span style={{ color: '#047857' }}>Token valid for 58 days</span>
          </div>
        </div>
        <button className="af-btn sm">Refresh</button>
        <button className="af-btn sm">Disconnect</button>
      </div>

      <BMCard
        name="Iceberg Labs"
        id="act_1148293400221"
        kind="primary"
        active={true}
        open={openBM === 'iceberg'}
        counts={{ ads: 7, pages: 3, pixels: 4, apps: 2 }}
      />
      <BMCard
        name="CheckMyMeal · Production"
        id="act_8847221033500"
        kind="green"
        active={true}
        open={false}
        counts={{ ads: 3, pages: 2, pixels: 1, apps: 2 }}
      />
      <BMCard
        name="Iceberg Internal · Tests"
        id="act_2210448791022"
        kind="amber"
        active={false}
        open={false}
        counts={{ ads: 2, pages: 1, pixels: 1, apps: 0 }}
      />
    </div>
  );
}

function BMCard({ name, id, kind, active, open, counts }) {
  const initials = name.split(' ').slice(0, 2).map((w) => w[0]).join('');
  return (
    <div className={`s2-bm ${open ? 'open' : ''}`}>
      <div className="s2-bm-head">
        <div className={`s2-bm-icon ${kind === 'green' ? 'green' : kind === 'amber' ? 'amber' : ''}`}>
          {initials}
        </div>
        <div>
          <div className="s2-bm-name">{name}</div>
          <div className="s2-bm-id">{id}</div>
        </div>
        <div className="s2-bm-summary">
          <span><strong>{counts.ads}</strong> ad accts</span>
          <span><strong>{counts.pages}</strong> pages</span>
          <span><strong>{counts.pixels}</strong> pixels</span>
          <span><strong>{counts.apps}</strong> apps</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ToggleSwitch on={active} label={active ? 'Active' : 'Off'}/>
          <span className="s2-bm-chev"><Icons.ChevronRight size={16}/></span>
        </div>
      </div>
      {open && <BMBody/>}
    </div>
  );
}

function ToggleSwitch({ on, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 11.5, color: on ? 'var(--af-green)' : 'var(--af-text-3)', fontWeight: 600 }}>
        {label}
      </span>
      <div className={`af-toggle green ${on ? 'on' : ''}`}/>
    </div>
  );
}

function BMBody() {
  return (
    <div className="s2-bm-body">
      <div className="s2-bm-tabs">
        <button className="s2-bm-tab active">Ad Accounts <span className="count">7</span></button>
        <button className="s2-bm-tab">Pages <span className="count">3</span></button>
        <button className="s2-bm-tab">Pixels <span className="count">4</span></button>
        <button className="s2-bm-tab">Apps <span className="count">2</span></button>
        <div className="s2-bm-tabbar-actions">
          <Icons.Search size={12}/>
          <span>Showing 7 · 5 enabled</span>
        </div>
      </div>
      <table className="s2-entity-table">
        <thead>
          <tr>
            <th style={{ width: 40 }}></th>
            <th>Ad account</th>
            <th>ID</th>
            <th>Currency</th>
            <th>Status</th>
            <th>Spend (30d)</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: 'Iceberg US · Acquisition', id: 'act_1148293400221', cur: 'USD', st: 'active', spend: '$48,210' },
            { name: 'Iceberg US · Retargeting', id: 'act_1148293400989', cur: 'USD', st: 'active', spend: '$12,430' },
            { name: 'Iceberg EU · DACH',       id: 'act_8847221001233', cur: 'EUR', st: 'active', spend: '€21,990' },
            { name: 'Iceberg EU · UK',         id: 'act_8847221001508', cur: 'GBP', st: 'active', spend: '£9,640'  },
            { name: 'Iceberg LATAM · BR',      id: 'act_5503291102772', cur: 'BRL', st: 'paused', spend: 'R$0'    },
            { name: 'Iceberg APAC · IN',       id: 'act_3392001755103', cur: 'INR', st: 'paused', spend: '₹0'     },
            { name: 'Iceberg Internal · QA',   id: 'act_9991100022731', cur: 'USD', st: 'active', spend: '$320'   },
          ].map((r, i) => (
            <tr key={r.id}>
              <td><input type="checkbox" className="s2-entity-cb" defaultChecked={i < 5}/></td>
              <td><div className="s2-entity-name">{r.name}</div></td>
              <td><span className="s2-entity-id">{r.id}</span></td>
              <td>{r.cur}</td>
              <td>
                <span className={`s2-status-pill ${r.st === 'active' ? 'done' : 'idle'}`}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }}/>
                  {r.st}
                </span>
              </td>
              <td style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>{r.spend}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─────────────────────── Section 2 · Web Links ─────────────────────── */
function LinksSection({ filled }) {
  if (!filled) {
    return (
      <div className="s2-empty">
        <div className="s2-empty-icon"><Icons.Globe size={18}/></div>
        <h4 className="s2-empty-title">No web links yet</h4>
        <p className="s2-empty-text">
          Add the URLs your traffic lands on. The agent picks from this list when launching web campaigns instead of asking you to paste the URL each time.
        </p>
        <button className="af-btn primary"><Icons.Plus size={13}/> Add link</button>
      </div>
    );
  }
  const rows = [
    { name: 'CheckMyMeal · Quiz Funnel', url: 'https://checkmymeal.com/quiz/start', utm: { source: 'fb', medium: 'paid_social', campaign: '{{campaign.name}}' }, added: '11 May' },
    { name: 'CheckMyMeal · iOS Smartlink', url: 'https://link.checkmymeal.com/i/start', utm: { source: 'fb', medium: 'paid_app', campaign: '{{campaign.name}}' }, added: '8 May' },
    { name: 'Iceberg Labs · Pricing', url: 'https://iceberg.com/pricing', utm: { source: 'fb', medium: 'cpc', campaign: 'spring_2026' }, added: '4 May' },
    { name: 'Iceberg Labs · Demo Booking', url: 'https://iceberg.com/book-demo', utm: { source: 'fb', medium: 'cpc', campaign: 'demo_funnel' }, added: '4 May' },
    { name: 'Iceberg Labs · Onboarding Guide', url: 'https://iceberg.com/guide/start', utm: { source: 'fb', medium: 'paid_social', campaign: 'onb_q2' }, added: '2 May' },
  ];
  return (
    <table className="s2-table">
      <thead>
        <tr>
          <th style={{ width: '24%' }}>Name</th>
          <th>URL</th>
          <th>UTM preview</th>
          <th style={{ width: 100 }}>Added</th>
          <th style={{ width: 90 }}></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.name}>
            <td><div className="s2-link-name">{r.name}</div></td>
            <td>
              <span className="s2-link-url">
                <Icons.Globe size={12}/>
                <span className="s2-link-url-text">{r.url}</span>
              </span>
            </td>
            <td>
              <div className="s2-utm-stack">
                <span className="s2-utm-chip"><b>src</b>={r.utm.source}</span>
                <span className="s2-utm-chip"><b>med</b>={r.utm.medium}</span>
                <span className="s2-utm-chip"><b>camp</b>={r.utm.campaign}</span>
              </div>
            </td>
            <td style={{ color: 'var(--af-text-3)' }}>{r.added}</td>
            <td>
              <div className="s2-row-actions" style={{ opacity: 1 }}>
                <button className="s2-icon-btn"><Icons.Edit size={13}/></button>
                <button className="s2-icon-btn"><Icons.Copy size={13}/></button>
                <button className="s2-icon-btn danger"><Icons.X size={13}/></button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ─────────────────────── Section 3 · Templates ─────────────────────── */
function TemplatesSection({ filled, onNew }) {
  if (!filled) {
    return (
      <div className="s2-empty">
        <div className="s2-empty-icon"><Icons.Layers size={18}/></div>
        <h4 className="s2-empty-title">No templates saved</h4>
        <p className="s2-empty-text">
          Create templates with budget, geo, audience and placements pre-filled — then the agent launches campaigns from them in a single sentence.
        </p>
        <button className="af-btn primary" onClick={onNew}><Icons.Plus size={13}/> New template</button>
      </div>
    );
  }
  const items = [
    { kind: 'web', tag: 'WEB', name: 'CheckMyMeal · Web · Quiz Funnel · CBO', budget: 'CBO · $200/d', geo: 'US · CA · UK', age: '25–55', last: '2h ago' },
    { kind: 'ios', tag: 'iOS', name: 'CheckMyMeal · App iOS · DACH · ABO', budget: 'ABO · $80/d', geo: 'DE · AT · CH', age: '22–45', last: 'Yesterday' },
    { kind: 'android', tag: 'AND', name: 'CheckMyMeal · App Android · LatAm', budget: 'CBO · $120/d', geo: 'BR · MX · AR', age: '18–40', last: '3 days ago' },
    { kind: 'web', tag: 'WEB', name: 'Iceberg · Demo Booking · Q2', budget: 'ABO · $60/d', geo: 'US · CA', age: '28–55', last: '5 days ago' },
    { kind: 'web', tag: 'WEB', name: 'Iceberg · Pricing · Retargeting', budget: 'CBO · $40/d', geo: 'WW excl. RU', age: '25–55', last: '1 wk ago' },
    { kind: 'ios', tag: 'iOS', name: 'CheckMyMeal · App iOS · UK · Scaling', budget: 'CBO · $250/d', geo: 'UK · IE', age: '21–50', last: '2 wks ago' },
  ];
  return (
    <div className="s2-tpl-grid">
      {items.map((t) => (
        <div key={t.name} className="s2-tpl">
          <div className="s2-tpl-head">
            <div className={`s2-tpl-icon ${t.kind}`}>{t.tag}</div>
            <button className="s2-icon-btn"><Icons.Dots size={14}/></button>
          </div>
          <div className="s2-tpl-name">{t.name}</div>
          <div className="s2-tpl-params">
            <div className="row"><span>Budget</span><span>{t.budget}</span></div>
            <div className="row"><span>Geo</span><span>{t.geo}</span></div>
            <div className="row"><span>Age</span><span>{t.age}</span></div>
          </div>
          <div className="s2-tpl-foot">
            <span>Last used {t.last}</span>
            <span style={{ color: 'var(--af-blue)', fontWeight: 600 }}>Use →</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────── Section 5 · Notifications ─────────────────────── */
function NotificationsSection({ filled }) {
  return (
    <div>
      <div className="s2-notif-channels">
        <div className="s2-channel">
          <div className="s2-channel-head">
            <span className="s2-channel-icon slack">#</span>
            <div style={{ flex: 1 }}>
              <div className="s2-channel-name">Slack</div>
              <div className={`s2-channel-status ${filled ? 'connected' : 'disconnected'}`}>
                <span className="dot"/>
                {filled ? 'Connected to Iceberg Labs workspace' : 'Not connected'}
              </div>
            </div>
            {filled
              ? <button className="af-btn sm">Reconnect</button>
              : <button className="af-btn primary sm">Connect Slack</button>}
          </div>
          {filled && (
            <div>
              <label className="s2-form-label" style={{ marginBottom: 4 }}>Default channel</label>
              <select className="af-select" defaultValue="ads-team">
                <option value="ads-team">#ads-team</option>
                <option value="growth">#growth</option>
                <option value="marketing-ops">#marketing-ops</option>
                <option value="agent-alerts">#agent-alerts</option>
              </select>
            </div>
          )}
        </div>

        <div className="s2-channel">
          <div className="s2-channel-head">
            <span className="s2-channel-icon email"><Icons.Send size={15}/></span>
            <div style={{ flex: 1 }}>
              <div className="s2-channel-name">Email</div>
              <div className={`s2-channel-status ${filled ? 'connected' : 'disconnected'}`}>
                <span className="dot"/>
                {filled ? '2 recipients' : 'No recipients'}
              </div>
            </div>
          </div>
          {filled ? (
            <div className="s2-email-list">
              <div className="s2-email-item">
                <span>daria.k@iceberg.com</span>
                <button className="s2-icon-btn danger"><Icons.X size={12}/></button>
              </div>
              <div className="s2-email-item">
                <span>growth@iceberg.com</span>
                <button className="s2-icon-btn danger"><Icons.X size={12}/></button>
              </div>
              <div className="s2-channel-input-row" style={{ marginTop: 4 }}>
                <input className="af-input" placeholder="Add another email…"/>
                <button className="af-btn sm"><Icons.Plus size={12}/> Add</button>
              </div>
            </div>
          ) : (
            <div className="s2-channel-input-row">
              <input className="af-input" placeholder="name@company.com"/>
              <button className="af-btn sm"><Icons.Plus size={12}/> Add</button>
            </div>
          )}
        </div>
      </div>

      <div style={{ marginBottom: 8, fontSize: 12.5, color: 'var(--af-text-2)', fontWeight: 600 }}>
        What to send
      </div>
      <div className="s2-notif-matrix">
        <div className="s2-notif-matrix-head">
          <div>Event</div>
          <div>Slack</div>
          <div>Email</div>
        </div>
        {[
          { ev: 'Agent finished setting up a campaign', sub: 'Sent when the agent moves a campaign to "Ready to launch"', sl: filled, em: filled },
          { ev: 'Automation rule triggered', sub: 'Pause / start / budget change events', sl: filled, em: filled },
          { ev: 'Campaign launch failed', sub: 'Meta API errors, rejected creatives, billing issues', sl: filled, em: filled },
          { ev: 'Campaign not spending budget for 4h+', sub: 'Catches stuck delivery before it costs you a day', sl: filled, em: false },
        ].map((r) => (
          <div key={r.ev} className="s2-notif-row">
            <div>
              <div className="s2-notif-event">{r.ev}</div>
              <div className="s2-notif-event-sub">{r.sub}</div>
            </div>
            <div><div className={`af-toggle green ${r.sl ? 'on' : ''}`}/></div>
            <div><div className={`af-toggle green ${r.em ? 'on' : ''}`}/></div>
          </div>
        ))}
        <div className="s2-notif-row with-time-head" style={{ gridTemplateColumns: '1fr 90px 80px 80px' }}>
          <div>
            <div className="s2-notif-event">Daily digest</div>
            <div className="s2-notif-event-sub">Summary of all active campaigns at the chosen time (workspace tz)</div>
          </div>
          <div><input className="af-input s2-notif-time-input" defaultValue={filled ? '09:30' : '09:00'}/></div>
          <div><div className={`af-toggle green ${filled ? 'on' : ''}`}/></div>
          <div><div className="af-toggle green"/></div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Modals ─────────────────────────── */
function NewTemplateModal({ onClose }) {
  return (
    <div className="s2-modal-overlay">
      <div className="s2-modal lg">
        <div className="s2-modal-head">
          <h2 className="s2-modal-title">New campaign template</h2>
          <p className="s2-modal-sub">Save a launch preset. The agent uses it whenever you ask for a new campaign of this kind.</p>
        </div>
        <div className="s2-modal-body">
          <div className="s2-form-group">
            <label className="s2-form-label">Template name <span className="req">*</span></label>
            <input className="af-input" defaultValue="CheckMyMeal · Web · Quiz Funnel · CBO" />
            <div className="s2-form-help">Convention: <code>{`{product} · {type} · {flow} · {budget mode}`}</code></div>
          </div>

          <div className="s2-form-group">
            <label className="s2-form-label">Campaign type <span className="req">*</span></label>
            <div className="s2-radio-row">
              <div className="s2-radio-card active"><div className="dot"/> <Icons.Globe size={14}/> Web</div>
              <div className="s2-radio-card"><div className="dot"/> <Icons.Layers size={14}/> App · iOS</div>
              <div className="s2-radio-card"><div className="dot"/> <Icons.Layers size={14}/> App · Android</div>
            </div>
          </div>

          <div className="s2-form-row">
            <div className="s2-form-group">
              <label className="s2-form-label">Budget mode</label>
              <div className="af-segmented" style={{ display: 'inline-flex' }}>
                <button className="active">CBO</button>
                <button>ABO</button>
              </div>
              <div className="s2-form-help">CBO lets Meta distribute budget across ad sets automatically.</div>
            </div>
            <div className="s2-form-group">
              <label className="s2-form-label">Daily budget <span className="req">*</span></label>
              <div style={{ display: 'flex', gap: 6 }}>
                <input className="af-input" defaultValue="200" style={{ width: 110 }}/>
                <select className="af-select" defaultValue="usd">
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                  <option value="gbp">GBP</option>
                </select>
                <select className="af-select" defaultValue="daily">
                  <option value="daily">Daily</option>
                  <option value="lifetime">Lifetime</option>
                </select>
              </div>
            </div>
          </div>

          <div className="s2-form-group">
            <label className="s2-form-label">Audience</label>
            <div className="s2-form-row cols-3">
              <div>
                <div className="s2-form-help" style={{ marginTop: 0, marginBottom: 4 }}>Geos</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, padding: 6, border: '1px solid var(--af-border)', borderRadius: 6, background: 'var(--af-bg)', minHeight: 32, alignItems: 'center' }}>
                  <span className="af-tag blue">United States ✕</span>
                  <span className="af-tag blue">Canada ✕</span>
                  <span className="af-tag blue">United Kingdom ✕</span>
                  <span style={{ fontSize: 11, color: 'var(--af-text-3)' }}>+ add</span>
                </div>
              </div>
              <div>
                <div className="s2-form-help" style={{ marginTop: 0, marginBottom: 4 }}>Age</div>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  <input className="af-input" defaultValue="25" style={{ width: 60 }}/>
                  <span style={{ color: 'var(--af-text-3)' }}>—</span>
                  <input className="af-input" defaultValue="55" style={{ width: 60 }}/>
                </div>
              </div>
              <div>
                <div className="s2-form-help" style={{ marginTop: 0, marginBottom: 4 }}>Gender</div>
                <select className="af-select" defaultValue="all">
                  <option value="all">All</option>
                  <option>Female</option>
                  <option>Male</option>
                </select>
              </div>
            </div>
          </div>

          <div className="s2-form-row">
            <div className="s2-form-group">
              <label className="s2-form-label">Placements</label>
              <div className="s2-radio-grid">
                <div className="s2-radio-card lg active">
                  <div className="dot"/>
                  <div className="label-stack">
                    <div className="name">Advantage+ Placements</div>
                    <div className="desc">Recommended · Meta optimizes</div>
                  </div>
                </div>
                <div className="s2-radio-card lg">
                  <div className="dot"/>
                  <div className="label-stack">
                    <div className="name">Manual placements</div>
                    <div className="desc">FB feed, Reels, Stories…</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="s2-form-group">
              <label className="s2-form-label">Conversion event</label>
              <select className="af-select" defaultValue="purchase">
                <option value="purchase">Purchase · CMM Web Pixel</option>
                <option>Initiate Checkout · CMM Web Pixel</option>
                <option>Lead · CMM Web Pixel</option>
                <option>Add to Cart · CMM Web Pixel</option>
              </select>
              <div className="s2-form-help">Pulled from pixels you enabled in Meta Connection.</div>
            </div>
          </div>
        </div>
        <div className="s2-modal-foot">
          <span style={{ fontSize: 11.5, color: 'var(--af-text-3)' }}>Saved templates can be reused across all enabled ad accounts.</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="af-btn" onClick={onClose}>Cancel</button>
            <button className="af-btn primary"><Icons.Save size={13}/> Save template</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Page (top-level) ─────────────────────────── */
function SettingsV2Page({ scenario, openBM, initialModal }) {
  const fresh = scenario === 'fresh';
  const [modal, setModal] = React.useState(initialModal || null);

  const statuses = fresh
    ? { meta: 'idle', links: 'idle', templates: 'idle', rules: 'idle', notifs: 'idle' }
    : { meta: 'done', links: 'done', templates: 'done', rules: 'done', notifs: 'done' };
  const done = Object.values(statuses).filter((v) => v === 'done').length;

  return (
    <div className="s2-app">
      <SidebarSettings/>
      <div className="s2-main">
        <PageHeader done={done} total={5}/>
        <div className="s2-body">
          <JumpNav statuses={statuses} activeId={fresh ? 'meta' : 'meta'} lockedAfter={fresh ? 1 : null}/>
          <div className="s2-content">

            <Section
              id="meta"
              n={1}
              title="Meta Business Manager"
              desc="Connect Facebook so the agent can read your ad accounts, Pages, Pixels and Apps."
              status={fresh ? 'idle' : 'done'}
            >
              {fresh ? <MetaSectionFresh/> : <MetaSectionConnected openBM={openBM}/>}
            </Section>

            <Section
              id="links"
              n={2}
              title="Web links"
              desc="Saved destination URLs for web campaigns. Skip retyping the URL every launch."
              status={fresh ? 'idle' : 'done'}
              locked={fresh}
              actions={!fresh && <button className="af-btn sm primary"><Icons.Plus size={12}/> Add link</button>}
            >
              {fresh ? <LockedNote/> : <LinksSection filled={true}/>}
            </Section>

            <Section
              id="templates"
              n={3}
              title="Campaign templates"
              desc="Pre-filled launch presets the agent can use in one click — budget, geo, audience, placements, conversion event."
              status={fresh ? 'idle' : 'done'}
              locked={fresh}
              actions={!fresh && <button className="af-btn sm primary" onClick={() => setModal('template')}><Icons.Plus size={12}/> New template</button>}
            >
              {fresh ? <LockedNote/> : <TemplatesSection filled={true} onNew={() => setModal('template')}/>}
            </Section>

            <Section
              id="rules"
              n={4}
              title="Automation rules"
              desc="Run in the background on every active campaign. Pause, start or change budget when conditions match."
              status={fresh ? 'idle' : 'done'}
              locked={fresh}
              actions={!fresh && (
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
              {fresh ? <LockedNote/> : <window.RulesTable onCreate={() => setModal('rule')}/>}
            </Section>

            <Section
              id="notifs"
              n={5}
              title="Notifications"
              desc="Where the agent should send updates about campaign launches and triggered rules."
              status={fresh ? 'idle' : 'done'}
              locked={fresh}
            >
              {fresh ? <LockedNote/> : <NotificationsSection filled={true}/>}
            </Section>

          </div>
        </div>
      </div>

      {modal === 'template' && <NewTemplateModal onClose={() => setModal(null)}/>}
      {modal === 'rule' && <window.CreateRuleModal onClose={() => setModal(null)}/>}
    </div>
  );
}

window.SettingsV2Page = SettingsV2Page;
window.MetaSectionFresh = MetaSectionFresh;
window.MetaSectionConnected = MetaSectionConnected;
window.LinksSection = LinksSection;
window.TemplatesSection = TemplatesSection;
window.NotificationsSection = NotificationsSection;
window.NewTemplateModal = NewTemplateModal;
