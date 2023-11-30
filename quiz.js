const quizData = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Madrid", "Paris"],
        answer: ["Paris", "Berlin"]
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        answer: ["Mars"]
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Giraffe", "Blue Whale", "Polar Bear"],
        answer: ["Blue Whale"]
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        answer: ["Carbon Dioxide"]
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Leo Tolstoy", "Jane Austen"],
        answer: ["William Shakespeare"]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let isSubmitClicked = false;
let selectedAnswers = new Array(quizData.length).fill([]);

const questionText = document.getElementById("question");
const optionsList = document.getElementById("options");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const submitButton = document.getElementById("submit-button");
const scoreContainer = document.getElementById("score-display");

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;

    optionsList.innerHTML = "";
    scoreContainer.innerHTML="";

    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "option" + (index + 1);
        checkbox.name = "option";
        checkbox.value = option;
        const label = document.createElement("label");
        label.setAttribute("for", "option" + (index + 1));
        label.innerText = option;
        li.appendChild(checkbox);
        li.appendChild(label);
        optionsList.appendChild(li);
    });

    if (currentQuestionIndex === 0) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }

    if (currentQuestionIndex === quizData.length - 1) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }

    updateSelectedAnswers();
}

function checkAnswer() {
    const selectedOptions = document.querySelectorAll('input[type="checkbox"]:checked');

    selectedAnswers[currentQuestionIndex] = Array.from(selectedOptions).map((checkbox) => checkbox.value);
}

function endQuiz() {
    if (!isSubmitClicked) {
        return;
    }

    questionText.innerText = "Quiz Completed!";
    optionsList.innerHTML = "";
    nextButton.style.display = "none";
    prevButton.style.display = "none";
    submitButton.style.display = "none";
    scoreContainer.style.display = "block";
    scoreContainer.innerHTML = "Score: <span id='score'>" + score + " / " + quizData.length + "</span>";
}

function updateSelectedAnswers() {
    const currentQuestion = quizData[currentQuestionIndex];
    const selectedOptions = selectedAnswers[currentQuestionIndex];

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = selectedOptions.includes(checkbox.value);
    });
}

loadQuestion();

prevButton.addEventListener("click", () => {
    checkAnswer();
    currentQuestionIndex--;
    loadQuestion();
});

nextButton.addEventListener("click", () => {
    checkAnswer();
    currentQuestionIndex++;
    loadQuestion();
});

submitButton.addEventListener("click", () => {
    isSubmitClicked = true;
    checkAnswer();
    score = calculateScore();
    endQuiz();
});

function calculateScore() {
    let userScore = 0;
    for (let i = 0; i < quizData.length; i++) {
        if (arraysEqual(selectedAnswers[i], quizData[i].answer)) {
            userScore++;
        }
    }

    return userScore;
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}
