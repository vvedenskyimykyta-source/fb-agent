// launch-chat.jsx — Chat column for FB Agent Launch flow
// Exports window.LaunchChat
const { Icons } = window;

function LaunchChat({ scenario }) {
  const status = scenario === 'launching' ? 'launching' : scenario === 'launched' ? 'live' : 'thinking';

  // Per-scenario messages — shows a believable conversation up to the current step
  const getMessages = () => {
    if (scenario === 'context') {
      return [
        { kind: 'agent', body: (<><p>Hi Daria 👋 What are we launching today?</p><p>Tell me the product, the goal, and roughly how much you want to spend — I'll fill the rest from your settings.</p></>) },
        { kind: 'user', body: (<><p>CheckMyMeal iOS app, Quiz funnel #3. Optimize for purchases, $80/day across DACH. Use the iOS DACH template.</p></>) },
        { kind: 'log', body: 'Loaded template "CheckMyMeal · App iOS · DACH · ABO"', time: '14:22' },
        { kind: 'log', body: 'Pulled 6 active iOS App Install creatives from Asset Library', time: '14:22' },
      ];
    }
    if (scenario === 'campaign') {
      return [
        { kind: 'agent', body: (<><p>Got it — App Install for CheckMyMeal iOS, Quiz #3 funnel.</p></>) },
        { kind: 'user', body: (<><p>Use my <code>iOS · DACH · ABO</code> template.</p></>) },
        { kind: 'log', body: 'Template applied · campaign settings prefilled', time: '14:23' },
        { kind: 'agent', body: (<><p>Done. Campaign name: <code>CMM_iOS_Q3_DACH_ABO_2026-05-12</code>.</p><p>Want me to set up adsets next? I'll create 3 by default — DACH-DE, AT, CH — but you can ask for more splits (e.g. by age band).</p></>) },
      ];
    }
    if (scenario === 'adsets') {
      return [
        { kind: 'log', body: 'Template applied · campaign settings prefilled', time: '14:23' },
        { kind: 'agent', body: (<><p>Set up 3 adsets — DACH split by country.</p></>) },
        { kind: 'user', body: (<><p>Add a 4th for AT+CH 18–24, lower budget.</p></>) },
        { kind: 'log', body: 'Created adset "AT+CH · 18–24 · $15/d"', time: '14:25' },
        { kind: 'agent', body: (<><p>Added. Now you have <b>4 adsets</b>, <b>$80/day</b> total.</p><p>Tap any adset to fine-tune. When you're happy, I'll match creatives next.</p></>) },
      ];
    }
    if (scenario === 'ads') {
      return [
        { kind: 'log', body: '4 adsets configured · total $80/d', time: '14:26' },
        { kind: 'agent', body: (<><p>Matched <b>6 creatives</b> from your Asset Library — all iOS App Install, all approved.</p><p>Each adset gets the same creative set so we can compare performance later. Want me to split creatives per adset instead?</p></>) },
        { kind: 'user', body: (<><p>No, same set is fine. But add the new "Quiz hook v3" video to all of them.</p></>) },
        { kind: 'log', body: 'Added video "quiz-hook-v3.mp4" · auto-generated headlines', time: '14:28' },
      ];
    }
    if (scenario === 'rules') {
      return [
        { kind: 'log', body: '7 creatives ready · 4 adsets', time: '14:29' },
        { kind: 'agent', body: (<><p>For automation, your settings have <b>5 saved rules</b>. I think 3 fit this campaign type:</p><ul><li>Pause low ROAS · Web Quiz</li><li>Frequency cap · Retargeting</li><li>Decrease budget on overspend</li></ul></>) },
        { kind: 'user', body: (<><p>Skip the retargeting one, this is acquisition. Add scaling rule for iOS.</p></>) },
        { kind: 'log', body: 'Attached: Pause low ROAS, Decrease budget, Scale winners +20%', time: '14:30' },
      ];
    }
    if (scenario === 'review') {
      return [
        { kind: 'log', body: '3 automation rules attached', time: '14:30' },
        { kind: 'agent', body: (<><p>Everything's ready to review.</p><p>Quick recap: <b>1 campaign</b>, <b>4 adsets</b>, <b>7 ads</b>, <b>$80/day</b>, <b>3 rules</b>.</p><p>If anything looks off, just tell me what to change.</p></>) },
        { kind: 'user', body: (<><p>Bump CH adset to $20.</p></>) },
        { kind: 'log', body: 'Updated CH-only adset budget · $15 → $20', time: '14:31' },
      ];
    }
    if (scenario === 'launching') {
      return [
        { kind: 'log', body: 'Reviewed and approved by Daria', time: '14:32' },
        { kind: 'user', body: (<><p>Launch it.</p></>) },
        { kind: 'agent', body: (<><p>On it. Sending to Meta now — this usually takes 30–60 seconds.</p></>) },
        { kind: 'log', body: 'Creating campaign on Meta API…', time: '14:32', live: true },
        { kind: 'log', body: 'Campaign created · ID 23857221038760', time: '14:32' },
        { kind: 'log', body: 'Creating adsets (3 of 4)…', time: '14:33', live: true },
      ];
    }
    if (scenario === 'launched') {
      return [
        { kind: 'log', body: 'Campaign created · 4 adsets · 7 ads', time: '14:33' },
        { kind: 'log', body: 'All ads moved to "In Review" by Meta', time: '14:34' },
        { kind: 'agent', body: (<><p>🚀 Launched! Campaign is live and Meta is reviewing creatives — usually takes 1–3 hours.</p><p>I'll ping you on Slack when:</p><ul><li>All ads pass review</li><li>First spend &gt; $20 happens</li><li>Any rule fires</li></ul><p>Good luck.</p></>) },
        { kind: 'log', body: 'Slack notification sent to #ads-team', time: '14:35' },
      ];
    }
    return [];
  };

  const messages = getMessages();

  const quickChips = scenario === 'context'
    ? ['Use template…', 'Last week\'s setup', 'Help me decide', 'I have a creative brief']
    : scenario === 'campaign'
    ? ['Continue to adsets →', 'Change campaign name', 'Switch to CBO', 'Add a different objective']
    : scenario === 'adsets'
    ? ['Looks good — next', 'Split by age band', 'Duplicate adset 1', 'Pause adset 4']
    : scenario === 'ads'
    ? ['All creatives look good', 'Generate 2 more variants', 'Translate copy to DE', 'Remove video #3']
    : scenario === 'rules'
    ? ['Continue to review →', 'Add custom rule…', 'Don\'t use rules this time', 'Show what each rule does']
    : scenario === 'review'
    ? ['Launch now →', 'Change CH budget', 'Send for approval', 'Save as template']
    : scenario === 'launching'
    ? ['Cancel launch', 'Show me what\'s happening']
    : scenario === 'launched'
    ? ['Show live performance', 'Pause underperformers', 'Launch another campaign', 'Open in Ads Manager']
    : [];

  return (
    <div className="lp-chat">
      <div className="lp-chat-head">
        <div className="lp-chat-icon"><Icons.Sparkle size={16}/></div>
        <div className="lp-chat-title">
          <div className="lp-chat-title-name">FB Agent</div>
          <div className={`lp-chat-status ${status === 'live' ? '' : status}`}>
            <span className="dot"/>
            {status === 'thinking' && 'Working with you'}
            {status === 'launching' && 'Launching to Meta…'}
            {status === 'live' && 'Campaign live'}
          </div>
        </div>
        <div className="lp-chat-head-actions">
          <button className="lp-chat-icon-btn" title="History"><Icons.History size={13}/></button>
          <button className="lp-chat-icon-btn" title="More"><Icons.Dots size={13}/></button>
        </div>
      </div>

      <div className="lp-chat-scroll">
        {messages.map((m, i) => {
          if (m.kind === 'log') {
            return (
              <div key={i} className={`lp-log ${m.live ? 'live' : ''}`}>
                <span className="lp-log-icon">
                  {m.live ? <Icons.Refresh size={9}/> : <Icons.Check size={9}/>}
                </span>
                <span className="lp-log-text"><b>{m.body}</b></span>
                <span className="lp-log-time">{m.time}</span>
              </div>
            );
          }
          return (
            <div key={i} className={`lp-msg ${m.kind}`}>{m.body}</div>
          );
        })}
      </div>

      {quickChips && quickChips.length > 0 && (
        <div className="lp-quick">
          <div className="lp-quick-label">Quick actions</div>
          {quickChips.map((c, i) => (
            <button key={c} className={`lp-chip ${i === 0 ? 'primary' : ''}`}>
              {i === 0 && <Icons.Sparkle size={10}/>}
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="lp-input-wrap">
        <div className="lp-input">
          <textarea
            placeholder={scenario === 'launched' ? 'Ask about live performance, or start a new campaign…' : 'Tell the agent what to change, or click "Continue"…'}
            rows={1}
            defaultValue=""
          />
          <button className="lp-input-send" disabled>
            <Icons.Send size={14}/>
          </button>
        </div>
      </div>
    </div>
  );
}

window.LaunchChat = LaunchChat;
