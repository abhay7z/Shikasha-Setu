// Global State
let currentState = {
    view: 'student', // 'student' or 'teacher'
    selectedGrade: null,
    selectedDifficulty: null,
    selectedSubject: null,
    currentQuestion: 0,
    score: 0,
    timeLeft: 30,
    gameState: 'playing', // 'playing', 'correct', 'wrong', 'finished'
    questions: [],
    timer: null
};

// Question Bank
const questionBank = {
    mathematics: {
        easy: [
            {
                question: "If you have 15 apples and give away {grade + 2} apples, how many do you have left?",
                answers: ["{15 - (grade + 2)}", "{15 + (grade + 2)}", "{grade + 2}", "15"],
                correctAnswer: 0,
                explanation: "15 - {grade + 2} = {15 - (grade + 2)}",
                type: "Basic Arithmetic"
            },
            {
                question: "What is {grade} × 7?",
                answers: ["{grade * 7}", "{grade * 8}", "{grade * 6}", "{grade + 7}"],
                correctAnswer: 0,
                explanation: "{grade} × 7 = {grade * 7}",
                type: "Multiplication"
            },
            {
                question: "What is 12 ÷ 3?",
                answers: ["4", "3", "5", "6"],
                correctAnswer: 0,
                explanation: "12 ÷ 3 = 4",
                type: "Division"
            }
        ],
        medium: [
            {
                question: "Solve for x: {grade}x + 5 = {grade * 3 + 5}",
                answers: ["3", "2", "4", "1"],
                correctAnswer: 0,
                explanation: "{grade}x = {grade * 3}, so x = 3",
                type: "Linear Equations"
            },
            {
                question: "What is the square root of 64?",
                answers: ["8", "6", "10", "7"],
                correctAnswer: 0,
                explanation: "8 × 8 = 64, so √64 = 8",
                type: "Square Roots"
            }
        ],
        hard: [
            {
                question: "Find the area of a circle with radius {grade} units. (Use π ≈ 3.14)",
                answers: ["{Math.round(3.14 * grade * grade)} square units", "{Math.round(2 * 3.14 * grade)} square units", "{grade * grade} square units", "{grade * 3.14} square units"],
                correctAnswer: 0,
                explanation: "Area = πr² = 3.14 × {grade}² = {Math.round(3.14 * grade * grade)} square units",
                type: "Geometry"
            }
        ]
    },
    science: {
        easy: [
            {
                question: "What is the basic unit of life?",
                answers: ["Cell", "Atom", "Molecule", "Organ"],
                correctAnswer: 0,
                explanation: "The cell is the basic structural and functional unit of all living organisms.",
                type: "Biology Basics"
            },
            {
                question: "What gas do we breathe in?",
                answers: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
                correctAnswer: 0,
                explanation: "We breathe in oxygen from the air to help our body function.",
                type: "Human Body"
            }
        ],
        medium: [
            {
                question: "What gas do plants absorb from the atmosphere during photosynthesis?",
                answers: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
                correctAnswer: 0,
                explanation: "Plants absorb carbon dioxide (CO₂) and release oxygen during photosynthesis.",
                type: "Photosynthesis"
            },
            {
                question: "What is the chemical symbol for water?",
                answers: ["H2O", "CO2", "NaCl", "O2"],
                correctAnswer: 0,
                explanation: "Water is made up of 2 hydrogen atoms and 1 oxygen atom, so H2O.",
                type: "Chemistry"
            }
        ],
        hard: [
            {
                question: "Which principle explains why airplanes can fly?",
                answers: ["Bernoulli's Principle", "Newton's First Law", "Archimedes' Principle", "Pascal's Principle"],
                correctAnswer: 0,
                explanation: "Bernoulli's Principle explains how differences in air pressure above and below wings create lift.",
                type: "Physics"
            }
        ]
    },
    technology: {
        easy: [
            {
                question: "What does CPU stand for?",
                answers: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Computer Processing Unit"],
                correctAnswer: 0,
                explanation: "CPU stands for Central Processing Unit, the 'brain' of the computer.",
                type: "Computer Basics"
            }
        ],
        medium: [
            {
                question: "Which programming language is often used for web development?",
                answers: ["JavaScript", "Assembly", "FORTRAN", "COBOL"],
                correctAnswer: 0,
                explanation: "JavaScript is widely used for creating interactive websites and web applications.",
                type: "Programming"
            }
        ],
        hard: [
            {
                question: "What is the time complexity of binary search?",
                answers: ["O(log n)", "O(n)", "O(n²)", "O(1)"],
                correctAnswer: 0,
                explanation: "Binary search has O(log n) time complexity because it halves the search space in each step.",
                type: "Algorithms"
            }
        ]
    },
    engineering: {
        easy: [
            {
                question: "What is the most common material used in construction?",
                answers: ["Concrete", "Wood", "Steel", "Plastic"],
                correctAnswer: 0,
                explanation: "Concrete is the most widely used construction material due to its strength and durability.",
                type: "Materials"
            }
        ],
        medium: [
            {
                question: "What type of bridge can span the longest distances?",
                answers: ["Suspension bridge", "Beam bridge", "Arch bridge", "Truss bridge"],
                correctAnswer: 0,
                explanation: "Suspension bridges use cables to support long spans, making them ideal for long distances.",
                type: "Structural Engineering"
            }
        ],
        hard: [
            {
                question: "What is the primary purpose of a differential in a car?",
                answers: ["Allow wheels to rotate at different speeds", "Increase engine power", "Reduce fuel consumption", "Improve braking"],
                correctAnswer: 0,
                explanation: "A differential allows the wheels to rotate at different speeds when turning corners.",
                type: "Mechanical Engineering"
            }
        ]
    }
};

