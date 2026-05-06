// Pipeline.jsx — agent-led setup with manual right rail
// Left: chat with the agent walking through setup
// Right: 5 sections panel (same as Settings) — fields fill in live as agent collects answers
const { Icons, Sidebar } = window;

// ───── Top progress pill ─────
function PipelineProgress({ step }) {
  const steps = [
    { id: 1, label: 'Meta' },
    { id: 2, label: 'Pixel' },
    { id: 3, label: 'Deep links' },
    { id: 4, label: 'Workspace' },
    { id: 5, label: 'Team' },
  ];
  return (
    <div className="af-pipeline-progress">
      {steps.map((s, i) => (
        <React.Fragment key={s.id}>
          <span className={`af-pp-step ${s.id < step ? 'done' : s.id === step ? 'active' : ''}`}>
            <span className="af-pp-dot">{s.id < step ? <Icons.Check size={10}/> : s.id}</span>
            {s.label}
          </span>
          {i < steps.length - 1 && <span className={`af-pp-conn ${s.id < step ? 'done' : ''}`}/>}
        </React.Fragment>
      ))}
    </div>
  );
}

// ───── Chat side ─────
function PipelineChat() {
  const messages = [
    { role: 'agent', text: 'Hi Kostia 👋 I\'m your FB Agent setup assistant. I\'ll walk you through 5 steps — should take ~10 minutes. We can also do it the other way: tell me your goals and I\'ll fill in what I can, then you review on the right.', time: '14:02' },
    { role: 'user', text: 'Let\'s do it. We have a Meta business account already — Talefy LLC. Two ad accounts: one for CheckMyMeal in US, one for the EU expansion.', time: '14:03' },
    { role: 'agent', kind: 'action', text: 'Connected to Meta Business Suite as Talefy LLC. Found 6 ad accounts, 3 pixels, 2 mobile apps registered.', detail: 'OAuth token saved · scopes: ads_management, business_management, read_insights', time: '14:03' },
    { role: 'agent', text: 'Got it. I\'ve toggled the two CheckMyMeal accounts on (Talefy Creo Test + Talefy EU LTD) — see them on the right. The 4 others are off by default; flip any of them on if you need.', time: '14:03' },
    { role: 'user', text: 'Good. Pixel — use CheckMyMeal Pixel as default. We optimize for Subscribe and Purchase, plus Initiate Checkout. Don\'t add View Content.', time: '14:05' },
    { role: 'agent', kind: 'action', text: 'Pixel set: CheckMyMeal Pixel · 2611...5259. Receiving events 2 min ago.', detail: 'Standard events selected: Subscribe, Purchase, Initiate Checkout, Lead', time: '14:05' },
    { role: 'agent', text: 'Attribution window — defaulted to 7d click + 1d view (Meta\'s recommendation, matches your current setup in Ads Manager). Want to change it?', time: '14:05' },
    { role: 'user', text: 'Keep 7d+1d. Move on.', time: '14:06' },
    { role: 'agent', text: 'You have an iOS app (CheckMyMeal · 6443234567) and an Android one. I pulled both bundle IDs and the App Links domain. **Question for you:** the iOS Facebook SDK isn\'t firing events — likely needs re-init after your last release. Want me to flag this for your dev team or skip for now?', time: '14:08', highlight: true },
  ];

  const chips = [
    'Skip — I\'ll fix iOS SDK later',
    'Send a Slack to the iOS team',
    'Show me what to check',
    'Use Adjust instead',
  ];

  return (
    <div className="af-chat" style={{ borderRight: '1px solid var(--af-border)' }}>
      <div className="af-chat-stream">
        {messages.map((m, i) => (
          <ChatBubble key={i} m={m}/>
        ))}
        <div className="af-msg-row agent" style={{ alignSelf: 'flex-start' }}>
          <div className="af-msg-avatar"><Icons.Sparkle size={12}/></div>
          <div style={{ display: 'flex', gap: 4, padding: '8px 0', alignItems: 'center' }}>
            <span className="af-typing-dot"/><span className="af-typing-dot"/><span className="af-typing-dot"/>
            <span style={{ fontSize: 11.5, color: 'var(--af-text-3)', marginLeft: 6 }}>verifying iOS SDK on TestFlight build…</span>
          </div>
        </div>
      </div>

      <div className="af-composer">
        <div className="af-chips">
          {chips.map((c, i) => (
            <button key={i} className="af-chip">{c}</button>
          ))}
        </div>
        <div className="af-input-wrap">
          <textarea className="af-textarea" placeholder="Reply, or edit fields on the right →" rows={2}/>
          <div className="af-composer-actions">
            <button className="af-icon-btn" title="Attach"><Icons.Plus size={14}/></button>
            <button className="af-icon-btn send"><Icons.Send size={14}/></button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 12px 0', fontSize: 10.5, color: 'var(--af-text-muted)' }}>
          <span>Step 3 of 5 · ~6 min remaining</span>
          <span>Edits on the right are saved automatically</span>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ m }) {
  if (m.role === 'user') {
    return (
      <div className="af-msg-row user" style={{ alignSelf: 'flex-end' }}>
        <div className="af-msg user">{m.text}</div>
        <div className="af-msg-time" style={{ textAlign: 'right' }}>{m.time}</div>
      </div>
    );
  }
  if (m.kind === 'action') {
    return (
      <div className="af-msg-row agent">
        <div className="af-msg-avatar"><Icons.Bolt size={11}/></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="af-action-card">
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <Icons.CheckCircle size={14} style={{ color: 'var(--af-green)', marginTop: 1, flexShrink: 0 }}/>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--af-text)' }}>{m.text}</div>
                {m.detail && <div style={{ fontSize: 11, color: 'var(--af-text-3)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>{m.detail}</div>}
              </div>
            </div>
          </div>
          <div className="af-msg-time">{m.time}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="af-msg-row agent">
      <div className="af-msg-avatar"><Icons.Sparkle size={12}/></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className={`af-msg agent ${m.highlight ? 'highlight' : ''}`} dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }}/>
        <div className="af-msg-time">{m.time}</div>
      </div>
    </div>
  );
}

// ───── Right rail: 5 sections, agent-filled ─────
function PipelineRail() {
  const [openStep, setOpenStep] = React.useState(3);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: '1px solid var(--af-border)', background: 'var(--af-bg)' }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--af-text)' }}>Setup pipeline</div>
          <div style={{ fontSize: 11, color: 'var(--af-text-3)', marginTop: 2 }}>Agent fills these as you talk · click to override</div>
        </div>
        <PipelineProgress step={3}/>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 18, background: 'var(--af-bg-soft)' }}>
        {/* Section 1: done */}
        <PLSection num={1} title="Meta Business Account" summary="Talefy LLC · 2 of 6 accounts on" state="done" open={openStep === 1} onToggle={() => setOpenStep(openStep === 1 ? 0 : 1)}>
          <div style={{ fontSize: 11.5, color: 'var(--af-text-3)', marginBottom: 8 }}>Filled by agent · 14:03</div>
          <div className="af-acct" style={{ marginBottom: 6 }}>
            <div className="af-acct-logo" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>TC</div>
            <div><div className="af-acct-name">Talefy Creo Test</div><div className="af-acct-meta"><span>act_1076155977092925</span><span className="sep">·</span><span>USD</span></div></div>
            <span className="af-status-badge green" style={{ alignSelf: 'center' }}><span className="dot"/>Active</span>
            <span style={{ fontSize: 11, color: 'var(--af-text-3)' }}>$48,219</span>
            <span className="af-toggle on"/>
          </div>
          <div className="af-acct">
            <div className="af-acct-logo" style={{ background: 'linear-gradient(135deg,#10b981,#059669)' }}>TE</div>
            <div><div className="af-acct-name">Talefy EU LTD</div><div className="af-acct-meta"><span>act_9933221148775520</span><span className="sep">·</span><span>EUR</span></div></div>
            <span className="af-status-badge green" style={{ alignSelf: 'center' }}><span className="dot"/>Active</span>
            <span style={{ fontSize: 11, color: 'var(--af-text-3)' }}>€12,440</span>
            <span className="af-toggle on"/>
          </div>
        </PLSection>

        {/* Section 2: done */}
        <PLSection num={2} title="Pixel & Conversion Events" summary="CheckMyMeal Pixel · 4 events · 7d+1d" state="done" open={openStep === 2} onToggle={() => setOpenStep(openStep === 2 ? 0 : 2)}>
          <div style={{ fontSize: 11.5, color: 'var(--af-text-3)', marginBottom: 8 }}>Filled by agent · 14:05 · <a href="#" style={{ color: 'var(--af-blue)' }}>edit</a></div>
          <div className="af-pixel selected" style={{ marginBottom: 12 }}>
            <span className="af-pixel-radio"/>
            <div><div className="af-pixel-name">CheckMyMeal Pixel</div><div className="af-pixel-id">2611674264135259</div></div>
            <span className="af-status-badge green"><span className="dot"/>Receiving events</span>
            <span style={{ fontSize: 11, color: 'var(--af-text-3)' }}>2 min ago</span>
          </div>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--af-text-2)', marginBottom: 6 }}>Conversion events</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['Subscribe', 'Purchase', 'Initiate Checkout', 'Lead'].map(e => (
              <span key={e} className="af-event checked" style={{ padding: '5px 10px' }}>
                <span className="af-event-check"><Icons.Check size={9}/></span>
                {e}
              </span>
            ))}
          </div>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--af-text-2)', marginTop: 12, marginBottom: 6 }}>Attribution window</div>
          <span className="af-radio-pill active" style={{ fontSize: 11.5 }}><span className="dot"/>7d click + 1d view</span>
        </PLSection>

        {/* Section 3: ACTIVE */}
        <PLSection num={3} title="Mobile App Deep Links" summary="iOS SDK issue · 1 question pending" state="active" open={openStep === 3} onToggle={() => setOpenStep(openStep === 3 ? 0 : 3)}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div className="af-edit-pulse">Agent is filling this in…</div>
            <button className="af-btn sm ghost" style={{ fontSize: 11 }}><Icons.Edit size={11}/> Take over</button>
          </div>

          <div className="af-deeplink-cols" style={{ marginTop: 0 }}>
            <div className="af-deeplink-col" style={{ padding: 12 }}>
              <div className="af-deeplink-col-head">
                <div className="af-deeplink-col-title">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 12.5c0-2.6 2.13-3.86 2.23-3.92-1.22-1.78-3.11-2.02-3.79-2.05-1.61-.16-3.15.95-3.97.95-.83 0-2.09-.93-3.44-.9-1.77.03-3.4 1.03-4.31 2.6-1.84 3.19-.47 7.92 1.32 10.51.87 1.27 1.91 2.69 3.27 2.64 1.32-.05 1.81-.85 3.4-.85s2.04.85 3.43.82c1.42-.02 2.31-1.28 3.18-2.56 1-1.46 1.41-2.88 1.43-2.95-.03-.01-2.74-1.05-2.77-4.16M14.45 4.97c.72-.88 1.21-2.1 1.07-3.31-1.04.04-2.31.69-3.06 1.56-.66.78-1.25 2.02-1.09 3.21 1.16.09 2.36-.59 3.08-1.46"/></svg>
                  iOS
                </div>
                <span className="af-status-badge red"><span className="dot"/>SDK error</span>
              </div>
              <div className="af-deeplink-fields" style={{ gap: 8 }}>
                <PLField label="App Store ID" value="6443234567" filledBy="agent"/>
                <PLField label="Bundle ID" value="com.checkmymeal.app" filledBy="agent"/>
                <PLField label="Universal Link" value="go.checkmymeal.ai" filledBy="agent"/>
                <PLField label="URL Scheme" value="checkmymeal://" filledBy="user" editing/>
              </div>
            </div>
            <div className="af-deeplink-col" style={{ padding: 12 }}>
              <div className="af-deeplink-col-head">
                <div className="af-deeplink-col-title">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 00-.83.22l-1.88 3.24a11.43 11.43 0 00-8.94 0L5.65 5.67a.643.643 0 00-.87-.2c-.28.18-.37.54-.22.83L6.4 9.48A10.78 10.78 0 001 18h22a10.78 10.78 0 00-5.4-8.52M7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5m10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5"/></svg>
                  Android
                </div>
                <span className="af-status-badge green"><span className="dot"/>SDK Connected</span>
              </div>
              <div className="af-deeplink-fields" style={{ gap: 8 }}>
                <PLField label="Package Name" value="com.checkmymeal.app" filledBy="agent"/>
                <PLField label="App Links Domain" value="go.checkmymeal.ai" filledBy="agent"/>
                <PLField label="Activity Class" value=".MainActivity" filledBy="agent"/>
                <PLField label="URL Scheme" value="checkmymeal://" filledBy="agent"/>
              </div>
            </div>
          </div>

          <div className="af-bulk-strip" style={{ marginTop: 12 }}>
            <span className="af-bulk-label">Quick fixes</span>
            <button className="af-btn sm"><Icons.CheckCircle size={11}/> Verify SDK</button>
            <button className="af-btn sm"><Icons.Code size={11}/> Copy snippet</button>
            <button className="af-btn sm"><Icons.Refresh size={11}/> Re-pull from Meta</button>
            <span style={{ flex: 1 }}/>
            <button className="af-skip-link">Skip — web-only campaigns</button>
          </div>
        </PLSection>

        {/* Section 4: pending */}
        <PLSection num={4} title="Workspaces" summary="Suggested: 2 workspaces from your accounts" state="pending" open={openStep === 4} onToggle={() => setOpenStep(openStep === 4 ? 0 : 4)}>
          <div style={{ fontSize: 11.5, color: 'var(--af-text-3)', marginBottom: 8 }}>The agent will draft these once deep links are confirmed.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ padding: '10px 12px', border: '1px dashed var(--af-border-strong)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10, background: 'var(--af-bg)' }}>
              <span className="af-acct-logo" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', width: 28, height: 28, fontSize: 11 }}>Q3</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 12.5 }}>Talefy · Quiz 3 · 21+ Sub <span className="af-tag blue" style={{ marginLeft: 6 }}>Suggested</span></div>
                <div style={{ fontSize: 11, color: 'var(--af-text-3)', marginTop: 2 }}>Talefy Creo Test · CheckMyMeal Pixel · Web + iOS + Android</div>
              </div>
              <button className="af-btn sm">Create</button>
            </div>
            <div style={{ padding: '10px 12px', border: '1px dashed var(--af-border-strong)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10, background: 'var(--af-bg)' }}>
              <span className="af-acct-logo" style={{ background: 'linear-gradient(135deg,#10b981,#059669)', width: 28, height: 28, fontSize: 11 }}>EU</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 12.5 }}>Talefy · EU Expansion <span className="af-tag blue" style={{ marginLeft: 6 }}>Suggested</span></div>
                <div style={{ fontSize: 11, color: 'var(--af-text-3)', marginTop: 2 }}>Talefy EU LTD · Talefy Web Pixel · Web only</div>
              </div>
              <button className="af-btn sm">Create</button>
            </div>
            <button className="af-btn sm ghost" style={{ alignSelf: 'flex-start', marginTop: 4 }}>
              <Icons.Plus size={11}/> Add workspace manually
            </button>
          </div>
        </PLSection>

        {/* Section 5: pending */}
        <PLSection num={5} title="Team & Permissions" summary="You're solo · invite teammates anytime" state="pending" open={openStep === 5} onToggle={() => setOpenStep(openStep === 5 ? 0 : 5)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
            <span className="af-member-avatar" style={{ background: '#6366f1' }}>KZ</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 12.5 }}>Kostia Zhushman · <span className="af-tag blue">Admin</span></div>
              <div style={{ fontSize: 11, color: 'var(--af-text-3)' }}>kostia@talefy.io · just you, for now</div>
            </div>
            <button className="af-btn sm primary"><Icons.Plus size={11}/> Invite</button>
          </div>
        </PLSection>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', background: 'var(--af-bg)', borderTop: '1px solid var(--af-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icons.Save size={13} style={{ color: 'var(--af-text-3)' }}/>
          <span style={{ fontSize: 11.5, color: 'var(--af-text-3)' }}>Auto-saved · 14:08 · 2 of 5 sections complete</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="af-btn sm">Export config</button>
          <button className="af-btn sm primary">
            Continue setup <Icons.ChevronRight size={11}/>
          </button>
        </div>
      </div>
    </div>
  );
}

