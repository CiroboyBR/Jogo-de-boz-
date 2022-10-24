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

  for(let tamanho = link.length-1; tamanho > 0; tamanho--) {
    if( link[tamanho]  == '/') {
        tamanhoLink = tamanho;
        break
    }
  }

  //window.location.href = link.substring(0, tamanhoLink)+'/'+pagina;
  window.open(link.substring(0, tamanhoLink)+'/'+pagina)
}

function navega(pagina) {
  var linkNavega = window.location.href
  var tamanhoLinkNavega = 0;

  for(let tamanho = linkNavega.length-1; tamanho > 0; tamanho--) {
    if( linkNavega[tamanho]  == '/') {
        tamanhoLinkNavega = tamanho;
        break
    }
  }

  //window.location.href = link.substring(0, tamanhoLink)+'/'+pagina;
  window.location.href = linkNavega.substring(0, tamanhoLinkNavega)+'/'+pagina

}

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
function eraseCookie(name) {   
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}