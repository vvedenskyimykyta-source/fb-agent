// launch-pipeline.jsx — Pipeline shell: header + progress dots + step list + launching overlay
// Exports window.LaunchPipeline
const { Icons, LaunchSteps } = window;

const STEPS = [
  { num: 1, key: 'context',  title: 'Context',           sub: 'Product, app, funnel & deep link' },
  { num: 2, key: 'campaign', title: 'Campaign',          sub: 'Template, objective, budget mode' },
  { num: 3, key: 'adsets',   title: 'Ad sets',           sub: 'Audiences, geos, budgets' },
  { num: 4, key: 'ads',      title: 'Ads',               sub: 'Creatives, copy, CTA' },
  { num: 5, key: 'rules',    title: 'Automation rules',  sub: 'Pause, scale, frequency caps' },
  { num: 6, key: 'review',   title: 'Review & launch',   sub: 'Final summary' },
];

function ProgressDots({ activeIdx, doneCount }) {
  return (
    <div className="lp-progress">
      {STEPS.map((s, i) => {
        const cls = i < doneCount ? 'done' : i === activeIdx ? 'active' : '';
        return (
          <div key={s.key} className={`lp-progress-step ${cls}`}>
            <span className="lp-progress-dot">
              {i < doneCount ? <Icons.Check size={9}/> : s.num}
            </span>
            <span className="lp-progress-label">{s.title}</span>
          </div>
        );
      })}
    </div>
  );
}

function summaryFor(key) {
  // Tiny pills shown next to a *done* step's title
  switch (key) {
    case 'context':  return ['App Install', 'CheckMyMeal · iOS', 'Quiz #3'];
    case 'campaign': return ['ABO', '$80/d', 'iOS · DACH template'];
    case 'adsets':   return ['4 adsets', 'DE / AT / CH', 'est. ~4.6M'];
    case 'ads':      return ['7 creatives', '5 video · 1 img · 1 carousel'];
    case 'rules':    return ['3 rules attached'];
    default: return [];
  }
}

function StepShell({ idx, state, children }) {
  const s = STEPS[idx];
  const cls = state === 'active' ? 'active' : state === 'done' ? 'done collapsed' : 'collapsed';
  return (
    <div className={`lp-step ${cls}`}>
      <div className="lp-step-head">
        <span className="lp-step-num">
          {state === 'done' ? <Icons.Check size={12}/> : s.num}
        </span>
        <div>
          <div className="lp-step-title">
            <span className="num-text">Step {s.num}</span>
            {s.title}
          </div>
          {state === 'done' ? (
            <div className="lp-step-sub">
              {summaryFor(s.key).map((p) => (
                <span key={p} className="lp-summary-pill">{p}</span>
              ))}
            </div>
          ) : (
            <div className="lp-step-sub">{s.sub}</div>
          )}
        </div>
        <div className="lp-step-actions">
          {state === 'done' && <button className="lp-ghost-btn"><Icons.Edit size={11}/> Edit</button>}
          <span className="lp-step-chev"><Icons.ChevronRight size={14}/></span>
        </div>
      </div>
      {state === 'active' && (
        <div className="lp-step-body">
          {children}
          <div className="lp-step-foot">
            <span className="help">The agent will keep your changes in sync — just edit fields directly or chat.</span>
            <button className="af-btn">Save & continue later</button>
            <button className="af-btn primary">Continue to {STEPS[idx + 1]?.title || 'launch'} →</button>
          </div>
        </div>
      )}
    </div>
  );
}

