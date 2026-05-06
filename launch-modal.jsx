// LaunchModal.jsx — preview before launching campaign
const { Icons, Panel } = window;

function LaunchModal({ adsets, onConfirm, onCancel }) {
  const totalBudget = adsets.reduce((s, a) => s + a.budget, 0);
  const enabledCount = adsets.filter(a => a.enabled).length;
  const monthlyBudget = totalBudget * 30;

  return (
    <div className="af-modal-overlay" onClick={onCancel}>
      <div className="af-modal" onClick={(e) => e.stopPropagation()}>
        <div className="af-modal-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--af-blue-soft)', color: 'var(--af-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icons.Bolt size={18}/>
            </div>
            <div style={{ flex: 1 }}>
              <h3 className="af-modal-title">Запуск кампании в Meta</h3>
              <p className="af-modal-sub">Один клик: таски → Active в AdFactory · Адсеты → ON в Ads Manager</p>
            </div>
            <button className="af-icon-btn" onClick={onCancel}><Icons.X size={16}/></button>
          </div>
        </div>

        <div className="af-modal-body">
          <div className="af-summary-grid">
            <div className="af-summary-tile">
              <div className="af-summary-tile-label">Адсеты</div>
              <div className="af-summary-tile-value">{enabledCount}/{adsets.length}</div>
              <div className="af-summary-tile-sub">включены к запуску</div>
            </div>
            <div className="af-summary-tile">
              <div className="af-summary-tile-label">Дневной бюджет</div>
              <div className="af-summary-tile-value">${totalBudget}</div>
              <div className="af-summary-tile-sub">~${monthlyBudget.toLocaleString()} / месяц</div>
            </div>
            <div className="af-summary-tile">
              <div className="af-summary-tile-label">Креативов</div>
              <div className="af-summary-tile-value">{Panel.SAMPLE_CREATIVES.length}</div>
              <div className="af-summary-tile-sub">2 видео · 4 image</div>
            </div>
            <div className="af-summary-tile">
              <div className="af-summary-tile-label">Старт</div>
              <div className="af-summary-tile-value" style={{ fontSize: 14, marginTop: 4 }}>Apr 28, 2026</div>
              <div className="af-summary-tile-sub">Run continuously</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <strong style={{ fontSize: 13 }}>Адсеты к запуску</strong>
            <span className="af-helper-text">Можно отключить тумблером</span>
          </div>

          <div className="af-summary-list">
            <div className="af-summary-row head">
              <span>Название</span>
              <span>Гео</span>
              <span>Возраст</span>
              <span>Аудитория</span>
              <span style={{ textAlign: 'right' }}>Бюджет</span>
            </div>
            {adsets.map((a, i) => (
              <div key={a.id} className="af-summary-row" style={{ opacity: a.enabled ? 1 : 0.45 }}>
                <span className="name" title={a.name}>
                  {a.enabled ? <Icons.Check size={11} style={{ color: 'var(--af-green)', verticalAlign: 'middle', marginRight: 4 }}/> : <Icons.X size={11} style={{ verticalAlign: 'middle', marginRight: 4 }}/>}
                  {a.name.replace('CheckMyMeal_Quiz_3_Web_ABO_', '…').slice(0, 38)}…v{String(i+1).padStart(2,'0')}
                </span>
                <span>{a.geo}</span>
                <span>{a.ageMin}–{a.ageMax}</span>
                <span>{a.audience}</span>
                <span style={{ textAlign: 'right', fontWeight: 600 }}>${a.budget}/d</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, padding: 12, background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <Icons.Info size={14} style={{ color: '#b45309', marginTop: 2, flexShrink: 0 }}/>
            <div style={{ fontSize: 12, color: '#78350f', lineHeight: 1.5 }}>
              <strong>После подтверждения:</strong> 11 тасков перейдут <code style={{ background: '#fde68a', padding: '0 4px', borderRadius: 3 }}>Review → Active</code>, адсеты включатся в Meta Ads Manager. Откатить можно из истории сессии.
            </div>
          </div>

          <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
            <label className="af-checkbox"><input type="checkbox" defaultChecked/> Уведомить стейкхолдеров в CRM</label>
            <label className="af-checkbox"><input type="checkbox" defaultChecked/> Открыть Ads Manager после запуска</label>
          </div>
        </div>

        <div className="af-modal-foot">
          <span className="af-helper-text">
            <Icons.Info size={11} style={{ verticalAlign: 'middle', marginRight: 4 }}/>
            Талантливая работа агента сэкономила ~12 минут ручного ввода
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="af-btn" onClick={onCancel}>Отмена</button>
            <button className="af-btn primary lg" onClick={onConfirm}>
              <Icons.Bolt size={14}/> Подтвердить и запустить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

window.LaunchModal = LaunchModal;
