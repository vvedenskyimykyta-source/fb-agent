// Icons.jsx — minimal stroke icon set used across the FB Agent UI

const iconBase = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

function Svg({ size = 16, children, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconBase} style={style}>
      {children}
    </svg>
  );
}

const Icons = {
  Grid: (p) => (<Svg {...p}><rect x="3" y="3" width="7" height="7" rx="1.2"/><rect x="14" y="3" width="7" height="7" rx="1.2"/><rect x="3" y="14" width="7" height="7" rx="1.2"/><rect x="14" y="14" width="7" height="7" rx="1.2"/></Svg>),
  Box: (p) => (<Svg {...p}><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/></Svg>),
  Doc: (p) => (<Svg {...p}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/></Svg>),
  Chat: (p) => (<Svg {...p}><path d="M21 12a8 8 0 0 1-11.4 7.2L4 21l1.8-5.6A8 8 0 1 1 21 12z"/></Svg>),
  Bulb: (p) => (<Svg {...p}><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.6 1 1.5 1 2.5h6c0-1 .3-1.9 1-2.5A6 6 0 0 0 12 3z"/></Svg>),
  Moon: (p) => (<Svg {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></Svg>),
  Logout: (p) => (<Svg {...p}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/></Svg>),
  Coin: (p) => (<Svg {...p}><circle cx="12" cy="12" r="9"/><path d="M9 9.5a2.5 2.5 0 0 1 5 0c0 1.5-1.5 1.8-2.5 2.5-1 .7-1 1.5-1 2"/><path d="M12 17v.5"/></Svg>),
  ChevronRight: (p) => (<Svg {...p}><path d="M9 6l6 6-6 6"/></Svg>),
  ChevronDown: (p) => (<Svg {...p}><path d="M6 9l6 6 6-6"/></Svg>),
  Send: (p) => (<Svg {...p}><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></Svg>),
  Plus: (p) => (<Svg {...p}><path d="M12 5v14M5 12h14"/></Svg>),
  Sparkle: (p) => (<Svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></Svg>),
  Bolt: (p) => (<Svg {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></Svg>),
  Play: (p) => (<Svg {...p}><path d="M5 3l14 9-14 9V3z"/></Svg>),
  Pause: (p) => (<Svg {...p}><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></Svg>),
  Check: (p) => (<Svg {...p}><path d="M5 12l5 5L20 7"/></Svg>),
  CheckCircle: (p) => (<Svg {...p}><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></Svg>),
  X: (p) => (<Svg {...p}><path d="M6 6l12 12M18 6L6 18"/></Svg>),
  Folder: (p) => (<Svg {...p}><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/></Svg>),
  Image: (p) => (<Svg {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="1.6"/><path d="M21 15l-5-5-9 9"/></Svg>),
  Video: (p) => (<Svg {...p}><rect x="3" y="6" width="14" height="12" rx="2"/><path d="M17 10l4-2v8l-4-2z"/></Svg>),
  Target: (p) => (<Svg {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></Svg>),
  Globe: (p) => (<Svg {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></Svg>),
  Calendar: (p) => (<Svg {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></Svg>),
  Wallet: (p) => (<Svg {...p}><path d="M3 7a2 2 0 0 1 2-2h13v4"/><path d="M3 7v10a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H5a2 2 0 0 1-2-1z"/><circle cx="17" cy="13" r="1.2"/></Svg>),
  Users: (p) => (<Svg {...p}><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 11a3 3 0 1 0 0-6"/><path d="M22 19a5 5 0 0 0-4-5"/></Svg>),
  Layers: (p) => (<Svg {...p}><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 17l9 5 9-5"/></Svg>),
  Refresh: (p) => (<Svg {...p}><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></Svg>),
  Filter: (p) => (<Svg {...p}><path d="M3 5h18l-7 9v6l-4-2v-4L3 5z"/></Svg>),
  Search: (p) => (<Svg {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/></Svg>),
  Save: (p) => (<Svg {...p}><path d="M5 3h11l5 5v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M8 3v6h7V3"/><path d="M8 21v-6h8v6"/></Svg>),
  Copy: (p) => (<Svg {...p}><rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></Svg>),
  Eye: (p) => (<Svg {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></Svg>),
  Edit: (p) => (<Svg {...p}><path d="M4 20h4l11-11-4-4L4 16v4z"/><path d="M14 5l4 4"/></Svg>),
  Lightning: (p) => (<Svg {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></Svg>),
  History: (p) => (<Svg {...p}><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/></Svg>),
  Dots: (p) => (<Svg {...p}><circle cx="6" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="18" cy="12" r="1.2"/></Svg>),
  Pin: (p) => (<Svg {...p}><path d="M12 22v-7"/><path d="M9 8V3h6v5l3 5H6l3-5z"/></Svg>),
  Info: (p) => (<Svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 8v.01M11 12h1v5h1"/></Svg>),
  Code: (p) => (<Svg {...p}><path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 4l-4 16"/></Svg>),
  Wand: (p) => (<Svg {...p}><path d="M15 4l3 3-12 12-3-3 12-12z"/><path d="M14 5l3 3"/><path d="M21 9l.5 1.5L23 11l-1.5.5L21 13l-.5-1.5L19 11l1.5-.5z"/></Svg>),
  Stack: (p) => (<Svg {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></Svg>),
  Sliders: (p) => (<Svg {...p}><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/></Svg>),
  Robot: (p) => (<Svg {...p}><rect x="4" y="7" width="16" height="12" rx="2"/><path d="M12 4v3M9 12v1M15 12v1"/><path d="M2 13v2M22 13v2"/></Svg>),
};

window.Icons = Icons;