function PLSection({ num, title, summary, state, open, onToggle, children }) {
  return (
    <div className={`af-pl-section ${state}`}>
      <div className="af-pl-head" onClick={onToggle}>
        <span className="af-pl-num">{state === 'done' ? <Icons.Check size={13}/> : num}</span>
        <div className="af-pl-title">
          {title}
          <span className="summary">— {summary}</span>
        </div>
        <span className="af-pl-state">
          {state === 'done' && <><Icons.Check size={11}/> Done</>}
          {state === 'active' && <>In progress</>}
          {state === 'pending' && <>Pending</>}
          <Icons.ChevronDown size={12} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}/>
        </span>
      </div>
      {open && <div className="af-pl-body">{children}</div>}
    </div>
  );
}

function PLField({ label, value, filledBy, editing }) {
  return (
    <div className={`af-field-stack ${filledBy === 'agent' ? 'af-edited-agent' : filledBy === 'user' ? 'af-edited-user' : ''}`} style={{ paddingTop: 4, paddingBottom: 4 }}>
      <label style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, color: 'var(--af-text-2)', fontWeight: 500 }}>{label}</span>
        {filledBy === 'agent' && <span style={{ fontSize: 9.5, color: 'var(--af-blue)', fontWeight: 600, letterSpacing: '0.04em' }}>BY AGENT</span>}
        {filledBy === 'user' && <span style={{ fontSize: 9.5, color: 'var(--af-purple)', fontWeight: 600, letterSpacing: '0.04em' }}>{editing ? 'EDITING' : 'BY YOU'}</span>}
      </label>
      <input className="af-input mono" defaultValue={value} style={{ fontSize: 11 }}/>
    </div>
  );
}

// ───── Main pipeline page ─────
function PipelinePage() {
  return (
    <div className="af-app" style={{ height: 900 }}>
      <Sidebar/>
      <main style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ padding: '14px 24px', borderBottom: '1px solid var(--af-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--af-bg)' }}>
          <div>
            <div className="af-settings-crumbs">
              Settings <Icons.ChevronRight size={11}/> Facebook Agent <Icons.ChevronRight size={11}/> <strong>Setup pipeline</strong>
            </div>
            <h1 style={{ margin: '4px 0 0', fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}>
              FB Agent · Setup pipeline
              <span style={{ fontWeight: 400, color: 'var(--af-text-3)', fontSize: 13, marginLeft: 8 }}>· first-time setup with the agent</span>
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button className="af-btn sm ghost"><Icons.Bulb size={12}/> How this works</button>
            <span className="af-balance"><Icons.Coin size={13}/> $50.00 left</span>
            <div className="af-avatar">K<span className="af-avatar-badge">5</span></div>
          </div>
        </header>

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '460px 1fr', minHeight: 0 }}>
          <PipelineChat/>
          <PipelineRail/>
        </div>
      </main>
    </div>
  );
}

window.PipelinePage = PipelinePage;
