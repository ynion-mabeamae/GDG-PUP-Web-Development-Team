// ==========================================
// 1. VARIABLES & CONFIGURATION
// ==========================================

// Time durations in seconds
const FOCUS_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;

// Colors
const COLOR_BLUE = "var(--google-blue)";
const COLOR_GREEN = "var(--google-green)";
const COLOR_YELLOW = "var(--google-yellow)";

// State variables (Global)
let timeLeft = FOCUS_TIME;
let isRunning = false;
let currentMode = "focus"; // 'focus', 'short-break', 'long-break'
let timerInterval = null;
let backgroundMusic = null;
let endSoundFocus = null;
let endSoundBreak = null;
let focusSessionsCompleted = 0;
let totalFocusSeconds = 0;
let currentTheme = "light";

// ==========================================
// 2. DOM ELEMENTS (Selecting by ID)
// ==========================================

const timerDisplay = document.getElementById("timer-display");
const timerLabel = document.getElementById("timer-label");
const ringProgress = document.getElementById("ring-progress");

// Buttons
const startBtn = document.getElementById("toggle-btn");
const resetBtn = document.getElementById("reset-btn");
const toggleIcon = document.getElementById("toggle-icon");

// Mode Buttons
const focusBtn = document.getElementById("focus-btn");
const shortBreakBtn = document.getElementById("short-break-btn");
const longBreakBtn = document.getElementById("long-break-btn");

// Task Elements (POST JAM ACTIVITY)
const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("new-task-title");
const addTaskBtn = document.getElementById("add-task-btn");
const taskCountNum = document.getElementById("task-count-num");
const iterationCount = document.getElementById("iteration-count");
const themeToggle = document.getElementById("theme-toggle");

const TASKS_STORAGE_KEY = "pomodoro-tasks";
const SESSION_STORAGE_KEY = "pomodoro-session-stats";
const THEME_STORAGE_KEY = "pomodoro-theme";



// ==========================================
// 3. TIMER FUNCTIONS
// ==========================================

function updateTimerDisplay() {
  // Calculate minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Format as "MM:SS" (e.g., "05:09")
  const formattedTime =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");

  timerDisplay.textContent = formattedTime;

  // Update the ring progress
  let totalTime = FOCUS_TIME;
  if (currentMode === "short-break") totalTime = SHORT_BREAK_TIME;
  if (currentMode === "long-break") totalTime = LONG_BREAK_TIME;

  const progress = 1 - timeLeft / totalTime;
  ringProgress.style.strokeDashoffset = progress;
}

function startTimer() {
  if (isRunning) {
    // If already running, pause it
    clearInterval(timerInterval);
    isRunning = false;
    toggleIcon.textContent = "play_arrow";
    timerLabel.textContent = "Paused";
    pauseBackgroundMusic();
    console.log("Timer Paused");
  } else {
    // Start the timer
    isRunning = true;
    toggleIcon.textContent = "pause";
    timerLabel.textContent =
      currentMode === "focus" ? "Stay focused" : "Take a break";

    playBackgroundMusic();

    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft = timeLeft - 1;
        console.log("Timer Running");
        updateTimerDisplay();
      } else {
        // Timer finished
        clearInterval(timerInterval);
        isRunning = false;
        toggleIcon.textContent = "play_arrow";
        pauseBackgroundMusic();
        playEndSound();
        if (currentMode === "focus") {
          focusSessionsCompleted += 1;
          totalFocusSeconds += FOCUS_TIME;
          saveSessionStats();
          updateSessionStatsDisplay();
        }
        alert("Time is up!");
        console.log("Timer Finished");
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  toggleIcon.textContent = "play_arrow";
  pauseBackgroundMusic();
  console.log("Timer Reset");
  // Reset time based on current mode
  if (currentMode === "focus") timeLeft = FOCUS_TIME;
  else if (currentMode === "short-break") timeLeft = SHORT_BREAK_TIME;
  else if (currentMode === "long-break") timeLeft = LONG_BREAK_TIME;

  updateTimerDisplay();
}

function setMode(mode) {
  currentMode = mode;

  // Update buttons style
  focusBtn.classList.remove("active");
  shortBreakBtn.classList.remove("active");
  longBreakBtn.classList.remove("active");

  const root = document.documentElement;
  console.log(root);

  if (mode === "focus") {
    timeLeft = FOCUS_TIME;
    focusBtn.classList.add("active");
    root.style.setProperty("--theme-primary", COLOR_BLUE);
    timerLabel.textContent = "Ready to focus?";
    console.log("Focus Mode");
  } else if (mode === "short-break") {
    timeLeft = SHORT_BREAK_TIME;
    shortBreakBtn.classList.add("active");
    root.style.setProperty("--theme-primary", COLOR_GREEN);
    timerLabel.textContent = "Time for a break";
    console.log("Short Break Mode");
  } else if (mode === "long-break") {
    timeLeft = LONG_BREAK_TIME;
    longBreakBtn.classList.add("active");
    root.style.setProperty("--theme-primary", COLOR_YELLOW);
    timerLabel.textContent = "Time for a long break";
    console.log("Long Break Mode");
  }

  // Stop timer when switching modes
  clearInterval(timerInterval);
  isRunning = false;
  toggleIcon.textContent = "play_arrow";
  console.log("Timer Reset");

  updateTimerDisplay();
  applyModeBackground();
}

function applyModeBackground() {
  if (currentTheme === "dark") {
    document.body.style.backgroundColor = "#0f172a";
    return;
  }

  if (currentMode === "focus") {
    document.body.style.backgroundColor = "#E8F0FE";
  } else if (currentMode === "short-break") {
    document.body.style.backgroundColor = "#E6F4EA";
  } else if (currentMode === "long-break") {
    document.body.style.backgroundColor = "#FEF7E0";
  }
}

function setupBackgroundMusic() {
  backgroundMusic = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.3;
  console.log("Background music setup complete");
}

function playBackgroundMusic() {
  if (backgroundMusic) {
    backgroundMusic.play()
      .then(() => console.log("Music playing"))
      .catch(err => console.log("Music play failed:", err));
  }
}

function pauseBackgroundMusic() {
  if (backgroundMusic) {
    backgroundMusic.pause();
    console.log("Music paused");
  }
}

function setupEndSounds() {
  endSoundFocus = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
  endSoundBreak = new Audio("https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg");

  endSoundFocus.volume = 0.6;
  endSoundBreak.volume = 0.5;
}

function playEndSound() {
  const sound = currentMode === "focus" ? endSoundFocus : endSoundBreak;

  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(err => console.log("End sound play failed;", err));
  }
}

