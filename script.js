
// Starfield background creation
const starsContainer = document.getElementById('stars');
for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    starsContainer.appendChild(star);
}

// Typing effect for code display
const phrases = [
    'const arr = [1, 2, 3].map(x => x * 2);',
    'const person = { name: "John", age: 25 };',
    'async function getData() { await fetch(url); }',
    'const [a, b, ...rest] = [1, 2, 3, 4];',
    'localStorage.setItem("theme", "dark");'
];
let phraseIndex = 0;
let charIndex = 0;

function typeEffect() {
    const element = document.getElementById('typingText');
    const currentPhrase = phrases[phraseIndex];
    
    if (charIndex < currentPhrase.length) {
        element.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeEffect, 100);
    } else {
        setTimeout(() => {
            charIndex = 0;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeEffect();
        }, 2000);
    }
}

typeEffect();

// MODULE 7: ARRAY METHODS DEMONSTRATIONS
function demonstrateMap() {
    const numbers = [1, 2, 3, 4, 5];
    const doubled = numbers.map(num => num * 2);
    document.getElementById('arrayOutput').innerHTML = 
        `<strong>map():</strong> [${numbers}] → [${doubled}]<br>Doubled each element! ✨`;
}

function demonstrateFilter() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
    const evens = numbers.filter(num => num % 2 === 0);
    document.getElementById('arrayOutput').innerHTML = 
        `<strong>filter():</strong> [${numbers}] → [${evens}]<br>Kept only even numbers! 🔍`;
}

function demonstrateReduce() {
    const numbers = [1, 2, 3, 4, 5];
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const average = sum / numbers.length;
    document.getElementById('arrayOutput').innerHTML = 
        `<strong>reduce():</strong> [${numbers}]<br>Sum: ${sum} | Average: ${average} ➕`;
}

// MODULE 7: TO-DO LIST PROJECT
let todos = [];

function addTodo() {
    const input = document.getElementById('todoInput');
    const task = input.value.trim();
    
    if (task) {
        todos.push({ id: Date.now(), task: task, completed: false });
        input.value = '';
        displayTodos();
    }
}

function displayTodos() {
    const list = document.getElementById('todoList');
    if (todos.length === 0) {
        list.innerHTML = 'Your tasks will appear here...';
        return;
    }
    
    list.innerHTML = todos.map(todo => 
        `<div class="todo-item">
            <span style="${todo.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${todo.task}</span>
            <div>
                <button class="btn" style="padding: 5px 15px; font-size: 0.9em; margin: 2px;" onclick="toggleTodo(${todo.id})">✓</button>
                <button class="btn" style="padding: 5px 15px; font-size: 0.9em; margin: 2px;" onclick="removeTodo(${todo.id})">❌</button>
            </div>
        </div>`
    ).join('');
}

function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? {...todo, completed: !todo.completed} : todo
    );
    displayTodos();
}

function removeTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    displayTodos();
}

// MODULE 7: STUDENT DASHBOARD PROJECT
let students = [
    { id: 1, name: 'Alice Johnson', marks: 85, grade: 'B' },
    { id: 2, name: 'Bob Smith', marks: 72, grade: 'C' },
    { id: 3, name: 'Charlie Brown', marks: 91, grade: 'A' },
    { id: 4, name: 'Diana Prince', marks: 78, grade: 'C' },
    { id: 5, name: 'Ethan Hunt', marks: 95, grade: 'A' }
];

function showAllStudents() {
    const output = students.map(s => 
        `<div class="student-card">📚 ${s.name} - Marks: ${s.marks} | Grade: ${s.grade}</div>`
    ).join('');
    document.getElementById('studentOutput').innerHTML = output;
}

