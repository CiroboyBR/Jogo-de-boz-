var imagensMesa = ["", "flamengo2.png", "corinthians.jpg", "palmeiras.png", "santos.png", "saopaulo.png", "vasco.png"];

var numerosSelecionados = [false, false, false, false, false, false, false];
var numerosValorApostas = [0, 0, 0, 0, 0, 0, 0];
var numerosEstatisticas = [0, 0, 0, 0, 0, 0, 0];
var numerosPorcentagens = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
var numSorteados = [0, 0, 0];
var dinheiro = 1000;

var tamTimesMesa = 30;
var tamTimesResultado = 5;
var tamTimesBalao = 15;
var valorGanho = 0;
var snGanhouPremio = false;


var audio_premio = new Audio('som/premio.wav');
var audio_perdeuTudo = new Audio('som/perdeu_tudo.mp3');
var audio_errou = new Audio('som/errou.mp3');


function atualizaImagens() {
  for (let i = 1; i < 7; i++) {
    if (numerosEstatisticas[0] > 0)
      atualizaPorcentagens(i);

    document.getElementById('num' + i).innerHTML = numerosPorcentagens[i].toFixed(1) + "% <img src='img/" + imagensMesa[i] + "' alt='' width='" + tamTimesMesa + "%'>"
  }
}

function atualizaPorcentagens(num) {
  numerosPorcentagens[num] = (parseFloat(numerosEstatisticas[num]) * parseFloat(100.0)) / parseFloat(numerosEstatisticas[0]);
  console.log(numerosPorcentagens[num].toFixed(2))
}




function selecionaNumero(numero) {

  apostaDinheiro(numero);

}



function rolaBozo() {
  valorGanho = 0;
  snGanhouPremio = false;




  for (let i = 0; i < 3; i++) {
    //sorteia numero
    numSorteados[i] = parseInt(Math.floor(Math.random() * 6 + 1));
    numerosEstatisticas[numSorteados[i]]++;
    numerosEstatisticas[0]++;

    //premia os acertos
    for (let x = 1; x < 7; x++)
      if (numSorteados[i] == x && numerosValorApostas[x] > 0) {
        valorGanho = parseInt(valorGanho) + parseInt(numerosValorApostas[x]);
        console.log('Numero acertado: ' + x);
        snGanhouPremio = true;
      }
  }

  tocaSom();

  //devolve os valores apostados em caso de acerto
  for (let i = 0; i < 3; i++) {
    for (let x = 1; x < 7; x++) {
      if (numSorteados[i] == x && numerosValorApostas[x] > 0) {
        dinheiro = parseInt(dinheiro) + parseInt(numerosValorApostas[x]);

        numerosValorApostas[x] = 0;
      }
    }
  }
  dinheiro = parseInt(dinheiro) + parseInt(valorGanho);





  document.getElementById('resultado').innerHTML = "Sorteados: <img src='img/" + imagensMesa[numSorteados[0]] + "' alt='' width='" + tamTimesResultado + "%'>" + "<img src='img/" + imagensMesa[numSorteados[1]] + "' alt='' width='" + tamTimesResultado + "%'>" + "<img src='img/" + imagensMesa[numSorteados[2]] + "' alt='' width='" + tamTimesResultado + "%'>";


  resetaApostas();
  document.getElementById('tdDinheiro').innerHTML = "R$ " + dinheiro;

  //se perder tudo
  if (dinheiro <= 0)
    audio_perdeuTudo.play();

  console.log(numerosEstatisticas);
  atualizaImagens();
}

function tocaSom() {
  if (sn_apostouDinheiro() == true) {
    //audio se for premiado acertando algum numero
    if (snGanhouPremio) {
      console.log('entrou!')
      audio_premio.play();
      msgOK("Acertou: <img src='img/" + imagensMesa[numSorteados[0]] + "' alt='' width='" + tamTimesBalao + "%'>" + "<img src='img/" + imagensMesa[numSorteados[1]] + "' alt='' width='" + tamTimesBalao + "%'>" + "<img src='img/" + imagensMesa[numSorteados[2]] + "' alt='' width='" + tamTimesBalao + "%'>", 2000);
    } else {
      audio_errou.play();
      msgErro("Errou: <img src='img/" + imagensMesa[numSorteados[0]] + "' alt='' width='" + tamTimesBalao + "%'>" + "<img src='img/" + imagensMesa[numSorteados[1]] + "' alt='' width='" + tamTimesBalao + "%'>" + "<img src='img/" + imagensMesa[numSorteados[2]] + "' alt='' width='" + tamTimesBalao + "%'>", 2000);
    }
  }
}

function resetaApostas() {
  for (let i = 1; i < 7; i++) {

    document.getElementById('num' + i).style.backgroundColor = "white";
    numerosSelecionados[i] = false;
    numerosValorApostas[i] = parseInt(0);
  }
}

