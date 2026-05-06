// Sidebar.jsx — left navigation matching AdFactory style
const { Icons } = window;

function Sidebar() {
  const items = [
    { icon: Icons.Grid, label: 'Task Board' },
    { icon: Icons.Box, label: 'Products' },
    { icon: Icons.Doc, label: 'Release Notes' },
    { icon: Icons.Chat, label: 'General Chat' },
    { icon: Icons.Robot, label: 'FB Agent', active: true, badge: 'NEW' },
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
        <button key={it.label} className={`af-nav-item ${it.active ? 'active' : ''}`}>
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
      <button className="af-nav-item">
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

window.Sidebar = Sidebar;