function calculateAverage() {
    const average = students.reduce((sum, s) => sum + s.marks, 0) / students.length;
    const highest = Math.max(...students.map(s => s.marks));
    const lowest = Math.min(...students.map(s => s.marks));
    
    document.getElementById('studentOutput').innerHTML = 
        `<div class="student-card">
            <strong>📊 Statistics:</strong><br>
            Average: ${average.toFixed(2)}<br>
            Highest: ${highest}<br>
            Lowest: ${lowest}<br>
            Total Students: ${students.length}
        </div>`;
}

function filterTopStudents() {
    const topStudents = students.filter(s => s.marks >= 85);
    const output = topStudents.map(s => 
        `<div class="student-card">⭐ ${s.name}: ${s.marks} marks</div>`
    ).join('');
    document.getElementById('studentOutput').innerHTML = 
        output || '<div class="student-card">No students with marks >= 85</div>';
}

function sortStudents() {
    const sorted = [...students].sort((a, b) => b.marks - a.marks);
    const output = sorted.map((s, index) => 
        `<div class="student-card">#${index + 1} ${s.name}: ${s.marks} marks</div>`
    ).join('');
    document.getElementById('studentOutput').innerHTML = output;
}

// MODULE 7: PRODUCT LIST PROJECT
const products = [
    { id: 1, name: 'Laptop', price: 899, category: 'Electronics' },
    { id: 2, name: 'Headphones', price: 199, category: 'Electronics' },
    { id: 3, name: 'Coffee Maker', price: 79, category: 'Kitchen' },
    { id: 4, name: 'Desk Chair', price: 299, category: 'Furniture' }
];

function displayProducts() {
    const output = products.map(p => 
        `<div class="product-card">
            <strong>${p.name}</strong><br>
            💰 ${p.price}<br>
            📦 ${p.category}
        </div>`
    ).join('');
    document.getElementById('productOutput').innerHTML = 
        `<div style="display: flex; flex-wrap: wrap; justify-content: center;">${output}</div>`;
}

// MODULE 8: STUDENT RECORD MANAGER
let studentRecords = [
    { id: 1, name: 'John Doe', age: 20, course: 'Computer Science' }
];

function createStudentRecord() {
    const newStudent = {
        id: studentRecords.length + 1,
        name: `Student ${studentRecords.length + 1}`,
        age: Math.floor(Math.random() * 5) + 18,
        course: ['CS', 'IT', 'Electronics'][Math.floor(Math.random() * 3)]
    };
    studentRecords.push(newStudent);
    document.getElementById('recordOutput').innerHTML = 
        `<div class="student-card">✅ Created: ${JSON.stringify(newStudent, null, 2)}</div>`;
}

function updateStudent() {
    if (studentRecords.length > 0) {
        studentRecords[0].age += 1;
        document.getElementById('recordOutput').innerHTML = 
            `<div class="student-card">✏️ Updated: ${JSON.stringify(studentRecords[0], null, 2)}</div>`;
    }
}

function deleteStudent() {
    if (studentRecords.length > 0) {
        const deleted = studentRecords.pop();
        document.getElementById('recordOutput').innerHTML = 
            `<div class="student-card">🗑️ Deleted: ${deleted.name}<br>Remaining: ${studentRecords.length} students</div>`;
    }
}

// MODULE 8: CONFIG MERGER
function mergeConfigs() {
    const defaultConfig = {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 14
    };

    const userConfig = {
        theme: 'dark',
        fontSize: 16
    };

    const merged = Object.assign({}, defaultConfig, userConfig);
    
    document.getElementById('configOutput').innerHTML = 
        `<div class="student-card">
            <strong>Default Config:</strong><br>${JSON.stringify(defaultConfig, null, 2)}<br><br>
            <strong>User Config:</strong><br>${JSON.stringify(userConfig, null, 2)}<br><br>
            <strong>Merged Config:</strong><br>${JSON.stringify(merged, null, 2)}
        </div>`;
}

