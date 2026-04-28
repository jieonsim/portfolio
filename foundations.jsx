/* ===== App ===== */

function App() {
  useReveal();
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <TopNav />
      <SectionRail />
      <main>
        <Hero />
        <About />
        <Career />
        <ProjectHana />
        <ProjectInterX />
        <ProjectNHN />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
