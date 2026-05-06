// Panel.jsx — right campaign workbench panel (Campaign · Adsets · Creatives)
const { Icons } = window;

// ───── Sample data factory (deterministic for demo) ─────
const GEO_OPTIONS = ['US', 'CA', 'US + CA', 'GB', 'AU', 'DE', 'FR'];
const PLACEMENTS = ['Facebook Feed', 'Instagram Feed', 'Reels', 'Stories', 'Audience Network', 'Messenger'];
const PLATFORMS = ['Web', 'iOS', 'Android'];

function genAdsets(count = 11) {
  const ages = [
    [21, 35], [25, 45], [21, 65], [18, 24], [25, 34], [35, 54],
    [45, 65], [25, 65], [18, 65], [30, 50], [21, 45]
  ];
  const geos = ['US + CA', 'US', 'CA', 'US + CA', 'US', 'CA', 'US + CA', 'US', 'US + CA', 'CA', 'US + CA'];
  const audiences = ['Advantage+', 'Advantage+', 'Lookalike 1%', 'Custom · Subscribers', 'Advantage+',
                     'Lookalike 2%', 'Interests · Health', 'Advantage+', 'Custom · LTV', 'Advantage+', 'Lookalike 3%'];
  return Array.from({ length: count }).map((_, i) => {
    const idx = String(i + 1).padStart(2, '0');
    const ageMin = ages[i % ages.length][0];
    const ageMax = ages[i % ages.length][1];
    return {
      id: `as_${600 + i}`,
      name: `CheckMyMeal_Quiz_3_Web_ABO_US+CA_${ageMin}+_autobid_Subscription_v${idx}`,
      taskId: `s${619 + i}`,
      enabled: true,
      budget: 120,
      currency: 'USD',
      geo: geos[i] || 'US + CA',
      platform: i % 3 === 0 ? 'Web' : i % 3 === 1 ? 'iOS' : 'Android',
      placements: ['Facebook Feed', 'Instagram Feed', 'Reels'],
      ageMin, ageMax,
      gender: 'All',
      audience: audiences[i],
      schedule: 'Run continuously from Apr 28, 2026',
      optimization: 'OFFSITE_CONVERSIONS',
      event: 'SUBSCRIBE',
      bidStrategy: 'LOWEST_COST_WITHOUT_CAP',
      attribution: '7d click + 1d view',
      pixel: '2611674264135259',
      creatives: 4 + (i % 3),
    };
  });
}

const SAMPLE_CREATIVES = [
  { headline: 'Track your meals in seconds', text: 'AI-powered nutrition coach that fits any diet. Start a 7-day free trial.', cta: 'Subscribe', media: 'video', tag: '0:15' },
  { headline: 'Lose weight without dieting', text: 'Personalized meal plans based on your goals, preferences, and schedule.', cta: 'Get Offer', media: 'image' },
  { headline: 'What\'s really in your food?', text: 'Scan any product to see hidden sugars, additives, and processing scores.', cta: 'Subscribe', media: 'image' },
  { headline: '1M+ meals tracked daily', text: 'Join the smartest food tracking community. Free for the first week.', cta: 'Sign Up', media: 'video', tag: '0:09' },
  { headline: 'Your nutritionist in your pocket', text: 'Real-time AI feedback on every meal. Backed by registered dietitians.', cta: 'Subscribe', media: 'image' },
  { headline: 'Take a 60-second food quiz', text: 'Get a personalized plan that fits your body and lifestyle.', cta: 'Take Quiz', media: 'image' },
];

// ───── Section header ─────
function SectionHead({ num, icon: Ico, title, count, right }) {
  return (
    <div className="af-section-head">
      <div className="af-section-title">
        {num != null && <span className="af-section-title-num">{num}</span>}
        {Ico && <Ico size={14} style={{ color: 'var(--af-text-2)' }}/>}
        <span>{title}</span>
        {count != null && <span className="af-tag gray">{count}</span>}
      </div>
      {right}
    </div>
  );
}

// ───── Field row ─────
function Field({ label, required, children, hint }) {
  return (
    <div className="af-field-row">
      <label className="af-field-label">
        {label} {required && <span className="af-req">*</span>}
        {hint && <span style={{ display: 'block', fontWeight: 400, color: 'var(--af-text-muted)', fontSize: 10.5 }}>{hint}</span>}
      </label>
      <div>{children}</div>
    </div>
  );
}