// MODULE 9: EVENT LOOP VISUALIZER
function visualizeEventLoop() {
    const output = document.getElementById('eventLoopOutput');
    output.textContent = 'Starting execution...';
    
    console.log('1. Synchronous code starts');
    
    setTimeout(() => {
        output.textContent += '\n⏰ setTimeout callback executed (after 0ms)';
        console.log('4. setTimeout callback');
    }, 0);
    
    Promise.resolve().then(() => {
        output.textContent += '\n✅ Promise resolved (microtask)';
        console.log('3. Promise microtask');
    });
    
    console.log('2. Synchronous code ends');
    
    setTimeout(() => {
        output.innerHTML = 
            `<div class="student-card">
                <strong>Event Loop Order:</strong><br>
                1️⃣ Synchronous code starts<br>
                2️⃣ Synchronous code ends<br>
                3️⃣ Promise microtask (priority!)<br>
                4️⃣ setTimeout callback<br><br>
                Check console for live logs! 🎯
            </div>`;
    }, 100);
}

// MODULE 9: PROTOTYPE INHERITANCE
function demonstratePrototype() {
    function User(name) {
        this.name = name;
    }

    User.prototype.greet = function() {
        return `Hello, I'm ${this.name}`;
    };

    function Admin(name, role) {
        User.call(this, name);
        this.role = role;
    }

    Admin.prototype = Object.create(User.prototype);
    Admin.prototype.constructor = Admin;
    Admin.prototype.manage = function() {
        return `${this.name} is managing as ${this.role}`;
    };

    const user = new User('John');
    const admin = new Admin('Alice', 'Super Admin');

    document.getElementById('prototypeOutput').innerHTML = 
        `<div class="student-card">
            <strong>User Object:</strong><br>
            ${user.greet()}<br><br>
            <strong>Admin Object (inherits from User):</strong><br>
            ${admin.greet()}<br>
            ${admin.manage()}<br><br>
            <strong>Prototype Chain:</strong> Admin → User → Object 🔗
        </div>`;
}

// MODULE 10: THEME TOGGLE
let isDarkMode = false;

function toggleTheme() {
    isDarkMode = !isDarkMode;
    const btn = document.getElementById('themeToggle');
    const output = document.getElementById('themeOutput');
    
    if (isDarkMode) {
        document.body.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
        btn.textContent = '☀️ Toggle Dark/Light';
        output.textContent = 'Current theme: Dark Mode 🌙';
    } else {
        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        btn.textContent = '🌙 Toggle Dark/Light';
        output.textContent = 'Current theme: Light Mode ☀️';
    }
}



// MODULE 13: GEOLOCATION WEATHER WITH ACTUAL API
const API_KEY = "168771779c71f3d64106d8a88376808a";

function getLocationAndWeather() {
    const output = document.getElementById('geolocationOutput');
    output.innerHTML = '<div class="student-card">📍 Getting your location...</div>';
    
    if (!navigator.geolocation) {
        output.innerHTML = '<div class="student-card">❌ Geolocation is not supported by this browser</div>';
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            output.innerHTML = `<div class="student-card">
                ✅ Location found!<br>
                📍 Latitude: ${lat.toFixed(4)}<br>
                📍 Longitude: ${lon.toFixed(4)}<br>
                🌤️ Fetching weather data...
            </div>`;

            try {
                // First get city name from coordinates
                const reverseGeocodeResponse = await fetch(
                    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
                );
                const locationData = await reverseGeocodeResponse.json();
                console.log(locationData);
                
                const city = locationData[0].name || "Unknown Location";
                const country = locationData[0].country || "";
                
                // Then get weather data
                const weatherResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
                );
                
                if (!weatherResponse.ok) {
                    throw new Error('Weather API request failed');
                }
                
                const weatherData = await weatherResponse.json();
                
                output.innerHTML = 
                    `<div class="student-card">
                        <strong>📍 ${city}, ${country}</strong><br>
                        🌡️ Temperature: ${Math.round(weatherData.main.temp)}°C<br>
                        ☁️ Condition: ${weatherData.weather[0].description}<br>
                        💧 Humidity: ${weatherData.main.humidity}%<br>
                        💨 Wind Speed: ${weatherData.wind.speed} m/s<br>
                        <br>
                        <small>📍 Coordinates: ${lat.toFixed(4)}, ${lon.toFixed(4)}</small>
                    </div>`;
                    
            } catch (error) {
                console.error('Weather API Error:', error);
                output.innerHTML = 
                    `<div class="student-card">
                        ❌ Error fetching weather data<br>
                        📍 Your coordinates: ${lat.toFixed(4)}, ${lon.toFixed(4)}<br>
                        <small>${error.message}</small>
                    </div>`;
            }
        },
        (error) => {
            let errorMessage = 'Unknown error occurred';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Location access denied by user';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Location information unavailable';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'Location request timed out';
                    break;
            }
            output.innerHTML = `<div class="student-card">❌ ${errorMessage}</div>`;
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
        }
    );
}

