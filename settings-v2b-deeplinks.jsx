// settings-v2b-deeplinks.jsx — Deep Links section + Add Deep Link modal
const { Icons } = window;

function DeepLinksSection({ filled, hasApps, onAdd }) {
  if (!hasApps) {
    return (
      <div className="s2-empty">
        <div className="s2-empty-icon"><Icons.Layers size={18}/></div>
        <h4 className="s2-empty-title">No mobile apps detected in Meta</h4>
        <p className="s2-empty-text">
          Connect a mobile app inside your Meta Business Manager to start adding deep links.
          You can also add links manually now and connect the app later.
        </p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button className="af-btn">Open Meta Connection</button>
          <button className="af-btn primary" onClick={onAdd}><Icons.Plus size={13}/> Add link manually</button>
        </div>
      </div>
    );
  }
  if (!filled) {
    return (
      <div className="s2-empty">
        <div className="s2-empty-icon"><Icons.Layers size={18}/></div>
        <h4 className="s2-empty-title">No deep links yet</h4>
        <p className="s2-empty-text">
          Open a specific screen inside your app instead of just launching it. Saves a tap, lifts conversion.
        </p>
        <button className="af-btn primary" onClick={onAdd}><Icons.Plus size={13}/> Add deep link</button>
      </div>
    );
  }
  const rows = [
    { name: 'CheckMyMeal · iOS · Quiz screen',     plat: 'ios',     app: 'CheckMyMeal iOS',     type: 'universal', typeLabel: 'Universal Link', url: 'https://link.checkmymeal.com/quiz',        added: '11 May' },
    { name: 'CheckMyMeal · iOS · Settings',        plat: 'ios',     app: 'CheckMyMeal iOS',     type: 'universal', typeLabel: 'Universal Link', url: 'https://link.checkmymeal.com/settings',    added: '11 May' },
    { name: 'CheckMyMeal · iOS · Plan A · CPP',    plat: 'ios',     app: 'CheckMyMeal iOS',     type: 'cpp',       typeLabel: 'Custom Product Page', url: 'apps.apple.com/.../id123?ppid=plan_a', added: '8 May' },
    { name: 'CheckMyMeal · Android · Quiz',        plat: 'android', app: 'CheckMyMeal Android', type: 'universal', typeLabel: 'App Links',     url: 'https://link.checkmymeal.com/quiz',         added: '8 May' },
    { name: 'Iceberg Labs · iOS · Onboarding',     plat: 'ios',     app: 'Iceberg iOS',         type: 'scheme',    typeLabel: 'URL Scheme',     url: 'iceberg://onboard/start',                   added: '4 May' },
  ];
  return (
    <table className="s2-table">
      <thead>
        <tr>
          <th style={{ width: '24%' }}>Name</th>
          <th style={{ width: 80 }}>Platform</th>
          <th>App</th>
          <th>Type</th>
          <th>Deep link URL</th>
          <th style={{ width: 80 }}>Added</th>
          <th style={{ width: 90 }}></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.name}>
            <td><div className="s2-link-name">{r.name}</div></td>
            <td><span className={`s2-platform ${r.plat}`}>{r.plat === 'ios' ? 'iOS' : 'Android'}</span></td>
            <td style={{ fontSize: 12, color: 'var(--af-text-2)' }}>{r.app}</td>
            <td><span className={`s2-dl-type-chip ${r.type}`}>{r.typeLabel}</span></td>
            <td>
              <span className="s2-link-url">
                <Icons.Layers size={12}/>
                <span className="s2-link-url-text">{r.url}</span>
              </span>
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

function AddDeepLinkModal({ onClose }) {
  const [plat, setPlat] = React.useState('ios');
  const [type, setType] = React.useState('universal');
  return (
    <div className="s2-modal-overlay">
      <div className="s2-modal">
        <div className="s2-modal-head">
          <h3 className="s2-modal-title">Add deep link</h3>
          <p className="s2-modal-sub">Open a specific screen inside your app from a Meta ad.</p>
        </div>
        <div className="s2-modal-body">
          <div className="s2-form-group">
            <label className="s2-form-label">Name <span className="req">*</span></label>
            <input className="af-input" defaultValue="CheckMyMeal · iOS · Quiz screen"/>
            <div className="s2-form-help">Convention: <code>{`{product} · {platform} · {screen}`}</code></div>
          </div>

          <div className="s2-form-row">
            <div className="s2-form-group">
              <label className="s2-form-label">Platform <span className="req">*</span></label>
              <div className="s2-radio-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div className={`s2-radio-card ${plat === 'ios' ? 'active' : ''}`} onClick={() => setPlat('ios')}>
                  <div className="dot"/> iOS
                </div>
                <div className={`s2-radio-card ${plat === 'android' ? 'active' : ''}`} onClick={() => setPlat('android')}>
                  <div className="dot"/> Android
                </div>
              </div>
            </div>
            <div className="s2-form-group">
              <label className="s2-form-label">App <span className="req">*</span></label>
              <select className="af-select" defaultValue="cmm-ios">
                <option value="cmm-ios">CheckMyMeal · iOS · 1148293400221</option>
                <option>CheckMyMeal · Android · 1148293400989</option>
                <option>Iceberg Labs · iOS · 8847221001233</option>
              </select>
              <div className="s2-form-help">Pulled from apps enabled in Meta Connection.</div>
            </div>
          </div>

          <div className="s2-form-group">
            <label className="s2-form-label">Type <span className="req">*</span></label>
            <div className="s2-radio-grid" style={{ gridTemplateColumns: plat === 'ios' ? '1fr 1fr 1fr' : '1fr 1fr' }}>
              <div className={`s2-radio-card lg ${type === 'universal' ? 'active' : ''}`} onClick={() => setType('universal')}>
                <div className="dot"/>
                <div className="label-stack">
                  <div className="name">{plat === 'ios' ? 'Universal Link' : 'App Links'}</div>
                  <div className="desc">Recommended · falls back to web</div>
                </div>
              </div>
              <div className={`s2-radio-card lg ${type === 'scheme' ? 'active' : ''}`} onClick={() => setType('scheme')}>
                <div className="dot"/>
                <div className="label-stack">
                  <div className="name">URL Scheme</div>
                  <div className="desc">Legacy · <code>app://path</code></div>
                </div>
              </div>
              {plat === 'ios' && (
                <div className={`s2-radio-card lg ${type === 'cpp' ? 'active' : ''}`} onClick={() => setType('cpp')}>
                  <div className="dot"/>
                  <div className="label-stack">
                    <div className="name">Custom Product Page</div>
                    <div className="desc">iOS only · App Store variants</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="s2-form-group">
            <label className="s2-form-label">Deep link URL <span className="req">*</span></label>
            <input
              className="af-input"
              defaultValue={
                type === 'scheme' ? 'checkmymeal://quiz/start' :
                type === 'cpp' ? 'https://apps.apple.com/app/id1148293400221?ppid=plan_a' :
                'https://link.checkmymeal.com/quiz'
              }
              style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}
            />
          </div>

          <div className="s2-form-group">
            <label className="s2-form-label">Fallback URL <span style={{ color: 'var(--af-text-3)', fontWeight: 400 }}>· optional</span></label>
            <input className="af-input" defaultValue="https://checkmymeal.com/download" style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}/>
            <div className="s2-form-help">Where to send users who don't have the app installed. Defaults to your App Store / Play Store listing.</div>
          </div>
        </div>
        <div className="s2-modal-foot">
          <span style={{ fontSize: 11.5, color: 'var(--af-text-3)' }}>Used in App campaigns instead of pasting the URL each launch.</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="af-btn" onClick={onClose}>Cancel</button>
            <button className="af-btn primary"><Icons.Save size={13}/> Save deep link</button>
          </div>
        </div>
      </div>
    </div>
  );
}

window.DeepLinksSection = DeepLinksSection;
window.AddDeepLinkModal = AddDeepLinkModal;
