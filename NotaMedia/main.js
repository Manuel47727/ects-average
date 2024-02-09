const cadeira = [
  "Cadeiras de Engenharia Informatica",
  [
    "1 Ano",
    [
      "1 Semestre",
      [
        ["Álgebra Linear e Geometria Analítica", 6, 0.0],
        ["Algoritmia e Programação", 7, 0.0],
        ["Análise Matemática", 6, 0.0],
        ["Arquitetura e Organização de Computadores", 6, 0.0],
        ["Competências Comportamentais", 5, 0.0],
      ],
    ],
    [
      "2 Semestre",
      [
        ["Fundamentos de Física", 4, 0.0],
        ["Matemática Discreta", 6, 0.0],
        ["Programação Orientada a Objetos", 6, 0.0],
        ["Redes de Computadores", 6, 0.0],
        ["Sistemas de Informação", 5, 0.0],
        ["Sociedade da Informação e do Conhecimento", 3, 0.0],
      ],
    ],
  ],
  [
    "2 Ano",
    [
      "1 Semestre",
      [
        ["Algoritmos e Estruturas de Dados", 6, 0.0],
        ["Engenharia de Requisitos", 6, 0.0],
        ["Estatística Aplicada", 6, 0.0],
        ["Laboratório de Programação", 6, 0.0],
        ["Sistemas Operativos", 6, 0.0],
      ],
    ],
    [
      "2 Semestre",
      [
        ["Bases de Dados", 6, 0.0],
        ["Compiladores", 6, 0.0],
        ["Engenharia de Software", 6, 0.0],
        ["Laboratório de Aplicações Multimédia", 6, 0.0],
        ["Laboratório de Tecnologias Web", 6, 0.0],
      ],
    ],
  ],
  [
    "3 Ano",
    [
      "1 Semestre",
      [
        ["Empreendedorismo", 6, 0.0],
        ["Gestão de Projetos", 6, 0.0],
        ["Inteligência Artificial", 6, 0.0],
        ["Laboratório de Aplicações Móveis", 6, 0.0],
        ["Qualidade de Software", 6, 0.0],
      ],
    ],
    [
      "2 Semestre",
      [
        ["Estágio", 8, 0.0],
        ["Laboratório de Análise de Dados", 6, 0.0],
        ["Segurança Informática", 6, 0.0],
        ["Sistemas Distribuídos", 6, 0.0],
        ["Internet das Coisas (Opcional)", 4, 0.0],
        ["Visão por Computador (Opcional)", 4, 0.0],
      ],
    ],
  ],
];

function showItems(args, selectedValue) {
  let cont = 0;
  let items = "";
  

  items += `<div class = "cursoano"><p class = "curso">${args[0]}</p><p> 2023/2024</p></div>`;

  for (let i = 1; i <= selectedValue; i++) {
    items += `<hr><p class = "anos">${args[i][0]}</p>`;
    for (let k = 1; k < args[i].length; k++) {
      items += `<p class = "semestres">${args[i][k][0]}</p>`;
      for (let j = 1; j < args[i][k].length; j++) {
        for (let m = 0; m < args[i][k][j].length; m++) {
          cont += 1;
          items += `<div class = "cadeirasnotas">
                      <p class = "nomecadeira">${args[i][k][j][m][0]} (${args[i][k][j][m][1]} ECTS) 
                         <input class = "notas" id="nota${cont}" min="0" max="20" placeholder="Nota Final">
                      </p>
                    </div>`;
        }
      }
    }
  }

  return items;
}

document.getElementById("calculateButton").addEventListener("click", calculateMedia);

function calculateMedia() {
  let notaMedia = 0;
  let cont = 1;
  let ectsTotal = 0;
  let notaTotal = 0;
  let items = "";

  const selectElement = document.getElementById("ano");
  const selectedValue = parseInt(selectElement.value);

  for (let i = 1; i <= selectedValue; i++) {
    for (let k = 1; k < cadeira[i].length; k++) {
      for (let j = 1; j < cadeira[i][k].length; j++) {
        for (let m = 0; m < cadeira[i][k][j].length; m++) {
          const notaInput = document.getElementById(`nota${cont}`);
          if (notaInput) {
            const nota = parseFloat(notaInput.value);
            console.log(nota);
            if (nota >= 0) {
              cont += 1;
              cadeira[i][k][j][m][2] = nota;
              ectsTotal = ectsTotal + cadeira[i][k][j][m][1];
              notaTotal =
                notaTotal +
                parseFloat(cadeira[i][k][j][m][2]) *
                  parseFloat(cadeira[i][k][j][m][1]);
            } else {
              cont += 1;
            }
          }
        }
      }
    }
  }
  notaMedia = notaTotal / ectsTotal;
  items += notaMedia.toFixed(2);
  return items;
}

function displayMedia() {
  const mediaResult = calculateMedia();
  const notaMediaElement = document.getElementById("notaMedia");

  if (!isNaN(mediaResult)) {
      notaMediaElement.innerHTML = `<p>${mediaResult}</p>`;
  } else {
      notaMediaElement.innerHTML = "";
  }
}

function updateDisplay() {
  const selectElement = document.getElementById("ano");
  const divElement = document.getElementById("cadeirasnotas")
  const selectedValue = parseInt(selectElement.value);
  divElement.innerHTML = `
        <p>
        ${showItems(cadeira, selectedValue)}
        </p>
        `;

  displayMedia();
}

document.getElementById("ano").addEventListener("change", updateDisplay);

calculateButton.addEventListener("click", () => {
  const mediaResult = calculateMedia();
  const notaMediaElement = document.getElementById("notaMedia");

  if (!isNaN(mediaResult)) {
      notaMediaElement.innerHTML = `<p class = "valormedia">${mediaResult}</p>`;
  }
});

updateDisplay();


calculateButton.addEventListener("click", function() {
    window.scroll({
        top: window.scrollY + 500,
        behavior: 'smooth'
    });
});