// MODULE 12: ASYNC/AWAIT DEMO
async function demonstrateAsync() {
    const output = document.getElementById('asyncOutput');
    output.textContent = 'Starting async operation... ⏳';
    
    try {
        await delay(1000);
        output.textContent = 'Step 1 complete... ✅';
        
        await delay(1000);
        output.textContent = 'Step 2 complete... ✅';
        
        await delay(1000);
        output.innerHTML = 
            `<div class="student-card">
                <strong>All async operations completed! 🎉</strong><br>
                This demonstrates Promises and async/await<br>
                Each step waited 1 second before proceeding
            </div>`;
    } catch (error) {
        output.textContent = `Error: ${error.message} ❌`;
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// MODULE 13: LOCALSTORAGE THEME
function saveThemePreference() {
    const theme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('userTheme', theme);
    localStorage.setItem('savedAt', new Date().toLocaleString());
    
    document.getElementById('storageOutput').innerHTML = 
        `<div class="student-card">
            ✅ Theme saved to LocalStorage!<br>
            Theme: ${theme}<br>
            Saved at: ${localStorage.getItem('savedAt')}
        </div>`;
}

function loadThemePreference() {
    const savedTheme = localStorage.getItem('userTheme');
    const savedAt = localStorage.getItem('savedAt');
    
    if (savedTheme) {
        document.getElementById('storageOutput').innerHTML = 
            `<div class="student-card">
                📂 Loaded from LocalStorage!<br>
                Theme: ${savedTheme}<br>
                Saved at: ${savedAt || 'Unknown'}
            </div>`;
    } else {
        document.getElementById('storageOutput').textContent = 
            'No saved theme found. Save one first!';
    }
}

// MODULE 13: CLIPBOARD COPY
function copyToClipboard() {
    const code = document.getElementById('codeSnippet').textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        document.getElementById('clipboardOutput').innerHTML = 
            `<div class="student-card">✅ Code copied to clipboard!<br>Paste it anywhere to test.</div>`;
    }).catch(() => {
        document.getElementById('clipboardOutput').textContent = 
            '⚠️ Clipboard API not available in this context';
    });
}

// Dynamic live output rotation
setTimeout(() => {
    const outputs = [
        'Arrays: Powerful data structures! 📊',
        'Objects: Model real-world data! 🎯',
        'ES6+: Modern JavaScript syntax! ✨',
        'Async: Handle time-based operations! ⏳',
        'DOM: Make pages interactive! 🌐'
    ];
    let outputIndex = 0;
    
    setInterval(() => {
        document.getElementById('liveOutput').textContent = 
            outputs[outputIndex % outputs.length];
        outputIndex++;
    }, 3000);
}, 1000);

// Console demonstrations
// console.log('=== JavaScript Day 2 Demos ===');
// console.log('Array methods:', [1, 2, 3].map(x => x * 2));
// console.log('Object destructuring:', { a: 1, b: 2 });
// console.log('Welcome to Advanced JavaScript! 🚀');
