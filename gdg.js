
// Hello everyone! Ye second part hai jo tumhare JavaScript journey ko aur interesting banayega
// Isme hum kuch real-world projects banayenge jo actually kaam aayenge - jaise todo list, student management, games wagera
// Har line dhyan se padhna samjh aayega kaise JavaScript use hoti hai practical projects mein



// Typing effect - ye wohi hai jo pehle tha but naye examples ke saath
const phrases = [
    'const arr = [1, 2, 3].map(x => x * 2);', // array ko double karne wala code
    'const person = { name: "John", age: 25 };', // object create karne ka example
    'document.querySelector("#id").style.color = "red";', // DOM manipulation ka example
    'const [a, b, ...rest] = [1, 2, 3, 4];', // array destructuring ka naya concept
    'Math.random() * 100;' // random number generate karna
];
let phraseIndex = 0; // current phrase track karne ke liye
let charIndex = 0; // kitne characters type ho chuke hain

function typeEffect() {
    const element = document.getElementById('typingText'); // jahan text show karna hai
    const currentPhrase = phrases[phraseIndex]; // current phrase uthaya
    
    if (charIndex < currentPhrase.length) { // agar puri phrase nahi type hui hai
        element.textContent = currentPhrase.substring(0, charIndex + 1); // ek character aur add karo
        charIndex++; // character count badhao
        setTimeout(typeEffect, 100); // 100ms baad next character type karo
    } else {
        setTimeout(() => { // 2 second ruko next phrase ke liye
            charIndex = 0; // reset karo character count
            phraseIndex = (phraseIndex + 1) % phrases.length; // next phrase pe jao, last wala hua toh first pe
            typeEffect(); // firse typing start karo
        }, 2000);
    }
}
typeEffect(); // typing effect start karo

// MODULE 7: Word Analyzer - ye text analyze karta hai
function analyzeWord() {
    const text = document.getElementById('wordInput').value; // input field se text uthaya
    if (!text) return; // agar kuch nahi likha toh return kuch mat

    // Various calculations karte hain
    const words = text.trim().split(/\s+/).length; // spaces se split karke words count kiya
    const chars = text.replace(/\s/g, '').length; // spaces remove karke characters count kiya 
  

    // Result show kiya card mein
    document.getElementById('wordOutput').innerHTML = `
        <div class="item-card">
            <strong>📊 Analysis Results:</strong><br>
            Words: ${words} | Characters: ${chars}<br>  
            
        </div>
    `;
}

// MODULE 7: To-Do List - ye actual todo list hai jo aap use kar sakte ho
let todos = JSON.parse(localStorage.getItem('todos')) || []; // localStorage se data uthaya ya naya array banaya

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos)); // todos ko browser mein save kiya
}

function displayTodos(list = null, isFiltered = false) {
    const output = document.getElementById('todoOutput'); // output area
    const displayList = list || todos; // agar koi specific list nahi di toh sab todos dikhao
    
    if (displayList.length === 0) { // agar koi task nahi hai
        output.innerHTML = 'No tasks yet. Add one!';
        return;
    }
    
    // Har task ke liye ek card banaya
    output.innerHTML = displayList.map((todo, index) => {
        const originalIndex = isFiltered ? todos.indexOf(todo) : index; // original index track kiya
        return `<div class="item-card">
            <div>
                <span style="${todo.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${todo.text}</span>
            </div>
            <div>
                ${!todo.completed ? `<button class="btn" style="padding: 8px 20px; font-size: 0.9em; margin: 2px;" onclick="completeTodo(${originalIndex})">✓ Complete</button>` : '<span style="color: #00ff88;">✓ Completed</span>'}
                <button class="btn btn-delete" onclick="deleteTodo(${originalIndex})">🗑️ Delete</button>
            </div>
        </div>`;
    }).join(''); // sab cards ko join kiya
}

function addTodo() {
    const input = document.getElementById('todoInput'); // input field
    const text = input.value.trim(); // value uthayi aur spaces trim ki
    if (!text) return; // agar empty hai toh kuch mat karo

    todos.push({ text, completed: false }); // naya task add kiya
    saveTodos(); // save kiya
    input.value = ''; // input field clear kiya
    displayTodos(); // display update kiya
}

