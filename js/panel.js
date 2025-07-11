const progressoMaterias = {
  matemática: { acertos: 0, total: 0 },
  física: { acertos: 0, total: 0 },
  química: { acertos: 0, total: 0 },
  português: { acertos: 0, total: 0 },
  biologia: { acertos: 0, total: 0 },
  história: { acertos: 0, total: 0 },
  geografia: { acertos: 0, total: 0 }
};

const perguntas = {
  matemática: [
    { q: "Quanto é 5 + 7?", t: "number", resposta: "12" },
    { q: "Qual é a raiz quadrada de 16?", t: "number", resposta: "4" }
  ],
  física: [
    { q: "Qual a unidade de força no SI?", t: "text", resposta: "Newton" },
    { q: "Quem formulou a Lei da Gravidade?", t: "text", resposta: "Isaac Newton" }
  ],
  química: [
    { q: "Qual o símbolo químico da água?", t: "text", resposta: "H2O" },
    { q: "Quantos elementos há na tabela periódica?", t: "number", resposta: "118" }
  ],
  português: [
    { q: "A palavra 'amor' é um verbo? (sim ou não)", t: "text", resposta: "Não" },
    { q: "'Casa' é um substantivo? (sim ou não)", t: "text", resposta: "Sim" }
  ],
  biologia: [
    { q: "Qual o maior órgão do corpo humano?", t: "text", resposta: "Pele" },
    { q: "Qual é o menor osso humano?", t: "text", resposta: "Estribo" }
  ],
  história: [
    { q: "Em que ano o Brasil foi descoberto?", t: "number", resposta: "1500" },
    { q: "Em que ano o Brasil declarou guerra à Alemanha Nazista?", t: "number", resposta: "1942" }
  ],
  geografia: [
    { q: "Qual o maior país do mundo?", t: "text", resposta: "Rússia" },
    { q: "Qual o menor país do mundo?", t: "text", resposta: "Vaticano" }
  ]
};

function mostrarFormularioAtividade() {
  const materia = document.getElementById('materiaSelect').value;
  const container = document.getElementById('formularioAtividade');

  if (!materia || !perguntas[materia]) {
    container.innerHTML = "<p style='color:red;'>Selecione uma matéria válida.</p>";
    return;
  }

  progressoMaterias[materia].acertos = 0;
  progressoMaterias[materia].total = 0;

  let html = `<form onsubmit="enviarAtividade(event, '${materia}')">
    <h3>${materia.charAt(0).toUpperCase() + materia.slice(1)}</h3>`;

  perguntas[materia].forEach((p, i) => {
    html += `<label>${p.q}<br>
      <input type="${p.t}" name="pergunta${i}" required></label><br>`;
  });

  html += `<button type="submit">Enviar</button></form>`;
  container.innerHTML = html;
  atualizarProgresso();
}

function enviarAtividade(event, materia) {
  event.preventDefault();
  let acertos = 0;
  const form = event.target;

  perguntas[materia].forEach((p, i) => {
    const respostaUsuario = form[`pergunta${i}`].value.trim().toLowerCase();
    const respostaCorreta = p.resposta.trim().toLowerCase();
    if (respostaUsuario === respostaCorreta) acertos++;
  });

  const total = perguntas[materia].length;
  progressoMaterias[materia].acertos += acertos;
  progressoMaterias[materia].total += total;

  document.getElementById('formularioAtividade').innerHTML = `
    <h3>Resultado</h3>
    <p>Você acertou <strong>${acertos}</strong> de <strong>${total}</strong> perguntas.</p>
    <button onclick="mostrarFormularioAtividade()">Tentar novamente</button>`;

  document.getElementById('materiaSelect').value = '';
  atualizarProgresso();
}

function atualizarProgresso() {
  let html = "<h2>Progresso</h2>";
  let algumaMateria = false;

  for (const materia in progressoMaterias) {
    const { acertos, total } = progressoMaterias[materia];
    if (total > 0) {
      const porcentagem = Math.round((acertos / total) * 100);
      const nomeFormatado = materia.charAt(0).toUpperCase() + materia.slice(1);
      html += `<p><strong>${nomeFormatado}:</strong> ${porcentagem}% de acertos (${acertos}/${total})</p>`;
      algumaMateria = true;
    }
  }

  if (!algumaMateria) {
    html += "<p>Conteúdo do progresso ainda não iniciado.</p>";
  }

  document.getElementById('progressoConteudo').innerHTML = html;
}

function showSection(sectionId) {
  if (sectionId === 'sair') {
    window.location.href = '../Educa-/login.html';
    return;
  }


  document.querySelectorAll('.section').forEach(section => {
    section.style.display = 'none';
  });

  const alvo = document.getElementById(sectionId);
  if (alvo) {
    alvo.style.display = 'block';
    if (sectionId === 'progresso') atualizarProgresso();
  }
}

function toggleDropdown(event) {
  event.preventDefault();
  const dropdown = document.getElementById('dropdownContent');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('click', function (e) {
  const menu = document.getElementById('menuDropdown');
  if (menu && !menu.contains(e.target)) {
    document.getElementById('dropdownContent').style.display = 'none';
  }
});
