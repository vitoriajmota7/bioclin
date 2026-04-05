import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Lipidograma() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
  sexo: "",
  idade: "",
  peso: "",
  altura: "",
  colesterolTotal: "",
  hdl: "",
  triglicerideos: "",
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

  function getReferencia(tipo) {
    if (tipo === "imc") {
      return "Satisfatório: 18,5 a 24,9 | Alterado: abaixo de 18,5 ou a partir de 25";
    }

    if (tipo === "ldl") {
      return "Satisfatório: abaixo de 100 mg/dL | Alterado: 100 mg/dL ou mais";
    }

    if (tipo === "naoHDL") {
      return "Satisfatório: abaixo de 130 mg/dL | Alterado: 130 mg/dL ou mais";
    }

    if (tipo === "relacaoTGHDL") {
      return "Satisfatório: abaixo de 2 | Atenção: 2 a 3,99 | Alterado: 4 ou mais";
    }

    if (tipo === "relacaoCTHDL") {
      return "Satisfatório: abaixo de 4,5 | Atenção: 4,5 a 5,99 | Alterado: 6 ou mais";
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

    if (tipo === "ldl") {
      if (valor < 100) {
        return {
          status: "Satisfatório",
          corFundo: "#dcfce7",
          corTexto: "#166534",
          corBorda: "#86efac",
        };
      }
      return {
        status: "Alterado",
        corFundo: "#fee2e2",
        corTexto: "#991b1b",
        corBorda: "#fca5a5",
      };
    }

    if (tipo === "naoHDL") {
      if (valor < 130) {
        return {
          status: "Satisfatório",
          corFundo: "#dcfce7",
          corTexto: "#166534",
          corBorda: "#86efac",
        };
      }
      return {
        status: "Alterado",
        corFundo: "#fee2e2",
        corTexto: "#991b1b",
        corBorda: "#fca5a5",
      };
    }

    if (tipo === "relacaoTGHDL") {
      if (valor < 2) {
        return {
          status: "Satisfatório",
          corFundo: "#dcfce7",
          corTexto: "#166534",
          corBorda: "#86efac",
        };
      }
      if (valor < 4) {
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

    if (tipo === "relacaoCTHDL") {
      if (valor < 4.5) {
        return {
          status: "Satisfatório",
          corFundo: "#dcfce7",
          corTexto: "#166534",
          corBorda: "#86efac",
        };
      }
      if (valor < 6) {
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

  function calcularIMC(peso, alturaCm) {
    const alturaM = alturaCm / 100;
    return peso / (alturaM * alturaM);
  }

  function getMartinHopkinsFactor(triglicerideos, nonHDL) {
    if (triglicerideos < 50) {
      if (nonHDL < 100) return 3.1;
      if (nonHDL < 130) return 3.3;
      if (nonHDL < 160) return 3.5;
      return 3.7;
    }

    if (triglicerideos < 100) {
      if (nonHDL < 100) return 4.0;
      if (nonHDL < 130) return 4.3;
      if (nonHDL < 160) return 4.5;
      return 4.7;
    }

    if (triglicerideos < 150) {
      if (nonHDL < 100) return 4.7;
      if (nonHDL < 130) return 4.9;
      if (nonHDL < 160) return 5.2;
      return 5.5;
    }

    if (triglicerideos < 200) {
      if (nonHDL < 100) return 5.5;
      if (nonHDL < 130) return 5.8;
      if (nonHDL < 160) return 6.1;
      return 6.4;
    }

    if (triglicerideos < 300) {
      if (nonHDL < 100) return 6.5;
      if (nonHDL < 130) return 6.9;
      if (nonHDL < 160) return 7.3;
      return 7.7;
    }

    if (triglicerideos <= 400) {
      if (nonHDL < 100) return 8.1;
      if (nonHDL < 130) return 8.7;
      if (nonHDL < 160) return 9.4;
      return 10.1;
    }

    return null;
  }

  function calcularSampson(tc, hdl, tg) {
    const nonHDL = tc - hdl;

    return (
      tc / 0.948 -
      hdl / 0.971 -
      (tg / 8.56 + (tg * nonHDL) / 2140 - (tg * tg) / 16100) -
      9.44
    );
  }

  function calcularTudo(e) {
    e.preventDefault();
    setErro("");
    setResultado(null);

    const idade = Number(form.idade);
    const peso = Number(form.peso);
    const altura = Number(form.altura);
    const colesterolTotal = Number(form.colesterolTotal);
    const hdl = Number(form.hdl);
    const triglicerideos = Number(form.triglicerideos);

    if (
      !form.sexo ||
      !idade ||
      !peso ||
      !altura ||
      !colesterolTotal ||
      !hdl ||
      !triglicerideos
    ) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (
      idade <= 0 ||
      peso <= 0 ||
      altura <= 0 ||
      colesterolTotal <= 0 ||
      hdl <= 0 ||
      triglicerideos <= 0
    ) {
      setErro("Informe apenas valores maiores que zero.");
      return;
    }

    if (hdl > colesterolTotal) {
      setErro("O HDL-c não pode ser maior que o colesterol total.");
      return;
    }

    const imc = calcularIMC(peso, altura);
    const naoHDL = colesterolTotal - hdl;
    const relacaoTGHDL = triglicerideos / hdl;
    const relacaoCTHDL = colesterolTotal / hdl;

    let ldlFriedewald = null;
    let ldlMartin = null;
    let ldlSampson = null;

    let observacaoFriedewald = "";
    let observacaoMartin = "";
    let observacaoSampson = "";

    if (triglicerideos <= 400) {
      ldlFriedewald = colesterolTotal - hdl - triglicerideos / 5;
    } else {
      observacaoFriedewald =
        "Não calculado porque triglicerídeos acima de 400 mg/dL limitam o uso da fórmula.";
    }

    const fatorMartin = getMartinHopkinsFactor(triglicerideos, naoHDL);
    if (fatorMartin) {
      ldlMartin = colesterolTotal - hdl - triglicerideos / fatorMartin;
    } else {
      observacaoMartin =
        "Não calculado nesta versão porque a implementação simplificada foi limitada a triglicerídeos até 400 mg/dL.";
    }

    if (triglicerideos < 800) {
      ldlSampson = calcularSampson(colesterolTotal, hdl, triglicerideos);
    } else {
      observacaoSampson =
        "Não calculado porque triglicerídeos a partir de 800 mg/dL não foram considerados nesta fórmula.";
    }

    setResultado({
      dadosPaciente: {
        sexo: form.sexo,
        idade,
        peso: peso.toFixed(1),
        altura,
      },
      imc: imc.toFixed(1),
      naoHDL: naoHDL.toFixed(1),
      relacaoTGHDL: relacaoTGHDL.toFixed(2),
      relacaoCTHDL: relacaoCTHDL.toFixed(2),
      ldlFriedewald: ldlFriedewald !== null ? ldlFriedewald.toFixed(1) : null,
      ldlMartin: ldlMartin !== null ? ldlMartin.toFixed(1) : null,
      ldlSampson: ldlSampson !== null ? ldlSampson.toFixed(1) : null,
      observacaoFriedewald,
      observacaoMartin,
      observacaoSampson,
      referencias: {
        imc: getReferencia("imc"),
        naoHDL: getReferencia("naoHDL"),
        relacaoTGHDL: getReferencia("relacaoTGHDL"),
        relacaoCTHDL: getReferencia("relacaoCTHDL"),
        ldlFriedewald: getReferencia("ldl"),
        ldlMartin: getReferencia("ldl"),
        ldlSampson: getReferencia("ldl"),
      },
      classificacoes: {
        imc: getStatusConfig("imc", imc),
        naoHDL: getStatusConfig("naoHDL", naoHDL),
        relacaoTGHDL: getStatusConfig("relacaoTGHDL", relacaoTGHDL),
        relacaoCTHDL: getStatusConfig("relacaoCTHDL", relacaoCTHDL),
        ldlFriedewald:
          ldlFriedewald !== null ? getStatusConfig("ldl", ldlFriedewald) : null,
        ldlMartin:
          ldlMartin !== null ? getStatusConfig("ldl", ldlMartin) : null,
        ldlSampson:
          ldlSampson !== null ? getStatusConfig("ldl", ldlSampson) : null,
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
    observacao = "",
  }) {
    if (valor === null) {
      return (
        <div style={styles.resultadoCard}>
          <h4 style={styles.resultadoTitulo}>{titulo}</h4>
          <p style={styles.resultadoObservacao}>{observacao}</p>
          <p style={styles.resultadoReferencia}>
            <strong>Referência usada:</strong> {referencia}
          </p>
        </div>
      );
    }

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
        {observacao && <p style={styles.resultadoObservacao}>{observacao}</p>}
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
          <h1 style={styles.title}>Colesterol total e frações</h1>
          <p style={styles.subtitle}>
            Preencha os dados abaixo para calcular o IMC, os diferentes métodos de
            LDL-c e outros parâmetros do perfil lipídico.
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
                <label style={styles.label}>Colesterol total (mg/dL)</label>
                <input
                  type="number"
                  step="0.1"
                  name="colesterolTotal"
                  value={form.colesterolTotal}
                  onChange={handleChange}
                  placeholder="Ex: 190"
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
                  titulo: "LDL-c por Friedewald",
                  valor: resultado.ldlFriedewald,
                  unidade: "mg/dL",
                  classificacao: resultado.classificacoes.ldlFriedewald,
                  explicacao:
                    "Este LDL-c foi estimado pela fórmula clássica que usa colesterol total, HDL-c e triglicerídeos.",
                  referencia: resultado.referencias.ldlFriedewald,
                  observacao: resultado.observacaoFriedewald,
                })}

                {renderResultado({
                  titulo: "LDL-c por Martin",
                  valor: resultado.ldlMartin,
                  unidade: "mg/dL",
                  classificacao: resultado.classificacoes.ldlMartin,
                  explicacao:
                    "Este LDL-c foi estimado por uma fórmula com fator ajustável, buscando refinar o cálculo em comparação ao método clássico.",
                  referencia: resultado.referencias.ldlMartin,
                  observacao: resultado.observacaoMartin,
                })}

                {renderResultado({
                  titulo: "LDL-c por Sampson",
                  valor: resultado.ldlSampson,
                  unidade: "mg/dL",
                  classificacao: resultado.classificacoes.ldlSampson,
                  explicacao:
                    "Este LDL-c foi estimado por uma fórmula mais recente, que considera ajustes matemáticos adicionais usando triglicerídeos e não-HDL.",
                  referencia: resultado.referencias.ldlSampson,
                  observacao: resultado.observacaoSampson,
                })}

                {renderResultado({
                  titulo: "Colesterol não-HDL",
                  valor: resultado.naoHDL,
                  unidade: "mg/dL",
                  classificacao: resultado.classificacoes.naoHDL,
                  explicacao:
                    "O colesterol não-HDL representa o colesterol total menos o HDL-c e reúne frações potencialmente aterogênicas.",
                  referencia: resultado.referencias.naoHDL,
                })}

                {renderResultado({
                  titulo: "Relação triglicerídeos / HDL-c",
                  valor: resultado.relacaoTGHDL,
                  classificacao: resultado.classificacoes.relacaoTGHDL,
                  explicacao:
                    "Essa relação foi calculada dividindo triglicerídeos pelo HDL-c e serve como indicador complementar do perfil metabólico.",
                  referencia: resultado.referencias.relacaoTGHDL,
                })}

                {renderResultado({
                  titulo: "Relação colesterol total / HDL-c",
                  valor: resultado.relacaoCTHDL,
                  classificacao: resultado.classificacoes.relacaoCTHDL,
                  explicacao:
                    "Essa relação foi calculada dividindo o colesterol total pelo HDL-c para fornecer uma visão adicional do equilíbrio entre frações lipídicas.",
                  referencia: resultado.referencias.relacaoCTHDL,
                })}
              </div>

              <div style={styles.explanationBox}>
                <h3 style={styles.explanationTitle}>Como os resultados foram obtidos</h3>
                <p style={styles.explanationText}>
                  A ferramenta utilizou os valores informados de colesterol total,
                  HDL-c e triglicerídeos para calcular três estimativas de LDL-c:
                  Friedewald, Martin e Sampson. Também calculou o colesterol
                  não-HDL, a relação triglicerídeos/HDL-c e a relação colesterol
                  total/HDL-c. Além disso, com peso e altura, foi calculado o IMC.
                </p>
                <p style={styles.explanationText}>
                  A sinalização por cores foi aplicada de forma visual:
                  <strong> verde</strong> para valores mais satisfatórios,
                  <strong> amarelo</strong> para atenção e
                  <strong> vermelho</strong> para alterado.
                </p>
              </div>

              <div style={styles.referenceSection}>
                <div style={styles.referenceHeader}>
                  <div style={styles.referenceIcon}>i</div>

                  <div>
                    <h3 style={styles.referenceTitle}>
                      Valores de Referência do Perfil Lipídico
                    </h3>
                    <p style={styles.referenceSubtitle}>
                      Faixas gerais para adultos, considerando apenas os parâmetros calculados nesta ferramenta.
                    </p>
                  </div>
                </div>

                <div style={styles.referenceTableWrapper}>
                  <table style={styles.referenceTable}>
                    <thead>
                      <tr>
                        <th style={styles.referenceTh}>Componente</th>
                        <th style={styles.referenceTh}>Desejável</th>
                        <th style={styles.referenceTh}>Limítrofe</th>
                        <th style={styles.referenceTh}>Alterado</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr style={styles.referenceTrOdd}>
                        <td style={styles.referenceTdLabel}>Colesterol Total</td>
                        <td style={styles.referenceTd}>&lt; 200 mg/dL</td>
                        <td style={styles.referenceTd}>200–239 mg/dL</td>
                        <td style={styles.referenceTd}>≥ 240 mg/dL</td>
                      </tr>

                      <tr style={styles.referenceTrEven}>
                        <td style={styles.referenceTdLabel}>LDL-c (calculado)</td>
                        <td style={styles.referenceTd}>&lt; 100 mg/dL</td>
                        <td style={styles.referenceTd}>130–159 mg/dL</td>
                        <td style={styles.referenceTd}>≥ 160 mg/dL</td>
                      </tr>

                      <tr style={styles.referenceTrOdd}>
                        <td style={styles.referenceTdLabel}>HDL-c</td>
                        <td style={styles.referenceTd}>≥ 60 mg/dL</td>
                        <td style={styles.referenceTd}>40–59 mg/dL</td>
                        <td style={styles.referenceTd}>&lt; 40 mg/dL</td>
                      </tr>

                      <tr style={styles.referenceTrEven}>
                        <td style={styles.referenceTdLabel}>Colesterol não-HDL</td>
                        <td style={styles.referenceTd}>&lt; 130 mg/dL</td>
                        <td style={styles.referenceTd}>160–189 mg/dL</td>
                        <td style={styles.referenceTd}>≥ 190 mg/dL</td>
                      </tr>

                      <tr style={styles.referenceTrOdd}>
                        <td style={styles.referenceTdLabel}>Relação TG / HDL-c</td>
                        <td style={styles.referenceTd}>&lt; 2</td>
                        <td style={styles.referenceTd}>2–3,9</td>
                        <td style={styles.referenceTd}>≥ 4</td>
                      </tr>

                      <tr style={styles.referenceTrEven}>
                        <td style={styles.referenceTdLabel}>Relação Colesterol Total / HDL-c</td>
                        <td style={styles.referenceTd}>&lt; 4,5</td>
                        <td style={styles.referenceTd}>4,5–5,9</td>
                        <td style={styles.referenceTd}>≥ 6</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p style={styles.referenceNote}>
                  Nota: estes são valores gerais para adultos. As metas podem variar conforme
                  risco cardiovascular, histórico clínico e orientação profissional.
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

  resultadoObservacao: {
    marginTop: "10px",
    marginBottom: 0,
    fontSize: "14px",
    lineHeight: 1.5,
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
    padding: "15px 16px",
    borderBottom: "1px solid #e2e8f0",
  },

  referenceTd: {
    padding: "14px 16px",
    fontSize: "14px",
    color: "#334155",
    borderBottom: "1px solid #e2e8f0",
    lineHeight: 1.5,
  },

  referenceTdLabel: {
    padding: "14px 16px",
    fontSize: "14px",
    color: "#0f172a",
    fontWeight: 600,
    borderBottom: "1px solid #e2e8f0",
    lineHeight: 1.5,
  },

  referenceTrOdd: {
    background: "#ffffff",
  },

  referenceTrEven: {
    background: "#fcfdff",
  },

  referenceNote: {
    marginTop: "14px",
    marginBottom: 0,
    fontSize: "13px",
    color: "#64748b",
    lineHeight: 1.6,
  },
};