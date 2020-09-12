function question(text, choices, answer){
    this.text=text;
    this.choices=choices;
    this.answer=answer;
}

question.prototype.correctanswer=function(choice){
    return choice === this.answer;
}

//score and number of questions

function Quiz(questions){
    this.score = 0;
    this.questions=questions;
    this.questionIndex=0;

}

Quiz.prototype.getQuestionIndex = function(){
    return this.questions[this.questionIndex];
}

Quiz.prototype.isEnded = function(){
    return this.questions.length === this.questionIndex;
}

Quiz.prototype.guess = function(answer){
    
    if(this.getQuestionIndex().correctanswer(answer)){
        this.score++;
    }
    this.questionIndex++;
}

//function to populate question

function populate(){
    if(quiz.isEnded()){
        showsScores();
    }

    else{
        //show question
        let element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        //show choices
        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            const element = document.getElementById("choice" + [i]);
            element.innerHTML = choices[i];
            guess("btn"+i, choices[i]);
        }
        showProgress();
    }
};

function guess(id, guess){
    let button = document.getElementById(id);
    button.onclick=function(){
        quiz.guess(guess);
        populate();
    }
}

function showProgress(){
    let currentQuestionNumber = quiz.questionIndex + 1;
    let element = document.getElementById("progress");
    element.innerHTML="Question "+ currentQuestionNumber +" of "+ quiz.questions.length;

}
function showsScores() {
    let gameOverHtml = "<h1>Result</h1>";
    gameOverHtml += "<h2 id='score'> Your score: "+ quiz.score +" out of 5"+ "</h2>";
    gameOverHtml +="<textarea></textarea>" + "<button>Submit</button>"

    let element=document.getElementById("quiz");
    element.innerHTML=gameOverHtml;


}

let questions = [
    new question("Commonly used data types DO NOT include ______.", ["strings", "booleans", "alerts", "numbers"], "alerts" ),
    new question("A very useful tool used during development and debugging for printing content to the debugger is________.", ["JavaScript", "terminal/bash", "for loops", "console.log"], "console.log"),
    new question("String values must be enclosed within _______ when being assigned to variables.", ["commas", "curly brackets", "quotes", "all of the above"], "quotes"),
    new question("Arrays in JavaScript can be used to store_________.", ["numbers and strings", "other arrays", "booleans", "all of the above"], "all of the above"),
    new question("The condition in an if/else statement is enclosed within ________.", ["quotes", "curly brackets", "parentheses", "square brackets"], "curly brackets")

];

let quiz = new Quiz(questions);

populate();

// timer
const startingMinutes = 3;
let time = startingMinutes * 60;
const countdownEl = document.getElementById("timer");

setInterval(updateCountdown, 1000);

function updateCountdown() {
    const minutes = Math.floor(time/60);
    let seconds = time % 60;

    seconds = seconds < 10 ? "0" + seconds :seconds;
    countdownEl.innerHTML = `${minutes}:${seconds}`;
    time--;
    time = time < 0 ? 0 : time; 
}
