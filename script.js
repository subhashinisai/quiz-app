const container=document.querySelector('.container');
const questionBox=document.querySelector('.question');
const choicesBox=document.querySelector('.choices');
const nextBtn=document.querySelector('.nextBtn');
const scoreCard=document.querySelector('.scoreCard');
const alert=document.querySelector('.alert');
const startbtn=document.querySelector('.startbtn');
const timer=document.querySelector('.timer');

//array of objects with question and choices with correct answer
const quiz=[
    {
        question: "Q. Which of the following is not a CSS box model property?",
        choices: ["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },
    {
        question: "Q. Which of the following is not a valid way to declare a function in JavaScript?",
        choices: ["function myFunction() {}", " let myFunction = function() {};", "myFunction: function() {}", "const myFunction = () => {};"],
        answer: "myFunction: function() {}"
    },
    {
        question: "Q. Which of the following is not a JavaScript data type?",
        choices: ["string", "boolean", "object", "float"],
        answer: "float"
    },
    {
        question: "Q. What is the purpose of the this keyword in JavaScript?",
        choices: ["It refers to the current function.", "It refers to the current object.", "It refers to the parent object.", " It is used for comments."],
        answer: "It refers to the current object."
    }
];
//making variables
let currentQuestionIndex=0;
let score=0;
let quizOver=false;
let timeLeft=15;
let timerID=null;

//arrow function to show questions
const showQuestions=()=>{
const questionDetails = quiz[currentQuestionIndex];
questionBox.textContent=questionDetails.question;

choicesBox.textContent="";
for(let i=0;i<questionDetails.choices.length;i++){
    const currentChoice=questionDetails.choices[i];
    const choiceDiv=document.createElement('div');
    choiceDiv.textContent=currentChoice;
    choiceDiv.classList.add('choice');
    choicesBox.appendChild(choiceDiv);

    choiceDiv.addEventListener('click',()=>{
    if(choiceDiv.classList.contains('selected')){
        choiceDiv.classList.remove('selected');
    }else{
        choiceDiv.classList.add('selected');
    }
    });

}
if(currentQuestionIndex<quiz.length){
    startTimer();
}
}


//function to check answers
const checkAnswer=()=>{
    const selectedChoice=document.querySelector('.choice.selected');
    if (!selectedChoice) { 
        displayAlert("Submit your answer");
        return;
    }
    if(selectedChoice.textContent === quiz[currentQuestionIndex].answer){
        displayAlert("correct answer!");
        score++;
    }else{
        displayAlert(`wrong answer! ${quiz[currentQuestionIndex].answer} is the correct answer`);
    }
    timeLeft=15;
    currentQuestionIndex++;
    if(currentQuestionIndex<quiz.length){
      showQuestions();
    }else{
        showScore();
        stopTimer();
       
    }
   
}


//function to show score

const showScore =()=>{
    questionBox.textContent="";
    choicesBox.textContent="";
    scoreCard.textContent=`You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this Quiz!");
    nextBtn.textContent="Play Again";
    quizOver=true;
    timer.style.display="none";
  
}


//function to show alert
const displayAlert= (msg) =>{
    alert.style.display="block";
    alert.textContent=msg;
    setTimeout(()=>{
    alert.style.display="none";
    },3000);
}


//function to start timer
const startTimer=()=>{
    clearInterval(timerID); //check for existing timer
    timer.textContent=timeLeft;
    const countDown=()=>{
        timer.textContent=timeLeft;
        timeLeft--;
        if(timeLeft===0){
            const confirmUser=confirm("Time Up!!!!, Do you want to play the quiz again");
            if(confirmUser){
                timeLeft=15;
                startQuiz();
            }else{
                startbtn.style.display="block";
                container.style.display="none";
                return;
            }
        }
    }
   timerID = setInterval(countDown,1000);  
}

//function to stop timer
const stopTimer=()=>{
clearInterval(timerID);
}

//function to start a quiz
const startQuiz=()=>{
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 15;
    quizOver = false;
    timer.style.display="flex";
    shufflequestions();
}

//function to shuffle the questions of the quiz
const shufflequestions=()=>{
    for(let i=quiz.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [quiz[i],quiz[j]]=[quiz[j],quiz[i]];
    }
    currentQuestionIndex=0;
    showQuestions();
}



//adding event listener to start button
startbtn.addEventListener('click',()=>{
  startbtn.style.display="none";
  container.style.display="block";
  startQuiz();
});


nextBtn.addEventListener('click',() => {
    const selectedChoice=document.querySelector('.choice.selected');
    if(quizOver===true){
        nextBtn.textContent="Next";
        scoreCard.textContent="";
        currentQuestionIndex=0;
        startQuiz();
        quizOver=false;
       }else{
        checkAnswer();
    }
    
});


