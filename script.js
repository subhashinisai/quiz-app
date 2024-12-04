const container=document.querySelector('.container');
const questionBox=document.querySelector('.question');
const choicesBox=document.querySelector('.choices');
const nextBtn=document.querySelector('.nextBtn');




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

let currentQuestionIndex=0;

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

}
// console.log(questionDetails);
}




showQuestions();
nextBtn.addEventListener('click',()=>{
    if(currentQuestionIndex<quiz.length){
        currentQuestionIndex++;
        showQuestions();
    }
    
});