// DOM Elements
const elements = {
    heroSection: document.getElementById('heroSection'),
    gradeSelector: document.getElementById('gradeSelector'),
    difficultySelector: document.getElementById('difficultySelector'),
    subjectDashboard: document.getElementById('subjectDashboard'),
    gameInterface: document.getElementById('gameInterface'),
    gameComplete: document.getElementById('gameComplete'),
    teacherDashboard: document.getElementById('teacherDashboard'),
    studentBtn: document.getElementById('studentBtn'),
    teacherBtn: document.getElementById('teacherBtn'),
    toastContainer: document.getElementById('toastContainer')
};

// Utility Functions
function showToast(message, type = 'info', icon = '📝') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;
    
    elements.toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 4000);
}

function hideAllSections() {
    Object.values(elements).forEach(element => {
        if (element && element.classList) {
            element.classList.add('hidden');
        }
    });
}

function showSection(sectionName) {
    hideAllSections();
    if (elements[sectionName]) {
        elements[sectionName].classList.remove('hidden');
    }
}

function generateQuestions(subject, grade, difficulty) {
    const subjectQuestions = questionBank[subject] || questionBank.mathematics;
    const difficultyQuestions = subjectQuestions[difficulty] || subjectQuestions.easy;
    
    const questions = [];
    for (let i = 0; i < 5; i++) {
        const questionTemplate = difficultyQuestions[i % difficultyQuestions.length];
        const question = JSON.parse(JSON.stringify(questionTemplate)); // Deep clone
        
        // Replace placeholders with actual values
        question.question = question.question.replace(/\{([^}]+)\}/g, (match, expr) => {
            try {
                return eval(expr.replace(/grade/g, grade));
            } catch {
                return match;
            }
        });
        
        question.answers = question.answers.map(answer => 
            answer.replace(/\{([^}]+)\}/g, (match, expr) => {
                try {
                    return eval(expr.replace(/grade/g, grade));
                } catch {
                    return match;
                }
            })
        );
        
        question.explanation = question.explanation.replace(/\{([^}]+)\}/g, (match, expr) => {
            try {
                return eval(expr.replace(/grade/g, grade));
            } catch {
                return match;
            }
        });
        
        questions.push(question);
    }
    
    return questions;
}

