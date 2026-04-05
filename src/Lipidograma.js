// COLE TUDO ISSO NO SEU ARQUIVO

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
    return ativo ? { ...styles.navLink, ...styles.activeLink } : styles.navLink;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function getReferencia(tipo) {
    if (tipo === "imc")
      return "Satisfatório: 18,5 a 24,9 | Alterado: fora dessa faixa";

    if (tipo === "ldl")
      return "Satisfatório: abaixo de 100 mg/dL | Alterado: ≥100";

    if (tipo === "naoHDL")
      return "Satisfatório: abaixo de 130 mg/dL | Alterado: ≥130";

    if (tipo === "relacaoTGHDL")
      return "Satisfatório: <2 | Atenção: 2–3,9 | Alterado: ≥4";

    if (tipo === "relacaoCTHDL")
      return "Satisfatório: <4,5 | Atenção: 4,5–5,9 | Alterado: ≥6";

    if (tipo === "vldl")
      return "Satisfatório: <30 mg/dL | Alterado: ≥30";

    if (tipo === "tyg")
      return "Índice informativo baseado em TG e glicose";

    return "";
  }

  function getStatusConfig(tipo, valor) {
    const base = {
      bom: { status: "Satisfatório", corFundo: "#dcfce7", corTexto: "#166534", corBorda: "#86efac" },
      atencao: { status: "Atenção", corFundo: "#fef3c7", corTexto: "#92400e", corBorda: "#fcd34d" },
      ruim: { status: "Alterado", corFundo: "#fee2e2", corTexto: "#991b1b", corBorda: "#fca5a5" },
      info: { status: "Informativo", corFundo: "#e0f2fe", corTexto: "#075985", corBorda: "#7dd3fc" },
    };

    if (tipo === "imc") return valor < 25 ? base.bom : base.ruim;
    if (tipo === "ldl") return valor < 100 ? base.bom : base.ruim;
    if (tipo === "naoHDL") return valor < 130 ? base.bom : base.ruim;
    if (tipo === "vldl") return valor < 30 ? base.bom : base.ruim;
    if (tipo === "tyg") return base.info;

    return base.info;
  }

  function calcularIMC(peso, alturaCm) {
    const alturaM = alturaCm / 100;
    return peso / (alturaM * alturaM);
  }

  function calcularTudo(e) {
    e.preventDefault();
    setErro("");

    const {
      idade,
      peso,
      altura,
      colesterolTotal,
      hdl,
      triglicerideos,
      glicose,
    } = form;

    if (!Object.values(form).every((v) => v !== "")) {
      setErro("Preencha todos os campos.");
      return;
    }

    const imc = calcularIMC(peso, altura);
    const naoHDL = colesterolTotal - hdl;
    const vldl = triglicerideos / 5;
    const tyg = Math.log((triglicerideos * glicose) / 2);

    setResultado({
      dadosPaciente: {
        sexo: form.sexo,
        idade,
        peso,
        altura,
        glicose,
      },
      imc: imc.toFixed(1),
      naoHDL: naoHDL.toFixed(1),
      vldl: vldl.toFixed(1),
      tyg: tyg.toFixed(2),

      referencias: {
        imc: getReferencia("imc"),
        naoHDL: getReferencia("naoHDL"),
        vldl: getReferencia("vldl"),
        tyg: getReferencia("tyg"),
      },

      classificacoes: {
        imc: getStatusConfig("imc", imc),
        naoHDL: getStatusConfig("naoHDL", naoHDL),
        vldl: getStatusConfig("vldl", vldl),
        tyg: getStatusConfig("tyg", tyg),
      },
    });
  }

  function renderResultado({ titulo, valor, unidade = "", classificacao, referencia }) {
    return (
      <div style={{ ...styles.card, background: classificacao.corFundo }}>
        <h4>{titulo}</h4>
        <p style={{ fontSize: 22, fontWeight: "bold" }}>
          {valor} {unidade}
        </p>
        <p>{classificacao.status}</p>
        <small>{referencia}</small>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <main style={styles.main}>
        <h1>Lipidograma</h1>

        <form onSubmit={calcularTudo} style={styles.form}>
          <input name="peso" placeholder="Peso" onChange={handleChange} />
          <input name="altura" placeholder="Altura" onChange={handleChange} />
          <input name="colesterolTotal" placeholder="Colesterol Total" onChange={handleChange} />
          <input name="hdl" placeholder="HDL" onChange={handleChange} />
          <input name="triglicerideos" placeholder="Triglicerídeos" onChange={handleChange} />
          <input name="glicose" placeholder="Glicose" onChange={handleChange} />

          <button type="submit">Calcular</button>
        </form>

        {erro && <p>{erro}</p>}

        {resultado && (
          <div style={styles.grid}>
            {renderResultado({
              titulo: "IMC",
              valor: resultado.imc,
              classificacao: resultado.classificacoes.imc,
              referencia: resultado.referencias.imc,
            })}

            {renderResultado({
              titulo: "Não HDL",
              valor: resultado.naoHDL,
              classificacao: resultado.classificacoes.naoHDL,
              referencia: resultado.referencias.naoHDL,
            })}

            {renderResultado({
              titulo: "VLDL",
              valor: resultado.vldl,
              unidade: "mg/dL",
              classificacao: resultado.classificacoes.vldl,
              referencia: resultado.referencias.vldl,
            })}

            {renderResultado({
              titulo: "Índice TyG",
              valor: resultado.tyg,
              classificacao: resultado.classificacoes.tyg,
              referencia: resultado.referencias.tyg,
            })}
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  page: { padding: 20 },
  main: { maxWidth: 900, margin: "auto" },
  form: { display: "grid", gap: 10 },
  grid: { display: "grid", gap: 16, marginTop: 20 },
  card: { padding: 16, borderRadius: 10 },
};