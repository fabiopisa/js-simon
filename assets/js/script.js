/*
simon-dice
1. Al via il computer genera 5 numeri
2. Vengono mostrati per 5 secondi i numeri generati
3. L'utente deve indovinare i 5 numeri
4. Quindi c'è un'attesa di 5 secondi perchè il computer mostra calcolo in corso
5. Vengono mostrati i numeri indovinati
6. Opzionale:
	- alla fine far apparire un bottone “restart”
	- all’inizio fare scegliere all’utente con quanti numeri giocare
 */

$(document).ready(function(){
  var selectNumber = parseInt(prompt('con quanti numeri vuoi giocare?'))

  reset();
  // array dei numeri ramdom generati dal computer
  var arrRandom = [];
  var arrNumber = [];
  var arrResult = [];

  $('#restart').click(function(){
    reset();
  });

  $('#btn-start').click(function(){

    $(this).hide();
    while(arrRandom.length < selectNumber){
      arrRandom.push(generatorRandomNumber(1,100));
    }
    console.log(arrRandom)

    printOutput(arrRandom.toString(),'#display')

    setTimeout(function(){
      printOutput('Indovina i numeri', '#display');
      $('#btn-box').show();
    }, 2000);

  });

  $('#btn-send').click(function(){
    
    if(arrNumber.includes( $('#nmb').val())){
      alert(' ATTENZIONE...Numero già scelto!!');
      $('#nmb').val('');
    }else{
      var nmbUser = $('#nmb').val();
      arrNumber.push(parseInt(nmbUser));
      $('#nmb').val('');
    }

    if(arrNumber.length === arrRandom.length){ 
      printOutput('Calcolo in corso', '#display');
      $('#btn-box').hide();
      setTimeout(function(){
        for(var i = 0; i<arrRandom.length; i++){
          var numberUser = arrRandom[i];
    
          if(arrNumber.includes(numberUser)){
            arrResult.push(numberUser);
            printOutput('I numeri indovinati sono ' + arrResult, '#display');
            console.log(arrResult);
            $('#restart').show();
          }
        }
        
      },2000);

    }
    
    console.log(arrNumber);
  });

});

//FUNZIONI
function reset(){
  printOutput('Pronto?.. Clicca VIA!', '#display');
  $('#btn-start').show();
  $('#btn-box').hide();
  $('#restart').hide();
  $('#nmb').val('');
};

function printOutput (text, target){
  $(target).text(text);
};

function generatorRandomNumber(min, max){
 return Math.floor(Math.random()*(max - min + 1)+min);
};