// Navigation Functions
function initializeNavigation() {
    elements.studentBtn.addEventListener('click', () => {
        currentState.view = 'student';
        elements.studentBtn.classList.add('active');
        elements.teacherBtn.classList.remove('active');
        showSection('heroSection');
        elements.gradeSelector.classList.remove('hidden');
    });
    
    elements.teacherBtn.addEventListener('click', () => {
        currentState.view = 'teacher';
        elements.teacherBtn.classList.add('active');
        elements.studentBtn.classList.remove('active');
        showSection('teacherDashboard');
    });
}

// Grade Selection
function initializeGradeSelector() {
    const gradeButtons = document.querySelectorAll('.grade-btn');
    gradeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentState.selectedGrade = parseInt(btn.dataset.grade);
            showSection('difficultySelector');
        });
    });
}

// Difficulty Selection
function initializeDifficultySelector() {
    const difficultyButtons = document.querySelectorAll('.difficulty-btn');
    difficultyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentState.selectedDifficulty = btn.dataset.difficulty;
            document.getElementById('selectedGrade').textContent = `Grade ${currentState.selectedGrade}`;
            document.getElementById('selectedDifficulty').textContent = 
                currentState.selectedDifficulty.charAt(0).toUpperCase() + currentState.selectedDifficulty.slice(1);
            showSection('subjectDashboard');
        });
    });
}

// Subject Selection
function initializeSubjectDashboard() {
    const subjectCards = document.querySelectorAll('.subject-card');
    subjectCards.forEach(card => {
        card.addEventListener('click', () => {
            currentState.selectedSubject = card.dataset.subject;
            startGame();
        });
    });
    
    document.getElementById('backBtn').addEventListener('click', () => {
        showSection('difficultySelector');
    });
}

// Game Functions
function startGame() {
    currentState.currentQuestion = 0;
    currentState.score = 0;
    currentState.timeLeft = 30;
    currentState.gameState = 'playing';
    currentState.questions = generateQuestions(
        currentState.selectedSubject, 
        currentState.selectedGrade, 
        currentState.selectedDifficulty
    );
    
    document.getElementById('gameGrade').textContent = `Grade ${currentState.selectedGrade}`;
    document.getElementById('gameSubject').textContent = 
        currentState.selectedSubject.charAt(0).toUpperCase() + currentState.selectedSubject.slice(1);
    
    showSection('gameInterface');
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    const question = currentState.questions[currentState.currentQuestion];
    
    document.getElementById('questionNumber').textContent = 
        `${currentState.currentQuestion + 1} of ${currentState.questions.length}`;
    document.getElementById('currentScore').textContent = `${currentState.score} points`;
    document.getElementById('questionType').textContent = question.type;
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('explanationContainer').classList.add('hidden');
    
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const answerBtn = document.createElement('button');
        answerBtn.className = 'answer-btn';
        answerBtn.innerHTML = `
            <div class="answer-letter">${String.fromCharCode(65 + index)}</div>
            <div class="answer-text">${answer}</div>
            <div class="answer-icon"></div>
        `;
        answerBtn.addEventListener('click', () => handleAnswerSelect(index));
        answersContainer.appendChild(answerBtn);
    });
    
    updateProgress();
}

function handleAnswerSelect(answerIndex) {
    if (currentState.gameState !== 'playing') return;
    
    clearInterval(currentState.timer);
    const question = currentState.questions[currentState.currentQuestion];
    const isCorrect = answerIndex === question.correctAnswer;
    const answerButtons = document.querySelectorAll('.answer-btn');
    
    // Update button states
    answerButtons.forEach((btn, index) => {
        btn.classList.add('disabled');
        if (index === answerIndex) {
            btn.classList.add('selected');
            btn.classList.add(isCorrect ? 'correct' : 'wrong');
            const icon = btn.querySelector('.answer-icon');
            icon.textContent = isCorrect ? '✅' : '❌';
        }
        if (index === question.correctAnswer && !isCorrect) {
            btn.classList.add('correct-answer');
            const icon = btn.querySelector('.answer-icon');
            icon.textContent = '✅';
        }
    });
    
    currentState.gameState = isCorrect ? 'correct' : 'wrong';
    
    // Show explanation
    document.getElementById('explanationText').textContent = question.explanation;
    document.getElementById('explanationContainer').classList.remove('hidden');
    
    if (isCorrect) {
        const points = currentState.selectedDifficulty === 'easy' ? 10 : 
                     currentState.selectedDifficulty === 'medium' ? 20 : 30;
        currentState.score += points;
        showToast(`Correct! +${points} points`, 'success', '🎉');
        setTimeout(nextQuestion, 500);
    } else {
        showToast('Not quite right. Keep trying!', 'error', '❌');
        setTimeout(nextQuestion, 3000);
    }
}

