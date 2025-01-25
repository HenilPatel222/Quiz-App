
const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: ["Shark", "Blue Whale", "Elephant", "Giraffe"],
        correctAnswer: 1 // Correct answer is "Blue Whale" (index 1)
    },
    {
        question: "Which is the smallest country in the world?",
        answers: ["Vatican City", "Maldives", "Monaco", "San Marino"],
        correctAnswer: 0 // Correct answer is "Vatican City" (index 0)
    },
    {
        question: "Which is the longest river in the world?",
        answers: ["Nile", "Amazon", "Yangtze", "Mississippi"],
        correctAnswer: 0 // Correct answer is "Nile" (index 0)
    },
    {
        question: "Which is the highest mountain in the world?",
        answers: ["Mount Everest", "Mount McKinley", "Mount Kilimanjaro", "Mount Fuji"],
        correctAnswer: 0 // Correct answer is "Mount Everest" (index 0)
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1 // Correct answer is "Mars" (index 1)
    },
    {
        question: "Who wrote 'Hamlet'?",
        answers: ["Shakespeare", "Dickens", "Tolkien", "Austen"],
        correctAnswer: 0 // Correct answer is "Shakespeare" (index 0)
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;
let highscore = localStorage.getItem("highscore") ? parseInt(localStorage.getItem("highscore")) : 0;

document.getElementById("highscore").textContent = `High Score: ${highscore}`;

function displayQuestion() {
    if (currentQuestionIndex === 0) {
        questions.sort(() => Math.random() - 0.5); // Shuffle the questions
    }

    const question = questions[currentQuestionIndex];
    document.getElementById("question").textContent = question.question;
    document.getElementById("choice1").textContent = question.answers[0];
    document.getElementById("choice2").textContent = question.answers[1];
    document.getElementById("choice3").textContent = question.answers[2];
    document.getElementById("choice4").textContent = question.answers[3];
    document.getElementById("time-left").textContent = timeLeft;
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("time-left").textContent = timeLeft;
        } else {
            clearInterval(timer);
            displayResult();
        }
    }, 2000);
}

function checkAnswer(answerIndex) {
    const question = questions[currentQuestionIndex];
    if (answerIndex === question.correctAnswer) {
        score++;
        document.getElementById("score").textContent = `Score: ${score}`;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        clearInterval(timer);
        displayResult();
    }
}

function displayResult() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
    document.getElementById("final-score").textContent = score;

    if (score > highscore) {
        localStorage.setItem("highscore", score);
        document.getElementById("highscore-result").textContent = `New High Score: ${score}`;
    } else {
        document.getElementById("highscore-result").textContent = `High Score: ${highscore}`;
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 90;
    document.getElementById("score").textContent = `Score: ${score}`;
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("result-container").style.display = "none";
    displayQuestion();
}

// Add event listeners for the answer choices
document.getElementById("choice1").addEventListener("click", () => checkAnswer(0));
document.getElementById("choice2").addEventListener("click", () => checkAnswer(1));
document.getElementById("choice3").addEventListener("click", () => checkAnswer(2));
document.getElementById("choice4").addEventListener("click", () => checkAnswer(3));

// Display the first question
displayQuestion();