function completeTodo(index) {
    todos[index].completed = true; // task complete mark kiya
    saveTodos(); // save kiya
    displayTodos(); // display update kiya
}

function deleteTodo(index) {
    todos.splice(index, 1); // task delete kiya
    saveTodos(); // save kiya
    displayTodos();
}

function sortTodos() {
    todos.sort((a, b) => a.text.localeCompare(b.text)); // tasks ko alphabetically sort kiya
    saveTodos();
    displayTodos(); // display update kiya
}

function filterCompletedTodos() {
    const completed = todos.filter(t => t.completed); // sirle completed tasks filter kiye
    if (completed.length === 0) {
        alert('No completed tasks yet!');
        displayTodos(); // display update kiya
    } else {
        displayTodos(completed, true); // completed tasks dikhaye
    }
}

displayTodos(); // page load hote hi todos display karo

// MODULE 7: Score Sorter - ye numbers sort karta hai aur analysis karta hai
function sortScores() {
    const input = document.getElementById('scoreInput').value; // input se scores liye
    if (!input) return;

    // Input string ko numbers mein convert kiya
    const scores = input.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    if (scores.length === 0) {
        document.getElementById('scoreOutput').textContent = 'Please enter valid scores!';
        return;
    }

    // Various calculations kiye
    const sorted = [...scores].sort((a, b) => a - b);  //  low to high sort kiya
    const highest = Math.max(...scores); // highest score nikala
    const lowest = Math.min(...scores); // lowest score nikala
    const average = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2); // average nikala

    // Result show kiya
    document.getElementById('scoreOutput').innerHTML = `
        <div class="item-card">
            <strong>📊 Score Analysis:</strong><br>
            Original: [${scores.join(', ')}]<br>
            Sorted (Low to High): [${sorted.join(', ')}]<br>
            Highest: ${highest} | Lowest: ${lowest}<br>
            Average: ${average}
        </div>
    `;
}

// MODULE 8: Student Management - ye school/college ke liye student management system hai
let students = JSON.parse(localStorage.getItem('students')) || [];

function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

function displayStudents() {
    const output = document.getElementById('studentOutput');
    if (students.length === 0) {
        output.innerHTML = 'No students yet. Add one!';
        return;
    }

    // Har student ke liye card banaya with grade calculation
    output.innerHTML = students.map((s, i) => {
        const grade = s.marks >= 90 ? 'A' : s.marks >= 80 ? 'B' : s.marks >= 70 ? 'C' : s.marks >= 60 ? 'D' : 'F';
        return `<div class="item-card">
            <div>
                <strong>${s.name}</strong> (Age: ${s.age})<br>
                Marks: ${s.marks} | Grade: ${grade}
            </div>
            <button class="btn btn-delete" onclick="deleteStudent(${i})">🗑️ Delete</button>
        </div>`;
    }).join('');
}

function addStudent() {
    const name = document.getElementById('studentName').value.trim();
    const age = parseInt(document.getElementById('studentAge').value);
    const marks = parseInt(document.getElementById('studentMarks').value);

    if (!name || !age || isNaN(marks)) {
        alert('Please fill all fields!');
        return;
    }

    students.push({ name, age, marks });
    saveStudents();
    // Form fields clear kiye
    document.getElementById('studentName').value = '';
    document.getElementById('studentAge').value = '';
    document.getElementById('studentMarks').value = '';
    displayStudents();
}

function deleteStudent(index) {
    students.splice(index, 1);
    saveStudents();
    displayStudents();
}

function calculateAverage() {
    if (students.length === 0) {
        alert('No students to calculate!');
        return;
    }
    const avg = (students.reduce((sum, s) => sum + s.marks, 0) / students.length).toFixed(2);
    // Statistics show kiye students list ke upar
    document.getElementById('studentOutput').innerHTML = `
        <div class="item-card">
            <strong>📊 Class Statistics:</strong><br>
            Total Students: ${students.length}<br>
            Average Marks: ${avg}<br>
            Highest: ${Math.max(...students.map(s => s.marks))}<br>
            Lowest: ${Math.min(...students.map(s => s.marks))}
        </div>
    ` + document.getElementById('studentOutput').innerHTML;
}

