// launch-steps.jsx — All 6 step bodies for FB Agent Launch
// Exports window.LaunchSteps = { Step1Context, Step2Campaign, Step3Adsets, Step4Ads, Step5Rules, Step6Review, Step7Launched }
const { Icons } = window;

/* ────────────────────────────  STEP 1 · CONTEXT  ──────────────────────────── */
function Step1Context({ filled }) {
  return (
    <div>
      <div className="lp-block">
        <div className="lp-block-title">Traffic destination</div>
        <div className="lp-traffic-row">
          <div className={`lp-traffic-card ${filled ? 'active' : ''}`}>
            <div className="lp-traffic-card-icon"><Icons.Box size={18}/></div>
            <div className="lp-traffic-card-name">App install</div>
            <div className="lp-traffic-card-desc">iOS or Android app via App Store / Play Store</div>
          </div>
          <div className="lp-traffic-card">
            <div className="lp-traffic-card-icon"><Icons.Globe size={18}/></div>
            <div className="lp-traffic-card-name">Web</div>
            <div className="lp-traffic-card-desc">Landing page, quiz funnel, or product URL</div>
          </div>
          <div className="lp-traffic-card">
            <div className="lp-traffic-card-icon"><Icons.Users size={18}/></div>
            <div className="lp-traffic-card-name">Lead form</div>
            <div className="lp-traffic-card-desc">Native Meta lead form</div>
          </div>
        </div>
      </div>

      <div className="lp-block">
        <div className="lp-block-title">Product & app</div>
        <div className="lp-form-row">
          <div>
            <div className="lp-field-label">
              <span>Product</span>
              <a className="from-settings" href="#">Manage in Settings →</a>
            </div>
            <select className="af-select" defaultValue={filled ? 'cmm' : ''}>
              <option value="">Select product…</option>
              <option value="cmm">CheckMyMeal</option>
              <option>Iceberg Labs</option>
              <option>Talefy</option>
            </select>
          </div>
          <div>
            <div className="lp-field-label">
              <span>iOS app</span>
              <a className="from-settings" href="#">From Meta connection</a>
            </div>
            <select className="af-select" defaultValue={filled ? 'cmm-ios' : ''}>
              <option value="">Select app…</option>
              <option value="cmm-ios">CheckMyMeal · iOS · 1448291023</option>
              <option>CheckMyMeal · Android</option>
            </select>
          </div>
        </div>
      </div>

      <div className="lp-block">
        <div className="lp-block-title">Funnel & deep link</div>
        <div className="lp-form-row">
          <div>
            <div className="lp-field-label"><span>Funnel</span></div>
            <select className="af-select" defaultValue={filled ? 'q3' : ''}>
              <option value="">Pick funnel…</option>
              <option value="q3">Quiz #3 — paywall after Q4</option>
              <option>Quiz #2 — single-step paywall</option>
              <option>Direct to subscribe</option>
            </select>
          </div>
          <div>
            <div className="lp-field-label">
              <span>Deep link</span>
              <a className="from-settings" href="#">From Settings · Deep links</a>
            </div>
            <select className="af-select" defaultValue={filled ? 'cmm-quiz' : ''}>
              <option value="">Pick deep link…</option>
              <option value="cmm-quiz">cmm://quiz/start (Universal)</option>
              <option>cmm://paywall</option>
            </select>
          </div>
        </div>
        {filled && (
          <div className="lp-hint">
            <Icons.Info size={13}/>
            <span>Pixel <b>CMM iOS Pixel · 8847221033500</b> auto-attached from Settings · Meta Connection. Conversion event will default to <b>Subscribe</b>.</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────  STEP 2 · CAMPAIGN  ──────────────────────────── */
function Step2Campaign({ filled }) {
  return (
    <div>
      {filled && (
        <div className="lp-applied-banner">
          <Icons.CheckCircle size={14}/>
          <span><b>Template applied:</b> CheckMyMeal · App iOS · DACH · ABO &nbsp;·&nbsp; All campaign-level fields prefilled. Edit any of them below.</span>
          <a className="lp-link-btn" style={{ marginLeft: 'auto' }}>Detach template</a>
        </div>
      )}

      <div className="lp-block">
        <div className="lp-block-title">{filled ? 'Currently applied template' : 'Start from a saved template'}</div>
        <div className="lp-tpl-row">
          <div className={`lp-tpl-card ${filled ? 'applied' : ''}`}>
            <div className="lp-tpl-head">
              <span className="lp-tpl-tag ios">iOS</span>
              {filled && <span className="lp-tpl-applied-pill"><Icons.Check size={9}/> Applied</span>}
            </div>
            <div className="lp-tpl-name">CheckMyMeal · App iOS · DACH · ABO</div>
            <div className="lp-tpl-meta">
              <span>ABO · $80/d · DE / AT / CH</span>
              <span>22–45 · Advantage+ placements</span>
            </div>
            <div className="lp-tpl-foot">
              <span className="last">Last used yesterday</span>
              {!filled && <span className="use">Use →</span>}
            </div>
          </div>
          <div className="lp-tpl-card">
            <div className="lp-tpl-head"><span className="lp-tpl-tag ios">iOS</span></div>
            <div className="lp-tpl-name">CheckMyMeal · App iOS · UK · Scaling</div>
            <div className="lp-tpl-meta">
              <span>CBO · $250/d · UK / IE</span>
              <span>21–50 · Advantage+ placements</span>
            </div>
            <div className="lp-tpl-foot">
              <span className="last">Last used 2 wks ago</span>
              <span className="use">Use →</span>
            </div>
          </div>
          <div className="lp-tpl-card">
            <div className="lp-tpl-head"><span className="lp-tpl-tag web">WEB</span></div>
            <div className="lp-tpl-name">CheckMyMeal · Web · Quiz Funnel · CBO</div>
            <div className="lp-tpl-meta">
              <span>CBO · $200/d · US / CA / UK</span>
              <span>25–55 · Advantage+ placements</span>
            </div>
            <div className="lp-tpl-foot">
              <span className="last">Last used 2h ago</span>
              <span className="use">Use →</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lp-or-divider"><span><a>Browse all 6 templates</a> · <a>or skip to manual setup</a></span></div>

      <div className="lp-block">
        <div className="lp-block-title">Campaign details</div>
        <div className="lp-form-grid">
          <div className="full">
            <div className="lp-field-label"><span>Campaign name</span><span style={{ color: 'var(--af-text-3)', fontSize: 11 }}>Auto-generated from template + date</span></div>
            <input className="af-input" defaultValue={filled ? 'CMM_iOS_Q3_DACH_ABO_2026-05-12' : ''} placeholder="e.g. CMM_iOS_Q3_DACH_ABO_2026-05-12"/>
          </div>
          <div>
            <div className="lp-field-label"><span>Objective</span></div>
            <select className="af-select" defaultValue="app">
              <option value="app">App promotion · Install</option>
              <option>Sales · Purchase</option>
              <option>Leads · Form</option>
            </select>
          </div>
          <div>
            <div className="lp-field-label"><span>Budget mode</span></div>
            <div className="lp-attr-radios">
              <label className={filled ? 'active' : ''}><span className="dot"/> ABO (per adset)</label>
              <label><span className="dot"/> CBO (campaign)</label>
            </div>
          </div>
          <div>
            <div className="lp-field-label"><span>Performance goal</span></div>
            <select className="af-select" defaultValue={filled ? 'install' : ''}>
              <option value="">Pick goal…</option>
              <option value="install">Maximize app installs</option>
              <option>Maximize purchases</option>
              <option>Lowest cost per install</option>
            </select>
          </div>
          <div>
            <div className="lp-field-label"><span>Attribution window</span></div>
            <select className="af-select" defaultValue="7d-1d">
              <option value="7d-1d">7-day click · 1-day view</option>
              <option>1-day click</option>
              <option>7-day click</option>
            </select>
          </div>
          <div>
            <div className="lp-field-label"><span>Bid strategy</span></div>
            <select className="af-select" defaultValue="lowest">
              <option value="lowest">Highest volume (lowest cost)</option>
              <option>Cost per result goal</option>
              <option>Bid cap</option>
            </select>
          </div>
          <div>
            <div className="lp-field-label"><span>Spend limit (daily, total)</span></div>
            <input className="af-input" defaultValue={filled ? '$100' : ''} placeholder="No limit"/>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────  STEP 3 · ADSETS  ──────────────────────────── */
function Step3Adsets({ filled, expandedIdx = 0 }) {
  const adsets = filled ? [
    { name: 'CMM_iOS_Q3_DACH_DE_25-44',  budget: '$30/d', geo: 'DE',     age: '25–44', size: '~3.2M',  expanded: true },
    { name: 'CMM_iOS_Q3_DACH_AT_25-44',  budget: '$15/d', geo: 'AT',     age: '25–44', size: '~480K',  expanded: false },
    { name: 'CMM_iOS_Q3_DACH_CH_25-44',  budget: '$20/d', geo: 'CH',     age: '25–44', size: '~620K',  expanded: false },
    { name: 'CMM_iOS_Q3_DACH_AT-CH_18-24', budget: '$15/d', geo: 'AT, CH', age: '18–24', size: '~310K',  expanded: false },
  ] : [];

  return (
    <div>
      <div className="lp-adsets-head">
        <span className="total"><b>{adsets.length} adsets</b> · $80 / day total · est. reach <b>~4.6M</b></span>
        <div style={{ flex: 1 }}/>
        <button className="af-btn sm"><Icons.Layers size={11}/> Split by age band</button>
        <button className="af-btn sm"><Icons.Plus size={11}/> Add adset</button>
      </div>

      {adsets.map((a, i) => (
        <div key={a.name} className={`lp-adset ${a.expanded ? 'expanded' : ''}`}>
          <div className="lp-adset-row">
            <span className="lp-adset-cb checked"><Icons.Check size={9}/></span>
            <span style={{ width: 18, height: 18, borderRadius: 4, background: ['#dbeafe','#fef3c7','#dcfce7','#fce7f3'][i], color: ['#1e40af','#92400e','#047857','#9d174d'][i], display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>{i+1}</span>
            <span className="lp-adset-name">{a.name}</span>
            <span className="lp-adset-meta">{a.geo}</span>
            <span className="lp-adset-meta">{a.age}</span>
            <span className="lp-adset-meta"><b>{a.budget}</b></span>
            <span className="lp-adset-meta">{a.size}</span>
            <span className="lp-step-chev"><Icons.ChevronRight size={14}/></span>
          </div>
          {a.expanded && <Step3AdsetBody/>}
        </div>
      ))}

      <div className="lp-bulk-bar">
        <span className="lp-bulk-label">Bulk actions</span>
        <button className="af-btn sm">Set budget…</button>
        <button className="af-btn sm">Add geo to all…</button>
        <button className="af-btn sm">Duplicate selected</button>
        <button className="af-btn sm">Delete selected</button>
      </div>
    </div>
  );
}

function Step3AdsetBody() {
  return (
    <div className="lp-adset-body">
      <div>
        <div className="lp-field-label"><span>Daily budget</span></div>
        <div style={{ display: 'flex', gap: 4 }}>
          <input className="af-input" defaultValue="30" style={{ width: 80 }}/>
          <select className="af-select" defaultValue="usd" style={{ width: 80 }}>
            <option value="usd">USD</option>
            <option>EUR</option>
          </select>
        </div>
      </div>
      <div>
        <div className="lp-field-label"><span>Schedule</span></div>
        <select className="af-select" defaultValue="ongoing">
          <option value="ongoing">Run continuously</option>
          <option>Set start &amp; end date</option>
        </select>
      </div>
      <div>
        <div className="lp-field-label"><span>Optimization event</span></div>
        <select className="af-select" defaultValue="install">
          <option value="install">App install</option>
          <option>Subscribe</option>
          <option>Trial start</option>
        </select>
      </div>

      <div className="span2">
        <div className="lp-field-label"><span>Geos</span><span style={{ fontSize: 11, color: 'var(--af-text-3)' }}>1 country</span></div>
        <div className="lp-tag-input">
          <span className="af-tag blue">Germany ✕</span>
          <span className="add">+ add country, region or city</span>
        </div>
      </div>
      <div>
        <div className="lp-field-label"><span>Languages</span></div>
        <div className="lp-tag-input">
          <span className="af-tag">German ✕</span>
          <span className="add">+ add</span>
        </div>
      </div>

      <div>
        <div className="lp-field-label"><span>Age</span></div>
        <div className="lp-age-input">
          <input className="af-input" defaultValue="25"/>
          <span className="dash">—</span>
          <input className="af-input" defaultValue="44"/>
        </div>
      </div>
      <div>
        <div className="lp-field-label"><span>Gender</span></div>
        <select className="af-select" defaultValue="all">
          <option value="all">All</option>
          <option>Female</option>
          <option>Male</option>
        </select>
      </div>
      <div>
        <div className="lp-field-label"><span>Detailed targeting</span><a className="lp-link-btn" style={{ fontSize: 11 }}>Use saved audience</a></div>
        <select className="af-select" defaultValue="open">
          <option value="open">Open · Advantage+ audience</option>
          <option>Saved: CMM lookalike 1%</option>
          <option>Saved: Quiz funnel retargeting</option>
        </select>
      </div>

      <div className="full">
        <div className="lp-field-label"><span>Placements</span></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
          <div className="lp-attr-radios">
            <label className="active"><span className="dot"/> Advantage+ Placements</label>
            <label><span className="dot"/> Manual</label>
          </div>
          <span style={{ fontSize: 11, color: 'var(--af-text-3)' }}>Recommended for App Install · Meta optimizes across surfaces</span>
        </div>
        <div className="lp-placement-grid">
          <label><input type="checkbox" defaultChecked/> Facebook Feed</label>
          <label><input type="checkbox" defaultChecked/> Instagram Feed</label>
          <label><input type="checkbox" defaultChecked/> Reels</label>
          <label><input type="checkbox" defaultChecked/> Stories</label>
          <label><input type="checkbox" defaultChecked/> Audience Network</label>
          <label><input type="checkbox"/> Messenger</label>
        </div>
      </div>

      <div className="lp-adset-foot">
        <button className="lp-ghost-btn"><Icons.Copy size={11}/> Duplicate</button>
        <button className="lp-ghost-btn"><Icons.X size={11}/> Delete</button>
      </div>
    </div>
  );
}

/* ────────────────────────────  STEP 4 · ADS  ──────────────────────────── */
function Step4Ads({ filled }) {
  const ads = [
    { kind: 'k1', type: 'Video', headline: 'Stop guessing what to eat. Get a meal plan that actually fits your goals.', primary: 'Take the 60-second quiz — answer 8 questions and CheckMyMeal builds your full week of meals around your fitness goal, allergies, and how much time you have to cook.', cta: 'Install Now', name: 'q3_video_hook_v3', status: 'active', adsetCount: 4 },
    { kind: 'k2', type: 'Image', headline: 'Built for athletes. Tailored to your macros.', primary: 'Tell us your training day, get a meal plan that hits your protein, carbs, and recovery window — every day, automatically.', cta: 'Get App', name: 'q3_static_athletes', status: 'active', adsetCount: 4 },
    { kind: 'k3', type: 'Video', headline: 'Not another diet app. A real meal planner.', primary: 'See how CheckMyMeal builds you a week of meals in 60 seconds — based on your goal, your fridge, and how much time you have.', cta: 'Install Now', name: 'q3_video_demo', status: 'active', adsetCount: 4 },
    { kind: 'k4', type: 'Carousel', headline: '5 meals · 5 minutes · all hitting your macros', primary: 'Quick meals don\'t have to mean compromising on your goals. Swipe through five 5-minute meals built around your training day.', cta: 'See Meals', name: 'q3_carousel_5min', status: 'active', adsetCount: 4 },
    { kind: 'k5', type: 'Video', headline: 'The meal planner that actually understands fitness.', primary: 'No "eat clean" platitudes. Just a meal plan that respects your training schedule, your taste, and your time.', cta: 'Try Free', name: 'q3_video_fitness', status: 'review', adsetCount: 4 },
    { kind: 'k6', type: 'Image', headline: 'Your trainer planned the workout. Now plan the meals.', primary: 'Sync with your training app — CheckMyMeal builds the meals around your schedule, automatically.', cta: 'Install', name: 'q3_static_trainer', status: 'active', adsetCount: 4 },
  ];

  return (
    <div>
      <div className="lp-ads-tabs">
        <button className="lp-ads-tab active">All adsets <span className="count">7</span></button>
        <button className="lp-ads-tab">DE <span className="count">7</span></button>
        <button className="lp-ads-tab">AT <span className="count">7</span></button>
        <button className="lp-ads-tab">CH <span className="count">7</span></button>
        <button className="lp-ads-tab">AT+CH 18–24 <span className="count">7</span></button>
      </div>

      <div className="lp-ads-bulk">
        <span style={{ fontSize: 11.5, color: 'var(--af-text-2)' }}><b>{ads.length} ads</b> selected for all 4 adsets</span>
        <div style={{ flex: 1 }}/>
        <button className="af-btn sm"><Icons.Plus size={11}/> Add from Library</button>
        <button className="af-btn sm"><Icons.Sparkle size={11}/> Generate variants</button>
        <button className="af-btn sm"><Icons.Wand size={11}/> Translate copy…</button>
      </div>

      <div className="lp-ads-grid">
        {ads.map((a, i) => (
          <div key={a.name} className="lp-ad-card">
            <div className={`lp-ad-thumb ${a.kind}`}>
              <div className="copy">
                <small>{a.type === 'Video' ? '▶ Video · 0:24' : a.type === 'Carousel' ? '◀▶ Carousel · 5 cards' : 'Static'}</small>
                <h5>{a.headline.slice(0, 48)}{a.headline.length > 48 ? '…' : ''}</h5>
              </div>
              {a.type === 'Video' && (
                <div className="lp-ad-thumb-play"><Icons.Play size={18}/></div>
              )}
              <div className="lp-ad-thumb-actions">
                <button className="lp-ad-thumb-btn"><Icons.Eye size={11}/></button>
                <button className="lp-ad-thumb-btn"><Icons.Edit size={11}/></button>
                <button className="lp-ad-thumb-btn"><Icons.X size={11}/></button>
              </div>
              <div className="lp-ad-thumb-type">
                {a.type === 'Video' && <Icons.Video size={10}/>}
                {a.type === 'Image' && <Icons.Image size={10}/>}
                {a.type === 'Carousel' && <Icons.Layers size={10}/>}
                {a.type}
              </div>
            </div>

            <div className="lp-ad-body">
              <div className="lp-ad-headline">{a.headline}</div>
              <div className="lp-ad-text">{a.primary}</div>

              <div className="lp-ad-field-grid">
                <div className="lp-ad-field">
                  <span className="lp-ad-field-label">Ad name</span>
                  <span className="lp-ad-field-value" title={a.name}>{a.name}</span>
                </div>
                <div className="lp-ad-field">
                  <span className="lp-ad-field-label">Used in</span>
                  <span className="lp-ad-field-value">{a.adsetCount} adsets</span>
                </div>
              </div>

              <div className="lp-ad-foot">
                <span className="lp-ad-cta">{a.cta} →</span>
                {a.status === 'active'
                  ? <span className="lp-pill-active"><Icons.Check size={9}/> Approved</span>
                  : <span className="lp-pill-review">In review</span>}
              </div>
            </div>
          </div>
        ))}

        <div className="lp-ad-card" style={{ borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', minHeight: 360, gap: 10, color: 'var(--af-text-3)', cursor: 'pointer' }}>
          <Icons.Plus size={28}/>
          <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--af-text-2)' }}>Add from Asset Library</div>
          <div style={{ fontSize: 11, color: 'var(--af-text-3)', textAlign: 'center', maxWidth: 180 }}>Or drop a file here · MP4, MOV, JPG, PNG up to 4GB</div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────  STEP 5 · RULES  ──────────────────────────── */
function Step5Rules({ filled }) {
  const rules = filled ? [
    { on: true,  name: 'Pause low ROAS · Web Quiz',          sub: 'Stop bleeding adsets after 3 days of poor return',     action: 'pause', actionLabel: 'Pause adset',    cond: '<b>ROAS</b> &lt; 1.2 <i>AND</i> <b>Spend</b> &gt; $80' },
    { on: false, name: 'Frequency cap · Retargeting',         sub: 'Avoid burning warm audiences',                         action: 'pause', actionLabel: 'Pause adset',    cond: '<b>Frequency</b> &gt; 4.0' },
    { on: true,  name: 'Decrease budget on overspend',        sub: 'Catch runaway spend before EOD',                       action: 'dec',   actionLabel: '−15% budget',    cond: '<b>Spend</b> &gt; 130% planned' },
    { on: true,  name: 'Scale winners +20% · iOS',            sub: 'Bump CBO budget when CPI is on target',                action: 'inc',   actionLabel: '+20% budget',    cond: '<b>CPI</b> &lt; $4.50 <i>AND</i> <b>Installs</b> &gt; 30' },
    { on: false, name: 'Restart paused after CPM drop',       sub: 'Take advantage of cheap inventory windows',            action: 'start', actionLabel: 'Resume adset',   cond: '<b>CPM</b> &lt; $8' },
  ] : [];

  return (
    <div>
      <div className="lp-rules-hint">
        <Icons.Bolt size={13} style={{ display: 'inline-block', verticalAlign: '-2px', marginRight: 4 }}/>
        Rules from <b>Settings · Automation Rules</b>. Toggle which apply to <b>this</b> campaign — the agent suggested 3 based on its type. <a>Create a campaign-only rule…</a>
      </div>

      <div className="lp-rule-list">
        {rules.map((r) => (
          <div key={r.name} className={`lp-rule-list-row ${r.on ? '' : 'disabled'}`}>
            <div className={`af-toggle green ${r.on ? 'on' : ''}`}/>
            <div>
              <div className="name">{r.name}</div>
              <div className="sub">{r.sub}</div>
            </div>
            <span className={`lp-action-badge ${r.action}`}>
              {r.action === 'pause' && <Icons.Pause size={9}/>}
              {r.action === 'inc' && <span style={{ fontSize: 11, fontWeight: 700 }}>↑</span>}
              {r.action === 'dec' && <span style={{ fontSize: 11, fontWeight: 700 }}>↓</span>}
              {r.action === 'start' && <Icons.Play size={9}/>}
              {r.actionLabel}
            </span>
            <span className="lp-formula" dangerouslySetInnerHTML={{ __html: r.cond }}/>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────  STEP 6 · REVIEW  ──────────────────────────── */
function Step6Review() {
  return (
    <div>
      <div className="lp-summary-grid">
        <div className="lp-summary-card">
          <span className="lp-summary-label">Daily budget</span>
          <span className="lp-summary-value">$80</span>
          <span className="lp-summary-detail">≈ $2,400 / month</span>
        </div>
        <div className="lp-summary-card">
          <span className="lp-summary-label">Adsets</span>
          <span className="lp-summary-value">4</span>
          <span className="lp-summary-detail">DE · AT · CH · AT+CH 18–24</span>
        </div>
        <div className="lp-summary-card">
          <span className="lp-summary-label">Ads</span>
          <span className="lp-summary-value">7</span>
          <span className="lp-summary-detail">5 video · 1 image · 1 carousel</span>
        </div>
        <div className="lp-summary-card">
          <span className="lp-summary-label">Automation rules</span>
          <span className="lp-summary-value">3</span>
          <span className="lp-summary-detail">Pause · Decrease · Scale</span>
        </div>
      </div>

      <div className="lp-review-block">
        <div className="lp-review-block-head">
          <span className="lp-review-block-title">Connections</span>
          <a className="lp-link-btn">Edit in Step 1 →</a>
        </div>
        <div className="lp-conn-row">
          <div className="lp-conn-item">
            <span className="lp-conn-icon"><Icons.Box size={14}/></span>
            <div className="lp-conn-meta"><span className="label">Ad account</span><span className="value">Iceberg US · Acquisition</span></div>
          </div>
          <div className="lp-conn-item">
            <span className="lp-conn-icon"><Icons.Stack size={14}/></span>
            <div className="lp-conn-meta"><span className="label">App</span><span className="value">CheckMyMeal · iOS</span></div>
          </div>
          <div className="lp-conn-item">
            <span className="lp-conn-icon"><Icons.Target size={14}/></span>
            <div className="lp-conn-meta"><span className="label">Pixel</span><span className="value">CMM iOS Pixel</span></div>
          </div>
          <div className="lp-conn-item">
            <span className="lp-conn-icon"><Icons.Globe size={14}/></span>
            <div className="lp-conn-meta"><span className="label">Deep link</span><span className="value">cmm://quiz/start</span></div>
          </div>
          <div className="lp-conn-item">
            <span className="lp-conn-icon"><Icons.Folder size={14}/></span>
            <div className="lp-conn-meta"><span className="label">Page</span><span className="value">@CheckMyMealApp</span></div>
          </div>
        </div>
      </div>

      <div className="lp-review-block">
        <div className="lp-review-block-head">
          <span className="lp-review-block-title">Adsets · 4</span>
          <a className="lp-link-btn">Edit in Step 3 →</a>
        </div>
        <table className="lp-review-table">
          <thead><tr>
            <th>Adset</th><th>Geo</th><th>Age</th><th>Audience size</th><th>Optimization</th><th style={{ textAlign: 'right' }}>Daily budget</th>
          </tr></thead>
          <tbody>
            <tr><td><b>CMM_iOS_Q3_DACH_DE_25-44</b></td><td>DE</td><td>25–44</td><td>~3.2M</td><td>App install</td><td style={{ textAlign: 'right', fontWeight: 600 }}>$30.00</td></tr>
            <tr><td><b>CMM_iOS_Q3_DACH_AT_25-44</b></td><td>AT</td><td>25–44</td><td>~480K</td><td>App install</td><td style={{ textAlign: 'right', fontWeight: 600 }}>$15.00</td></tr>
            <tr><td><b>CMM_iOS_Q3_DACH_CH_25-44</b></td><td>CH</td><td>25–44</td><td>~620K</td><td>App install</td><td style={{ textAlign: 'right', fontWeight: 600 }}>$20.00</td></tr>
            <tr><td><b>CMM_iOS_Q3_DACH_AT-CH_18-24</b></td><td>AT, CH</td><td>18–24</td><td>~310K</td><td>App install</td><td style={{ textAlign: 'right', fontWeight: 600 }}>$15.00</td></tr>
            <tr className="total"><td colSpan={5}>Daily total</td><td style={{ textAlign: 'right' }}>$80.00</td></tr>
          </tbody>
        </table>
      </div>

      <div className="lp-review-block">
        <div className="lp-review-block-head">
          <span className="lp-review-block-title">Creatives · 7</span>
          <a className="lp-link-btn">Edit in Step 4 →</a>
        </div>
        <div className="lp-creative-strip">
          {['k1','k2','k3','k4','k5','k6'].map((k, i) => (
            <div key={k} className={`lp-ad-thumb ${k}`}>
              <div className="copy">
                <small>{i % 2 === 0 ? 'Video' : i === 3 ? 'Carousel' : 'Static'}</small>
                <h5 style={{ fontSize: 11 }}>{['Stop guessing','Built for athletes','Real meal planner','5 meals · 5 min','Understands fitness','Trainer planned'][i]}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lp-review-block">
        <div className="lp-review-block-head">
          <span className="lp-review-block-title">Automation rules · 3 active</span>
          <a className="lp-link-btn">Edit in Step 5 →</a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 12.5 }}>
            <span className="lp-action-badge pause"><Icons.Pause size={9}/> Pause adset</span>
            <span>when</span>
            <span className="lp-formula" dangerouslySetInnerHTML={{ __html: '<b>ROAS</b> &lt; 1.2 <i>AND</i> <b>Spend</b> &gt; $80 <span style="color:#9ca3af">(3d)</span>' }}/>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 12.5 }}>
            <span className="lp-action-badge dec">↓ −15% budget</span>
            <span>when</span>
            <span className="lp-formula" dangerouslySetInnerHTML={{ __html: '<b>Spend</b> &gt; 130% planned <span style="color:#9ca3af">(1d)</span>' }}/>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 12.5 }}>
            <span className="lp-action-badge inc">↑ +20% budget</span>
            <span>when</span>
            <span className="lp-formula" dangerouslySetInnerHTML={{ __html: '<b>CPI</b> &lt; $4.50 <i>AND</i> <b>Installs</b> &gt; 30 <span style="color:#9ca3af">(1d)</span>' }}/>
          </div>
        </div>
      </div>

      <div className="lp-launch-block">
        <div className="lp-launch-block-text">
          <div className="lp-launch-block-title">Ready to launch on Meta</div>
          <div className="lp-launch-block-desc">
            We'll create the campaign, all 4 adsets, and submit 7 ads for review. Meta usually approves within 1–3 hours.
            You'll get a Slack ping in <b>#ads-team</b> when ads pass review and when first spend &gt; $20.
          </div>
        </div>
        <button className="lp-launch-btn" style={{ padding: '12px 22px', fontSize: 14 }}>
          <Icons.Bolt size={15}/> Launch campaign
        </button>
      </div>
    </div>
  );
}

/* ────────────────────────────  STEP 7 · LAUNCHED  ──────────────────────────── */
function Step7Launched() {
  return (
    <div>
      <div className="lp-launched-banner">
        <span className="lp-launched-banner-icon"><Icons.Check size={18}/></span>
        <div style={{ flex: 1 }}>
          <div className="lp-launched-banner-title">Campaign launched at 14:33 · Wed 12 May</div>
          <div className="lp-launched-banner-sub">Meta is reviewing 7 ads · usually 1–3h. You'll get a Slack ping when they pass.</div>
        </div>
        <button className="af-btn"><Icons.Eye size={12}/> View in Ads Manager</button>
      </div>

      <div className="lp-live-grid">
        <div className="lp-live-card live">
          <div className="lp-live-label">Spend (live)</div>
          <div className="lp-live-value">$3.42</div>
          <div className="lp-live-delta neutral">12 min since launch</div>
        </div>
        <div className="lp-live-card">
          <div className="lp-live-label">Impressions</div>
          <div className="lp-live-value">1,284</div>
          <div className="lp-live-delta up">CPM $2.66</div>
        </div>
        <div className="lp-live-card">
          <div className="lp-live-label">Installs</div>
          <div className="lp-live-value">2</div>
          <div className="lp-live-delta neutral">CPI $1.71 · early data</div>
        </div>
        <div className="lp-live-card">
          <div className="lp-live-label">Ads in review</div>
          <div className="lp-live-value">7 / 7</div>
          <div className="lp-live-delta neutral">All pending Meta approval</div>
        </div>
      </div>

      <div className="lp-review-block">
        <div className="lp-review-block-head">
          <span className="lp-review-block-title">Adsets · live</span>
          <span style={{ fontSize: 11.5, color: 'var(--af-text-3)' }}>Updated 8 sec ago</span>
        </div>
        <table className="lp-launched-table">
          <thead><tr>
            <th>Adset</th><th>Status</th><th>Budget</th><th>Spend</th><th>Impr.</th><th>Installs</th><th>CPI</th><th>ROAS</th><th></th>
          </tr></thead>
          <tbody>
            <tr>
              <td><b>CMM_iOS_Q3_DACH_DE_25-44</b></td>
              <td><span className="lp-status-badge learning">Learning</span></td>
              <td>$30.00</td>
              <td>$1.84</td>
              <td>612</td>
              <td>1</td>
              <td>$1.84</td>
              <td>—</td>
              <td><button className="lp-ghost-btn"><Icons.Pause size={11}/></button></td>
            </tr>
            <tr>
              <td><b>CMM_iOS_Q3_DACH_AT_25-44</b></td>
              <td><span className="lp-status-badge learning">Learning</span></td>
              <td>$15.00</td>
              <td>$0.92</td>
              <td>248</td>
              <td>0</td>
              <td>—</td>
              <td>—</td>
              <td><button className="lp-ghost-btn"><Icons.Pause size={11}/></button></td>
            </tr>
            <tr>
              <td><b>CMM_iOS_Q3_DACH_CH_25-44</b></td>
              <td><span className="lp-status-badge learning">Learning</span></td>
              <td>$20.00</td>
              <td>$0.66</td>
              <td>320</td>
              <td>1</td>
              <td>$0.66</td>
              <td>—</td>
              <td><button className="lp-ghost-btn"><Icons.Pause size={11}/></button></td>
            </tr>
            <tr>
              <td><b>CMM_iOS_Q3_DACH_AT-CH_18-24</b></td>
              <td><span className="lp-status-badge learning">Learning</span></td>
              <td>$15.00</td>
              <td>$0.00</td>
              <td>104</td>
              <td>0</td>
              <td>—</td>
              <td>—</td>
              <td><button className="lp-ghost-btn"><Icons.Pause size={11}/></button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="lp-launched-foot">
        <button className="af-btn"><Icons.Pause size={12}/> Pause campaign</button>
        <button className="af-btn"><Icons.Copy size={12}/> Duplicate</button>
        <button className="af-btn"><Icons.Bolt size={12}/> View rules</button>
        <button className="af-btn"><Icons.Save size={12}/> Save as template</button>
        <div style={{ flex: 1 }}/>
        <button className="af-btn primary"><Icons.Plus size={12}/> Launch another campaign</button>
      </div>
    </div>
  );
}

window.LaunchSteps = { Step1Context, Step2Campaign, Step3Adsets, Step4Ads, Step5Rules, Step6Review, Step7Launched };
