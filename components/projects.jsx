/* ===== Projects: Hana, InterX, NHN ===== */

/* Workflow Diagram */
function WorkflowDiagram() {
  const W = 1100, H = 760;
  const N = { w: 168, h: 56 };
  const SN = { w: 168, h: 44 };
  const l1Y = 28;
  const l1Items = ['사용자 입력 대기', '대화 이력 조회', '업로드 파일 확인', 'LLM 호출', '의도 분기'];
  const l1StartX = 24;
  const l1Gap = (W - 24 * 2 - N.w * 5) / 4;
  const l1Xs = l1Items.map((_, i) => l1StartX + i * (N.w + l1Gap));
  const l2BranchY = 168, l2NodeY = 196;
  const branches = [
    { key: 'Error',     desc: '파일 처리 오류' },
    { key: 'Translate', desc: '번역 요청 언어 지정 여부 확인' },
    { key: 'Review',    desc: '지표 점수·개선점 출력' },
    { key: 'Document',  desc: '파일 기반 Q&A 응답' },
    { key: 'etc',       desc: '지원 범위 외 처리 불가' },
  ];
  const colCount = branches.length;
  const colW = (W - 24 * 2) / colCount;
  const colCenters = branches.map((_, i) => 24 + colW * i + colW / 2);
  const translateCenterX = colCenters[1];
  const l3Y = 320, l3SubY = 348;
  const l3 = [
    { key: 'Fail',    desc: '추가 정보 요청',   x: translateCenterX - 110 },
    { key: 'Success', desc: '파일 확장자 확인', x: translateCenterX + 110 },
  ];
  const l4ParentX = translateCenterX + 110;
  const l4Y = 472, l4SubY = 500;
  const l4 = [
    { key: 'Extension Error', desc: '미지원 파일 확장자', x: l4ParentX - 200 },
    { key: 'Success',         desc: '번역 API 호출',     x: l4ParentX },
    { key: 'Exception',       desc: '번역 서버 응답 오류', x: l4ParentX + 200 },
  ];
  const l5Y = 624, l5X = l4ParentX;
  const nodeRect = (cx, cy, w = N.w, h = N.h) => ({ x: cx - w / 2, y: cy - h / 2, w, h });
  const l1Rects = l1Xs.map((x) => ({ x, y: l1Y, w: N.w, h: N.h }));
  const l1LastCx = l1Rects[4].x + N.w / 2;
  const l1LastCy = l1Rects[4].y + N.h;
  const l2Rects = colCenters.map((cx) => nodeRect(cx, l2NodeY + SN.h / 2, SN.w, SN.h));
  const lineColor = '#D4D0C3';
  return (
    <div className="rounded-[14px] overflow-hidden" style={{ background: 'var(--soft)', border: '1px solid var(--border)' }}>
      <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-warm)' }}>
        <span className="mono text-[10.5px] tracking-[0.16em] uppercase" style={{ color: 'var(--text-tertiary)' }}>Workflow · 시나리오 다이어그램</span>
      </div>
      <div className="hidden md:block p-2">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
          {l1Rects.slice(0, -1).map((r, i) => {
            const next = l1Rects[i + 1];
            return <line key={`l1c-${i}`} x1={r.x + r.w} y1={r.y + r.h / 2} x2={next.x} y2={r.y + r.h / 2} stroke={lineColor} strokeWidth="1" />;
          })}
          <line x1={l1LastCx} y1={l1LastCy} x2={l1LastCx} y2={l2BranchY - 28} stroke={lineColor} strokeWidth="1" />
          <line x1={Math.min(...colCenters, l1LastCx)} y1={l2BranchY - 28} x2={Math.max(...colCenters, l1LastCx)} y2={l2BranchY - 28} stroke={lineColor} strokeWidth="1" />
          {colCenters.map((cx, i) => <line key={`l2-drop-${i}`} x1={cx} y1={l2BranchY - 28} x2={cx} y2={l2BranchY - 4} stroke={lineColor} strokeWidth="1" />)}
          <line x1={translateCenterX} y1={l2NodeY + SN.h} x2={translateCenterX} y2={l3Y - 28} stroke={lineColor} strokeWidth="1" />
          <line x1={l3[0].x} y1={l3Y - 28} x2={l3[1].x} y2={l3Y - 28} stroke={lineColor} strokeWidth="1" />
          {l3.map((b, i) => <line key={`l3-drop-${i}`} x1={b.x} y1={l3Y - 28} x2={b.x} y2={l3Y - 4} stroke={lineColor} strokeWidth="1" />)}
          <line x1={l4ParentX} y1={l3SubY + SN.h} x2={l4ParentX} y2={l4Y - 28} stroke={lineColor} strokeWidth="1" />
          <line x1={l4[0].x} y1={l4Y - 28} x2={l4[2].x} y2={l4Y - 28} stroke={lineColor} strokeWidth="1" />
          {l4.map((b, i) => <line key={`l4-drop-${i}`} x1={b.x} y1={l4Y - 28} x2={b.x} y2={l4Y - 4} stroke={lineColor} strokeWidth="1" />)}
          <line x1={l5X} y1={l4SubY + SN.h} x2={l5X} y2={l5Y - 4} stroke={lineColor} strokeWidth="1" />
          {colCenters.map((cx, i) => <text key={`l2-label-${i}`} x={cx} y={l2BranchY} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10.5" fill="#7D6F5A" style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>{branches[i].key}</text>)}
          {l3.map((b, i) => <text key={`l3-label-${i}`} x={b.x} y={l3Y} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10.5" fill="#7D6F5A" style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>{b.key}</text>)}
          {l4.map((b, i) => <text key={`l4-label-${i}`} x={b.x} y={l4Y} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10.5" fill="#7D6F5A" style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>{b.key}</text>)}
          {l1Rects.map((r, i) => (
            <foreignObject key={`l1-${i}`} x={r.x} y={r.y} width={r.w} height={r.h}>
              <div className="wf-node-inner" xmlns="http://www.w3.org/1999/xhtml"><div><div className="wf-title">{l1Items[i]}</div></div></div>
            </foreignObject>
          ))}
          {l2Rects.map((r, i) => (
            <foreignObject key={`l2-${i}`} x={r.x} y={r.y} width={r.w} height={r.h}>
              <div className="wf-node-inner" xmlns="http://www.w3.org/1999/xhtml"><div className="wf-sub" style={{ color: '#1A1917', fontSize: 12, fontWeight: 500 }}>{branches[i].desc}</div></div>
            </foreignObject>
          ))}
          {l3.map((b, i) => {
            const r = nodeRect(b.x, l3SubY + SN.h / 2, SN.w, SN.h);
            return (
              <foreignObject key={`l3-${i}`} x={r.x} y={r.y} width={r.w} height={r.h}>
                <div className="wf-node-inner" xmlns="http://www.w3.org/1999/xhtml"><div className="wf-sub" style={{ color: '#1A1917', fontSize: 12, fontWeight: 500 }}>{b.desc}</div></div>
              </foreignObject>
            );
          })}
          {l4.map((b, i) => {
            const r = nodeRect(b.x, l4SubY + SN.h / 2, SN.w, SN.h);
            return (
              <foreignObject key={`l4-${i}`} x={r.x} y={r.y} width={r.w} height={r.h}>
                <div className="wf-node-inner" xmlns="http://www.w3.org/1999/xhtml"><div className="wf-sub" style={{ color: '#1A1917', fontSize: 12, fontWeight: 500 }}>{b.desc}</div></div>
              </foreignObject>
            );
          })}
          {(() => {
            const r = nodeRect(l5X, l5Y + N.h / 2 - 4, N.w, N.h);
            return (
              <foreignObject x={r.x} y={r.y} width={r.w} height={r.h}>
                <div className="wf-node-inner dark" xmlns="http://www.w3.org/1999/xhtml"><div style={{ fontWeight: 600, fontSize: 13, color: '#fff' }}>번역 결과 출력</div></div>
              </foreignObject>
            );
          })()}
        </svg>
      </div>
      <div className="md:hidden p-5">
        <ol className="space-y-2">
          {l1Items.map((t, i) => (
            <li key={`mb-l1-${i}`} className="rounded-[8px] px-4 py-3 text-[13px]" style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-primary)' }}>{t}</li>
          ))}
        </ol>
        <div className="mt-5 mono text-[10px] tracking-[0.08em] uppercase" style={{ color: 'var(--text-tertiary)' }}>의도 분기</div>
        <ul className="mt-2 space-y-2">
          {branches.map((b, i) => (
            <li key={`mb-l2-${i}`} className="rounded-[8px] px-4 py-3" style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
              <div className="mono text-[10px] uppercase tracking-[0.06em]" style={{ color: 'var(--accent)' }}>{b.key}</div>
              <div className="text-[13px] mt-0.5" style={{ color: 'var(--text-primary)' }}>{b.desc}</div>
            </li>
          ))}
        </ul>
        <div className="mt-4 rounded-[8px] px-4 py-3 text-[13px] font-semibold" style={{ background: 'var(--text-primary)', color: '#fff' }}>번역 결과 출력</div>
      </div>
    </div>
  );
}

/* StructuredCaseStudy */
function StructuredCaseStudy({ id, summary, problemRows, problemNote, approach, executionSteps, resultBullets, validation }) {
  return (
    <div id={id} className="lift-hover rounded-[14px] overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <div className="px-7 md:px-8 py-6 md:py-7" style={{ background: 'linear-gradient(180deg, var(--bg-warm) 0%, var(--surface) 100%)' }}>
        <div className="mono text-[10.5px] tracking-[0.18em] uppercase mb-2" style={{ color: 'var(--accent)' }}>Case Study</div>
        <div className="text-[18px] md:text-[20px] font-semibold tracking-[-0.015em]" style={{ color: 'var(--text-primary)' }}>{summary.title}</div>
        <div className="mt-2 text-[14.5px] leading-[1.65] max-w-[820px]" style={{ textWrap: 'pretty', color: 'var(--text-secondary)' }}>{summary.headline}</div>
      </div>
      <div className="px-7 md:px-8 pb-9 md:pb-10 pt-0" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="space-y-12 md:space-y-14 mt-10">
          <div>
            <span className="cs-num">01</span>
            <span className="cs-label">Problem · 문제 정의</span>
            <div>
              {problemRows.map((row, i) => (
                <div key={i} className="lv-row">
                  <div className="lv-label">{row.label}</div>
                  <div className="lv-value" style={{ textWrap: 'pretty' }}>{row.value}</div>
                </div>
              ))}
            </div>
            {problemNote && (
              <p className="mt-5 text-[15px] leading-[1.7]" style={{ color: 'var(--text-primary)', textWrap: 'pretty' }}>{problemNote}</p>
            )}
          </div>
          <div>
            <span className="cs-num">02</span>
            <span className="cs-label">Approach · 접근 방식</span>
            <p className="cs-approach">{approach}</p>
          </div>
          <div>
            <span className="cs-num">03</span>
            <span className="cs-label">Execution · 실행</span>
            <div>
              {executionSteps.map((s, i) => (
                <div key={i} className="step-row">
                  <div className="step-num">/ 0{i+1}</div>
                  <div>
                    <div className="step-title">{s.title}</div>
                    <div className="step-desc" style={{ textWrap: 'pretty' }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="cs-num">04</span>
            <span className="cs-label">Result · 결과</span>
            <ul className="cs-result">
              {resultBullets.map((r, i) => (
                <li key={i}><span style={{ textWrap: 'pretty' }}>{r}</span></li>
              ))}
            </ul>
          </div>
          {validation && (
            <div>
              <span className="cs-num">05</span>
              <span className="cs-label">Validation · 검증 결과</span>
              {validation}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* Project header — shared */
function ProjectHeader({ num, eyebrow, title, subtitle, meta }) {
  return (
    <div className="reveal project-hero p-8 md:p-12 mb-12 md:mb-16">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="section-eyebrow mb-5">{eyebrow}</div>
          <h2 className="text-[30px] md:text-[48px] font-semibold tracking-[-0.03em] leading-[1.1]" style={{ color: 'var(--text-primary)' }}>
            {title}
          </h2>
          <p className="mt-5 text-[16px] md:text-[18px] max-w-[820px] leading-[1.7]" style={{ textWrap: 'pretty', color: 'var(--text-secondary)' }}>
            {subtitle}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 mono text-[11.5px] tracking-[0.04em]" style={{ color: 'var(--text-tertiary)' }}>
            {meta.map((m, i, arr) => (
              <span key={i} className="flex items-center gap-3">
                <span>{m}</span>
                {i < arr.length - 1 && <span style={{ color: 'var(--border-strong)' }}>·</span>}
              </span>
            ))}
          </div>
        </div>
        <div className="project-num-big shrink-0">{num}</div>
      </div>
    </div>
  );
}

/* SubProject header */
function SubHeader({ index, lead, label, title, subtitle }) {
  return (
    <div className="reveal mb-10">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className={`sub-chip ${lead ? 'lead' : ''}`}>
          <span className="dot"></span>
          0{index} · {lead ? '단독 담당' : '공동 담당'}
        </span>
        <span style={{ color: 'var(--border-strong)' }}>/</span>
        <span className="mono text-[11px] tracking-[0.16em] uppercase" style={{ color: 'var(--text-tertiary)' }}>{label}</span>
      </div>
      <h3 className="text-[24px] md:text-[32px] font-semibold tracking-[-0.025em] leading-[1.2]" style={{ color: 'var(--text-primary)' }}>{title}</h3>
      <p className="mt-3 text-[15px] md:text-[16px] max-w-[860px] leading-[1.7]" style={{ textWrap: 'pretty', color: 'var(--text-secondary)' }}>
        {subtitle}
      </p>
    </div>
  );
}

/* Project Hana */
function ProjectHana() {
  const roles = [
    { title: 'Agent 시나리오 설계',     desc: '입력 대기부터 결과 출력까지 전체 노드 흐름과 예외 분기 설계' },
    { title: '프롬프트 엔지니어링',    desc: '금융·법령 도메인 특화 페르소나 작성 및 케이스별 동작 검증' },
    { title: 'RAG 데이터 품질 관리',   desc: '임베딩 저하·파싱 오류 등 리스크 사전 분석 및 이슈 유형화' },
    { title: '프로젝트 관리·협업',     desc: '고객사 인터뷰를 통한 Pain Point 분석 및 산출물 작성' },
  ];
  return (
    <section id="projects" className="py-24 md:py-32" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="reveal flex items-baseline justify-between mb-10">
          <div className="flex items-center gap-5">
            <span className="section-num">— 03</span>
            <h2 className="text-[28px] md:text-[40px] font-semibold tracking-[-0.025em]" style={{ color: 'var(--text-primary)' }}>
              Featured{' '}
              <span className="accent-text">Projects</span>
            </h2>
          </div>
          <span className="hidden md:inline mono text-[10.5px] tracking-[0.16em] uppercase" style={{ color: 'var(--text-tertiary)' }}>
            03 — 05 · Three deep dives
          </span>
        </div>

        <ProjectHeader
          num="01"
          eyebrow="Featured Project · 01 · 진행 중"
          title="하나은행 생성형 AI 혁신금융서비스"
          subtitle={<>임직원 업무 지원용 LLM 기반 AI Agent 서비스 구축.<br />16개국 다국어 번역과 약 100종 RAG 인제스트 거버넌스를 단독·공동으로 담당.</>}
          meta={['포지큐브', 'Prompt Engineer', '2026.02 — 진행 중']}
        />

        <RoleSection items={roles} />

        <div className="mt-16 md:mt-24 reveal">
          <SubHeader
            index={1}
            lead={true}
            label="Sub Project 1"
            title="글로벌 번역 Agent"
            subtitle="16개국 다국어 금융·법령 문서 번역 Agent — 기획·설계·구현·검증을 단독으로 담당."
          />
          <div className="mt-2">
            <WorkflowDiagram />
            <div className="mt-3 text-[12.5px]" style={{ color: 'var(--text-tertiary)' }}>↩ 모든 처리 종료 후 사용자 입력 대기로 복귀</div>
          </div>

          <div className="mt-10">
            <StructuredCaseStudy
              id="case-translate"
              summary={{
                title: '검수 피드백 기반 재번역 루프 설계',
                headline: '사용자가 재번역을 요청해도 직전 개선점이 반영되지 않던 문제를 독립 의도 분기로 풀어낸 과정',
              }}
              problemRows={[
                { label: '시나리오',        value: '번역 → 검수 후 "재번역해줘 / 네"로 재요청' },
                { label: '원인 1 · 의도',   value: '재번역·확답이 별도 의도로 정의되지 않아 일반 문의로 분기' },
                { label: '원인 2 · 데이터', value: '검수 결과가 번역 단계로 전달되지 않아 모델이 피드백을 미인식' },
                { label: '사용자 영향',     value: '파일·언어 재입력 후에도 같은 결과물 — 검수 가치 무력화' },
              ]}
              approach={`검수 직후 사용자의 동의·재요청을 별도 의도로 정의하고, 그 경로에서만 직전 검수의 개선 포인트를 번역 페르소나에 자동 주입하는 독립 피드백 루프를 설계하여 일반 번역 플로우와 분리해 변경 영향을 격리했습니다.`}
              executionSteps={[
                { title: '재번역 전용 의도 분기 신설',  desc: '직전 응답이 검수 결과인지와 사용자 입력의 키워드 일치 여부, 두 조건을 함께 만족할 때만 재번역 의도로 분류 — 일반 의도 흐름과 격리.' },
                { title: '검수 피드백 자동 추출',       desc: '검수 응답에 담긴 개선 포인트 데이터를 파싱해 페르소나로 주입 — 매 재번역마다 가장 최신 피드백이 최우선 반영.' },
                { title: '대화 이력 참조 인덱스 교정',   desc: '이력 정렬 방향(과거→최신)을 잘못 가정한 인덱스 오류를 발견·교정 — 의도 분류기가 항상 가장 최신 응답을 기준으로 판단하도록 회복.' },
              ]}
              resultBullets={[
                '파일 재업로드·언어 재지정 없이 확답만으로 재번역 경로 진입',
                '검수 단계의 개선 포인트가 다음 번역에 자동 반영되는 피드백 루프 구축',
                '재번역 전용 의도 분기 확보로 일반 플로우와 독립 관리 가능 — 응답 포맷 개편·효과 측정 등 후속 개선의 기반 확보',
              ]}
              validation={
                <div className="space-y-10">
                  {/* ====== Visual A : Before / After 의도 분기 비교 ====== */}
                  <div>
                    <div className="flex items-center justify-between mb-3 gap-3">
                      <div className="section-eyebrow">Before / After · 의도 분기 구조 전환</div>
                      <span className="hidden md:inline mono text-[10px] tracking-[0.12em] uppercase" style={{ color: 'var(--text-tertiary)' }}>구조적 차이를 한눈에</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Before */}
                      <div className="rounded-[12px] p-5 md:p-6" style={{ background: 'var(--soft)', border: '1px solid var(--border)' }}>
                        <div className="flex items-center justify-between mb-5">
                          <span className="mono text-[10.5px] uppercase tracking-[0.16em]" style={{ color: 'var(--text-tertiary)' }}>Before</span>
                          <span className="text-[11.5px]" style={{ color: 'var(--text-tertiary)' }}>재번역이 일반 의도에 흡수</span>
                        </div>
                        <div className="space-y-2">
                          {[
                            { label: '사용자 발화', sub: '"재번역해줘" / "네"' },
                            { label: '의도 분류', sub: '재번역 미정의 — 단일 분기' },
                            { label: '일반 문의로 분기', sub: '재번역도 같은 경로로 흡수', warn: true },
                            { label: '직전 지시문 그대로 재실행', sub: '검수 피드백 미전달', warn: true },
                          ].map((n, i, arr) => (
                            <React.Fragment key={`bf-${i}`}>
                              <div className="rounded-[8px] px-4 py-2.5" style={{ background: 'var(--surface)', border: `1px solid ${n.warn ? 'var(--border-strong)' : 'var(--border)'}` }}>
                                <div className="text-[13px] font-medium" style={{ color: 'var(--text-primary)' }}>{n.label}</div>
                                <div className="text-[11.5px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{n.sub}</div>
                              </div>
                              {i < arr.length - 1 && (
                                <div className="flex justify-center py-0.5"><span style={{ color: 'var(--border-strong)' }}>↓</span></div>
                              )}
                            </React.Fragment>
                          ))}
                          <div className="flex justify-center py-0.5"><span style={{ color: 'var(--border-strong)' }}>↓</span></div>
                          <div className="rounded-[8px] px-4 py-3" style={{ background: 'var(--text-primary)', border: '1px solid var(--text-primary)', color: '#fff' }}>
                            <div className="mono text-[10px] uppercase tracking-[0.12em]" style={{ color: '#9C9789' }}>Result</div>
                            <div className="text-[13px] font-semibold mt-1">동일 결과물 반환 — 검수 가치 무력화</div>
                          </div>
                        </div>
                      </div>

                      {/* After */}
                      <div className="rounded-[12px] p-5 md:p-6" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent)' }}>
                        <div className="flex items-center justify-between mb-5">
                          <span className="mono text-[10.5px] uppercase tracking-[0.16em]" style={{ color: 'var(--accent)' }}>After</span>
                          <span className="text-[11.5px]" style={{ color: 'var(--accent-ink)' }}>재번역 전용 분기 + 피드백 자동 주입</span>
                        </div>
                        <div className="space-y-2">
                          {[
                            { label: '사용자 발화', sub: '"재번역해줘" / "네"', emphasis: false },
                            { label: '직전 응답이 검수 결과인가?', sub: '검수 지표·응답 메타·마무리 질문으로 판별', emphasis: true },
                            { label: '키워드 매칭 + 확답 판정', sub: '재번역 키워드 OR 확답 → 재번역 의도 확정', emphasis: true },
                            { label: '검수 응답에서 개선 포인트 추출', sub: '응답 메타데이터에서 자동 추출', emphasis: true },
                            { label: '페르소나에 우선순위 섹션 주입', sub: '직전 검수 피드백 — 최우선 반영', emphasis: true },
                          ].map((n, i, arr) => (
                            <React.Fragment key={`af-${i}`}>
                              <div className="rounded-[8px] px-4 py-2.5" style={{ background: 'var(--surface)', border: `1px solid ${n.emphasis ? 'var(--accent)' : 'var(--border-strong)'}` }}>
                                <div className="text-[13px] font-medium" style={{ color: 'var(--text-primary)' }}>{n.label}</div>
                                <div className="text-[11.5px] mt-0.5" style={{ color: 'var(--accent-ink)' }}>{n.sub}</div>
                              </div>
                              {i < arr.length - 1 && (
                                <div className="flex justify-center py-0.5"><span style={{ color: 'var(--accent)' }}>↓</span></div>
                              )}
                            </React.Fragment>
                          ))}
                          <div className="flex justify-center py-0.5"><span style={{ color: 'var(--accent)' }}>↓</span></div>
                          <div className="rounded-[8px] px-4 py-3" style={{ background: 'var(--accent)', border: '1px solid var(--accent)', color: '#fff' }}>
                            <div className="mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--accent-soft)' }}>Result</div>
                            <div className="text-[13px] font-semibold mt-1">개선 포인트 반영된 재번역 실행</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ====== Visual C : 의도 분류 규칙 카드 ====== */}
                  <div>
                    <div className="mb-3">
                      <div className="section-eyebrow">재번역 의도 판별 규칙</div>
                    </div>
                    <div className="rounded-[12px] p-5 md:p-7" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 items-stretch">
                        {/* Condition 01 */}
                        <div className="md:col-span-5 rounded-[10px] p-5" style={{ background: 'var(--soft)', border: '1px solid var(--border)' }}>
                          <div className="mono text-[10px] uppercase tracking-[0.14em] mb-2.5" style={{ color: 'var(--accent)' }}>Condition 01</div>
                          <div className="text-[14.5px] font-semibold leading-[1.45] mb-3.5" style={{ color: 'var(--text-primary)' }}>직전 AI 응답이 검수 결과인가</div>
                          <div className="text-[11px] mb-2 mono uppercase tracking-[0.08em]" style={{ color: 'var(--text-tertiary)' }}>판별 단서</div>
                          <div className="flex flex-wrap gap-1.5">
                            <span className="kw-chip">검수 지표</span>
                            <span className="kw-chip">응답 메타</span>
                            <span className="kw-chip">"재번역을 진행할까요?"</span>
                          </div>
                        </div>

                        {/* AND 연산자 */}
                        <div className="md:col-span-2 flex md:flex-col items-center justify-center gap-2 py-2 md:py-0">
                          <span className="block w-12 md:w-px h-px md:h-12" style={{ background: 'var(--border-strong)' }}></span>
                          <span className="mono text-[12px] tracking-[0.18em] px-3 py-1 rounded-full" style={{ color: 'var(--text-secondary)', background: 'var(--soft)', border: '1px solid var(--border)' }}>AND</span>
                          <span className="block w-12 md:w-px h-px md:h-12" style={{ background: 'var(--border-strong)' }}></span>
                        </div>

                        {/* Condition 02 */}
                        <div className="md:col-span-5 rounded-[10px] p-5" style={{ background: 'var(--soft)', border: '1px solid var(--border)' }}>
                          <div className="mono text-[10px] uppercase tracking-[0.14em] mb-2.5" style={{ color: 'var(--accent)' }}>Condition 02</div>
                          <div className="text-[14.5px] font-semibold leading-[1.45] mb-3.5" style={{ color: 'var(--text-primary)' }}>사용자 입력이 정의된 키워드에 해당하는가</div>
                          <div className="text-[11px] mb-1.5 mono uppercase tracking-[0.08em]" style={{ color: 'var(--text-tertiary)' }}>재번역 키워드</div>
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            <span className="kw-chip">재번역</span>
                            <span className="kw-chip">다시 번역</span>
                            <span className="kw-chip">피드백 반영</span>
                          </div>
                          <div className="text-[11px] mb-1.5 mono uppercase tracking-[0.08em]" style={{ color: 'var(--text-tertiary)' }}>확답 키워드</div>
                          <div className="flex flex-wrap gap-1.5">
                            <span className="kw-chip">네</span>
                            <span className="kw-chip">예</span>
                            <span className="kw-chip">OK</span>
                            <span className="kw-chip">yes</span>
                          </div>
                        </div>
                      </div>

                      {/* THEN — 충족 시 분기 결과 */}
                      <div className="mt-5 flex justify-center">
                        <span className="mono text-[11px] tracking-[0.16em]" style={{ color: 'var(--accent)' }}>↓ THEN</span>
                      </div>

                      <div className="mt-3 rounded-[10px] p-5" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent)' }}>
                        <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                          <span className="mono text-[10.5px] uppercase tracking-[0.16em]" style={{ color: 'var(--accent)' }}>재번역 의도 확정</span>
                          <span className="text-[11.5px]" style={{ color: 'var(--accent-ink)' }}>파일·언어 자동 재사용 — 사용자 재입력 불필요</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                          {[
                            { ko: '의도', en: 'intent', v: '"번역"' },
                            { ko: '파일 재사용', en: 'is_file_reuse', v: '적용' },
                            { ko: '대상 언어', en: 'target_language', v: '이전값 재사용' },
                          ].map((p, i) => (
                            <div key={`var-${i}`} className="rounded-[8px] px-4 py-3" style={{ background: 'var(--surface)', border: '1px solid var(--border-strong)' }}>
                              <div className="flex items-baseline gap-1.5 flex-wrap">
                                <span className="text-[12px] font-medium" style={{ color: 'var(--text-secondary)' }}>{p.ko}</span>
                                <span className="mono text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{p.en}</span>
                              </div>
                              <div className="text-[13px] mt-1 font-semibold" style={{ color: 'var(--text-primary)' }}>{p.v}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Caption — 두 시각 요소를 한 문장으로 묶는 마무리 */}
                  <p className="text-[12.5px] leading-[1.7]" style={{ textWrap: 'pretty', color: 'var(--text-tertiary)' }}>
                    "재번역"이 일반 의도에 흡수되던 단일 분기를 → 검수 컨텍스트 + 키워드 매칭 결합 분기로 분리. 검수 결과의 개선 포인트가 페르소나 우선순위 섹션으로 자동 흘러 들어가는 독립 피드백 루프 확보.
                  </p>
                </div>
              }
            />
          </div>
        </div>

        <div className="mt-20 md:mt-28 reveal">
          <SubHeader
            index={2}
            lead={false}
            label="Sub Project 2"
            title="대출 상품 추천 Agent — RAG 데이터 검증"
            subtitle="약 100종 수급 문서의 RAG 인제스트 리스크를 사전 유형화하고, 문서 변환 품질을 정량 평가하는 거버넌스 체계를 수립."
          />

          <StructuredCaseStudy
            id="case-rag"
            summary={{
              title: 'RAG 인제스트 리스크 유형화',
              headline: '표·외부 URL·도메인 용어가 RAG 파이프라인에서 왜곡되는 리스크를 사전 유형화하고 정량 평가 체계를 수립한 과정',
            }}
            problemRows={[
              { label: '대상 문서',   value: '약 100종 수급 문서 — 상품 요약서·운용 가이드·워크북·Q&A 등' },
              { label: '취약 구조',   value: '중첩 표·페이지 경계 분할 표·외부 URL·산정식·이미지/도식이 변환 단계에서 왜곡·누락' },
              { label: '도메인 용어', value: 'HCGS·C1/C2·ASS 등급 등 은행 고유 용어가 임베딩 연관성 저하의 원인으로 작용' },
              { label: '운영 공백',   value: '배포 후 발견 시 인덱스 재구축 비용 발생 — 인제스트 단계에서 리스크를 가시화할 필요' },
            ]}
            approach={`RAG 파이프라인(수급 → 변환 → 청킹 → 임베딩) 각 단계의 취약 요소를 문서 유형 × 이슈 유형 매트릭스로 사전 분류해 대응 가이드를 산출하고 수급 문서의 접수–분류–변환–검수 라이프사이클을 표준화해 운영 거버넌스를 확보했습니다.`}
            executionSteps={[
              { title: '취약 구조 사전 분석',         desc: '중첩 표·페이지 경계 분할 표·외부 URL·산정식·이미지/도식 등 구조 단위로 위험 요소 식별 및 변환 가이드 도출.' },
              { title: '문서 분류·이력 관리 체계',    desc: '문서 유형별 분류 기준과 이력 관리 프로세스 표준화 — 상품 개정 이벤트 발생 시 즉시 대응 가능한 운영 구조 확보.' },
              { title: '변환 산출물 검수 모델',       desc: '20개 패턴 × 5개 카테고리 평가 항목 정의 + 영역별 비중을 반영한 가중 평균 보존율 산정 모델 설계.' },
            ]}
            resultBullets={[
              '배포 전 인제스트·청킹 설계에 리스크 선반영 → 운영 후 인덱스 재구축 리스크 축소',
              '수급 문서 분류·이력 관리 체계로 상품 개정 이벤트 발생 시 즉시 대응 가능',
              '가중 평균 보존율 + 카테고리별 정량 지표 확보 — 용어집 구축·2-pass 전처리 규칙 등 후속 개선 액션 도출',
            ]}
            validation={
              <div className="space-y-7">
                <div>
                  <div className="section-eyebrow mb-3">Test Documents · 샘플 문서별 보존율</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { name: '온렌딩대출 상품요약서', val: '72', sub: '%' },
                      { name: '온렌딩대출 워크북',     val: '78', sub: '%' },
                    ].map((d, i) => (
                      <div key={i} className="rounded-[10px] p-4" style={{ background: 'var(--soft)', border: '1px solid var(--border)' }}>
                        <div className="text-[12.5px] font-medium" style={{ color: 'var(--text-primary)' }}>{d.name}</div>
                        <div className="mt-3 flex items-baseline gap-1 tnum">
                          <span className="text-[28px] font-semibold tracking-[-0.02em] leading-none" style={{ color: 'var(--text-primary)' }}>{d.val}</span>
                          <span className="text-[13px] mono" style={{ color: 'var(--text-secondary)' }}>{d.sub}</span>
                        </div>
                      </div>
                    ))}
                    <div className="rounded-[10px] p-4 relative overflow-hidden"
                         style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent)' }}>
                      <div className="mono text-[10px] uppercase tracking-[0.14em]" style={{ color: 'var(--accent)' }}>Weighted Avg</div>
                      <div className="mt-3 flex items-baseline gap-1 tnum">
                        <span className="text-[36px] font-bold tracking-[-0.04em] leading-none" style={{ color: 'var(--accent)' }}>~75</span>
                        <span className="text-[13px] mono" style={{ color: 'var(--accent-ink)' }}>%</span>
                      </div>
                      <div className="mt-2 text-[11.5px]" style={{ color: 'var(--accent-ink)' }}>전체 평균 보존율</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="section-eyebrow mb-3">Weighted Formula · 산정 방식</div>
                  <div className="rounded-[10px] p-5" style={{ background: 'var(--soft)', border: '1px solid var(--border)' }}>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { area: '표 구조 영역',     weight: 60, retention: 82 },
                        { area: '본문 텍스트',      weight: 30, retention: 92 },
                        { area: '이미지/도식·기타', weight: 10, retention: 96 },
                      ].map((x, i) => (
                        <div key={i} className="text-center">
                          <div className="text-[12px] mb-3" style={{ color: 'var(--text-secondary)' }}>{x.area}</div>
                          <div className="flex items-baseline justify-center gap-1 tnum">
                            <span className="text-[20px] font-semibold tracking-[-0.02em]" style={{ color: 'var(--text-primary)' }}>{x.weight}%</span>
                            <span className="mono text-[10px]" style={{ color: 'var(--text-tertiary)' }}>비중</span>
                          </div>
                          <div className="mt-1 mono text-[10.5px]" style={{ color: 'var(--text-tertiary)' }}>×</div>
                          <div className="flex items-baseline justify-center gap-1 tnum">
                            <span className="text-[20px] font-semibold tracking-[-0.02em]" style={{ color: 'var(--text-primary)' }}>{x.retention}%</span>
                            <span className="mono text-[10px]" style={{ color: 'var(--text-tertiary)' }}>보존율</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 pt-4 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 mono text-[12px]" style={{ borderTop: '1px solid var(--border)', color: 'var(--text-tertiary)' }}>
                      <span>(82 × 0.60)</span>
                      <span style={{ color: 'var(--border-strong)' }}>+</span>
                      <span>(92 × 0.30)</span>
                      <span style={{ color: 'var(--border-strong)' }}>+</span>
                      <span>(96 × 0.10)</span>
                      <span style={{ color: 'var(--accent)' }}>≈</span>
                      <span className="tnum text-[14px] font-semibold" style={{ color: 'var(--accent)' }}>75%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3 gap-3">
                    <div className="section-eyebrow">Category Retention</div>
                    <div className="mono text-[10px]" style={{ color: 'var(--text-tertiary)' }}>20 패턴 × 5 카테고리</div>
                  </div>
                  <div className="rounded-[10px] p-5 space-y-3" style={{ background: 'var(--soft)', border: '1px solid var(--border)' }}>
                    {[
                      { code: 'A', name: '표 구조 보존',           sub: '셀 / 헤더 / 병합셀',         val: 89 },
                      { code: 'B', name: '문장 구조 보존',         sub: '줄바꿈 / 문장 병합 / 순서',  val: 93 },
                      { code: 'C', name: '이미지 / 도식 영역',     sub: '도식 · 이미지 메타',         val: 97 },
                      { code: 'D', name: '페이지 / 레이아웃 경계', sub: '페이지 분리 · 정렬',         val: 98 },
                      { code: 'E', name: '주석 / 기호 / 보조',     sub: '각주 · 기호 표시',           val: 98 },
                    ].map((c, i) => (
                      <div key={i}>
                        <div className="flex items-baseline justify-between mb-1.5 gap-3">
                          <div className="flex items-baseline gap-2 min-w-0">
                            <span className="mono text-[11px]" style={{ color: 'var(--accent)' }}>{c.code}</span>
                            <span className="text-[12.5px] font-medium" style={{ color: 'var(--text-primary)' }}>{c.name}</span>
                            <span className="text-[11px] hidden md:inline" style={{ color: 'var(--text-tertiary)' }}>· {c.sub}</span>
                          </div>
                          <div className="tnum mono text-[12px] font-semibold shrink-0" style={{ color: 'var(--text-primary)' }}>{c.val}%</div>
                        </div>
                        <div className="h-[6px] rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${c.val}%`, background: 'var(--accent)' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-[12.5px] leading-[1.7]" style={{ textWrap: 'pretty', color: 'var(--text-tertiary)' }}>
                  영역별 비중을 반영한 가중 평균 보존율 → 단순 평균이 아닌 문서 품질에 대한 객관적 근거 확보. 카테고리·패턴 단위 정량 지표로 후속 개선 액션 도출.
                </p>
              </div>
            }
          />

          <blockquote className="mt-12 quote-accent max-w-[820px] reveal">
            <p className="text-[19px] md:text-[24px] leading-[1.5] tracking-[-0.015em] font-medium" style={{ textWrap: 'pretty', color: 'var(--text-primary)' }}>
              "RAG는 검색 모델만의 문제가 아니라, 그 앞단의 인제스트 설계에서 이미 절반 이상이 결정된다."
            </p>
          </blockquote>
        </div>

        <div className="mt-16 md:mt-20 pt-8 reveal" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="section-eyebrow mb-4">Tech & Tools</div>
          <div className="flex flex-wrap gap-2">
            {['Claude Sonnet 4.6', 'Amazon Bedrock', 'Titan Embedding', 'Python', 'DSL Workflow', 'Prompt Engineering', 'RAG'].map((t) => (
              <span key={t} className="kw-chip">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* AnalysisMiniPreview */
function AnalysisMiniPreview() {
  const pipeline = [
    { lbl: '01 · Input',     title: '두 시점 판정 결과 데이터', desc: '모델 버전 업데이트 전·후 수십만 건의 판정 결과 입력' },
    { lbl: '02 · Match',     title: '이미지 경로 자동 매칭',  desc: 'Path 기준 동일 이미지를 1:1로 매칭해 전후 비교 단위 확보' },
    { lbl: '03 · Aggregate', title: '전환 패턴 통계 산출',    desc: '판정 변화 조합별 건수·비율 자동 집계 — OK·NG·UNK + AICodeName' },
    { lbl: '04 · Output',    title: 'Excel 리포트 자동 생성', desc: '건별 추적 시트 + 전환 통계 시트 2 시트로 자동 출력 (xlsxwriter)' },
  ];
  return (
    <div className="lift-hover rounded-[14px] overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <div className="px-6 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-warm)' }}>
        <span className="mono text-[10.5px] tracking-[0.16em] uppercase" style={{ color: 'var(--text-tertiary)' }}>Tool · Transition Analyzer</span>
        <span className="mono text-[10.5px]" style={{ color: 'var(--text-tertiary)' }}>Python · Pandas · Claude</span>
      </div>

      <div className="px-6 pt-6">
        <div className="section-eyebrow mb-4">Pipeline</div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {pipeline.map((s, i) => (
            <div key={i} className="rounded-[10px] p-4 relative" style={{ background: 'var(--soft)', border: '1px solid var(--border)' }}>
              <div className="mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--accent)' }}>{s.lbl}</div>
              <div className="mt-2 text-[14px] font-semibold leading-[1.35]" style={{ color: 'var(--text-primary)' }}>{s.title}</div>
              <div className="mt-2 text-[12.5px] leading-[1.6]" style={{ textWrap: 'pretty', color: 'var(--text-secondary)' }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pt-7">
        <div className="rounded-[12px] p-5 md:p-6 flex flex-col md:flex-row md:items-start gap-4 md:gap-5"
             style={{ background: 'var(--bg-warm)', border: '1px solid var(--accent)' }}>
          <div className="shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full mono text-[10.5px] uppercase tracking-[0.14em]"
               style={{ background: 'var(--accent)', color: '#fff' }}>
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 9999, background: '#fff' }}></span>
            AI as Partner
          </div>
          <div className="flex-1">
            <p className="text-[13.5px] md:text-[14px] leading-[1.75]" style={{ textWrap: 'pretty', color: 'var(--text-primary)' }}>
              Claude를 코드 생성 도구가 아닌 <strong style={{ color: 'var(--accent)', fontWeight: 700 }}>분석 설계 파트너</strong>로 활용.
              PCB 검사 도메인 지식을 프롬프트에 반영할 때 자동화 가치가 극대화됨.
            </p>
            <p className="mt-2 text-[12.5px] leading-[1.7]" style={{ textWrap: 'pretty', color: 'var(--text-secondary)' }}>
              모델 배포 전 성능 변화 사전 검증 체계 확보 → 수작업 분석 대비 리드타임 단축, 분석 기준 일관성 확보, 팀 내 분석 업무 표준화 기여.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pt-7 pb-6">
        <div className="flex items-center justify-between mb-4 gap-3">
          <div className="section-eyebrow">Output · 재구성 예시</div>
          <div className="mono text-[10px]" style={{ color: 'var(--text-tertiary)' }}>※ 포트폴리오용 샘플</div>
        </div>

        <div className="rounded-[12px] overflow-hidden" style={{
          border: '1px solid #C9D2C9',
          background: '#EEF1ED',
          ['--d-card']: '#FFFFFF',
          ['--d-soft']: '#E2E7E0',
          ['--d-border']: '#C9D2C9',
          ['--d-divider']: '#DDE3DA',
          ['--d-text']: '#243029',
          ['--d-text-2']: '#5A6B5F',
          ['--d-text-3']: '#8A988C',
        }}>
          <div className="px-3 py-2 flex items-center gap-2" style={{ borderBottom: '1px solid var(--d-divider)', background: '#E2E7E0' }}>
            <span className="block w-2 h-2 rounded-full" style={{ background: '#E8A48E' }}></span>
            <span className="block w-2 h-2 rounded-full" style={{ background: '#E8C77E' }}></span>
            <span className="block w-2 h-2 rounded-full" style={{ background: '#9DC59C' }}></span>
            <span className="ml-3 mono text-[10.5px]" style={{ color: 'var(--d-text-3)' }}>analyzer.local · transition-dashboard</span>
          </div>

          <div className="px-5 py-3 flex flex-wrap items-center justify-between gap-3" style={{ borderBottom: '1px solid var(--d-divider)', background: '#F2F5F0' }}>
            <div className="flex items-center gap-2 mono text-[10.5px]" style={{ color: 'var(--d-text-3)' }}>
              <span>Workspace</span>
              <span style={{ color: 'var(--d-border)' }}>/</span>
              <span>ATI55 · DME · 리드미 에칭</span>
              <span style={{ color: 'var(--d-border)' }}>/</span>
              <span style={{ color: 'var(--d-text)', fontWeight: 600 }}>Transition Analysis</span>
            </div>
            <div className="flex items-center gap-2 mono text-[10.5px]" style={{ color: 'var(--d-text-3)' }}>
              <span>v2.4</span>
              <span style={{ color: 'var(--accent)' }}>→</span>
              <span>v2.5</span>
            </div>
          </div>

          <div className="p-5" style={{ background: '#EEF1ED' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { lbl: 'Total · 처리 대상',    val: '248,719', sub: '건' },
                { lbl: 'Retained · 판정 유지', val: '86.9',    sub: '%' },
                { lbl: 'Improved · NG → OK',  val: '+3.6',    sub: '%p', accent: true },
                { lbl: 'Risk · OK → NG',      val: '−4.1',    sub: '%p' },
              ].map((k, i) => (
                <div key={i} className="rounded-[10px] p-4" style={{ background: 'var(--d-card)', border: '1px solid var(--d-border)' }}>
                  <div className="mono text-[10px] uppercase tracking-[0.08em]" style={{ color: 'var(--d-text-3)' }}>{k.lbl}</div>
                  <div className="mt-2 flex items-baseline gap-1 tnum">
                    <span className="text-[24px] font-semibold tracking-[-0.02em] leading-none" style={{ color: k.accent ? '#4A6B5C' : 'var(--d-text)' }}>{k.val}</span>
                    <span className="text-[12px] mono" style={{ color: 'var(--d-text-2)' }}>{k.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-7 rounded-[10px] p-4" style={{ background: 'var(--d-card)', border: '1px solid var(--d-border)' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[12.5px] font-semibold" style={{ color: 'var(--d-text)' }}>전환 매트릭스</div>
                  <div className="mono text-[10.5px]" style={{ color: 'var(--d-text-3)' }}>Before × After · 비율(%)</div>
                </div>
                <div>
                  <div className="flex">
                    <div className="w-20 shrink-0"></div>
                    <div className="grid grid-cols-3 gap-2 flex-1">
                      {['OK', 'NG', 'UNK'].map(l => (
                        <div key={l} className="text-center mono text-[10.5px] uppercase tracking-[0.06em]" style={{ color: 'var(--d-text-3)' }}>After · {l}</div>
                      ))}
                    </div>
                  </div>
                  {[
                    { row: 'OK',  vals: [62.4, 4.1, 1.2] },
                    { row: 'NG',  vals: [3.6, 18.7, 1.8] },
                    { row: 'UNK', vals: [1.4, 1.0, 5.8] },
                  ].map((r, ri) => (
                    <div key={r.row} className="flex items-stretch mt-2">
                      <div className="w-20 shrink-0 flex items-center">
                        <span className="mono text-[10.5px] uppercase tracking-[0.06em]" style={{ color: 'var(--d-text-3)' }}>Before · {r.row}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 flex-1">
                        {r.vals.map((v, ci) => {
                          const isDiag = ri === ci;
                          const t = Math.min(v / 65, 1);
                          const bg = isDiag
                            ? `rgba(74,107,92,${0.06 + t * 0.74})`
                            : `rgba(125,148,130,${0.04 + t * 0.18})`;
                          return (
                            <div key={ci} className="rounded-[6px] h-11 flex items-center justify-center"
                                 style={{ background: bg, color: isDiag && t > 0.4 ? '#fff' : 'var(--d-text)', border: '1px solid var(--d-border)' }}>
                              <span className="tnum mono text-[12px] font-medium">{v.toFixed(1)}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5 rounded-[10px] p-4" style={{ background: 'var(--d-card)', border: '1px solid var(--d-border)' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[12.5px] font-semibold" style={{ color: 'var(--d-text)' }}>주요 전환 패턴</div>
                  <div className="mono text-[10.5px]" style={{ color: 'var(--d-text-3)' }}>Top 5</div>
                </div>
                <div className="space-y-3">
                  {(() => {
                    const rows = [
                      { from: 'NG',  to: 'OK',  count: 3891 },
                      { from: 'OK',  to: 'NG',  count: 1204 },
                      { from: 'NG',  to: 'UNK', count:  456 },
                      { from: 'UNK', to: 'NG',  count:  312 },
                      { from: 'OK',  to: 'UNK', count:  198 },
                    ];
                    const max = rows[0].count;
                    return rows.map((t, i) => (
                      <div key={i}>
                        <div className="flex items-baseline justify-between mb-1.5">
                          <div className="flex items-center gap-1.5 mono text-[11px]">
                            <span style={{ color: 'var(--d-text-3)' }}>{t.from}</span>
                            <span style={{ color: 'var(--d-border)' }}>→</span>
                            <span style={{ color: 'var(--d-text)', fontWeight: 600 }}>{t.to}</span>
                          </div>
                          <div className="tnum mono text-[11px]" style={{ color: 'var(--d-text-2)' }}>{t.count.toLocaleString()} 건</div>
                        </div>
                        <div className="h-[5px] rounded-full overflow-hidden" style={{ background: 'var(--d-soft)' }}>
                          <div className="h-full rounded-full" style={{ width: `${(t.count / max) * 100}%`, background: i === 0 ? '#4A6B5C' : 'var(--d-text-3)' }}></div>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>

            {/* 건별 추적 샘플 */}
            <div className="mt-5 rounded-[10px] p-4" style={{ background: 'var(--d-card)', border: '1px solid var(--d-border)' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="text-[12.5px] font-semibold" style={{ color: 'var(--d-text)' }}>건별 추적 샘플</div>
                <div className="mono text-[10.5px]" style={{ color: 'var(--d-text-3)' }}>이미지 경로 매칭 결과</div>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="w-full text-[11.5px]" style={{ color: 'var(--d-text)', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ color: 'var(--d-text-3)' }}>
                      <th className="py-2 px-2 mono uppercase tracking-[0.06em] text-[10px]" style={{ textAlign: 'left', fontWeight: 400 }}>Image Path</th>
                      <th className="py-2 px-2 mono uppercase tracking-[0.06em] text-[10px]" style={{ textAlign: 'left', fontWeight: 400 }}>Before</th>
                      <th className="py-2 px-2 mono uppercase tracking-[0.06em] text-[10px]" style={{ textAlign: 'left', fontWeight: 400 }}>After</th>
                      <th className="py-2 px-2 mono uppercase tracking-[0.06em] text-[10px]" style={{ textAlign: 'left', fontWeight: 400 }}>AICodeName</th>
                      <th className="py-2 px-2 mono uppercase tracking-[0.06em] text-[10px]" style={{ textAlign: 'left', fontWeight: 400 }}>Δ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { path: '/AFVI/MX-218/2025-11-04/img-018721.tif', b: 'NG',  a: 'OK',  code: 'Particle → Particle', delta: '개선' },
                      { path: '/AFVI/MX-218/2025-11-04/img-018992.tif', b: 'OK',  a: 'NG',  code: 'Discolor → Peeloff',  delta: '리스크' },
                      { path: '/AFVI/MX-219/2025-11-04/img-019104.tif', b: 'NG',  a: 'OK',  code: 'Open → Scratch',      delta: '개선' },
                      { path: '/AFVI/MX-220/2025-11-04/img-019288.tif', b: 'UNK', a: 'NG',  code: 'Short → Peeloff',     delta: '경계' },
                    ].map((r, i) => (
                      <tr key={i} style={{ borderTop: '1px solid var(--d-divider)' }}>
                        <td className="py-2 px-2 mono text-[11px]" style={{ color: 'var(--d-text-2)' }}>{r.path}</td>
                        <td className="py-2 px-2 mono" style={{ color: 'var(--d-text-3)' }}>{r.b}</td>
                        <td className="py-2 px-2 mono" style={{ color: 'var(--d-text)', fontWeight: 600 }}>{r.a}</td>
                        <td className="py-2 px-2" style={{ color: 'var(--d-text-2)' }}>{r.code}</td>
                        <td className="py-2 px-2 mono text-[10.5px]" style={{ color: r.delta === '개선' ? '#4A6B5C' : 'var(--d-text-3)' }}>{r.delta}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

/* Project InterX */
function ProjectInterX() {
  const roles = [
    { title: 'AI 판정 성능·로직 고도화',  desc: '과검·미검 원인 분석 및 판정 로직 설계' },
    { title: '학습 데이터 품질 관리',     desc: '불량 유형별 데이터 정제 및 클래스 개선' },
    { title: '분석 자동화·효율 개선',     desc: 'Python 기반 로그 분석 자동화로 분석 리드타임 단축' },
    { title: '기술 커뮤니케이션·협업',    desc: 'R&D 협업을 통한 모델 개선 사이클 운영' },
  ];
  return (
    <section id="proj-interx" className="py-24 md:py-32" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        <ProjectHeader
          num="02"
          eyebrow="Featured Project · 02"
          title="심텍 Vision AI PCB 검사 모델 개선"
          subtitle={<>딥러닝 기반 검사 모델의 오분류를 데이터·로직 양면에서 개선,<br />그리고 AI를 분석 파트너로 삼아 검증 자동화까지 구축.</>}
          meta={['인터엑스', 'AI Consultant', '2024.09 — 2026.01']}
        />

        <RoleSection items={roles} />

        <div className="mt-16 md:mt-24 reveal">
          <SubHeader
            index={1}
            lead={true}
            label="Sub Project 1"
            title="AI 판정 전환 분석기"
            subtitle="모델 배포 전 성능 변화를 자동 비교·검증하는 분석 도구 — 단독 기획·구현."
          />
          <AnalysisMiniPreview />
        </div>

        <div className="mt-20 md:mt-28 reveal">
          <SubHeader
            index={2}
            lead={false}
            label="Sub Project 2"
            title="PCB 검사 모델 로직 · 데이터 전략 개선"
            subtitle="오분류 원인 분석과 전략적 데이터 수집으로 OK Rate 10.38%p 개선·데이터셋 33.5% 확장 — R&D팀과 공동 작업."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="card-hover rounded-[14px] p-7 md:p-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="section-eyebrow">성과 · 모델 로직 개선</div>
              <div className="mt-6 flex items-baseline gap-3 tnum">
                <span className="text-[60px] md:text-[80px] font-semibold tracking-[-0.04em] leading-none" style={{ color: 'var(--accent)' }}>+10.38</span>
                <span className="text-[16px] mono" style={{ color: 'var(--text-secondary)' }}>%p</span>
              </div>
              <div className="mt-3 mono text-[13px] tnum" style={{ color: 'var(--text-secondary)' }}>OK Rate · 62.21% → 72.59%</div>
              <p className="mt-6 text-[14.5px] leading-[1.7]" style={{ textWrap: 'pretty', color: 'var(--text-primary)' }}>
                Mono 이미지 검사에서 Peeloff(치명 불량)와 이물질(양품)이 형태가 유사해 오분류되는 문제.
                단일 임계값 적용 → 한계 발견 → 근본 원인 분석 → 조명별 차등 임계값(PSR/PAD) 적용으로 Peeloff 미검과 이물질 과검을 동시에 감소.
              </p>
              <div className="mt-6 pt-5 flex flex-wrap gap-2" style={{ borderTop: '1px solid var(--border)' }}>
                <span className="kw-chip">Otsu Gray Value</span>
                <span className="kw-chip">조명별 차등 임계값</span>
                <span className="kw-chip">단계적 가설 검증</span>
              </div>
            </div>

            <div className="card-hover rounded-[14px] p-7 md:p-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="section-eyebrow">성과 · 데이터 전략</div>
              <div className="mt-6 flex items-baseline gap-3 tnum">
                <span className="text-[60px] md:text-[80px] font-semibold tracking-[-0.04em] leading-none" style={{ color: 'var(--accent)' }}>+36</span>
                <span className="text-[16px] mono" style={{ color: 'var(--text-secondary)' }}>% 확장</span>
              </div>
              <div className="mt-3 mono text-[13px] tnum" style={{ color: 'var(--text-secondary)' }}>데이터셋 · 109,351 → 148,596 (2025.02 → 12)</div>
              <p className="mt-6 text-[14.5px] leading-[1.7]" style={{ textWrap: 'pretty', color: 'var(--text-primary)' }}>
                무작위 데이터 수집의 비효율을 끊고, 과검·미검 이미지의 오분류 패턴 분석을 통해 개선 우선순위 결함 유형을 선별.
                현장 오퍼레이터와 협업해 타깃 결함 유형 중심의 전략적 수집 프로세스를 구축하고 희소 클래스 데이터를 확보.
              </p>
              <div className="mt-6 pt-5 flex flex-wrap gap-2" style={{ borderTop: '1px solid var(--border)' }}>
                <span className="kw-chip">희소 클래스 확보</span>
                <span className="kw-chip">모델-데이터 형상 관리</span>
                <span className="kw-chip">현장 협업</span>
              </div>
            </div>
          </div>
        </div>

        <blockquote className="mt-12 md:mt-16 quote-accent max-w-[820px] reveal">
          <p className="text-[19px] md:text-[24px] leading-[1.5] tracking-[-0.015em] font-medium" style={{ textWrap: 'pretty', color: 'var(--text-primary)' }}>
            "단일 임계값 → 한계 → 근본 원인 분석 → 조명별 차등 적용. 때로는 솔루션의 실패가 더 본질적인 문제를 드러낸다."
          </p>
        </blockquote>
      </div>
    </section>
  );
}

/* Project NHN */
function ProjectNHN() {
  const roles = [
    { title: '기술 지원 · CS 운영',         desc: '클라우드 인프라·티켓 예매 서비스의 사용자 문의 1차 대응 및 처리' },
    { title: 'VOC 분석 · 인사이트 도출',    desc: '상담 로그 정밀 분석으로 사용자 Pain Point 발굴 및 개선 의제 제안' },
    { title: 'CS 지식 베이스 구축',         desc: '상담 사례 정리·표준화로 KB 보완 — 신규 직원 온보딩 시간 단축' },
    { title: '위기 대응 프로세스 설계',     desc: '대규모 장애·외부 이슈 대응 매뉴얼 표준화 및 시범 운영 검증' },
  ];
  const miniCases = [
    { title: '코로나19 확진자 티켓 취소 매뉴얼', body: '위기 시 정책 설계로 처리 시간 단축, 부정 취소 감소.\n증빙 기준 표준화 + 전담 팀 운영 + 시범 운영을 통한 검증.' },
    { title: '저성과 직원 코칭',                body: '상담 로그·이력 정밀 분석으로 근본 원인 파악(기술 용어 이해 부족)\n→ 지식 베이스 보완 + 1:1 코칭으로 팀 생산성 개선.' },
  ];
  return (
    <section id="proj-nhn" className="py-24 md:py-32" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        <ProjectHeader
          num="03"
          eyebrow="Featured Project · 03"
          title="Customer Service Foundation"
          subtitle={<>NHN Cloud · 티켓링크의 CS 운영을 6년 담당.<br />사용자가 무엇에 어디서 막히는지를 가장 가까이서 들어온 시간<br />— Pain Point를 데이터·구조로 환원하는 사고의 토대.</>}
          meta={['NHN Service', 'Customer Service', '2018.02 — 2024.02']}
        />

        <RoleSection items={roles} />

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-3 reveal">
          {miniCases.map((c, i) => (
            <div key={i} className="card-hover rounded-[14px] p-7 md:p-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="section-eyebrow mb-4">Mini Case · 0{i+1}</div>
              <div className="text-[17px] md:text-[19px] font-semibold tracking-[-0.01em]" style={{ color: 'var(--text-primary)' }}>{c.title}</div>
              <p className="mt-4 text-[14.5px] leading-[1.75]" style={{ textWrap: 'pretty', color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ProjectHana, ProjectInterX, ProjectNHN });