displayStudents();

// MODULE 8: Library - ye books aur movies track karne ke liye hai
let library = JSON.parse(localStorage.getItem('library')) || [];

function saveLibrary() {
    localStorage.setItem('library', JSON.stringify(library));
}

function displayLibrary(list = null, isFiltered = false) {
    const output = document.getElementById('libraryOutput');
    const displayList = list || library;
    
    if (displayList.length === 0) {
        output.innerHTML = 'No items in library. Add one!';
        return;
    }

    output.innerHTML = displayList.map((item, index) => {
        const originalIndex = isFiltered ? library.findIndex(i => i === item) : index;
        const icon = item.type.toLowerCase().includes('movie') ? '🎬' : '📚'; // movie ya book ka icon
        return `<div class="item-card">
            <div>
                <strong>${icon} ${item.title}</strong><br>
                Type: ${item.type} | Year: ${item.year}
            </div>
            <button class="btn btn-delete" onclick="deleteLibraryItem(${originalIndex})">🗑️ Delete</button>
        </div>`;
    }).join('');
}

function addLibraryItem() {
    const title = document.getElementById('itemTitle').value.trim();
    const type = document.getElementById('itemType').value.trim();
    const year = parseInt(document.getElementById('itemYear').value);

    if (!title || !type || !year) {
        alert('Please fill all fields!');
        return;
    }

    library.push({ title, type, year });
    saveLibrary();
    // Form clear kiya
    document.getElementById('itemTitle').value = '';
    document.getElementById('itemType').value = '';
    document.getElementById('itemYear').value = '';
    displayLibrary();
}

function deleteLibraryItem(index) {
    library.splice(index, 1);
    saveLibrary();
    displayLibrary();
}

function filterMovies() {
    const movies = library.filter(item => item.type.toLowerCase().includes('movie'));
    if (movies.length === 0) {
        alert('No movies in library!');
        displayLibrary();
    } else {
        displayLibrary(movies, true);
    }
}

function filterBooks() {
    const books = library.filter(item => item.type.toLowerCase().includes('book'));
    if (books.length === 0) {
        alert('No books in library!');
        displayLibrary();
    } else {
        displayLibrary(books, true);
    }
}

displayLibrary();

// MODULE 9: Theme Toggle - ye light/dark mode switch karta hai
let isDarkMode = false;

function toggleTheme() {
    isDarkMode = !isDarkMode; // toggle kiya true/false
    const btn = document.getElementById('themeToggle');
    const output = document.getElementById('themeOutput');
    
    if (isDarkMode) {
        document.body.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'; // dark background
        btn.textContent = '☀️ Toggle Theme';
        output.textContent = 'Current theme: Dark Mode 🌙';
    } else {
        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; // light background
        btn.textContent = '🌙 Toggle Theme';
        output.textContent = 'Current theme: Light Mode ☀️';
    }
}

// MODULE 9: Quiz Game - ye JavaScript quiz hai
const quizQuestions = [
    { q: "What does DOM stand for?", options: ["Document Object Model", "Data Object Model", "Digital Object Model"], correct: 0 },
    { q: "Which method selects an element by ID?", options: ["querySelector", "getElementById", "getElement"], correct: 1 },
    { q: "What is the correct syntax for an arrow function?", options: ["function() => {}", "() => {}", "=> () {}"], correct: 1 }
];
let currentQuestion = 0;
let score = 0;

function startQuiz() {
    currentQuestion = 0; // reset kiya
    score = 0; // score zero kiya
    showQuestion(); // first question dikhaya
}

function showQuestion() {
    if (currentQuestion >= quizQuestions.length) { // agar sab questions ho gaye
        document.getElementById('quizOutput').innerHTML = `
            <div class="item-card">
                <strong>🎉 Quiz Complete!</strong><br>
                Your Score: ${score}/${quizQuestions.length}<br>
                Percentage: ${((score/quizQuestions.length)*100).toFixed(0)}%
            </div>
        `;
        return;
    }

    const q = quizQuestions[currentQuestion]; // current question uthaya
    document.getElementById('quizOutput').innerHTML = `
        <div class="item-card" style="text-align: left;">
            <strong>Question ${currentQuestion + 1}:</strong> ${q.q}<br><br>
            ${q.options.map((opt, i) => 
                `<button class="btn" onclick="checkAnswer(${i})" style="display: block; margin: 10px auto;">${opt}</button>`
            ).join('')}
        </div>
    `;
}

