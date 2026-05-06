// settings-v2-rules.jsx — Section 4 RulesTable + CreateRuleModal
// Exports window.RulesTable and window.CreateRuleModal (consumed by settings-v2.jsx)

const { Icons } = window;

/* ─────────────────────────── Rules Table ─────────────────────────── */
function RulesTable({ onCreate }) {
  const rules = [
    {
      name: 'Pause low ROAS · Web Quiz',
      sub: 'Stop bleeding ad sets after 3 days of poor return',
      action: 'pause', actionLabel: 'Pause ad set',
      apply: 'Web · CMM Quiz · 4 templates',
      cond: '<b>ROAS</b> &lt; 1.2 <i>AND</i> <b>Spend</b> &gt; $80 (3d)',
      schedule: 'Every 30 min',
      lastTrig: '2h ago · 3 ad sets',
      on: true,
    },
    {
      name: 'Scale winners +20% · iOS',
      sub: 'Bump CBO budget when CPI is on target',
      action: 'inc', actionLabel: '+20% budget',
      apply: 'iOS · DACH · ABO',
      cond: '<b>CPI</b> &lt; $4.50 <i>AND</i> <b>Installs</b> &gt; 30 (1d)',
      schedule: 'Every 6h',
      lastTrig: 'Yesterday · 2 campaigns',
      on: true,
    },
    {
      name: 'Frequency cap · Retargeting',
      sub: 'Avoid burning warm audiences',
      action: 'pause', actionLabel: 'Pause ad set',
      apply: 'Retargeting · all',
      cond: '<b>Frequency</b> &gt; 4.0 (7d)',
      schedule: 'Every 1h',
      lastTrig: '4d ago · 1 ad set',
      on: true,
    },
    {
      name: 'Restart paused after CPM drop',
      sub: 'Take advantage of cheap inventory windows',
      action: 'start', actionLabel: 'Resume ad set',
      apply: 'Web · all paused',
      cond: '<b>CPM</b> &lt; $8 (1d)',
      schedule: 'Every 2h',
      lastTrig: 'Never',
      on: false,
    },
    {
      name: 'Decrease budget on overspend',
      sub: 'Catch runaway spend before EOD',
      action: 'dec', actionLabel: '−15% budget',
      apply: 'All campaigns · CBO',
      cond: '<b>Spend</b> &gt; 130% planned (1d)',
      schedule: 'Every 30 min',
      lastTrig: '6d ago · 1 campaign',
      on: true,
    },
  ];

  return (
    <div>
      <div className="s2-rules-toolbar">
        <span style={{ fontSize: 12, color: 'var(--af-text-3)' }}>
          <b style={{ color: 'var(--af-text)' }}>{rules.filter((r) => r.on).length}</b> of {rules.length} active
          <span style={{ margin: '0 8px', color: 'var(--af-border-strong)' }}>·</span>
          Last triggered <b style={{ color: 'var(--af-text)' }}>2h ago</b>
        </span>
      </div>

      <table className="s2-rule-table">
        <thead>
          <tr>
            <th style={{ width: 40 }}></th>
            <th>Rule</th>
            <th>Action</th>
            <th>Applies to</th>
            <th>Conditions</th>
            <th>Schedule</th>
            <th>Last triggered</th>
            <th style={{ width: 32 }}></th>
          </tr>
        </thead>
        <tbody>
          {rules.map((r) => (
            <tr key={r.name}>
              <td><div className={`af-toggle green ${r.on ? 'on' : ''}`}/></td>
              <td>
                <div className="s2-rule-name">
                  {r.name}
                  <span className="sub">{r.sub}</span>
                </div>
              </td>
              <td>
                <span className={`s2-action-badge ${r.action}`}>
                  {r.action === 'pause' && <Icons.Pause size={11}/>}
                  {r.action === 'inc' && <Icons.ChevronRight size={11} style={{ transform: 'rotate(-90deg)' }}/>}
                  {r.action === 'dec' && <Icons.ChevronRight size={11} style={{ transform: 'rotate(90deg)' }}/>}
                  {r.action === 'start' && <Icons.ChevronRight size={11}/>}
                  {r.actionLabel}
                </span>
              </td>
              <td><span style={{ fontSize: 12, color: 'var(--af-text-2)' }}>{r.apply}</span></td>
              <td><span className="s2-cond-formula" dangerouslySetInnerHTML={{ __html: r.cond }}/></td>
              <td><span style={{ fontSize: 12, color: 'var(--af-text-3)' }}>{r.schedule}</span></td>
              <td><span style={{ fontSize: 12, color: 'var(--af-text-3)' }}>{r.lastTrig}</span></td>
              <td><button className="s2-icon-btn"><Icons.Dots size={14}/></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─────────────────────────── Create Rule Modal ─────────────────────────── */
function CreateRuleModal({ onClose }) {
  return (
    <div className="s2-modal-overlay">
      <div className="s2-modal lg">
        <div className="s2-modal-head">
          <h3 className="s2-modal-title">New automation rule</h3>
          <p className="s2-modal-sub">Conditions evaluate on every active campaign on the chosen schedule.</p>
        </div>
        <div className="s2-modal-body">
          {/* Step 1 — done */}
          <div className="s2-rule-step done">
            <div className="s2-rule-step-head">
              <div className="s2-rule-step-num"><Icons.Check size={12}/></div>
              <div>
                <div className="s2-rule-step-title">Apply to</div>
                <div className="s2-rule-step-sub">Web · CMM Quiz · 4 campaign templates</div>
              </div>
              <button className="af-btn sm">Edit</button>
            </div>
          </div>

          {/* Step 2 — done */}
          <div className="s2-rule-step done">
            <div className="s2-rule-step-head">
              <div className="s2-rule-step-num"><Icons.Check size={12}/></div>
              <div>
                <div className="s2-rule-step-title">Action</div>
                <div className="s2-rule-step-sub">Pause ad set</div>
              </div>
              <button className="af-btn sm">Edit</button>
            </div>
          </div>

          {/* Step 3 — active */}
          <div className="s2-rule-step">
            <div className="s2-rule-step-head">
              <div className="s2-rule-step-num">3</div>
              <div>
                <div className="s2-rule-step-title">Conditions</div>
                <div className="s2-rule-step-sub">All conditions must be met for the action to fire</div>
              </div>
              <span style={{ fontSize: 12, color: 'var(--af-text-3)' }}>2 groups · 4 conditions</span>
            </div>
            <div className="s2-rule-step-body">
              {/* Outer AND group */}
              <div className="s2-cond-group">
                <div className="s2-cond-group-head">
                  <div className="s2-cond-op-toggle">
                    <button className="active and">AND</button>
                    <button>OR</button>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--af-text-3)' }}>Group 1 · all conditions match</span>
                </div>

                <div className="s2-cond-row">
                  <select className="af-select" defaultValue="roas"><option value="roas">ROAS</option><option>CPA</option><option>CPM</option><option>CTR</option><option>Spend</option></select>
                  <select className="af-select" defaultValue="lt"><option value="lt">&lt;</option><option>&gt;</option><option>=</option></select>
                  <input className="af-input" defaultValue="1.2"/>
                  <select className="af-select" defaultValue="3d"><option>1d</option><option value="3d">3d</option><option>7d</option><option>14d</option></select>
                  <button className="remove-btn"><Icons.X size={13}/></button>
                </div>

                <div className="s2-cond-row last">
                  <select className="af-select" defaultValue="spend"><option>ROAS</option><option>CPA</option><option>CPM</option><option>CTR</option><option value="spend">Spend</option></select>
                  <select className="af-select" defaultValue="gt"><option>&lt;</option><option value="gt">&gt;</option><option>=</option></select>
                  <input className="af-input" defaultValue="$80"/>
                  <select className="af-select" defaultValue="3d"><option>1d</option><option value="3d">3d</option><option>7d</option><option>14d</option></select>
                  <button className="remove-btn"><Icons.X size={13}/></button>
                </div>

                <div className="s2-cond-add-row">
                  <button className="af-btn sm"><Icons.Plus size={11}/> Add condition</button>
                </div>
              </div>

              {/* Nested OR group */}
              <div className="s2-cond-group or">
                <div className="s2-cond-group-head">
                  <div className="s2-cond-op-toggle">
                    <button>AND</button>
                    <button className="active or">OR</button>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--af-text-3)' }}>Group 2 · any condition matches</span>
                </div>

                <div className="s2-cond-row">
                  <select className="af-select" defaultValue="freq"><option value="freq">Frequency</option><option>CTR</option></select>
                  <select className="af-select" defaultValue="gt"><option>&lt;</option><option value="gt">&gt;</option></select>
                  <input className="af-input" defaultValue="4.0"/>
                  <select className="af-select" defaultValue="7d"><option>1d</option><option>3d</option><option value="7d">7d</option></select>
                  <button className="remove-btn"><Icons.X size={13}/></button>
                </div>

                <div className="s2-cond-row last">
                  <select className="af-select" defaultValue="ctr"><option>Frequency</option><option value="ctr">CTR</option></select>
                  <select className="af-select" defaultValue="lt"><option value="lt">&lt;</option><option>&gt;</option></select>
                  <input className="af-input" defaultValue="0.6%"/>
                  <select className="af-select" defaultValue="3d"><option>1d</option><option value="3d">3d</option><option>7d</option></select>
                  <button className="remove-btn"><Icons.X size={13}/></button>
                </div>

                <div className="s2-cond-add-row">
                  <button className="af-btn sm"><Icons.Plus size={11}/> Add condition</button>
                </div>
              </div>

              <div className="s2-cond-add-row" style={{ marginTop: 12 }}>
                <button className="af-btn sm"><Icons.Plus size={11}/> Add group</button>
              </div>

              <div className="s2-cond-preview">
                <div className="s2-cond-preview-num">~12</div>
                <div className="s2-cond-preview-text">
                  <b>~12 ad sets</b> would have triggered this rule in the last 7 days based on historical data.
                  Average spend impact: <b>$1,840 saved</b>.
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 — pending */}
          <div className="s2-rule-step pending">
            <div className="s2-rule-step-head">
              <div className="s2-rule-step-num">4</div>
              <div>
                <div className="s2-rule-step-title">Schedule</div>
                <div className="s2-rule-step-sub">How often to evaluate the conditions</div>
              </div>
            </div>
          </div>
        </div>

        <div className="s2-modal-foot">
          <span style={{ fontSize: 11.5, color: 'var(--af-text-3)' }}>Step 3 of 4 · Conditions</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="af-btn" onClick={onClose}>Cancel</button>
            <button className="af-btn">Back</button>
            <button className="af-btn primary">Continue → Schedule</button>
          </div>
        </div>
      </div>
    </div>
  );
}

window.RulesTable = RulesTable;
window.CreateRuleModal = CreateRuleModal;