function Segmented({ options, value, onChange }) {
  return (
    <div className="af-segmented">
      {options.map((o) => (
        <button key={o} className={value === o ? 'active' : ''} onClick={() => onChange(o)}>{o}</button>
      ))}
    </div>
  );
}

// ───── Adset card ─────
function AdsetCard({ adset, open, onToggle, onChange, beingEdited }) {
  return (
    <div className={`af-adset ${open ? 'open' : ''} ${beingEdited ? 'editing-by-agent' : ''}`}>
      <div className="af-adset-head" onClick={onToggle}>
        <div className="af-adset-chev"><Icons.ChevronRight size={14}/></div>
        <div style={{ minWidth: 0 }}>
          <div className="af-adset-name">{adset.name}</div>
          <div className="af-adset-sub">
            <span><Icons.Wallet size={11}/> ${adset.budget}/day</span>
            <span>·</span>
            <span><Icons.Globe size={11}/> {adset.geo}</span>
            <span>·</span>
            <span><Icons.Users size={11}/> {adset.ageMin}–{adset.ageMax} {adset.gender}</span>
            <span>·</span>
            <span><Icons.Image size={11}/> {adset.creatives} creatives</span>
          </div>
        </div>
        <div className="af-adset-summary">
          <span className="af-tag green">Draft</span>
          <span className={`af-toggle green ${adset.enabled ? 'on' : ''}`} onClick={(e) => { e.stopPropagation(); onChange({ enabled: !adset.enabled }); }}/>
        </div>
      </div>
      {open && (
        <div className="af-adset-body">
          <Field label="Бюджет" required>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--af-text-3)', fontSize: 12 }}>$</span>
                <input className="af-input" style={{ paddingLeft: 22 }} value={adset.budget} onChange={(e) => onChange({ budget: +e.target.value || 0 })}/>
              </div>
              <select className="af-select" style={{ width: 90 }} defaultValue="daily">
                <option value="daily">/ day</option>
                <option value="lifetime">lifetime</option>
              </select>
            </div>
          </Field>
          <Field label="Гео" required>
            <select className="af-select" value={adset.geo} onChange={(e) => onChange({ geo: e.target.value })}>
              {GEO_OPTIONS.map(g => <option key={g}>{g}</option>)}
            </select>
          </Field>
          <Field label="Платформа">
            <Segmented options={PLATFORMS} value={adset.platform} onChange={(v) => onChange({ platform: v })}/>
          </Field>
          <Field label="Возраст">
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <input className="af-input" style={{ width: 60 }} value={adset.ageMin} onChange={(e) => onChange({ ageMin: +e.target.value || 18 })}/>
              <span style={{ color: 'var(--af-text-3)' }}>–</span>
              <input className="af-input" style={{ width: 60 }} value={adset.ageMax} onChange={(e) => onChange({ ageMax: +e.target.value || 65 })}/>
              <select className="af-select" style={{ flex: 1 }} value={adset.gender} onChange={(e) => onChange({ gender: e.target.value })}>
                <option>All</option><option>Male</option><option>Female</option>
              </select>
            </div>
          </Field>
          <Field label="Аудитория">
            <select className="af-select" value={adset.audience} onChange={(e) => onChange({ audience: e.target.value })}>
              <option>Advantage+</option>
              <option>Lookalike 1%</option>
              <option>Lookalike 2%</option>
              <option>Lookalike 3%</option>
              <option>Custom · Subscribers</option>
              <option>Custom · LTV</option>
              <option>Interests · Health</option>
            </select>
          </Field>
          <Field label="Расписание">
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, color: 'var(--af-text-2)' }}>
              <Icons.Calendar size={13}/>
              <span style={{ flex: 1 }}>{adset.schedule}</span>
              <button className="af-btn ghost sm">Изменить</button>
            </div>
          </Field>
          <div className="span-2">
            <div className="af-field-label" style={{ marginBottom: 6 }}>Плейсменты</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {PLACEMENTS.map(p => (
                <label key={p} className="af-checkbox">
                  <input type="checkbox" defaultChecked={adset.placements.includes(p)}/>
                  {p}
                </label>
              ))}
            </div>
          </div>
          <div className="span-2" style={{ display: 'flex', gap: 6, justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid var(--af-border)' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <span className="af-tag gray"><Icons.Target size={10}/> {adset.optimization}</span>
              <span className="af-tag gray">Event: {adset.event}</span>
              <span className="af-tag gray">{adset.bidStrategy}</span>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <button className="af-btn sm"><Icons.Copy size={12}/> Дублировать</button>
              <button className="af-btn sm ghost"><Icons.Dots size={12}/></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ───── Creative card ─────
function CreativeCard({ creative, idx }) {
  const palettes = [
    ['#fef3c7', '#fbbf24'],
    ['#dbeafe', '#60a5fa'],
    ['#fae8ff', '#c084fc'],
    ['#dcfce7', '#4ade80'],
    ['#fee2e2', '#f87171'],
    ['#e0e7ff', '#818cf8'],
  ];
  const [c1, c2] = palettes[idx % palettes.length];
  return (
    <div className="af-creative">
      <div className="af-creative-media" style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}>
        <span className="af-media-pill">
          {creative.media === 'video' ? <Icons.Video size={9} style={{ marginRight: 3 }}/> : <Icons.Image size={9} style={{ marginRight: 3 }}/>}
          {creative.media === 'video' ? `Video · ${creative.tag || '0:15'}` : 'Image'}
        </span>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: 58, height: 58, borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: c2,
          }}>
            {creative.media === 'video' ? <Icons.Play size={22}/> : <Icons.Image size={22}/>}
          </div>
        </div>
      </div>
      <div className="af-creative-meta">
        <div className="af-creative-headline" contentEditable suppressContentEditableWarning>{creative.headline}</div>
        <div className="af-creative-text" contentEditable suppressContentEditableWarning>{creative.text}</div>
        <div className="af-creative-cta">
          <span className="af-creative-cta-btn">{creative.cta}</span>
          <button className="af-icon-btn" style={{ width: 22, height: 22 }}><Icons.Edit size={11}/></button>
        </div>
      </div>
    </div>
  );
}