function checkAnswer(selected) {
    const correct = quizQuestions[currentQuestion].correct; // correct answer nikala
    if (selected === correct) {
        score++; // score badhaya
        document.getElementById('quizOutput').innerHTML += '<div class="item-card">✅ Correct!</div>';
    } else {
        document.getElementById('quizOutput').innerHTML += '<div class="item-card">❌ Wrong! Correct: ' + quizQuestions[currentQuestion].options[correct] + '</div>';
    }
    
    currentQuestion++; // next question pe gaye
    setTimeout(showQuestion, 1500); // 1.5 second baad next question dikhaya
}

// MODULE 11: Guessing Game - ye number guess karne wala game hai
let randomNumber = Math.floor(Math.random() * 100) + 1; // 1-100 ke beech random number
let attempts = 0; // kitni baar try kiya

function checkGuess() {
    const guess = parseInt(document.getElementById('guessInput').value); // user ka guess
    if (!guess) return;

    attempts++; // attempt count badhaya
    const output = document.getElementById('guessOutput');

    if (guess === randomNumber) {
        output.innerHTML = `
            <div class="item-card">
                🎉 Correct! The number was ${randomNumber}<br>
                Attempts: ${attempts}
            </div>
        `;
    } else if (guess < randomNumber) {
        output.innerHTML = `<div class="item-card">📈 Higher! Try again. (Attempt ${attempts})</div>`;
    } else {
        output.innerHTML = `<div class="item-card">📉 Lower! Try again. (Attempt ${attempts})</div>`;
    }
    
    document.getElementById('guessInput').value = ''; // input field clear kiya
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1; // naya random number
    attempts = 0; // attempts reset kiye
    document.getElementById('guessOutput').innerHTML = '<div class="item-card">New game started! Make your first guess!</div>';
    document.getElementById('guessInput').value = '';
}

// MODULE 11: Clock & Countdown - ye real-time clock aur countdown timer hai
function updateClock() {
    const now = new Date(); // current time liya
    const time = now.toLocaleTimeString(); // time ko string mein convert kiya
    document.getElementById('clockOutput').textContent = time; // clock update kiya
}
setInterval(updateClock, 1000); // har second update hoga
updateClock(); // page load hote hi clock dikhaya

let countdownInterval; // countdown timer track karne ke liye

function startCountdown() {
    const targetDate = new Date(document.getElementById('countdownInput').value); // target date uthaya
    if (!targetDate || isNaN(targetDate)) {
        alert('Please select a valid date and time!');
        return;
    }

    if (countdownInterval) clearInterval(countdownInterval); // pehle ka timer clear kiya

    countdownInterval = setInterval(() => {
        const now = new Date();
        const diff = targetDate - now; // time difference nikala

        if (diff <= 0) { // agar time khatam ho gaya
            clearInterval(countdownInterval);
            document.getElementById('countdownOutput').innerHTML = '<div class="item-card">⏰ Time\'s up!</div>';
            return;
        }

        // Time ko days, hours, minutes, seconds mein break kiya
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('countdownOutput').innerHTML = `
            <div class="item-card">
                <strong>⏳ Countdown:</strong><br>
                ${days}d ${hours}h ${minutes}m ${seconds}s
            </div>
        `;
    }, 1000); // har second update hoga
}

// Live output rotation - ye bottom pe rotating messages dikhata hai
setTimeout(() => {
    const outputs = [
        'Arrays: Powerful data structures! 📊',
        'Objects: Model real-world data! 🎯',
        'DOM: Make pages interactive! 🌐',
        'Events: Handle user interactions! ⚡',
        'Math & Date: Work with numbers and time! 🔢'
    ];
    let outputIndex = 0;
    
    setInterval(() => {
        document.getElementById('liveOutput').textContent = outputs[outputIndex % outputs.length];
        outputIndex++;
    }, 3000); // har 3 second baad message change hoga

}, 1000);
