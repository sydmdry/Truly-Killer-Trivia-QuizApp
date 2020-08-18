'use strict';
let data = STORE;
let questionCount = 0;
let score = 0;
let currentQuestion = 0;


//User starts the quiz
function beginQuiz(){
  $('.startQuiz').on('click', '.beginButton', function(event){
    $('.startQuiz').hide();
    $('main').append(renderQuestion);
    updateQuestionNum();
  });
};

//Render Question after quiz start
function renderQuestion(){
  $('.createForm').show();
  if(questionCount < data.length){
    return createQuestion(currentQuestion);
  }else{
    endOfQuiz();
  }
}

function createQuestion(currentQuestion){
  $('.createForm').html(
    `<form role = "form" class = "formQuiz">
        <h2>${data[currentQuestion].question}</h2>
          <input name="option" type="radio" value = "${data[currentQuestion].answer[0]}" required>
          <label for="option">${data[currentQuestion].answer[0]}</label><br>
          <input name="option" type="radio" value = "${data[currentQuestion].answer[1]}">        
          <label for="option">${data[currentQuestion].answer[1]}</label><br>
          <input name="option" type="radio" value = "${data[currentQuestion].answer[2]}">
          <label for="option">${data[currentQuestion].answer[2]}</label><br>
          <input name="option" type="radio" value = "${data[currentQuestion].answer[3]}">
          <label for="option">${data[currentQuestion].answer[3]}</label><br>
            <button type="submit" class="submitButton">Submit</button>
      </form>`
  )
}

function submitAnswer(){
  $('.createForm').on('submit', function(event){
    event.preventDefault();
    renderAppropriateFeedback();
  });
}

function changeQuestionNum(){
  if(questionCount < data.length){
  questionCount++;
  }
}

function updateQuestionNum(){
  changeQuestionNum();
  $('.questionNumber').text(questionCount);
}

function resetQuestionNum(){
  questionCount = 0;
  $('.questionNumber').text(questionCount);
}

function resetScore(){
  score = 0;
  $('.scoreNumber').text(score);
}

function changeScore(){
  score++;
}

function updateScore(){
  changeScore();
  $('.scoreNumber').text(score);
}

function renderAppropriateFeedback(){
  $('.createForm').hide();
  $('.feedback').show();
  let selected = $('input:checked');
  let answer = selected.val();
  console.log(answer);
  let correctAns = data[currentQuestion].correct;
  console.log(correctAns);
    if (answer === correctAns) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
}

function correctAnswer(){
  $('.box').hide();
  $('.feedback').html(
    `<h3>Wow! You're Sharp!</h3>
      <img src = 'images/knife.gif' alt = 'Dexter Morgan cleaning a knife' class = 'gif'><br>
      <button type = 'button' class = 'continueButton'>Continue...</button>`);
  updateScore();
}

function wrongAnswer(){
  $('.box').hide();
  $('.feedback').html(
    `<h3>Oops! Better luck next time!<br>The correct answer was "${data[currentQuestion].correct}"</h3>
      <img src = 'images/oliviabenson.gif' alt = 'Olivia Benson shaking her head and walking away.' class = 'gif'><br>
      <button type = 'button' class = 'continueButton'>Continue...</button>`);
}

function nextQuestion(){
  $('.feedback').on('click', '.continueButton',
    function(event){
      $('.feedback').hide();
      $('.box').show();
      currentQuestion++;
      renderQuestion();
      updateQuestionNum();
    });
  }

function endOfQuiz(){
  $('.box').hide();
  $('.createForm').hide();
  $('.feedback').hide();
  $('.quizEnd').show();
  $('.quizEnd').html(
    `<h3>You Made It!<br><img src = 'images/batesmotel.gif' alt = 'Sherrif Alex Romero saying cheers and clinking glasses with Norma Bates.' class = 'gif'><br>Your final score is ${score}/7</h3><button type = 'button' class = 'tryAgain'>Try Again?</button>`
  )
}


function restartQuiz(){
   $('.quizEnd').on('click', '.tryAgain', function(event){
    currentQuestion = 0;
    resetQuestionNum();
    resetScore();
    $('.quizEnd').hide();
    $('.startQuiz').show();
  })
}

function handleQuizApp(){
  beginQuiz();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}
$(handleQuizApp);

