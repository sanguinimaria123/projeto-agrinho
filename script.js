let pontos = 50;
let historico = [];

// dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// personalização
let nome = prompt("Qual seu nome?");
if (nome) {
  document.getElementById("boasVindas").innerHTML =
    nome + ", suas decisões moldam o futuro 🌎";
}

// simulador
function simular() {
  let pratica = document.getElementById("pratica").value;
  let resultado = document.getElementById("resultado");
  let barra = document.getElementById("nivel");

  resultado.innerHTML += "<br>➡️ Decisão adicionada!";
  if (pratica === "convencional") {
    pontos -= 10;
    resultado.innerHTML = "🚜 Alta produção, alto impacto";
  } 
  else if (pratica === "organica") {
    pontos += 10;
    resultado.innerHTML = "🌿 Sustentabilidade máxima";
  } 
  else {
    pontos += 5;
    resultado.innerHTML = "🤖 Equilíbrio tecnológico";
  }

  pontos = Math.max(0, Math.min(100, pontos));

  historico.push(pontos);
  barra.style.width = pontos + "%";

  desenharGrafico();
  calcularRanking();
}

function reiniciar() {
  pontos = 50;
  historico = [];

  document.getElementById("nivel").style.width = "50%";
  document.getElementById("resultado").innerHTML = "";
  document.getElementById("ranking").innerHTML = "";

  let canvas = document.getElementById("graficoCanvas");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// gráfico
function desenharGrafico() {
  let canvas = document.getElementById("graficoCanvas");
  let ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(0, 250 - historico[0]);

  for (let i = 0; i < historico.length; i++) {
    ctx.lineTo(i * 50, 250 - historico[i]);
  }

  ctx.stroke();
}

// ranking
function calcularRanking() {
  let ranking = document.getElementById("ranking");

  if (pontos >= 80) {
    ranking.innerHTML = "🏆 Produtor Sustentável de Elite";
  } else if (pontos >= 50) {
    ranking.innerHTML = "👍 Produtor Consciente";
  } else {
    ranking.innerHTML = "⚠️ Alto impacto ambiental";
  }
}

// animação scroll
window.addEventListener("scroll", () => {
  document.querySelectorAll("section").forEach(sec => {
    let topo = sec.getBoundingClientRect().top;
    if (topo < window.innerHeight - 100) {
      sec.classList.add("section-ativa");
    }
  });
});