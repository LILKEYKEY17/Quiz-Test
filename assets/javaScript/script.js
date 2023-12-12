
var questionsEl = document.querySelector("#questions"); 
var timerEl = document.querySelector("#timer"); 
var choicesEl = document.querySelector("#options"); 
var submitBtn = document.querySelector("#submit-score"); 
var startBtn = document.querySelector("#start"); 
var nameEl = document.querySelector("#name"); 
var feedbackEl = document.querySelector("#feedback"); 
var reStartBtn = document.querySelector("#restart");  
var currentQuestionIndex = 0; 
var time = questionsEl.length * 15; 
var timerId; 
  
function quizStart() { 
    timerId = setInterval(clockTick, 1000); 
    timerEl.textContent = time; 
    var landingScreenEl = document.getElementById("start-screen"); 
    landingScreenEl.setAttribute("class","hide"); 
    questionsEl.removeAttribute("class"); 
    getQuestion(); 
} 
  
function getQuestion() { 
    var currentQuestion = questionsEl[currentQuestionIndex]; 
    var promptEl = document.getElementById("question-words"); 
    promptEl.textContent = currentQuestion.prompt; 
    choicesEl.innerHTML = ""; 
    currentQuestion.options.forEach(function (choice, i) { 
        var choiceBtn = document.createElement("button"); 
        choiceBtn.setAttribute("value",choice); 
        choiceBtn.textContent = i + 1 + ". " + choice; 
        choiceBtn.onclick = questionClick; 
        choicesEl.appendChild(choiceBtn); 
    }); 
} 
  
function questionClick() { 
    if (this.value !== questionsEl[currentQuestionIndex].answer) { 
        time -= 10; 
        if (time < 0) { 
            time = 0; 
        } 
        timerEl.textContent = time; 
        feedbackEl.textContent = `Wrong! The correct answer was  
        ${questionsEl[currentQuestionIndex].answer}.`; 
        feedbackEl.style.color = "red"; 
    } else { 
        feedbackEl.textContent = "Correct!"; 
        feedbackEl.style.color = "green"; 
    } 
    feedbackEl.setAttribute( 
        "class", 
        "feedback"
    ); 
    setTimeout(function () { 
        feedbackEl.setAttribute("class","feedback hide"); 
    }, 2000); 
    currentQuestionIndex++; 
    if ( 
        currentQuestionIndex === questionsEl.length 
    ) { 
        quizEnd(); 
    } else { 
        getQuestion(); 
    } 
} 
  
function quizEnd() { 
    clearInterval(timerId); 
    var endScreenEl = document.getElementById("quiz-end"); 
    endScreenEl.removeAttribute("class"); 
    var finalScoreEl = document.getElementById("score-final"); 
    finalScoreEl.textContent = time; 
    questionsEl.setAttribute("class","hide"); 
} 
  

function clockTick() { 
    time--; 
    timerEl.textContent = time; 
    if (time <= 0) { 
        quizEnd(); 
    } 
} 

function saveHighscore() { 
    var name = nameEl.value.trim(); 
    if (name !== "") { 
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || []; 
        var newScore = { 
            score: time, 
            name: name, 
        }; 
        highscores.push(newScore); 
        window.localStorage.setItem("highscores",JSON.stringify(highscores)); 
        alert( 
            "Your Score has been Submitted"
        ); 
    } 
} 
  
function checkForEnter(event) { 
    if (event.key === "Enter") { 
        saveHighscore(); 
        alert( 
            "Your Score has been Submitted"
        ); 
    } 
} 
nameEl.onkeyup = checkForEnter;  
  
submitBtn.onclick = saveHighscore; 
  
startBtn.onclick = quizStart;