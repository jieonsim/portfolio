/* ===== Sections: Hero, About, Career, Skills, Contact, Footer ===== */
const { useState: _useStateS, useEffect: _useEffectS } = React;

/* Hero — left big type, right meta card */
function Hero() {
  return (
    <section id="top" className="relative pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden">
      <div className="hero-grid"></div>
      <div className="relative max-w-[1240px] mx-auto px-6 md:px-10">
        {/* Headline — full width */}
        <h1 className="font-semibold tracking-[-0.035em] leading-[1.04]" style={{ color: 'var(--text-primary)' }}>
          <span className="line-up block text-[40px] sm:text-[60px] md:text-[84px] lg:text-[100px]" style={{ animationDelay: '180ms' }}>
            고객의 말에서
          </span>
          <span className="line-up block text-[40px] sm:text-[60px] md:text-[84px] lg:text-[100px]" style={{ animationDelay: '340ms' }}>
            <span className="accent-text">모델의 답</span>까지.
          </span>
        </h1>

        {/* Sub-row: paragraph + CTA */}
        <div className="mt-16 md:mt-20 max-w-[680px]">
          <p className="line-up text-[15.5px] md:text-[16.5px] leading-[1.78]"
             style={{ animationDelay: '700ms', textWrap: 'pretty', color: 'var(--text-secondary)' }}>
            사용자가 어디에서 막히는지를 가장 가까이서 들어온 시간을 기반으로,
            <br />
            이제 그 이해를 AI Agent의 기획·설계·구현으로 직접 옮깁니다.
          </p>
          <div className="line-up mt-10 flex flex-wrap items-center gap-3" style={{ animationDelay: '900ms' }}>
            <a href="#projects"
               className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[13.5px] font-medium transition-all duration-200 hover:gap-3"
               style={{ background: 'var(--text-primary)', color: '#fff' }}>
              <span>Featured Projects</span>
              <span aria-hidden="true">↓</span>
            </a>
            <a href="#contact"
               className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[13.5px] font-medium transition-all duration-200"
               style={{ border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }}>
              <span>Get in touch</span>
              <span aria-hidden="true" style={{ color: 'var(--accent)' }}>→</span>
            </a>
          </div>
        </div>

        {/* Marquee-ish keyword strip */}
        <div className="line-up mt-20 md:mt-28 pt-8 flex flex-wrap items-center gap-x-6 gap-y-2"
             style={{ borderTop: '1px solid var(--border)', animationDelay: '1080ms' }}>
          <span className="mono text-[10.5px] tracking-[0.18em] uppercase" style={{ color: 'var(--text-tertiary)' }}>
            Keywords —
          </span>
          {['LLM Agent', 'Prompt Engineering', 'RAG', 'Data Quality', 'CS Insight', 'Problem Definition', 'AI-Native'].map((k, i, arr) => (
            <span key={k} className="flex items-center gap-x-6">
              <span className="text-[13px]" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{k}</span>
              {i < arr.length - 1 && <span style={{ color: 'var(--border-strong)' }}>·</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* About */
function About() {
  const whoIAm = ['LLM Agent를 기획·설계·구현', 'AI 모델 성능 분석으로 서비스 개선', 'CS 6년, 사용자 Pain Point 발굴'];
  const whyEssential = ['프롬프트 설계로 AI 응답 품질 통제', '데이터로 문제 정의·검증', '산출물로 기획 의도 명확화'];
  return (
    <section id="about" className="py-24 md:py-32 relative" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="reveal flex items-baseline justify-between mb-14 md:mb-20">
          <div className="flex items-center gap-5">
            <span className="section-num">— 01</span>
            <h2 className="text-[28px] md:text-[40px] font-semibold tracking-[-0.025em]" style={{ color: 'var(--text-primary)' }}>
              About
            </h2>
          </div>
          <span className="hidden md:inline mono text-[10.5px] tracking-[0.16em] uppercase" style={{ color: 'var(--text-tertiary)' }}>
            Who · What · Why
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
          <div className="md:col-span-5 reveal">
            <div className="space-y-7">
              <p className="text-[18px] md:text-[20px] leading-[1.7] font-medium tracking-[-0.005em]"
                 style={{ textWrap: 'pretty', color: 'var(--text-primary)' }}>
                <span className="accent-text">"</span>
                에이전트 페르소나 기획부터 시나리오 로직 설계, 인터페이스 구현까지 — 제품의 시작과 끝을 직접 책임집니다.
                <span className="accent-text">"</span>
              </p>
              <p className="text-[15px] md:text-[16px] leading-[1.78]" style={{ textWrap: 'pretty', color: 'var(--text-secondary)' }}>
                테스트 데이터를 기획·로직 개선으로 되돌리는 선순환 구조를 직접 만들고, 기획자–엔지니어 사이의 정보 병목을 없애 가장 빠른 속도로 제품 진화를 가능하게 합니다.
              </p>
              <p className="text-[15px] md:text-[16px] leading-[1.78]" style={{ textWrap: 'pretty', color: 'var(--text-secondary)' }}>
                기술적 실현 가능성과 비즈니스 가치를 동시에 고려하며, 사용자 이해를 코드와 데이터로 옮기는 일을 가장 잘합니다.
              </p>
            </div>
          </div>

          <div className="md:col-span-7 reveal" style={{ transitionDelay: '120ms' }}>
            <div className="space-y-10">
              <div>
                <div className="section-eyebrow mb-5">Who I am</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {whoIAm.map((t, i) => (
                    <div key={i} className="card-hover rounded-[12px] p-6"
                         style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                      <div className="mono text-[11px] mb-3 tnum" style={{ color: 'var(--accent)' }}>0{i+1}</div>
                      <div className="text-[14px] leading-[1.6]" style={{ textWrap: 'pretty', color: 'var(--text-primary)' }}>{t}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="section-eyebrow mb-5">Why essential</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {whyEssential.map((t, i) => (
                    <div key={i} className="card-hover rounded-[12px] p-6"
                         style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                      <div className="mono text-[11px] mb-3 tnum" style={{ color: 'var(--accent)' }}>0{i+1}</div>
                      <div className="text-[14px] leading-[1.6]" style={{ textWrap: 'pretty', color: 'var(--text-primary)' }}>{t}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Career */
function Career() {
  const nodes = [
    { period: '2026.01 — 재직 중', company: '포지큐브',     role: 'Prompt Engineer',  tenure: '4개월',    quote: 'AI Agent를 기획·설계·구현·검증까지 직접 책임집니다' },
    { period: '2024.09 — 2026.01', company: '인터엑스',     role: 'AI Consultant',    tenure: '1년 5개월', quote: 'AI 모델의 오분류를 데이터·로직으로 풀어내는 법을 익혔습니다' },
    { period: '2018.02 — 2024.02', company: 'NHN Service',  role: 'Customer Service', tenure: '6년',     quote: '사용자가 무엇에 막히는지를 가장 가까이서 들어왔습니다' },
  ];
  return (
    <section id="career" className="py-24 md:py-32" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="reveal flex items-baseline justify-between mb-14 md:mb-20">
          <div className="flex items-center gap-5">
            <span className="section-num">— 02</span>
            <h2 className="text-[28px] md:text-[40px] font-semibold tracking-[-0.025em]" style={{ color: 'var(--text-primary)' }}>
              <span>Career</span>
            </h2>
          </div>
        </div>

        <div className="reveal relative">
          <div className="absolute left-[7px] top-1 bottom-1 w-px" style={{ background: 'var(--border)' }} aria-hidden="true"></div>
          <ul className="space-y-12 md:space-y-14">
            {nodes.map((n, i) => (
              <li key={i} className="relative pl-12 group">
                <span className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-125"
                      style={{ border: '1px solid var(--border-strong)', background: 'var(--surface)' }}>
                  <span className="block w-[5px] h-[5px] rounded-full transition-colors duration-200"
                        style={{ background: i === nodes.length - 1 ? 'var(--accent)' : 'var(--text-tertiary)' }}></span>
                </span>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                  <span className="mono text-[11.5px] tnum tracking-[0.04em]" style={{ color: 'var(--text-tertiary)' }}>{n.period}</span>
                  <span style={{ color: 'var(--border-strong)' }}>·</span>
                  <span className="text-[14px]" style={{ color: 'var(--text-secondary)' }}>{n.company}</span>
                  <span style={{ color: 'var(--border-strong)' }}>·</span>
                  <span className="text-[15.5px] font-semibold tracking-[-0.005em]" style={{ color: 'var(--text-primary)' }}>{n.role}</span>
                  <span className="ml-2 mono text-[11px] px-2 py-0.5 rounded-full tnum"
                        style={{ background: 'var(--soft)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>{n.tenure}</span>
                </div>
                <p className="text-[15px] md:text-[16px] max-w-[680px]" style={{ textWrap: 'pretty', color: 'var(--text-secondary)', fontWeight: 300 }}>
                  "{n.quote}"
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-12 md:mt-14 pl-12 flex flex-wrap items-baseline gap-x-4 gap-y-1 pt-7" style={{ borderTop: '1px dashed var(--border)' }}>
            <span className="mono text-[10.5px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-tertiary)' }}>Total</span>
            <span className="mono text-[10.5px] uppercase tracking-[0.18em] tnum" style={{ color: 'var(--text-tertiary)' }}>7년 9개월</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Role grid */
function RoleSection({ items }) {
  return (
    <div className="mt-12 reveal">
      <div className="section-eyebrow mb-5">Role · 담당 역할</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((r, i) => (
          <div key={i} className="role-card">
            <span className="role-num">/ 0{i+1}</span>
            <div className="role-title">{r.title}</div>
            <div className="role-sep"></div>
            <div className="role-desc" style={{ textWrap: 'pretty' }}>{r.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Skills */
function Skills() {
  const groups = [
    { label: 'AI / LLM',        items: ['Prompt Engineering', 'Agent Workflow Design', 'ML/DL Workflow', 'AI-Native'] },
    { label: 'Data & Analysis', items: ['Python', 'SQL', 'Pandas', 'Data Analysis'] },
    { label: 'Tools',           items: ['Claude Code', 'Cursor', 'Antigravity', 'Notion'] },
    { label: 'Foundation',      items: ['Java', 'Spring', 'JavaScript'] },
  ];
  return (
    <section className="py-24 md:py-32" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="reveal flex items-baseline justify-between mb-14">
          <div className="flex items-center gap-5">
            <span className="section-num">— 06</span>
            <h2 className="text-[28px] md:text-[40px] font-semibold tracking-[-0.025em]" style={{ color: 'var(--text-primary)' }}>
              <span>Skills</span>
            </h2>
          </div>
        </div>
        <div className="reveal grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-y-12 gap-x-10">
          {groups.map((g) => (
            <div key={g.label} className="md:col-span-3">
              <div className="section-eyebrow mb-5">{g.label}</div>
              <ul className="space-y-2.5">
                {g.items.map((it) => (
                  <li key={it} className="text-[15px] flex items-center gap-2.5" style={{ color: 'var(--text-primary)' }}>
                    <span className="block w-1 h-1 rounded-full" style={{ background: 'var(--accent)' }}></span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Contact */
function Contact() {
  return (
    <section id="contact" className="py-24 md:py-36 relative overflow-hidden" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-warm)' }}>
      <div className="absolute inset-0 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(125,111,90,0.10) 0%, transparent 70%)' }}></div>
      <div className="relative max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="reveal flex items-center gap-5 mb-10">
          <span className="section-num">— 07</span>
          <span className="section-eyebrow" style={{ paddingLeft: 0 }}>Let's work together</span>
        </div>
        <h2 className="reveal text-[34px] sm:text-[44px] md:text-[60px] font-semibold tracking-[-0.03em] leading-[1.1] max-w-[1000px]"
            style={{ textWrap: 'pretty', color: 'var(--text-primary)' }}>
          AI가 풀 수 있는 문제와{' '}
          <span className="accent-text">사람이 결정해야 할 가치</span>{' '}
          — 그 경계에서 해답을 찾고 싶습니다.
        </h2>

        <div className="reveal mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-y-8 gap-x-6 max-w-[1000px]">
          <a href="mailto:zieonsim@gmail.com"
             className="md:col-span-6 group rounded-[16px] px-7 py-6 transition-all duration-200 flex flex-col justify-between"
             style={{ background: 'var(--surface)', border: '1px solid var(--border)', minHeight: 116 }}
             onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
             onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            <div className="flex items-center justify-between">
              <span className="mono text-[10.5px] tracking-[0.18em] uppercase" style={{ color: 'var(--text-tertiary)' }}>Email — primary</span>
              <span aria-hidden="true" className="text-[20px] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    style={{ color: 'var(--accent)' }}>↗</span>
            </div>
            <div className="text-[16px] md:text-[17px] font-semibold tnum tracking-[-0.005em]" style={{ color: 'var(--text-primary)' }}>
              zieonsim@gmail.com
            </div>
          </a>

          <div className="md:col-span-3 rounded-[16px] px-7 py-6 flex flex-col justify-between"
               style={{ background: 'var(--surface)', border: '1px solid var(--border)', minHeight: 116 }}>
            <div className="mono text-[10.5px] tracking-[0.18em] uppercase" style={{ color: 'var(--text-tertiary)' }}>Phone</div>
            <div className="text-[16px] md:text-[17px] font-semibold tnum tracking-[-0.005em]" style={{ color: 'var(--text-primary)' }}>
              010-8549-5209
            </div>
          </div>

          <div className="md:col-span-3 rounded-[16px] px-7 py-6 flex flex-col justify-between"
               style={{ background: 'var(--surface)', border: '1px solid var(--border)', minHeight: 116 }}>
            <div className="mono text-[10.5px] tracking-[0.18em] uppercase" style={{ color: 'var(--text-tertiary)' }}>Location</div>
            <div className="text-[16px] md:text-[17px] font-semibold tracking-[-0.005em]" style={{ color: 'var(--text-primary)' }}>
              Seoul, KR
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12" style={{ background: 'var(--text-primary)', color: '#D4D0C3' }}>
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="pt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="mono text-[11.5px] tnum" style={{ color: '#787367' }}>© 2026 Jieon Sim · All rights reserved</div>
          <a href="#top" className="mono text-[11px] tracking-[0.18em] uppercase flex items-center gap-2 hover:text-white transition-colors"
             style={{ color: '#9C9789' }}>
            <span>Back to top</span>
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Hero, About, Career, RoleSection, Skills, Contact, Footer });
