const container=document.querySelector('.container');
const questionBox=document.querySelector('.question');
const choicesBox=document.querySelector('.choices');
const nextBtn=document.querySelector('.nextBtn');
const scoreCard=document.querySelector('.scoreCard');
const alert=document.querySelector('.alert');
const startbtn=document.querySelector('.startbtn');


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
    currentQuestionIndex++;
    if(currentQuestionIndex<quiz.length){
      showQuestions();
    }else{
        showScore();
        quizOver=true;
    }
   
}


//function to show score

const showScore =()=>{
    questionBox.textContent="";
    choicesBox.textContent="";
    scoreCard.textContent=`You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this Quiz!");
    nextBtn.textContent="Play Again";
    nextBtn.addEventListener('click',()=>{
  
    });

}


//function to show alert
const displayAlert= (msg) =>{
    alert.style.display="block";
    alert.textContent=msg;
    setTimeout(()=>{
    alert.style.display="none";
    },3000);
}


//adding event listener to start button
startbtn.addEventListener('click',()=>{
  startbtn.style.display="none";
  container.style.display="block";
  showQuestions();
});



// showQuestions();

nextBtn.addEventListener('click',() => {
    const selectedChoice=document.querySelector('.choice.selected');
    if(quizOver===true){
        nextBtn.textContent="Next";
        scoreCard.textContent="";
        currentQuestionIndex=0;
        showQuestions();
        quizOver=false;
       }else{
        checkAnswer();
    }
    
});