function LaunchPipeline({ scenario }) {
  // Map scenario → activeIdx + doneCount
  const map = {
    context:   { activeIdx: 0, doneCount: 0 },
    campaign:  { activeIdx: 1, doneCount: 1 },
    adsets:    { activeIdx: 2, doneCount: 2 },
    ads:       { activeIdx: 3, doneCount: 3 },
    rules:     { activeIdx: 4, doneCount: 4 },
    review:    { activeIdx: 5, doneCount: 5 },
    launching: { activeIdx: 5, doneCount: 6 },
    launched:  { activeIdx: 6, doneCount: 6 },
  }[scenario];

  const { activeIdx, doneCount } = map;
  const filledFor = (idx) => idx <= doneCount;

  // For "launched" scenario, render the live dashboard instead of step list
  if (scenario === 'launched') {
    return (
      <>
        <div className="lp-header">
          <div className="lp-header-left">
            <div className="lp-crumb">
              <span>Launch</span>
              <Icons.ChevronRight size={9}/>
              <b>CMM_iOS_Q3_DACH</b>
            </div>
            <div className="lp-session-name">
              CMM_iOS_Q3_DACH_ABO_2026-05-12
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '1px 7px', background: 'var(--af-green-soft)', color: '#047857', borderRadius: 4, fontSize: 10.5, fontWeight: 700 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--af-green)' }}/>
                LIVE
              </span>
            </div>
          </div>
          <ProgressDots activeIdx={6} doneCount={6}/>
          <div className="lp-header-right">
            <div className="lp-balance">Balance <b>$1,847.32</b></div>
            <div className="lp-avatar">DK</div>
          </div>
        </div>
        <div className="lp-body">
          <LaunchChat scenario="launched"/>
          <div className="lp-body-divider"/>
          <div className="lp-pipeline">
            <LaunchSteps.Step7Launched/>
          </div>
        </div>
      </>
    );
  }

  // Launching overlay scenario
  if (scenario === 'launching') {
    return (
      <>
        <div className="lp-header">
          <div className="lp-header-left">
            <div className="lp-crumb"><span>Launch</span><Icons.ChevronRight size={9}/><b>New campaign</b></div>
            <div className="lp-session-name">
              CMM_iOS_Q3_DACH_ABO_2026-05-12
              <button className="lp-session-edit"><Icons.Edit size={11}/></button>
            </div>
          </div>
          <ProgressDots activeIdx={5} doneCount={6}/>
          <div className="lp-header-right">
            <div className="lp-balance">Balance <b>$1,847.32</b></div>
            <div className="lp-avatar">DK</div>
            <button className="lp-launch-btn" disabled>
              <Icons.Refresh size={14} style={{ animation: 'lp-spin 1s linear infinite' }}/>
              Launching…
            </button>
          </div>
        </div>
        <div className="lp-body">
          <LaunchChat scenario="launching"/>
          <div className="lp-body-divider"/>
          <div className="lp-pipeline" style={{ position: 'relative' }}>
            {STEPS.map((_, i) => (
              <StepShell key={i} idx={i} state="done"/>
            ))}
            <div className="lp-launching-overlay">
              <div className="lp-launching-spinner"/>
              <div className="lp-launching-title">Launching campaign on Meta…</div>
              <div className="lp-launching-sub">Creating 1 campaign, 4 adsets, 7 ads · usually 30–60s</div>
              <div className="lp-launching-bar"><i/></div>
              <div className="lp-launching-progress-text">Step 3 of 5 · creating adsets (3 of 4) · 00:24 elapsed</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Normal step-by-step scenarios
  const launchEnabled = scenario === 'review';
  return (
    <>
      <div className="lp-header">
        <div className="lp-header-left">
          <div className="lp-crumb">
            <span>Launch</span>
            <Icons.ChevronRight size={9}/>
            <b>{scenario === 'context' ? 'New campaign' : 'CMM_iOS_Q3_DACH'}</b>
          </div>
          <div className="lp-session-name">
            {scenario === 'context' ? 'Untitled campaign' : 'CMM_iOS_Q3_DACH_ABO_2026-05-12'}
            <button className="lp-session-edit"><Icons.Edit size={11}/></button>
          </div>
        </div>
        <ProgressDots activeIdx={activeIdx} doneCount={doneCount}/>
        <div className="lp-header-right">
          <div className="lp-balance">Balance <b>$1,847.32</b></div>
          <div className="lp-avatar">DK</div>
          <button className={`lp-launch-btn ${launchEnabled ? 'green' : ''}`} disabled={!launchEnabled}>
            <Icons.Bolt size={14}/> Launch campaign
          </button>
        </div>
      </div>
      <div className="lp-body">
        <LaunchChat scenario={scenario}/>
        <div className="lp-body-divider"/>
        <div className="lp-pipeline">
          {STEPS.map((s, i) => {
            const state = i < doneCount ? 'done' : i === activeIdx ? 'active' : 'pending';
            let body = null;
            if (state === 'active') {
              if (s.key === 'context')  body = <LaunchSteps.Step1Context filled={filledFor(0)}/>;
              if (s.key === 'campaign') body = <LaunchSteps.Step2Campaign filled={filledFor(1)}/>;
              if (s.key === 'adsets')   body = <LaunchSteps.Step3Adsets filled={filledFor(2)}/>;
              if (s.key === 'ads')      body = <LaunchSteps.Step4Ads filled={filledFor(3)}/>;
              if (s.key === 'rules')    body = <LaunchSteps.Step5Rules filled={filledFor(4)}/>;
              if (s.key === 'review')   body = <LaunchSteps.Step6Review/>;
            }
            return <StepShell key={s.key} idx={i} state={state}>{body}</StepShell>;
          })}
        </div>
      </div>
    </>
  );
}

window.LaunchPipeline = LaunchPipeline;
