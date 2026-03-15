import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <img
            src="/bioclin-logo.png"
            alt="Bioclin"
            style={styles.logoImage}
          />
        </div>

        <nav style={styles.nav}>
          <button style={{ ...styles.navLink, ...styles.activeLink }}>
            Home
          </button>
          <button style={styles.navLink}>Bioquímica</button>
          <button style={styles.navLink}>Hematologia</button>
          <button style={styles.navLink}>Contato</button>
        </nav>
      </header>

      <main style={styles.main}>
        <section style={styles.heroSection}>
          <div style={{ ...styles.heroBg, ...styles.colesterolBg }}>
            <div style={styles.overlay} />
            <div style={styles.content}>
              <p style={styles.badge}>Bioquímica</p>
              <h1 style={styles.title}>Colesterol total e frações</h1>
              <p style={styles.subtitle}>
                Acesse a calculadora para estimar LDL-c por Friedewald, Martin e
                Sampson, além de IMC, colesterol não-HDL e relações lipídicas.
              </p>
              <button
                style={styles.primaryButton}
                onClick={() => navigate("/lipidograma")}
              >
                Abrir calculadora
              </button>
            </div>
          </div>
        </section>

        <section style={styles.heroSection}>
          <div style={{ ...styles.heroBg, ...styles.hematologiaBg }}>
            <div style={styles.overlay} />
            <div style={styles.contentSmall}>
              <p style={styles.badge}>Hematologia</p>
              <h2 style={styles.sectionTitle}>Parâmetros aterogênicos</h2>
              <p style={styles.sectionText}>
                Acesse a calculadora para obter NLR, AIP, PLR, SII, SIRI, MHR,
                TyG e TyG × IMC.
              </p>
              <button
                style={styles.primaryButton}
                onClick={() => navigate("/hematologia")}
              >
                Abrir calculadora
              </button>
            </div>
          </div>
        </section>

        <section style={styles.catalogSection}>
          <p style={styles.catalogIntro}>
          </p>

          <div style={styles.catalogCard}>
            <div style={styles.catalogImageArea}>
              <img
                src="/banner.jpg"
                alt="Profissional realizando dosagem em laboratório"
                style={styles.catalogImage}
              />
            </div>

            <div style={styles.catalogContent}>
              <div style={styles.categoryBlock}>
                <h2 style={styles.categoryTitle}>Bioquímica</h2>

                <button
                  style={styles.linkButton}
                  onClick={() => navigate("/lipidograma")}
                >
                  Colesterol total e frações
                </button>

                <button
                  style={styles.linkButton}
                  onClick={() => navigate("/lipidograma")}
                >
                  Colesterol não-HDL
                </button>

                <button
                  style={styles.linkButton}
                  onClick={() => navigate("/lipidograma")}
                >
                  Relação TG / HDL-c
                </button>

                <button
                  style={styles.linkButton}
                  onClick={() => navigate("/lipidograma")}
                >
                  Relação CT / HDL-c
                </button>

                <button
                  style={styles.linkButton}
                  onClick={() => navigate("/hematologia")}
                >
                  Índice Aterogênico de Plasma (AIP)
                </button>

                <button
                  style={styles.linkButton}
                  onClick={() => navigate("/hematologia")}
                >
                  Índice TyG
                </button>

                <button
                  style={styles.linkButton}
                  onClick={() => navigate("/hematologia")}
                >
                  TyG × IMC
                </button>
              </div>

              <div style={styles.categoryBlock}>
                <h2 style={styles.categoryTitle}>Hematologia</h2>

                <button
                  style={styles.linkButton}
                  onClick={() => navigate("/hematologia")}
                >
                  Relação Neutrófilos / Linfócitos (NLR)
                </button>

                <button
                  style={styles.linkButton}
                  onClick={() => navigate("/hematologia")}
                >
                  Relação Plaquetas / Linfócitos (PLR)
                </button>

                <button
                  style={styles.linkButton}
                  onClick={() => navigate("/hematologia")}
                >
                  Índice Inflamatório Sistêmico (SII)
                </button>

                <button
                  style={styles.linkButton}
                  onClick={() => navigate("/hematologia")}
                >
                  Índice de Resposta Inflamatória Sistêmica (SIRI)
                </button>

                <button
                  style={styles.linkButton}
                  onClick={() => navigate("/hematologia")}
                >
                  Relação Monócitos / HDL-c (MHR)
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#08111f",
  },

  header: {
    width: "100%",
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "20px 28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
  },

  logoImage: {
    height: "58px",
    objectFit: "contain",
    display: "block",
  },

  nav: {
    display: "flex",
    alignItems: "center",
    gap: "26px",
    flexWrap: "wrap",
  },

  navLink: {
    background: "transparent",
    border: "none",
    color: "rgba(255,255,255,0.65)",
    fontSize: "15px",
    cursor: "pointer",
    padding: "8px 0",
  },

  activeLink: {
    color: "#22c7c7",
    borderBottom: "2px solid #22c7c7",
  },

  main: {
    width: "100%",
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "8px 28px 40px",
  },

  heroSection: {
    marginBottom: "28px",
  },

  heroBg: {
    position: "relative",
    minHeight: "540px",
    borderRadius: "28px",
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
    display: "flex",
    alignItems: "center",
  },

  colesterolBg: {
    backgroundImage: "url('/laboratorio.jpg')",
  },

  hematologiaBg: {
    backgroundImage: "url('/hemato.jpg')",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(90deg, rgba(7,15,30,0.86) 0%, rgba(7,15,30,0.72) 45%, rgba(7,15,30,0.54) 100%)",
  },

  content: {
    position: "relative",
    zIndex: 1,
    maxWidth: "700px",
    padding: "48px",
    color: "#ffffff",
  },

  contentSmall: {
    position: "relative",
    zIndex: 1,
    maxWidth: "720px",
    padding: "40px 48px",
    color: "#ffffff",
  },

  badge: {
    display: "inline-block",
    margin: 0,
    marginBottom: "18px",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "rgba(34, 199, 199, 0.14)",
    color: "#7ee7e7",
    fontSize: "14px",
    fontWeight: 700,
    border: "1px solid rgba(126, 231, 231, 0.28)",
  },

  title: {
    margin: 0,
    fontSize: "56px",
    lineHeight: 1.08,
    fontWeight: 800,
    letterSpacing: "-0.02em",
  },

  subtitle: {
    marginTop: "18px",
    marginBottom: "28px",
    fontSize: "18px",
    lineHeight: 1.75,
    color: "rgba(255,255,255,0.84)",
    maxWidth: "660px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "40px",
    lineHeight: 1.15,
    fontWeight: 800,
    letterSpacing: "-0.02em",
  },

  sectionText: {
    marginTop: "16px",
    marginBottom: "24px",
    fontSize: "17px",
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.82)",
    maxWidth: "620px",
  },

  primaryButton: {
    background: "#22c7c7",
    color: "#06222a",
    border: "none",
    borderRadius: "14px",
    padding: "14px 22px",
    fontSize: "16px",
    fontWeight: 800,
    cursor: "pointer",
  },

  catalogSection: {
    marginTop: "42px",
    marginBottom: "10px",
  },

  catalogIntro: {
    textAlign: "center",
    color: "rgba(255,255,255,0.72)",
    fontSize: "17px",
    marginBottom: "24px",
  },

  catalogCard: {
    display: "grid",
    gridTemplateColumns: "1.1fr 1fr",
    gap: "34px",
    background: "linear-gradient(135deg, #dff4ef 0%, #66c6bb 100%)",
    borderRadius: "30px",
    padding: "28px",
    boxShadow: "0 14px 40px rgba(15,23,42,0.18)",
  },

  catalogImageArea: {
    minHeight: "520px",
    borderRadius: "24px",
    overflow: "hidden",
  },

  catalogImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  catalogContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "42px",
    padding: "8px 6px",
  },

  categoryBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  categoryTitle: {
    margin: 0,
    marginBottom: "16px",
    fontSize: "34px",
    color: "#0f172a",
    fontWeight: 800,
    letterSpacing: "-0.02em",
  },

  linkButton: {
    background: "transparent",
    border: "none",
    padding: 0,
    marginBottom: "10px",
    color: "#475569",
    fontSize: "18px",
    lineHeight: 1.55,
    textAlign: "left",
    cursor: "pointer",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
  },
};