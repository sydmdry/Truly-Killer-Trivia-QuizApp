'use strict';
let data = STORE;
let questionCount = 0;
let score = 0;


//User starts the quiz
function beginQuiz(){
  $('.createForm').on('click', '.beginButton',
  function(event){
    $('.startQuiz').remove();
    $('main').append(renderQuestion);
  });
};

//Render Question after quiz start
function renderQuestion(){
  
}

function updateScoreQuestion(){
}

function correctAnswer(){
}

function wrongAnswer(){
}

function restartQuiz(){
}


function handleQuizApp(){
  beginQuiz();
}
$(handleQuizApp);

