// Define your quiz questions and answers
const quizQuestions = [
    {
        question: "What is JavaScript?",
        answers: ["A programming language", "A type of coffee", "A fruit"],
        correctAnswer: "A programming language"
    },
    {
        question: "What is Java?",
        answers: ["D", "E", "F"],
        correctAnswer: "D"
    },
    {
        question: "What is Script?",
        answers: ["A", "B", "C"],
        correctAnswer: "A"
    },
    // Add more questions here
];

let currentQuestionIndex = 0;
let timeRemaining = 60;
let timerInterval;

function startQuiz() {
    // Start the timer

    // alert("alert!")

    document.getElementById("introduction").style.display = "none"

    timerInterval = setInterval(function() {
        timeRemaining--;
        document.getElementById("time-remaining").textContent = timeRemaining;

        if (timeRemaining <= 0 || currentQuestionIndex === quizQuestions.length) {
            endQuiz();
        }
    }, 1000);

    // Display the first question
    displayQuestion(currentQuestionIndex);
}

function displayQuestion(questionIndex) {
    // Display the question and answer choices
    const questionContainer = document.getElementById("quiz-container");
    const quizObject = quizQuestions[questionIndex];
    questionContainer.textContent=""
    // Populate the question and answer choices in the HTML
    const h3 = document.createElement("h3")
    h3.textContent = quizObject.question 
    questionContainer.appendChild(h3)
    const ul = document.createElement("ul")
   for (let i = 0; i < quizObject.answers.length; i++) {
    const li = document.createElement("li")
    const button = document.createElement("button")
    button.textContent = quizObject.answers[i]
    button.addEventListener("click", nextQuestion)
    li.appendChild(button)
    ul.appendChild(li)
   }
questionContainer.appendChild(ul)

    // Add event listeners to answer choices to check if the answer is correct

}

function nextQuestion() {
currentQuestionIndex++
displayQuestion(currentQuestionIndex)
}

function endQuiz() {
    // Stop the timer
    clearInterval(timerInterval);

    // Display a form to save initials and score
    const highScoreContainer = document.getElementById("high-score");
    // Create and display the form with input fields for initials and a submit button
}

// Add event listener for the start button
document.getElementById("start-button").addEventListener("click", startQuiz);

// Call startQuiz() to begin the quiz when the page loads
// startQuiz();
