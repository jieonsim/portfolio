/* ===== Foundations: TopNav, SectionRail, ScrollReveal, MetaCard ===== */
const { useState, useEffect, useRef } = React;

/* IntersectionObserver-based reveal */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* Top Nav */
function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [['About', '#about'], ['Career', '#career'], ['Projects', '#projects'], ['Contact', '#contact']];
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="font-semibold tracking-tight text-[15px]" style={{ color: 'var(--text-primary)' }}>Jieon Sim</span>
        </a>
        <nav className="nav-links flex items-center gap-6 md:gap-9">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-[13px] md:text-[13.5px] transition-colors duration-200 relative group"
               style={{ color: 'var(--text-secondary)' }}
               onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
               onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
              {label}
              <span className="absolute -bottom-1 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ background: 'var(--accent)' }}></span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* Right-rail section index */
function SectionRail() {
  const sections = [
    ['01', 'About', '#about'],
    ['02', 'Career', '#career'],
    ['03', 'POSICUBE', '#projects'],
    ['04', 'InterX', '#proj-interx'],
    ['05', 'NHN SERVICE', '#proj-nhn'],
    ['06', 'Contact', '#contact'],
  ];
  const [active, setActive] = useState('#about');
  useEffect(() => {
    const ids = sections.map((s) => s[2].slice(1));
    const onScroll = () => {
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= 200) cur = id;
      }
      setActive('#' + cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="rail hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-1">
      {sections.map(([num, label, href]) => (
        <a key={href} href={href} className={`rail-link ${active === href ? 'active' : ''}`}>
          <span className="rail-line"></span>
          <span className="rail-label tnum">
            <span className="mono" style={{ marginRight: 8, opacity: 0.7 }}>{num}</span>
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}

Object.assign(window, { TopNav, SectionRail, useReveal });
