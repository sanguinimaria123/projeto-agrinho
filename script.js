//  pontos começam no meio porque é tipo um equilíbrio inicial do jogo
let pontos = 50;

//  aqui eu guardo o histórico pra desenhar o gráfico depois
let historico = [];


//  função simples pra ativar/desativar o modo escuro
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}


//  função principal do simulador
function simular() {
  // pego o valor que o usuário escolheu no select
  let pratica = document.getElementById("pratica").value;

  // aqui vou mostrar o resultado na tela
  let resultado = document.getElementById("resultado");

  //  se for convencional, perde pontos porque impacta mais o meio ambiente
  if (pratica === "convencional") {
    pontos -= 10;
    resultado.innerHTML = "🚜 Alto impacto ambiental";

  //  se for orgânica, ganha pontos porque é mais sustentável
  } else if (pratica === "organica") {
    pontos += 10;
    resultado.innerHTML = "🌿 Sustentável";

  //  tecnologia fica no meio termo, nem tão ruim nem perfeito
  } else {
    pontos += 5;
    resultado.innerHTML = "🤖 Equilibrado";
  }

  //  garante que os pontos nunca passem de 0 a 100
  pontos = Math.max(0, Math.min(100, pontos));

  //  salva o valor atual no histórico pro gráfico
  historico.push(pontos);

  //  atualiza a barrinha de sustentabilidade
  document.getElementById("nivel").style.width = pontos + "%";

  //  redesenha o gráfico com os novos dados
  desenharGrafico();

  //  atualiza o ranking final
  calcularRanking();
}


//  função pra resetar tudo e começar de novo
function reiniciar() {
  pontos = 50;
  historico = [];

  // volta a barrinha pro meio
  document.getElementById("nivel").style.width = "50%";

  // limpa mensagens da tela
  document.getElementById("resultado").innerHTML = "Reiniciado 🌱";
  document.getElementById("ranking").innerHTML = "";
  document.getElementById("relatorio").innerHTML = "";

  // 🧹 limpa o gráfico do canvas
  let canvas = document.getElementById("graficoCanvas");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


//  função que desenha o gráfico no canvas
function desenharGrafico() {
  let canvas = document.getElementById("graficoCanvas");
  let ctx = canvas.getContext("2d");

  let w = canvas.width;
  let h = canvas.height;

  // limpa o gráfico antigo antes de desenhar outro
  ctx.clearRect(0, 0, w, h);

  //  desenha a grade de fundo (tipo linhas de referência)
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 1;

  for (let i = 0; i <= 5; i++) {
    let y = (h / 5) * i;

    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();

    // números da escala do gráfico
    ctx.fillStyle = "#555";
    ctx.font = "12px Arial";
    ctx.fillText(100 - i * 20, 5, y - 2);
  }

  // 📈 só desenha a linha se tiver dados
  if (historico.length > 0) {

    // define o espaçamento entre os pontos
    let espacamento = w / (historico.length + 1);

    ctx.beginPath(); // começa uma linha só
    ctx.strokeStyle = "#2e7d32";
    ctx.lineWidth = 3;

    // conecta todos os pontos do histórico
    for (let i = 0; i < historico.length; i++) {
      let x = (i + 1) * espacamento;
      let y = h - historico[i] * (h / 100);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke(); // desenha a linha completa

    //  desenha os pontinhos por cima da linha
    for (let i = 0; i < historico.length; i++) {
      let x = (i + 1) * espacamento;
      let y = h - historico[i] * (h / 100);

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#2e7d32";
      ctx.fill();
    }
  }
}


//  função que calcula o resultado final do jogador
function calcularRanking() {
  let r = document.getElementById("ranking");
  let rel = document.getElementById("relatorio");

  //  muito sustentável
  if (pontos >= 80) {
    r.innerHTML = "🏆 Sustentável";
    rel.innerHTML = "Ótimas escolhas!";

  //  equilibrado
  } else if (pontos >= 50) {
    r.innerHTML = "👍 Equilibrado";
    rel.innerHTML = "Bom caminho.";

  //  impacto alto
  } else {
    r.innerHTML = "⚠️ Impacto alto";
    rel.innerHTML = "Precisa melhorar.";
  }
}


//  quiz da última seção do site
function verificarResposta(correta) {
  const resultadoElement = document.getElementById("resultado-quiz");

  // se acertar
  if (correta) {
    resultadoElement.innerText =
      "🎉 Correto! A rotação de culturas e a adubação natural fortalecem o solo e promovem a biodiversidade.";

    resultadoElement.style.color = "#2e7d32"; // verde

  // se errar
  } else {
    resultadoElement.innerText =
      "❌ Tente novamente! Essa prática pode causar impactos negativos a longo prazo no ecossistema.";

    resultadoElement.style.color = "#d32f2f"; // vermelho
  }
}


// 🔙 botão de voltar pra página anterior
function voltar() {
  window.history.back();
}