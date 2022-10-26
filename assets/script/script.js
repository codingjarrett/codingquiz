//sets the variables for the page
var hello = document.querySelector("#intro");
var beginBtn = document.querySelector("#begin_button");
var introPage =document.querySelector("#intro_page");

var questionPage = document.querySelector("#question_page");
var askQuestion = document.querySelector("#ask_question");

var reactButtons = document.querySelectorAll(".choices");
var choiceBtn1 = document.querySelector("#choice_btn1");
var choiceBtn2 = document.querySelector("#choice_btn2");
var choiceBtn3 = document.querySelector("#choice_btn3");
var choiceBtn4 = document.querySelector("#choice_btn4");

var checkLine = document.querySelector("#check_line");
var scoreBoard = document.querySelector("#submit_page");
var finalScore = document.querySelector("#final_score");
var userInitial =document.querySelector("#initial");

var submitBtn = document.querySelector("#submit_btn");
var highScorePage = document.querySelector("#highscore_page");
var scoreRecord = document.querySelector("#score_record");
var scoreCheck = document.querySelector("#score_check");
var complete = document.querySelector("#complete");

var backBtn =document.querySelector("#back_btn");
var clearBtn=document.querySelector("#clear_btn");

var timeRemaining = document.getElementById("timer");

var secondsRemaining = 60;
var questionNumber = 0;
var totalScore = 0;
var questionCount = 1;

//sets the question bank and answers
var questionBank = [
    {
        question: "Commonly used data types DO NOT inlcude:",
        choices: ["1. alerts", "2. booleans", "3. numbers", "4. strings"],
        choice: "1"
    },
    {
        question: "The condition in an if / else statement is enclosed with _______.",
        choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        choice: "3"
    },
    {
        question: "Arrays in JavaScript can be used to store _______.",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        choice: "4"
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        choice: "3"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["1. JavaScript", "2. console log", "3. for loops", "4. terminal/bash"],
        choice: "2"
    }
];

//sets the functions for the page 
function countdown() {
        
        var timerInterval = setInterval(function () {

          secondsRemaining--;
          timeRemaining.textContent = "Time Remaining: " + secondsRemaining + " s";
    
            if (secondsRemaining <= 0){
                clearInterval(timerInterval);
                timeRemaining.textContent = "That's all folks!"; 
                complete.textContent = "That's all folks!";
                gameOver();

            } else  if(questionCount >= questionBank.length +1) {
                clearInterval(timerInterval);
                gameOver();
                } 
    }, 1000);
}

//sets function to start the quiz after clicking the button
function beginQuiz () {
        introPage.style.display = "none";
        questionPage.style.display = "block";
        questionNumber = 0
        countdown();
        showQuestion(questionNumber);
      
}
    
//sets the function to display the questions
function showQuestion (n) {
        askQuestion.textContent = questionBank[n].question;
        choiceBtn1.textContent = questionBank[n].choices[0];
        choiceBtn2.textContent = questionBank[n].choices[1];
        choiceBtn3.textContent = questionBank[n].choices[2];
        choiceBtn4.textContent = questionBank[n].choices[3];
        questionNumber = n;
    }

//sets the function to show whether or not the user correctly identified the answer 
function checkChoice(event) {
    event.preventDefault();
    //make it display
    checkLine.style.display = "block";
    setTimeout(function () {
        checkLine.style.display = 'none';
    }, 1000);

//sets the function to check the answer and add to the score if correct
    if (questionBank[questionNumber].choice == event.target.value) {
        checkLine.textContent = "NOYCE! You got it right!"; 
        totalScore = totalScore + 1;
//if the answer is wrong, user is prompted with correct answer identifier, score/time is also affected by inaccurate answer
    } else {
        secondsRemaining = secondsRemaining - 10;
        checkLine.textContent = "Sorry :( we were looking for answer number " + questionBank[questionNumber].choice + " .";
    }
//after user response, this presents the user with the next question
    if (questionNumber < questionBank.length -1 ) {
        showQuestion(questionNumber +1);
    } else {
    gameOver();
}
questionCount++;
}
//this sets the function so that when the timer reaches its end, and all all questions have logged a response, the game is over
function gameOver() {
        questionPage.style.display = "none";
        scoreBoard.style.display = "block";
        console.log(scoreBoard);
//displays the value of the final score of the user
        finalScore.textContent = "Not bad! Here's how yah did: " + totalScore ;
        timeRemaining.style.display = "N/A"; 
};

//retrieves the set/current score and initials from local storage
function getScore () {
    var setList =localStorage.getItem("ScoreList");
    if (setList !== null ){
        freshList = JSON.parse(setList);
        return freshList;
    } else {
        freshList = [];
    }
    return freshList;
};

//adds the score to a list
function renderScore () {
    scoreRecord.innerHTML = "";
    scoreRecord.style.display ="block";
    var highScores = sort();   
//sets the page to show only the highest 5 scores
    var highFive = highScores.slice(0,5);
    for (var i = 0; i < highFive.length; i++) {
        var item = highFive[i];
    var li = document.createElement("li");
    li.textContent = item.user + " - " + item.score;
    li.setAttribute("data-index", i);
    scoreRecord.appendChild(li);
    }
};

//organizes scores from most to least
function sort () {
    var scoreList = getScore();
    if (getScore == null ){
        return;
    } else{
    scoreList.sort(function(a,b){
        return b.score - a.score;
    })
    return scoreList;
}};

//adds user score to localstorage for later viewing
function addItem (n) {
    var addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
};

//sets the function to save the score using the users initials
function saveScore () {
    var scoreItem ={
        user: userInitial.value,
        score: totalScore
    }
    addItem(scoreItem);
    renderScore();
}

//adds the event listener to begin the quiz
beginBtn.addEventListener("click", beginQuiz);

reactButtons.forEach(function(click){
    click.addEventListener("click", checkChoice);
});

//sets event listener to save the information
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display ="none";
    saveScore();
});

//sets event listener to display the highscore on the page
scoreCheck.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display ="none";
    renderScore();
});

//returns user to the homepage, which reloads
backBtn.addEventListener("click",function(event){
        event.preventDefault();
        scoreBoard.style.display = "none";
        introPage.style.display = "block";
        highScorePage.style.display = "none";
        questionPage.style.display ="none";
        location.reload();
});

//adds an event listener to clear the locally stored information
clearBtn.addEventListener("click",function(event) {
    event.preventDefault();
    localStorage.clear();
    renderScore();
});