function saveSessionStats() {
  const payload = {
    focusSessionsCompleted,
    totalFocusSeconds,
  };
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(payload));
}

function loadSessionStats() {
  const raw = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    focusSessionsCompleted = parsed.focusSessionsCompleted || 0;
    totalFocusSeconds = parsed.totalFocusSeconds || 0;
    updateSessionStatsDisplay();
  } catch (err) {
    console.log("Session stats load failed", err);
  }
}

function updateSessionStatsDisplay() {
  if (iterationCount) {
    iterationCount.textContent = focusSessionsCompleted;
  }
}

function applyTheme(theme) {
  currentTheme = theme;
  document.body.classList.remove("theme-light", "theme-dark");
  document.body.classList.add(`theme-${theme}`);
  localStorage.setItem(THEME_STORAGE_KEY, theme);

  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
    const icon = themeToggle.querySelector('span');
    if (icon) {
      icon.textContent = theme === "dark" ? "light_mode" : "dark_mode";
    }
  }

  applyModeBackground();
}

function loadThemePreference() {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  const theme = saved === "dark" ? "dark" : "light";
  applyTheme(theme);
}

function toggleTheme() {
  const next = currentTheme === "dark" ? "light" : "dark";
  applyTheme(next);
}
const PRIORITY_ORDER = ["low", "medium", "high"];

function setPriority(taskItem, priority) {
  const badge = taskItem.querySelector(".priority-badge");
  taskItem.dataset.priority = priority;
  if (badge) badge.textContent = priority;
}

function cyclePriority(current) {
  const idx = PRIORITY_ORDER.indexOf(current);
  const nextIdx = idx === -1 ? 1 : (idx + 1) % PRIORITY_ORDER.length;
  return PRIORITY_ORDER[nextIdx];
}

function enableInlineEdit(titleSpan) {
  const taskItem = titleSpan.closest(".task-item");
  const original = titleSpan.textContent;
  const input = document.createElement("input");
  input.type = "text";
  input.value = original;
  input.classList.add("task-edit-input");

  const finish = () => {
    const newTitle = input.value.trim();
    const finalTitle = newTitle === "" ? original : newTitle;
    const newSpan = document.createElement("span");
    newSpan.textContent = finalTitle;
    newSpan.classList.add("task-title");
    newSpan.addEventListener("dblclick", () => enableInlineEdit(newSpan));
    input.replaceWith(newSpan);
    saveTasks();
  };

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      finish();
    } else if (e.key === "Escape") {
      input.value = original;
      finish();
    }
  });

  input.addEventListener("blur", finish);

  titleSpan.replaceWith(input);
  input.focus();
  input.select();
}

function handleCompleteToggle(taskItem, checked) {
  taskItem.classList.toggle("completed", checked);
  taskItem.dataset.completed = checked ? "true" : "false";
  // move completed tasks to the bottom
  taskList.appendChild(taskItem);
  updateTaskCount();
  saveTasks();
}