// ───── Empty state ─────
function PanelEmpty() {
  return (
    <div className="af-hint-empty">
      <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--af-bg-muted)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--af-text-3)' }}>
        <Icons.Layers size={22}/>
      </div>
      <h4>Кампании пока нет</h4>
      <p>Опиши задачу в чате слева или используй чипы<br/>«Создать кампанию» / «Выбрать референс» — агент заполнит эту панель.</p>
    </div>
  );
}

// ───── Drafting skeleton ─────
function PanelSkeleton({ progress }) {
  return (
    <div>
      <div className="af-section">
        <div className="af-section-head">
          <div className="af-section-title">
            <span className="af-section-title-num">1</span>
            <Icons.Layers size={14} style={{ color: 'var(--af-text-2)' }}/>
            Кампания
            <span className="af-tag blue"><Icons.Sparkle size={10}/> Агент готовит</span>
          </div>
        </div>
        <div className="af-section-body">
          <div className="af-field-row"><div className="af-skel" style={{ height: 12, width: 80 }}/><div className="af-skel" style={{ height: 28, width: '60%' }}/></div>
          <div className="af-field-row"><div className="af-skel" style={{ height: 12, width: 80 }}/><div className="af-skel" style={{ height: 28, width: '40%' }}/></div>
          <div className="af-field-row"><div className="af-skel" style={{ height: 12, width: 80 }}/><div className="af-skel" style={{ height: 28, width: '30%' }}/></div>
        </div>
      </div>

      <div className="af-section">
        <div className="af-section-head">
          <div className="af-section-title">
            <span className="af-section-title-num">2</span>
            <Icons.Stack size={14} style={{ color: 'var(--af-text-2)' }}/>
            Адсеты
            <span className="af-tag blue"><Icons.Sparkle size={10}/> Создаю 11 / {Math.min(progress + 2, 11)}</span>
          </div>
        </div>
        <div className="af-section-body" style={{ paddingTop: 8 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="af-adset" style={{ opacity: i < progress ? 1 : 0.6 }}>
              <div className="af-adset-head">
                <div className="af-adset-chev"><Icons.ChevronRight size={14}/></div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  {i < progress ? (
                    <>
                      <div className="af-adset-name">CheckMyMeal_Quiz_3_Web_ABO_US+CA_…_v{String(i+1).padStart(2,'0')}</div>
                      <div className="af-adset-sub">
                        <span>$120/day</span><span>·</span><span>US + CA</span><span>·</span><span>21–35 All</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="af-skel" style={{ height: 11, width: '70%' }}/>
                      <div className="af-skel" style={{ height: 9, width: '40%', marginTop: 6 }}/>
                    </>
                  )}
                </div>
                {i < progress
                  ? <span className="af-tag green"><Icons.Check size={10}/> Готов</span>
                  : <div className="af-skel" style={{ width: 56, height: 18, borderRadius: 999 }}/>}
              </div>
            </div>
          ))}
          <div style={{ textAlign: 'center', color: 'var(--af-text-3)', fontSize: 12, marginTop: 8 }}>
            … ещё {Math.max(0, 11 - progress)} адсетов
          </div>
        </div>
      </div>

      <div className="af-section">
        <div className="af-section-head">
          <div className="af-section-title">
            <span className="af-section-title-num">3</span>
            <Icons.Image size={14} style={{ color: 'var(--af-text-2)' }}/>
            Креативы
            <span className="af-tag gray">Ожидание</span>
          </div>
        </div>
        <div className="af-section-body">
          <div className="af-creatives">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="af-creative">
                <div className="af-skel" style={{ aspectRatio: 1, borderRadius: 0 }}/>
                <div className="af-creative-meta">
                  <div className="af-skel" style={{ height: 11, width: '90%' }}/>
                  <div className="af-skel" style={{ height: 9, width: '70%' }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ───── Filled panel ─────
function PanelFilled({ adsets, openIdx, setOpenIdx, updateAdset, beingEdited }) {
  const totalBudget = adsets.reduce((s, a) => s + a.budget, 0);
  return (
    <div>
      <div className="af-section">
        <SectionHead
          num={1}
          icon={Icons.Layers}
          title="Кампания"
          right={<div style={{ display: 'flex', gap: 6 }}>
            <span className="af-tag green"><Icons.Sparkle size={10}/> Заполнено агентом</span>
          </div>}
        />
        <div className="af-section-body">
          <Field label="Название" required>
            <input className="af-input mono" defaultValue="Test_CheckMyMeal_Quiz_3_Web_ABO_US+CA_21+_autobid_Subscription"/>
          </Field>
          <Field label="Цель" required>
            <select className="af-select" defaultValue="Sales">
              <option>Sales</option><option>Leads</option><option>Traffic</option><option>Engagement</option><option>App Promotion</option>
            </select>
          </Field>
          <Field label="Тип бюджета">
            <Segmented options={['CBO', 'ABO']} value="ABO" onChange={() => {}}/>
          </Field>
          <Field label="Pixel" hint="Подтянут из ref-адсета">
            <input className="af-input mono" defaultValue="2611674264135259" readOnly/>
          </Field>
          <Field label="Атрибуция">
            <select className="af-select" defaultValue="7d click + 1d view">
              <option>7d click + 1d view</option><option>1d click</option><option>7d click</option>
            </select>
          </Field>
        </div>
      </div>

      <div className="af-section">
        <SectionHead
          num={2}
          icon={Icons.Stack}
          title="Адсеты"
          count={adsets.length}
          right={<div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span className="af-helper-text">Total: <strong style={{ color: 'var(--af-text)' }}>${totalBudget}/day</strong></span>
            <button className="af-btn sm"><Icons.Plus size={12}/> Добавить</button>
            <button className="af-btn sm ghost"><Icons.Filter size={12}/></button>
          </div>}
        />
        <div className="af-section-body" style={{ paddingTop: 8 }}>
          {adsets.map((a, i) => (
            <AdsetCard
              key={a.id}
              adset={a}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
              onChange={(patch) => updateAdset(i, patch)}
              beingEdited={beingEdited === i}
            />
          ))}
        </div>
      </div>

      <div className="af-section">
        <SectionHead
          num={3}
          icon={Icons.Image}
          title="Креативы"
          count={SAMPLE_CREATIVES.length}
          right={<div style={{ display: 'flex', gap: 6 }}>
            <button className="af-btn sm"><Icons.Plus size={12}/> Добавить</button>
            <button className="af-btn sm ghost"><Icons.Eye size={12}/> Превью</button>
          </div>}
        />
        <div className="af-section-body">
          <div className="af-creatives">
            {SAMPLE_CREATIVES.map((c, i) => <CreativeCard key={i} creative={c} idx={i}/>)}
          </div>
        </div>
      </div>
    </div>
  );
}

window.Panel = { PanelEmpty, PanelSkeleton, PanelFilled, genAdsets, SAMPLE_CREATIVES };
