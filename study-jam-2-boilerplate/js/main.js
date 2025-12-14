// ==========================================
// GDG POMODORO TIMER - LIVE CODING SESSION
// ==========================================
// 
// Welcome! We'll build this timer together step by step.
// Follow along with the instructor and fill in the code below.
//
// ==========================================
console.log("Pomodoro Timer Script Loaded");

// ==========================================
// 1. VARIABLES & CONFIGURATION
// ==========================================

// Time durations in seconds
// Hint: 25 minutes = 25 * 60 seconds
const FOCUS_TIME = 25 * 60;       // 25 minutes
const SHORT_BREAK_TIME = 5 * 60;  // 5 minutes
const LONG_BREAK_TIME = 15 * 60;  // 15 minutes

// Colors (CSS variable references)
const COLOR_BLUE = "var(--google-blue)";
const COLOR_GREEN = "var(--google-green)";
const COLOR_YELLOW = "var(--google-yellow)";


// State variables (Global)
// - timeLeft: How many seconds remain on the timer
// - isRunning: Is the timer currently running? (true/false)
// - currentMode: Which mode are we in? ('focus', 'short-break', 'long-break')
// - timerInterval: Store the interval reference so we can stop it later
let timeLeft = FOCUS_TIME;
let isRunning = false;
let currentMode = "focus"; // 'focus', 'short-break', 'long-break'
let timerInterval = null;



// ==========================================
// 2. DOM ELEMENTS (Selecting by ID)
// ==========================================
// Use document.getElementById("element-id") to select elements

// Display elements
// - timer-display: The big numbers showing time
// - timer-label: The text below the timer ("Time to focus", etc.)
// - ring-progress: The SVG circle for the progress ring
const timerDisplay = document.getElementById("timer-display");
const timerLabel = document.getElementById("timer-label");
const ringProgress = document.getElementById("ring-progress");


// Control buttons
// - toggle-btn: The big play/pause button
// - reset-btn: The reset button
// - toggle-icon: The icon inside the toggle button (changes between play_arrow and pause)
const startBtn = document.getElementById("toggle-btn");
const resetBtn = document.getElementById("reset-btn");
const toggleIcon = document.getElementById("toggle-icon");


// Mode buttons
// - focus-btn: Focus mode button
// - short-break-btn: Short break button
// - long-break-btn: Long break button
const focusBtn = document.getElementById("focus-btn");
const shortBreakBtn = document.getElementById("short-break-btn");
const longBreakBtn = document.getElementById("long-break-btn");



// ==========================================
// 3. TIMER FUNCTIONS
// ==========================================

/**
 * updateTimerDisplay()
 * 
 * Updates the timer display with the current time remaining.
 * Also updates the progress ring.
 * 
 * Steps:
 * 1. Calculate minutes from timeLeft (use Math.floor)
 * 2. Calculate remaining seconds (use modulo %)
 * 3. Format as "MM:SS" with leading zeros (use padStart)
 * 4. Update the timerDisplay text content
 * 5. Calculate and update the ring progress
 */
function updateTimerDisplay() {
  // Step 1: Calculate minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  console.log(minutes);
  console.log( typeof seconds);

  // Step 2: Format as "MM:SS" (use padStart to add leading zeros)
  const formattedTime = minutes.toString().padStart(2, '0') + ':' 
  + seconds.toString().padStart(2, '0');

  console.log(formattedTime);
  
  // Step 3: Update the display
  timerDisplay.textContent = formattedTime;
  
  // Step 4: Update the ring progress
  // Progress = 1 - (timeLeft / totalTime)
  let totalTime = FOCUS_TIME;

  if (currentMode === "short-break") totalTime = SHORT_BREAK_TIME;
  if (currentMode === "long-break") totalTime = LONG_BREAK_TIME;

  const progress = 1 - (timeLeft / totalTime);
  ringProgress.style.strokeDashoffset = progress;
}


/**
 * startTimer()
 * 
 * Toggles the timer between running and paused states.
 * 
 * If running: Pause the timer
 * If paused: Start the timer
 * 
 * Use setInterval() to run code every 1000ms (1 second)
 * Use clearInterval() to stop the timer
 */