function createTaskItem({ title, completed = false, priority = "medium" }) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");
  taskItem.dataset.priority = priority;
  taskItem.dataset.completed = completed ? "true" : "false";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-check");
  checkbox.checked = completed;
  checkbox.addEventListener("change", (e) => {
    handleCompleteToggle(taskItem, e.target.checked);
  });

  const titleSpan = document.createElement("span");
  titleSpan.textContent = title;
  titleSpan.classList.add("task-title");
  titleSpan.addEventListener("dblclick", () => enableInlineEdit(titleSpan));

  const priorityBtn = document.createElement("button");
  priorityBtn.type = "button";
  priorityBtn.classList.add("priority-badge");
  priorityBtn.textContent = priority;
  priorityBtn.addEventListener("click", () => {
    const next = cyclePriority(taskItem.dataset.priority || "medium");
    setPriority(taskItem, next);
    saveTasks();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = '<span class="material-icons">Delete</span>';
  deleteBtn.addEventListener("click", () => {
    deleteTask(taskItem);
  });

  taskItem.appendChild(checkbox);
  taskItem.appendChild(titleSpan);
  taskItem.appendChild(priorityBtn);
  taskItem.appendChild(deleteBtn);

  if (completed) {
    taskItem.classList.add("completed");
  }

  return taskItem;
}

function saveTasks() {
  const tasks = Array.from(taskList.querySelectorAll(".task-item")).map(
    (item) => ({
      title: item.querySelector(".task-title")?.textContent || "",
      completed: item.dataset.completed === "true",
      priority: item.dataset.priority || "medium",
    })
  );
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY) || "[]");
  saved.forEach((task) => {
    const item = createTaskItem({
      title: task.title || "Untitled task",
      completed: Boolean(task.completed),
      priority: task.priority || "medium",
    });
    taskList.appendChild(item);
  });
  updateTaskCount();
}

// ==========================================
// 4. TASK FUNCTIONS (POST JAM ACTIVITY)
// ==========================================
// 
// 🎯 YOUR CHALLENGE: Implement the task management functions below!
// 
// The HTML already has:
//   - An input field with id="new-task-title"
//   - An add button with id="add-task-btn" 
//   - A task list with id="task-list"
//   - A task counter with id="task-count-num"
//
// You are FREE to implement these functions however you want!
// Be creative and add any extra features you think would be cool.
//
// ==========================================

/**
 * addTask()
 * 
 * This function should add a new task to the task list.
 * 
 * Things to consider:
 * - How do you get the text from the input field?
 * - How do you create a new list item element?
 * - How do you add it to the task list?
 * - Should you clear the input after adding?
 * - What if the input is empty?
 * 
 * Feel free to add any logic you want!
 */
function addTask() {
  const taskTitle = taskInput.value.trim();
  if (taskTitle === "") {
    alert("Task title cannot be empty!");
    return;
  }
  const taskItem = createTaskItem({ title: taskTitle, completed: false, priority: "medium" });
  taskList.appendChild(taskItem);
  taskInput.value = "";
  updateTaskCount();
  saveTasks();
}


/**
 * deleteTask(taskElement)
 * 
 * This function should remove a task from the list.
 * 
 * @param {HTMLElement} taskElement - The task item to delete
 * 
 * Things to consider:
 * - How do you remove an element from the DOM?
 * - Should you update the task counter?
 * - What if there are no more tasks? (show empty state?)
 * 
 * Feel free to add any logic you want!
 */
function deleteTask(taskElement) {
  if (taskElement && taskList.contains(taskElement)) {
    taskList.removeChild(taskElement);
    updateTaskCount();
    saveTasks();
  }
}


/**
 * updateTaskCount()
 * 
 * This function should update the task counter display.
 * 
 * Hint: You can count the number of .task-item elements in the list.
 * 
 * Feel free to add any logic you want!
 */
function updateTaskCount() {
  const taskItems = taskList.querySelectorAll(".task-item");
  taskCountNum.textContent = taskItems.length;

  if (taskItems.length === 0) {
    console.log("Task list is empty.");
  }
}



// ==========================================
// 5. EVENT LISTENERS
// ==========================================

// Timer Controls
startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);

// Mode Buttons
focusBtn.addEventListener("click", () => {
  setMode("focus");
  console.log("Focus mode activated");
});

shortBreakBtn.addEventListener("click", () => {
  setMode("short-break");
  console.log("Short break mode activated");
});

longBreakBtn.addEventListener("click", () => {
  setMode("long-break");
  console.log("Long break mode activated");
});

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}

// Task Controls (POST JAM ACTIVITY)
// Uncomment these when you're ready to test your functions!

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Global keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Ignore shortcuts while typing in inputs/textareas/contenteditable/select
  if (e.target.closest("input, textarea, [contenteditable='true'], select")) return;

  switch (e.code) {
    case "Space":
      e.preventDefault(); // prevent page scroll
      startTimer();
      break;
    case "KeyR":
      resetTimer();
      break;
    case "Digit1":
      setMode("focus");
      break;
    case "Digit2":
      setMode("short-break");
      break;
    case "Digit3":
      setMode("long-break");
      break;
    default:
      break;
  }
});



// ==========================================
// 6. INITIALIZATION
// ==========================================

updateTimerDisplay();
setupBackgroundMusic();
setupEndSounds();
loadSessionStats();
updateSessionStatsDisplay();
loadThemePreference();
loadTasks();
applyModeBackground();