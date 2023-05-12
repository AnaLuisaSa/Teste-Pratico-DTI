document
  .getElementById("formulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var nomeInput = document.getElementById("lembrete-input");
    var dataInput = document.getElementById("data-input");
    var nomeLembrete = nomeInput.value;
    var dataLembrete = new Date(dataInput.value + "T00:00");
    const dataAux = document.getElementById("data-input").value;
    const dataAtual = "2023-05-10";

    //Entra se um dos campos não for preenchido
    if (nomeLembrete === "" || dataLembrete == "") {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    // Garante que a data digitada seja no futuro
    if (dataAux < dataAtual) {
      alert("Data devera estar no futuro!!");
      return;
    }

    var lembrete = {
      nome: nomeLembrete,
      data: dataLembrete,
    };

    adicionarLembrete(lembrete);
    nomeInput.value = "";
    dataInput.value = "";
  });

function formatarData(date) {
  var options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("pt-BR", options);
}

function adicionarLembrete(lembrete) {
  var lembretesDiv = document.getElementById("lembretes");
  var lembreteListaId = "lembretes-" + formatarData(lembrete.data);
  var lembreteLista = document.getElementById(lembreteListaId);

  if (!lembreteLista) {
    var novoHeader = document.createElement("h2");
    novoHeader.className = "header";
    novoHeader.innerHTML = formatarData(lembrete.data);
    lembretesDiv.appendChild(novoHeader);

    lembreteLista = document.createElement("ul");
    lembreteLista.id = lembreteListaId;
    lembreteLista.className = "lembretes-lista";
    lembretesDiv.appendChild(lembreteLista);
  }

  var novoLembrete = document.createElement("li");
  novoLembrete.innerHTML = lembrete.nome;
  lembreteLista.appendChild(novoLembrete);

  var botaoExcluir = document.createElement("button");
  botaoExcluir.innerHTML = "Excluir";
  botaoExcluir.className = "button-excluir";
  botaoExcluir.addEventListener("click", function () {
    excluirLembrete(lembrete, novoLembrete);
  });
  novoLembrete.appendChild(botaoExcluir);
}

function excluirLembrete(lembrete, elementoLembrete) {
  var lembreteListaId = "lembretes-" + formatarData(lembrete.data);
  var lembreteLista = document.getElementById(lembreteListaId);
  lembreteLista.removeChild(elementoLembrete);
}