function apostaDinheiro(numeroApostado) {
  if (dinheiro > 0) {
    Swal.fire({
      title: 'Valor da aposta',
      html: "<input class='swal2-input' type='digit' id='valorAposta' value='100'>",
      stopKeydownPropagation: false,
      preConfirm: () => {
        if (dinheiro - parseInt(document.getElementById('valorAposta').value) >= 0) {
          console.log(document.getElementById('valorAposta').value)
          dinheiro = parseInt(dinheiro) - parseInt(document.getElementById('valorAposta').value)
          numerosValorApostas[numeroApostado] = parseInt(numerosValorApostas[numeroApostado]) + parseInt(document.getElementById('valorAposta').value)
          document.getElementById('tdDinheiro').innerHTML = "R$ " + dinheiro;

          numerosSelecionados[numeroApostado] = true;
          document.getElementById('num' + numeroApostado).style.backgroundColor = "lightgreen";

          return true;
        } else
          return false;
      },
      willOpen: () => {

      }
    });
  } else {
    msgErro('acabou a grana!', 3000);
  }


}


//verifica se foi apostado em algum time
function sn_apostouDinheiro() {
  for (let i = 1; i < 7; i++) {
    if (numerosValorApostas[i] > 0)
      return true;
  }

  return false;
}



//Simplificação de msg de erro da SweetAlert2
function msgErro(msg, tempo) {
  //Exibe erro
  Swal.fire({
    title: msg,
    icon: 'error',
    showConfirmButton: false,
    timer: tempo,
    willClose: () => { }
  })
}

//Simplificação de msg de erro da SweetAlert2
function msgOK(msg, tempo) {
  //Exibe erro
  Swal.fire({
    title: msg,
    icon: 'success',
    showConfirmButton: false,
    timer: tempo,
    willClose: () => { }
  })
}

function limpar() {
  document.location.reload(true);
}


//FUNÇÃO PARA APLICAR CAIXA ALTA NOS FORMULARIOS
function toUpperText(idElemento) {
  document.getElementById(idElemento).value = document.getElementById(idElemento).value.toString().toUpperCase();
}


function validaTelefone(idElemento) {
  var telefoneSoNumeros = document.getElementById(idElemento).value.replace(/[^0-9]/g, '');

  if (telefoneSoNumeros.length < 10) {
    //reseta o numero
    document.getElementById(idElemento).value = ""

    //exibe erro que fecha em 3s
    msgErro("Telefone precisa ter 10 números", 3000);
  }
}

//Remove tudo que não seja letras da string
function validaSomenteLetras(idElemento) {
  toUpperText(idElemento) //aplica caixa alta

  //deixa somente as letras
  document.getElementById(idElemento).value = document.getElementById(idElemento).value.replace(/[^A-ZÁÉÍÓÚÀÈÌÒÙÂÊÔÃÕÇ ]/g, '');
}

function validaData(idElemento) {
  //console.log(document.getElementById(idElemento).value)
  let data = document.getElementById(idElemento).value.replace(/[^0-9]/g, '');

  //Quebra a data em dia, mes e ano para formatação
  let ano = document.getElementById(idElemento).value.substring(0, 4);
  let mes = document.getElementById(idElemento).value.substring(5, 7);
  let dia = document.getElementById(idElemento).value.substring(8, 10);

  if (data.length != 8) {
    msgErro('Data inválida!', 3000)
    document.getElementById(idElemento).value = ""
  } else if (dia < 1 || dia > 31) {
    msgErro('Data inválida!', 3000)
    document.getElementById(idElemento).value = ""
  } else if (mes < 1 || mes > 12) {
    msgErro('Data inválida!', 3000)
    document.getElementById(idElemento).value = ""
  }
}

function redireciona(pagina) {
  var link = window.location.href
  var tamanhoLink = 0;

  for (let tamanho = link.length - 1; tamanho > 0; tamanho--) {
    if (link[tamanho] == '/') {
      tamanhoLink = tamanho;
      break
    }
  }

  //window.location.href = link.substring(0, tamanhoLink)+'/'+pagina;
  window.open(link.substring(0, tamanhoLink) + '/' + pagina)
}

function navega(pagina) {
  var linkNavega = window.location.href
  var tamanhoLinkNavega = 0;

  for (let tamanho = linkNavega.length - 1; tamanho > 0; tamanho--) {
    if (linkNavega[tamanho] == '/') {
      tamanhoLinkNavega = tamanho;
      break
    }
  }

  //window.location.href = link.substring(0, tamanhoLink)+'/'+pagina;
  window.location.href = linkNavega.substring(0, tamanhoLinkNavega) + '/' + pagina

}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function eraseCookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}