import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Hematologia() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    sexo: "",
    idade: "",
    peso: "",
    altura: "",
    neutrofilos: "",
    linfocitos: "",
    monocitos: "",
    plaquetas: "",
    triglicerideos: "",
    hdl: "",
    glicose: "",
  });

  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");

  function getNavStyle(path) {
    const ativo = location.pathname === path;
    return ativo
      ? { ...styles.navLink, ...styles.activeLink }
      : styles.navLink;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function calcularIMC(peso, alturaCm) {
    const alturaM = alturaCm / 100;
    return peso / (alturaM * alturaM);
  }

  function getReferencia(tipo) {
    if (tipo === "imc") {
      return "Satisfatório: 18,5 a 24,9 | Atenção: 25 a 29,9 | Alterado: abaixo de 18,5 ou a partir de 30";
    }

    if (tipo === "aip") {
      return "Satisfatório: abaixo de 0,11 | Atenção: 0,11 a 0,21 | Alterado: acima de 0,21";
    }

    if (tipo === "nlr") {
      return "Referência informativa: interpretar conforme contexto clínico e laboratorial.";
    }

    if (tipo === "plr") {
      return "Referência informativa: interpretar conforme contexto clínico e laboratorial.";
    }

    if (tipo === "sii") {
      return "Referência informativa: interpretar conforme contexto clínico e laboratorial.";
    }

    if (tipo === "siri") {
      return "Referência informativa: interpretar conforme contexto clínico e laboratorial.";
    }

    if (tipo === "mhr") {
      return "Referência informativa: interpretar conforme contexto clínico e laboratorial.";
    }

    if (tipo === "tyg") {
      return "Referência informativa: valores maiores podem sugerir pior perfil metabólico.";
    }

    if (tipo === "tygImc") {
      return "Referência informativa: valores maiores podem sugerir pior perfil metabólico.";
    }

    return "Referência informativa";
  }

  function getStatusConfig(tipo, valor) {
    if (tipo === "imc") {
      if (valor < 18.5) {
        return {
          status: "Alterado",
          corFundo: "#fee2e2",
          corTexto: "#991b1b",
          corBorda: "#fca5a5",
        };
      }
      if (valor < 25) {
        return {
          status: "Satisfatório",
          corFundo: "#dcfce7",
          corTexto: "#166534",
          corBorda: "#86efac",
        };
      }
      if (valor < 30) {
        return {
          status: "Atenção",
          corFundo: "#fef3c7",
          corTexto: "#92400e",
          corBorda: "#fcd34d",
        };
      }
      return {
        status: "Alterado",
        corFundo: "#fee2e2",
        corTexto: "#991b1b",
        corBorda: "#fca5a5",
      };
    }

    if (tipo === "aip") {
      if (valor < 0.11) {
        return {
          status: "Satisfatório",
          corFundo: "#dcfce7",
          corTexto: "#166534",
          corBorda: "#86efac",
        };
      }
      if (valor <= 0.21) {
        return {
          status: "Atenção",
          corFundo: "#fef3c7",
          corTexto: "#92400e",
          corBorda: "#fcd34d",
        };
      }
      return {
        status: "Alterado",
        corFundo: "#fee2e2",
        corTexto: "#991b1b",
        corBorda: "#fca5a5",
      };
    }

    return {
      status: "Informativo",
      corFundo: "#e0f2fe",
      corTexto: "#075985",
      corBorda: "#7dd3fc",
    };
  }

  function calcularTudo(e) {
    e.preventDefault();
    setErro("");
    setResultado(null);

    const idade = Number(form.idade);
    const peso = Number(form.peso);
    const altura = Number(form.altura);
    const neutrofilos = Number(form.neutrofilos);
    const linfocitos = Number(form.linfocitos);
    const monocitos = Number(form.monocitos);
    const plaquetas = Number(form.plaquetas);
    const triglicerideos = Number(form.triglicerideos);
    const hdl = Number(form.hdl);
    const glicose = Number(form.glicose);

    if (
      !form.sexo ||
      !idade ||
      !peso ||
      !altura ||
      !neutrofilos ||
      !linfocitos ||
      !monocitos ||
      !plaquetas ||
      !triglicerideos ||
      !hdl ||
      !glicose
    ) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (
      idade <= 0 ||
      peso <= 0 ||
      altura <= 0 ||
      neutrofilos <= 0 ||
      linfocitos <= 0 ||
      monocitos <= 0 ||
      plaquetas <= 0 ||
      triglicerideos <= 0 ||
      hdl <= 0 ||
      glicose <= 0
    ) {
      setErro("Informe apenas valores maiores que zero.");
      return;
    }

    const imc = calcularIMC(peso, altura);
    const nlr = neutrofilos / linfocitos;
    const aip = Math.log10(triglicerideos / hdl);
    const plr = plaquetas / linfocitos;
    const sii = (neutrofilos * plaquetas) / linfocitos;
    const siri = (neutrofilos * monocitos) / linfocitos;
    const mhr = monocitos / hdl;
    const tyG = Math.log((triglicerideos * glicose) / 2);
    const tyGImc = tyG * imc;

    setResultado({
      dadosPaciente: {
        sexo: form.sexo,
        idade,
        peso: peso.toFixed(1),
        altura,
      },
      imc: imc.toFixed(1),
      nlr: nlr.toFixed(2),
      aip: aip.toFixed(3),
      plr: plr.toFixed(2),
      sii: sii.toFixed(2),
      siri: siri.toFixed(2),
      mhr: mhr.toFixed(4),
      tyG: tyG.toFixed(3),
      tyGImc: tyGImc.toFixed(3),
      referencias: {
        imc: getReferencia("imc"),
        nlr: getReferencia("nlr"),
        aip: getReferencia("aip"),
        plr: getReferencia("plr"),
        sii: getReferencia("sii"),
        siri: getReferencia("siri"),
        mhr: getReferencia("mhr"),
        tyG: getReferencia("tyg"),
        tyGImc: getReferencia("tygImc"),
      },
      classificacoes: {
        imc: getStatusConfig("imc", imc),
        nlr: getStatusConfig("nlr", nlr),
        aip: getStatusConfig("aip", aip),
        plr: getStatusConfig("plr", plr),
        sii: getStatusConfig("sii", sii),
        siri: getStatusConfig("siri", siri),
        mhr: getStatusConfig("mhr", mhr),
        tyG: getStatusConfig("tyg", tyG),
        tyGImc: getStatusConfig("tygImc", tyGImc),
      },
    });
  }

  function renderResultado({
    titulo,
    valor,
    unidade = "",
    classificacao,
    explicacao,
    referencia,
  }) {
    return (
      <div
        style={{
          ...styles.resultadoCard,
          backgroundColor: classificacao.corFundo,
          color: classificacao.corTexto,
          border: `1px solid ${classificacao.corBorda}`,
        }}
      >
        <h4 style={styles.resultadoTitulo}>{titulo}</h4>
        <p style={styles.resultadoValor}>
          {valor} {unidade}
        </p>
        <p style={styles.resultadoStatus}>{classificacao.status}</p>
        <p style={styles.resultadoExplicacao}>{explicacao}</p>
        <p style={styles.resultadoReferencia}>
          <strong>Referência usada:</strong> {referencia}
        </p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <img
            src="/bioclin-logo.png"
            alt="Bioclin"
            style={styles.logoImage}
            onClick={() => navigate("/")}
          />
        </div>

        <nav style={styles.nav}>
          <button style={getNavStyle("/")} onClick={() => navigate("/")}>
            Home
          </button>

          <button
            style={getNavStyle("/lipidograma")}
            onClick={() => navigate("/lipidograma")}
          >
            Bioquímica
          </button>

          <button
            style={getNavStyle("/hematologia")}
            onClick={() => navigate("/hematologia")}
          >
            Hematologia
          </button>

          <button style={styles.navLink}>Contato</button>
        </nav>
      </header>

      <main style={styles.main}>
        <div style={styles.box}>
          <h1 style={styles.title}>Hematologia</h1>
          <p style={styles.subtitle}>
            Preencha os dados abaixo para calcular IMC, NLR, AIP, PLR, SII, SIRI,
            MHR, TyG e TyG × IMC.
          </p>

          <form onSubmit={calcularTudo} style={styles.form}>
            <div style={styles.grid}>
              <div style={styles.field}>
                <label style={styles.label}>Sexo</label>
                <select
                  name="sexo"
                  value={form.sexo}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">Selecione</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Idade</label>
                <input
                  type="number"
                  name="idade"
                  value={form.idade}
                  onChange={handleChange}
                  placeholder="Ex: 35"
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Peso (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  name="peso"
                  value={form.peso}
                  onChange={handleChange}
                  placeholder="Ex: 72.5"
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Altura (cm)</label>
                <input
                  type="number"
                  name="altura"
                  value={form.altura}
                  onChange={handleChange}
                  placeholder="Ex: 175"
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Neutrófilos</label>
                <input
                  type="number"
                  step="0.01"
                  name="neutrofilos"
                  value={form.neutrofilos}
                  onChange={handleChange}
                  placeholder="Ex: 4.5"
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Linfócitos</label>
                <input
                  type="number"
                  step="0.01"
                  name="linfocitos"
                  value={form.linfocitos}
                  onChange={handleChange}
                  placeholder="Ex: 2.0"
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Monócitos</label>
                <input
                  type="number"
                  step="0.01"
                  name="monocitos"
                  value={form.monocitos}
                  onChange={handleChange}
                  placeholder="Ex: 0.4"
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Plaquetas</label>
                <input
                  type="number"
                  step="0.01"
                  name="plaquetas"
                  value={form.plaquetas}
                  onChange={handleChange}
                  placeholder="Ex: 250"
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Triglicerídeos (mg/dL)</label>
                <input
                  type="number"
                  step="0.1"
                  name="triglicerideos"
                  value={form.triglicerideos}
                  onChange={handleChange}
                  placeholder="Ex: 150"
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>HDL-c (mg/dL)</label>
                <input
                  type="number"
                  step="0.1"
                  name="hdl"
                  value={form.hdl}
                  onChange={handleChange}
                  placeholder="Ex: 50"
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Glicose (mg/dL)</label>
                <input
                  type="number"
                  step="0.1"
                  name="glicose"
                  value={form.glicose}
                  onChange={handleChange}
                  placeholder="Ex: 95"
                  style={styles.input}
                />
              </div>
            </div>

            <button type="submit" style={styles.button}>
              Calcular
            </button>
          </form>

          {erro && <div style={styles.error}>{erro}</div>}

          {resultado && (
            <>
              <div style={styles.infoPaciente}>
                <h3 style={styles.infoPacienteTitulo}>Dados informados</h3>
                <p style={styles.infoPacienteTexto}>
                  <strong>Sexo:</strong> {resultado.dadosPaciente.sexo} |{" "}
                  <strong>Idade:</strong> {resultado.dadosPaciente.idade} anos |{" "}
                  <strong>Peso:</strong> {resultado.dadosPaciente.peso} kg |{" "}
                  <strong>Altura:</strong> {resultado.dadosPaciente.altura} cm
                </p>
              </div>

              <div style={styles.resultsGrid}>
                {renderResultado({
                  titulo: "IMC",
                  valor: resultado.imc,
                  unidade: "kg/m²",
                  classificacao: resultado.classificacoes.imc,
                  explicacao:
                    "O IMC foi calculado com base no peso e na altura para estimar a relação entre massa corporal e estatura.",
                  referencia: resultado.referencias.imc,
                })}

                {renderResultado({
                  titulo: "NLR",
                  valor: resultado.nlr,
                  classificacao: resultado.classificacoes.nlr,
                  explicacao:
                    "A relação neutrófilos/linfócitos foi calculada dividindo o valor de neutrófilos pelo de linfócitos.",
                  referencia: resultado.referencias.nlr,
                })}

                {renderResultado({
                  titulo: "AIP",
                  valor: resultado.aip,
                  classificacao: resultado.classificacoes.aip,
                  explicacao:
                    "O índice aterogênico de plasma foi calculado como log10 de triglicerídeos dividido por HDL-c.",
                  referencia: resultado.referencias.aip,
                })}

                {renderResultado({
                  titulo: "PLR",
                  valor: resultado.plr,
                  classificacao: resultado.classificacoes.plr,
                  explicacao:
                    "A relação plaquetas/linfócitos foi calculada dividindo o valor de plaquetas pelo de linfócitos.",
                  referencia: resultado.referencias.plr,
                })}

                {renderResultado({
                  titulo: "SII",
                  valor: resultado.sii,
                  classificacao: resultado.classificacoes.sii,
                  explicacao:
                    "O índice inflamatório sistêmico foi calculado como neutrófilos multiplicados por plaquetas, dividido por linfócitos.",
                  referencia: resultado.referencias.sii,
                })}

                {renderResultado({
                  titulo: "SIRI",
                  valor: resultado.siri,
                  classificacao: resultado.classificacoes.siri,
                  explicacao:
                    "O índice de resposta inflamatória sistêmica foi calculado como neutrófilos multiplicados por monócitos, dividido por linfócitos.",
                  referencia: resultado.referencias.siri,
                })}

                {renderResultado({
                  titulo: "MHR",
                  valor: resultado.mhr,
                  classificacao: resultado.classificacoes.mhr,
                  explicacao:
                    "A relação monócitos/HDL-c foi calculada dividindo o valor de monócitos pelo HDL-c.",
                  referencia: resultado.referencias.mhr,
                })}

                {renderResultado({
                  titulo: "TyG",
                  valor: resultado.tyG,
                  classificacao: resultado.classificacoes.tyG,
                  explicacao:
                    "O índice TyG foi calculado usando ln de triglicerídeos multiplicados por glicose, dividido por 2.",
                  referencia: resultado.referencias.tyG,
                })}

                {renderResultado({
                  titulo: "TyG × IMC",
                  valor: resultado.tyGImc,
                  classificacao: resultado.classificacoes.tyGImc,
                  explicacao:
                    "Esse índice foi calculado multiplicando o valor do TyG pelo IMC.",
                  referencia: resultado.referencias.tyGImc,
                })}
              </div>

              <div style={styles.explanationBox}>
                <h3 style={styles.explanationTitle}>
                  Como os resultados foram obtidos
                </h3>
                <p style={styles.explanationText}>
                  A ferramenta utilizou os valores informados de neutrófilos,
                  linfócitos, monócitos, plaquetas, triglicerídeos, HDL-c,
                  glicose, peso e altura para calcular os índices inflamatórios e
                  metabólicos solicitados.
                </p>
                <p style={styles.explanationText}>
                  A sinalização por cores foi aplicada de forma visual:
                  <strong> verde</strong> para valores mais satisfatórios,
                  <strong> amarelo</strong> para atenção e
                  <strong> vermelho</strong> para alterado. Em vários índices, o
                  resultado foi mantido como <strong>informativo</strong>, pois os
                  pontos de corte podem variar conforme protocolo, população
                  estudada e contexto clínico.
                </p>
              </div>

              <div style={styles.referenceSection}>
                <div style={styles.referenceHeader}>
                  <div style={styles.referenceIcon}>i</div>

                  <div>
                    <h3 style={styles.referenceTitle}>
                      Referências gerais dos índices
                    </h3>
                    <p style={styles.referenceSubtitle}>
                      Faixas informativas para os parâmetros exibidos nesta
                      calculadora.
                    </p>
                  </div>
                </div>

                <div style={styles.referenceTableWrapper}>
                  <table style={styles.referenceTable}>
                    <thead>
                      <tr>
                        <th style={styles.referenceTh}>Componente</th>
                        <th style={styles.referenceTh}>Faixa / interpretação</th>
                        <th style={styles.referenceTh}>Observação</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr style={styles.referenceTrOdd}>
                        <td style={styles.referenceTdLabel}>IMC</td>
                        <td style={styles.referenceTd}>18,5 a 24,9</td>
                        <td style={styles.referenceTd}>
                          Faixa geral considerada satisfatória
                        </td>
                      </tr>

                      <tr style={styles.referenceTrEven}>
                        <td style={styles.referenceTdLabel}>AIP</td>
                        <td style={styles.referenceTd}>
                          &lt; 0,11 | 0,11–0,21 | &gt; 0,21
                        </td>
                        <td style={styles.referenceTd}>
                          Menor risco, intermediário e aumentado
                        </td>
                      </tr>

                      <tr style={styles.referenceTrOdd}>
                        <td style={styles.referenceTdLabel}>NLR</td>
                        <td style={styles.referenceTd}>Sem ponto de corte fixo</td>
                        <td style={styles.referenceTd}>
                          Interpretar conforme contexto clínico
                        </td>
                      </tr>

                      <tr style={styles.referenceTrEven}>
                        <td style={styles.referenceTdLabel}>PLR</td>
                        <td style={styles.referenceTd}>Sem ponto de corte fixo</td>
                        <td style={styles.referenceTd}>
                          Interpretar conforme contexto clínico
                        </td>
                      </tr>

                      <tr style={styles.referenceTrOdd}>
                        <td style={styles.referenceTdLabel}>SII / SIRI</td>
                        <td style={styles.referenceTd}>Sem ponto de corte fixo</td>
                        <td style={styles.referenceTd}>
                          Uso principalmente complementar
                        </td>
                      </tr>

                      <tr style={styles.referenceTrEven}>
                        <td style={styles.referenceTdLabel}>TyG / TyG × IMC</td>
                        <td style={styles.referenceTd}>Valores mais altos</td>
                        <td style={styles.referenceTd}>
                          Podem sugerir pior perfil metabólico
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p style={styles.referenceNote}>
                  Nota: estes valores são informativos. A interpretação final deve
                  considerar unidades laboratoriais, método analítico, quadro
                  clínico e orientação profissional.
                </p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #dff4ef 0%, #66c6bb 100%)",
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
    cursor: "pointer",
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
    color: "#0f172a",
    fontSize: "15px",
    cursor: "pointer",
    padding: "8px 0",
  },

  activeLink: {
    color: "#0f172a",
    borderBottom: "2px solid #0f172a",
    fontWeight: 700,
  },

  main: {
    width: "100%",
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "8px 28px 40px",
  },

  box: {
    width: "100%",
    maxWidth: "1180px",
    background: "#ffffff",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.10)",
  },

  title: {
    margin: 0,
    fontSize: "32px",
    color: "#0f172a",
  },

  subtitle: {
    marginTop: "10px",
    marginBottom: "24px",
    color: "#475569",
    fontSize: "16px",
    lineHeight: 1.5,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  label: {
    fontWeight: 600,
    color: "#0f172a",
  },

  input: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "15px",
    background: "#ffffff",
    color: "#0f172a",
  },

  button: {
    alignSelf: "flex-start",
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    padding: "14px 20px",
    fontWeight: 700,
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(37, 99, 235, 0.22)",
  },

  error: {
    marginTop: "18px",
    background: "#fff7ed",
    color: "#9a3412",
    border: "1px solid #fdba74",
    borderRadius: "12px",
    padding: "14px",
  },

  infoPaciente: {
    marginTop: "24px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "16px",
  },

  infoPacienteTitulo: {
    margin: 0,
    marginBottom: "8px",
    fontSize: "18px",
    color: "#0f172a",
  },

  infoPacienteTexto: {
    margin: 0,
    color: "#334155",
    lineHeight: 1.5,
  },

  resultsGrid: {
    marginTop: "24px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "16px",
  },

  resultadoCard: {
    borderRadius: "16px",
    padding: "18px",
    background: "#f8fafc",
  },

  resultadoTitulo: {
    margin: 0,
    marginBottom: "10px",
    fontSize: "18px",
  },

  resultadoValor: {
    margin: 0,
    fontSize: "24px",
    fontWeight: 700,
  },

  resultadoStatus: {
    marginTop: "8px",
    marginBottom: "8px",
    fontWeight: 700,
  },

  resultadoExplicacao: {
    marginTop: "10px",
    marginBottom: "8px",
    lineHeight: 1.5,
    fontSize: "14px",
  },

  resultadoReferencia: {
    marginTop: "8px",
    marginBottom: "0",
    lineHeight: 1.5,
    fontSize: "13px",
  },

  explanationBox: {
    marginTop: "28px",
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: "16px",
    padding: "20px",
  },

  explanationTitle: {
    marginTop: 0,
    marginBottom: "10px",
    color: "#1e3a8a",
  },

  explanationText: {
    margin: "8px 0",
    color: "#1e293b",
    lineHeight: 1.6,
  },

  referenceSection: {
    marginTop: "32px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)",
  },

  referenceHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: "14px",
    marginBottom: "20px",
  },

  referenceIcon: {
    width: "34px",
    height: "34px",
    minWidth: "34px",
    borderRadius: "999px",
    background: "#ecfeff",
    color: "#0ea5b7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "16px",
    border: "1px solid #a5f3fc",
  },

  referenceTitle: {
    margin: 0,
    fontSize: "24px",
    color: "#0f172a",
  },

  referenceSubtitle: {
    margin: "6px 0 0 0",
    color: "#64748b",
    fontSize: "14px",
    lineHeight: 1.5,
  },

  referenceTableWrapper: {
    width: "100%",
    overflowX: "auto",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    background: "#ffffff",
  },

  referenceTable: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    minWidth: "760px",
  },

  referenceTh: {
    background: "#f8fafc",
    color: "#0f172a",
    fontSize: "14px",
    fontWeight: 700,
    textAlign: "left",
    padding: "15px",
  }
}