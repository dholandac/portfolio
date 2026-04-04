import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  appsDesktop,
  casosWeb,
  galeriaDesign,
  perfil,
  resumoProfissional
} from './data/portfolioData';

const ROTAS_VALIDAS = ['/desenvolvimento', '/design'];
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function obterRotaAtual() {
  const caminho = window.location.pathname.replace(/\/+$/, '') || '/';
  if (ROTAS_VALIDAS.includes(caminho)) {
    return caminho;
  }
  return '/desenvolvimento';
}

function App() {
  const [rotaAtual, setRotaAtual] = useState(obterRotaAtual);
  const [slideAtual, setSlideAtual] = useState(0);
  const [arteExpandida, setArteExpandida] = useState(null);
  const lightboxPanelRef = useRef(null);
  const closeButtonRef = useRef(null);
  const ultimoFocoRef = useRef(null);
  const totalSlides = galeriaDesign.length;
  const slideAtivo = useMemo(() => galeriaDesign[slideAtual], [slideAtual]);

  const navegar = (rota) => {
    if (rota !== rotaAtual) {
      window.history.pushState({}, '', rota);
      setRotaAtual(rota);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const irParaAnterior = useCallback(() => {
    setSlideAtual((valorAtual) =>
      valorAtual === 0 ? totalSlides - 1 : valorAtual - 1
    );
  }, [totalSlides]);

  const irParaProximo = useCallback(() => {
    setSlideAtual((valorAtual) =>
      valorAtual === totalSlides - 1 ? 0 : valorAtual + 1
    );
  }, [totalSlides]);

  const abrirArteExpandida = (arte) => {
    setArteExpandida(arte);
  };

  const fecharArteExpandida = () => {
    setArteExpandida(null);
  };

  useEffect(() => {
    const rotaLegada = window.location.hash.replace('#', '').trim();
    if (ROTAS_VALIDAS.includes(rotaLegada)) {
      window.history.replaceState({}, '', rotaLegada);
    }

    const rotaInicial = obterRotaAtual();
    if (window.location.pathname !== rotaInicial) {
      window.history.replaceState({}, '', rotaInicial);
    }
    setRotaAtual(rotaInicial);

    const aoMudarRota = () => {
      setRotaAtual(obterRotaAtual());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', aoMudarRota);
    return () => window.removeEventListener('popstate', aoMudarRota);
  }, []);

  useEffect(() => {
    if (rotaAtual === '/design') {
      document.title = 'Daniel Holanda | Design';
      return;
    }
    document.title = 'Daniel Holanda | Desenvolvimento';
  }, [rotaAtual]);

  useEffect(() => {
    if (rotaAtual !== '/design' || arteExpandida) {
      return undefined;
    }

    const aoPressionarTecla = (evento) => {
      const alvo = evento.target;
      if (
        alvo instanceof HTMLElement &&
        (['INPUT', 'TEXTAREA', 'SELECT'].includes(alvo.tagName) ||
          alvo.isContentEditable)
      ) {
        return;
      }

      if (evento.key === 'ArrowLeft') {
        evento.preventDefault();
        irParaAnterior();
      }

      if (evento.key === 'ArrowRight') {
        evento.preventDefault();
        irParaProximo();
      }
    };

    window.addEventListener('keydown', aoPressionarTecla);
    return () => window.removeEventListener('keydown', aoPressionarTecla);
  }, [arteExpandida, irParaAnterior, irParaProximo, rotaAtual]);

  useEffect(() => {
    if (!arteExpandida) {
      document.body.style.overflow = '';
      if (ultimoFocoRef.current) {
        ultimoFocoRef.current.focus();
        ultimoFocoRef.current = null;
      }
      return undefined;
    }

    ultimoFocoRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = 'hidden';

    const frame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const aoPressionarTecla = (evento) => {
      if (evento.key === 'Escape') {
        evento.preventDefault();
        fecharArteExpandida();
        return;
      }

      if (evento.key !== 'Tab') {
        return;
      }

      const container = lightboxPanelRef.current;
      if (!container) {
        return;
      }

      const elementosFocaveis = Array.from(
        container.querySelectorAll(FOCUSABLE_SELECTOR)
      );

      if (!elementosFocaveis.length) {
        evento.preventDefault();
        container.focus();
        return;
      }

      const primeiro = elementosFocaveis[0];
      const ultimo = elementosFocaveis[elementosFocaveis.length - 1];
      const ativo = document.activeElement;

      if (evento.shiftKey && ativo === primeiro) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && ativo === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      }
    };

    window.addEventListener('keydown', aoPressionarTecla);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('keydown', aoPressionarTecla);
      document.body.style.overflow = '';
    };
  }, [arteExpandida]);

  return (
    <div className="page">
      <div className="noise" />

      <header className="topbar">
        <nav className="topbar-nav container" aria-label="Seções do portfólio">
          <button
            type="button"
            aria-current={rotaAtual === '/desenvolvimento' ? 'page' : undefined}
            className={rotaAtual === '/desenvolvimento' ? 'active' : ''}
            onClick={() => navegar('/desenvolvimento')}
          >
            Desenvolvimento
          </button>
          <button
            type="button"
            aria-current={rotaAtual === '/design' ? 'page' : undefined}
            className={rotaAtual === '/design' ? 'active' : ''}
            onClick={() => navegar('/design')}
          >
            Design
          </button>
        </nav>
      </header>

      <section className="hero container reveal">
        <p className="kicker">Portfólio</p>
        <h1>{perfil.nome}</h1>
        <p className="title">{perfil.titulo}</p>
        <p className="hero-description">{perfil.descricao}</p>
        <p className="signature">{perfil.frase}</p>

        <nav className="hero-links" aria-label="Links principais">
          <a href={perfil.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={perfil.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${perfil.email}`}>Contato</a>
        </nav>
      </section>

      <main
        className={`container content ${
          rotaAtual === '/desenvolvimento' ? 'dev-view' : 'design-view'
        }`}
      >
        {rotaAtual === '/desenvolvimento' ? (
          <>
            <section className="reveal section-block" aria-labelledby="perfil-profissional">
              <div className="section-head">
                <h2 id="perfil-profissional">Perfil Profissional</h2>
                <p>Resumo rápido do meu foco profissional e da minha trajetória.</p>
              </div>
              <div className="principles">
                {resumoProfissional.map((item) => (
                  <article className="principle" key={item.titulo}>
                    <h3>{item.titulo}</h3>
                    <p>{item.descricao}</p>
                    {item.itens ? (
                      <ul className="principle-list">
                        {item.itens.map((linha) => (
                          <li key={linha}>{linha}</li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>

            <section className="reveal section-block" aria-labelledby="web">
              <div className="section-head">
                <h2 id="web">Desenvolvimento Web</h2>
                <p>Projetos com foco em arquitetura, usabilidade e impacto.</p>
              </div>

              <div className="entry-list">
                {casosWeb.map((caso) => (
                  <article className="entry entry-media" key={caso.nome}>
                    <div className="entry-layout">
                      <div className="entry-copy">
                        <h3>{caso.nome}</h3>
                        <p>
                          <strong>Objetivo:</strong> {caso.objetivo}
                        </p>
                        <p>
                          <strong>Decisão técnica:</strong> {caso.decisao}
                        </p>
                        <p>
                          <strong>Resultado:</strong> {caso.resultado}
                        </p>
                        <footer>
                          <span>{caso.stack}</span>
                        </footer>
                      </div>

                      <aside className="entry-thumb" style={{ '--tom': caso.tom }}>
                        <a href={caso.link} className="entry-study-link">
                          Ver estudo
                        </a>
                        {caso.thumb ? (
                          <img src={caso.thumb} alt={`Thumb do projeto ${caso.nome}`} />
                        ) : (
                          <div className="entry-thumb-placeholder" aria-hidden="true" />
                        )}
                      </aside>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="reveal section-block" aria-labelledby="desktop">
              <div className="section-head">
                <h2 id="desktop">Aplicações Desktop</h2>
                <p>Ferramentas para cenários operacionais e ambientes críticos.</p>
              </div>

              <div className="entry-list">
                {appsDesktop.map((app) => (
                  <article className="entry entry-media" key={app.nome}>
                    <div className="entry-layout">
                      <div className="entry-copy">
                        <h3>{app.nome}</h3>
                        <p>
                          <strong>Objetivo:</strong> {app.objetivo}
                        </p>
                        <p>
                          <strong>Decisão técnica:</strong> {app.decisao}
                        </p>
                        <p>
                          <strong>Resultado:</strong> {app.resultado}
                        </p>
                        <footer>
                          <span>{app.stack}</span>
                        </footer>
                      </div>

                      <aside className="entry-thumb" style={{ '--tom': app.tom }}>
                        <a href={app.link} className="entry-study-link">
                          Ver estudo
                        </a>
                        {app.thumb ? (
                          <img src={app.thumb} alt={`Thumb do projeto ${app.nome}`} />
                        ) : (
                          <div className="entry-thumb-placeholder" aria-hidden="true" />
                        )}
                      </aside>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className="reveal section-block" aria-labelledby="design">
            <div className="section-head">
              <h2 id="design">Design</h2>
              <p>
                Galeria enxuta com alguns trabalhos selecionados. Em breve, novos
                projetos serão adicionados.
              </p>
            </div>

            <div
              className="carousel"
              role="region"
              aria-label="Carrossel de trabalhos de design"
            >
              <button
                type="button"
                className="carousel-button"
                onClick={irParaAnterior}
                aria-label="Slide anterior"
              >
                <svg
                  className="carousel-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M14.5 5.5L8 12L14.5 18.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <article className="carousel-main">
                <button
                  type="button"
                  className="slide-art slide-open"
                  style={{ '--tom': slideAtivo.tom }}
                  onClick={() => abrirArteExpandida(slideAtivo)}
                  aria-label={
                    slideAtivo.tipo === 'video'
                      ? `Abrir vídeo ${slideAtivo.titulo}`
                      : `Ampliar imagem ${slideAtivo.titulo}`
                  }
                >
                  {slideAtivo.tipo === 'video' ? (
                    <video src={slideAtivo.imagem} muted playsInline loop autoPlay />
                  ) : slideAtivo.imagem ? (
                    <img src={slideAtivo.imagem} alt={slideAtivo.titulo} loading="lazy" />
                  ) : (
                    <div className="slide-placeholder" aria-hidden="true">
                      <span>{slideAtivo.categoria}</span>
                    </div>
                  )}
                </button>

                <div className="slide-info">
                  <h3>{slideAtivo.titulo}</h3>
                  <p>{slideAtivo.descricao}</p>
                  <div className="slide-meta">
                    <span>{slideAtivo.categoria}</span>
                    <span>{slideAtivo.ferramenta}</span>
                  </div>
                </div>
              </article>

              <button
                type="button"
                className="carousel-button"
                onClick={irParaProximo}
                aria-label="Próximo slide"
              >
                <svg
                  className="carousel-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M9.5 5.5L16 12L9.5 18.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="carousel-controls" aria-label="Selecionar arte">
              <div className="carousel-dots">
                {galeriaDesign.map((arte, index) => (
                  <button
                    key={arte.titulo}
                    type="button"
                    className={`dot ${slideAtual === index ? 'active' : ''}`}
                    onClick={() => setSlideAtual(index)}
                    aria-label={`Abrir slide ${index + 1}`}
                    aria-current={slideAtual === index ? 'true' : undefined}
                  />
                ))}
              </div>
              <p className="carousel-count" aria-live="polite" aria-atomic="true">
                Slide {slideAtual + 1} de {totalSlides}: {slideAtivo.titulo}
              </p>
            </div>
          </section>
        )}
      </main>

      {arteExpandida ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          onClick={fecharArteExpandida}
        >
          <div
            className="lightbox-panel"
            ref={lightboxPanelRef}
            tabIndex={-1}
            onClick={(evento) => evento.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-close"
              ref={closeButtonRef}
              onClick={fecharArteExpandida}
              aria-label="Fechar visualização ampliada"
            >
              Fechar
            </button>

            <div className="lightbox-media">
              {arteExpandida.tipo === 'video' ? (
                <video
                  src={arteExpandida.imagem}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                />
              ) : (
                <img src={arteExpandida.imagem} alt={arteExpandida.titulo} />
              )}
            </div>

            <p id="lightbox-title" className="lightbox-caption">
              {arteExpandida.titulo} - {arteExpandida.categoria}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
