let pontos = 50;
let historico = [];

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function simular() {
  let pratica = document.getElementById("pratica").value;
  let resultado = document.getElementById("resultado");

  if (pratica === "convencional") {
    pontos -= 10;
    resultado.innerHTML = "🚜 Alto impacto ambiental";
  } else if (pratica === "organica") {
    pontos += 10;
    resultado.innerHTML = "🌿 Sustentável";
  } else {
    pontos += 5;
    resultado.innerHTML = "🤖 Equilibrado";
  }

  pontos = Math.max(0, Math.min(100, pontos));
  historico.push(pontos);

  document.getElementById("nivel").style.width = pontos + "%";

  desenharGrafico();
  calcularRanking();
}

function reiniciar() {
  pontos = 50;
  historico = [];

  document.getElementById("nivel").style.width = "50%";
  document.getElementById("resultado").innerHTML = "Reiniciado 🌱";
  document.getElementById("ranking").innerHTML = "";
  document.getElementById("relatorio").innerHTML = "";

  let canvas = document.getElementById("graficoCanvas");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function desenharGrafico() {
  let canvas = document.getElementById("graficoCanvas");
  let ctx = canvas.getContext("2d");

  let w = canvas.width;
  let h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  // 📊 GRID
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 1;

  for (let i = 0; i <= 5; i++) {
    let y = (h / 5) * i;

    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();

    ctx.fillStyle = "#555";
    ctx.font = "12px Arial";
    ctx.fillText(100 - i * 20, 5, y - 2);
  }

  // 📈 LINHA CONTÍNUA
  if (historico.length > 0) {
    let espacamento = w / (historico.length + 1);

    ctx.beginPath(); // 👉 começa UMA linha só
    ctx.strokeStyle = "#2e7d32";
    ctx.lineWidth = 3;

    for (let i = 0; i < historico.length; i++) {
      let x = (i + 1) * espacamento;
      let y = h - historico[i] * (h / 100);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke(); // 👉 desenha a linha inteira

    // 🔵 PONTOS (por cima da linha)
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

function calcularRanking() {
  let r = document.getElementById("ranking");
  let rel = document.getElementById("relatorio");

  if (pontos >= 80) {
    r.innerHTML = "🏆 Sustentável";
    rel.innerHTML = "Ótimas escolhas!";
  } else if (pontos >= 50) {
    r.innerHTML = "👍 Equilibrado";
    rel.innerHTML = "Bom caminho.";
  } else {
    r.innerHTML = "⚠️ Impacto alto";
    rel.innerHTML = "Precisa melhorar.";
  }
}

// Função para o Quiz da Nova Secção
function verificarResposta(correta) {
    const resultadoElement = document.getElementById("resultado-quiz");
    if (correta) {
        resultadoElement.innerText = "🎉 Correto! A rotação de culturas e a adubação natural fortalecem o solo e promovem a biodiversidade.";
        resultadoElement.style.color = "#2e7d32"; // Verde para acerto
    } else {
        resultadoElement.innerText = "❌ Tente novamente! Essa prática pode causar impactos negativos a longo prazo no ecossistema.";
        resultadoElement.style.color = "#d32f2f"; // Vermelho para erro
    }
}

function voltar() {
  window.history.back();
}