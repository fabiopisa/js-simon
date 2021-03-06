/*
simon-dice
1. Al via il computer genera 5 numeri
2. Vengono mostrati per 5 secondi i numeri generati
3. L'utente deve indovinare i 5 numeri
4. Quindi c'è un'attesa di 3 secondi perchè il computer mostra calcolo in corso
5. Vengono mostrati i numeri indovinati
6. Opzionale:
	- alla fine far apparire un bottone “restart”
	- all’inizio fare scegliere all’utente con quanti numeri giocare
 */
  var arrRandom = [];
  var arrNumber = [];
  var arrResult = [];
  var selectNumber;

$(document).ready(function(){
  
  reset();

  $('#btn-start').click(function(){

    $(this).hide();
    while(arrRandom.length < selectNumber){
      var nmbRandom = generatorRandomNumber(1,100)
      if(!arrRandom.includes(nmbRandom)){
        arrRandom.push(nmbRandom);
      }
    }
    console.log(arrRandom)

    printOutput(arrRandom.join(" - "),'#display')

    setTimeout(function(){
      printOutput('Indovina i numeri', '#display');
      $('#btn-box').show();
    }, 5000);

  });

  $('#btn-send').click(function(){
    var nmbUser = $('#nmb').val();
    if(arrNumber.includes(parseInt(nmbUser))){
      alert(' ATTENZIONE...Numero già scelto!!');
    }else if(parseInt(nmbUser) < 1){
      alert(' ATTENZIONE...Numero non valido!!');
    }else{
      arrNumber.push(parseInt(nmbUser));
    }
    $('#nmb').val('');
    $('#nmb').focus();

    if(arrNumber.length === arrRandom.length){ 
      printOutput('Calcolo in corso', '#display');
      $('#btn-box').hide();
      setTimeout(function(){
        for(var i = 0; i<arrRandom.length; i++){
          var numberUser = arrRandom[i];

          if(arrResult.length === 0){
            printOutput('Hai perso', '#display');
          }else if(arrResult.length === arrRandom.length){
            printOutput('BRAVO.. hai indovinato tutti i numeri', '#display');
          }else{
            arrResult.push(numberUser);
            printOutput('I numeri indovinati sono ' + arrResult.join(" - "), '#display');
            console.log(arrResult);
          }
          $('#reset').show();
        }
        
      },3000);

    }
    
    console.log(arrNumber);
  });

  $('#reset').click(function(){
    reset();
  });

});

//FUNZIONI
function reset(){
  selectNumber = parseInt(prompt('con quanti numeri vuoi giocare?'));
  arrRandom = [];
  arrNumber = [];
  arrResult = [];
  printOutput('Pronto?.. Clicca VIA!', '#display');
  $('#btn-start').show();
  $('#btn-box').hide();
  $('#reset').hide();
  $('#nmb').val('');
};

function printOutput (text, target){
  $(target).text(text);
};

function generatorRandomNumber(min, max){
 return Math.floor(Math.random()*(max - min + 1)+min);
};