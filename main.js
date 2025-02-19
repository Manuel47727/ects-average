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

function initializeGrades() {
  const savedGrades = localStorage.getItem("savedGrades");
  if (savedGrades) {
    const grades = JSON.parse(savedGrades);
    let cont = 1;
    for (let i = 1; i < cadeira.length; i++) {
      for (let k = 1; k < cadeira[i].length; k++) {
        for (let j = 1; j < cadeira[i][k].length; j++) {
          for (let m = 0; m < cadeira[i][k][j].length; m++) {
            if (grades[`nota${cont}`]) {
              cadeira[i][k][j][m][2] = parseFloat(grades[`nota${cont}`]) || 0.0;
            }
            cont++;
          }
        }
      }
    }
  }
}

function showItems(args, selectedValue) {
  let cont = 0;
  let items = "";
  items += `<div class="cursoano"><p class="curso">${args[0]}</p><p>2023/2024</p></div>`;
  for (let i = 1; i <= selectedValue; i++) {
    items += `<hr><p class="anos">${args[i][0]}</p>`;
    for (let k = 1; k < args[i].length; k++) {
      items += `<p class="semestres">${args[i][k][0]}</p>`;
      for (let j = 1; j < args[i][k].length; j++) {
        for (let m = 0; m < args[i][k][j].length; m++) {
          cont += 1;
          items += `<div class="cadeirasnotas">
                      <p class="nomecadeira">${args[i][k][j][m][0]} (${
            args[i][k][j][m][1]
          } ECTS) 
                         <input class="notas" 
                                id="nota${cont}" 
                                min="0" 
                                max="20" 
                                placeholder="Nota Final" 
                                value="${args[i][k][j][m][2] || ""}"
                                oninput="saveGrades()">
                      </p>
                    </div>`;
        }
      }
    }
  }
  return items;
}

function calculateMedia() {
  const selectElement = document.getElementById("ano");
  const selectedValue = parseInt(selectElement.value);
  let totalECTS = 0;
  let weightedSum = 0;
  let cont = 1;

  for (let i = 1; i <= selectedValue; i++) {
    for (let k = 1; k < cadeira[i].length; k++) {
      for (let j = 1; j < cadeira[i][k].length; j++) {
        for (let m = 0; m < cadeira[i][k][j].length; m++) {
          const notaInput = document.getElementById(`nota${cont}`);
          if (notaInput && notaInput.value !== "") {
            const grade = parseFloat(notaInput.value);
            const ects = cadeira[i][k][j][m][1];
            weightedSum += grade * ects;
            totalECTS += ects;
          }
          cont++;
        }
      }
    }
  }

  return totalECTS > 0 ? (weightedSum / totalECTS).toFixed(2) : NaN;
}

function saveGrades() {
  let grades = {};
  let cont = 1;

  for (let i = 1; i < cadeira.length; i++) {
    for (let k = 1; k < cadeira[i].length; k++) {
      for (let j = 1; j < cadeira[i][k].length; j++) {
        for (let m = 0; m < cadeira[i][k][j].length; m++) {
          const notaInput = document.getElementById(`nota${cont}`);
          if (notaInput) {
            grades[`nota${cont}`] = notaInput.value;
            cadeira[i][k][j][m][2] = parseFloat(notaInput.value) || 0.0;
          }
          cont++;
        }
      }
    }
  }
  localStorage.setItem("savedGrades", JSON.stringify(grades));
}

function loadGrades() {
  const savedGrades = localStorage.getItem("savedGrades");
  if (savedGrades) {
    const grades = JSON.parse(savedGrades);
    for (const key in grades) {
      const notaInput = document.getElementById(key);
      if (notaInput) {
        notaInput.value = grades[key];
      }
    }
  }
}

function updateDisplay() {
  const selectElement = document.getElementById("ano");
  const divElement = document.getElementById("cadeirasnotas");

  if (selectElement.value === "Escolha um ano") {
    divElement.innerHTML = "";
    return;
  }

  const selectedValue = parseInt(selectElement.value);
  divElement.innerHTML = `<p>${showItems(cadeira, selectedValue)}</p>`;
}

window.onload = function () {
  initializeGrades();

  const selectElement = document.getElementById("ano");
  selectElement.addEventListener("change", updateDisplay);

  const calculateButton = document.getElementById("calculateButton");
  calculateButton.addEventListener("click", () => {
    const mediaResult = calculateMedia();
    const notaMediaElement = document.getElementById("notaMedia");

    if (!isNaN(mediaResult)) {
      notaMediaElement.innerHTML = `<p class="valormedia">${mediaResult}</p>`;
    }
  });

  calculateButton.addEventListener("click", function () {
    window.scroll({
      top: window.scrollY + 500,
      behavior: "smooth",
    });
  });

  updateDisplay();
};