function nextQuestion() {
    if (currentState.currentQuestion < currentState.questions.length - 1) {
        currentState.currentQuestion++;
        currentState.timeLeft = 30;
        currentState.gameState = 'playing';
        displayQuestion();
        startTimer();
    } else {
        finishGame();
    }
}

function startTimer() {
    currentState.timer = setInterval(() => {
        currentState.timeLeft--;
        const timeElement = document.getElementById('timeLeft');
        timeElement.textContent = `${currentState.timeLeft}s`;
        
        if (currentState.timeLeft <= 10) {
            timeElement.classList.add('warning');
        } else {
            timeElement.classList.remove('warning');
        }
        
        if (currentState.timeLeft <= 0) {
            handleTimeUp();
        }
    }, 1000);
}

function handleTimeUp() {
    clearInterval(currentState.timer);
    if (currentState.gameState === 'playing') {
        currentState.gameState = 'wrong';
        showToast("Time's up! Try again.", 'error', '⏰');
        
        // Show correct answer
        const question = currentState.questions[currentState.currentQuestion];
        const answerButtons = document.querySelectorAll('.answer-btn');
        answerButtons.forEach((btn, index) => {
            btn.classList.add('disabled');
            if (index === question.correctAnswer) {
                btn.classList.add('correct-answer');
                const icon = btn.querySelector('.answer-icon');
                icon.textContent = '✅';
            }
        });
        
        document.getElementById('explanationText').textContent = question.explanation;
        document.getElementById('explanationContainer').classList.remove('hidden');
        
        setTimeout(nextQuestion, 3000);
    }
}

function updateProgress() {
    const progress = ((currentState.currentQuestion + 1) / currentState.questions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
}

function finishGame() {
    clearInterval(currentState.timer);
    const finalScore = Math.round((currentState.score / (currentState.questions.length * 30)) * 100);
    
    document.getElementById('finalScore').textContent = `${finalScore}%`;
    document.getElementById('finalPoints').textContent = currentState.score;
    
    let message = '';
    if (finalScore >= 80) {
        message = "Excellent work! You've mastered this topic! 🏆";
        showToast(message, 'success', '🏆');
    } else if (finalScore >= 60) {
        message = "Good job! Keep practicing to improve! ⭐";
        showToast(message, 'success', '⭐');
    } else {
        message = "Keep practicing! You'll get better! 💪";
        showToast(message, 'info', '💪');
    }
    
    document.getElementById('completionMessage').textContent = message;
    showSection('gameComplete');
}

// Game Interface Controls
function initializeGameInterface() {
    document.getElementById('gameBackBtn').addEventListener('click', () => {
        clearInterval(currentState.timer);
        showSection('subjectDashboard');
    });
}

// Game Complete Controls
function initializeGameComplete() {
    document.getElementById('continueBtn').addEventListener('click', () => {
        showSection('subjectDashboard');
    });
    
    document.getElementById('tryAgainBtn').addEventListener('click', () => {
        startGame();
    });
}

// Initialize App
function initializeApp() {
    initializeNavigation();
    initializeGradeSelector();
    initializeDifficultySelector();
    initializeSubjectDashboard();
    initializeGameInterface();
    initializeGameComplete();
    
    // Show initial section
    showSection('heroSection');
    elements.gradeSelector.classList.remove('hidden');
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);