function startTimer() {
  if (isRunning) {
    // Timer is running, so PAUSE it
    // - Clear the interval
    // - Set isRunning to false
    // - Change the icon to "play_arrow"
    // - Update the label to "Paused"
    clearInterval(timerInterval);
    isRunning = false;
    toggleIcon.textContent = "play_arrow";
    timerLabel.textContent = "Paused";
    
  } else {
    // Timer is paused, so START it
    // - Set isRunning to true
    // - Change the icon to "pause"
    // - Update the label based on mode
    // - Start the interval
    isRunning = true;
    toggleIcon.textContent = "pause";
    timerLabel.textContent = currentMode === "focus" ? "Stay focused!" : "Take a break!";
    
    // setInterval runs this function every 1000ms (1 second)
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        // Decrement time and update display
        timeLeft -= 1;
        console.log("Timer Running")
        updateTimerDisplay();
        
      } else {
        // Timer finished!
        // - Clear the interval
        // - Reset the state
        // - Alert the user
        clearInterval(timerInterval);
        isRunning = false;
        toggleIcon.textContent = "play_arrow";
        alert("Time is up!");
        console.log("Timer Finished");
      }
    }, 1000);
  }
}


/**
 * resetTimer()
 * 
 * Stops the timer and resets it to the initial duration
 * of the current mode.
 */
function resetTimer() {
  // Stop any running interval
  clearInterval(timerInterval);
  isRunning = false;
  toggleIcon.textContent = "play_arrow";
  console.log("Timer Reset");
  // Reset state
  if (currentMode === "focus") timeLeft = FOCUS_TIME;
  else if (currentMode === "short-break") timeLeft = SHORT_BREAK_TIME;
  else if (currentMode === "long-break") timeLeft = LONG_BREAK_TIME;
  updateTimerDisplay();
  // Reset time based on current mode
  
  
  // Update the display
  
}


/**
 * setMode(mode)
 * 
 * Switches between timer modes.
 * 
 * @param {string} mode - 'focus', 'short-break', or 'long-break'
 * 
 * Steps:
 * 1. Update currentMode
 * 2. Remove 'active' class from all mode buttons
 * 3. Add 'active' class to the selected button
 * 4. Change the theme color using CSS custom properties
 * 5. Update the timer label
 * 6. Reset the timer
 */
function setMode(mode) {
  // Update current mode
  currentMode = mode; //focus

  focusBtn.classList.remove("active");
  shortBreakBtn.classList.remove("active");
  longBreakBtn.classList.remove("active");
  
  // Remove active class from all buttons
  
  
  // Get the root element for CSS variables
  const root = document.documentElement;
  
  // Set time, active class, and color based on mode
  if (mode === "focus") {
    timeLeft = FOCUS_TIME;
    focusBtn.classList.add("active");
    root.style.setProperty("--theme-primary", COLOR_BLUE);
    timerLabel.textContent = "Time for a break";
    console.log("Focus mode");
  } else if (mode === "short-break") {
    timeLeft = SHORT_BREAK_TIME;
    shortBreakBtn.classList.add("active");
    root.style.setProperty("--theme-primary", COLOR_GREEN);
    timerLabel.textContent = "Timer for a break";
    console.log("Short Break mode");
  } else if (mode === "long-break") {
    timeLeft = LONG_BREAK_TIME;
    longBreakBtn.classList.add("active");
    root.style.setProperty("--theme-primary", COLOR_YELLOW);
    timerLabel.textContent = "Timer for a break";
    console.log("Long Break mode");
  }
  
  // Stop any running timer when switching modes
  clearInterval(timerInterval);;
  isRunning = false;
  toggleIcon.textContent = "play_arrow";
  console.log("Timer Reset");
  
  // Update the display
  updateTimerDisplay();
  
}



// ==========================================
// 4. EVENT LISTENERS
// ==========================================
// Connect buttons to functions using addEventListener

// Timer controls
// startBtn.addEventListener("click", startTimer);
// resetBtn.addEventListener("click", resetTimer);



// Mode buttons
// Hint: Use arrow functions () => { ... }
startBtn.addEventListener("click", startTimer);

resetBtn.addEventListener("click", resetTimer);

focusBtn.addEventListener("click", () => {
  setMode("focus");
  console.log("Focus Mode Activated");
});

shortBreakBtn.addEventListener("click", () => {
  setMode("short-break");
  console.log("Short Break Mode Activated");
});

longBreakBtn.addEventListener("click", () => {
  setMode("long-break");
  console.log("Long Break Mode Activated");
});

// ==========================================
// 5. INITIALIZATION
// ==========================================
// Call updateTimerDisplay() to show the initial time
updateTimerDisplay();
