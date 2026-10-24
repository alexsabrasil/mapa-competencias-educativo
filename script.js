
/* MAPA DINÂMICO DE COMPETÊNCIAS | ALÊ TAVARES */

const competencias = [
  {
    nome: "Educação",
    x: 50, y: 15,
    descricao: "Experiência em educação, inclusão, aprendizagem e desenvolvimento humano, com atuação em projetos educacionais."
  },
  {
    nome: "Blue Team / SOC",
    x: 78, y: 28,
    descricao: "Monitoramento de segurança, análise de logs, identificação de ameaças e investigação de incidentes."
  },
  {
    nome: "DevSecOps",
    x: 82, y: 65,
    descricao: "Integração de segurança ao desenvolvimento e à infraestrutura, com Docker, Kubernetes, CI/CD e Terraform."
  },
  {
    nome: "Gestão de Vulnerabilidades",
    x: 56, y: 83,
    descricao: "Experiência prática com OpenVAS, Greenbone, DefectDojo e Wazuh durante a residência em Cibersegurança."
  },
  {
    nome: "Python e Automação",
    x: 23, y: 75,
    descricao: "Desenvolvimento de scripts, automação de tarefas e aplicações utilizando Python."
  },
  {
    nome: "Cloud Security",
    x: 18, y: 35,
    descricao: "Conhecimentos em computação em nuvem, segurança e serviços AWS, Azure e Google Cloud."
  },
  {
    nome: "Engenharia de Software",
    x: 50, y: 49,
    descricao: "Desenvolvimento de software, APIs, bancos de dados, testes e práticas de engenharia."
  }
];

const svg = document.getElementById("rede");
const container = document.getElementById("pontos");
const titulo = document.getElementById("competencia-titulo");
const descricao = document.getElementById("competencia-descricao");

if (svg && container && titulo && descricao) {
  const NS = "http://www.w3.org/2000/svg";

  svg.setAttribute("viewBox", "0 0 1000 500");
  svg.setAttribute("preserveAspectRatio", "none");

  const criarSVG = (tipo, atributos) => {
    const elemento = document.createElementNS(NS, tipo);

    Object.entries(atributos).forEach(([chave, valor]) => {
      elemento.setAttribute(chave, valor);
    });

    return elemento;
  };

  const posicao = (item) => ({
    x: item.x * 10,
    y: item.y * 5
  });

  // Criar os pontos interativos
  competencias.forEach((competencia) => {
    const botao = document.createElement("button");

    botao.type = "button";
    botao.className = "ponto";
    botao.textContent = competencia.nome;
    botao.style.left = `${competencia.x}%`;
    botao.style.top = `${competencia.y}%`;

    botao.addEventListener("click", () => {
      titulo.textContent = competencia.nome;
      descricao.textContent = competencia.descricao;
    });

    container.appendChild(botao);
  });

  // Criar conexões entre competências
  const conexoes = [
    [0, 1], [0, 5], [0, 6],
    [1, 2], [1, 3], [1, 6],
    [2, 3], [2, 6],
    [3, 4], [3, 6],
    [4, 5], [4, 6],
    [5, 6]
  ];

  const animacoes = [];

  conexoes.forEach(([inicio, fim], indice) => {
    const a = posicao(competencias[inicio]);
    const b = posicao(competencias[fim]);

    const linha = criarSVG("line", {
      x1: a.x,
      y1: a.y,
      x2: b.x,
      y2: b.y,
      class: "linha-rede"
    });

    svg.appendChild(linha);

    const particula = criarSVG("circle", {
      cx: a.x,
      cy: a.y,
      r: 3,
      class: "particula"
    });

    svg.appendChild(particula);

    animacoes.push({
      particula,
      a,
      b,
      velocidade: 0.00012 + indice * 0.000012,
      fase: indice / conexoes.length
    });
  });

  // Animar partículas nas conexões
  const movimentoReduzido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!movimentoReduzido) {
    function animar(tempo) {
      animacoes.forEach((item) => {
        const progresso = (
          tempo * item.velocidade + item.fase
        ) % 1;

        const x = item.a.x +
          (item.b.x - item.a.x) * progresso;

        const y = item.a.y +
          (item.b.y - item.a.y) * progresso;

        item.particula.setAttribute("cx", x);
        item.particula.setAttribute("cy", y);
      });

      requestAnimationFrame(animar);
    }

    requestAnimationFrame(animar);
  }
}
