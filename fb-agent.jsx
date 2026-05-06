// FBAgent.jsx — main scene composer with state machine for the 4 demo states
const { Sidebar, TopBar, Chat, Panel, LaunchModal, Icons } = window;
const { PanelEmpty, PanelSkeleton, PanelFilled, genAdsets } = Panel;

// Demo phases:
//   'fresh'      — empty panel, intro chat
//   'drafting'   — agent working, skeleton with progress
//   'ready'      — full filled panel, launch button enabled
//   'previewing' — modal open
//   'launched'   — success state

function FBAgent({ initialPhase = 'ready', initialOpenIdx = 0 }) {
  const [phase, setPhase] = React.useState(initialPhase);
  const [adsets, setAdsets] = React.useState(() => genAdsets(11));
  const [openIdx, setOpenIdx] = React.useState(initialOpenIdx);
  const [progress, setProgress] = React.useState(initialPhase === 'drafting' ? 4 : 11);
  const [beingEdited, setBeingEdited] = React.useState(-1);

  // Drafting → simulated progress
  React.useEffect(() => {
    if (phase !== 'drafting') return;
    let p = 0;
    const id = setInterval(() => {
      p += 1;
      setProgress(p);
      if (p >= 11) {
        clearInterval(id);
        setTimeout(() => setPhase('ready'), 500);
      }
    }, 700);
    return () => clearInterval(id);
  }, [phase]);

  const updateAdset = (i, patch) => {
    setAdsets(prev => prev.map((a, idx) => idx === i ? { ...a, ...patch } : a));
  };

  // Compose status
  let status = { phase: 'idle' };
  if (phase === 'drafting') {
    const steps = [
      { step: 1, total: 4, label: 'Парсю референсный адсет' },
      { step: 2, total: 4, label: 'Подтягиваю креативы из 11 тасков' },
      { step: 3, total: 4, label: 'Создаю 11 адсетов · вариация бюджета и аудиторий' },
      { step: 4, total: 4, label: 'Финализирую плейсменты и расписание' },
    ];
    const stepIdx = Math.min(3, Math.floor(progress / 3));
    status = steps[stepIdx];
  } else if (phase === 'ready') {
    status = { phase: 'idle' };
  } else if (phase === 'launched' || phase === 'previewing') {
    if (phase === 'launched') status = { phase: 'launched', label: '11 / 11 адсетов активны в Meta · 11 тасков → Active' };
    else status = { phase: 'idle' };
  }

  // Compose chat messages
  const chatMessages = React.useMemo(() => {
    const base = [
      { role: 'agent', kind: 'card',
        title: 'Готов к работе',
        text: 'Я могу создавать адсеты, дублировать кампании и запускать их в Meta. Выбери референс и опиши задачу — я заполню панель справа.' },
    ];
    if (phase === 'fresh') return base;

    const userPrompt = {
      role: 'user',
      text: 'Создай 11 новых адсетов в кампании Test_CheckMyMeal_Quiz_3_Web_ABO_US+CA_21+_autobid_Subscription. Настройки возьми с этого ref-адсета. Бюджет $120/день, плейсменты Advantage+, гео US+CA.',
    };
    const ref = {
      role: 'agent', kind: 'reference',
      name: 'CheckMyMeal_Quiz_3_Web_ABO_US+CA_25+_autobid_Subscription_s633',
    };

    if (phase === 'drafting') {
      return [
        ...base,
        ref,
        userPrompt,
        { role: 'agent', kind: 'tool', success: true, text: 'Прочитал ref-адсет', meta: '0.4s' },
        { role: 'agent', kind: 'tool', success: true, text: 'Подтянул 11 тасков из Review', meta: '0.8s' },
        { role: 'agent', kind: 'tool', text: `Создаю адсет ${progress}/11`, meta: 'live' },
      ];
    }

    if (phase === 'ready' || phase === 'previewing') {
      return [
        ref,
        userPrompt,
        { role: 'agent', kind: 'tool', success: true, text: 'Прочитал ref-адсет', meta: '0.4s' },
        { role: 'agent', kind: 'tool', success: true, text: 'Создал 11 адсетов', meta: '24s' },
        { role: 'agent', kind: 'tool', success: true, text: 'Подтянул креативы из 11 тасков', meta: '6s' },
        { role: 'agent', kind: 'card',
          title: 'Драфт готов — 11 адсетов в панели справа',
          text: 'Все поля заполнены: бюджет $120/день, US+CA, возраст 21+, Advantage+. Можешь править вручную или сразу запускать. Клик по кнопке «Запустить» вверху → откроется превью.',
          actions: ['Изменить бюджеты разом', 'Дублировать на iOS', 'Сохранить как шаблон'] },
      ];
    }

    if (phase === 'launched') {
      return [
        ref,
        userPrompt,
        { role: 'agent', kind: 'tool', success: true, text: 'Создал 11 адсетов', meta: '24s' },
        { role: 'agent', kind: 'tool', success: true, text: 'Подтянул креативы из 11 тасков', meta: '6s' },
        { role: 'agent', kind: 'card', title: 'Драфт готов', text: '11 адсетов готовы к запуску.' },
        { role: 'user', text: 'Запускай' },
        { role: 'agent', kind: 'tool', success: true, text: '11 тасков переведены: Review → Active', meta: '0.3s' },
        { role: 'agent', kind: 'tool', success: true, text: '11 адсетов включены в Meta Ads Manager', meta: '1.1s' },
        { role: 'agent', kind: 'tool', success: true, text: 'Уведомления отправлены стейкхолдерам в CRM', meta: '0.2s' },
        { role: 'agent', kind: 'card',
          title: '✓ Кампания запущена',
          text: '11 / 11 адсетов активны. Spend трекаю в реальном времени — пингу при первых результатах.',
          actions: ['Открыть в Ads Manager', 'Настроить алерты', 'Дублировать на App'] },
      ];
    }
    return base;
  }, [phase, progress]);

  // Quick chips
  const chips = [
    { type: 'group', options: [
      { label: 'Новая кампания', active: false },
      { label: 'В существующую', active: true },
    ]},
    { type: 'group', options: [
      { label: 'Web', active: true },
      { label: 'App', active: false },
    ]},
    { type: 'group', options: [
      { label: 'iOS', active: false },
      { label: 'Android', active: false },
      { label: 'Both', active: true },
    ]},
    { label: 'Выбрать референсный адсет', icon: Icons.Pin, caret: true, active: phase !== 'fresh' },
    { label: 'Загрузить шаблон', icon: Icons.Save, caret: true },
  ];

  const sessionName = phase === 'fresh'
    ? 'Новая сессия'
    : phase === 'launched'
      ? 'Talefy · Quiz 3 · 21+ Sub · Запущена'
      : 'Talefy · Quiz 3 · 21+ Sub';

  const handleSendChip = (group, opt) => {
    // demo: kick off drafting if user clicks reference
    if (group.label === 'Выбрать референсный адсет' && phase === 'fresh') {
      setPhase('drafting');
      setProgress(0);
    }
  };
  const handleSend = (text) => {
    if (phase === 'fresh') {
      setPhase('drafting');
      setProgress(0);
    } else {
      // Simulate live edit by agent on a random adset
      const i = Math.floor(Math.random() * adsets.length);
      setBeingEdited(i);
      setOpenIdx(i);
      setTimeout(() => {
        updateAdset(i, { budget: adsets[i].budget + 30 });
        setBeingEdited(-1);
      }, 1400);
    }
  };

  const processing = phase === 'drafting' ? `Думаю · ${Math.min(progress, 11)}/11` : null;

  return (
    <div className="af-app">
      <Sidebar/>
      <main style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar
          status={status}
          sessionName={sessionName}
          canLaunch={phase === 'ready'}
          onLaunch={() => setPhase('previewing')}
          launched={phase === 'launched'}
          onReset={() => {
            setPhase(initialPhase);
            setProgress(initialPhase === 'drafting' ? 0 : 11);
            setOpenIdx(initialOpenIdx);
            setAdsets(genAdsets(11));
          }}
        />
        <div className="af-workspace">
          <Chat
            messages={chatMessages}
            chips={chips}
            onSendChip={handleSendChip}
            onSend={handleSend}
            processing={processing}
          />
          <div className="af-panel">
            <div className="af-panel-tabs">
              <button className="af-panel-tab active">
                <Icons.Layers size={14}/> Кампания
              </button>
              <button className="af-panel-tab">
                <Icons.Stack size={14}/> Адсеты
                <span className="af-panel-tab-count">{phase === 'fresh' ? 0 : 11}</span>
              </button>
              <button className="af-panel-tab">
                <Icons.Image size={14}/> Креативы
                <span className="af-panel-tab-count">{phase === 'fresh' ? 0 : 6}</span>
              </button>
              <button className="af-panel-tab">
                <Icons.Code size={14}/> JSON
              </button>
              <div className="af-panel-actions">
                <button className="af-btn ghost sm"><Icons.Eye size={13}/> Превью</button>
                <button className="af-btn ghost sm"><Icons.Save size={13}/></button>
              </div>
            </div>
            <div className="af-panel-body">
              {phase === 'fresh' && <PanelEmpty/>}
              {phase === 'drafting' && <PanelSkeleton progress={progress}/>}
              {(phase === 'ready' || phase === 'previewing' || phase === 'launched') && (
                <PanelFilled
                  adsets={adsets}
                  openIdx={openIdx}
                  setOpenIdx={setOpenIdx}
                  updateAdset={updateAdset}
                  beingEdited={beingEdited}
                />
              )}
            </div>
          </div>
        </div>

        {phase === 'previewing' && (
          <LaunchModal
            adsets={adsets}
            onCancel={() => setPhase('ready')}
            onConfirm={() => setPhase('launched')}
          />
        )}
        {phase === 'launched' && (
          <div className="af-launched-toast">
            <Icons.CheckCircle size={14} style={{ color: '#34d399' }}/>
            Запущено: 11 / 11 адсетов активны в Meta
          </div>
        )}
      </main>
    </div>
  );
}

window.FBAgent = FBAgent;
