// Define your quiz questions and answers
const quizQuestions = [
    {
        question: "What is JavaScript?",
        answers: ["A programming language", "A type of coffee", "A fruit"],
        correctAnswer: "A programming language"
    },
    {
        question: "what is a method in javascript?",
        answers: ["A method in JavaScript is a standalone function that can be called on an object", "A method in JavaScript is a property of an object that is a function, allowing the object to perform actions or computations", "A method in JavaScript is a built-in function provided by the language for performing specific operations, such as string manipulation or mathematical calculations"],
        correctAnswer: "A method in JavaScript is a property of an object that is a function, allowing the object to perform actions or computations"
    },
    {
        question: "what is NOT example of a method?",
        answers: ["toUpperCase()", "let x = 5;", "console.log()"],
        correctAnswer: "let x = 5;"
    },
    {
        question: "what is an object in javascript?",
        answers: ["Data container with named properties", "Key-value pair data structure", "JavaScript's complex data structure"],
        correctAnswer: "Key-value pair data structure"
    },
    {
        question: "What is an example of an object in javascript?",
        answers: ["Hello, world!", "42", "{ name: John, age: 30 }"],
        correctAnswer: "{ name: John, age: 30 }"
    },
    {
        question: "what do javascript libraries allow you to do?",
        answers: ["Create standalone web applications", "Replace JavaScript with a different programming language", "Extend JavaScript's functionality and simplify coding tasks"],
        correctAnswer: "Extend JavaScript's functionality and simplify coding tasks"
    },
    // Add more questions here
];

let currentQuestionIndex = 0;
let timeRemaining = 20;
let timerInterval;
let score = 0;

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

        if (timeRemaining === 10) {
            alert("This is a distraction! stay focused!");
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

function nextQuestion(event) {
    const selectedAnswer = event.target.textContent;
    const currentQuestion = quizQuestions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
    } else {
        timeRemaining--; // Deduct 1 second for a wrong answer
        if (timeRemaining < 0) {
            timeRemaining = 0; // Ensure the time doesn't go negative
        }
    }

    currentQuestionIndex++;
    
    if (currentQuestionIndex === quizQuestions.length || timeRemaining === 0) {
        endQuiz();
    } else {
        displayQuestion(currentQuestionIndex);
    }
    
    // Update the score display
    const scoreElement = document.getElementById("user-score");
    scoreElement.textContent = `Score: ${score}`;
} 

let endQuizCalled = false; //flag variable

function endQuiz() {

    if(!endQuizCalled) {
        endQuizCalled = true;

    // Stop the timer
    clearInterval(timerInterval);

    // Display a form to save initials and score
    const highScoreContainer = document.getElementById("high-score");
    
    // Create a form element
    const form = document.createElement("form");
    
    // Create an input field for initials
    const initialsInput = document.createElement("input");
    initialsInput.type = "text";
    initialsInput.placeholder = "Enter your initials";
    
    // Create a submit button
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    
    // Add an event listener to the submit button to handle saving the score
    submitButton.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the form from submitting
    
        const userInitials = initialsInput.value;
        
        // Save the score in local storage
        const scores = JSON.parse(localStorage.getItem("scores")) || [];
        scores.push({ initials: userInitials, score });
        localStorage.setItem("scores", JSON.stringify(scores));

        // You can also display a message or redirect to a high-score page here
        alert(`Score saved for ${userInitials}: ${score}`);
    });
    
    // Append the input field and submit button to the form
    form.appendChild(initialsInput);
    form.appendChild(submitButton);
    
    // Append the form to the highScoreContainer
    highScoreContainer.appendChild(form);
}
}




// Add event listener for the start button
document.getElementById("start-button").addEventListener("click", startQuiz);

// Call startQuiz() to begin the quiz when the page loads
// startQuiz();
